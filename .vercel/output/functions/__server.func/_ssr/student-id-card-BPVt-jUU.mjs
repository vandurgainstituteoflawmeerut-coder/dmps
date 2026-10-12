import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { H as SCHOOL, _ as fullName, d as SchoolCrest, f as classLabel, q as formatDate } from "./router-B1pzoAyY.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-id-card-BPVt-jUU.js
var import_jsx_runtime = require_jsx_runtime();
function StudentIdCard({ student, family }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "print-sheet relative w-full max-w-sm overflow-hidden rounded-2xl bg-primary text-primary-fg shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-primary-fg/10 px-5 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchoolCrest, { className: "size-9 text-primary-fg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-base leading-tight",
						children: SCHOOL.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] tracking-[0.14em] text-primary-fg/70 uppercase",
						children: "Student identity"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4 px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, {
					student,
					size: "lg",
					shape: "portrait"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl leading-tight",
							children: fullName(student)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-xs tracking-wide text-primary-fg/80",
							children: student.studentId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-primary-fg/85",
							children: [
								"Class ",
								classLabel(student),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-1.5 text-primary-fg/40",
									children: "·"
								}),
								"Roll ",
								student.rollNo
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-x-3 gap-y-2 border-t border-primary-fg/10 px-5 py-4 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-primary-fg/55",
						children: "Date of birth"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5",
						children: formatDate(student.dateOfBirth)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-primary-fg/55",
						children: "Blood group"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5",
						children: student.bloodGroup
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-primary-fg/55",
							children: "Emergency"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-0.5",
							children: [
								family?.guardianName ?? "—",
								" · ",
								family?.phone ?? "—"
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-5 pb-4 text-[10px] tracking-[0.12em] text-primary-fg/50 uppercase",
				children: [
					"Valid ",
					SCHOOL.academicYear,
					" · ",
					SCHOOL.affiliation
				]
			})
		]
	});
}
//#endregion
export { StudentIdCard as t };
