import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as SCHOOL, I as Button, J as formatDateLong, W as TC_REASONS, _ as fullName, d as SchoolCrest, et as todayIso, nt as useSchoolStore } from "./router-B1pzoAyY.mjs";
import { t as NativeSelect } from "./select-CiyJpljB.mjs";
import { n as Input, t as Field } from "./input-DDEqQOMG.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BnFxRqTe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tc-certificate-DBOEl-N8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IssueTcDialog({ student, open, onOpenChange }) {
	const issueTc = useSchoolStore((s) => s.issueTc);
	const [reason, setReason] = (0, import_react.useState)(TC_REASONS[0]);
	const [issueDate, setIssueDate] = (0, import_react.useState)(todayIso());
	const [lastAttendanceDate, setLastAttendanceDate] = (0, import_react.useState)(todayIso());
	const [character, setCharacter] = (0, import_react.useState)("Good");
	const [remarks, setRemarks] = (0, import_react.useState)("All dues cleared.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: student ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "Issue transfer certificate",
			description: `${fullName(student)} will be marked transferred.`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					const row = issueTc({
						studentId: student.id,
						reason,
						lastAttendanceDate,
						character,
						remarks,
						issueDate
					});
					if (row) toast.success(`${row.tcNo} issued`);
					onOpenChange(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Reason",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: reason,
							onChange: (e) => setReason(e.target.value),
							children: TC_REASONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: r,
								children: r
							}, r))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Last attendance",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: lastAttendanceDate,
								onChange: (e) => setLastAttendanceDate(e.target.value),
								required: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Issue date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: issueDate,
								onChange: (e) => setIssueDate(e.target.value),
								required: true
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Character",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: character,
							onChange: (e) => setCharacter(e.target.value),
							children: [
								"Excellent",
								"Good",
								"Satisfactory"
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Remarks",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: remarks,
							onChange: (e) => setRemarks(e.target.value)
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
							children: "Issue certificate"
						})]
					})
				]
			})
		}) : null
	});
}
function Row({ n, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[1.75rem_1fr] gap-3 border-b border-line py-2.5 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-faint",
			children: String(n).padStart(2, "0")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 block font-medium text-ink",
			children: value || "—"
		})] })]
	});
}
function TcCertificate({ student, family, certificate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "print-sheet mx-auto w-full max-w-2xl rounded-2xl bg-raised px-6 py-8 shadow-card md:px-10 md:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start gap-4 border-b border-line pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-14 items-center justify-center rounded-xl bg-primary text-primary-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchoolCrest, { className: "size-10" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-ink",
							children: SCHOOL.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: SCHOOL.address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-faint",
							children: SCHOOL.affiliation
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-center font-display text-2xl tracking-tight text-ink",
				children: "Transfer Certificate"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-center font-mono text-xs text-muted",
				children: ["No. ", certificate.tcNo]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, {
					student,
					size: "lg",
					shape: "portrait"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 1,
						label: "Name of pupil",
						value: fullName(student)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 2,
						label: "Student ID / Admission no.",
						value: `${student.studentId} / ${student.admissionNo}`
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 3,
						label: "Guardian",
						value: family ? `${family.guardianName} (${family.guardianRelation})` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 4,
						label: "Date of birth",
						value: formatDateLong(student.dateOfBirth)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 5,
						label: "Last class attended",
						value: certificate.lastClass
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 6,
						label: "Date of last attendance",
						value: formatDateLong(certificate.lastAttendanceDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 7,
						label: "Date of issue",
						value: formatDateLong(certificate.issueDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 8,
						label: "Reason for leaving",
						value: certificate.reason
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 9,
						label: "Character",
						value: certificate.character
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						n: 10,
						label: "Remarks",
						value: certificate.remarks
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid grid-cols-2 gap-8 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "h-10 border-b border-line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Class teacher"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "h-10 border-b border-line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: ["Principal · ", SCHOOL.principal]
					})]
				})]
			})
		]
	});
}
//#endregion
export { TcCertificate as n, IssueTcDialog as t };
