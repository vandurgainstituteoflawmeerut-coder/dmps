import { SCHOOL } from "@/lib/school/config";
import { fullName } from "@/lib/school/compute";
import type { Family, Student, TransferCertificate } from "@/lib/school/types";
import { formatDateLong } from "@/lib/utils";
import { SchoolCrest } from "./crest";
import { StudentAvatar } from "./student-avatar";

function Row({ n, label, value }: { n: number; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1.75rem_1fr] gap-3 border-b border-line py-2.5 text-sm">
      <span className="font-mono text-faint">{String(n).padStart(2, "0")}</span>
      <p>
        <span className="text-muted">{label}</span>
        <span className="mt-0.5 block font-medium text-ink">{value || "—"}</span>
      </p>
    </div>
  );
}

export function TcCertificate({
  student,
  family,
  certificate,
}: {
  student: Student;
  family: Family | undefined;
  certificate: TransferCertificate;
}) {
  return (
    <article className="print-sheet mx-auto w-full max-w-2xl rounded-2xl bg-raised px-6 py-8 shadow-card md:px-10 md:py-10">
      <header className="flex items-start gap-4 border-b border-line pb-5">
        <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-primary-fg">
          <SchoolCrest className="size-10" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-2xl text-ink">{SCHOOL.name}</p>
          <p className="text-sm text-muted">{SCHOOL.address}</p>
          <p className="text-xs text-faint">{SCHOOL.affiliation}</p>
        </div>
      </header>
      <h2 className="mt-6 text-center font-display text-2xl tracking-tight text-ink">
        Transfer Certificate
      </h2>
      <p className="mt-1 text-center font-mono text-xs text-muted">No. {certificate.tcNo}</p>
      <div className="mt-6 flex items-start gap-4">
        <StudentAvatar student={student} size="lg" shape="portrait" />
        <div className="min-w-0 flex-1">
          <Row n={1} label="Name of pupil" value={fullName(student)} />
          <Row n={2} label="Student ID / Admission no." value={`${student.studentId} / ${student.admissionNo}`} />
        </div>
      </div>
      <div className="mt-0">
        <Row n={3} label="Guardian" value={family ? `${family.guardianName} (${family.guardianRelation})` : "—"} />
        <Row n={4} label="Date of birth" value={formatDateLong(student.dateOfBirth)} />
        <Row n={5} label="Last class attended" value={certificate.lastClass} />
        <Row n={6} label="Date of last attendance" value={formatDateLong(certificate.lastAttendanceDate)} />
        <Row n={7} label="Date of issue" value={formatDateLong(certificate.issueDate)} />
        <Row n={8} label="Reason for leaving" value={certificate.reason} />
        <Row n={9} label="Character" value={certificate.character} />
        <Row n={10} label="Remarks" value={certificate.remarks} />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-8 text-sm">
        <div>
          <p className="h-10 border-b border-line" />
          <p className="mt-2 text-xs text-muted">Class teacher</p>
        </div>
        <div className="text-right">
          <p className="h-10 border-b border-line" />
          <p className="mt-2 text-xs text-muted">Principal · {SCHOOL.principal}</p>
        </div>
      </div>
    </article>
  );
}
