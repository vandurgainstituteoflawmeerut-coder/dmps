import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as GraduationCap } from "../_libs/lucide-react.mjs";
import { I as Button, M as useAccess, R as CLASSES, _ as fullName, f as classLabel, m as familyLabel, o as StatusBadge } from "./router-B1pzoAyY.mjs";
import { t as EmptyState } from "./empty-state-D5V5EYoN.mjs";
import { n as PageHeader } from "./select-CiyJpljB.mjs";
import { n as SearchField, t as FilterSelect } from "./search-toolbar-ChlyyCel.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
import { t as Card } from "./card-98gnQWUH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/students-B0NKF-4X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentsPage() {
	const { students, families, can } = useAccess();
	const [q, setQ] = (0, import_react.useState)("");
	const [klass, setKlass] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("Active");
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return students.filter((s) => klass === "all" ? true : s.className === klass).filter((s) => status === "all" ? true : s.status === status).filter((s) => {
			if (!query) return true;
			const family = families.find((f) => f.id === s.familyId);
			return `${fullName(s)} ${s.studentId} ${s.admissionNo} ${familyLabel(family)} ${family?.familyCode ?? ""}`.toLowerCase().includes(query);
		}).sort((a, b) => fullName(a).localeCompare(fullName(b)));
	}, [
		students,
		families,
		q,
		klass,
		status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Register",
				title: "Students",
				description: "Every pupil file — identity, class, and the family it belongs to.",
				actions: can("admit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admissions/new",
						children: "New admission"
					})
				}) : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-[1fr_10rem_10rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
						value: q,
						onChange: setQ,
						placeholder: "Search name, ID, family…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterSelect, {
						value: klass,
						onChange: setKlass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All classes"
						}), CLASSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterSelect, {
						value: status,
						onChange: setStatus,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All statuses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Active",
								children: "Active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Transferred",
								children: "Transferred"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Alumni",
								children: "Alumni"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden p-0 md:p-0",
				children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: GraduationCap,
					title: "No matching students",
					body: "Try a different search or admit a new pupil.",
					action: can("admit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admissions/new",
							children: "New admission"
						})
					}) : void 0
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: rows.map((student) => {
						const family = families.find((f) => f.id === student.familyId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/students/$id",
							params: { id: student.id },
							className: "flex items-center gap-3 px-4 py-3 hover:bg-canvas-warm/70 md:px-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, { student }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-medium",
										children: fullName(student)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-mono text-xs text-faint",
										children: student.studentId
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-sm text-muted sm:block",
									children: classLabel(student)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden max-w-40 truncate text-sm text-muted lg:block",
									children: family ? familyLabel(family) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: student.status })
							]
						}) }, student.id);
					})
				})
			})
		]
	});
}
//#endregion
export { StudentsPage as component };
