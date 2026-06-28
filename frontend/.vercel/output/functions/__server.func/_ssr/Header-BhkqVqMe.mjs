import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
import { u as useAuth } from "./useAuth-CCZE-M2R.mjs";
const logoImg = "/assets/logo-CCJ6xDzm.png";
function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate({ to: "/auth/login" });
  };
  reactExports.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const links = [
    { to: "/", hash: "services", label: "Services" },
    { to: "/", hash: "timeline", label: "Timeline" },
    { to: "/success-stories", hash: void 0, label: "Success Stories" },
    { to: "/subscriptions", hash: void 0, label: "Pricing" },
    { to: "/contact", hash: void 0, label: "Contact" },
    ...user?.role === "STUDENT" ? [{ to: "/dashboard/", hash: void 0, label: "Dashboard" }] : [],
    ...user?.role === "ADMIN" ? [{ to: "/admin", hash: void 0, label: "Admin Panel" }] : []
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `sticky top-0 z-50 transition-all duration-300 w-full ${scrolled ? "py-3 bg-surface/90 backdrop-blur-md" : "py-5 bg-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1200px] items-center justify-between px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoImg, alt: "SAT Sharks", className: "h-12 md:h-16 w-auto relative -top-1 md:-top-1.5 mix-blend-multiply" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 lg:flex", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: l.to,
              hash: l.hash,
              className: "relative py-1 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant hover:text-primary transition-colors duration-300 group",
              children: [
                l.label,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" })
              ]
            },
            l.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex items-center gap-5", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-on-surface", children: [
              "Hi, ",
              user.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleLogout,
                className: "text-[13px] font-bold uppercase tracking-[0.08em] text-on-surface-variant hover:text-accent transition-colors cursor-pointer",
                children: "Logout"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/auth/login",
                className: "text-[13px] font-bold uppercase tracking-[0.08em] text-on-surface-variant hover:text-primary transition-colors",
                children: "Login"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/auth/register",
                className: "btn-shimmer inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-on-primary shark-shadow hover:bg-accent transition-all duration-300",
                children: [
                  "Register",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "arrow_forward", className: "text-[16px]" })
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setOpen(!open),
              className: "lg:hidden rounded-lg p-2 text-on-surface hover:bg-surface-container-low transition-colors",
              "aria-label": "menu",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: open ? "close" : "menu", className: "text-[28px]" })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden border-t border-outline-variant/40 bg-surface-container-lowest px-6 py-4 space-y-3 shadow-lg", children: [
          links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.to,
              hash: l.hash,
              onClick: () => setOpen(false),
              className: "block font-mono text-[13px] uppercase tracking-[0.08em] text-on-surface-variant hover:text-primary transition-colors",
              children: l.label
            },
            l.label
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 mt-4 border-t border-outline-variant/40 flex flex-col gap-3", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                handleLogout();
                setOpen(false);
              },
              className: "block w-full text-left font-mono text-[13px] uppercase tracking-[0.08em] text-on-surface-variant",
              children: "Logout"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/auth/login",
                onClick: () => setOpen(false),
                className: "block w-full text-center rounded-xl border border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-sm font-semibold text-on-surface",
                children: "Login"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/auth/register",
                onClick: () => setOpen(false),
                className: "block w-full rounded-xl bg-primary px-5 py-2.5 text-center text-sm font-semibold text-on-primary",
                children: "Register"
              }
            )
          ] }) })
        ] })
      ]
    }
  );
}
export {
  Header as H,
  logoImg as l
};
