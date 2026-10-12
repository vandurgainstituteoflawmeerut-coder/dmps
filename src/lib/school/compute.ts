import { monthsForYear, SCHOOL } from "./config";
import type {
  ExamResult,
  Family,
  FamilyFeeConsent,
  FeeInvoice,
  FeePayment,
  Notice,
  SchoolAccount,
  Student,
  TransferCertificate,
} from "./types";

export function fullName(student: Pick<Student, "firstName" | "lastName">): string {
  return `${student.firstName} ${student.lastName}`.trim();
}

export function classLabel(student: Pick<Student, "className" | "section">): string {
  return `${student.className}–${student.section}`;
}

export function familyLabel(family: Family | undefined): string {
  if (!family) return "Unlinked";
  return family.guardianName || family.fatherName || family.motherName || family.familyCode;
}

export function invoiceTotal(invoice: FeeInvoice): number {
  return invoice.heads.reduce((sum, head) => sum + head.amount, 0);
}

export function paymentsForInvoice(invoiceId: string, payments: FeePayment[]): number {
  return payments.filter((p) => p.invoiceId === invoiceId).reduce((sum, p) => sum + p.amount, 0);
}

export type LedgerStatus = "Paid" | "Partial" | "Due" | "Overdue";

export function invoiceStatus(
  invoice: FeeInvoice,
  payments: FeePayment[],
  on = new Date(),
): LedgerStatus {
  const total = invoiceTotal(invoice);
  const paid = paymentsForInvoice(invoice.id, payments);
  if (paid >= total - 0.5) return "Paid";
  if (paid > 0) return "Partial";
  const due = new Date(invoice.dueDate);
  if (!Number.isNaN(due.getTime()) && due < on) return "Overdue";
  return "Due";
}

export function studentLedger(studentId: string, invoices: FeeInvoice[], payments: FeePayment[]) {
  const rows = invoices.filter((inv) => inv.studentId === studentId);
  const total = rows.reduce((sum, inv) => sum + invoiceTotal(inv), 0);
  const paid = payments.filter((p) => p.studentId === studentId).reduce((sum, p) => sum + p.amount, 0);
  return { total, paid, due: Math.max(0, total - paid) };
}

export function familyLedger(familyId: string, invoices: FeeInvoice[], payments: FeePayment[]) {
  const rows = invoices.filter((inv) => inv.familyId === familyId);
  const total = rows.reduce((sum, inv) => sum + invoiceTotal(inv), 0);
  const paid = payments.filter((p) => p.familyId === familyId).reduce((sum, p) => sum + p.amount, 0);
  return { total, paid, due: Math.max(0, total - paid) };
}

export function resultTotals(result: ExamResult) {
  const max = result.subjects.reduce((sum, s) => sum + s.maxMarks, 0);
  const got = result.subjects.reduce((sum, s) => sum + s.marks, 0);
  const percent = max ? (got / max) * 100 : 0;
  return { max, got, percent };
}

export function gradeFromPercent(percent: number): string {
  if (percent >= 91) return "A1";
  if (percent >= 81) return "A2";
  if (percent >= 71) return "B1";
  if (percent >= 61) return "B2";
  if (percent >= 51) return "C1";
  if (percent >= 41) return "C2";
  if (percent >= 33) return "D";
  return "E";
}

export function initials(student: Pick<Student, "firstName" | "lastName">): string {
  return `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`.toUpperCase();
}

export function studentsOfFamily(familyId: string, students: Student[]): Student[] {
  return students
    .filter((s) => s.familyId === familyId)
    .sort((a, b) => a.firstName.localeCompare(b.firstName));
}

export function latestResult(studentId: string, results: ExamResult[]): ExamResult | undefined {
  return results
    .filter((r) => r.studentId === studentId)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];
}

export function issuedTc(studentId: string, certificates: TransferCertificate[]) {
  return certificates.find((c) => c.studentId === studentId && c.status === "Issued");
}

export function academicCaption(year = SCHOOL.academicYear) {
  return `Academic year ${year}`;
}

export function consentFor(
  familyId: string,
  year: string,
  consents: FamilyFeeConsent[],
): FamilyFeeConsent | undefined {
  return consents.find((c) => c.familyId === familyId && c.academicYear === year);
}

export type MonthCell = {
  monthId: string;
  label: string;
  billed: number;
  paid: number;
  due: number;
  overdue: boolean;
  invoice?: FeeInvoice;
};

export function familyMonthlyFees(
  familyId: string,
  invoices: FeeInvoice[],
  payments: FeePayment[],
  consents: FamilyFeeConsent[],
  year: string,
  on = new Date(),
): MonthCell[] {
  const consent = consentFor(familyId, year, consents);
  const today = todayStamp(on);
  return monthsForYear(year).map((month) => {
    const invoice = invoices.find(
      (inv) => inv.familyId === familyId && inv.academicYear === year && inv.termId === month.id,
    );
    const billed =
      invoice ? invoiceTotal(invoice) : consent?.months.find((m) => m.monthId === month.id)?.amount ?? 0;
    const paid = invoice
      ? paymentsForInvoice(invoice.id, payments)
      : payments
          .filter((p) => p.familyId === familyId && p.paidAt.startsWith(month.id))
          .reduce((sum, p) => sum + p.amount, 0);
    const due = Math.max(0, billed - paid);
    return {
      monthId: month.id,
      label: month.label,
      billed,
      paid,
      due,
      overdue: due > 0.5 && month.due < today,
      invoice,
    };
  });
}

function todayStamp(on: Date): string {
  const y = on.getFullYear();
  const m = String(on.getMonth() + 1).padStart(2, "0");
  const d = String(on.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function noticeVisibleTo(
  notice: Notice,
  account: SchoolAccount,
  students: Student[],
): boolean {
  if (account.role === "Manager" || account.role === "Principal") return true;
  if (notice.fromAccountId === account.id) return true;
  if (notice.audience === "school") return true;

  const mine = scopeNoticeStudents(account, students);

  if (notice.audience === "class") {
    return mine.some((s) => notice.classNames.includes(s.className));
  }
  if (notice.audience === "family") {
    if (account.role === "Parent") return notice.familyIds.includes(account.familyId);
    return mine.some((s) => notice.familyIds.includes(s.familyId));
  }
  if (notice.audience === "student") {
    if (account.role === "Student") return notice.studentIds.includes(account.studentId);
    return mine.some((s) => notice.studentIds.includes(s.id));
  }
  return false;
}

function scopeNoticeStudents(account: SchoolAccount, students: Student[]): Student[] {
  if (account.role === "Teacher") return students.filter((s) => account.classNames.includes(s.className));
  if (account.role === "Parent") return students.filter((s) => s.familyId === account.familyId);
  if (account.role === "Student") return students.filter((s) => s.id === account.studentId);
  return students;
}

export function noticeAudienceLabel(notice: Notice, families: Family[], students: Student[]): string {
  if (notice.audience === "school") return "Whole school";
  if (notice.audience === "class") return `Class ${notice.classNames.join(", ")}`;
  if (notice.audience === "family") {
    const names = notice.familyIds.map((id) => familyLabel(families.find((f) => f.id === id)));
    return names.join(", ");
  }
  const names = notice.studentIds.map((id) => {
    const row = students.find((s) => s.id === id);
    return row ? fullName(row) : "Student";
  });
  return names.join(", ");
}
