import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as Button, K as cn, T as paymentsForInvoice, V as PAYMENT_MODES, Y as formatINR, b as invoiceStatus, et as todayIso, nt as useSchoolStore, x as invoiceTotal } from "./router-B1pzoAyY.mjs";
import { t as NativeSelect } from "./select-CiyJpljB.mjs";
import { n as Input, t as Field } from "./input-DDEqQOMG.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BnFxRqTe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment-dialog-yUkwLxE-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MonthlyFeeGrid({ months, onMonth, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[44rem] border-separate border-spacing-0 text-center text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: months.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "px-1 pb-2 font-medium text-muted",
				children: m.label
			}, m.monthId)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: months.map((m) => {
				const clickable = Boolean(onMonth && m.invoice);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-0.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !clickable,
						onClick: () => m.invoice && onMonth?.(m),
						className: cn("flex h-14 w-full flex-col items-center justify-center rounded-lg px-1", m.billed === 0 ? "text-faint" : m.due <= .5 ? "bg-ok/10 text-ink" : m.overdue ? "bg-danger/10 text-danger" : "bg-canvas-warm text-ink", clickable && "hover:ring-2 hover:ring-primary/25"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("tabular-nums", compact ? "text-[11px]" : "text-xs font-medium"),
							children: m.billed ? formatINR(m.billed) : "—"
						}), m.billed > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted",
							children: m.due <= .5 ? "Paid" : m.overdue ? "Overdue" : `Due ${formatINR(m.due)}`
						}) : null]
					})
				}, m.monthId);
			}) }) })]
		})
	});
}
function PaymentDialog({ invoice, open, onOpenChange }) {
	const payments = useSchoolStore((s) => s.payments);
	const recordPayment = useSchoolStore((s) => s.recordPayment);
	const paid = invoice ? paymentsForInvoice(invoice.id, payments) : 0;
	const due = invoice ? Math.max(0, invoiceTotal(invoice) - paid) : 0;
	const [amount, setAmount] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("UPI");
	const [paidAt, setPaidAt] = (0, import_react.useState)(todayIso());
	const [note, setNote] = (0, import_react.useState)("");
	const reset = (next) => {
		setAmount(next ? String(Math.max(0, invoiceTotal(next) - paymentsForInvoice(next.id, payments))) : "");
		setMode("UPI");
		setPaidAt(todayIso());
		setNote("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (next && invoice) reset(invoice);
			onOpenChange(next);
		},
		children: invoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "Record payment",
			description: `${invoice.termLabel} · ${formatINR(due)} outstanding`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					const value = Number(amount);
					if (!value || value < 0) return;
					const row = recordPayment({
						invoiceId: invoice.id,
						amount: Math.min(value, due),
						mode,
						paidAt,
						note
					});
					if (row) toast.success(`Receipt ${row.receiptNo} recorded`);
					onOpenChange(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Status ",
							invoiceStatus(invoice, payments),
							" · billed ",
							formatINR(invoiceTotal(invoice))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Amount",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: due,
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mode",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								value: mode,
								onChange: (e) => setMode(e.target.value),
								children: PAYMENT_MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: m,
									children: m
								}, m))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: paidAt,
								onChange: (e) => setPaidAt(e.target.value),
								required: true
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Note",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (e) => setNote(e.target.value),
							placeholder: "Optional"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => onOpenChange(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: due <= 0,
							children: "Save receipt"
						})]
					})
				]
			})
		}) : null
	});
}
//#endregion
export { PaymentDialog as n, MonthlyFeeGrid as t };
