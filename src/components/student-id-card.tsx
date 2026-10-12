import { SCHOOL } from "@/lib/school/config";
import { classLabel, fullName } from "@/lib/school/compute";
import type { Family, Student } from "@/lib/school/types";
import { formatDate } from "@/lib/utils";
import { SchoolCrest } from "./crest";
import { StudentAvatar } from "./student-avatar";

export function StudentIdCard({ student, family }: { student: Student; family: Family | undefined }) {
  return (
    <article className="print-sheet relative w-full max-w-sm overflow-hidden rounded-2xl bg-primary text-primary-fg shadow-card">
      <div className="flex items-center gap-3 border-b border-primary-fg/10 px-5 py-3">
        <SchoolCrest className="size-9 text-primary-fg" />
        <div className="min-w-0">
          <p className="font-display text-base leading-tight">{SCHOOL.name}</p>
          <p className="text-[10px] tracking-[0.14em] text-primary-fg/70 uppercase">Student identity</p>
        </div>
      </div>
      <div className="flex gap-4 px-5 py-5">
        <StudentAvatar student={student} size="lg" shape="portrait" />
        <div className="min-w-0">
          <p className="font-display text-xl leading-tight">{fullName(student)}</p>
          <p className="mt-1 font-mono text-xs tracking-wide text-primary-fg/80">{student.studentId}</p>
          <p className="mt-2 text-sm text-primary-fg/85">
            Class {classLabel(student)}
            <span className="mx-1.5 text-primary-fg/40">·</span>
            Roll {student.rollNo}
          </p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-primary-fg/10 px-5 py-4 text-xs">
        <div>
          <dt className="text-primary-fg/55">Date of birth</dt>
          <dd className="mt-0.5">{formatDate(student.dateOfBirth)}</dd>
        </div>
        <div>
          <dt className="text-primary-fg/55">Blood group</dt>
          <dd className="mt-0.5">{student.bloodGroup}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-primary-fg/55">Emergency</dt>
          <dd className="mt-0.5">
            {family?.guardianName ?? "—"} · {family?.phone ?? "—"}
          </dd>
        </div>
      </dl>
      <p className="px-5 pb-4 text-[10px] tracking-[0.12em] text-primary-fg/50 uppercase">
        Valid {SCHOOL.academicYear} · {SCHOOL.affiliation}
      </p>
    </article>
  );
}
