import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as IndianRupee, l as Megaphone, m as GraduationCap, r as UsersRound, v as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as noticeAudienceLabel, I as Button, M as useAccess, N as useSession, Y as formatINR, _ as fullName, a as Badge, b as invoiceStatus, c as buildRegisterFile, f as classLabel, h as familyLedger, j as deskCopy, k as can, l as downloadRegister, m as familyLabel, nt as useSchoolStore, o as StatusBadge, s as pushOfficeRegister, u as parseRegisterFile, w as noticeVisibleTo } from "./router-B1pzoAyY.mjs";
import { n as PageHeader } from "./select-CiyJpljB.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
import { i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-98gnQWUH.mjs";
import { t as YearSelect } from "./year-select-DCWTT7li.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bi-LA3WX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterFilePanel() {
	const session = useSession();
	const store = useSchoolStore();
	const inputRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!can(session, "file")) return null;
	const saveDownload = () => {
		const at = (/* @__PURE__ */ new Date()).toISOString();
		const file = buildRegisterFile(useSchoolStore.getState(), at);
		downloadRegister(file);
		store.markFileExported(at);
		toast.success("Register file downloaded. Keep it with the office records.");
	};
	const saveOffice = () => {
		setBusy(true);
		pushOfficeRegister().then(() => toast.success("Office file updated. The register is stored for this college.")).catch(() => toast.error("Could not write the office file just now. Download a copy instead.")).finally(() => setBusy(false));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl",
			children: "Permanent register file"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Two copies: the office file on this college’s register, and a JSON data file you download for the cupboard. Admissions, photographs, family monthly fees, results, notices and logins are all in the same file."
		}),
		store.lastFileExportAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-xs text-faint",
			children: ["Last saved ", store.lastFileExportAt.slice(0, 10)]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-danger",
			children: "No file saved yet — write the office copy or download one."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: saveOffice,
					disabled: busy,
					children: busy ? "Saving…" : "Save office file"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: saveDownload,
					children: "Download JSON"
				}),
				session?.role === "Manager" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => inputRef.current?.click(),
					children: "Open JSON file"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					accept: "application/json,.json",
					className: "hidden",
					onChange: (e) => {
						const file = e.target.files?.[0];
						e.target.value = "";
						if (!file) return;
						file.text().then((text) => {
							const parsed = parseRegisterFile(text);
							if (typeof parsed === "string") {
								toast.error(parsed);
								return;
							}
							const err = store.applyRegister(parsed.data);
							if (err) {
								toast.error(err);
								return;
							}
							toast.success("Register restored from file.");
							pushOfficeRegister().catch(() => void 0);
						});
					}
				})
			]
		})
	] });
}
function Home() {
	const { session, students, families, studentIds, can } = useAccess();
	const invoices = useSchoolStore((s) => s.invoices);
	const payments = useSchoolStore((s) => s.payments);
	const certificates = useSchoolStore((s) => s.certificates);
	const notices = useSchoolStore((s) => s.notices);
	const reads = useSchoolStore((s) => s.noticeReads);
	const allStudents = useSchoolStore((s) => s.students);
	const restoreSample = useSchoolStore((s) => s.restoreSample);
	const workingYear = useSchoolStore((s) => s.workingYear);
	const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);
	const yearInvoices = invoices.filter((inv) => inv.academicYear === workingYear && studentIds.has(inv.studentId));
	const visiblePayments = payments.filter((p) => yearInvoices.some((inv) => inv.id === p.invoiceId));
	certificates.filter((c) => studentIds.has(c.studentId));
	const active = students.filter((s) => s.status === "Active");
	const dueTotal = families.reduce((sum, f) => sum + familyLedger(f.id, yearInvoices, visiblePayments).due, 0);
	const overdueCount = yearInvoices.filter((inv) => invoiceStatus(inv, visiblePayments) === "Overdue").length;
	const familyRows = families.map((f) => ({
		family: f,
		...familyLedger(f.id, yearInvoices, visiblePayments)
	})).filter((row) => row.due > 0).sort((a, b) => b.due - a.due).slice(0, 5);
	const recent = [...students].sort((a, b) => b.admissionDate.localeCompare(a.admissionDate)).slice(0, 5);
	const chart = [
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep"
	].map((month, i) => {
		const stamp = `2026-0${i + 4}`;
		return {
			month,
			collected: visiblePayments.filter((p) => p.paidAt.startsWith(stamp)).reduce((sum, p) => sum + p.amount, 0)
		};
	});
	const deskNotices = session ? notices.filter((n) => noticeVisibleTo(n, session, allStudents)).sort((a, b) => Number(b.pin) - Number(a.pin) || b.createdAt.localeCompare(a.createdAt)).slice(0, 4) : [];
	const copy = deskCopy(session?.role ?? "Student");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: workingYear,
				title: copy.title,
				description: copy.description,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearSelect, {
						value: workingYear,
						onChange: setWorkingYear
					}),
					can("admit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admissions/new",
							children: "New admission"
						})
					}) : null,
					can("restore") && students.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => restoreSample(),
						children: "Load sample records"
					}) : null
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: GraduationCap,
						label: "On roll",
						value: String(active.length),
						hint: `${students.length} in the register`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: UsersRound,
						label: "Families",
						value: String(families.length),
						hint: "Households with a file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: IndianRupee,
						label: "Fees outstanding",
						value: formatINR(dueTotal),
						hint: `${overdueCount} overdue months · ${workingYear}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Megaphone,
						label: "Notices",
						value: String(deskNotices.length),
						hint: "Circulars on this desk"
					})
				]
			}),
			can("file") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterFilePanel, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Fee collection" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Receipts posted this calendar year." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: chart,
								barSize: 28,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										tick: {
											fill: "var(--color-muted)",
											fontSize: 12
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fill: "var(--color-muted)",
											fontSize: 12
										},
										axisLine: false,
										tickLine: false,
										width: 48,
										tickFormatter: (v) => `${Math.round(Number(v) / 1e3)}k`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "color-mix(in oklab, var(--color-ink) 4%, transparent)" },
										formatter: (v) => [formatINR(Number(v ?? 0)), "Collected"],
										contentStyle: {
											background: "var(--color-raised)",
											border: "none",
											borderRadius: 12,
											boxShadow: "var(--shadow-card)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "collected",
										fill: "var(--color-primary)",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Notices" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Family, class or whole school." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/notices",
							children: ["Board ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-3",
						children: deskNotices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "No circulars on this desk."
						}) : deskNotices.map((notice) => {
							const unread = session && !reads.some((r) => r.noticeId === notice.id && r.accountId === session.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/notices",
								className: "block rounded-xl px-1 py-1 hover:bg-canvas-warm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: notice.title
									}), unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "ok",
										children: "New"
									}) : notice.pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "primary",
										children: "Pinned"
									}) : null]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-xs text-muted",
									children: [
										notice.fromName,
										" · ",
										noticeAudienceLabel(notice, families, allStudents)
									]
								})]
							}) }, notice.id);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Family dues" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDesc, { children: [
						"Monthly household balance for ",
						workingYear,
						"."
					] })] }), session?.role !== "Teacher" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/fees",
							children: ["Ledger ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
						})
					}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-3",
						children: familyRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "No open family balances."
						}) : familyRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/families/$id",
							params: { id: row.family.id },
							className: "flex items-center justify-between gap-3 rounded-xl px-1 py-1 hover:bg-canvas-warm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: familyLabel(row.family)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-faint",
								children: row.family.familyCode
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium tabular-nums",
								children: formatINR(row.due)
							})]
						}) }, row.family.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Latest admissions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Newest files on the student register." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admissions",
							children: ["All admissions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line",
						children: recent.map((student) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/students/$id",
							params: { id: student.id },
							className: "flex items-center gap-3 py-3 hover:bg-canvas-warm/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, {
									student,
									size: "sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-medium",
										children: fullName(student)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted",
										children: [
											classLabel(student),
											" · ",
											student.admissionNo
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: student.status }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "neutral",
									className: "hidden sm:inline-flex",
									children: student.admissionDate
								})
							]
						}) }, student.id))
					})]
				})]
			})
		]
	});
}
function Stat({ icon: Icon, label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.14em] text-muted uppercase",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-faint" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-3xl tracking-tight tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { Home as component };
