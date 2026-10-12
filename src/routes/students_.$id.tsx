import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { useState } from "react";
import { IssueTcDialog } from "@/components/issue-tc-dialog";
import { MonthlyFeeGrid } from "@/components/monthly-fee-grid";
import { PageHeader } from "@/components/page-header";
import { PaymentDialog } from "@/components/payment-dialog";
import { ResultDialog } from "@/components/result-dialog";
import { StudentAvatar } from "@/components/student-avatar";
import { StudentIdCard } from "@/components/student-id-card";
import { StudentPhotoField } from "@/components/student-photo-field";
import { TcCertificate } from "@/components/tc-certificate";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  classLabel,
  consentFor,
  familyLabel,
  familyLedger,
  familyMonthlyFees,
  fullName,
  gradeFromPercent,
  resultTotals,
} from "@/lib/school/compute";
import { canEditPhoto, useAccess } from "@/lib/school/access";
import { useSchoolStore } from "@/lib/school/store";
import type { FeeInvoice } from "@/lib/school/types";
import { ageFromDob, formatDate, formatINR } from "@/lib/utils";

export const Route = createFileRoute("/students_/$id")({ component: StudentDetail });

function StudentDetail() {
  const { id } = Route.useParams();
  const { students, families, can, session } = useAccess();
  const allResults = useSchoolStore((s) => s.results);
  const allInvoices = useSchoolStore((s) => s.invoices);
  const payments = useSchoolStore((s) => s.payments);
  const feeConsents = useSchoolStore((s) => s.feeConsents);
  const workingYear = useSchoolStore((s) => s.workingYear);
  const allCertificates = useSchoolStore((s) => s.certificates);
  const updateStudent = useSchoolStore((s) => s.updateStudent);
  const student = students.find((row) => row.id === id);
  const family = families.find((f) => f.id === student?.familyId);
  const siblings = students.filter((row) => row.familyId === student?.familyId && row.id !== id);
  const results = allResults
    .filter((r) => r.studentId === id)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const invoices = allInvoices.filter((inv) => inv.familyId === student?.familyId && inv.academicYear === workingYear);
  const certificates = allCertificates.filter((c) => c.studentId === id);
  const [payInv, setPayInv] = useState<FeeInvoice | null>(null);
  const [resultOpen, setResultOpen] = useState(false);
  const [tcOpen, setTcOpen] = useState(false);

  if (!student) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-2xl">Student not found</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/students">Back to register</Link>
        </Button>
      </div>
    );
  }

  const ledger = familyLedger(student.familyId, invoices, payments);
  const consent = consentFor(student.familyId, workingYear, feeConsents);
  const months = familyMonthlyFees(student.familyId, allInvoices, payments, feeConsents, workingYear);
  const issued = certificates.find((c) => c.status === "Issued");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow={student.studentId}
        title={fullName(student)}
        description={`${classLabel(student)} · Roll ${student.rollNo} · ${student.admissionNo}`}
        actions={<StatusBadge value={student.status} />}
      />

      <div className="flex flex-wrap items-start gap-4">
        {canEditPhoto(session, student) ? (
          <StudentPhotoField
            value={student.photo}
            onChange={(photo) => updateStudent(student.id, { photo })}
            name={fullName(student)}
          />
        ) : (
          <StudentAvatar student={student} size="lg" shape="portrait" />
        )}
        {family ? (
          <Link
            to="/families/$id"
            params={{ id: family.id }}
            className="rounded-xl bg-canvas-warm px-3 py-2 text-sm hover:bg-line/80"
          >
            <span className="block text-xs tracking-[0.12em] text-muted uppercase">Family</span>
            {familyLabel(family)} · {family.familyCode}
          </Link>
        ) : null}
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="id">ID card</TabsTrigger>
          <TabsTrigger value="tc">Transfer cert.</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardTitle>Admission</CardTitle>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <Fact label="Date of birth" value={`${formatDate(student.dateOfBirth)} (${ageFromDob(student.dateOfBirth)} yrs)`} />
                <Fact label="Gender" value={student.gender} />
                <Fact label="Blood group" value={student.bloodGroup} />
                <Fact label="Category" value={student.category} />
                <Fact label="Admitted" value={formatDate(student.admissionDate)} />
                <Fact label="Previous school" value={student.previousSchool || "—"} />
              </dl>
            </Card>
            <Card>
              <CardTitle>Household</CardTitle>
              {family ? (
                <div className="mt-4 space-y-3 text-sm">
                  <p>
                    {family.guardianName}
                    <span className="block text-muted">{family.guardianRelation}</span>
                  </p>
                  <p className="text-muted">
                    {family.addressLine1}, {family.city} {family.pincode}
                  </p>
                  <p>{family.phone}</p>
                  {siblings.length ? (
                    <div>
                      <p className="mb-1 text-xs tracking-[0.12em] text-muted uppercase">Siblings</p>
                      <ul className="space-y-1">
                        {siblings.map((sib) => (
                          <li key={sib.id}>
                            <Link to="/students/$id" params={{ id: sib.id }} className="hover:underline">
                              {fullName(sib)} · {classLabel(sib)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-muted">Only child on roll.</p>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted">No family file linked.</p>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="mb-4 flex justify-end">
            {can("result") ? (
              <Button onClick={() => setResultOpen(true)} disabled={student.status !== "Active"}>
                Enter result
              </Button>
            ) : null}
          </div>
          {results.length === 0 ? (
            <Card>
              <p className="text-sm text-muted">No examinations recorded yet.</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {results.map((result) => {
                const totals = resultTotals(result);
                return (
                  <Card key={result.id}>
                    <CardHeader>
                      <div>
                        <CardTitle>
                          {result.examName} · {result.academicYear}
                        </CardTitle>
                        <CardDesc>Class {result.className} · {formatDate(result.publishedAt)}</CardDesc>
                      </div>
                      <Badge tone="primary">
                        {totals.percent.toFixed(1)}% · {gradeFromPercent(totals.percent)}
                      </Badge>
                    </CardHeader>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-96 text-left text-sm">
                        <thead className="text-xs tracking-[0.08em] text-muted uppercase">
                          <tr>
                            <th className="pb-2 font-medium">Subject</th>
                            <th className="pb-2 font-medium">Marks</th>
                            <th className="pb-2 font-medium">Max</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {result.subjects.map((sub) => (
                            <tr key={sub.name}>
                              <td className="py-2">{sub.name}</td>
                              <td className="py-2 tabular-nums">{sub.marks}</td>
                              <td className="py-2 tabular-nums text-muted">{sub.maxMarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {result.remarks ? <p className="mt-3 text-sm text-muted">{result.remarks}</p> : null}
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="fees">
          <Card className="mb-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.14em] text-muted uppercase">Family monthly fees · {workingYear}</p>
                <p className="mt-1 font-display text-2xl tabular-nums">{formatINR(ledger.due)} due</p>
                <p className="text-sm text-muted">
                  {consent
                    ? `${formatINR(consent.monthlyAmount)} / month · ${consent.consentedBy}`
                    : "No parent consent this year"}
                  {" · "}
                  Billed {formatINR(ledger.total)} · Received {formatINR(ledger.paid)}
                </p>
              </div>
              {family ? (
                <Button asChild variant="outline">
                  <Link to="/families/$id" params={{ id: family.id }}>
                    Open family ledger
                  </Link>
                </Button>
              ) : null}
            </div>
          </Card>
          <Card>
            <MonthlyFeeGrid
              months={months}
              onMonth={can("pay") ? (cell) => cell.invoice && setPayInv(cell.invoice) : undefined}
            />
          </Card>
        </TabsContent>

        <TabsContent value="id">
          <div className="flex flex-col items-start gap-4">
            <Button variant="outline" className="no-print" onClick={() => window.print()}>
              <Printer /> Print card
            </Button>
            <StudentIdCard student={student} family={family} />
          </div>
        </TabsContent>

        <TabsContent value="tc">
          {issued ? (
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="no-print w-fit" onClick={() => window.print()}>
                <Printer /> Print certificate
              </Button>
              <TcCertificate student={student} family={family} certificate={issued} />
            </div>
          ) : (
            <Card>
              <CardTitle>No certificate on file</CardTitle>
              <CardDesc>Issue a TC when the pupil leaves. The student status will change to Transferred.</CardDesc>
              <Button className="mt-5" onClick={() => setTcOpen(true)} disabled={student.status === "Transferred" || !can("tc")}>
                Issue transfer certificate
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <PaymentDialog invoice={payInv} open={Boolean(payInv)} onOpenChange={(o) => !o && setPayInv(null)} />
      <ResultDialog open={resultOpen} onOpenChange={setResultOpen} presetStudentId={student.id} />
      <IssueTcDialog student={student} open={tcOpen} onOpenChange={setTcOpen} />
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs tracking-[0.12em] text-muted uppercase">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}
