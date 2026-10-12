import { initials } from "@/lib/school/compute";
import type { Student } from "@/lib/school/types";
import { cn } from "@/lib/utils";

export function StudentAvatar({
  student,
  size = "md",
  shape = "circle",
}: {
  student: Pick<Student, "firstName" | "lastName" | "tone" | "photo">;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "portrait";
}) {
  const label = `${student.firstName} ${student.lastName}`;
  const box =
    shape === "portrait"
      ? size === "lg"
        ? "h-24 w-20"
        : size === "sm"
          ? "h-11 w-9"
          : "h-14 w-11"
      : size === "sm"
        ? "size-9"
        : size === "lg"
          ? "size-16"
          : "size-11";
  const radius = shape === "portrait" ? "rounded-lg" : "rounded-full";
  const type = size === "sm" ? "text-xs" : size === "lg" ? "text-xl" : "text-sm";

  if (student.photo) {
    return (
      <img
        src={student.photo}
        alt={label}
        className={cn("inline-block shrink-0 object-cover", box, radius)}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-medium text-primary-fg",
        box,
        radius,
        type,
      )}
      style={{ backgroundColor: student.tone }}
      aria-hidden
    >
      {initials(student)}
    </span>
  );
}
