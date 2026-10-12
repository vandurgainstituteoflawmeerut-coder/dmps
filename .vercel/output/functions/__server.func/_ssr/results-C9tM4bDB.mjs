import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ScrollText } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as resultTotals, I as Button, M as useAccess, R as CLASSES, _ as fullName, a as Badge, m as familyLabel, nt as useSchoolStore, q as formatDate, tt as uid, v as gradeFromPercent } from "./router-B1pzoAyY.mjs";
import { t as EmptyState } from "./empty-state-D5V5EYoN.mjs";
import { n as PageHeader } from "./select-CiyJpljB.mjs";
import { n as Input, t as Field } from "./input-DDEqQOMG.mjs";
import { n as SearchField, t as FilterSelect } from "./search-toolbar-ChlyyCel.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
import { i as CardTitle, n as CardDesc, t as Card } from "./card-98gnQWUH.mjs";
import { t as YearSelect } from "./year-select-DCWTT7li.mjs";
import { t as ResultDialog } from "./result-dialog-ndss-SkU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/results-C9tM4bDB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExamSchemeCard() {
	const { can } = useAccess();
	const exams = useSchoolStore((s) => s.exams);
	const setExams = useSchoolStore((s) => s.setExams);
	const editable = can("exams");
	const [rows, setRows] = (0, import_react.useState)(exams);
	(0, import_react.useEffect)(() => {
		setRows(exams);
	}, [exams]);
	if (!exams.length && !editable) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Examinations and maximum marks" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: editable ? "Principal only. Rename Unit 1, Unit 2, Terminal, Half Yearly, Annual — or add another — and set the maximum marks for each paper. Marks already published keep the maximum they were entered with." : "Set by the Principal. Teachers enter marks against these papers." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-col gap-3",
			children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-[1fr_8rem_auto] sm:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: index === 0 ? "Examination" : "Examination",
						className: index === 0 ? "" : "sm:[&>span]:sr-only",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: row.name,
							disabled: !editable,
							onChange: (e) => setRows((prev) => prev.map((item) => item.id === row.id ? {
								...item,
								name: e.target.value
							} : item))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Max marks",
						className: index === 0 ? "" : "sm:[&>span]:sr-only",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 200,
							value: row.maxMarks,
							disabled: !editable,
							onChange: (e) => setRows((prev) => prev.map((item) => item.id === row.id ? {
								...item,
								maxMarks: Number(e.target.value)
							} : item))
						})
					}),
					editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							disabled: index === 0,
							onClick: () => setRows((prev) => {
								const next = [...prev];
								const [moved] = next.splice(index, 1);
								if (moved) next.splice(index - 1, 0, moved);
								return next;
							}),
							children: "Up"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: () => setRows((prev) => prev.filter((item) => item.id !== row.id)),
							children: "Remove"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "pb-2 text-sm text-muted",
						children: ["out of ", row.maxMarks]
					})
				]
			}, row.id))
		}),
		editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap justify-end gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setRows((prev) => [...prev, {
					id: uid("ex"),
					name: "",
					maxMarks: 50
				}]),
				children: "Add examination"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				onClick: () => {
					const error = setExams(rows);
					if (error) toast.error(error);
					else toast.success("Examination scheme saved.");
				},
				children: "Save scheme"
			})]
		}) : null
	] });
}
function ResultsPage() {
	const { students, families, studentIds, can } = useAccess();
	const results = useSchoolStore((s) => s.results);
	const exams = useSchoolStore((s) => s.exams);
	const workingYear = useSchoolStore((s) => s.workingYear);
	const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);
	const [q, setQ] = (0, import_react.useState)("");
	const [exam, setExam] = (0, import_react.useState)("all");
	const [klass, setKlass] = (0, import_react.useState)("all");
	const [view, setView] = (0, import_react.useState)("student");
	const [open, setOpen] = (0, import_react.useState)(false);
	const examOptions = (0, import_react.useMemo)(() => {
		const names = /* @__PURE__ */ new Set();
		for (const exam of exams) names.add(exam.name);
		for (const result of results) names.add(result.examName);
		return [...names];
	}, [exams, results]);
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return results.filter((r) => r.academicYear === workingYear).filter((r) => studentIds.has(r.studentId)).filter((r) => exam === "all" ? true : r.examName === exam).filter((r) => klass === "all" ? true : r.className === klass).map((r) => {
			const student = students.find((s) => s.id === r.studentId);
			return {
				result: r,
				student,
				family: families.find((f) => f.id === student?.familyId),
				totals: resultTotals(r)
			};
		}).filter(({ student, family, result }) => {
			if (!query) return true;
			return `${student ? fullName(student) : ""} ${student?.studentId ?? ""} ${family?.familyCode ?? ""} ${result.examName}`.toLowerCase().includes(query);
		}).sort((a, b) => b.result.publishedAt.localeCompare(a.result.publishedAt));
	}, [
		results,
		students,
		families,
		q,
		exam,
		klass,
		studentIds,
		workingYear
	]);
	const familyGroups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const row of rows) {
			const id = row.family?.id ?? "none";
			const current = map.get(id) ?? {
				familyName: row.family ? familyLabel(row.family) : "Unlinked",
				code: row.family?.familyCode ?? "—",
				id,
				items: []
			};
			current.items.push(row);
			map.set(id, current);
		}
		return [...map.values()].sort((a, b) => a.familyName.localeCompare(b.familyName));
	}, [rows]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Academics",
				title: "Results",
				description: "Examination records for the selected year, individually or grouped by household. Enter a new year to amend without erasing the last.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearSelect, {
						value: workingYear,
						onChange: setWorkingYear
					}), can("result") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setOpen(true),
						children: "Enter result"
					}) : null]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: view === "student" ? "default" : "outline",
					onClick: () => setView("student"),
					children: "Student-wise"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: view === "family" ? "default" : "outline",
					onClick: () => setView("family"),
					children: "Family-wise"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
						value: q,
						onChange: setQ,
						placeholder: "Search student or family…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterSelect, {
						value: exam,
						onChange: setExam,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All exams"
						}), examOptions.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: ex }, ex))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterSelect, {
						value: klass,
						onChange: setKlass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All classes"
						}), CLASSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamSchemeCard, {}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: ScrollText,
				title: "No results yet",
				body: "Publish a term examination from this desk."
			}) }) : view === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden p-0 md:p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: rows.map(({ result, student, totals }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-3 px-4 py-3 md:px-5",
						children: [
							student ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, {
								student,
								size: "sm"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [student ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/students/$id",
									params: { id: student.id },
									className: "font-medium hover:underline",
									children: fullName(student)
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Unknown student" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										result.examName,
										" · Class ",
										result.className,
										" · ",
										formatDate(result.publishedAt)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "primary",
								children: [
									totals.percent.toFixed(1),
									"% · ",
									gradeFromPercent(totals.percent)
								]
							})
						]
					}, result.id))
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: familyGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-baseline justify-between gap-3",
					children: [group.id !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/families/$id",
						params: { id: group.id },
						className: "font-display text-xl hover:underline",
						children: group.familyName
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: group.familyName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-faint",
						children: group.code
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: group.items.map(({ result, student, totals }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm",
							children: [
								student ? fullName(student) : "—",
								" · ",
								result.examName,
								" · Class ",
								result.className
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm tabular-nums",
							children: [
								totals.percent.toFixed(1),
								"% ",
								gradeFromPercent(totals.percent)
							]
						})]
					}, result.id))
				})] }, group.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultDialog, {
				open,
				onOpenChange: setOpen
			})
		]
	});
}
//#endregion
export { ResultsPage as component };
