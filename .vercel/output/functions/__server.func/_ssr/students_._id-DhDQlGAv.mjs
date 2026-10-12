import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Printer } from "../_libs/lucide-react.mjs";
import { A as canEditPhoto, E as resultTotals, G as ageFromDob, I as Button, K as cn, M as useAccess, Y as formatINR, _ as fullName, a as Badge, f as classLabel, g as familyMonthlyFees, h as familyLedger, m as familyLabel, n as Route, nt as useSchoolStore, o as StatusBadge, p as consentFor, q as formatDate, v as gradeFromPercent } from "./router-B1pzoAyY.mjs";
import { n as PageHeader } from "./select-CiyJpljB.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
import { i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-98gnQWUH.mjs";
import { t as StudentPhotoField } from "./student-photo-field-C9KmYoIA.mjs";
import { n as PaymentDialog, t as MonthlyFeeGrid } from "./payment-dialog-yUkwLxE-.mjs";
import { t as StudentIdCard } from "./student-id-card-BPVt-jUU.mjs";
import { t as ResultDialog } from "./result-dialog-ndss-SkU.mjs";
import { n as TcCertificate, t as IssueTcDialog } from "./tc-certificate-DBOEl-N8.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/students_._id-DhDQlGAv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("flex gap-1 overflow-x-auto rounded-xl bg-canvas-warm p-1", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-10 shrink-0 items-center justify-center rounded-lg px-3 text-sm font-medium text-muted", "transition-[background-color,color] duration-150 ease-[var(--ease-smooth-out)]", "hover:text-ink", "data-[state=active]:bg-raised data-[state=active]:text-ink data-[state=active]:shadow-card", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-5 outline-none", className),
		...props
	});
}
function StudentDetail() {
	const { id } = Route.useParams();
	const { students, families, can, session } = useAccess();
	const allResults = useSchoolStore((s) => s.results);
	const allInvoices = useSchoolStore((s) => s.invoices);
	const payments = useSchoolStore((s) => s.payments);
	const feeConsents = useSchoolStore((s) => s.feeConsents);
	const workingYear = useSchoolStore((s) => s.workingYear);
	const allCertificates = useSchoolStore((s) => s.certificates);
	const updateStudent = useSchoolStore((s) => s.updateStudent);
	const student = students.find((row) => row.id === id);
	const family = families.find((f) => f.id === student?.familyId);
	const siblings = students.filter((row) => row.familyId === student?.familyId && row.id !== id);
	const results = allResults.filter((r) => r.studentId === id).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
	const invoices = allInvoices.filter((inv) => inv.familyId === student?.familyId && inv.academicYear === workingYear);
	const certificates = allCertificates.filter((c) => c.studentId === id);
	const [payInv, setPayInv] = (0, import_react.useState)(null);
	const [resultOpen, setResultOpen] = (0, import_react.useState)(false);
	const [tcOpen, setTcOpen] = (0, import_react.useState)(false);
	if (!student) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "Student not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/students",
				children: "Back to register"
			})
		})]
	});
	const ledger = familyLedger(student.familyId, invoices, payments);
	const consent = consentFor(student.familyId, workingYear, feeConsents);
	const months = familyMonthlyFees(student.familyId, allInvoices, payments, feeConsents, workingYear);
	const issued = certificates.find((c) => c.status === "Issued");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: student.studentId,
				title: fullName(student),
				description: `${classLabel(student)} · Roll ${student.rollNo} · ${student.admissionNo}`,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: student.status })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start gap-4",
				children: [canEditPhoto(session, student) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentPhotoField, {
					value: student.photo,
					onChange: (photo) => updateStudent(student.id, { photo }),
					name: fullName(student)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, {
					student,
					size: "lg",
					shape: "portrait"
				}), family ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/families/$id",
					params: { id: family.id },
					className: "rounded-xl bg-canvas-warm px-3 py-2 text-sm hover:bg-line/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs tracking-[0.12em] text-muted uppercase",
							children: "Family"
						}),
						familyLabel(family),
						" · ",
						family.familyCode
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "profile",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "profile",
							children: "Profile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "results",
							children: "Results"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "fees",
							children: "Fees"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "id",
							children: "ID card"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "tc",
							children: "Transfer cert."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "profile",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 lg:grid-cols-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "lg:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Admission" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-4 grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
											label: "Date of birth",
											value: `${formatDate(student.dateOfBirth)} (${ageFromDob(student.dateOfBirth)} yrs)`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
											label: "Gender",
											value: student.gender
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
											label: "Blood group",
											value: student.bloodGroup
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
											label: "Category",
											value: student.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
											label: "Admitted",
											value: formatDate(student.admissionDate)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
											label: "Previous school",
											value: student.previousSchool || "—"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Household" }), family ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [family.guardianName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-muted",
										children: family.guardianRelation
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted",
										children: [
											family.addressLine1,
											", ",
											family.city,
											" ",
											family.pincode
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: family.phone }),
									siblings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-1 text-xs tracking-[0.12em] text-muted uppercase",
										children: "Siblings"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-1",
										children: siblings.map((sib) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/students/$id",
											params: { id: sib.id },
											className: "hover:underline",
											children: [
												fullName(sib),
												" · ",
												classLabel(sib)
											]
										}) }, sib.id))
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted",
										children: "Only child on roll."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted",
								children: "No family file linked."
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "results",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex justify-end",
							children: can("result") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => setResultOpen(true),
								disabled: student.status !== "Active",
								children: "Enter result"
							}) : null
						}), results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No examinations recorded yet."
						}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4",
							children: results.map((result) => {
								const totals = resultTotals(result);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: [
										result.examName,
										" · ",
										result.academicYear
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDesc, { children: [
										"Class ",
										result.className,
										" · ",
										formatDate(result.publishedAt)
									] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: "primary",
										children: [
											totals.percent.toFixed(1),
											"% · ",
											gradeFromPercent(totals.percent)
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full min-w-96 text-left text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
												className: "text-xs tracking-[0.08em] text-muted uppercase",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "pb-2 font-medium",
														children: "Subject"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "pb-2 font-medium",
														children: "Marks"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "pb-2 font-medium",
														children: "Max"
													})
												] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
												className: "divide-y divide-line",
												children: result.subjects.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-2",
														children: sub.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-2 tabular-nums",
														children: sub.marks
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-2 tabular-nums text-muted",
														children: sub.maxMarks
													})
												] }, sub.name))
											})]
										})
									}),
									result.remarks ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted",
										children: result.remarks
									}) : null
								] }, result.id);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "fees",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs tracking-[0.14em] text-muted uppercase",
										children: ["Family monthly fees · ", workingYear]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-display text-2xl tabular-nums",
										children: [formatINR(ledger.due), " due"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted",
										children: [
											consent ? `${formatINR(consent.monthlyAmount)} / month · ${consent.consentedBy}` : "No parent consent this year",
											" · ",
											"Billed ",
											formatINR(ledger.total),
											" · Received ",
											formatINR(ledger.paid)
										]
									})
								] }), family ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/families/$id",
										params: { id: family.id },
										children: "Open family ledger"
									})
								}) : null]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyFeeGrid, {
							months,
							onMonth: can("pay") ? (cell) => cell.invoice && setPayInv(cell.invoice) : void 0
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "id",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "no-print",
								onClick: () => window.print(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), " Print card"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentIdCard, {
								student,
								family
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "tc",
						children: issued ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "no-print w-fit",
								onClick: () => window.print(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), " Print certificate"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TcCertificate, {
								student,
								family,
								certificate: issued
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "No certificate on file" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Issue a TC when the pupil leaves. The student status will change to Transferred." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-5",
								onClick: () => setTcOpen(true),
								disabled: student.status === "Transferred" || !can("tc"),
								children: "Issue transfer certificate"
							})
						] })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
				invoice: payInv,
				open: Boolean(payInv),
				onOpenChange: (o) => !o && setPayInv(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultDialog, {
				open: resultOpen,
				onOpenChange: setResultOpen,
				presetStudentId: student.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueTcDialog, {
				student,
				open: tcOpen,
				onOpenChange: setTcOpen
			})
		]
	});
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs tracking-[0.12em] text-muted uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-sm",
		children: value
	})] });
}
//#endregion
export { StudentDetail as component };
