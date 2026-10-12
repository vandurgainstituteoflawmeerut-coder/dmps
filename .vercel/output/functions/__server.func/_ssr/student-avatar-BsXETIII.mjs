import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { K as cn, y as initials } from "./router-B1pzoAyY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-avatar-BsXETIII.js
var import_jsx_runtime = require_jsx_runtime();
function StudentAvatar({ student, size = "md", shape = "circle" }) {
	const label = `${student.firstName} ${student.lastName}`;
	const box = shape === "portrait" ? size === "lg" ? "h-24 w-20" : size === "sm" ? "h-11 w-9" : "h-14 w-11" : size === "sm" ? "size-9" : size === "lg" ? "size-16" : "size-11";
	const radius = shape === "portrait" ? "rounded-lg" : "rounded-full";
	const type = size === "sm" ? "text-xs" : size === "lg" ? "text-xl" : "text-sm";
	if (student.photo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: student.photo,
		alt: label,
		className: cn("inline-block shrink-0 object-cover", box, radius)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex shrink-0 items-center justify-center font-medium text-primary-fg", box, radius, type),
		style: { backgroundColor: student.tone },
		"aria-hidden": true,
		children: initials(student)
	});
}
//#endregion
export { StudentAvatar as t };
