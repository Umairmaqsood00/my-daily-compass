import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./useAuth-CCZE-M2R.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./router-Be_1-VPB.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function DashboardLayout() {
  const {
    user,
    isLoading
  } = useAuth();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: "Loading..." });
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/auth/login" });
  if (user.role === "ADMIN") return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/admin" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
export {
  DashboardLayout as component
};
