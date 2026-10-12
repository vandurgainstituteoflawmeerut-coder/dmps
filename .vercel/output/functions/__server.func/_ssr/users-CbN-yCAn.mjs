import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as Button, O as ASSIGNABLE_ROLES, R as CLASSES, _ as fullName, a as Badge, m as familyLabel, nt as useSchoolStore } from "./router-B1pzoAyY.mjs";
import { n as PageHeader, t as NativeSelect } from "./select-CiyJpljB.mjs";
import { n as Input, t as Field } from "./input-DDEqQOMG.mjs";
import { t as Card } from "./card-98gnQWUH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-CbN-yCAn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function emptyDraft() {
	return {
		username: "",
		password: "",
		displayName: "",
		role: "Teacher",
		familyId: "",
		studentId: "",
		classNames: []
	};
}
function UsersPage() {
	const accounts = useSchoolStore((s) => s.accounts);
	const families = useSchoolStore((s) => s.families);
	const students = useSchoolStore((s) => s.students);
	const addAccount = useSchoolStore((s) => s.addAccount);
	const setAccountPassword = useSchoolStore((s) => s.setAccountPassword);
	const setAccountActive = useSchoolStore((s) => s.setAccountActive);
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft());
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [resetId, setResetId] = (0, import_react.useState)("");
	const [resetPassword, setResetPassword] = (0, import_react.useState)("");
	const sorted = (0, import_react.useMemo)(() => [...accounts].sort((a, b) => {
		const order = [
			"Manager",
			"Principal",
			"Teacher",
			"Parent",
			"Student"
		];
		return order.indexOf(a.role) - order.indexOf(b.role) || a.displayName.localeCompare(b.displayName);
	}), [accounts]);
	const setRole = (role) => {
		setDraft((prev) => ({
			...prev,
			role,
			familyId: role === "Parent" ? prev.familyId || families[0]?.id || "" : "",
			studentId: role === "Student" ? prev.studentId || students[0]?.id || "" : "",
			classNames: role === "Teacher" ? prev.classNames : []
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Directory",
				title: "Logins",
				description: "Assign a username and password to the Principal, teachers, parents (one per family) and students."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: "Issue login"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				onSubmit: (e) => {
					e.preventDefault();
					setBusy(true);
					addAccount(draft).then((result) => {
						setBusy(false);
						if (typeof result === "string") {
							toast.error(result);
							return;
						}
						toast.success(`Login issued for ${result.username}`);
						setDraft(emptyDraft());
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Role",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: draft.role,
							onChange: (e) => setRole(e.target.value),
							children: ASSIGNABLE_ROLES.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: role }, role))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Full name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.displayName,
							onChange: (e) => setDraft((p) => ({
								...p,
								displayName: e.target.value
							})),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Username",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.username,
							onChange: (e) => setDraft((p) => ({
								...p,
								username: e.target.value
							})),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Password",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							value: draft.password,
							onChange: (e) => setDraft((p) => ({
								...p,
								password: e.target.value
							})),
							required: true
						})
					}),
					draft.role === "Teacher" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Classes",
						className: "sm:col-span-2",
						hint: "Hold Ctrl or Cmd to select more than one.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							multiple: true,
							className: "min-h-32 w-full rounded-md bg-raised px-3 py-2 text-sm shadow-card",
							value: draft.classNames,
							onChange: (e) => setDraft((p) => ({
								...p,
								classNames: [...e.target.selectedOptions].map((o) => o.value)
							})),
							children: CLASSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))
						})
					}) : null,
					draft.role === "Parent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Family",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: draft.familyId,
							onChange: (e) => setDraft((p) => ({
								...p,
								familyId: e.target.value
							})),
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
					draft.role === "Student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Student",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: draft.studentId,
							onChange: (e) => setDraft((p) => ({
								...p,
								studentId: e.target.value
							})),
							children: students.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: s.id,
								children: [
									fullName(s),
									" · ",
									s.studentId
								]
							}, s.id))
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: busy ? "Saving…" : "Assign login"
						})
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden p-0 md:p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: sorted.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: account.displayName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-faint",
										children: account.username
									}),
									account.role === "Teacher" && account.classNames.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted",
										children: ["Classes ", account.classNames.join(", ")]
									}) : null,
									account.role === "Parent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted",
										children: familyLabel(families.find((f) => f.id === account.familyId))
									}) : null,
									account.role === "Student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted",
										children: (() => {
											const pupil = students.find((s) => s.id === account.studentId);
											return pupil ? fullName(pupil) : "—";
										})()
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: account.role === "Manager" ? "primary" : "neutral",
								children: account.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: account.active ? "ok" : "danger",
								children: account.active ? "Active" : "Disabled"
							}),
							account.role !== "Manager" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => setResetId(account.id),
									children: "Reset password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setAccountActive(account.id, !account.active),
									children: account.active ? "Disable" : "Enable"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-faint",
								children: "Office Manager"
							})
						]
					}, account.id))
				})
			}),
			resetId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Set new password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: sorted.find((a) => a.id === resetId)?.username
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-end",
					onSubmit: (e) => {
						e.preventDefault();
						setAccountPassword(resetId, resetPassword).then((err) => {
							if (err) {
								toast.error(err);
								return;
							}
							toast.success("Password updated.");
							setResetId("");
							setResetPassword("");
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "New password",
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							value: resetPassword,
							onChange: (e) => setResetPassword(e.target.value),
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setResetId(""),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Save password"
						})]
					})]
				})
			] }) : null
		]
	});
}
//#endregion
export { UsersPage as component };
