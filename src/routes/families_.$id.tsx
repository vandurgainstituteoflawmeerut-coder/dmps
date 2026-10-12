import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { emptyFeeDraft, FeeConsentFields, type FeeConsentDraft } from "@/components/fee-consent-fields";
import { MonthlyFeeGrid } from "@/components/monthly-fee-grid";
import { PageHeader } from "@/components/page-header";
import { PaymentDialog } from "@/components/payment-dialog";
import { StudentAvatar } from "@/components/student-avatar";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { YearSelect } from "@/components/year-select";
import {
  classLabel,
  consentFor,
  familyLabel,
  familyLedger,
  familyMonthlyFees,
  fullName,
  gradeFromPercent,
  latestResult,
  resultTotals,
  studentsOfFamily,
} from "@/lib/school/compute";
import { useAccess } from "@/lib/school/access";
import { ACADEMIC_YEARS } from "@/lib/school/config";
import { useSchoolStore } from "@/lib/school/store";
import type { FeeInvoice } from "@/lib/school/types";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/families_/$id")({ component: FamilyDetail });

function FamilyDetail() {
  const { id } = Route.useParams();
  const { families, students, can } = useAccess();
  const results = useSchoolStore((s) => s.results);
  const allInvoices = useSchoolStore((s) => s.invoices);
  const payments = useSchoolStore((s) => s.payments);
  const certificates = useSchoolStore((s) => s.certificates);
  const feeConsents = useSchoolStore((s) => s.feeConsents);
  const workingYear = useSchoolStore((s) => s.workingYear);
  const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);
  const saveFeeConsent = useSchoolStore((s) => s.saveFeeConsent);
  const copyYearFees = useSchoolStore((s) => s.copyYearFees);
  const family = families.find((f) => f.id === id);
  const invoices = allInvoices.filter((inv) => inv.familyId === id && inv.academicYear === workingYear);
  const [payInv, setPayInv] = useState<FeeInvoice | null>(null);
  const existing = family ? consentFor(family.id, workingYear, feeConsents) : undefined;
  const [draft, setDraft] = useState<FeeConsentDraft | null>(null);

  if (!family) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-2xl">Family not found</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/families">Back to families</Link>
        </Button>
      </div>
    );
  }

  const children = studentsOfFamily(family.id, students);
  const ledger = familyLedger(family.id, invoices, payments);
  const months = familyMonthlyFees(family.id, allInvoices, payments, feeConsents, workingYear);
  const consent = existing;
  const editing =
    draft ??
    (consent
      ? {
          monthlyAmount: consent.monthlyAmount,
          months: consent.months,
          consentDate: consent.consentDate,
          consentedBy: consent.consentedBy,
          note: consent.note,
        }
      : emptyFeeDraft(
          workingYear,
          children.map((c) => c.className),
        ));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow={family.familyCode}
        title={familyLabel(family)}
        description={`${family.guardianRelation} · ${family.phone}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <YearSelect value={workingYear} onChange={setWorkingYear} />
            {can("admit") ? (
              <Button asChild>
                <Link to="/admissions/new" search={{ familyId: family.id }}>
                  Admit sibling
                </Link>
              </Button>
            ) : null}
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle>Household</CardTitle>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
            <Fact label="Father" value={family.fatherName || "—"} />
            <Fact label="Mother" value={family.motherName || "—"} />
            <Fact label="Email" value={family.email || "—"} />
            <Fact label="Occupation" value={family.occupation || "—"} />
            <Fact
              label="Address"
              value={`${family.addressLine1}, ${family.city}, ${family.state} ${family.pincode}`}
            />
            <Fact label="Notes" value={family.notes || "—"} />
          </dl>
        </Card>
        <Card>
          <p className="text-xs tracking-[0.14em] text-muted uppercase">Family ledger · {workingYear}</p>
          <p className="mt-2 font-display text-3xl tabular-nums">{formatINR(ledger.due)}</p>
          <p className="mt-1 text-sm text-muted">
            Billed {formatINR(ledger.total)} · Received {formatINR(ledger.paid)}
          </p>
          {consent ? (
            <p className="mt-3 text-xs text-faint">
              Consent {consent.consentedBy} · {consent.consentDate} · {formatINR(consent.monthlyAmount)} / month
            </p>
          ) : (
            <p className="mt-3 text-xs text-danger">No parent consent on file for {workingYear}.</p>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Children</CardTitle>
            <CardDesc>Individual files under this household.</CardDesc>
          </div>
        </CardHeader>
        <ul className="divide-y divide-line">
          {children.map((child) => {
            const latest = latestResult(child.id, results);
            const totals = latest ? resultTotals(latest) : null;
            const tc = certificates.find((c) => c.studentId === child.id && c.status === "Issued");
            return (
              <li key={child.id} className="flex flex-wrap items-center gap-3 py-3">
                <StudentAvatar student={child} />
                <div className="min-w-0 flex-1">
                  <Link to="/students/$id" params={{ id: child.id }} className="font-medium hover:underline">
                    {fullName(child)}
                  </Link>
                  <p className="text-sm text-muted">
                    {classLabel(child)} · {child.studentId}
                    {totals
                      ? ` · ${latest?.examName} ${totals.percent.toFixed(0)}% ${gradeFromPercent(totals.percent)}`
                      : ""}
                    {tc ? ` · ${tc.tcNo}` : ""}
                  </p>
                </div>
                <StatusBadge value={child.status} />
              </li>
            );
          })}
        </ul>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Monthly family fees · {workingYear}</CardTitle>
            <CardDesc>One household column. Tap a month to record a receipt.</CardDesc>
          </div>
        </CardHeader>
        <MonthlyFeeGrid
          months={months}
          onMonth={can("pay") ? (cell) => cell.invoice && setPayInv(cell.invoice) : undefined}
        />
      </Card>

      {can("pay") && !consent ? (
        <Card>
          <p className="text-sm text-muted">
            No consent on {workingYear}. Copy last year’s monthly column for every family, then amend this household.
          </p>
          <Button
            className="mt-3"
            variant="outline"
            onClick={() => {
              const idx = ACADEMIC_YEARS.findIndex((year) => year === workingYear);
              const prior = idx > 0 ? ACADEMIC_YEARS[idx - 1] : undefined;
              if (!prior) {
                toast.error("No previous year on the year list.");
                return;
              }
              const result = copyYearFees(prior, workingYear);
              if (typeof result === "string") toast.error(result);
              else toast.success(`Copied ${result} family files from ${prior}.`);
            }}
          >
            Copy previous year’s fees
          </Button>
        </Card>
      ) : null}

      {can("pay") ? (
        <Card>
          <h2 className="font-display text-xl">Amend consent · {workingYear}</h2>
          <p className="mt-1 text-sm text-muted">
            Change the monthly rate or a single month. Earlier years stay on file.
          </p>
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              const saved = saveFeeConsent({
                familyId: family.id,
                academicYear: workingYear,
                ...editing,
              });
              if (typeof saved === "string") {
                toast.error(saved);
                return;
              }
              setDraft(null);
              toast.success(`Fee consent saved for ${workingYear}`);
            }}
          >
            <FeeConsentFields year={workingYear} value={editing} onChange={setDraft} />
            <div className="mt-4 flex justify-end">
              <Button type="submit">Save this year’s fees</Button>
            </div>
          </form>
        </Card>
      ) : null}

      <PaymentDialog invoice={payInv} open={Boolean(payInv)} onOpenChange={(o) => !o && setPayInv(null)} />
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs tracking-[0.12em] text-muted uppercase">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}
