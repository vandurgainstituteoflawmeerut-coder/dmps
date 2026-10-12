import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { P as ACADEMIC_YEARS } from "./router-B1pzoAyY.mjs";
import { t as NativeSelect } from "./select-CiyJpljB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/year-select-DCWTT7li.js
var import_jsx_runtime = require_jsx_runtime();
function YearSelect({ value, onChange }) {
	const years = ACADEMIC_YEARS.includes(value) ? ACADEMIC_YEARS : [value, ...ACADEMIC_YEARS];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
		value,
		onChange: (e) => onChange(e.target.value),
		"aria-label": "Academic year",
		children: years.map((year) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: year,
			children: year
		}, year))
	});
}
//#endregion
export { YearSelect as t };
