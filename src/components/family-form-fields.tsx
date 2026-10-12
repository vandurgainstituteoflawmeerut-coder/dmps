import type { NewFamilyInput } from "@/lib/school/store";
import { Field, Input, Textarea } from "./ui/input";

export const emptyFamily = (): NewFamilyInput => ({
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
  notes: "",
});

export function FamilyFormFields({
  value,
  onChange,
}: {
  value: NewFamilyInput;
  onChange: (next: NewFamilyInput) => void;
}) {
  const set = <K extends keyof NewFamilyInput>(key: K, v: NewFamilyInput[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Father">
        <Input value={value.fatherName} onChange={(e) => set("fatherName", e.target.value)} />
      </Field>
      <Field label="Mother">
        <Input value={value.motherName} onChange={(e) => set("motherName", e.target.value)} />
      </Field>
      <Field label="Guardian">
        <Input
          value={value.guardianName}
          onChange={(e) => set("guardianName", e.target.value)}
          required
        />
      </Field>
      <Field label="Relation">
        <Input
          value={value.guardianRelation}
          onChange={(e) => set("guardianRelation", e.target.value)}
          required
        />
      </Field>
      <Field label="Mobile">
        <Input value={value.phone} onChange={(e) => set("phone", e.target.value)} required />
      </Field>
      <Field label="Alternate phone">
        <Input value={value.altPhone} onChange={(e) => set("altPhone", e.target.value)} />
      </Field>
      <Field label="Email" className="sm:col-span-2">
        <Input type="email" value={value.email} onChange={(e) => set("email", e.target.value)} />
      </Field>
      <Field label="Address" className="sm:col-span-2">
        <Input value={value.addressLine1} onChange={(e) => set("addressLine1", e.target.value)} required />
      </Field>
      <Field label="City">
        <Input value={value.city} onChange={(e) => set("city", e.target.value)} required />
      </Field>
      <Field label="PIN">
        <Input value={value.pincode} onChange={(e) => set("pincode", e.target.value)} required />
      </Field>
      <Field label="Occupation" className="sm:col-span-2">
        <Input value={value.occupation} onChange={(e) => set("occupation", e.target.value)} />
      </Field>
      <Field label="Notes" className="sm:col-span-2">
        <Textarea value={value.notes} onChange={(e) => set("notes", e.target.value)} rows={3} />
      </Field>
    </div>
  );
}
