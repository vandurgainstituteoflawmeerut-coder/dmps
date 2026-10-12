import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
  {
    variants: {
      tone: {
        neutral: "bg-canvas-warm text-ink-soft",
        primary: "bg-primary text-primary-fg",
        ok: "bg-ok-soft text-ok",
        warn: "bg-warn-soft text-warn",
        danger: "bg-danger-soft text-danger",
        info: "bg-info-soft text-info",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export function StatusBadge({ value }: { value: string }) {
  const tone =
    value === "Active" || value === "Paid" || value === "Issued"
      ? "ok"
      : value === "Partial" || value === "Due" || value === "Alumni" || value === "Draft"
        ? "warn"
        : value === "Overdue" || value === "Transferred"
          ? "danger"
          : "neutral";
  return <Badge tone={tone}>{value}</Badge>;
}
