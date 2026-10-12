import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, GraduationCap, IndianRupee, Megaphone, UsersRound } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { RegisterFilePanel } from "@/components/register-file-panel";
import { StudentAvatar } from "@/components/student-avatar";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { YearSelect } from "@/components/year-select";
import { deskCopy, useAccess } from "@/lib/school/access";
import {
  classLabel,
  familyLabel,
  familyLedger,
  fullName,
  invoiceStatus,
  noticeAudienceLabel,
  noticeVisibleTo,
} from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { session, students, families, studentIds, can } = useAccess();
  const invoices = useSchoolStore((s) => s.invoices);
  const payments = useSchoolStore((s) => s.payments);
  const certificates = useSchoolStore((s) => s.certificates);
  const notices = useSchoolStore((s) => s.notices);
  const reads = useSchoolStore((s) => s.noticeReads);
  const allStudents = useSchoolStore((s) => s.students);
  const restoreSample = useSchoolStore((s) => s.restoreSample);
  const workingYear = useSchoolStore((s) => s.workingYear);
  const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);

  const yearInvoices = invoices.filter((inv) => inv.academicYear === workingYear && studentIds.has(inv.studentId));
  const visiblePayments = payments.filter((p) => yearInvoices.some((inv) => inv.id === p.invoiceId));
  const visibleCerts = certificates.filter((c) => studentIds.has(c.studentId));

  const active = students.filter((s) => s.status === "Active");
  const dueTotal = families.reduce((sum, f) => sum + familyLedger(f.id, yearInvoices, visiblePayments).due, 0);
  const overdueCount = yearInvoices.filter((inv) => invoiceStatus(inv, visiblePayments) === "Overdue").length;

  const familyRows = families
    .map((f) => ({ family: f, ...familyLedger(f.id, yearInvoices, visiblePayments) }))
    .filter((row) => row.due > 0)
    .sort((a, b) => b.due - a.due)
    .slice(0, 5);

  const recent = [...students].sort((a, b) => b.admissionDate.localeCompare(a.admissionDate)).slice(0, 5);

  const chart = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((month, i) => {
    const stamp = `2026-0${i + 4}`;
    const collected = visiblePayments
      .filter((p) => p.paidAt.startsWith(stamp))
      .reduce((sum, p) => sum + p.amount, 0);
    return { month, collected };
  });

  const deskNotices = session
    ? notices
        .filter((n) => noticeVisibleTo(n, session, allStudents))
        .sort((a, b) => Number(b.pin) - Number(a.pin) || b.createdAt.localeCompare(a.createdAt))
        .slice(0, 4)
    : [];

  const copy = deskCopy(session?.role ?? "Student");

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow={workingYear}
        title={copy.title}
        description={copy.description}
        actions={
          <>
            <YearSelect value={workingYear} onChange={setWorkingYear} />
            {can("admit") ? (
              <Button asChild variant="outline">
                <Link to="/admissions/new">New admission</Link>
              </Button>
            ) : null}
            {can("restore") && students.length === 0 ? (
              <Button variant="secondary" onClick={() => restoreSample()}>
                Load sample records
              </Button>
            ) : null}
          </>
        }
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          icon={GraduationCap}
          label="On roll"
          value={String(active.length)}
          hint={`${students.length} in the register`}
        />
        <Stat icon={UsersRound} label="Families" value={String(families.length)} hint="Households with a file" />
        <Stat
          icon={IndianRupee}
          label="Fees outstanding"
          value={formatINR(dueTotal)}
          hint={`${overdueCount} overdue months · ${workingYear}`}
        />
        <Stat
          icon={Megaphone}
          label="Notices"
          value={String(deskNotices.length)}
          hint="Circulars on this desk"
        />
      </section>

      {can("file") ? <RegisterFilePanel /> : null}

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div>
              <CardTitle>Fee collection</CardTitle>
              <CardDesc>Receipts posted this calendar year.</CardDesc>
            </div>
          </CardHeader>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart} barSize={28}>
                <XAxis dataKey="month" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
                />
                <Tooltip
                  cursor={{ fill: "color-mix(in oklab, var(--color-ink) 4%, transparent)" }}
                  formatter={(v) => [formatINR(Number(v ?? 0)), "Collected"]}
                  contentStyle={{
                    background: "var(--color-raised)",
                    border: "none",
                    borderRadius: 12,
                    boxShadow: "var(--shadow-card)",
                  }}
                />
                <Bar dataKey="collected" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Notices</CardTitle>
              <CardDesc>Family, class or whole school.</CardDesc>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/notices">
                Board <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <ul className="flex flex-col gap-3">
            {deskNotices.length === 0 ? (
              <li className="text-sm text-muted">No circulars on this desk.</li>
            ) : (
              deskNotices.map((notice) => {
                const unread =
                  session && !reads.some((r) => r.noticeId === notice.id && r.accountId === session.id);
                return (
                  <li key={notice.id}>
                    <Link to="/notices" className="block rounded-xl px-1 py-1 hover:bg-canvas-warm">
                      <span className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium">{notice.title}</span>
                        {unread ? <Badge tone="ok">New</Badge> : notice.pin ? <Badge tone="primary">Pinned</Badge> : null}
                      </span>
                      <span className="block text-xs text-muted">
                        {notice.fromName} · {noticeAudienceLabel(notice, families, allStudents)}
                      </span>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Family dues</CardTitle>
              <CardDesc>Monthly household balance for {workingYear}.</CardDesc>
            </div>
            {session?.role !== "Teacher" ? (
              <Button asChild variant="ghost" size="sm">
                <Link to="/fees">
                  Ledger <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            ) : null}
          </CardHeader>
          <ul className="flex flex-col gap-3">
            {familyRows.length === 0 ? (
              <li className="text-sm text-muted">No open family balances.</li>
            ) : (
              familyRows.map((row) => (
                <li key={row.family.id}>
                  <Link
                    to="/families/$id"
                    params={{ id: row.family.id }}
                    className="flex items-center justify-between gap-3 rounded-xl px-1 py-1 hover:bg-canvas-warm"
                  >
                    <span>
                      <span className="block text-sm font-medium">{familyLabel(row.family)}</span>
                      <span className="font-mono text-xs text-faint">{row.family.familyCode}</span>
                    </span>
                    <span className="text-sm font-medium tabular-nums">{formatINR(row.due)}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div>
              <CardTitle>Latest admissions</CardTitle>
              <CardDesc>Newest files on the student register.</CardDesc>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admissions">
                All admissions <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <ul className="divide-y divide-line">
            {recent.map((student) => (
              <li key={student.id}>
                <Link
                  to="/students/$id"
                  params={{ id: student.id }}
                  className="flex items-center gap-3 py-3 hover:bg-canvas-warm/60"
                >
                  <StudentAvatar student={student} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{fullName(student)}</span>
                    <span className="text-xs text-muted">
                      {classLabel(student)} · {student.admissionNo}
                    </span>
                  </span>
                  <StatusBadge value={student.status} />
                  <Badge tone="neutral" className="hidden sm:inline-flex">
                    {student.admissionDate}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof GraduationCap;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="p-4 md:p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">{label}</p>
        <Icon className="size-4 text-faint" />
      </div>
      <p className="mt-3 font-display text-3xl tracking-tight tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </Card>
  );
}
