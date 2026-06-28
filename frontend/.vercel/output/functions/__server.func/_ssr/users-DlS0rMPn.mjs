import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout } from "./AdminLayout-f1rdBm4s.mjs";
import { B as Badge } from "./Badge-CruYiyAR.mjs";
import { a as api } from "./router-Be_1-VPB.mjs";
import { u as useAuth } from "./useAuth-CCZE-M2R.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./Header-BhkqVqMe.mjs";
import "./Icon-Fsbc55mr.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function AdminUsers() {
  const {
    user
  } = useAuth();
  const [usersList, setUsersList] = reactExports.useState([]);
  const fetchUsers = async () => {
    const res = await api.get("/api/users");
    if (res.success) setUsersList(res.users || []);
  };
  reactExports.useEffect(() => {
    if (user?.role === "ADMIN") fetchUsers();
  }, [user]);
  const updateSubscription = async (id, current) => {
    const nextSub = current === "FREE" ? "PAID" : "FREE";
    const res = await api.put(`/api/users/${id}/subscription`, {
      subscription: nextSub
    });
    if (res.success) {
      setUsersList((prev) => prev.map((u) => u._id === id ? {
        ...u,
        subscription: nextSub
      } : u));
    }
  };
  const updateStatus = async (id, current) => {
    const nextStatus = current === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const res = await api.put(`/api/users/${id}/status`, {
      status: nextStatus
    });
    if (res.success) {
      setUsersList((prev) => prev.map((u) => u._id === id ? {
        ...u,
        status: nextStatus
      } : u));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { activeItem: "/admin/users", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-8", children: "User Management" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-surface-container-lowest border border-outline-variant/40 overflow-hidden shark-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-surface-container-low border-b border-outline-variant/40 text-xs uppercase tracking-wider text-on-surface-variant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Name & Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Country" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Tier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-outline-variant/20", children: usersList.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-surface-container-low/50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
            u.name,
            " ",
            u.role === "ADMIN" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "accent", className: "ml-2", children: "ADMIN" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-on-surface-variant", children: u.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: u.country }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-on-surface-variant", children: u.region })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: u.subscription === "PAID" ? "accent" : "default", children: u.subscription }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: u.status === "ACTIVE" ? "success" : "error", children: u.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: u.role !== "ADMIN" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateSubscription(u._id, u.subscription), className: "px-3 py-1 bg-surface-container-high hover:bg-surface-container-highest rounded text-sm transition-colors cursor-pointer", children: u.subscription === "FREE" ? "Upgrade" : "Downgrade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(u._id, u.status), className: `px-3 py-1 rounded text-sm transition-colors cursor-pointer ${u.status === "ACTIVE" ? "bg-error/10 text-error hover:bg-error/20" : "bg-primary/10 text-primary hover:bg-primary/20"}`, children: u.status === "ACTIVE" ? "Suspend" : "Activate" })
        ] }) })
      ] }, u._id)) })
    ] }) })
  ] });
}
export {
  AdminUsers as component
};
