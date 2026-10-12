import { getSql } from "@/lib/db";
import { noticeVisibleTo } from "./compute";
import { hashPassword } from "./password";
import { buildRegisterFile, parseRegisterFile, type RegisterFile } from "./register-file";
import { seedData } from "./seed";
import type { AccountRole, SchoolAccount, SchoolData } from "./types";

const REGISTER_ID = "office";
const SESSION_YEARS = 3;

type OfficeRow = { id: string; data: unknown; updated_at: string | Date; revision: number | string };

function stamp(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value) return new Date(value).toISOString();
  return new Date().toISOString();
}

function asPayload(data: unknown): string {
  return typeof data === "string" ? data : JSON.stringify(data);
}

async function readOffice(): Promise<{ file: RegisterFile; updatedAt: string; revision: number } | null> {
  const sql = await getSql();
  const rows = await sql.query<OfficeRow>(
    "select id, data, updated_at, revision from school_register where id = $1 limit 1",
    [REGISTER_ID],
  );
  const row = rows[0];
  if (!row) return null;
  const parsed = parseRegisterFile(asPayload(row.data));
  if (typeof parsed === "string") return null;
  return { file: parsed, updatedAt: stamp(row.updated_at), revision: Number(row.revision) || 1 };
}

async function writeOffice(file: RegisterFile, updatedAt: string) {
  const sql = await getSql();
  await sql.query(
    `insert into school_register (id, data, updated_at, revision)
     values ($1, $2::jsonb, $3::timestamptz, 1)
     on conflict (id) do update set data = excluded.data, updated_at = excluded.updated_at, revision = school_register.revision + 1`,
    [REGISTER_ID, JSON.stringify(file), updatedAt],
  );
}

async function casWrite(file: RegisterFile, updatedAt: string, expectedRevision: number): Promise<number | null> {
  const sql = await getSql();
  const rows = await sql.query<{ revision: number | string }>(
    `update school_register
     set data = $2::jsonb, updated_at = $3::timestamptz, revision = revision + 1
     where id = $1 and revision = $4
     returning revision`,
    [REGISTER_ID, JSON.stringify(file), updatedAt, expectedRevision],
  );
  const revision = rows[0]?.revision;
  return revision == null ? null : Number(revision);
}

async function archiveYear(file: RegisterFile) {
  const year = file.data.workingYear || "unknown";
  const slim: RegisterFile = {
    ...file,
    data: {
      ...file.data,
      students: file.data.students.map((student) => ({ ...student, photo: "" })),
      accounts: file.data.accounts.map((account) => ({ ...account, passwordHash: "" })),
    },
  };
  const sql = await getSql();
  await sql.query(
    `insert into school_year_archive (academic_year, data, saved_at)
     values ($1, $2::jsonb, now())
     on conflict (academic_year) do update set data = excluded.data, saved_at = now()`,
    [year, JSON.stringify(slim)],
  );
}

export async function ensureOffice(): Promise<{ seeded: boolean; file: RegisterFile; updatedAt: string }> {
  const existing = await readOffice();
  if (existing) return { seeded: false, ...existing };
  const updatedAt = new Date().toISOString();
  const file = buildRegisterFile({ ...seedData, sessionId: null }, updatedAt);
  await writeOffice(file, updatedAt);
  return { seeded: true, file, updatedAt };
}

function newToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function scopeForAccount(data: Omit<SchoolData, "sessionId">, account: SchoolAccount): Omit<SchoolData, "sessionId"> {
  const hideSecrets = (rows: SchoolAccount[]) =>
    account.role === "Manager" ? rows : rows.map((row) => ({ ...row, passwordHash: "" }));

  if (account.role === "Manager" || account.role === "Principal") {
    return { ...data, accounts: hideSecrets(data.accounts) };
  }

  let students = data.students;
  if (account.role === "Teacher") {
    students = data.students.filter((s) => account.classNames.includes(s.className));
  } else if (account.role === "Parent") {
    students = data.students.filter((s) => s.familyId === account.familyId);
  } else {
    students = data.students.filter((s) => s.id === account.studentId);
  }
  const ids = new Set(students.map((s) => s.id));
  const families = new Set(students.map((s) => s.familyId));
  return {
    ...data,
    accounts: hideSecrets(data.accounts.filter((row) => row.id === account.id)),
    students,
    families: data.families.filter((f) => families.has(f.id)),
    results: data.results.filter((r) => ids.has(r.studentId)),
    invoices: data.invoices.filter((inv) => ids.has(inv.studentId) || families.has(inv.familyId)),
    payments: data.payments.filter((p) => ids.has(p.studentId) || families.has(p.familyId)),
    feeConsents: data.feeConsents.filter((c) => families.has(c.familyId)),
    certificates: data.certificates.filter((c) => ids.has(c.studentId)),
    notices: data.notices.filter((n) => noticeVisibleTo(n, account, data.students)),
    noticeReads: data.noticeReads.filter((r) => r.accountId === account.id),
  };
}

async function sessionAccount(token: string): Promise<{ account: SchoolAccount; file: RegisterFile; updatedAt: string; revision: number } | null> {
  if (!token) return null;
  const sql = await getSql();
  const sessions = await sql.query<{ account_id: string; expires_at: string | Date }>(
    "select account_id, expires_at from school_sessions where token = $1 limit 1",
    [token],
  );
  const session = sessions[0];
  if (!session) return null;
  if (new Date(session.expires_at).getTime() < Date.now()) {
    await sql.query("delete from school_sessions where token = $1", [token]);
    return null;
  }
  const office = await readOffice();
  if (!office) return null;
  const account = office.file.data.accounts.find((row) => row.id === session.account_id && row.active);
  if (!account) return null;
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + SESSION_YEARS);
  await sql.query(
    "update school_sessions set last_seen = now(), expires_at = $2::timestamptz where token = $1",
    [token, expires.toISOString()],
  );
  return { account, ...office };
}

function payloadFor(file: RegisterFile, account: SchoolAccount, updatedAt: string) {
  const scoped = scopeForAccount(file.data, account);
  const body = buildRegisterFile({ ...scoped, sessionId: null }, updatedAt);
  return JSON.stringify(body);
}

function unionById<T extends { id: string }>(current: T[] | undefined, incoming: T[] | undefined): T[] {
  const map = new Map((current ?? []).map((row) => [row.id, row]));
  for (const row of incoming ?? []) {
    const prior = map.get(row.id);
    map.set(row.id, prior ? { ...prior, ...row } : row);
  }
  return [...map.values()];
}

function mergeAccounts(current: SchoolAccount[], incoming: SchoolAccount[], authoritative: boolean): SchoolAccount[] {
  if (authoritative) {
    return incoming.map((row) => {
      const prior = current.find((item) => item.id === row.id);
      if (!row.passwordHash && prior) return { ...row, passwordHash: prior.passwordHash };
      return row;
    });
  }
  const ids = new Set([...current.map((row) => row.id), ...incoming.map((row) => row.id)]);
  return [...ids].map((id) => {
    const prior = current.find((row) => row.id === id);
    const next = incoming.find((row) => row.id === id);
    if (!next) return prior as SchoolAccount;
    if (!prior) return next;
    if (!next.passwordHash) return { ...prior, ...next, passwordHash: prior.passwordHash };
    return { ...prior, ...next };
  });
}

function mergeByRole(
  role: AccountRole,
  account: SchoolAccount,
  current: Omit<SchoolData, "sessionId">,
  incoming: Omit<SchoolData, "sessionId">,
  authoritative: boolean,
): Omit<SchoolData, "sessionId"> {
  if (role === "Manager" && authoritative) {
    return { ...incoming, accounts: mergeAccounts(current.accounts, incoming.accounts, true) };
  }
  if (role === "Manager") {
    return {
      ...current,
      families: unionById(current.families, incoming.families),
      students: unionById(current.students, incoming.students),
      results: unionById(current.results, incoming.results),
      exams: unionById(current.exams, incoming.exams),
      invoices: unionById(current.invoices, incoming.invoices),
      payments: unionById(current.payments, incoming.payments),
      feeConsents: unionById(current.feeConsents, incoming.feeConsents),
      certificates: unionById(current.certificates, incoming.certificates),
      notices: unionById(current.notices, incoming.notices),
      noticeReads: [...current.noticeReads, ...incoming.noticeReads.filter((row) => !current.noticeReads.some((prior) => prior.noticeId === row.noticeId && prior.accountId === row.accountId))],
      accounts: mergeAccounts(current.accounts, incoming.accounts, false),
      workingYear: incoming.workingYear || current.workingYear,
      lastFileExportAt: incoming.lastFileExportAt || current.lastFileExportAt,
    };
  }
  if (role === "Principal" && authoritative) {
    return { ...incoming, accounts: current.accounts };
  }
  if (role === "Principal") {
    return {
      ...current,
      families: unionById(current.families, incoming.families),
      students: unionById(current.students, incoming.students),
      results: unionById(current.results, incoming.results),
      exams: unionById(current.exams, incoming.exams),
      invoices: unionById(current.invoices, incoming.invoices),
      payments: unionById(current.payments, incoming.payments),
      feeConsents: unionById(current.feeConsents, incoming.feeConsents),
      certificates: unionById(current.certificates, incoming.certificates),
      notices: unionById(current.notices, incoming.notices),
      workingYear: incoming.workingYear || current.workingYear,
    };
  }
  if (role === "Teacher") {
    const classes = new Set(account.classNames);
    const students = current.students.map((student) => {
      if (!classes.has(student.className)) return student;
      const next = incoming.students.find((row) => row.id === student.id);
      return next ? { ...student, photo: next.photo } : student;
    });
    const inClass = (studentId: string) => {
      const student = current.students.find((row) => row.id === studentId);
      return Boolean(student && classes.has(student.className));
    };
    const results = [
      ...current.results.filter((row) => !inClass(row.studentId)),
      ...incoming.results.filter((row) => inClass(row.studentId)),
    ];
    const notices = [
      ...current.notices.filter((row) => row.fromAccountId !== account.id),
      ...incoming.notices.filter((row) => row.fromAccountId === account.id),
    ];
    const noticeReads = [
      ...current.noticeReads.filter((row) => row.accountId !== account.id),
      ...incoming.noticeReads.filter((row) => row.accountId === account.id),
    ];
    return { ...current, students, results, notices, noticeReads };
  }
  const noticeReads = [
    ...current.noticeReads.filter((row) => row.accountId !== account.id),
    ...incoming.noticeReads.filter((row) => row.accountId === account.id),
  ];
  if (role === "Parent") {
    const students = current.students.map((student) => {
      if (student.familyId !== account.familyId) return student;
      const next = incoming.students.find((row) => row.id === student.id);
      return next ? { ...student, photo: next.photo } : student;
    });
    return { ...current, students, noticeReads };
  }
  return { ...current, noticeReads };
}

export async function signInOffice(username: string, password: string) {
  const office = await ensureOffice();
  const key = username.trim().toLowerCase();
  const account = office.file.data.accounts.find((row) => row.active && row.username.toLowerCase() === key);
  if (!account) return { ok: false as const, reason: "invalid" as const };
  const hash = await hashPassword(account.username, password);
  if (hash !== account.passwordHash) return { ok: false as const, reason: "invalid" as const };
  const token = newToken();
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + SESSION_YEARS);
  const sql = await getSql();
  await sql.query(
    `insert into school_sessions (token, account_id, role, expires_at)
     values ($1, $2, $3, $4::timestamptz)`,
    [token, account.id, account.role, expires.toISOString()],
  );
  return {
    ok: true as const,
    token,
    accountId: account.id,
    role: account.role,
    seeded: office.seeded,
    updatedAt: office.updatedAt,
    payload: payloadFor(office.file, account, office.updatedAt),
  };
}

export async function signOutOffice(token: string) {
  const sql = await getSql();
  await sql.query("delete from school_sessions where token = $1", [token]);
  return { ok: true as const };
}

export async function pullOffice(token: string) {
  const session = await sessionAccount(token);
  if (!session) return { ok: false as const, reason: "expired" as const };
  return {
    ok: true as const,
    accountId: session.account.id,
    role: session.account.role,
    updatedAt: session.updatedAt,
    payload: payloadFor(session.file, session.account, session.updatedAt),
  };
}

export async function pushOffice(token: string, payload: string, baseUpdatedAt = "") {
  const parsed = parseRegisterFile(payload);
  if (typeof parsed === "string") return { ok: false as const, reason: "invalid" as const };
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const session = await sessionAccount(token);
    if (!session) return { ok: false as const, reason: "expired" as const };
    const authoritative = attempt === 0 && Boolean(baseUpdatedAt) && session.updatedAt === baseUpdatedAt;
    const merged = mergeByRole(
      session.account.role,
      session.account,
      session.file.data,
      parsed.data,
      authoritative,
    );
    const updatedAt = new Date().toISOString();
    const file = buildRegisterFile({ ...merged, sessionId: null }, updatedAt);
    const revision = await casWrite(file, updatedAt, session.revision);
    if (revision == null) continue;
    await archiveYear(file);
    return {
      ok: true as const,
      updatedAt,
      payload: payloadFor(file, session.account, updatedAt),
    };
  }
  return { ok: false as const, reason: "busy" as const };
}
