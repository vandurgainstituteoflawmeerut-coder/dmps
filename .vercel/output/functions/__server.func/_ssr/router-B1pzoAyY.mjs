import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { C as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as Navigate, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { _ as BookOpen, c as Menu, d as KeyRound, f as IndianRupee, h as CreditCard, i as TriangleAlert, l as Megaphone, m as GraduationCap, n as Users, o as ScrollText, p as House, r as UsersRound, t as X, u as LogOut } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-Bv-dyJSh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hadBrowserCopy = false;
function noteBrowserCopy(raw) {
	if (raw) hadBrowserCopy = true;
}
var SCHOOL = {
	name: "Dr. M. P. Swami Mem. G. Inter College",
	shortName: "Swami Inter College",
	motto: "Vidya dadati vinayam",
	affiliation: "Recognised by U.P. Madhyamik Shiksha Parishad",
	established: 2001,
	address: "New Prabhat Nagar, Meerut 250001, Uttar Pradesh",
	phone: "0121 2641 220",
	email: "office@swamiinter.ac.in",
	principal: "Smt. Sunita Sharma",
	academicYear: "2026–27"
};
var ACADEMIC_YEARS = [
	"2025–26",
	"2026–27",
	"2027–28"
];
var CLASSES = [
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
	"12 Arts"
];
var SECTIONS = [
	"A",
	"B",
	"C"
];
var BLOOD_GROUPS = [
	"A+",
	"A-",
	"B+",
	"B-",
	"AB+",
	"AB-",
	"O+",
	"O-"
];
var CATEGORIES = [
	"General",
	"OBC",
	"SC",
	"ST",
	"EWS"
];
var GENDERS = [
	"Girl",
	"Boy",
	"Other"
];
var PAYMENT_MODES = [
	"UPI",
	"Cash",
	"Cheque",
	"Card",
	"Bank"
];
var DEFAULT_EXAMS = [
	{
		id: "ex_unit1",
		name: "Unit 1",
		maxMarks: 25
	},
	{
		id: "ex_unit2",
		name: "Unit 2",
		maxMarks: 25
	},
	{
		id: "ex_terminal",
		name: "Terminal",
		maxMarks: 50
	},
	{
		id: "ex_half",
		name: "Half Yearly",
		maxMarks: 80
	},
	{
		id: "ex_annual",
		name: "Annual",
		maxMarks: 100
	}
];
var MONTH_LABELS = [
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
	"Jan",
	"Feb",
	"Mar"
];
function yearStart(year) {
	const n = Number.parseInt(year.slice(0, 4), 10);
	return Number.isNaN(n) ? 2026 : n;
}
function monthsForYear(year) {
	const y = yearStart(year);
	return MONTH_LABELS.map((label, i) => {
		const monthNum = i < 9 ? i + 4 : i - 8;
		const id = `${i < 9 ? y : y + 1}-${String(monthNum).padStart(2, "0")}`;
		return {
			id,
			label,
			due: `${id}-10`
		};
	});
}
monthsForYear(SCHOOL.academicYear);
var TC_REASONS = [
	"Parents' transfer",
	"Change of residence",
	"Admission to another school",
	"Family relocation",
	"Personal reasons"
];
var AVATAR_TONES = [
	"#2f4a43",
	"#3d4540",
	"#4a4038",
	"#33444c",
	"#3c3a42"
];
var NOTICE_AUDIENCES = [
	{
		id: "school",
		label: "Whole school"
	},
	{
		id: "class",
		label: "Class-wise"
	},
	{
		id: "family",
		label: "Family-wise"
	},
	{
		id: "student",
		label: "Student-wise"
	}
];
function subjectsForClass(className) {
	const max = 100;
	if (className.includes("Science") && (className.startsWith("11") || className.startsWith("12"))) return [
		{
			name: "English",
			maxMarks: max
		},
		{
			name: "Physics",
			maxMarks: max
		},
		{
			name: "Chemistry",
			maxMarks: max
		},
		{
			name: "Mathematics",
			maxMarks: max
		},
		{
			name: "Computer Science",
			maxMarks: max
		}
	];
	if (className.includes("Arts")) return [
		{
			name: "English",
			maxMarks: max
		},
		{
			name: "Hindi",
			maxMarks: max
		},
		{
			name: "History",
			maxMarks: max
		},
		{
			name: "Political Science",
			maxMarks: max
		},
		{
			name: "Economics",
			maxMarks: max
		}
	];
	if (className.includes("Commerce")) return [
		{
			name: "English",
			maxMarks: max
		},
		{
			name: "Accountancy",
			maxMarks: max
		},
		{
			name: "Business Studies",
			maxMarks: max
		},
		{
			name: "Economics",
			maxMarks: max
		},
		{
			name: "Applied Maths",
			maxMarks: max
		}
	];
	const n = Number.parseInt(className, 10);
	if (!Number.isNaN(n) && n <= 2) return [
		{
			name: "English",
			maxMarks: max
		},
		{
			name: "Hindi",
			maxMarks: max
		},
		{
			name: "Mathematics",
			maxMarks: max
		},
		{
			name: "EVS",
			maxMarks: max
		}
	];
	if (!Number.isNaN(n) && n <= 5) return [
		{
			name: "English",
			maxMarks: max
		},
		{
			name: "Hindi",
			maxMarks: max
		},
		{
			name: "Mathematics",
			maxMarks: max
		},
		{
			name: "EVS",
			maxMarks: max
		},
		{
			name: "Computer",
			maxMarks: max
		}
	];
	return [
		{
			name: "English",
			maxMarks: max
		},
		{
			name: "Hindi",
			maxMarks: max
		},
		{
			name: "Mathematics",
			maxMarks: max
		},
		{
			name: "Science",
			maxMarks: max
		},
		{
			name: "Social Science",
			maxMarks: max
		},
		{
			name: "Computer",
			maxMarks: max
		}
	];
}
function tuitionForClass(className) {
	if (className.startsWith("12") || className.startsWith("11")) return 28e3;
	const n = Number.parseInt(className, 10);
	if (!Number.isNaN(n) && n >= 9) return 22e3;
	if (!Number.isNaN(n) && n >= 6) return 18e3;
	if (!Number.isNaN(n) && n >= 3) return 15e3;
	return 12e3;
}
function suggestedMonthlyFee(classNames) {
	if (classNames.length === 0) return 2500;
	const yearly = classNames.reduce((sum, name) => sum + tuitionForClass(name) * 2, 0);
	return Math.round(yearly / 12 / 50) * 50;
}
async function hashPassword(username, password) {
	const payload = `${username.trim().toLowerCase()}\0${password}`;
	const bytes = new TextEncoder().encode(payload);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
var MAX_W = 480;
var MAX_H = 600;
async function readStudentPhoto(file) {
	if (!file.type.startsWith("image/")) throw new Error("Choose a JPEG or PNG photograph.");
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, MAX_W / bitmap.width, MAX_H / bitmap.height);
	const width = Math.max(1, Math.round(bitmap.width * scale));
	const height = Math.max(1, Math.round(bitmap.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not process the photograph.");
	ctx.drawImage(bitmap, 0, 0, width, height);
	bitmap.close();
	return canvas.toDataURL("image/jpeg", .84);
}
function hash(value) {
	let h = 2166136261;
	for (let i = 0; i < value.length; i += 1) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
	return h >>> 0;
}
var SKINS = [
	"#f3d0b4",
	"#e4b48a",
	"#d09a68",
	"#c68642",
	"#a86a3c",
	"#8d5524"
];
var HAIRS = [
	"#1a1410",
	"#2c2018",
	"#3d2a1c",
	"#4a3424",
	"#231910"
];
function illustratedPortrait(id, gender) {
	const h = hash(id);
	const skin = SKINS[h % SKINS.length] ?? SKINS[0];
	const hair = HAIRS[(h >> 5) % HAIRS.length] ?? HAIRS[0];
	const blush = (h >> 9) % 3 !== 0;
	const plaits = gender !== "Boy";
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="160" height="200">
    <rect width="160" height="200" fill="#efe6d6"/>
    <ellipse cx="80" cy="208" rx="78" ry="58" fill="#1f4a3e"/>
    <path d="M52 148 L80 200 L108 148 Z" fill="#f6f1e8"/>
    <rect x="72" y="136" width="16" height="28" rx="6" fill="#c45c3a"/>
    <rect x="68" y="116" width="24" height="22" rx="10" fill="${skin}"/>
    ${plaits ? `<path d="M38 92 C28 130 36 168 44 188" stroke="${hair}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M122 92 C132 130 124 168 116 188" stroke="${hair}" stroke-width="14" fill="none" stroke-linecap="round"/>` : ""}
    <ellipse cx="80" cy="86" rx="40" ry="46" fill="${skin}"/>
    ${plaits ? `<path d="M40 78 C48 28 112 28 120 78 C110 48 50 48 40 78 Z" fill="${hair}"/><path d="M38 70 Q80 18 122 70" fill="${hair}"/>` : `<path d="M40 86 C42 28 118 28 120 86 C108 58 52 58 40 86 Z" fill="${hair}"/>`}
    <ellipse cx="66" cy="90" rx="4.2" ry="5" fill="#241c16"/>
    <ellipse cx="94" cy="90" rx="4.2" ry="5" fill="#241c16"/>
    ${blush ? `<ellipse cx="56" cy="102" rx="7" ry="4" fill="#e8a090" opacity="0.45"/><ellipse cx="104" cy="102" rx="7" ry="4" fill="#e8a090" opacity="0.45"/>` : ""}
    <path d="M70 110 Q80 118 90 110" fill="none" stroke="#a56a52" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`;
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
var YEAR = SCHOOL.academicYear;
function family(partial) {
	return {
		state: "Uttar Pradesh",
		createdAt: "2024-04-08",
		...partial
	};
}
function student(partial) {
	return {
		photo: illustratedPortrait(partial.id, partial.gender),
		...partial
	};
}
function marks(pairs, max = 100) {
	return pairs.map(([name, value]) => ({
		name,
		maxMarks: max,
		marks: value
	}));
}
function consentRow(familyId, monthlyAmount, consentedBy, note = "") {
	const months = monthsForYear(YEAR).map((m) => ({
		monthId: m.id,
		label: m.label,
		amount: monthlyAmount
	}));
	return {
		id: `fee_${familyId}_${YEAR}`,
		familyId,
		academicYear: YEAR,
		monthlyAmount,
		months,
		consentDate: "2026-04-02",
		consentedBy,
		note
	};
}
var families = [
	family({
		id: "fam_sharma",
		familyCode: "FAM-26-001",
		fatherName: "Rajesh Sharma",
		motherName: "Priya Sharma",
		guardianName: "Rajesh Sharma",
		guardianRelation: "Father",
		phone: "9876543210",
		altPhone: "9822011455",
		email: "rajesh.sharma@example.com",
		addressLine1: "14, Lane 3, New Prabhat Nagar",
		city: "Meerut",
		pincode: "250001",
		occupation: "Chartered accountant",
		notes: "Three children on the same transport route (Prabhat Nagar).",
		createdAt: "2019-04-12"
	}),
	family({
		id: "fam_iyer",
		familyCode: "FAM-26-002",
		fatherName: "Suresh Iyer",
		motherName: "Lakshmi Iyer",
		guardianName: "Lakshmi Iyer",
		guardianRelation: "Mother",
		phone: "9811122233",
		altPhone: "02025661190",
		email: "lakshmi.iyer@example.com",
		addressLine1: "B-802, Ganga Residency, Shastri Nagar",
		city: "Meerut",
		pincode: "250004",
		occupation: "Software engineering (mother); consulting (father)",
		notes: "Mother is the day-to-day contact.",
		createdAt: "2016-06-02"
	}),
	family({
		id: "fam_khan",
		familyCode: "FAM-26-003",
		fatherName: "",
		motherName: "Farah Khan",
		guardianName: "Farah Khan",
		guardianRelation: "Mother",
		phone: "9890011220",
		altPhone: "",
		email: "farah.khan@example.com",
		addressLine1: "22, Gulmohar Society, Pallavpuram",
		city: "Meerut",
		pincode: "250110",
		occupation: "Architect",
		notes: "Single-parent household. Fee concession on file for Term II.",
		createdAt: "2021-03-18"
	}),
	family({
		id: "fam_fern",
		familyCode: "FAM-26-004",
		fatherName: "Miguel Fernandes",
		motherName: "Anita Fernandes",
		guardianName: "Miguel Fernandes",
		guardianRelation: "Father",
		phone: "9765432109",
		altPhone: "9881234500",
		email: "fernandes.home@example.com",
		addressLine1: "9, St. Joseph’s Lane, Meerut Cantt",
		city: "Meerut",
		pincode: "250001",
		occupation: "Hotel management",
		notes: "",
		createdAt: "2015-04-04"
	}),
	family({
		id: "fam_patel",
		familyCode: "FAM-26-005",
		fatherName: "Nirav Patel",
		motherName: "Hetal Patel",
		guardianName: "Nirav Patel",
		guardianRelation: "Father",
		phone: "9900887766",
		altPhone: "",
		email: "nirav.patel@example.com",
		addressLine1: "Flat 12, Sage Residency, Jagriti Vihar",
		city: "Meerut",
		pincode: "250004",
		occupation: "Retail",
		notes: "",
		createdAt: "2022-04-11"
	}),
	family({
		id: "fam_reddy",
		familyCode: "FAM-26-006",
		fatherName: "Srinivas Reddy",
		motherName: "Anjali Reddy",
		guardianName: "Anjali Reddy",
		guardianRelation: "Mother",
		phone: "9845012345",
		altPhone: "9845098765",
		email: "anjali.reddy@example.com",
		addressLine1: "41, Magnolia Bungalows, Ganga Nagar",
		city: "Meerut",
		pincode: "250001",
		occupation: "Medicine (both parents)",
		notes: "Board candidate — extra lab hours approved.",
		createdAt: "2014-04-07"
	}),
	family({
		id: "fam_joshi",
		familyCode: "FAM-26-007",
		fatherName: "Amit Joshi",
		motherName: "Neha Joshi",
		guardianName: "Amit Joshi",
		guardianRelation: "Father",
		phone: "9123456780",
		altPhone: "",
		email: "amit.joshi@example.com",
		addressLine1: "Formerly 18, Model Town — relocated to Lucknow",
		city: "Lucknow",
		state: "Uttar Pradesh",
		pincode: "226001",
		occupation: "Banking",
		notes: "Family relocated. TC issued for Vikram.",
		createdAt: "2018-06-15"
	})
];
var students = [
	student({
		id: "stu_aanya",
		studentId: "SWC-26-0101",
		admissionNo: "ADM-19-0101",
		familyId: "fam_sharma",
		firstName: "Aanya",
		lastName: "Sharma",
		gender: "Girl",
		dateOfBirth: "2012-11-14",
		bloodGroup: "O+",
		className: "8",
		section: "A",
		rollNo: "12",
		admissionDate: "2019-04-12",
		previousSchool: "Little Oak Pre-school",
		status: "Active",
		category: "General",
		tone: "#2f4a43",
		createdAt: "2019-04-12"
	}),
	student({
		id: "stu_rohan",
		studentId: "SWC-26-0102",
		admissionNo: "ADM-21-0102",
		familyId: "fam_sharma",
		firstName: "Rohan",
		lastName: "Sharma",
		gender: "Boy",
		dateOfBirth: "2016-03-02",
		bloodGroup: "B+",
		className: "5",
		section: "B",
		rollNo: "18",
		admissionDate: "2021-06-10",
		previousSchool: "Swami Inter College (sibling admission)",
		status: "Active",
		category: "General",
		tone: "#33444c",
		createdAt: "2021-06-10"
	}),
	student({
		id: "stu_diya",
		studentId: "SWC-26-0103",
		admissionNo: "ADM-24-0103",
		familyId: "fam_sharma",
		firstName: "Diya",
		lastName: "Sharma",
		gender: "Girl",
		dateOfBirth: "2019-07-19",
		bloodGroup: "O+",
		className: "2",
		section: "A",
		rollNo: "07",
		admissionDate: "2024-04-08",
		previousSchool: "Swami Nursery",
		status: "Active",
		category: "General",
		tone: "#4a4038",
		createdAt: "2024-04-08"
	}),
	student({
		id: "stu_kabir",
		studentId: "SWC-26-0104",
		admissionNo: "ADM-16-0104",
		familyId: "fam_iyer",
		firstName: "Kabir",
		lastName: "Iyer",
		gender: "Boy",
		dateOfBirth: "2010-08-21",
		bloodGroup: "A+",
		className: "10",
		section: "A",
		rollNo: "04",
		admissionDate: "2016-06-02",
		previousSchool: "In-house from UKG",
		status: "Active",
		category: "General",
		tone: "#3c3a42",
		createdAt: "2016-06-02"
	}),
	student({
		id: "stu_meera",
		studentId: "SWC-26-0105",
		admissionNo: "ADM-19-0105",
		familyId: "fam_iyer",
		firstName: "Meera",
		lastName: "Iyer",
		gender: "Girl",
		dateOfBirth: "2013-01-09",
		bloodGroup: "A+",
		className: "7",
		section: "C",
		rollNo: "09",
		admissionDate: "2019-04-15",
		previousSchool: "Swami Inter College (sibling admission)",
		status: "Active",
		category: "General",
		tone: "#2f4a43",
		createdAt: "2019-04-15"
	}),
	student({
		id: "stu_zara",
		studentId: "SWC-26-0106",
		admissionNo: "ADM-21-0106",
		familyId: "fam_khan",
		firstName: "Zara",
		lastName: "Khan",
		gender: "Girl",
		dateOfBirth: "2011-12-03",
		bloodGroup: "AB+",
		className: "9",
		section: "B",
		rollNo: "21",
		admissionDate: "2021-03-18",
		previousSchool: "Springdale Public School",
		status: "Active",
		category: "General",
		tone: "#3d4540",
		createdAt: "2021-03-18"
	}),
	student({
		id: "stu_liam",
		studentId: "SWC-26-0107",
		admissionNo: "ADM-15-0107",
		familyId: "fam_fern",
		firstName: "Liam",
		lastName: "Fernandes",
		gender: "Boy",
		dateOfBirth: "2009-05-27",
		bloodGroup: "O+",
		className: "11 Science",
		section: "A",
		rollNo: "02",
		admissionDate: "2015-04-04",
		previousSchool: "In-house from Class 1",
		status: "Active",
		category: "General",
		tone: "#33444c",
		createdAt: "2015-04-04"
	}),
	student({
		id: "stu_sofia",
		studentId: "SWC-26-0108",
		admissionNo: "ADM-20-0108",
		familyId: "fam_fern",
		firstName: "Sofia",
		lastName: "Fernandes",
		gender: "Girl",
		dateOfBirth: "2014-09-16",
		bloodGroup: "B+",
		className: "6",
		section: "A",
		rollNo: "15",
		admissionDate: "2020-06-12",
		previousSchool: "Swami Inter College (sibling admission)",
		status: "Active",
		category: "General",
		tone: "#4a4038",
		createdAt: "2020-06-12"
	}),
	student({
		id: "stu_arjun",
		studentId: "SWC-26-0109",
		admissionNo: "ADM-22-0109",
		familyId: "fam_patel",
		firstName: "Arjun",
		lastName: "Patel",
		gender: "Boy",
		dateOfBirth: "2017-02-11",
		bloodGroup: "A+",
		className: "4",
		section: "B",
		rollNo: "11",
		admissionDate: "2022-04-11",
		previousSchool: "Rainbow Kids",
		status: "Active",
		category: "OBC",
		tone: "#2f4a43",
		createdAt: "2022-04-11"
	}),
	student({
		id: "stu_ananya",
		studentId: "SWC-26-0110",
		admissionNo: "ADM-14-0110",
		familyId: "fam_reddy",
		firstName: "Ananya",
		lastName: "Reddy",
		gender: "Girl",
		dateOfBirth: "2008-10-30",
		bloodGroup: "O-",
		className: "12 Commerce",
		section: "A",
		rollNo: "01",
		admissionDate: "2014-04-07",
		previousSchool: "In-house from Class 1",
		status: "Active",
		category: "General",
		tone: "#3c3a42",
		createdAt: "2014-04-07"
	}),
	student({
		id: "stu_vikram",
		studentId: "SWC-26-0111",
		admissionNo: "ADM-18-0111",
		familyId: "fam_joshi",
		firstName: "Vikram",
		lastName: "Joshi",
		gender: "Boy",
		dateOfBirth: "2012-04-05",
		bloodGroup: "B+",
		className: "8",
		section: "B",
		rollNo: "—",
		admissionDate: "2018-06-15",
		previousSchool: "City International",
		status: "Transferred",
		category: "General",
		tone: "#3d4540",
		createdAt: "2018-06-15"
	})
];
Object.fromEntries(students.map((s) => [s.id, s]));
var feeConsents = [
	consentRow("fam_sharma", 6500, "Rajesh Sharma"),
	consentRow("fam_iyer", 5500, "Lakshmi Iyer"),
	consentRow("fam_khan", 3200, "Farah Khan", "Concession recorded with parent consent."),
	consentRow("fam_fern", 6e3, "Miguel Fernandes"),
	consentRow("fam_patel", 2800, "Nirav Patel"),
	consentRow("fam_reddy", 4500, "Anjali Reddy")
];
var invoices = [];
var payments = [];
var receipt = 1201;
for (const consent of feeConsents) {
	const studentId = students.find((s) => s.familyId === consent.familyId && s.status === "Active")?.id ?? "";
	monthsForYear(YEAR).forEach((month, index) => {
		const amount = consent.months[index]?.amount ?? consent.monthlyAmount;
		const invoiceId = `inv_${consent.familyId}_${month.id}`;
		invoices.push({
			id: invoiceId,
			studentId,
			familyId: consent.familyId,
			academicYear: YEAR,
			termId: month.id,
			termLabel: month.label,
			dueDate: month.due,
			heads: [{
				name: "Monthly family fee",
				amount
			}]
		});
		if (index < (consent.familyId === "fam_khan" ? 5 : 6)) {
			payments.push({
				id: `pay_${consent.familyId}_${month.id}`,
				invoiceId,
				studentId,
				familyId: consent.familyId,
				amount,
				mode: index % 2 === 0 ? "UPI" : "Bank",
				receiptNo: `RCP-26-${String(receipt).padStart(4, "0")}`,
				paidAt: month.due,
				note: ""
			});
			receipt += 1;
		} else if (consent.familyId === "fam_sharma" && month.label === "Sep") {
			payments.push({
				id: "pay_sharma_sep_part",
				invoiceId,
				studentId,
				familyId: consent.familyId,
				amount: 3e3,
				mode: "UPI",
				receiptNo: `RCP-26-${String(receipt).padStart(4, "0")}`,
				paidAt: "2026-09-10",
				note: "Part payment — siblings pending"
			});
			receipt += 1;
		}
	});
}
var seedData = {
	families,
	students,
	results: [
		{
			id: "res_aanya_t1",
			studentId: "stu_aanya",
			academicYear: YEAR,
			examName: "Term I",
			className: "8",
			subjects: marks([
				["English", 88],
				["Hindi", 81],
				["Mathematics", 92],
				["Science", 86],
				["Social Science", 84],
				["Computer", 90]
			]),
			remarks: "Consistent work. Encourage wider reading.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_aanya_t2",
			studentId: "stu_aanya",
			academicYear: YEAR,
			examName: "Term II",
			className: "8",
			subjects: marks([
				["English", 90],
				["Hindi", 83],
				["Mathematics", 94],
				["Science", 89],
				["Social Science", 85],
				["Computer", 91]
			]),
			remarks: "Ready for Olympiad nomination in Mathematics.",
			publishedAt: "2026-09-20"
		},
		{
			id: "res_rohan_t1",
			studentId: "stu_rohan",
			academicYear: YEAR,
			examName: "Term I",
			className: "5",
			subjects: marks([
				["English", 74],
				["Hindi", 70],
				["Mathematics", 68],
				["EVS", 77],
				["Computer", 80]
			]),
			remarks: "Needs support in number operations. Weekly drill in place.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_diya_t1",
			studentId: "stu_diya",
			academicYear: YEAR,
			examName: "Term I",
			className: "2",
			subjects: marks([
				["English", 86],
				["Hindi", 84],
				["Mathematics", 80],
				["EVS", 88]
			]),
			remarks: "Cheerful participant. Fine motor skills improving.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_kabir_t1",
			studentId: "stu_kabir",
			academicYear: YEAR,
			examName: "Term I",
			className: "10",
			subjects: marks([
				["English", 79],
				["Hindi", 72],
				["Mathematics", 88],
				["Science", 91],
				["Social Science", 76],
				["Computer", 93]
			]),
			remarks: "Board-bound. Science is a clear strength.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_kabir_t2",
			studentId: "stu_kabir",
			academicYear: YEAR,
			examName: "Term II",
			className: "10",
			subjects: marks([
				["English", 82],
				["Hindi", 74],
				["Mathematics", 90],
				["Science", 94],
				["Social Science", 78],
				["Computer", 95]
			]),
			remarks: "Pre-board pathway agreed with family.",
			publishedAt: "2026-09-22"
		},
		{
			id: "res_meera_t1",
			studentId: "stu_meera",
			academicYear: YEAR,
			examName: "Term I",
			className: "7",
			subjects: marks([
				["English", 91],
				["Hindi", 88],
				["Mathematics", 84],
				["Science", 86],
				["Social Science", 92],
				["Computer", 87]
			]),
			remarks: "Editorial voice in the class magazine.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_zara_t1",
			studentId: "stu_zara",
			academicYear: YEAR,
			examName: "Term I",
			className: "9",
			subjects: marks([
				["English", 85],
				["Hindi", 80],
				["Mathematics", 71],
				["Science", 77],
				["Social Science", 89],
				["Computer", 82]
			]),
			remarks: "Strong in languages. Maths support ongoing.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_liam_t1",
			studentId: "stu_liam",
			academicYear: YEAR,
			examName: "Term I",
			className: "11 Science",
			subjects: marks([
				["English", 76],
				["Physics", 81],
				["Chemistry", 79],
				["Mathematics", 88],
				["Computer Science", 92]
			]),
			remarks: "Lab journals are exemplary.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_sofia_t1",
			studentId: "stu_sofia",
			academicYear: YEAR,
			examName: "Term I",
			className: "6",
			subjects: marks([
				["English", 83],
				["Hindi", 79],
				["Mathematics", 75],
				["Science", 80],
				["Social Science", 84],
				["Computer", 86]
			]),
			remarks: "Settled well after the class change.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_arjun_t1",
			studentId: "stu_arjun",
			academicYear: YEAR,
			examName: "Term I",
			className: "4",
			subjects: marks([
				["English", 70],
				["Hindi", 73],
				["Mathematics", 81],
				["EVS", 78],
				["Computer", 74]
			]),
			remarks: "More spoken English practice recommended.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_ananya_t1",
			studentId: "stu_ananya",
			academicYear: YEAR,
			examName: "Term I",
			className: "12 Commerce",
			subjects: marks([
				["English", 88],
				["Accountancy", 93],
				["Business Studies", 90],
				["Economics", 87],
				["Applied Maths", 84]
			]),
			remarks: "Board candidate. Accountancy is distinction-level.",
			publishedAt: "2026-05-28"
		},
		{
			id: "res_ananya_t2",
			studentId: "stu_ananya",
			academicYear: YEAR,
			examName: "Term II",
			className: "12 Commerce",
			subjects: marks([
				["English", 90],
				["Accountancy", 95],
				["Business Studies", 91],
				["Economics", 89],
				["Applied Maths", 86]
			]),
			remarks: "Pre-board rank 2 in Commerce.",
			publishedAt: "2026-09-21"
		}
	],
	exams: DEFAULT_EXAMS.map((exam) => ({ ...exam })),
	invoices,
	payments,
	feeConsents,
	certificates: [{
		id: "tc_vikram",
		studentId: "stu_vikram",
		tcNo: "TC-26-004",
		issueDate: "2026-06-20",
		reason: "Family relocation",
		lastClass: "8–B",
		lastAttendanceDate: "2026-06-14",
		character: "Good",
		remarks: "Cleared all dues. Records forwarded on request.",
		status: "Issued"
	}],
	accounts: [
		{
			id: "acct_manager",
			username: "Pankajswami",
			passwordHash: "38948ef7499a298147733c412be2d02a03c0db39189b1a58232b6aaae0f3b540",
			displayName: "Pankaj Swami",
			role: "Manager",
			familyId: "",
			studentId: "",
			classNames: [],
			active: true,
			createdAt: "2024-04-01"
		},
		{
			id: "acct_principal",
			username: "principal",
			passwordHash: "997703f14d3013c1172d84886b7898b47928083bb4e99fad345768ef625b8732",
			displayName: "Smt. Sunita Sharma",
			role: "Principal",
			familyId: "",
			studentId: "",
			classNames: [],
			active: true,
			createdAt: "2024-04-01"
		},
		{
			id: "acct_teacher_gupta",
			username: "neha.gupta",
			passwordHash: "5db38381886b26d6ee807b386530cf42cbba55a955f2b0201a0ff7348bc4b7b3",
			displayName: "Neha Gupta",
			role: "Teacher",
			familyId: "",
			studentId: "",
			classNames: [
				"8",
				"9",
				"10"
			],
			active: true,
			createdAt: "2024-04-08"
		},
		{
			id: "acct_fam_sharma",
			username: "sharma.family",
			passwordHash: "0f49a03dcca9bde7f8cdd9217b67bcaf2d22bf5f0afff7d3209a54a0091de9ef",
			displayName: "Rajesh Sharma",
			role: "Parent",
			familyId: "fam_sharma",
			studentId: "",
			classNames: [],
			active: true,
			createdAt: "2019-04-12"
		},
		{
			id: "acct_stu_aanya",
			username: "aanya.sharma",
			passwordHash: "f5149e91ab7930af7c65b14b1bd583cdccfb4f23630e88447b5440b30d29f7d4",
			displayName: "Aanya Sharma",
			role: "Student",
			familyId: "fam_sharma",
			studentId: "stu_aanya",
			classNames: [],
			active: true,
			createdAt: "2019-04-12"
		}
	],
	notices: [
		{
			id: "ntc_ptm",
			title: "Parent–teacher meeting · 18 October",
			body: "The Term I meeting will be held in the senior hall from 9:00 a.m. to 1:00 p.m. Kindly bring the fee book and the last report card. Classes remain off for the day.",
			fromAccountId: "acct_principal",
			fromName: "Smt. Sunita Sharma",
			fromRole: "Principal",
			audience: "school",
			classNames: [],
			familyIds: [],
			studentIds: [],
			createdAt: "2026-10-01T09:00:00.000Z",
			pin: true
		},
		{
			id: "ntc_fee_sharma",
			title: "Fee reminder · Sharma household",
			body: "Term II still shows an open balance for Aanya, Rohan and Diya. Kindly clear the remaining amount at the office or by UPI to the college account before 15 October.",
			fromAccountId: "acct_manager",
			fromName: "Pankaj Swami",
			fromRole: "Manager",
			audience: "family",
			classNames: [],
			familyIds: ["fam_sharma"],
			studentIds: [],
			createdAt: "2026-09-28T11:30:00.000Z",
			pin: false
		},
		{
			id: "ntc_class8",
			title: "Class 8 · Science practical notebook",
			body: "Bring the completed practical notebook on Monday. Incomplete records will not be signed for the Term II file.",
			fromAccountId: "acct_teacher_gupta",
			fromName: "Neha Gupta",
			fromRole: "Teacher",
			audience: "class",
			classNames: ["8"],
			familyIds: [],
			studentIds: [],
			createdAt: "2026-09-30T07:45:00.000Z",
			pin: false
		},
		{
			id: "ntc_aanya",
			title: "Aanya Sharma · Olympiad entry",
			body: "Your Science Olympiad form is ready at the office. Collect it from Mrs Gupta and return it signed by Friday.",
			fromAccountId: "acct_teacher_gupta",
			fromName: "Neha Gupta",
			fromRole: "Teacher",
			audience: "student",
			classNames: [],
			familyIds: [],
			studentIds: ["stu_aanya"],
			createdAt: "2026-09-26T10:15:00.000Z",
			pin: false
		}
	],
	noticeReads: [],
	workingYear: YEAR,
	lastFileExportAt: "",
	sessionId: null
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
function formatINR(amount) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(amount);
}
function formatDate(iso, opts) {
	if (!iso) return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "—";
	return d.toLocaleDateString("en-IN", opts ?? {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function formatDateLong(iso) {
	return formatDate(iso, {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function ageFromDob(iso, on = /* @__PURE__ */ new Date()) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return 0;
	let age = on.getFullYear() - d.getFullYear();
	const m = on.getMonth() - d.getMonth();
	if (m < 0 || m === 0 && on.getDate() < d.getDate()) age -= 1;
	return age;
}
function nextSerial(prefix, existing, pad = 4) {
	let max = 0;
	for (const value of existing) {
		const match = value.match(/(\d+)$/);
		if (match) max = Math.max(max, Number(match[1]));
	}
	return `${prefix}${String(max + 1).padStart(pad, "0")}`;
}
function todayIso(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function familyCode(existing) {
	return nextSerial("FAM-26-", existing.map((f) => f.familyCode));
}
function studentCodes(existing) {
	return {
		studentId: nextSerial("SWC-26-", existing.map((s) => s.studentId)),
		admissionNo: nextSerial("ADM-26-", existing.map((s) => s.admissionNo))
	};
}
function receiptNo(existing) {
	return nextSerial("RCP-26-", existing.map((p) => p.receiptNo));
}
function tcNo(existing) {
	return nextSerial("TC-26-", existing.map((c) => c.tcNo));
}
function makeMonthlyInvoices(familyId, studentId, year, months) {
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
			heads: [{
				name: "Monthly family fee",
				amount: month.amount
			}]
		};
	});
}
var useSchoolStore = create()(persist((set, get) => ({
	...seedData,
	addFamily: (input) => {
		const row = {
			...input,
			id: uid("fam"),
			familyCode: familyCode(get().families),
			createdAt: todayIso()
		};
		set({ families: [...get().families, row] });
		return row;
	},
	updateFamily: (id, patch) => {
		set({ families: get().families.map((f) => f.id === id ? {
			...f,
			...patch,
			id: f.id
		} : f) });
	},
	addStudent: (input) => {
		const codes = studentCodes(get().students);
		const tone = AVATAR_TONES[get().students.length % AVATAR_TONES.length] ?? AVATAR_TONES[0];
		const row = {
			...input,
			id: uid("stu"),
			studentId: codes.studentId,
			admissionNo: codes.admissionNo,
			tone,
			photo: input.photo ?? "",
			status: input.status ?? "Active",
			createdAt: todayIso()
		};
		set({ students: [...get().students, row] });
		return row;
	},
	updateStudent: (id, patch) => {
		set({ students: get().students.map((s) => s.id === id ? {
			...s,
			...patch,
			id: s.id
		} : s) });
	},
	addResult: (input) => {
		const existing = get().results.find((r) => r.studentId === input.studentId && r.academicYear === input.academicYear && r.examName === input.examName);
		if (existing) {
			const row = {
				...existing,
				...input,
				id: existing.id
			};
			set({ results: get().results.map((r) => r.id === existing.id ? row : r) });
			return row;
		}
		const row = {
			...input,
			id: uid("res")
		};
		set({ results: [...get().results, row] });
		return row;
	},
	updateResult: (id, patch) => {
		set({ results: get().results.map((r) => r.id === id ? {
			...r,
			...patch,
			id: r.id
		} : r) });
	},
	recordPayment: ({ invoiceId, amount, mode, paidAt, note }) => {
		const invoice = get().invoices.find((inv) => inv.id === invoiceId);
		if (!invoice) return null;
		const row = {
			id: uid("pay"),
			invoiceId,
			studentId: invoice.studentId,
			familyId: invoice.familyId,
			amount,
			mode,
			receiptNo: receiptNo(get().payments),
			paidAt,
			note
		};
		set({ payments: [...get().payments, row] });
		return row;
	},
	issueTc: ({ studentId, reason, lastAttendanceDate, character, remarks, issueDate }) => {
		const student = get().students.find((s) => s.id === studentId);
		if (!student) return null;
		const existing = get().certificates.find((c) => c.studentId === studentId && c.status === "Issued");
		if (existing) return existing;
		const row = {
			id: uid("tc"),
			studentId,
			tcNo: tcNo(get().certificates),
			issueDate,
			reason,
			lastClass: `${student.className}–${student.section}`,
			lastAttendanceDate,
			character,
			remarks,
			status: "Issued"
		};
		set({
			certificates: [...get().certificates, row],
			students: get().students.map((s) => s.id === studentId ? {
				...s,
				status: "Transferred"
			} : s)
		});
		return row;
	},
	restoreSample: () => {
		const sessionId = get().sessionId;
		const keep = seedData.accounts.some((a) => a.id === sessionId) ? sessionId : null;
		set({
			...seedData,
			sessionId: keep
		});
	},
	login: async (username, password) => {
		const key = username.trim().toLowerCase();
		const account = get().accounts.find((a) => a.active && a.username.toLowerCase() === key);
		if (!account) return false;
		if (await hashPassword(account.username, password) !== account.passwordHash) return false;
		set({ sessionId: account.id });
		return true;
	},
	logout: () => set({ sessionId: null }),
	addAccount: async (input) => {
		const username = input.username.trim();
		if (!username || !input.password || !input.displayName.trim()) return "Name, username and password are required.";
		if (input.role === "Manager") return "Only one Manager account is issued.";
		if (get().accounts.some((a) => a.username.toLowerCase() === username.toLowerCase())) return "That username is already assigned.";
		if (input.role === "Parent" && !input.familyId) return "Choose the family for this parent login.";
		if (input.role === "Student" && !input.studentId) return "Choose the student for this login.";
		if (input.role === "Teacher" && input.classNames.length === 0) return "Assign at least one class to the teacher.";
		const row = {
			id: uid("acct"),
			username,
			passwordHash: await hashPassword(username, input.password),
			displayName: input.displayName.trim(),
			role: input.role,
			familyId: input.role === "Parent" ? input.familyId : input.role === "Student" ? get().students.find((s) => s.id === input.studentId)?.familyId ?? "" : "",
			studentId: input.role === "Student" ? input.studentId : "",
			classNames: input.role === "Teacher" ? input.classNames : [],
			active: true,
			createdAt: todayIso()
		};
		set({ accounts: [...get().accounts, row] });
		return row;
	},
	setAccountPassword: async (id, password) => {
		if (!password) return "Enter a new password.";
		const account = get().accounts.find((a) => a.id === id);
		if (!account) return "Account not found.";
		const passwordHash = await hashPassword(account.username, password);
		set({ accounts: get().accounts.map((a) => a.id === id ? {
			...a,
			passwordHash
		} : a) });
		return null;
	},
	setAccountActive: (id, active) => {
		const account = get().accounts.find((a) => a.id === id);
		if (!account || account.role === "Manager") return;
		set({
			accounts: get().accounts.map((a) => a.id === id ? {
				...a,
				active
			} : a),
			sessionId: !active && get().sessionId === id ? null : get().sessionId
		});
	},
	addNotice: (input) => {
		const session = get().accounts.find((a) => a.id === get().sessionId);
		if (!session) return "Sign in to send a notice.";
		if (session.role !== "Manager" && session.role !== "Principal" && session.role !== "Teacher") return "Only the office and teachers may send notices.";
		if (!input.title.trim() || !input.body.trim()) return "Title and message are required.";
		if (input.audience === "class" && input.classNames.length === 0) return "Choose at least one class.";
		if (input.audience === "family" && input.familyIds.length === 0) return "Choose at least one family.";
		if (input.audience === "student" && input.studentIds.length === 0) return "Choose at least one student.";
		if (session.role === "Teacher") {
			const allowed = new Set(session.classNames);
			if (input.audience === "school") return "Teachers send class, family or student notices — not the whole school.";
			if (input.audience === "class" && input.classNames.some((c) => !allowed.has(c))) return "You may only write to your assigned classes.";
			const mine = get().students.filter((s) => allowed.has(s.className));
			if (input.audience === "family" && input.familyIds.some((id) => !mine.some((s) => s.familyId === id))) return "That family is outside your classes.";
			if (input.audience === "student" && input.studentIds.some((id) => !mine.some((s) => s.id === id))) return "That student is outside your classes.";
		}
		const row = {
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
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			pin: input.pin && (session.role === "Manager" || session.role === "Principal")
		};
		set({ notices: [row, ...get().notices] });
		return row;
	},
	markNoticeRead: (noticeId, accountId) => {
		if (get().noticeReads.some((r) => r.noticeId === noticeId && r.accountId === accountId)) return;
		set({ noticeReads: [...get().noticeReads, {
			noticeId,
			accountId,
			readAt: (/* @__PURE__ */ new Date()).toISOString()
		}] });
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
			sessionId: keep
		});
		return null;
	},
	markFileExported: (at) => set({ lastFileExportAt: at }),
	setWorkingYear: (year) => set({ workingYear: year }),
	setExams: (rows) => {
		const cleaned = rows.map((row) => ({
			id: row.id || uid("ex"),
			name: row.name.trim(),
			maxMarks: Math.round(Number(row.maxMarks))
		})).filter((row) => row.name);
		if (cleaned.length === 0) return "Keep at least one examination.";
		const names = cleaned.map((row) => row.name.toLowerCase());
		if (new Set(names).size !== names.length) return "Each examination needs a different name.";
		if (cleaned.some((row) => !Number.isFinite(row.maxMarks) || row.maxMarks < 1 || row.maxMarks > 200)) return "Maximum marks must be between 1 and 200.";
		set({ exams: cleaned });
		return null;
	},
	copyYearFees: (fromYear, toYear) => {
		if (fromYear === toYear) return "Choose a different year to copy into.";
		const source = get().feeConsents.filter((c) => c.academicYear === fromYear);
		if (source.length === 0) return `No family fees on file for ${fromYear}.`;
		const have = new Set(get().feeConsents.filter((c) => c.academicYear === toYear).map((c) => c.familyId));
		const calendar = monthsForYear(toYear);
		const added = [];
		const extraInvoices = [];
		for (const row of source) {
			if (have.has(row.familyId)) continue;
			const months = calendar.map((month, i) => ({
				monthId: month.id,
				label: month.label,
				amount: row.months[i]?.amount ?? row.monthlyAmount
			}));
			added.push({
				...row,
				id: uid("fee"),
				academicYear: toYear,
				months,
				consentDate: todayIso(),
				note: row.note ? `${row.note} · copied from ${fromYear}` : `Copied from ${fromYear} — amend with parent consent.`
			});
			const child = get().students.find((s) => s.familyId === row.familyId && s.status === "Active");
			extraInvoices.push(...makeMonthlyInvoices(row.familyId, child?.id ?? "", toYear, months));
		}
		if (added.length === 0) return `Every family already has ${toYear} on file.`;
		set({
			feeConsents: [...get().feeConsents, ...added],
			invoices: [...get().invoices, ...extraInvoices]
		});
		return added.length;
	},
	saveFeeConsent: (input) => {
		if (!input.familyId) return "Choose a family.";
		if (!input.consentedBy.trim()) return "Parent consent name is required.";
		if (input.monthlyAmount < 0 || input.months.some((m) => m.amount < 0)) return "Fee amounts cannot be negative.";
		const existing = get().feeConsents.find((c) => c.familyId === input.familyId && c.academicYear === input.academicYear);
		const row = {
			id: existing?.id ?? uid("fee"),
			familyId: input.familyId,
			academicYear: input.academicYear,
			monthlyAmount: input.monthlyAmount,
			months: input.months,
			consentDate: input.consentDate,
			consentedBy: input.consentedBy.trim(),
			note: input.note.trim()
		};
		const child = get().students.find((s) => s.familyId === input.familyId && s.status === "Active");
		const generated = makeMonthlyInvoices(input.familyId, child?.id ?? "", input.academicYear, input.months);
		const kept = get().invoices.filter((inv) => !(inv.familyId === input.familyId && inv.academicYear === input.academicYear));
		set({
			feeConsents: existing ? get().feeConsents.map((c) => c.id === existing.id ? row : c) : [...get().feeConsents, row],
			invoices: [...kept, ...generated]
		});
		return row;
	}
}), {
	name: "swami-inter-college-register",
	version: 6,
	skipHydration: true,
	storage: createJSONStorage(() => {
		if (typeof window === "undefined") {
			const memory = /* @__PURE__ */ new Map();
			return {
				getItem: (key) => memory.get(key) ?? null,
				setItem: (key, value) => {
					memory.set(key, value);
				},
				removeItem: (key) => {
					memory.delete(key);
				}
			};
		}
		return {
			getItem: (key) => {
				const value = window.localStorage.getItem(key);
				noteBrowserCopy(value);
				return value;
			},
			setItem: (key, value) => window.localStorage.setItem(key, value),
			removeItem: (key) => window.localStorage.removeItem(key)
		};
	}),
	migrate: (persisted, fromVersion) => {
		let next = persisted;
		if (fromVersion < 2) {
			const photos = Object.fromEntries(seedData.students.map((s) => [s.id, s.photo]));
			next = {
				...next,
				students: next.students.map((s) => ({
					...s,
					photo: s.photo || photos[s.id] || ""
				}))
			};
		}
		if (fromVersion < 3) next = {
			...next,
			accounts: next.accounts?.length ? next.accounts : seedData.accounts,
			sessionId: next.sessionId ?? null
		};
		if (fromVersion < 4) next = {
			...next,
			notices: next.notices?.length ? next.notices : seedData.notices,
			noticeReads: next.noticeReads ?? [],
			lastFileExportAt: next.lastFileExportAt ?? ""
		};
		if (fromVersion < 5) next = {
			...next,
			feeConsents: next.feeConsents?.length ? next.feeConsents : seedData.feeConsents,
			workingYear: next.workingYear || SCHOOL.academicYear,
			invoices: next.invoices?.some((inv) => inv.termId.startsWith("20")) ? next.invoices : seedData.invoices,
			payments: next.invoices?.some((inv) => inv.termId.startsWith("20")) ? next.payments : seedData.payments
		};
		if (fromVersion < 6) next = {
			...next,
			exams: next.exams?.length ? next.exams : DEFAULT_EXAMS.map((exam) => ({ ...exam }))
		};
		return next;
	}
}));
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[background-color,color,box-shadow,opacity,transform] duration-150 ease-[var(--ease-smooth-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-card hover:bg-accent",
			secondary: "bg-canvas-warm text-ink shadow-card hover:bg-line/70",
			outline: "bg-raised text-ink shadow-card hover:shadow-card-hover",
			ghost: "text-ink-soft hover:bg-canvas-warm hover:text-ink",
			danger: "bg-danger text-primary-fg hover:opacity-90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4 text-sm",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5 text-base",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-B1pzoAyY.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
function AppNotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-canvas text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "Page not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-md text-sm text-muted",
			children: "That record or desk is not in the register."
		})]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var ASSIGNABLE_ROLES = [
	"Principal",
	"Teacher",
	"Parent",
	"Student"
];
function useSession() {
	const sessionId = useSchoolStore((s) => s.sessionId);
	return useSchoolStore((s) => s.accounts).find((row) => row.id === sessionId && row.active) ?? null;
}
function can(account, cap) {
	if (!account) return false;
	const { role } = account;
	switch (cap) {
		case "users":
		case "restore": return role === "Manager";
		case "admit":
		case "pay":
		case "tc": return role === "Manager" || role === "Principal";
		case "result": return role === "Manager" || role === "Principal" || role === "Teacher";
		case "exams": return role === "Principal";
		case "photo": return role === "Manager" || role === "Principal" || role === "Teacher" || role === "Parent";
		case "notice": return role === "Manager" || role === "Principal" || role === "Teacher";
		case "file": return role === "Manager" || role === "Principal";
		default: return false;
	}
}
function canVisit(account, pathname) {
	if (pathname === "/" || pathname === "/login") return true;
	const root = `/${pathname.split("/").filter(Boolean)[0] ?? ""}`;
	if (root === "/users") return can(account, "users");
	if (root === "/admissions") return can(account, "admit");
	if (root === "/fees") return account.role !== "Teacher";
	if (root === "/notices") return true;
	if (root === "/tc") return account.role === "Manager" || account.role === "Principal" || account.role === "Student";
	if (root === "/families") return account.role === "Manager" || account.role === "Principal" || account.role === "Parent" || account.role === "Teacher";
	return true;
}
function navItemsFor(role) {
	switch (role) {
		case "Manager": return [
			"/",
			"/students",
			"/families",
			"/admissions",
			"/results",
			"/fees",
			"/id-cards",
			"/tc",
			"/notices",
			"/users"
		];
		case "Principal": return [
			"/",
			"/students",
			"/families",
			"/admissions",
			"/results",
			"/fees",
			"/id-cards",
			"/tc",
			"/notices"
		];
		case "Teacher": return [
			"/",
			"/students",
			"/results",
			"/id-cards",
			"/notices"
		];
		case "Parent": return [
			"/",
			"/students",
			"/families",
			"/results",
			"/fees",
			"/id-cards",
			"/notices"
		];
		case "Student": return [
			"/",
			"/students",
			"/results",
			"/fees",
			"/id-cards",
			"/tc",
			"/notices"
		];
		default: return ["/"];
	}
}
function scopeStudents(account, students) {
	if (!account) return [];
	if (account.role === "Manager" || account.role === "Principal") return students;
	if (account.role === "Teacher") return students.filter((s) => account.classNames.includes(s.className));
	if (account.role === "Parent") return students.filter((s) => s.familyId === account.familyId);
	return students.filter((s) => s.id === account.studentId);
}
function scopeFamilies(account, families, students) {
	if (!account) return [];
	if (account.role === "Manager" || account.role === "Principal") return families;
	if (account.role === "Parent") return families.filter((f) => f.id === account.familyId);
	const visible = new Set(scopeStudents(account, students).map((s) => s.familyId));
	return families.filter((f) => visible.has(f.id));
}
function canEditPhoto(account, student) {
	if (!can(account, "photo") || !account) return false;
	if (account.role === "Manager" || account.role === "Principal") return true;
	if (account.role === "Teacher") return account.classNames.includes(student.className);
	if (account.role === "Parent") return student.familyId === account.familyId;
	return false;
}
function deskCopy(role) {
	switch (role) {
		case "Manager": return {
			title: "Manager’s desk",
			description: "Full register — admissions, fees, results, identity, notices and logins."
		};
		case "Principal": return {
			title: "Principal’s desk",
			description: "School-wide pupils, families, fees and certificates. You set examination names and maximum marks."
		};
		case "Teacher": return {
			title: "Class desk",
			description: "Your assigned classes — pupil files, results and identity cards."
		};
		case "Parent": return {
			title: "Family desk",
			description: "Your children’s admission, results, fees and identity — this household only."
		};
		case "Student": return {
			title: "My record",
			description: "Your admission file, results, fees, identity card and transfer certificate."
		};
	}
}
function useAccess() {
	const session = useSession();
	const students = useSchoolStore((s) => s.students);
	const families = useSchoolStore((s) => s.families);
	const visibleStudents = (0, import_react.useMemo)(() => scopeStudents(session, students), [session, students]);
	return {
		session,
		students: visibleStudents,
		families: (0, import_react.useMemo)(() => scopeFamilies(session, families, students), [
			session,
			families,
			students
		]),
		studentIds: (0, import_react.useMemo)(() => new Set(visibleStudents.map((s) => s.id)), [visibleStudents]),
		can: (cap) => can(session, cap)
	};
}
function fullName(student) {
	return `${student.firstName} ${student.lastName}`.trim();
}
function classLabel(student) {
	return `${student.className}–${student.section}`;
}
function familyLabel(family) {
	if (!family) return "Unlinked";
	return family.guardianName || family.fatherName || family.motherName || family.familyCode;
}
function invoiceTotal(invoice) {
	return invoice.heads.reduce((sum, head) => sum + head.amount, 0);
}
function paymentsForInvoice(invoiceId, payments) {
	return payments.filter((p) => p.invoiceId === invoiceId).reduce((sum, p) => sum + p.amount, 0);
}
function invoiceStatus(invoice, payments, on = /* @__PURE__ */ new Date()) {
	const total = invoiceTotal(invoice);
	const paid = paymentsForInvoice(invoice.id, payments);
	if (paid >= total - .5) return "Paid";
	if (paid > 0) return "Partial";
	const due = new Date(invoice.dueDate);
	if (!Number.isNaN(due.getTime()) && due < on) return "Overdue";
	return "Due";
}
function familyLedger(familyId, invoices, payments) {
	const total = invoices.filter((inv) => inv.familyId === familyId).reduce((sum, inv) => sum + invoiceTotal(inv), 0);
	const paid = payments.filter((p) => p.familyId === familyId).reduce((sum, p) => sum + p.amount, 0);
	return {
		total,
		paid,
		due: Math.max(0, total - paid)
	};
}
function resultTotals(result) {
	const max = result.subjects.reduce((sum, s) => sum + s.maxMarks, 0);
	const got = result.subjects.reduce((sum, s) => sum + s.marks, 0);
	return {
		max,
		got,
		percent: max ? got / max * 100 : 0
	};
}
function gradeFromPercent(percent) {
	if (percent >= 91) return "A1";
	if (percent >= 81) return "A2";
	if (percent >= 71) return "B1";
	if (percent >= 61) return "B2";
	if (percent >= 51) return "C1";
	if (percent >= 41) return "C2";
	if (percent >= 33) return "D";
	return "E";
}
function initials(student) {
	return `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`.toUpperCase();
}
function studentsOfFamily(familyId, students) {
	return students.filter((s) => s.familyId === familyId).sort((a, b) => a.firstName.localeCompare(b.firstName));
}
function latestResult(studentId, results) {
	return results.filter((r) => r.studentId === studentId).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];
}
function consentFor(familyId, year, consents) {
	return consents.find((c) => c.familyId === familyId && c.academicYear === year);
}
function familyMonthlyFees(familyId, invoices, payments, consents, year, on = /* @__PURE__ */ new Date()) {
	const consent = consentFor(familyId, year, consents);
	const today = todayStamp(on);
	return monthsForYear(year).map((month) => {
		const invoice = invoices.find((inv) => inv.familyId === familyId && inv.academicYear === year && inv.termId === month.id);
		const billed = invoice ? invoiceTotal(invoice) : consent?.months.find((m) => m.monthId === month.id)?.amount ?? 0;
		const paid = invoice ? paymentsForInvoice(invoice.id, payments) : payments.filter((p) => p.familyId === familyId && p.paidAt.startsWith(month.id)).reduce((sum, p) => sum + p.amount, 0);
		const due = Math.max(0, billed - paid);
		return {
			monthId: month.id,
			label: month.label,
			billed,
			paid,
			due,
			overdue: due > .5 && month.due < today,
			invoice
		};
	});
}
function todayStamp(on) {
	return `${on.getFullYear()}-${String(on.getMonth() + 1).padStart(2, "0")}-${String(on.getDate()).padStart(2, "0")}`;
}
function noticeVisibleTo(notice, account, students) {
	if (account.role === "Manager" || account.role === "Principal") return true;
	if (notice.fromAccountId === account.id) return true;
	if (notice.audience === "school") return true;
	const mine = scopeNoticeStudents(account, students);
	if (notice.audience === "class") return mine.some((s) => notice.classNames.includes(s.className));
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
function scopeNoticeStudents(account, students) {
	if (account.role === "Teacher") return students.filter((s) => account.classNames.includes(s.className));
	if (account.role === "Parent") return students.filter((s) => s.familyId === account.familyId);
	if (account.role === "Student") return students.filter((s) => s.id === account.studentId);
	return students;
}
function noticeAudienceLabel(notice, families, students) {
	if (notice.audience === "school") return "Whole school";
	if (notice.audience === "class") return `Class ${notice.classNames.join(", ")}`;
	if (notice.audience === "family") return notice.familyIds.map((id) => familyLabel(families.find((f) => f.id === id))).join(", ");
	return notice.studentIds.map((id) => {
		const row = students.find((s) => s.id === id);
		return row ? fullName(row) : "Student";
	}).join(", ");
}
function SchoolCrest({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 48",
		className: cn("shrink-0", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "48",
				height: "48",
				rx: "12",
				fill: "currentColor",
				className: "text-primary-fg/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "24",
				r: "12.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "24",
				r: "2.4",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				stroke: "currentColor",
				strokeWidth: "1.35",
				strokeLinecap: "round",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 12.4v4.6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 31v4.6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.4 24h4.6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M31 24h4.6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.7 15.7l3.3 3.3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M29 29l3.3 3.3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M32.3 15.7l-3.3 3.3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 29l-3.3 3.3" })
				]
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadOfficeRegister = createServerFn({ method: "GET" }).handler(createSsrRpc("631451c2921c39eebf5b08e6e1e50e2029a370812f9ee3f54abd409313dcc3d1"));
var saveOfficeRegister = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("20493688b84a67f29b26aefa5b684cae531aa1de48efb8ab397ab74ddf747750"));
var REGISTER_KIND = "swami-inter-college-register";
function buildRegisterFile(state, savedAt) {
	const { sessionId: _session, ...rest } = state;
	return {
		kind: REGISTER_KIND,
		format: 1,
		school: SCHOOL.name,
		savedAt,
		data: rest
	};
}
function parseRegisterFile(text) {
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		return "That file is not readable JSON.";
	}
	if (!parsed || typeof parsed !== "object") return "The file is empty.";
	const file = parsed;
	if (file.kind !== "swami-inter-college-register") return "This is not a Swami Inter College register file.";
	if (!file.data || !Array.isArray(file.data.families) || !Array.isArray(file.data.students)) return "The file has no families or students.";
	if (!Array.isArray(file.data.accounts)) return "The file is missing logins.";
	return file;
}
function registerFileName(year, savedAt) {
	const day = savedAt.slice(0, 10) || "today";
	return `Swami-Inter-College-Register-${year.replace("–", "-")}-${day}.json`;
}
function downloadRegister(file) {
	const blob = new Blob([JSON.stringify(file, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = registerFileName(file.data.workingYear || SCHOOL.academicYear, file.savedAt);
	a.click();
	URL.revokeObjectURL(url);
}
async function bootOfficeRegister() {
	try {
		const office = await loadOfficeRegister();
		if (!office.payload) return;
		const parsed = parseRegisterFile(office.payload);
		if (typeof parsed === "string") return;
		if (hadBrowserCopy) return;
		useSchoolStore.getState().applyRegister(parsed.data);
	} catch {}
}
async function pushOfficeRegister() {
	const state = useSchoolStore.getState();
	const at = (/* @__PURE__ */ new Date()).toISOString();
	const file = buildRegisterFile(state, at);
	await saveOfficeRegister({ data: {
		payload: JSON.stringify(file),
		updatedAt: at
	} });
	useSchoolStore.getState().markFileExported(at);
}
function startOfficeAutosave() {
	let timer;
	const unsub = useSchoolStore.subscribe(() => {
		window.clearTimeout(timer);
		timer = setTimeout(() => {
			pushOfficeRegister().catch(() => void 0);
		}, 1600);
	});
	return () => {
		window.clearTimeout(timer);
		unsub();
	};
}
function OfficeSync() {
	const allowed = can(useSession(), "file");
	(0, import_react.useEffect)(() => {
		if (!allowed) return;
		return startOfficeAutosave();
	}, [allowed]);
	return null;
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { tone: {
		neutral: "bg-canvas-warm text-ink-soft",
		primary: "bg-primary text-primary-fg",
		ok: "bg-ok-soft text-ok",
		warn: "bg-warn-soft text-warn",
		danger: "bg-danger-soft text-danger",
		info: "bg-info-soft text-info"
	} },
	defaultVariants: { tone: "neutral" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
function StatusBadge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: value === "Active" || value === "Paid" || value === "Issued" ? "ok" : value === "Partial" || value === "Due" || value === "Alumni" || value === "Draft" ? "warn" : value === "Overdue" || value === "Transferred" ? "danger" : "neutral",
		children: value
	});
}
var Sheet = Dialog;
function SheetContent({ className, children, side = "left", title, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-y-0 z-50 flex w-[min(18rem,calc(100%-1.5rem))] flex-col bg-primary text-primary-fg shadow-overlay", side === "left" ? "left-0" : "right-0", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-4 pt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-lg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Close menu",
					className: "text-primary-fg hover:bg-primary-fg/10 hover:text-primary-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})
			})]
		}), children]
	})] });
}
var NAV = [
	{
		to: "/",
		label: "Desk",
		icon: House
	},
	{
		to: "/students",
		label: "Students",
		icon: GraduationCap
	},
	{
		to: "/families",
		label: "Families",
		icon: UsersRound
	},
	{
		to: "/admissions",
		label: "Admissions",
		icon: BookOpen
	},
	{
		to: "/results",
		label: "Results",
		icon: ScrollText
	},
	{
		to: "/fees",
		label: "Fees",
		icon: IndianRupee
	},
	{
		to: "/id-cards",
		label: "ID cards",
		icon: CreditCard
	},
	{
		to: "/tc",
		label: "Transfer cert.",
		icon: Users
	},
	{
		to: "/notices",
		label: "Notices",
		icon: Megaphone
	},
	{
		to: "/users",
		label: "Logins",
		icon: KeyRound
	}
];
function NavLinks({ pathname, onNavigate, inverted, allowed, noticeUnread }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-0.5",
		children: NAV.filter((item) => allowed.includes(item.to)).map((item) => {
			const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-[background-color,color] duration-150", inverted ? active ? "bg-primary-fg/12 text-primary-fg" : "text-primary-fg/70 hover:bg-primary-fg/8 hover:text-primary-fg" : active ? "bg-canvas-warm text-ink" : "text-ink-soft hover:bg-canvas-warm hover:text-ink"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: item.label
					}),
					item.to === "/notices" && noticeUnread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("min-w-5 rounded-full px-1.5 text-center text-[10px] font-semibold", inverted ? "bg-primary-fg/20 text-primary-fg" : "bg-primary text-primary-fg"),
						children: noticeUnread
					}) : null
				]
			}, item.to);
		})
	});
}
function Brand({ inverted }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-3 px-1 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("flex size-10 shrink-0 items-center justify-center rounded-xl", inverted ? "bg-primary-fg/10 text-primary-fg" : "bg-primary text-primary-fg"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchoolCrest, { className: "size-7" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("block font-display text-sm leading-snug", inverted ? "text-primary-fg" : "text-ink"),
				children: SCHOOL.shortName
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("block text-xs leading-snug", inverted ? "text-primary-fg/60" : "text-muted"),
				children: "New Prabhat Nagar"
			})]
		})]
	});
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const session = useSession();
	const logout = useSchoolStore((s) => s.logout);
	const notices = useSchoolStore((s) => s.notices);
	const reads = useSchoolStore((s) => s.noticeReads);
	const students = useSchoolStore((s) => s.students);
	const [open, setOpen] = (0, import_react.useState)(false);
	const noticeUnread = (0, import_react.useMemo)(() => {
		if (!session) return 0;
		return notices.filter((n) => noticeVisibleTo(n, session, students) && !reads.some((r) => r.noticeId === n.id && r.accountId === session.id)).length;
	}, [
		notices,
		reads,
		session,
		students
	]);
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	const allowed = navItemsFor(session.role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "no-print fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-primary px-3 py-4 text-primary-fg lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { inverted: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex-1 overflow-y-auto px-0.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
							pathname,
							inverted: true,
							allowed,
							noticeUnread
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-snug text-primary-fg/80",
								children: session.displayName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs font-medium tracking-wide text-primary-fg uppercase",
								children: ["Signed in as ", session.role]
							}),
							session.role === "Manager" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] leading-snug text-primary-fg/55",
								children: "You issue usernames and passwords for everyone else."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "mt-3 flex h-10 items-center gap-2 text-sm text-primary-fg/70 hover:text-primary-fg",
								onClick: () => logout(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Sign out"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "no-print sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-canvas/90 px-3 py-2.5 backdrop-blur-sm lg:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Open menu",
						onClick: () => setOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "primary",
							children: ["Signed in as ", session.role]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					title: SCHOOL.name,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 px-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "px-3 pb-3 text-sm text-primary-fg/80",
								children: [session.displayName, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 block text-xs font-medium tracking-wide text-primary-fg uppercase",
									children: ["Signed in as ", session.role]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
								pathname,
								inverted: true,
								allowed,
								noticeUnread,
								onNavigate: () => setOpen(false)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "mt-4 flex h-11 items-center gap-3 px-3 text-sm text-primary-fg/70",
								onClick: () => {
									setOpen(false);
									logout();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Sign out"]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "no-print border-b border-line bg-canvas-warm/80 px-4 py-2 md:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 text-sm text-ink-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "primary",
								children: ["Signed in as ", session.role]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: session.displayName }),
							session.role === "Manager" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "· Logins are issued only from this desk."
							}) : session.role === "Principal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "· You may amend examinations and their maximum marks."
							}) : null
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-6xl px-4 py-6 pb-24 md:px-8 md:py-8",
					children
				})]
			})
		]
	});
}
function HydrateGate({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const start = async () => {
			const api = useSchoolStore.persist;
			if (api && !api.hasHydrated()) await Promise.resolve(api.rehydrate());
			await Promise.race([bootOfficeRegister(), new Promise((resolve) => {
				window.setTimeout(resolve, 2500);
			})]);
			if (!cancelled) setReady(true);
		};
		start();
		return () => {
			cancelled = true;
		};
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-canvas px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchoolCrest, { className: "size-9" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-display text-2xl text-ink",
				children: SCHOOL.shortName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Opening the register…"
			})
		]
	});
	return children;
}
function SessionGate({ children }) {
	const session = useSession();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (!session && pathname !== "/login") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (session && pathname === "/login") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (session && pathname !== "/login" && !canVisit(session, pathname)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return children;
}
var styles_default = "/assets/styles-BZ3G_zVl.css";
var APP_NAME = "Swami Inter College Register";
var Route$14 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#1F4A3E"
			},
			{
				name: "description",
				content: "Registrar desk for Dr. M. P. Swami Mem. G. Inter College, New Prabhat Nagar, Meerut — admissions, student IDs, results, fees and transfer certificates, student-wise and family-wise."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-right",
				toastOptions: { classNames: { toast: "bg-raised text-ink shadow-overlay border-0 font-sans" } }
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$13 = () => import("./routes-Bi-LA3WX.mjs");
var Route$13 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./admissions-nPEg1Psh.mjs");
var Route$12 = createFileRoute("/admissions")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./families-Ch_d6wTb.mjs");
var Route$11 = createFileRoute("/families")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./fees-YtzrCo0U.mjs");
var Route$10 = createFileRoute("/fees")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./id-cards-DYFzA1qF.mjs");
var Route$9 = createFileRoute("/id-cards")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./login-CfkjKnQm.mjs");
var Route$8 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./notices-Dh1OURiP.mjs");
var Route$7 = createFileRoute("/notices")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./results-C9tM4bDB.mjs");
var Route$6 = createFileRoute("/results")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./students-B0NKF-4X.mjs");
var Route$5 = createFileRoute("/students")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./tc-BXbOABvd.mjs");
var Route$4 = createFileRoute("/tc")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./users-CbN-yCAn.mjs");
var Route$3 = createFileRoute("/users")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admissions_.new-CRIN2nfA.mjs");
var Route$2 = createFileRoute("/admissions_/new")({
	validateSearch: (search) => ({ familyId: typeof search.familyId === "string" ? search.familyId : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./families_._id-CNet5JbF.mjs");
var Route$1 = createFileRoute("/families_/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./students_._id-DhDQlGAv.mjs");
var Route = createFileRoute("/students_/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$13.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$14
	}),
	AdmissionsRoute: Route$12.update({
		id: "/admissions",
		path: "/admissions",
		getParentRoute: () => Route$14
	}),
	FamiliesRoute: Route$11.update({
		id: "/families",
		path: "/families",
		getParentRoute: () => Route$14
	}),
	FeesRoute: Route$10.update({
		id: "/fees",
		path: "/fees",
		getParentRoute: () => Route$14
	}),
	IdCardsRoute: Route$9.update({
		id: "/id-cards",
		path: "/id-cards",
		getParentRoute: () => Route$14
	}),
	LoginRoute: Route$8.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$14
	}),
	NoticesRoute: Route$7.update({
		id: "/notices",
		path: "/notices",
		getParentRoute: () => Route$14
	}),
	ResultsRoute: Route$6.update({
		id: "/results",
		path: "/results",
		getParentRoute: () => Route$14
	}),
	StudentsRoute: Route$5.update({
		id: "/students",
		path: "/students",
		getParentRoute: () => Route$14
	}),
	TcRoute: Route$4.update({
		id: "/tc",
		path: "/tc",
		getParentRoute: () => Route$14
	}),
	UsersRoute: Route$3.update({
		id: "/users",
		path: "/users",
		getParentRoute: () => Route$14
	}),
	AdmissionsNewRoute: Route$2.update({
		id: "/admissions_/new",
		path: "/admissions/new",
		getParentRoute: () => Route$14
	}),
	FamiliesIdRoute: Route$1.update({
		id: "/families_/$id",
		path: "/families/$id",
		getParentRoute: () => Route$14
	}),
	StudentsIdRoute: Route.update({
		id: "/students_/$id",
		path: "/students/$id",
		getParentRoute: () => Route$14
	})
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: AppNotFoundComponent
	});
}
//#endregion
export { suggestedMonthlyFee as $, canEditPhoto as A, NOTICE_AUDIENCES as B, noticeAudienceLabel as C, studentsOfFamily as D, resultTotals as E, BLOOD_GROUPS as F, ageFromDob as G, SCHOOL as H, Button as I, formatDateLong as J, cn as K, CATEGORIES as L, useAccess as M, useSession as N, ASSIGNABLE_ROLES as O, ACADEMIC_YEARS as P, subjectsForClass as Q, CLASSES as R, latestResult as S, paymentsForInvoice as T, SECTIONS as U, PAYMENT_MODES as V, TC_REASONS as W, monthsForYear as X, formatINR as Y, readStudentPhoto as Z, fullName as _, Badge as a, invoiceStatus as b, buildRegisterFile as c, SchoolCrest as d, todayIso as et, classLabel as f, familyMonthlyFees as g, familyLedger as h, Route$2 as i, deskCopy as j, can as k, downloadRegister as l, familyLabel as m, Route as n, useSchoolStore as nt, StatusBadge as o, consentFor as p, formatDate as q, Route$1 as r, pushOfficeRegister as s, router_exports as t, uid as tt, parseRegisterFile as u, gradeFromPercent as v, noticeVisibleTo as w, invoiceTotal as x, initials as y, GENDERS as z };
