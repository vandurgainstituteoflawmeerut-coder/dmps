export const SCHOOL = {
  name: "Dr. M. P. Swami Mem. G. Inter College",
  shortName: "Swami Inter College",
  motto: "Vidya dadati vinayam",
  affiliation: "Recognised by U.P. Madhyamik Shiksha Parishad",
  established: 2001,
  address: "New Prabhat Nagar, Meerut 250001, Uttar Pradesh",
  phone: "0121 2641 220",
  email: "office@swamiinter.ac.in",
  principal: "Smt. Sunita Sharma",
  academicYear: "2026–27",
} as const;

export const ACADEMIC_YEARS = ["2025–26", "2026–27", "2027–28"] as const;

export const CLASSES = [
  "Nursery",
  "LKG",
  "UKG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11 Science",
  "11 Commerce",
  "11 Arts",
  "12 Science",
  "12 Commerce",
  "12 Arts",
] as const;

export const SECTIONS = ["A", "B", "C"] as const;

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

export const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"] as const;

export const GENDERS = ["Girl", "Boy", "Other"] as const;

export const STUDENT_STATUSES = ["Active", "Alumni", "Transferred"] as const;

export const PAYMENT_MODES = ["UPI", "Cash", "Cheque", "Card", "Bank"] as const;

export const EXAMS = ["Unit 1", "Unit 2", "Terminal", "Half Yearly", "Annual"] as const;

export const DEFAULT_EXAMS = [
  { id: "ex_unit1", name: "Unit 1", maxMarks: 25 },
  { id: "ex_unit2", name: "Unit 2", maxMarks: 25 },
  { id: "ex_terminal", name: "Terminal", maxMarks: 50 },
  { id: "ex_half", name: "Half Yearly", maxMarks: 80 },
  { id: "ex_annual", name: "Annual", maxMarks: 100 },
] as const;

export const FEE_TERMS = [
  { id: "t1", label: "Term I · Apr–Jun", due: "2026-06-15" },
  { id: "t2", label: "Term II · Jul–Sep", due: "2026-09-15" },
  { id: "t3", label: "Term III · Oct–Dec", due: "2026-12-15" },
  { id: "t4", label: "Term IV · Jan–Mar", due: "2027-03-15" },
] as const;

const MONTH_LABELS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"] as const;

export function yearStart(year: string): number {
  const n = Number.parseInt(year.slice(0, 4), 10);
  return Number.isNaN(n) ? 2026 : n;
}

export function monthsForYear(year: string) {
  const y = yearStart(year);
  return MONTH_LABELS.map((label, i) => {
    const monthNum = i < 9 ? i + 4 : i - 8;
    const yy = i < 9 ? y : y + 1;
    const id = `${yy}-${String(monthNum).padStart(2, "0")}`;
    return { id, label, due: `${id}-10` };
  });
}

export const FEE_MONTHS = monthsForYear(SCHOOL.academicYear);

export const TC_REASONS = [
  "Parents' transfer",
  "Change of residence",
  "Admission to another school",
  "Family relocation",
  "Personal reasons",
] as const;

export const AVATAR_TONES = ["#2f4a43", "#3d4540", "#4a4038", "#33444c", "#3c3a42"] as const;

export const NOTICE_AUDIENCES = [
  { id: "school", label: "Whole school" },
  { id: "class", label: "Class-wise" },
  { id: "family", label: "Family-wise" },
  { id: "student", label: "Student-wise" },
] as const;

export function subjectsForClass(className: string): { name: string; maxMarks: number }[] {
  const max = 100;
  if (className.includes("Science") && (className.startsWith("11") || className.startsWith("12"))) {
    return [
      { name: "English", maxMarks: max },
      { name: "Physics", maxMarks: max },
      { name: "Chemistry", maxMarks: max },
      { name: "Mathematics", maxMarks: max },
      { name: "Computer Science", maxMarks: max },
    ];
  }
  if (className.includes("Arts")) {
    return [
      { name: "English", maxMarks: max },
      { name: "Hindi", maxMarks: max },
      { name: "History", maxMarks: max },
      { name: "Political Science", maxMarks: max },
      { name: "Economics", maxMarks: max },
    ];
  }
  if (className.includes("Commerce")) {
    return [
      { name: "English", maxMarks: max },
      { name: "Accountancy", maxMarks: max },
      { name: "Business Studies", maxMarks: max },
      { name: "Economics", maxMarks: max },
      { name: "Applied Maths", maxMarks: max },
    ];
  }
  const n = Number.parseInt(className, 10);
  if (!Number.isNaN(n) && n <= 2) {
    return [
      { name: "English", maxMarks: max },
      { name: "Hindi", maxMarks: max },
      { name: "Mathematics", maxMarks: max },
      { name: "EVS", maxMarks: max },
    ];
  }
  if (!Number.isNaN(n) && n <= 5) {
    return [
      { name: "English", maxMarks: max },
      { name: "Hindi", maxMarks: max },
      { name: "Mathematics", maxMarks: max },
      { name: "EVS", maxMarks: max },
      { name: "Computer", maxMarks: max },
    ];
  }
  return [
    { name: "English", maxMarks: max },
    { name: "Hindi", maxMarks: max },
    { name: "Mathematics", maxMarks: max },
    { name: "Science", maxMarks: max },
    { name: "Social Science", maxMarks: max },
    { name: "Computer", maxMarks: max },
  ];
}

export function tuitionForClass(className: string): number {
  if (className.startsWith("12") || className.startsWith("11")) return 28000;
  const n = Number.parseInt(className, 10);
  if (!Number.isNaN(n) && n >= 9) return 22000;
  if (!Number.isNaN(n) && n >= 6) return 18000;
  if (!Number.isNaN(n) && n >= 3) return 15000;
  return 12000;
}

export function suggestedMonthlyFee(classNames: string[]): number {
  if (classNames.length === 0) return 2500;
  const yearly = classNames.reduce((sum, name) => sum + tuitionForClass(name) * 2, 0);
  return Math.round(yearly / 12 / 50) * 50;
}
