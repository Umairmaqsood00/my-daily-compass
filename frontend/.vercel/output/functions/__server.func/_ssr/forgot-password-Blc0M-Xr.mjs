import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header } from "./Header-BhkqVqMe.mjs";
import { F as Footer } from "./Footer-CN17TUqH.mjs";
import { I as Input } from "./Input-3QnCriAW.mjs";
import { B as Button } from "./Button-DE3Se9nv.mjs";
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
import "./Icon-Fsbc55mr.mjs";
import "./useAuth-CCZE-M2R.mjs";
import "./router-Be_1-VPB.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function ForgotPassword() {
  const [email, setEmail] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background text-on-background animate-fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-2xl bg-surface-container-lowest p-8 shark-shadow border border-outline-variant/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold tracking-[-0.02em]", children: "Reset Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-on-surface-variant", children: "Enter your email to receive a reset link" })
      ] }),
      submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-[32px]", children: "mark_email_read" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-on-surface", children: [
          "If an account exists for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email }),
          ", you will receive password reset instructions."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", className: "block w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", children: "Return to Login" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Email Address", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", children: "Send Reset Link" })
      ] }),
      !submitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-on-surface-variant", children: [
        "Remembered your password?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", className: "font-semibold text-primary hover:underline", children: "Log in" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ForgotPassword as component
};
