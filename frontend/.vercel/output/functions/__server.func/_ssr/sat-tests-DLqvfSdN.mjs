import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as StudentLayout } from "./StudentLayout-BRfqHLM0.mjs";
import { B as Badge } from "./Badge-CruYiyAR.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
import { E as EmptyState } from "./EmptyState-CLtSl-5O.mjs";
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
import "./Header-BhkqVqMe.mjs";
import "./Footer-CN17TUqH.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function SATTestList() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [tests, setTests] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    api.get("/api/sat").then((res) => {
      if (res.success) setTests(res.tests || []);
      setLoading(false);
    });
  }, []);
  const handleStart = async (testId) => {
    const res = await api.post(`/api/sat/${testId}/start`, {});
    if (res.success) {
      navigate({
        to: `/dashboard/sat-runner/${res.attempt._id}`
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(StudentLayout, { activeItem: "/dashboard/sat-tests", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: "Digital SAT Practice Tests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-on-surface-variant", children: "Full-length SAT mock tests with real exam timing and structure" })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-on-surface-variant", children: "Loading SAT tests..." }) : tests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: "school", title: "No SAT tests available", description: "SAT practice tests will appear here once imported by an administrator" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: tests.map((test) => {
      const locked = test.accessLevel === "PAID" && user?.subscription === "FREE";
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-2xl bg-surface-container-lowest p-8 border border-outline-variant/40 shark-shadow hover-lift ${locked ? "opacity-70" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: test.title }),
            locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "warning", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "lock", className: "text-[12px] mr-1" }),
              "PAID"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "FREE" })
          ] }),
          test.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-on-surface-variant mb-4", children: test.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 text-sm text-on-surface-variant", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "help_center", className: "text-[18px] text-primary" }),
              test.totalQuestions,
              " questions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "timer", className: "text-[18px] text-accent" }),
              "~",
              test.totalMinutes,
              " minutes total"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "view_module", className: "text-[18px] text-secondary" }),
              "4 modules + break"
            ] }),
            (test.attemptCount ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "check_circle", className: "text-[18px] text-primary" }),
              "Completed ",
              test.attemptCount,
              "x"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 md:grid-cols-4 gap-3", children: test.modulesSummary?.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 rounded-lg bg-surface-container-low text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-on-surface", children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-on-surface-variant", children: [
              m.questionCount,
              "q · ",
              m.timeLimitMinutes,
              "min"
            ] })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:items-end shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleStart(test._id), disabled: locked, className: `px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${locked ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed" : "btn-shimmer bg-primary text-on-primary shark-shadow hover:bg-accent cursor-pointer"}`, children: locked ? "Upgrade to Access" : "Start Test" }),
          test.pdfUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: test.pdfUrl, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "picture_as_pdf", className: "text-[16px]" }),
            " View PDF"
          ] })
        ] })
      ] }) }, test._id);
    }) })
  ] });
}
export {
  SATTestList as component
};
