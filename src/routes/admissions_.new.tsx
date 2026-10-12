import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { emptyFeeDraft, FeeConsentFields } from "@/components/fee-consent-fields";
import { emptyFamily, FamilyFormFields } from "@/components/family-form-fields";
import { PageHeader } from "@/components/page-header";
import { StudentPhotoField } from "@/components/student-photo-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/select";
import {
  BLOOD_GROUPS,
  CATEGORIES,
  CLASSES,
  GENDERS,
  SECTIONS,
} from "@/lib/school/config";
import { consentFor, familyLabel, fullName } from "@/lib/school/compute";
import { useSchoolStore, type NewFamilyInput, type NewStudentInput } from "@/lib/school/store";
import { todayIso } from "@/lib/utils";

type Search = { familyId?: string };

export const Route = createFileRoute("/admissions_/new")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    familyId: typeof search.familyId === "string" ? search.familyId : undefined,
  }),
  component: NewAdmissionPage,
});

function NewAdmissionPage() {
  const { familyId: presetFamily } = Route.useSearch();
  const navigate = useNavigate();
  const families = useSchoolStore((s) => s.families);
  const students = useSchoolStore((s) => s.students);
  const feeConsents = useSchoolStore((s) => s.feeConsents);
  const workingYear = useSchoolStore((s) => s.workingYear);
  const addFamily = useSchoolStore((s) => s.addFamily);
  const addStudent = useSchoolStore((s) => s.addStudent);
  const saveFeeConsent = useSchoolStore((s) => s.saveFeeConsent);

  const [mode, setMode] = useState<"existing" | "new">(presetFamily ? "existing" : "existing");
  const [familyId, setFamilyId] = useState(presetFamily ?? families[0]?.id ?? "");
  const [familyDraft, setFamilyDraft] = useState<NewFamilyInput>(emptyFamily());
  const [student, setStudent] = useState<NewStudentInput>({
    familyId: familyId,
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
    photo: "",
  });
  const existingConsent = consentFor(familyId, workingYear, feeConsents);
  const [feeDraft, setFeeDraft] = useState(() =>
    existingConsent
      ? {
          monthlyAmount: existingConsent.monthlyAmount,
          months: existingConsent.months,
          consentDate: existingConsent.consentDate,
          consentedBy: existingConsent.consentedBy,
          note: existingConsent.note,
        }
      : emptyFeeDraft(workingYear, [student.className]),
  );

  const setStu = <K extends keyof NewStudentInput>(key: K, value: NewStudentInput[K]) =>
    setStudent((prev) => ({ ...prev, [key]: value }));

  const canSubmit = useMemo(() => {
    if (!student.firstName.trim() || !student.lastName.trim() || !student.dateOfBirth) return false;
    if (mode === "existing") return Boolean(familyId);
    return Boolean(familyDraft.guardianName.trim() && familyDraft.phone.trim() && familyDraft.addressLine1.trim());
  }, [student, mode, familyId, familyDraft]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Intake"
        title="New admission"
        description="Pupil file, household, and the family monthly fee agreed with the parent for this year."
      />

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          const targetFamilyId =
            mode === "existing"
              ? familyId
              : addFamily({
                  ...familyDraft,
                  guardianName: familyDraft.guardianName || familyDraft.fatherName || familyDraft.motherName,
                }).id;
          const row = addStudent({ ...student, familyId: targetFamilyId });
          const consentName =
            feeDraft.consentedBy.trim() ||
            (mode === "new" ? familyDraft.guardianName : families.find((f) => f.id === targetFamilyId)?.guardianName) ||
            "";
          const saved = saveFeeConsent({
            familyId: targetFamilyId,
            academicYear: workingYear,
            monthlyAmount: feeDraft.monthlyAmount,
            months: feeDraft.months,
            consentDate: feeDraft.consentDate,
            consentedBy: consentName,
            note: feeDraft.note,
          });
          if (typeof saved === "string") {
            toast.error(saved);
            return;
          }
          toast.success(`${fullName(row)} admitted as ${row.studentId}`);
          void navigate({ to: "/students/$id", params: { id: row.id } });
        }}
      >
        <Card>
          <h2 className="font-display text-xl">Pupil</h2>
          <div className="mt-4">
            <StudentPhotoField
              value={student.photo}
              onChange={(photo) => setStu("photo", photo)}
              name={student.firstName || "student"}
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="First name">
              <Input value={student.firstName} onChange={(e) => setStu("firstName", e.target.value)} required />
            </Field>
            <Field label="Last name">
              <Input value={student.lastName} onChange={(e) => setStu("lastName", e.target.value)} required />
            </Field>
            <Field label="Gender">
              <NativeSelect value={student.gender} onChange={(e) => setStu("gender", e.target.value as NewStudentInput["gender"])}>
                {GENDERS.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Date of birth">
              <Input type="date" value={student.dateOfBirth} onChange={(e) => setStu("dateOfBirth", e.target.value)} required />
            </Field>
            <Field label="Class">
              <NativeSelect value={student.className} onChange={(e) => setStu("className", e.target.value)}>
                {CLASSES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Section">
              <NativeSelect value={student.section} onChange={(e) => setStu("section", e.target.value)}>
                {SECTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Roll no.">
              <Input value={student.rollNo} onChange={(e) => setStu("rollNo", e.target.value)} required />
            </Field>
            <Field label="Admission date">
              <Input type="date" value={student.admissionDate} onChange={(e) => setStu("admissionDate", e.target.value)} required />
            </Field>
            <Field label="Blood group">
              <NativeSelect value={student.bloodGroup} onChange={(e) => setStu("bloodGroup", e.target.value)}>
                {BLOOD_GROUPS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Category">
              <NativeSelect value={student.category} onChange={(e) => setStu("category", e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Previous school" className="sm:col-span-2">
              <Input value={student.previousSchool} onChange={(e) => setStu("previousSchool", e.target.value)} />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-xl">Family</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" size="sm" variant={mode === "existing" ? "default" : "outline"} onClick={() => setMode("existing")}>
              Existing family
            </Button>
            <Button type="button" size="sm" variant={mode === "new" ? "default" : "outline"} onClick={() => setMode("new")}>
              New family
            </Button>
          </div>
          {mode === "existing" ? (
            <Field label="Household" className="mt-4">
              <NativeSelect
                value={familyId}
                onChange={(e) => {
                  const id = e.target.value;
                  setFamilyId(id);
                  const found = consentFor(id, workingYear, feeConsents);
                  if (found) {
                    setFeeDraft({
                      monthlyAmount: found.monthlyAmount,
                      months: found.months,
                      consentDate: found.consentDate,
                      consentedBy: found.consentedBy,
                      note: found.note,
                    });
                  }
                }}
              >
                {families.map((f) => (
                  <option key={f.id} value={f.id}>
                    {familyLabel(f)} · {f.familyCode}
                  </option>
                ))}
              </NativeSelect>
            </Field>
          ) : (
            <div className="mt-4">
              <FamilyFormFields value={familyDraft} onChange={setFamilyDraft} />
            </div>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-xl">Family monthly fees · {workingYear}</h2>
          <p className="mt-1 text-sm text-muted">
            One household rate, with parent consent, for the academic year. Amend next year without erasing this one.
            {mode === "existing" && students.filter((s) => s.familyId === familyId).length
              ? " Siblings already on this file share the same monthly column."
              : ""}
          </p>
          <div className="mt-4">
            <FeeConsentFields year={workingYear} value={feeDraft} onChange={setFeeDraft} />
          </div>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => void navigate({ to: "/admissions" })}>
            Cancel
          </Button>
          <Button type="submit" disabled={!canSubmit}>
            Save admission
          </Button>
        </div>
      </form>
    </div>
  );
}
