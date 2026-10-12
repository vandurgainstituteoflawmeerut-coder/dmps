import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Search } from "../_libs/lucide-react.mjs";
import { K as cn } from "./router-B1pzoAyY.mjs";
import { t as NativeSelect } from "./select-CiyJpljB.mjs";
import { n as Input } from "./input-DDEqQOMG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-toolbar-ChlyyCel.js
var import_jsx_runtime = require_jsx_runtime();
function SearchField({ value, onChange, placeholder, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "pl-9"
		})]
	});
}
function FilterSelect({ value, onChange, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
		value,
		onChange: (e) => onChange(e.target.value),
		className,
		children
	});
}
//#endregion
export { SearchField as n, FilterSelect as t };
