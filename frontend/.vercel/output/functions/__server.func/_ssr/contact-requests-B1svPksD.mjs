import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout } from "./AdminLayout-f1rdBm4s.mjs";
import { B as Badge } from "./Badge-CruYiyAR.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
import { E as EmptyState } from "./EmptyState-CLtSl-5O.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function AdminContactRequests() {
  const {
    user
  } = useAuth();
  const [inquiries, setInquiries] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (user?.role === "ADMIN") {
      api.get("/api/contact").then((res) => {
        if (res.success) setInquiries(res.inquiries || []);
      });
    }
  }, [user]);
  const updateStatus = async (id, status) => {
    const res = await api.put(`/api/contact/${id}/status`, {
      status
    });
    if (res.success) {
      setInquiries((prev) => prev.map((i) => i._id === id ? {
        ...i,
        status
      } : i));
    }
  };
  const statusVariant = (s) => {
    if (s === "NEW") return "error";
    if (s === "IN_PROGRESS") return "warning";
    return "success";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { activeItem: "/admin/contact-requests", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-8", children: "Contact Inquiries" }),
    inquiries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: "mail", title: "No inquiries yet", description: "Contact form submissions will appear here" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: inquiries.map((inquiry) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/40 shark-shadow hover-lift", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-lg", children: [
            inquiry.firstName,
            " ",
            inquiry.lastName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusVariant(inquiry.status || "NEW"), children: inquiry.status || "NEW" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-on-surface-variant flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "mail", className: "text-[14px]" }),
          " ",
          inquiry.email
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: inquiry.category }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-on-surface leading-relaxed", children: inquiry.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-on-surface-variant", children: new Date(inquiry.createdAt).toLocaleDateString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: inquiry.status || "NEW", onChange: (e) => updateStatus(inquiry._id, e.target.value), className: "rounded-lg border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "NEW", children: "New" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "IN_PROGRESS", children: "In Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "RESOLVED", children: "Resolved" })
      ] })
    ] }) }, inquiry._id)) })
  ] });
}
export {
  AdminContactRequests as component
};
