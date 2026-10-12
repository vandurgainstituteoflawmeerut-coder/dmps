import { ACADEMIC_YEARS } from "@/lib/school/config";
import { NativeSelect } from "./ui/select";

export function YearSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (year: string) => void;
}) {
  const years = ACADEMIC_YEARS.includes(value as (typeof ACADEMIC_YEARS)[number])
    ? ACADEMIC_YEARS
    : ([value, ...ACADEMIC_YEARS] as readonly string[]);
  return (
    <NativeSelect value={value} onChange={(e) => onChange(e.target.value)} aria-label="Academic year">
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </NativeSelect>
  );
}
