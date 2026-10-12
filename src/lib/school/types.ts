export type Gender = "Girl" | "Boy" | "Other";
export type StudentStatus = "Active" | "Alumni" | "Transferred";
export type PaymentMode = "UPI" | "Cash" | "Cheque" | "Card" | "Bank";
export type TcStatus = "Draft" | "Issued";
export type AccountRole = "Manager" | "Principal" | "Teacher" | "Parent" | "Student";
export type Capability = "users" | "admit" | "pay" | "result" | "tc" | "photo" | "restore" | "notice" | "file" | "exams";
export type NoticeAudience = "school" | "class" | "family" | "student";

export type Family = {
  id: string;
  familyCode: string;
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianRelation: string;
  phone: string;
  altPhone: string;
  email: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  occupation: string;
  notes: string;
  createdAt: string;
};

export type Student = {
  id: string;
  studentId: string;
  admissionNo: string;
  familyId: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;
  bloodGroup: string;
  className: string;
  section: string;
  rollNo: string;
  admissionDate: string;
  previousSchool: string;
  status: StudentStatus;
  category: string;
  tone: string;
  photo: string;
  createdAt: string;
};

export type SubjectMark = {
  name: string;
  maxMarks: number;
  marks: number;
};

export type ExamResult = {
  id: string;
  studentId: string;
  academicYear: string;
  examName: string;
  className: string;
  subjects: SubjectMark[];
  remarks: string;
  publishedAt: string;
};

export type ExamDefinition = {
  id: string;
  name: string;
  maxMarks: number;
};

export type FeeInvoice = {
  id: string;
  studentId: string;
  familyId: string;
  academicYear: string;
  termId: string;
  termLabel: string;
  heads: { name: string; amount: number }[];
  dueDate: string;
};

export type FeePayment = {
  id: string;
  invoiceId: string;
  studentId: string;
  familyId: string;
  amount: number;
  mode: PaymentMode;
  receiptNo: string;
  paidAt: string;
  note: string;
};

export type FamilyFeeMonth = {
  monthId: string;
  label: string;
  amount: number;
};

export type FamilyFeeConsent = {
  id: string;
  familyId: string;
  academicYear: string;
  monthlyAmount: number;
  months: FamilyFeeMonth[];
  consentDate: string;
  consentedBy: string;
  note: string;
};

export type TransferCertificate = {
  id: string;
  studentId: string;
  tcNo: string;
  issueDate: string;
  reason: string;
  lastClass: string;
  lastAttendanceDate: string;
  character: string;
  remarks: string;
  status: TcStatus;
};

export type SchoolAccount = {
  id: string;
  username: string;
  passwordHash: string;
  displayName: string;
  role: AccountRole;
  familyId: string;
  studentId: string;
  classNames: string[];
  active: boolean;
  createdAt: string;
};

export type Notice = {
  id: string;
  title: string;
  body: string;
  fromAccountId: string;
  fromName: string;
  fromRole: AccountRole;
  audience: NoticeAudience;
  classNames: string[];
  familyIds: string[];
  studentIds: string[];
  createdAt: string;
  pin: boolean;
};

export type NoticeRead = {
  noticeId: string;
  accountId: string;
  readAt: string;
};

export type SchoolData = {
  families: Family[];
  students: Student[];
  results: ExamResult[];
  exams: ExamDefinition[];
  invoices: FeeInvoice[];
  payments: FeePayment[];
  feeConsents: FamilyFeeConsent[];
  certificates: TransferCertificate[];
  accounts: SchoolAccount[];
  notices: Notice[];
  noticeReads: NoticeRead[];
  workingYear: string;
  lastFileExportAt: string;
  sessionId: string | null;
};
