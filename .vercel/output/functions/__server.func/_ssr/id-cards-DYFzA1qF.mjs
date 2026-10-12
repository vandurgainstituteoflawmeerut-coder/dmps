import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as Printer } from "../_libs/lucide-react.mjs";
import { I as Button, M as useAccess, R as CLASSES, _ as fullName } from "./router-B1pzoAyY.mjs";
import { n as PageHeader } from "./select-CiyJpljB.mjs";
import { n as SearchField, t as FilterSelect } from "./search-toolbar-ChlyyCel.mjs";
import { t as StudentIdCard } from "./student-id-card-BPVt-jUU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/id-cards-DYFzA1qF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IdCardsPage() {
	const { students, families } = useAccess();
	const [q, setQ] = (0, import_react.useState)("");
	const [klass, setKlass] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return students.filter((s) => s.status === "Active").filter((s) => klass === "all" ? true : s.className === klass).filter((s) => `${fullName(s)} ${s.studentId}`.toLowerCase().includes(query)).sort((a, b) => `${a.className}${a.section}${a.rollNo}`.localeCompare(`${b.className}${b.section}${b.rollNo}`));
	}, [
		students,
		q,
		klass
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Identity",
				title: "Student ID cards",
				description: "Print-ready cards with emergency contact from the family file.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "no-print",
					onClick: () => window.print(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), " Print sheet"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print grid gap-3 md:grid-cols-[1fr_12rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
					value: q,
					onChange: setQ,
					placeholder: "Search student…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterSelect, {
					value: klass,
					onChange: setKlass,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All classes"
					}), CLASSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: rows.map((student) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentIdCard, {
					student,
					family: families.find((f) => f.id === student.familyId)
				}, student.id))
			})
		]
	});
}
//#endregion
export { IdCardsPage as component };
