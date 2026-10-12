import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ScrollText } from "../_libs/lucide-react.mjs";
import { I as Button, M as useAccess, _ as fullName, m as familyLabel, nt as useSchoolStore, o as StatusBadge, q as formatDate } from "./router-B1pzoAyY.mjs";
import { t as EmptyState } from "./empty-state-D5V5EYoN.mjs";
import { n as PageHeader, t as NativeSelect } from "./select-CiyJpljB.mjs";
import { n as SearchField } from "./search-toolbar-ChlyyCel.mjs";
import { t as Card } from "./card-98gnQWUH.mjs";
import { n as TcCertificate, t as IssueTcDialog } from "./tc-certificate-DBOEl-N8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tc-BXbOABvd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TcPage() {
	const { students, families, studentIds, can } = useAccess();
	const certificates = useSchoolStore((s) => s.certificates);
	const [q, setQ] = (0, import_react.useState)("");
	const [previewId, setPreviewId] = (0, import_react.useState)(certificates[0]?.id ?? "");
	const [issueFor, setIssueFor] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return certificates.filter((c) => studentIds.has(c.studentId)).map((c) => {
			const student = students.find((s) => s.id === c.studentId);
			return {
				c,
				student,
				family: families.find((f) => f.id === student?.familyId)
			};
		}).filter(({ c, student, family }) => {
			if (!query) return true;
			return `${c.tcNo} ${student ? fullName(student) : ""} ${family?.familyCode ?? ""}`.toLowerCase().includes(query);
		}).sort((a, b) => b.c.issueDate.localeCompare(a.c.issueDate));
	}, [
		certificates,
		students,
		families,
		q,
		studentIds
	]);
	const preview = rows.find((r) => r.c.id === previewId) ?? rows[0];
	const eligible = students.filter((s) => s.status === "Active" && !certificates.some((c) => c.studentId === s.id && c.status === "Issued"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Leaving",
				title: "Transfer certificates",
				description: "Issue a TC from a student file. Issued papers are listed here, student-wise, with the family on record.",
				actions: eligible.length && can("tc") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						className: "w-52",
						defaultValue: "",
						onChange: (e) => {
							const stu = students.find((s) => s.id === e.target.value);
							if (stu) setIssueFor(stu);
							e.target.value = "";
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							disabled: true,
							children: "Issue for…"
						}), eligible.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: fullName(s)
						}, s.id))]
					})
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: q,
				onChange: setQ,
				placeholder: "Search TC number or student…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[20rem_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "overflow-hidden p-0 md:p-0 h-fit",
					children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: ScrollText,
						title: "No certificates yet",
						body: "Issue a TC when a pupil leaves. The student is then marked Transferred."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line",
						children: rows.map(({ c, student, family }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setPreviewId(c.id),
							className: "flex w-full flex-col items-start gap-1 px-4 py-3 text-left hover:bg-canvas-warm/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex w-full items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs",
										children: c.tcNo
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: c.status })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: student ? fullName(student) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted",
									children: [formatDate(c.issueDate), family ? ` · ${familyLabel(family)}` : ""]
								})
							]
						}) }, c.id))
					})
				}), preview?.student ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "no-print flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => window.print(),
							children: "Print"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/students/$id",
								params: { id: preview.student.id },
								children: "Open student file"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TcCertificate, {
						student: preview.student,
						family: preview.family,
						certificate: preview.c
					})]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueTcDialog, {
				student: issueFor,
				open: Boolean(issueFor),
				onOpenChange: (o) => !o && setIssueFor(null)
			})
		]
	});
}
//#endregion
export { TcPage as component };
