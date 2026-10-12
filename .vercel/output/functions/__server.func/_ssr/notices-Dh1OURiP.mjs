import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as Megaphone } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as NOTICE_AUDIENCES, C as noticeAudienceLabel, I as Button, M as useAccess, R as CLASSES, _ as fullName, a as Badge, m as familyLabel, nt as useSchoolStore, q as formatDate, w as noticeVisibleTo } from "./router-B1pzoAyY.mjs";
import { t as EmptyState } from "./empty-state-D5V5EYoN.mjs";
import { n as PageHeader, t as NativeSelect } from "./select-CiyJpljB.mjs";
import { n as Input, r as Textarea, t as Field } from "./input-DDEqQOMG.mjs";
import { t as Card } from "./card-98gnQWUH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notices-Dh1OURiP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NoticesPage() {
	const { session, students, families, can } = useAccess();
	const notices = useSchoolStore((s) => s.notices);
	const reads = useSchoolStore((s) => s.noticeReads);
	const addNotice = useSchoolStore((s) => s.addNotice);
	const markNoticeRead = useSchoolStore((s) => s.markNoticeRead);
	const allStudents = useSchoolStore((s) => s.students);
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [audience, setAudience] = (0, import_react.useState)(session?.role === "Teacher" ? "class" : "school");
	const [classNames, setClassNames] = (0, import_react.useState)(session?.classNames.slice(0, 1) ?? []);
	const [familyIds, setFamilyIds] = (0, import_react.useState)([]);
	const [studentIds, setStudentIds] = (0, import_react.useState)([]);
	const [pin, setPin] = (0, import_react.useState)(false);
	const visible = (0, import_react.useMemo)(() => {
		if (!session) return [];
		return notices.filter((n) => noticeVisibleTo(n, session, allStudents)).sort((a, b) => Number(b.pin) - Number(a.pin) || b.createdAt.localeCompare(a.createdAt));
	}, [
		notices,
		session,
		allStudents
	]);
	const classChoices = session?.role === "Teacher" ? session.classNames : [...CLASSES];
	const send = () => {
		const result = addNotice({
			title,
			body,
			audience,
			classNames,
			familyIds,
			studentIds,
			pin
		});
		if (typeof result === "string") {
			toast.error(result);
			return;
		}
		toast.success("Notice sent.");
		setTitle("");
		setBody("");
		setPin(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Office",
				title: "Notices",
				description: "Circulars from the Manager, Principal or class teacher — whole school, class-wise, family-wise or student-wise."
			}),
			can("notice") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Send a notice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "To",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								value: audience,
								onChange: (e) => setAudience(e.target.value),
								children: NOTICE_AUDIENCES.filter((row) => session?.role !== "Teacher" || row.id !== "school").map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: row.id,
									children: row.label
								}, row.id))
							})
						}),
						audience === "class" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Classes",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								multiple: true,
								className: "min-h-28 w-full rounded-md bg-raised px-3 py-2 text-sm shadow-card",
								value: classNames,
								onChange: (e) => setClassNames([...e.target.selectedOptions].map((o) => o.value)),
								children: classChoices.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))
							})
						}) : null,
						audience === "family" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Families",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								multiple: true,
								className: "min-h-28 w-full rounded-md bg-raised px-3 py-2 text-sm shadow-card",
								value: familyIds,
								onChange: (e) => setFamilyIds([...e.target.selectedOptions].map((o) => o.value)),
								children: families.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: f.id,
									children: [
										familyLabel(f),
										" · ",
										f.familyCode
									]
								}, f.id))
							})
						}) : null,
						audience === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Students",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								multiple: true,
								className: "min-h-28 w-full rounded-md bg-raised px-3 py-2 text-sm shadow-card",
								value: studentIds,
								onChange: (e) => setStudentIds([...e.target.selectedOptions].map((o) => o.value)),
								children: students.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: s.id,
									children: [
										fullName(s),
										" · ",
										s.className
									]
								}, s.id))
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: title,
								onChange: (e) => setTitle(e.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Message",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: body,
								onChange: (e) => setBody(e.target.value),
								rows: 5,
								required: true
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-between gap-3",
					children: [session?.role === "Manager" || session?.role === "Principal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: pin,
							onChange: (e) => setPin(e.target.checked)
						}), "Pin on every desk"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: send,
						children: "Send notice"
					})]
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden p-0 md:p-0",
				children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Megaphone,
					title: "No notices",
					body: "When the office writes, the circular will appear here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: visible.map((notice) => {
						const read = session ? reads.some((r) => r.noticeId === notice.id && r.accountId === session.id) : false;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "px-4 py-4 md:px-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium",
												children: notice.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-xs text-faint",
												children: [
													notice.fromName,
													" · ",
													notice.fromRole,
													" · ",
													formatDate(notice.createdAt.slice(0, 10)),
													" ·",
													" ",
													noticeAudienceLabel(notice, families, allStudents)
												]
											})]
										}),
										notice.pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "primary",
											children: "Pinned"
										}) : null,
										!read && session ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "ok",
											children: "New"
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft",
									children: notice.body
								}),
								session && !read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									className: "mt-2",
									onClick: () => markNoticeRead(notice.id, session.id),
									children: "Mark as read"
								}) : null
							]
						}, notice.id);
					})
				})
			})
		]
	});
}
//#endregion
export { NoticesPage as component };
