import { SCHOOL } from "./config";
import type { SchoolData } from "./types";

export const REGISTER_KIND = "swami-inter-college-register";
export const REGISTER_FORMAT = 1;

export type RegisterFile = {
  kind: typeof REGISTER_KIND;
  format: number;
  school: string;
  savedAt: string;
  data: Omit<SchoolData, "sessionId">;
};

export function buildRegisterFile(state: SchoolData, savedAt: string): RegisterFile {
  const { sessionId: _session, ...rest } = state;
  void _session;
  return {
    kind: REGISTER_KIND,
    format: REGISTER_FORMAT,
    school: SCHOOL.name,
    savedAt,
    data: rest,
  };
}

export function parseRegisterFile(text: string): RegisterFile | string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    return "That file is not readable JSON.";
  }
  if (!parsed || typeof parsed !== "object") return "The file is empty.";
  const file = parsed as Partial<RegisterFile>;
  if (file.kind !== REGISTER_KIND) return "This is not a Swami Inter College register file.";
  if (!file.data || !Array.isArray(file.data.families) || !Array.isArray(file.data.students)) {
    return "The file has no families or students.";
  }
  if (!Array.isArray(file.data.accounts)) return "The file is missing logins.";
  return file as RegisterFile;
}

export function registerFileName(year: string, savedAt: string) {
  const day = savedAt.slice(0, 10) || "today";
  const slug = year.replace("–", "-");
  return `Swami-Inter-College-Register-${slug}-${day}.json`;
}

export function downloadRegister(file: RegisterFile) {
  const blob = new Blob([JSON.stringify(file, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = registerFileName(file.data.workingYear || SCHOOL.academicYear, file.savedAt);
  a.click();
  URL.revokeObjectURL(url);
}
