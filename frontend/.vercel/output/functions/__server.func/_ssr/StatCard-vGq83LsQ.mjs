import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
const colorMap = {
  primary: "text-primary",
  accent: "text-accent",
  secondary: "text-secondary",
  error: "text-error"
};
function StatCard({ label, value, icon, color = "primary" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/40 shark-shadow hover-lift", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-on-surface-variant text-sm mb-1", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-3xl font-bold ${colorMap[color]}`, children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-primary-fixed flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: icon, className: `text-[22px] ${colorMap[color]}` }) })
  ] }) });
}
export {
  StatCard as S
};
