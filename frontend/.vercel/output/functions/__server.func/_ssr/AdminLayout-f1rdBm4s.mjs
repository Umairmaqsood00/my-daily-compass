import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header } from "./Header-BhkqVqMe.mjs";
import { u as useAuth } from "./useAuth-CCZE-M2R.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
const navItems = [
  { to: "/admin", label: "Dashboard", icon: "dashboard" },
  { to: "/admin/users", label: "Users", icon: "group" },
  { to: "/admin/tests", label: "Tests", icon: "quiz" },
  { to: "/admin/questions", label: "Questions", icon: "help_center" },
  { to: "/admin/uploads", label: "Uploads", icon: "upload_file" },
  { to: "/admin/success-stories", label: "Success Stories", icon: "social_leaderboard" },
  { to: "/admin/contact-requests", label: "Contact Requests", icon: "mail" }
];
function AdminLayout({ children, activeItem }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-on-surface-variant font-semibold", children: "Loading..." }) });
  }
  if (!user || user.role !== "ADMIN") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-error font-semibold", children: "Unauthorized. Admins only." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-on-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 flex max-w-[1400px] mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 border-r border-outline-variant/30 p-6 hidden md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-6 text-on-surface-variant uppercase tracking-widest text-xs", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${activeItem === item.to ? "bg-primary/10 text-primary font-semibold" : "hover:bg-surface-container-low text-on-surface-variant"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: item.icon, className: "text-[20px]" }),
              item.label
            ]
          },
          item.to
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-6 lg:p-10", children })
    ] })
  ] });
}
export {
  AdminLayout as A
};
