import { monthsForYear, suggestedMonthlyFee } from "@/lib/school/config";
import type { FamilyFeeMonth } from "@/lib/school/types";
import { Field, Input } from "./ui/input";
import { Button } from "./ui/button";

export type FeeConsentDraft = {
  monthlyAmount: number;
  months: FamilyFeeMonth[];
  consentDate: string;
  consentedBy: string;
  note: string;
};

export function emptyFeeDraft(year: string, classNames: string[] = []): FeeConsentDraft {
  const amount = suggestedMonthlyFee(classNames);
  return {
    monthlyAmount: amount,
    months: monthsForYear(year).map((m) => ({ monthId: m.id, label: m.label, amount })),
    consentDate: new Date().toISOString().slice(0, 10),
    consentedBy: "",
    note: "",
  };
}

export function FeeConsentFields({
  year,
  value,
  onChange,
}: {
  year: string;
  value: FeeConsentDraft;
  onChange: (next: FeeConsentDraft) => void;
}) {
  const setAmount = (amount: number) => {
    onChange({ ...value, monthlyAmount: amount });
  };

  const applyAll = () => {
    onChange({
      ...value,
      months: monthsForYear(year).map((m) => ({
        monthId: m.id,
        label: m.label,
        amount: value.monthlyAmount,
      })),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Monthly family fee (₹)" hint="Agreed with the parent for this academic year. Applies to the household, not per child.">
          <Input
            type="number"
            min={0}
            step={50}
            value={value.monthlyAmount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
          />
        </Field>
        <div className="flex items-end">
          <Button type="button" variant="outline" onClick={applyAll}>
            Fill all 12 months
          </Button>
        </div>
        <Field label="Parent / guardian consent">
          <Input
            value={value.consentedBy}
            onChange={(e) => onChange({ ...value, consentedBy: e.target.value })}
            required
          />
        </Field>
        <Field label="Consent date">
          <Input
            type="date"
            value={value.consentDate}
            onChange={(e) => onChange({ ...value, consentDate: e.target.value })}
            required
          />
        </Field>
        <Field label="Note" className="sm:col-span-2">
          <Input
            value={value.note}
            onChange={(e) => onChange({ ...value, note: e.target.value })}
            placeholder="Concession, transport, or other terms"
          />
        </Field>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-ink-soft">Fees per month · {year}</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-center text-xs">
            <thead>
              <tr>
                {value.months.map((m) => (
                  <th key={m.monthId} className="px-1 pb-2 font-medium text-muted">
                    {m.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {value.months.map((m, i) => (
                  <td key={m.monthId} className="px-0.5">
                    <Input
                      type="number"
                      min={0}
                      step={50}
                      className="h-10 px-1 text-center tabular-nums"
                      value={m.amount}
                      onChange={(e) => {
                        const amount = Number(e.target.value) || 0;
                        const months = value.months.map((row, idx) => (idx === i ? { ...row, amount } : row));
                        onChange({ ...value, months });
                      }}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
