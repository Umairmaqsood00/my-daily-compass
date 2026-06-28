import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header } from "./Header-BhkqVqMe.mjs";
import { F as Footer } from "./Footer-CN17TUqH.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
import { B as Button } from "./Button-DE3Se9nv.mjs";
import { a as api } from "./router-Be_1-VPB.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const planRegionMap = {
  LOCAL: ["LOCAL_FREE", "LOCAL_PAID"],
  INTERNATIONAL: ["INTL_FREE", "INTL_PAID"]
};
const getVisiblePlans = (plans, userType) => {
  const visibleRoles = planRegionMap[userType];
  return plans.filter((plan) => visibleRoles.includes(plan.roleRequired));
};
const getPlanHeading = (userType) => userType === "LOCAL" ? "Available Plans For Local Students" : "Available Plans For International Students";
function Subscriptions() {
  const {
    user,
    isLoading: isAuthLoading
  } = useAuth();
  const [plans, setPlans] = reactExports.useState([]);
  const [isLoadingPlans, setIsLoadingPlans] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!user) {
      setPlans([]);
      return;
    }
    const fetchPlans = async () => {
      setIsLoadingPlans(true);
      setError("");
      try {
        const res = await api.get("/api/subscriptions/plans");
        if (res.success) {
          setPlans(getVisiblePlans(res.plans, user.region));
        } else {
          setError(res.error || "Unable to load plans.");
        }
      } catch (e) {
        console.error("Failed to fetch plans", e);
        setError("Unable to load plans.");
      } finally {
        setIsLoadingPlans(false);
      }
    };
    fetchPlans();
  }, [user]);
  const heading = user ? getPlanHeading(user.region) : "Sign In To View Your Plans";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-on-background animate-fade-up flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1200px] px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] uppercase tracking-[0.08em] text-primary", children: "Pricing & Plans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-display text-4xl font-extrabold tracking-[-0.02em] md:text-5xl text-on-surface", children: heading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-on-surface-variant", children: user ? "Your available plans are filtered to match your student profile." : "Create an account or log in so we can show the plans that match your student type." })
      ] }),
      isAuthLoading || isLoadingPlans ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 text-center font-semibold text-on-surface-variant", children: "Loading plans..." }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 rounded-2xl border border-error/30 bg-error/10 p-6 text-center font-medium text-error", children: error }) : !user ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth/login", className: "btn-shimmer inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-on-primary shark-shadow hover:bg-primary-container transition-colors", children: [
        "Log In",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "arrow_forward", className: "text-[18px]" })
      ] }) }) : plans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6 text-center font-medium text-on-surface-variant", children: "No plans are available for your student profile yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-8 md:grid-cols-2", children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex flex-col rounded-3xl p-8 transition-transform hover:-translate-y-2 ${plan.highlight ? "bg-primary text-on-primary shadow-2xl shadow-primary/20" : "bg-surface-container-lowest text-on-surface border border-outline-variant/40 shark-shadow"}`, children: [
        plan.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-0 right-0 mx-auto w-max rounded-full bg-accent px-4 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-white", children: "Recommended" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `font-headline text-xl font-semibold ${plan.highlight ? "text-on-primary" : "text-on-surface"}`, children: plan.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 text-sm ${plan.highlight ? "text-on-primary/80" : "text-on-surface-variant"}`, children: plan.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-extrabold", children: plan.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm ${plan.highlight ? "text-on-primary/80" : "text-on-surface-variant"}`, children: [
            "/",
            plan.period
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mb-8 flex-1 space-y-4", children: plan.features.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "check_circle", className: `text-[20px] shrink-0 ${plan.highlight ? "text-primary-fixed" : "text-primary"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: plan.highlight ? "text-on-primary/90" : "text-on-surface-variant", children: feature })
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: plan.highlight ? "glass" : "outline", className: "w-full py-3.5", children: plan.price === "$0" ? "Get Started Free" : "Subscribe Now" })
      ] }, plan._id || plan.id || plan.name)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Subscriptions as component
};
