import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as IndianRupee } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as Button, M as useAccess, P as ACADEMIC_YEARS, Y as formatINR, _ as fullName, g as familyMonthlyFees, h as familyLedger, m as familyLabel, nt as useSchoolStore, p as consentFor } from "./router-B1pzoAyY.mjs";
import { t as EmptyState } from "./empty-state-D5V5EYoN.mjs";
import { n as PageHeader } from "./select-CiyJpljB.mjs";
import { n as SearchField, t as FilterSelect } from "./search-toolbar-ChlyyCel.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
import { t as Card } from "./card-98gnQWUH.mjs";
import { t as YearSelect } from "./year-select-DCWTT7li.mjs";
import { n as PaymentDialog, t as MonthlyFeeGrid } from "./payment-dialog-yUkwLxE-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fees-YtzrCo0U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FeesPage() {
	const { students, families, studentIds, can } = useAccess();
	const invoices = useSchoolStore((s) => s.invoices);
	const payments = useSchoolStore((s) => s.payments);
	const feeConsents = useSchoolStore((s) => s.feeConsents);
	const workingYear = useSchoolStore((s) => s.workingYear);
	const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);
	const copyYearFees = useSchoolStore((s) => s.copyYearFees);
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("open");
	const [payInv, setPayInv] = (0, import_react.useState)(null);
	const yearInvoices = invoices.filter((inv) => inv.academicYear === workingYear);
	const yearPayments = payments.filter((p) => yearInvoices.some((inv) => inv.id === p.invoiceId));
	const yearIndex = ACADEMIC_YEARS.findIndex((year) => year === workingYear);
	const priorYear = yearIndex > 0 ? ACADEMIC_YEARS[yearIndex - 1] : void 0;
	const familyRows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return families.filter((family) => students.some((s) => s.familyId === family.id && studentIds.has(s.id))).map((family) => {
			return {
				family,
				months: familyMonthlyFees(family.id, yearInvoices, yearPayments, feeConsents, workingYear),
				ledger: familyLedger(family.id, yearInvoices, yearPayments),
				consent: consentFor(family.id, workingYear, feeConsents)
			};
		}).filter((row) => {
			if (status === "all") return true;
			if (status === "open") return row.ledger.due > 0;
			if (status === "Overdue") return row.months.some((m) => m.overdue);
			if (status === "Paid") return row.ledger.due <= .5 && row.ledger.total > 0;
			return true;
		}).filter((row) => {
			if (!query) return true;
			return `${familyLabel(row.family)} ${row.family.familyCode}`.toLowerCase().includes(query);
		}).sort((a, b) => b.ledger.due - a.ledger.due);
	}, [
		families,
		students,
		studentIds,
		yearInvoices,
		yearPayments,
		feeConsents,
		workingYear,
		q,
		status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Accounts",
				title: "Fees",
				description: "Family-wise monthly column for the selected year — parent-consented, then collected month by month.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearSelect, {
					value: workingYear,
					onChange: setWorkingYear
				})
			}),
			can("pay") && priorYear && !feeConsents.some((c) => c.academicYear === workingYear) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"No parent consent on ",
					workingYear,
					" yet. Copy last year’s monthly column, then amend household by household."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-3",
				variant: "outline",
				onClick: () => {
					const result = copyYearFees(priorYear, workingYear);
					if (typeof result === "string") toast.error(result);
					else toast.success(`Copied ${result} family fee files from ${priorYear}.`);
				},
				children: [
					"Copy ",
					priorYear,
					" family fees"
				]
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-[1fr_12rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
					value: q,
					onChange: setQ,
					placeholder: "Search family…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterSelect, {
					value: status,
					onChange: setStatus,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "open",
							children: "Open balances"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All families"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Overdue",
							children: "Overdue months"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Paid",
							children: "Cleared"
						})
					]
				})]
			}),
			familyRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: IndianRupee,
				title: "No family fees in this year",
				body: "Record parent consent on the admission file, then collect month by month."
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-4",
				children: familyRows.map(({ family, months, ledger, consent }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/families/$id",
							params: { id: family.id },
							className: "font-display text-xl hover:underline",
							children: familyLabel(family)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [family.familyCode, consent ? ` · ${formatINR(consent.monthlyAmount)} / month · consent ${consent.consentedBy}` : " · no consent this year"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: students.filter((s) => s.familyId === family.id).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/students/$id",
								params: { id: s.id },
								className: "inline-flex items-center gap-2 text-xs text-muted hover:text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, {
									student: s,
									size: "sm"
								}), fullName(s)]
							}, s.id))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl tabular-nums",
							children: formatINR(ledger.due)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: ["due of ", formatINR(ledger.total)]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyFeeGrid, {
						months,
						onMonth: can("pay") ? (cell) => cell.invoice && setPayInv(cell.invoice) : void 0
					})
				})] }, family.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
				invoice: payInv,
				open: Boolean(payInv),
				onOpenChange: (o) => !o && setPayInv(null)
			})
		]
	});
}
//#endregion
export { FeesPage as component };
