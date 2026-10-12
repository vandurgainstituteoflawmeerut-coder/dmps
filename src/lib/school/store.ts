import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { noteBrowserCopy } from "./browser-copy";
import { AVATAR_TONES, DEFAULT_EXAMS, monthsForYear, SCHOOL } from "./config";
import { hashPassword } from "./password";
import { seedData } from "./seed";
import type {
  AccountRole,
  ExamDefinition,
  ExamResult,
  Family,
  FamilyFeeConsent,
  FamilyFeeMonth,
  FeeInvoice,
  FeePayment,
  Notice,
  NoticeAudience,
  PaymentMode,
  SchoolAccount,
  SchoolData,
  Student,
  TransferCertificate,
} from "./types";
import { nextSerial, todayIso, uid } from "../utils";

export type NewFamilyInput = Omit<Family, "id" | "familyCode" | "createdAt">;
export type NewStudentInput = Omit<
  Student,
  "id" | "studentId" | "admissionNo" | "tone" | "createdAt" | "status"
> & { status?: Student["status"] };
export type NewAccountInput = {
  username: string;
  password: string;
  displayName: string;
  role: AccountRole;
  familyId: string;
  studentId: string;
  classNames: string[];
};

type SchoolStore = SchoolData & {
  addFamily: (input: NewFamilyInput) => Family;
  updateFamily: (id: string, patch: Partial<Family>) => void;
  addStudent: (input: NewStudentInput) => Student;
  updateStudent: (id: string, patch: Partial<Student>) => void;
  addResult: (input: Omit<ExamResult, "id">) => ExamResult;
  updateResult: (id: string, patch: Partial<ExamResult>) => void;
  recordPayment: (input: {
    invoiceId: string;
    amount: number;
    mode: PaymentMode;
    paidAt: string;
    note: string;
  }) => FeePayment | null;
  issueTc: (input: {
    studentId: string;
    reason: string;
    lastAttendanceDate: string;
    character: string;
    remarks: string;
    issueDate: string;
  }) => TransferCertificate | null;
  restoreSample: () => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addAccount: (input: NewAccountInput) => Promise<SchoolAccount | string>;
  setAccountPassword: (id: string, password: string) => Promise<string | null>;
  setAccountActive: (id: string, active: boolean) => void;
  removeAccount: (id: string) => string | null;
  addNotice: (input: {
    title: string;
    body: string;
    audience: NoticeAudience;
    classNames: string[];
    familyIds: string[];
    studentIds: string[];
    pin: boolean;
  }) => Notice | string;
  markNoticeRead: (noticeId: string, accountId: string) => void;
  applyRegister: (data: Omit<SchoolData, "sessionId">) => string | null;
  markFileExported: (at: string) => void;
  setWorkingYear: (year: string) => void;
  setExams: (rows: ExamDefinition[]) => string | null;
  copyYearFees: (fromYear: string, toYear: string) => number | string;
  saveFeeConsent: (input: {
    familyId: string;
    academicYear: string;
    monthlyAmount: number;
    months: FamilyFeeMonth[];
    consentDate: string;
    consentedBy: string;
    note: string;
  }) => FamilyFeeConsent | string;
};

function familyCode(existing: Family[]): string {
  return nextSerial("FAM-26-", existing.map((f) => f.familyCode));
}

function studentCodes(existing: Student[]) {
  return {
    studentId: nextSerial("SWC-26-", existing.map((s) => s.studentId)),
    admissionNo: nextSerial("ADM-26-", existing.map((s) => s.admissionNo)),
  };
}

function receiptNo(existing: FeePayment[]): string {
  return nextSerial("RCP-26-", existing.map((p) => p.receiptNo));
}

function tcNo(existing: TransferCertificate[]): string {
  return nextSerial("TC-26-", existing.map((c) => c.tcNo));
}

function makeMonthlyInvoices(
  familyId: string,
  studentId: string,
  year: string,
  months: FamilyFeeMonth[],
): FeeInvoice[] {
  const calendar = monthsForYear(year);
  return months.map((month) => {
    const meta = calendar.find((m) => m.id === month.monthId);
    return {
      id: uid("inv"),
      studentId,
      familyId,
      academicYear: year,
      termId: month.monthId,
      termLabel: month.label,
      dueDate: meta?.due ?? `${month.monthId}-10`,
      heads: [{ name: "Monthly family fee", amount: month.amount }],
    };
  });
}

export const useSchoolStore = create<SchoolStore>()(
  persist(
    (set, get) => ({
      ...seedData,
      addFamily: (input) => {
        const row: Family = {
          ...input,
          id: uid("fam"),
          familyCode: familyCode(get().families),
          createdAt: todayIso(),
        };
        set({ families: [...get().families, row] });
        return row;
      },
      updateFamily: (id, patch) => {
        set({
          families: get().families.map((f) => (f.id === id ? { ...f, ...patch, id: f.id } : f)),
        });
      },
      addStudent: (input) => {
        const codes = studentCodes(get().students);
        const tone = AVATAR_TONES[get().students.length % AVATAR_TONES.length] ?? AVATAR_TONES[0];
        const row: Student = {
          ...input,
          id: uid("stu"),
          studentId: codes.studentId,
          admissionNo: codes.admissionNo,
          tone,
          photo: input.photo ?? "",
          status: input.status ?? "Active",
          createdAt: todayIso(),
        };
        set({ students: [...get().students, row] });
        return row;
      },
      updateStudent: (id, patch) => {
        set({
          students: get().students.map((s) => (s.id === id ? { ...s, ...patch, id: s.id } : s)),
        });
      },
      addResult: (input) => {
        const existing = get().results.find(
          (r) =>
            r.studentId === input.studentId &&
            r.academicYear === input.academicYear &&
            r.examName === input.examName,
        );
        if (existing) {
          const row: ExamResult = { ...existing, ...input, id: existing.id };
          set({ results: get().results.map((r) => (r.id === existing.id ? row : r)) });
          return row;
        }
        const row: ExamResult = { ...input, id: uid("res") };
        set({ results: [...get().results, row] });
        return row;
      },
      updateResult: (id, patch) => {
        set({
          results: get().results.map((r) => (r.id === id ? { ...r, ...patch, id: r.id } : r)),
        });
      },
      recordPayment: ({ invoiceId, amount, mode, paidAt, note }) => {
        const invoice = get().invoices.find((inv) => inv.id === invoiceId);
        if (!invoice) return null;
        const row: FeePayment = {
          id: uid("pay"),
          invoiceId,
          studentId: invoice.studentId,
          familyId: invoice.familyId,
          amount,
          mode,
          receiptNo: receiptNo(get().payments),
          paidAt,
          note,
        };
        set({ payments: [...get().payments, row] });
        return row;
      },
      issueTc: ({ studentId, reason, lastAttendanceDate, character, remarks, issueDate }) => {
        const student = get().students.find((s) => s.id === studentId);
        if (!student) return null;
        const existing = get().certificates.find((c) => c.studentId === studentId && c.status === "Issued");
        if (existing) return existing;
        const row: TransferCertificate = {
          id: uid("tc"),
          studentId,
          tcNo: tcNo(get().certificates),
          issueDate,
          reason,
          lastClass: `${student.className}–${student.section}`,
          lastAttendanceDate,
          character,
          remarks,
          status: "Issued",
        };
        set({
          certificates: [...get().certificates, row],
          students: get().students.map((s) => (s.id === studentId ? { ...s, status: "Transferred" } : s)),
        });
        return row;
      },
      restoreSample: () => {
        const sessionId = get().sessionId;
        const keep = seedData.accounts.some((a) => a.id === sessionId) ? sessionId : null;
        set({ ...seedData, sessionId: keep });
      },
      login: async (username, password) => {
        const key = username.trim().toLowerCase();
        const account = get().accounts.find((a) => a.active && a.username.toLowerCase() === key);
        if (!account) return false;
        const hash = await hashPassword(account.username, password);
        if (hash !== account.passwordHash) return false;
        set({ sessionId: account.id });
        return true;
      },
      logout: () => set({ sessionId: null }),
      addAccount: async (input) => {
        const username = input.username.trim();
        if (!username || !input.password || !input.displayName.trim()) {
          return "Name, username and password are required.";
        }
        if (input.role === "Manager") return "Only one Manager account is issued.";
        const taken = get().accounts.some((a) => a.username.toLowerCase() === username.toLowerCase());
        if (taken) return "That username is already assigned.";
        if (input.role === "Parent" && !input.familyId) return "Choose the family for this parent login.";
        if (input.role === "Student" && !input.studentId) return "Choose the student for this login.";
        if (input.role === "Teacher" && input.classNames.length === 0) {
          return "Assign at least one class to the teacher.";
        }
        const row: SchoolAccount = {
          id: uid("acct"),
          username,
          passwordHash: await hashPassword(username, input.password),
          displayName: input.displayName.trim(),
          role: input.role,
          familyId: input.role === "Parent" ? input.familyId : input.role === "Student" ? get().students.find((s) => s.id === input.studentId)?.familyId ?? "" : "",
          studentId: input.role === "Student" ? input.studentId : "",
          classNames: input.role === "Teacher" ? input.classNames : [],
          active: true,
          createdAt: todayIso(),
        };
        set({ accounts: [...get().accounts, row] });
        return row;
      },
      setAccountPassword: async (id, password) => {
        if (!password) return "Enter a new password.";
        const account = get().accounts.find((a) => a.id === id);
        if (!account) return "Account not found.";
        const passwordHash = await hashPassword(account.username, password);
        set({
          accounts: get().accounts.map((a) => (a.id === id ? { ...a, passwordHash } : a)),
        });
        return null;
      },
      setAccountActive: (id, active) => {
        const account = get().accounts.find((a) => a.id === id);
        if (!account || account.role === "Manager") return;
        set({
          accounts: get().accounts.map((a) => (a.id === id ? { ...a, active } : a)),
          sessionId: !active && get().sessionId === id ? null : get().sessionId,
        });
      },
      removeAccount: (id) => {
        const session = get().accounts.find((a) => a.id === get().sessionId);
        if (!session || session.role !== "Manager") return "Only the Manager can delete a login.";
        const account = get().accounts.find((a) => a.id === id);
        if (!account) return "Account not found.";
        if (account.role === "Manager") return "The Manager login cannot be deleted.";
        set({
          accounts: get().accounts.filter((a) => a.id !== id),
          sessionId: get().sessionId === id ? null : get().sessionId,
        });
        return null;
      },
      addNotice: (input) => {
        const session = get().accounts.find((a) => a.id === get().sessionId);
        if (!session) return "Sign in to send a notice.";
        if (session.role !== "Manager" && session.role !== "Principal" && session.role !== "Teacher") {
          return "Only the office and teachers may send notices.";
        }
        if (!input.title.trim() || !input.body.trim()) return "Title and message are required.";
        if (input.audience === "class" && input.classNames.length === 0) return "Choose at least one class.";
        if (input.audience === "family" && input.familyIds.length === 0) return "Choose at least one family.";
        if (input.audience === "student" && input.studentIds.length === 0) return "Choose at least one student.";
        if (session.role === "Teacher") {
          const allowed = new Set(session.classNames);
          if (input.audience === "school") return "Teachers send class, family or student notices — not the whole school.";
          if (input.audience === "class" && input.classNames.some((c) => !allowed.has(c))) {
            return "You may only write to your assigned classes.";
          }
          const mine = get().students.filter((s) => allowed.has(s.className));
          if (input.audience === "family" && input.familyIds.some((id) => !mine.some((s) => s.familyId === id))) {
            return "That family is outside your classes.";
          }
          if (input.audience === "student" && input.studentIds.some((id) => !mine.some((s) => s.id === id))) {
            return "That student is outside your classes.";
          }
        }
        const row: Notice = {
          id: uid("ntc"),
          title: input.title.trim(),
          body: input.body.trim(),
          fromAccountId: session.id,
          fromName: session.displayName,
          fromRole: session.role,
          audience: input.audience,
          classNames: input.audience === "class" ? input.classNames : [],
          familyIds: input.audience === "family" ? input.familyIds : [],
          studentIds: input.audience === "student" ? input.studentIds : [],
          createdAt: new Date().toISOString(),
          pin: input.pin && (session.role === "Manager" || session.role === "Principal"),
        };
        set({ notices: [row, ...get().notices] });
        return row;
      },
      markNoticeRead: (noticeId, accountId) => {
        if (get().noticeReads.some((r) => r.noticeId === noticeId && r.accountId === accountId)) return;
        set({
          noticeReads: [...get().noticeReads, { noticeId, accountId, readAt: new Date().toISOString() }],
        });
      },
      applyRegister: (data) => {
        if (!data.families?.length && !data.students?.length) return "The file has no families or students.";
        const sessionId = get().sessionId;
        const keep = data.accounts.some((a) => a.id === sessionId && a.active) ? sessionId : null;
        set({
          families: data.families,
          students: data.students,
          results: data.results ?? [],
          invoices: data.invoices ?? [],
          payments: data.payments ?? [],
          feeConsents: data.feeConsents ?? [],
          certificates: data.certificates ?? [],
          accounts: data.accounts,
          notices: data.notices ?? [],
          noticeReads: data.noticeReads ?? [],
          exams: data.exams?.length ? data.exams : seedData.exams,
          workingYear: data.workingYear || SCHOOL.academicYear,
          lastFileExportAt: data.lastFileExportAt ?? get().lastFileExportAt,
          sessionId: keep,
        });
        return null;
      },
      markFileExported: (at) => set({ lastFileExportAt: at }),
      setWorkingYear: (year) => set({ workingYear: year }),
      setExams: (rows) => {
        const cleaned = rows
          .map((row) => ({
            id: row.id || uid("ex"),
            name: row.name.trim(),
            maxMarks: Math.round(Number(row.maxMarks)),
          }))
          .filter((row) => row.name);
        if (cleaned.length === 0) return "Keep at least one examination.";
        const names = cleaned.map((row) => row.name.toLowerCase());
        if (new Set(names).size !== names.length) return "Each examination needs a different name.";
        if (cleaned.some((row) => !Number.isFinite(row.maxMarks) || row.maxMarks < 1 || row.maxMarks > 200)) {
          return "Maximum marks must be between 1 and 200.";
        }
        set({ exams: cleaned });
        return null;
      },
      copyYearFees: (fromYear, toYear) => {
        if (fromYear === toYear) return "Choose a different year to copy into.";
        const source = get().feeConsents.filter((c) => c.academicYear === fromYear);
        if (source.length === 0) return `No family fees on file for ${fromYear}.`;
        const have = new Set(
          get().feeConsents.filter((c) => c.academicYear === toYear).map((c) => c.familyId),
        );
        const calendar = monthsForYear(toYear);
        const added: FamilyFeeConsent[] = [];
        const extraInvoices: FeeInvoice[] = [];
        for (const row of source) {
          if (have.has(row.familyId)) continue;
          const months = calendar.map((month, i) => ({
            monthId: month.id,
            label: month.label,
            amount: row.months[i]?.amount ?? row.monthlyAmount,
          }));
          added.push({
            ...row,
            id: uid("fee"),
            academicYear: toYear,
            months,
            consentDate: todayIso(),
            note: row.note ? `${row.note} · copied from ${fromYear}` : `Copied from ${fromYear} — amend with parent consent.`,
          });
          const child = get().students.find((s) => s.familyId === row.familyId && s.status === "Active");
          extraInvoices.push(...makeMonthlyInvoices(row.familyId, child?.id ?? "", toYear, months));
        }
        if (added.length === 0) return `Every family already has ${toYear} on file.`;
        set({
          feeConsents: [...get().feeConsents, ...added],
          invoices: [...get().invoices, ...extraInvoices],
        });
        return added.length;
      },
      saveFeeConsent: (input) => {
        if (!input.familyId) return "Choose a family.";
        if (!input.consentedBy.trim()) return "Parent consent name is required.";
        if (input.monthlyAmount < 0 || input.months.some((m) => m.amount < 0)) {
          return "Fee amounts cannot be negative.";
        }
        const existing = get().feeConsents.find(
          (c) => c.familyId === input.familyId && c.academicYear === input.academicYear,
        );
        const row: FamilyFeeConsent = {
          id: existing?.id ?? uid("fee"),
          familyId: input.familyId,
          academicYear: input.academicYear,
          monthlyAmount: input.monthlyAmount,
          months: input.months,
          consentDate: input.consentDate,
          consentedBy: input.consentedBy.trim(),
          note: input.note.trim(),
        };
        const child = get().students.find((s) => s.familyId === input.familyId && s.status === "Active");
        const generated = makeMonthlyInvoices(input.familyId, child?.id ?? "", input.academicYear, input.months);
        const kept = get().invoices.filter(
          (inv) => !(inv.familyId === input.familyId && inv.academicYear === input.academicYear),
        );
        set({
          feeConsents: existing
            ? get().feeConsents.map((c) => (c.id === existing.id ? row : c))
            : [...get().feeConsents, row],
          invoices: [...kept, ...generated],
        });
        return row;
      },
    }),
    {
      name: "swami-inter-college-register",
      version: 6,
      skipHydration: true,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          const memory = new Map<string, string>();
          return {
            getItem: (key: string) => memory.get(key) ?? null,
            setItem: (key: string, value: string) => {
              memory.set(key, value);
            },
            removeItem: (key: string) => {
              memory.delete(key);
            },
          };
        }
        return {
          getItem: (key: string) => {
            const value = window.localStorage.getItem(key);
            noteBrowserCopy(value);
            return value;
          },
          setItem: (key: string, value: string) => window.localStorage.setItem(key, value),
          removeItem: (key: string) => window.localStorage.removeItem(key),
        };
      }),
      migrate: (persisted, fromVersion) => {
        const state = persisted as SchoolData;
        let next = state;
        if (fromVersion < 2) {
          const photos = Object.fromEntries(seedData.students.map((s) => [s.id, s.photo]));
          next = {
            ...next,
            students: next.students.map((s) => ({
              ...s,
              photo: s.photo || photos[s.id] || "",
            })),
          };
        }
        if (fromVersion < 3) {
          next = {
            ...next,
            accounts: next.accounts?.length ? next.accounts : seedData.accounts,
            sessionId: next.sessionId ?? null,
          };
        }
        if (fromVersion < 4) {
          next = {
            ...next,
            notices: next.notices?.length ? next.notices : seedData.notices,
            noticeReads: next.noticeReads ?? [],
            lastFileExportAt: next.lastFileExportAt ?? "",
          };
        }
        if (fromVersion < 5) {
          next = {
            ...next,
            feeConsents: next.feeConsents?.length ? next.feeConsents : seedData.feeConsents,
            workingYear: next.workingYear || SCHOOL.academicYear,
            invoices: next.invoices?.some((inv) => inv.termId.startsWith("20"))
              ? next.invoices
              : seedData.invoices,
            payments: next.invoices?.some((inv) => inv.termId.startsWith("20"))
              ? next.payments
              : seedData.payments,
          };
        }
        if (fromVersion < 6) {
          next = {
            ...next,
            exams: next.exams?.length ? next.exams : DEFAULT_EXAMS.map((exam) => ({ ...exam })),
          };
        }
        return next;
      },
    },
  ),
);
