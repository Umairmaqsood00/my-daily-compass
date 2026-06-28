import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
function EmptyState({ icon, title, description, action }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 border border-dashed border-outline-variant/60 rounded-2xl bg-surface-container-lowest", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: icon, className: "text-5xl text-on-surface-variant/40 mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-on-surface mb-1", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-on-surface-variant mb-6", children: description }),
    action
  ] });
}
export {
  EmptyState as E
};
