import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function Select({ label, options, className = "", ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block font-mono text-[12px] uppercase tracking-[0.08em] text-on-surface-variant", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        className: `w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none ${className}`,
        ...props,
        children: options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
      }
    )
  ] });
}
export {
  Select as S
};
