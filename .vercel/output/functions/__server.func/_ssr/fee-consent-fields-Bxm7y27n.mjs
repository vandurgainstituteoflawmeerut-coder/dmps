import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { $ as suggestedMonthlyFee, I as Button, X as monthsForYear } from "./router-B1pzoAyY.mjs";
import { n as Input, t as Field } from "./input-DDEqQOMG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fee-consent-fields-Bxm7y27n.js
var import_jsx_runtime = require_jsx_runtime();
function emptyFeeDraft(year, classNames = []) {
	const amount = suggestedMonthlyFee(classNames);
	return {
		monthlyAmount: amount,
		months: monthsForYear(year).map((m) => ({
			monthId: m.id,
			label: m.label,
			amount
		})),
		consentDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		consentedBy: "",
		note: ""
	};
}
function FeeConsentFields({ year, value, onChange }) {
	const setAmount = (amount) => {
		onChange({
			...value,
			monthlyAmount: amount
		});
	};
	const applyAll = () => {
		onChange({
			...value,
			months: monthsForYear(year).map((m) => ({
				monthId: m.id,
				label: m.label,
				amount: value.monthlyAmount
			}))
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Monthly family fee (₹)",
					hint: "Agreed with the parent for this academic year. Applies to the household, not per child.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						step: 50,
						value: value.monthlyAmount,
						onChange: (e) => setAmount(Number(e.target.value) || 0)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: applyAll,
						children: "Fill all 12 months"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Parent / guardian consent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: value.consentedBy,
						onChange: (e) => onChange({
							...value,
							consentedBy: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Consent date",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: value.consentDate,
						onChange: (e) => onChange({
							...value,
							consentDate: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Note",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: value.note,
						onChange: (e) => onChange({
							...value,
							note: e.target.value
						}),
						placeholder: "Concession, transport, or other terms"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-2 text-sm font-medium text-ink-soft",
			children: ["Fees per month · ", year]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[44rem] text-center text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: value.months.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 pb-2 font-medium text-muted",
					children: m.label
				}, m.monthId)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: value.months.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-0.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						step: 50,
						className: "h-10 px-1 text-center tabular-nums",
						value: m.amount,
						onChange: (e) => {
							const amount = Number(e.target.value) || 0;
							const months = value.months.map((row, idx) => idx === i ? {
								...row,
								amount
							} : row);
							onChange({
								...value,
								months
							});
						}
					})
				}, m.monthId)) }) })]
			})
		})] })]
	});
}
//#endregion
export { emptyFeeDraft as n, FeeConsentFields as t };
