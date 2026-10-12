import { useState } from "react";
import { toast } from "sonner";
import { PAYMENT_MODES } from "@/lib/school/config";
import { invoiceStatus, invoiceTotal, paymentsForInvoice } from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import type { FeeInvoice, PaymentMode } from "@/lib/school/types";
import { formatINR, todayIso } from "@/lib/utils";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Field, Input } from "./ui/input";
import { NativeSelect } from "./ui/select";

export function PaymentDialog({
  invoice,
  open,
  onOpenChange,
}: {
  invoice: FeeInvoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const payments = useSchoolStore((s) => s.payments);
  const recordPayment = useSchoolStore((s) => s.recordPayment);
  const paid = invoice ? paymentsForInvoice(invoice.id, payments) : 0;
  const due = invoice ? Math.max(0, invoiceTotal(invoice) - paid) : 0;
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<PaymentMode>("UPI");
  const [paidAt, setPaidAt] = useState(todayIso());
  const [note, setNote] = useState("");

  const reset = (next: FeeInvoice | null) => {
    setAmount(next ? String(Math.max(0, invoiceTotal(next) - paymentsForInvoice(next.id, payments))) : "");
    setMode("UPI");
    setPaidAt(todayIso());
    setNote("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next && invoice) reset(invoice);
        onOpenChange(next);
      }}
    >
      {invoice ? (
        <DialogContent
          title="Record payment"
          description={`${invoice.termLabel} · ${formatINR(due)} outstanding`}
        >
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const value = Number(amount);
              if (!value || value < 0) return;
              const row = recordPayment({
                invoiceId: invoice.id,
                amount: Math.min(value, due),
                mode,
                paidAt,
                note,
              });
              if (row) toast.success(`Receipt ${row.receiptNo} recorded`);
              onOpenChange(false);
            }}
          >
            <p className="text-sm text-muted">
              Status {invoiceStatus(invoice, payments)} · billed {formatINR(invoiceTotal(invoice))}
            </p>
            <Field label="Amount">
              <Input
                type="number"
                min={1}
                max={due}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Mode">
                <NativeSelect value={mode} onChange={(e) => setMode(e.target.value as PaymentMode)}>
                  {PAYMENT_MODES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="Date">
                <Input type="date" value={paidAt} onChange={(e) => setPaidAt(e.target.value)} required />
              </Field>
            </div>
            <Field label="Note">
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={due <= 0}>
                Save receipt
              </Button>
            </div>
          </form>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
