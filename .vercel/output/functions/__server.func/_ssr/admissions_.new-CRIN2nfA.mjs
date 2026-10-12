import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as BLOOD_GROUPS, I as Button, L as CATEGORIES, R as CLASSES, U as SECTIONS, _ as fullName, et as todayIso, i as Route$2, m as familyLabel, nt as useSchoolStore, p as consentFor, z as GENDERS } from "./router-B1pzoAyY.mjs";
import { n as PageHeader, t as NativeSelect } from "./select-CiyJpljB.mjs";
import { n as Input, r as Textarea, t as Field } from "./input-DDEqQOMG.mjs";
import { t as Card } from "./card-98gnQWUH.mjs";
import { n as emptyFeeDraft, t as FeeConsentFields } from "./fee-consent-fields-Bxm7y27n.mjs";
import { t as StudentPhotoField } from "./student-photo-field-C9KmYoIA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admissions_.new-CRIN2nfA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyFamily = () => ({
	fatherName: "",
	motherName: "",
	guardianName: "",
	guardianRelation: "Father",
	phone: "",
	altPhone: "",
	email: "",
	addressLine1: "",
	city: "Meerut",
	state: "Uttar Pradesh",
	pincode: "",
	occupation: "",
	notes: ""
});
function FamilyFormFields({ value, onChange }) {
	const set = (key, v) => onChange({
		...value,
		[key]: v
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Father",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.fatherName,
					onChange: (e) => set("fatherName", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mother",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.motherName,
					onChange: (e) => set("motherName", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Guardian",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.guardianName,
					onChange: (e) => set("guardianName", e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Relation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.guardianRelation,
					onChange: (e) => set("guardianRelation", e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mobile",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.phone,
					onChange: (e) => set("phone", e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Alternate phone",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.altPhone,
					onChange: (e) => set("altPhone", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email",
				className: "sm:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "email",
					value: value.email,
					onChange: (e) => set("email", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Address",
				className: "sm:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.addressLine1,
					onChange: (e) => set("addressLine1", e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "City",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.city,
					onChange: (e) => set("city", e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "PIN",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.pincode,
					onChange: (e) => set("pincode", e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Occupation",
				className: "sm:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value.occupation,
					onChange: (e) => set("occupation", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes",
				className: "sm:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: value.notes,
					onChange: (e) => set("notes", e.target.value),
					rows: 3
				})
			})
		]
	});
}
function NewAdmissionPage() {
	const { familyId: presetFamily } = Route$2.useSearch();
	const navigate = useNavigate();
	const families = useSchoolStore((s) => s.families);
	const students = useSchoolStore((s) => s.students);
	const feeConsents = useSchoolStore((s) => s.feeConsents);
	const workingYear = useSchoolStore((s) => s.workingYear);
	const addFamily = useSchoolStore((s) => s.addFamily);
	const addStudent = useSchoolStore((s) => s.addStudent);
	const saveFeeConsent = useSchoolStore((s) => s.saveFeeConsent);
	const [mode, setMode] = (0, import_react.useState)(presetFamily ? "existing" : "existing");
	const [familyId, setFamilyId] = (0, import_react.useState)(presetFamily ?? families[0]?.id ?? "");
	const [familyDraft, setFamilyDraft] = (0, import_react.useState)(emptyFamily());
	const [student, setStudent] = (0, import_react.useState)({
		familyId,
		firstName: "",
		lastName: "",
		gender: "Girl",
		dateOfBirth: "",
		bloodGroup: "O+",
		className: "1",
		section: "A",
		rollNo: "",
		admissionDate: todayIso(),
		previousSchool: "",
		category: "General",
		photo: ""
	});
	const existingConsent = consentFor(familyId, workingYear, feeConsents);
	const [feeDraft, setFeeDraft] = (0, import_react.useState)(() => existingConsent ? {
		monthlyAmount: existingConsent.monthlyAmount,
		months: existingConsent.months,
		consentDate: existingConsent.consentDate,
		consentedBy: existingConsent.consentedBy,
		note: existingConsent.note
	} : emptyFeeDraft(workingYear, [student.className]));
	const setStu = (key, value) => setStudent((prev) => ({
		...prev,
		[key]: value
	}));
	const canSubmit = (0, import_react.useMemo)(() => {
		if (!student.firstName.trim() || !student.lastName.trim() || !student.dateOfBirth) return false;
		if (mode === "existing") return Boolean(familyId);
		return Boolean(familyDraft.guardianName.trim() && familyDraft.phone.trim() && familyDraft.addressLine1.trim());
	}, [
		student,
		mode,
		familyId,
		familyDraft
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Intake",
			title: "New admission",
			description: "Pupil file, household, and the family monthly fee agreed with the parent for this year."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-5",
			onSubmit: (e) => {
				e.preventDefault();
				const targetFamilyId = mode === "existing" ? familyId : addFamily({
					...familyDraft,
					guardianName: familyDraft.guardianName || familyDraft.fatherName || familyDraft.motherName
				}).id;
				const row = addStudent({
					...student,
					familyId: targetFamilyId
				});
				const consentName = feeDraft.consentedBy.trim() || (mode === "new" ? familyDraft.guardianName : families.find((f) => f.id === targetFamilyId)?.guardianName) || "";
				const saved = saveFeeConsent({
					familyId: targetFamilyId,
					academicYear: workingYear,
					monthlyAmount: feeDraft.monthlyAmount,
					months: feeDraft.months,
					consentDate: feeDraft.consentDate,
					consentedBy: consentName,
					note: feeDraft.note
				});
				if (typeof saved === "string") {
					toast.error(saved);
					return;
				}
				toast.success(`${fullName(row)} admitted as ${row.studentId}`);
				navigate({
					to: "/students/$id",
					params: { id: row.id }
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Pupil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentPhotoField, {
							value: student.photo,
							onChange: (photo) => setStu("photo", photo),
							name: student.firstName || "student"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "First name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: student.firstName,
									onChange: (e) => setStu("firstName", e.target.value),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Last name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: student.lastName,
									onChange: (e) => setStu("lastName", e.target.value),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Gender",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: student.gender,
									onChange: (e) => setStu("gender", e.target.value),
									children: GENDERS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: g }, g))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Date of birth",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: student.dateOfBirth,
									onChange: (e) => setStu("dateOfBirth", e.target.value),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Class",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: student.className,
									onChange: (e) => setStu("className", e.target.value),
									children: CLASSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Section",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: student.section,
									onChange: (e) => setStu("section", e.target.value),
									children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Roll no.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: student.rollNo,
									onChange: (e) => setStu("rollNo", e.target.value),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Admission date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: student.admissionDate,
									onChange: (e) => setStu("admissionDate", e.target.value),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Blood group",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: student.bloodGroup,
									onChange: (e) => setStu("bloodGroup", e.target.value),
									children: BLOOD_GROUPS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: b }, b))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: student.category,
									onChange: (e) => setStu("category", e.target.value),
									children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Previous school",
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: student.previousSchool,
									onChange: (e) => setStu("previousSchool", e.target.value)
								})
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Family"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: mode === "existing" ? "default" : "outline",
							onClick: () => setMode("existing"),
							children: "Existing family"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: mode === "new" ? "default" : "outline",
							onClick: () => setMode("new"),
							children: "New family"
						})]
					}),
					mode === "existing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Household",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: familyId,
							onChange: (e) => {
								const id = e.target.value;
								setFamilyId(id);
								const found = consentFor(id, workingYear, feeConsents);
								if (found) setFeeDraft({
									monthlyAmount: found.monthlyAmount,
									months: found.months,
									consentDate: found.consentDate,
									consentedBy: found.consentedBy,
									note: found.note
								});
							},
							children: families.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: f.id,
								children: [
									familyLabel(f),
									" · ",
									f.familyCode
								]
							}, f.id))
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyFormFields, {
							value: familyDraft,
							onChange: setFamilyDraft
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl",
						children: ["Family monthly fees · ", workingYear]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: ["One household rate, with parent consent, for the academic year. Amend next year without erasing this one.", mode === "existing" && students.filter((s) => s.familyId === familyId).length ? " Siblings already on this file share the same monthly column." : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeeConsentFields, {
							year: workingYear,
							value: feeDraft,
							onChange: setFeeDraft
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => void navigate({ to: "/admissions" }),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !canSubmit,
						children: "Save admission"
					})]
				})
			]
		})]
	});
}
//#endregion
export { NewAdmissionPage as component };
