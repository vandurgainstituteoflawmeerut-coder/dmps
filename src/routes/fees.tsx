import { createFileRoute, Link } from "@tanstack/react-router";
import { IndianRupee } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/empty-state";
import { MonthlyFeeGrid } from "@/components/monthly-fee-grid";
import { PageHeader } from "@/components/page-header";
import { PaymentDialog } from "@/components/payment-dialog";
import { FilterSelect, SearchField } from "@/components/search-toolbar";
import { StudentAvatar } from "@/components/student-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { YearSelect } from "@/components/year-select";
import { useAccess } from "@/lib/school/access";
import { ACADEMIC_YEARS } from "@/lib/school/config";
import {
  consentFor,
  familyLabel,
  familyLedger,
  familyMonthlyFees,
  fullName,
} from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import type { FeeInvoice } from "@/lib/school/types";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/fees")({ component: FeesPage });

function FeesPage() {
  const { students, families, studentIds, can } = useAccess();
  const invoices = useSchoolStore((s) => s.invoices);
  const payments = useSchoolStore((s) => s.payments);
  const feeConsents = useSchoolStore((s) => s.feeConsents);
  const workingYear = useSchoolStore((s) => s.workingYear);
  const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);
  const copyYearFees = useSchoolStore((s) => s.copyYearFees);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("open");
  const [payInv, setPayInv] = useState<FeeInvoice | null>(null);

  const yearInvoices = invoices.filter((inv) => inv.academicYear === workingYear);
  const yearPayments = payments.filter((p) => yearInvoices.some((inv) => inv.id === p.invoiceId));
  const yearIndex = ACADEMIC_YEARS.findIndex((year) => year === workingYear);
  const priorYear = yearIndex > 0 ? ACADEMIC_YEARS[yearIndex - 1] : undefined;

  const familyRows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return families
      .filter((family) => students.some((s) => s.familyId === family.id && studentIds.has(s.id)))
      .map((family) => {
        const months = familyMonthlyFees(family.id, yearInvoices, yearPayments, feeConsents, workingYear);
        const ledger = familyLedger(family.id, yearInvoices, yearPayments);
        const consent = consentFor(family.id, workingYear, feeConsents);
        return { family, months, ledger, consent };
      })
      .filter((row) => {
        if (status === "all") return true;
        if (status === "open") return row.ledger.due > 0;
        if (status === "Overdue") return row.months.some((m) => m.overdue);
        if (status === "Paid") return row.ledger.due <= 0.5 && row.ledger.total > 0;
        return true;
      })
      .filter((row) => {
        if (!query) return true;
        return `${familyLabel(row.family)} ${row.family.familyCode}`.toLowerCase().includes(query);
      })
      .sort((a, b) => b.ledger.due - a.ledger.due);
  }, [families, students, studentIds, yearInvoices, yearPayments, feeConsents, workingYear, q, status]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Accounts"
        title="Fees"
        description="Family-wise monthly column for the selected year — parent-consented, then collected month by month."
        actions={<YearSelect value={workingYear} onChange={setWorkingYear} />}
      />

      {can("pay") && priorYear && !feeConsents.some((c) => c.academicYear === workingYear) ? (
        <Card>
          <p className="text-sm text-muted">
            No parent consent on {workingYear} yet. Copy last year’s monthly column, then amend household by household.
          </p>
          <Button
            className="mt-3"
            variant="outline"
            onClick={() => {
              const result = copyYearFees(priorYear, workingYear);
              if (typeof result === "string") toast.error(result);
              else toast.success(`Copied ${result} family fee files from ${priorYear}.`);
            }}
          >
            Copy {priorYear} family fees
          </Button>
        </Card>
      ) : null}

      <div className="grid gap-3 md:grid-cols-[1fr_12rem]">
        <SearchField value={q} onChange={setQ} placeholder="Search family…" />
        <FilterSelect value={status} onChange={setStatus}>
          <option value="open">Open balances</option>
          <option value="all">All families</option>
          <option value="Overdue">Overdue months</option>
          <option value="Paid">Cleared</option>
        </FilterSelect>
      </div>

      {familyRows.length === 0 ? (
        <Card>
          <EmptyState icon={IndianRupee} title="No family fees in this year" body="Record parent consent on the admission file, then collect month by month." />
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {familyRows.map(({ family, months, ledger, consent }) => (
            <Card key={family.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link to="/families/$id" params={{ id: family.id }} className="font-display text-xl hover:underline">
                    {familyLabel(family)}
                  </Link>
                  <p className="text-sm text-muted">
                    {family.familyCode}
                    {consent ? ` · ${formatINR(consent.monthlyAmount)} / month · consent ${consent.consentedBy}` : " · no consent this year"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {students
                      .filter((s) => s.familyId === family.id)
                      .map((s) => (
                        <Link
                          key={s.id}
                          to="/students/$id"
                          params={{ id: s.id }}
                          className="inline-flex items-center gap-2 text-xs text-muted hover:text-ink"
                        >
                          <StudentAvatar student={s} size="sm" />
                          {fullName(s)}
                        </Link>
                      ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl tabular-nums">{formatINR(ledger.due)}</p>
                  <p className="text-xs text-muted">due of {formatINR(ledger.total)}</p>
                </div>
              </div>
              <div className="mt-4">
                <MonthlyFeeGrid
                  months={months}
                  onMonth={can("pay") ? (cell) => cell.invoice && setPayInv(cell.invoice) : undefined}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      <PaymentDialog invoice={payInv} open={Boolean(payInv)} onOpenChange={(o) => !o && setPayInv(null)} />
    </div>
  );
}
