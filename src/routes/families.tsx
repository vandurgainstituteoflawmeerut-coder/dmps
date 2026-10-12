import { createFileRoute, Link } from "@tanstack/react-router";
import { UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { SearchField } from "@/components/search-toolbar";
import { StudentAvatar } from "@/components/student-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAccess } from "@/lib/school/access";
import { familyLabel, familyLedger, consentFor, studentsOfFamily } from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/families")({ component: FamiliesPage });

function FamiliesPage() {
  const { families, students, can } = useAccess();
  const invoices = useSchoolStore((s) => s.invoices);
  const payments = useSchoolStore((s) => s.payments);
  const feeConsents = useSchoolStore((s) => s.feeConsents);
  const workingYear = useSchoolStore((s) => s.workingYear);
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return families
      .map((family) => {
        const children = studentsOfFamily(family.id, students);
        const yearInvoices = invoices.filter((inv) => inv.academicYear === workingYear);
        const ledger = familyLedger(family.id, yearInvoices, payments);
        const consent = consentFor(family.id, workingYear, feeConsents);
        return { family, children, ledger, consent };
      })
      .filter(({ family, children }) => {
        if (!query) return true;
        const hay = `${familyLabel(family)} ${family.familyCode} ${family.phone} ${children.map((c) => `${c.firstName} ${c.lastName}`).join(" ")}`.toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => familyLabel(a.family).localeCompare(familyLabel(b.family)));
  }, [families, students, invoices, payments, feeConsents, workingYear, q]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Households"
        title="Families"
        description="One file per household — siblings, the monthly fee column, and a shared guardian."
        actions={
          can("admit") ? (
            <Button asChild>
              <Link to="/admissions/new">Admit into a family</Link>
            </Button>
          ) : undefined
        }
      />
      <SearchField value={q} onChange={setQ} placeholder="Search guardian, code, or child…" />
      <Card className="overflow-hidden p-0 md:p-0">
        {rows.length === 0 ? (
          <EmptyState
            icon={UsersRound}
            title="No families match"
            body="Admit a student and create a household file from the admission form."
          />
        ) : (
          <ul className="divide-y divide-line">
            {rows.map(({ family, children, ledger, consent }) => (
              <li key={family.id}>
                <Link
                  to="/families/$id"
                  params={{ id: family.id }}
                  className="flex flex-col gap-2 px-4 py-4 hover:bg-canvas-warm/70 sm:flex-row sm:items-center sm:gap-4 md:px-5"
                >
                  <span className="flex shrink-0">
                    {children.slice(0, 4).map((child, index) => (
                      <span
                        key={child.id}
                        className={index === 0 ? "inline-flex rounded-full ring-2 ring-raised" : "inline-flex -ml-2 rounded-full ring-2 ring-raised"}
                      >
                        <StudentAvatar student={child} size="sm" />
                      </span>
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{familyLabel(family)}</span>
                    <span className="block text-sm text-muted">
                      {children.length} {children.length === 1 ? "child" : "children"}
                      {children.length
                        ? ` · ${children.map((c) => c.firstName).join(", ")}`
                        : ""}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-faint">{family.familyCode}</span>
                  <span className="text-right text-sm tabular-nums">
                    <span className="block">{consent ? `${formatINR(consent.monthlyAmount)} / mo` : "No consent"}</span>
                    <span className="text-xs text-muted">
                      {ledger.due > 0 ? `${formatINR(ledger.due)} due` : "Cleared"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
