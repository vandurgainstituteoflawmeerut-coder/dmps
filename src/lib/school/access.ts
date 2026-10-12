import { useMemo } from "react";
import { useSchoolStore } from "./store";
import type { AccountRole, Capability, Family, SchoolAccount, Student } from "./types";

export const ASSIGNABLE_ROLES: AccountRole[] = ["Principal", "Teacher", "Parent", "Student"];

export function useSession(): SchoolAccount | null {
  const sessionId = useSchoolStore((s) => s.sessionId);
  const accounts = useSchoolStore((s) => s.accounts);
  return accounts.find((row) => row.id === sessionId && row.active) ?? null;
}

export function can(account: SchoolAccount | null, cap: Capability): boolean {
  if (!account) return false;
  const { role } = account;
  switch (cap) {
    case "users":
    case "restore":
      return role === "Manager";
    case "admit":
    case "pay":
    case "tc":
      return role === "Manager" || role === "Principal";
    case "result":
      return role === "Manager" || role === "Principal" || role === "Teacher";
    case "exams":
      return role === "Principal";
    case "photo":
      return role === "Manager" || role === "Principal" || role === "Teacher" || role === "Parent";
    case "notice":
      return role === "Manager" || role === "Principal" || role === "Teacher";
    case "file":
      return role === "Manager" || role === "Principal";
    default:
      return false;
  }
}

export function canVisit(account: SchoolAccount, pathname: string): boolean {
  if (pathname === "/" || pathname === "/login") return true;
  const root = `/${pathname.split("/").filter(Boolean)[0] ?? ""}`;
  if (root === "/users") return can(account, "users");
  if (root === "/admissions") return can(account, "admit");
  if (root === "/fees") return account.role !== "Teacher";
  if (root === "/notices") return true;
  if (root === "/tc") return account.role === "Manager" || account.role === "Principal" || account.role === "Student";
  if (root === "/families") {
    return account.role === "Manager" || account.role === "Principal" || account.role === "Parent" || account.role === "Teacher";
  }
  return true;
}

export function navItemsFor(role: AccountRole): string[] {
  switch (role) {
    case "Manager":
      return ["/", "/students", "/families", "/admissions", "/results", "/fees", "/id-cards", "/tc", "/notices", "/users"];
    case "Principal":
      return ["/", "/students", "/families", "/admissions", "/results", "/fees", "/id-cards", "/tc", "/notices"];
    case "Teacher":
      return ["/", "/students", "/results", "/id-cards", "/notices"];
    case "Parent":
      return ["/", "/students", "/families", "/results", "/fees", "/id-cards", "/notices"];
    case "Student":
      return ["/", "/students", "/results", "/fees", "/id-cards", "/tc", "/notices"];
    default:
      return ["/"];
  }
}

export function scopeStudents(account: SchoolAccount | null, students: Student[]): Student[] {
  if (!account) return [];
  if (account.role === "Manager" || account.role === "Principal") return students;
  if (account.role === "Teacher") {
    return students.filter((s) => account.classNames.includes(s.className));
  }
  if (account.role === "Parent") {
    return students.filter((s) => s.familyId === account.familyId);
  }
  return students.filter((s) => s.id === account.studentId);
}

export function scopeFamilies(
  account: SchoolAccount | null,
  families: Family[],
  students: Student[],
): Family[] {
  if (!account) return [];
  if (account.role === "Manager" || account.role === "Principal") return families;
  if (account.role === "Parent") return families.filter((f) => f.id === account.familyId);
  const visible = new Set(scopeStudents(account, students).map((s) => s.familyId));
  return families.filter((f) => visible.has(f.id));
}

export function canEditPhoto(account: SchoolAccount | null, student: Student): boolean {
  if (!can(account, "photo") || !account) return false;
  if (account.role === "Manager" || account.role === "Principal") return true;
  if (account.role === "Teacher") return account.classNames.includes(student.className);
  if (account.role === "Parent") return student.familyId === account.familyId;
  return false;
}

export function deskCopy(role: AccountRole): { title: string; description: string } {
  switch (role) {
    case "Manager":
      return {
        title: "Manager’s desk",
        description: "Full register — admissions, fees, results, identity, notices and logins.",
      };
    case "Principal":
      return {
        title: "Principal’s desk",
        description: "School-wide pupils, families, fees and certificates. You set examination names and maximum marks.",
      };
    case "Teacher":
      return {
        title: "Class desk",
        description: "Your assigned classes — pupil files, results and identity cards.",
      };
    case "Parent":
      return {
        title: "Family desk",
        description: "Your children’s admission, results, fees and identity — this household only.",
      };
    case "Student":
      return {
        title: "My record",
        description: "Your admission file, results, fees, identity card and transfer certificate.",
      };
  }
}

export function useAccess() {
  const session = useSession();
  const students = useSchoolStore((s) => s.students);
  const families = useSchoolStore((s) => s.families);
  const visibleStudents = useMemo(() => scopeStudents(session, students), [session, students]);
  const visibleFamilies = useMemo(
    () => scopeFamilies(session, families, students),
    [session, families, students],
  );
  const studentIds = useMemo(() => new Set(visibleStudents.map((s) => s.id)), [visibleStudents]);
  return {
    session,
    students: visibleStudents,
    families: visibleFamilies,
    studentIds,
    can: (cap: Capability) => can(session, cap),
  };
}
