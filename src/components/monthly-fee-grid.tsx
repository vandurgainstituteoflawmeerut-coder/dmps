import type { MonthCell } from "@/lib/school/compute";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function MonthlyFeeGrid({
  months,
  onMonth,
  compact,
}: {
  months: MonthCell[];
  onMonth?: (cell: MonthCell) => void;
  compact?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[44rem] border-separate border-spacing-0 text-center text-xs">
        <thead>
          <tr>
            {months.map((m) => (
              <th key={m.monthId} className="px-1 pb-2 font-medium text-muted">
                {m.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {months.map((m) => {
              const clickable = Boolean(onMonth && m.invoice);
              return (
                <td key={m.monthId} className="px-0.5">
                  <button
                    type="button"
                    disabled={!clickable}
                    onClick={() => m.invoice && onMonth?.(m)}
                    className={cn(
                      "flex h-14 w-full flex-col items-center justify-center rounded-lg px-1",
                      m.billed === 0
                        ? "text-faint"
                        : m.due <= 0.5
                          ? "bg-ok/10 text-ink"
                          : m.overdue
                            ? "bg-danger/10 text-danger"
                            : "bg-canvas-warm text-ink",
                      clickable && "hover:ring-2 hover:ring-primary/25",
                    )}
                  >
                    <span className={cn("tabular-nums", compact ? "text-[11px]" : "text-xs font-medium")}>
                      {m.billed ? formatINR(m.billed) : "—"}
                    </span>
                    {m.billed > 0 ? (
                      <span className="text-[10px] text-muted">
                        {m.due <= 0.5 ? "Paid" : m.overdue ? "Overdue" : `Due ${formatINR(m.due)}`}
                      </span>
                    ) : null}
                  </button>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
