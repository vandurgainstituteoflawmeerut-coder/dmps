import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as UsersRound } from "../_libs/lucide-react.mjs";
import { D as studentsOfFamily, I as Button, M as useAccess, Y as formatINR, h as familyLedger, m as familyLabel, nt as useSchoolStore, p as consentFor } from "./router-B1pzoAyY.mjs";
import { t as EmptyState } from "./empty-state-D5V5EYoN.mjs";
import { n as PageHeader } from "./select-CiyJpljB.mjs";
import { n as SearchField } from "./search-toolbar-ChlyyCel.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
import { t as Card } from "./card-98gnQWUH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/families-Ch_d6wTb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FamiliesPage() {
	const { families, students, can } = useAccess();
	const invoices = useSchoolStore((s) => s.invoices);
	const payments = useSchoolStore((s) => s.payments);
	const feeConsents = useSchoolStore((s) => s.feeConsents);
	const workingYear = useSchoolStore((s) => s.workingYear);
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return families.map((family) => {
			const children = studentsOfFamily(family.id, students);
			const yearInvoices = invoices.filter((inv) => inv.academicYear === workingYear);
			return {
				family,
				children,
				ledger: familyLedger(family.id, yearInvoices, payments),
				consent: consentFor(family.id, workingYear, feeConsents)
			};
		}).filter(({ family, children }) => {
			if (!query) return true;
			return `${familyLabel(family)} ${family.familyCode} ${family.phone} ${children.map((c) => `${c.firstName} ${c.lastName}`).join(" ")}`.toLowerCase().includes(query);
		}).sort((a, b) => familyLabel(a.family).localeCompare(familyLabel(b.family)));
	}, [
		families,
		students,
		invoices,
		payments,
		feeConsents,
		workingYear,
		q
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Households",
				title: "Families",
				description: "One file per household — siblings, the monthly fee column, and a shared guardian.",
				actions: can("admit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admissions/new",
						children: "Admit into a family"
					})
				}) : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: q,
				onChange: setQ,
				placeholder: "Search guardian, code, or child…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden p-0 md:p-0",
				children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: UsersRound,
					title: "No families match",
					body: "Admit a student and create a household file from the admission form."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: rows.map(({ family, children, ledger, consent }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/families/$id",
						params: { id: family.id },
						className: "flex flex-col gap-2 px-4 py-4 hover:bg-canvas-warm/70 sm:flex-row sm:items-center sm:gap-4 md:px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex shrink-0",
								children: children.slice(0, 4).map((child, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: index === 0 ? "inline-flex rounded-full ring-2 ring-raised" : "inline-flex -ml-2 rounded-full ring-2 ring-raised",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, {
										student: child,
										size: "sm"
									})
								}, child.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-medium",
									children: familyLabel(family)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-sm text-muted",
									children: [
										children.length,
										" ",
										children.length === 1 ? "child" : "children",
										children.length ? ` · ${children.map((c) => c.firstName).join(", ")}` : ""
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-faint",
								children: family.familyCode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-right text-sm tabular-nums",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: consent ? `${formatINR(consent.monthlyAmount)} / mo` : "No consent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: ledger.due > 0 ? `${formatINR(ledger.due)} due` : "Cleared"
								})]
							})
						]
					}) }, family.id))
				})
			})
		]
	});
}
//#endregion
export { FamiliesPage as component };
