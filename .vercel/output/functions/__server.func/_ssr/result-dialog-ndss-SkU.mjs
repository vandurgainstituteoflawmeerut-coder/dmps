import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as SCHOOL, I as Button, M as useAccess, Q as subjectsForClass, _ as fullName, et as todayIso, nt as useSchoolStore } from "./router-B1pzoAyY.mjs";
import { t as NativeSelect } from "./select-CiyJpljB.mjs";
import { n as Input, t as Field } from "./input-DDEqQOMG.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BnFxRqTe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/result-dialog-ndss-SkU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResultDialog({ open, onOpenChange, presetStudentId }) {
	const { students } = useAccess();
	const addResult = useSchoolStore((s) => s.addResult);
	const exams = useSchoolStore((s) => s.exams);
	const workingYear = useSchoolStore((s) => s.workingYear);
	const papers = exams.length ? exams : [{
		id: "ex_annual",
		name: "Annual",
		maxMarks: 100
	}];
	const active = students.filter((s) => s.status === "Active");
	const [studentId, setStudentId] = (0, import_react.useState)(presetStudentId ?? active[0]?.id ?? "");
	const [examName, setExamName] = (0, import_react.useState)(papers[0]?.name ?? "Annual");
	const [publishedAt, setPublishedAt] = (0, import_react.useState)(todayIso());
	const [remarks, setRemarks] = (0, import_react.useState)("");
	const student = students.find((s) => s.id === studentId);
	const paper = papers.find((item) => item.name === examName) ?? papers[0];
	const subjectDefs = (0, import_react.useMemo)(() => {
		if (!student || !paper) return [];
		return subjectsForClass(student.className).map((subject) => ({
			...subject,
			maxMarks: paper.maxMarks
		}));
	}, [student, paper]);
	const [scores, setScores] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (open) {
			const id = presetStudentId ?? active[0]?.id ?? "";
			setStudentId(id);
			setExamName(papers[0]?.name ?? "Annual");
			setPublishedAt(todayIso());
			setRemarks("");
			const stu = students.find((s) => s.id === id);
			const defs = stu ? subjectsForClass(stu.className) : [];
			setScores(Object.fromEntries(defs.map((d) => [d.name, ""])));
		}
	}, [open, presetStudentId]);
	(0, import_react.useEffect)(() => {
		if (!student) return;
		setScores((prev) => {
			const next = {};
			for (const d of subjectsForClass(student.className)) next[d.name] = prev[d.name] ?? "";
			return next;
		});
	}, [student]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "Enter or amend result",
			description: `Marks for ${workingYear}. Saving the same exam again updates that year’s file.`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					if (!student) return;
					addResult({
						studentId: student.id,
						academicYear: workingYear || SCHOOL.academicYear,
						examName,
						className: student.className,
						publishedAt,
						remarks,
						subjects: subjectDefs.map((d) => ({
							name: d.name,
							maxMarks: d.maxMarks,
							marks: Math.min(d.maxMarks, Math.max(0, Number(scores[d.name] || 0)))
						}))
					});
					toast.success(`Result saved for ${fullName(student)} · ${workingYear}`);
					onOpenChange(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Student",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								value: studentId,
								onChange: (e) => setStudentId(e.target.value),
								children: active.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: s.id,
									children: [
										fullName(s),
										" · ",
										s.className,
										"-",
										s.section
									]
								}, s.id))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Examination",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								value: examName,
								onChange: (e) => setExamName(e.target.value),
								children: papers.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: ex.name,
									children: [
										ex.name,
										" · max ",
										ex.maxMarks
									]
								}, ex.id))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: subjectDefs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `${d.name} / ${d.maxMarks}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								max: d.maxMarks,
								value: scores[d.name] ?? "",
								onChange: (e) => setScores((prev) => ({
									...prev,
									[d.name]: e.target.value
								})),
								required: true
							})
						}, d.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Published",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: publishedAt,
							onChange: (e) => setPublishedAt(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Remarks",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: remarks,
							onChange: (e) => setRemarks(e.target.value),
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
							children: "Save result"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { ResultDialog as t };
