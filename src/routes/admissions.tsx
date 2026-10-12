import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { SearchField } from "@/components/search-toolbar";
import { StudentAvatar } from "@/components/student-avatar";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { YearSelect } from "@/components/year-select";
import { useAccess } from "@/lib/school/access";
import { classLabel, consentFor, familyLabel, familyMonthlyFees, fullName } from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import { formatDate, formatINR } from "@/lib/utils";

export const Route = createFileRoute("/admissions")({ component: AdmissionsPage });

function AdmissionsPage() {
  const { students, families } = useAccess();
  const invoices = useSchoolStore((s) => s.invoices);
  const payments = useSchoolStore((s) => s.payments);
  const feeConsents = useSchoolStore((s) => s.feeConsents);
  const workingYear = useSchoolStore((s) => s.workingYear);
  const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return [...students]
      .sort((a, b) => b.admissionDate.localeCompare(a.admissionDate))
      .filter((s) => {
        if (!query) return true;
        return `${fullName(s)} ${s.admissionNo} ${s.studentId}`.toLowerCase().includes(query);
      });
  }, [students, q]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Intake"
        title="Admissions"
        description="Admission file with the family monthly fee agreed for the selected year."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <YearSelect value={workingYear} onChange={setWorkingYear} />
            <Button asChild>
              <Link to="/admissions/new">New admission</Link>
            </Button>
          </div>
        }
      />
      <SearchField value={q} onChange={setQ} placeholder="Search admission no. or name…" />
      <Card className="overflow-hidden p-0 md:p-0">
        {rows.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No admission records"
            body="Start a file from the new admission form."
            action={
              <Button asChild>
                <Link to="/admissions/new">New admission</Link>
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.12em] text-muted">
                <tr className="border-b border-line">
                  <th className="px-4 py-3 font-medium md:px-5">Pupil</th>
                  <th className="px-2 py-3 font-medium">Family</th>
                  <th className="px-2 py-3 font-medium">₹ / mo</th>
                  {familyMonthlyFees(rows[0]?.familyId ?? "", invoices, payments, feeConsents, workingYear).map(
                    (m) => (
                      <th key={m.monthId} className="px-1 py-3 text-center font-medium">
                        {m.label}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((student) => {
                  const family = families.find((f) => f.id === student.familyId);
                  const consent = consentFor(student.familyId, workingYear, feeConsents);
                  const months = familyMonthlyFees(
                    student.familyId,
                    invoices,
                    payments,
                    feeConsents,
                    workingYear,
                  );
                  return (
                    <tr key={student.id} className="hover:bg-canvas-warm/70">
                      <td className="px-4 py-3 md:px-5">
                        <Link to="/students/$id" params={{ id: student.id }} className="flex items-center gap-3">
                          <StudentAvatar student={student} size="sm" />
                          <span>
                            <span className="block font-medium">{fullName(student)}</span>
                            <span className="block font-mono text-xs text-faint">
                              {student.admissionNo} · {formatDate(student.admissionDate)} · {classLabel(student)}
                            </span>
                          </span>
                        </Link>
                      </td>
                      <td className="px-2 py-3 text-muted">
                        {family ? familyLabel(family) : "—"}
                        <span className="ml-2 hidden lg:inline-flex">
                          <StatusBadge value={student.status} />
                        </span>
                      </td>
                      <td className="px-2 py-3 tabular-nums">
                        {consent ? formatINR(consent.monthlyAmount) : "—"}
                      </td>
                      {months.map((m) => (
                        <td key={m.monthId} className="px-1 py-3 text-center tabular-nums text-xs">
                          {m.billed ? (
                            <span className={m.overdue ? "text-danger" : m.due <= 0.5 ? "text-muted" : ""}>
                              {formatINR(m.billed)}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
