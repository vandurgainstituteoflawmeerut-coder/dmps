import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as studentsOfFamily, E as resultTotals, I as Button, M as useAccess, P as ACADEMIC_YEARS, S as latestResult, Y as formatINR, _ as fullName, f as classLabel, g as familyMonthlyFees, h as familyLedger, m as familyLabel, nt as useSchoolStore, o as StatusBadge, p as consentFor, r as Route$1, v as gradeFromPercent } from "./router-B1pzoAyY.mjs";
import { n as PageHeader } from "./select-CiyJpljB.mjs";
import { t as StudentAvatar } from "./student-avatar-BsXETIII.mjs";
import { i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-98gnQWUH.mjs";
import { t as YearSelect } from "./year-select-DCWTT7li.mjs";
import { n as emptyFeeDraft, t as FeeConsentFields } from "./fee-consent-fields-Bxm7y27n.mjs";
import { n as PaymentDialog, t as MonthlyFeeGrid } from "./payment-dialog-yUkwLxE-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/families_._id-CNet5JbF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FamilyDetail() {
	const { id } = Route$1.useParams();
	const { families, students, can } = useAccess();
	const results = useSchoolStore((s) => s.results);
	const allInvoices = useSchoolStore((s) => s.invoices);
	const payments = useSchoolStore((s) => s.payments);
	const certificates = useSchoolStore((s) => s.certificates);
	const feeConsents = useSchoolStore((s) => s.feeConsents);
	const workingYear = useSchoolStore((s) => s.workingYear);
	const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);
	const saveFeeConsent = useSchoolStore((s) => s.saveFeeConsent);
	const copyYearFees = useSchoolStore((s) => s.copyYearFees);
	const family = families.find((f) => f.id === id);
	const invoices = allInvoices.filter((inv) => inv.familyId === id && inv.academicYear === workingYear);
	const [payInv, setPayInv] = (0, import_react.useState)(null);
	const existing = family ? consentFor(family.id, workingYear, feeConsents) : void 0;
	const [draft, setDraft] = (0, import_react.useState)(null);
	if (!family) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "Family not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/families",
				children: "Back to families"
			})
		})]
	});
	const children = studentsOfFamily(family.id, students);
	const ledger = familyLedger(family.id, invoices, payments);
	const months = familyMonthlyFees(family.id, allInvoices, payments, feeConsents, workingYear);
	const consent = existing;
	const editing = draft ?? (consent ? {
		monthlyAmount: consent.monthlyAmount,
		months: consent.months,
		consentDate: consent.consentDate,
		consentedBy: consent.consentedBy,
		note: consent.note
	} : emptyFeeDraft(workingYear, children.map((c) => c.className)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: family.familyCode,
				title: familyLabel(family),
				description: `${family.guardianRelation} · ${family.phone}`,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearSelect, {
						value: workingYear,
						onChange: setWorkingYear
					}), can("admit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admissions/new",
							search: { familyId: family.id },
							children: "Admit sibling"
						})
					}) : null]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Household" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-4 sm:grid-cols-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Father",
								value: family.fatherName || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Mother",
								value: family.motherName || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Email",
								value: family.email || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Occupation",
								value: family.occupation || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Address",
								value: `${family.addressLine1}, ${family.city}, ${family.state} ${family.pincode}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Notes",
								value: family.notes || "—"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tracking-[0.14em] text-muted uppercase",
						children: ["Family ledger · ", workingYear]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-3xl tabular-nums",
						children: formatINR(ledger.due)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"Billed ",
							formatINR(ledger.total),
							" · Received ",
							formatINR(ledger.paid)
						]
					}),
					consent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-faint",
						children: [
							"Consent ",
							consent.consentedBy,
							" · ",
							consent.consentDate,
							" · ",
							formatINR(consent.monthlyAmount),
							" / month"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-danger",
						children: [
							"No parent consent on file for ",
							workingYear,
							"."
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Children" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Individual files under this household." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: children.map((child) => {
					const latest = latestResult(child.id, results);
					const totals = latest ? resultTotals(latest) : null;
					const tc = certificates.find((c) => c.studentId === child.id && c.status === "Issued");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentAvatar, { student: child }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/students/$id",
									params: { id: child.id },
									className: "font-medium hover:underline",
									children: fullName(child)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										classLabel(child),
										" · ",
										child.studentId,
										totals ? ` · ${latest?.examName} ${totals.percent.toFixed(0)}% ${gradeFromPercent(totals.percent)}` : "",
										tc ? ` · ${tc.tcNo}` : ""
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: child.status })
						]
					}, child.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: ["Monthly family fees · ", workingYear] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "One household column. Tap a month to record a receipt." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyFeeGrid, {
				months,
				onMonth: can("pay") ? (cell) => cell.invoice && setPayInv(cell.invoice) : void 0
			})] }),
			can("pay") && !consent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"No consent on ",
					workingYear,
					". Copy last year’s monthly column for every family, then amend this household."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-3",
				variant: "outline",
				onClick: () => {
					const idx = ACADEMIC_YEARS.findIndex((year) => year === workingYear);
					const prior = idx > 0 ? ACADEMIC_YEARS[idx - 1] : void 0;
					if (!prior) {
						toast.error("No previous year on the year list.");
						return;
					}
					const result = copyYearFees(prior, workingYear);
					if (typeof result === "string") toast.error(result);
					else toast.success(`Copied ${result} family files from ${prior}.`);
				},
				children: "Copy previous year’s fees"
			})] }) : null,
			can("pay") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-xl",
					children: ["Amend consent · ", workingYear]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Change the monthly rate or a single month. Earlier years stay on file."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4",
					onSubmit: (e) => {
						e.preventDefault();
						const saved = saveFeeConsent({
							familyId: family.id,
							academicYear: workingYear,
							...editing
						});
						if (typeof saved === "string") {
							toast.error(saved);
							return;
						}
						setDraft(null);
						toast.success(`Fee consent saved for ${workingYear}`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeeConsentFields, {
						year: workingYear,
						value: editing,
						onChange: setDraft
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Save this year’s fees"
						})
					})]
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDialog, {
				invoice: payInv,
				open: Boolean(payInv),
				onOpenChange: (o) => !o && setPayInv(null)
			})
		]
	});
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs tracking-[0.12em] text-muted uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1",
		children: value
	})] });
}
//#endregion
export { FamilyDetail as component };
