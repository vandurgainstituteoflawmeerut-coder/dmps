import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as Camera } from "../_libs/lucide-react.mjs";
import { I as Button, K as cn, Z as readStudentPhoto } from "./router-B1pzoAyY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-photo-field-C9KmYoIA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentPhotoField({ value, onChange, name = "student" }) {
	const inputRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => inputRef.current?.click(),
				className: cn("relative flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-canvas-warm text-muted shadow-card", "transition-[box-shadow] duration-150 hover:shadow-card-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"),
				"aria-label": value ? `Change ${name} photograph` : `Upload ${name} photograph`,
				children: value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: "",
					className: "size-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink-soft",
						children: "Photograph"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 max-w-xs text-xs text-faint",
						children: "Passport-style, face clearly visible. JPEG or PNG."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							disabled: busy,
							onClick: () => inputRef.current?.click(),
							children: busy ? "Reading…" : value ? "Replace photo" : "Upload photo"
						}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: () => onChange(""),
							children: "Remove"
						}) : null]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-danger",
						children: error
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/*",
				className: "sr-only",
				onChange: (event) => {
					const file = event.target.files?.[0];
					event.target.value = "";
					if (!file) return;
					setBusy(true);
					setError("");
					readStudentPhoto(file).then((url) => onChange(url)).catch((err) => setError(err instanceof Error ? err.message : "Could not read photo.")).finally(() => setBusy(false));
				}
			})
		]
	});
}
//#endregion
export { StudentPhotoField as t };
