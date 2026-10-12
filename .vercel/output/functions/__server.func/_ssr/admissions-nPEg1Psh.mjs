import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as BookOpen } from "../_libs/lucide-react.mjs";
import { I as Button, M as useAccess, Y as formatINR, _ as fullName, f as classLabel, g as familyMonthlyFees, m as familyLabel, nt as useSchoolStore, o as StatusBadge, p as consentFor, q as formatDate } from "./router-B1pzoAyY.mjs";
import { t as EmptyState } from "./empty-state-D5V5EYoN.mjs";
import { n as PageHeader } from "./select-CiyJpljB.mjs";
import { n as SearchField } from "./search-toolbar-ChlyyCel.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
import { t as Card } from "./card-98gnQWUH.mjs";
import { t as YearSelect } from "./year-select-DCWTT7li.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admissions-nPEg1Psh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdmissionsPage() {
	const { students, families } = useAccess();
	const invoices = useSchoolStore((s) => s.invoices);
	const payments = useSchoolStore((s) => s.payments);
	const feeConsents = useSchoolStore((s) => s.feeConsents);
	const workingYear = useSchoolStore((s) => s.workingYear);
	const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return [...students].sort((a, b) => b.admissionDate.localeCompare(a.admissionDate)).filter((s) => {
			if (!query) return true;
			return `${fullName(s)} ${s.admissionNo} ${s.studentId}`.toLowerCase().includes(query);
		});
	}, [students, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Intake",
				title: "Admissions",
				description: "Admission file with the family monthly fee agreed for the selected year.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearSelect, {
						value: workingYear,
						onChange: setWorkingYear
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admissions/new",
							children: "New admission"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: q,
				onChange: setQ,
				placeholder: "Search admission no. or name…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden p-0 md:p-0",
				children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: BookOpen,
					title: "No admission records",
					body: "Start a file from the new admission form.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admissions/new",
							children: "New admission"
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[56rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs uppercase tracking-[0.12em] text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium md:px-5",
										children: "Pupil"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 font-medium",
										children: "Family"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 font-medium",
										children: "₹ / mo"
									}),
									familyMonthlyFees(rows[0]?.familyId ?? "", invoices, payments, feeConsents, workingYear).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-1 py-3 text-center font-medium",
										children: m.label
									}, m.monthId))
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-line",
							children: rows.map((student) => {
								const family = families.find((f) => f.id === student.familyId);
								const consent = consentFor(student.familyId, workingYear, feeConsents);
								const months = familyMonthlyFees(student.familyId, invoices, payments, feeConsents, workingYear);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-canvas-warm/70",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 md:px-5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/students/$id",
												params: { id: student.id },
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, {
													student,
													size: "sm"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block font-medium",
													children: fullName(student)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "block font-mono text-xs text-faint",
													children: [
														student.admissionNo,
														" · ",
														formatDate(student.admissionDate),
														" · ",
														classLabel(student)
													]
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-2 py-3 text-muted",
											children: [family ? familyLabel(family) : "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2 hidden lg:inline-flex",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: student.status })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2 py-3 tabular-nums",
											children: consent ? formatINR(consent.monthlyAmount) : "—"
										}),
										months.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-1 py-3 text-center tabular-nums text-xs",
											children: m.billed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: m.overdue ? "text-danger" : m.due <= .5 ? "text-muted" : "",
												children: formatINR(m.billed)
											}) : "—"
										}, m.monthId))
									]
								}, student.id);
							})
						})]
					})
				})
			})
		]
	});
}
//#endregion
export { AdmissionsPage as component };
