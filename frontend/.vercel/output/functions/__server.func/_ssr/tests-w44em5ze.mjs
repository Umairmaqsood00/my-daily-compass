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
function TestList() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [tests, setTests] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("ALL");
  reactExports.useEffect(() => {
    api.get("/api/tests").then((res) => {
      if (res.success) setTests(res.tests || []);
      setLoading(false);
    });
  }, []);
  const filteredTests = filter === "ALL" ? tests : tests.filter((t) => t.section === filter);
  const handleStart = async (testId, accessLevel) => {
    if (accessLevel === "PAID" && user?.subscription === "FREE") return;
    const res = await api.post(`/api/tests/${testId}/start`, {});
    if (res.success) {
      navigate({
        to: `/dashboard/take-test/${res.attempt._id}`,
        search: {
          testId
        }
      });
    }
  };
  const sectionLabel = (s) => {
    if (s === "READING_WRITING") return "Reading & Writing";
    if (s === "MATH") return "Math";
    return "Full Test";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(StudentLayout, { activeItem: "/dashboard/tests", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: "Diagnostic Tests" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-on-surface-variant mb-8", children: "Challenge yourself with timed diagnostic tests" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-8 flex-wrap", children: ["ALL", "READING_WRITING", "MATH", "FULL"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(s), className: `px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${filter === s ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"}`, children: s === "ALL" ? "All" : sectionLabel(s) }, s)) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-on-surface-variant", children: "Loading tests..." }) : filteredTests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: "quiz", title: "No tests available", description: "Check back later for new diagnostic tests" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredTests.map((test) => {
      const locked = test.accessLevel === "PAID" && user?.subscription === "FREE";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/40 shark-shadow flex flex-col hover-lift ${locked ? "opacity-70" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: test.section === "MATH" ? "info" : test.section === "READING_WRITING" ? "accent" : "success", children: sectionLabel(test.section) }),
          locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "warning", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "lock", className: "text-[12px] mr-1" }),
            " PAID"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "FREE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-2", children: test.title }),
        test.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-on-surface-variant mb-4 line-clamp-2", children: test.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-on-surface-variant mb-6 mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "help_center", className: "text-[16px]" }),
            test.questionCount ?? test.totalMarks,
            " questions"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "timer", className: "text-[16px]" }),
            test.timeLimit,
            " min"
          ] }),
          (test.attemptCount ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "check_circle", className: "text-[16px] text-primary" }),
            "Taken ",
            test.attemptCount,
            "x"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleStart(test._id, test.accessLevel), disabled: locked, className: `w-full py-3 rounded-xl text-sm font-semibold transition-all ${locked ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed" : "btn-shimmer bg-primary text-on-primary shark-shadow hover:bg-accent cursor-pointer"}`, children: locked ? "Upgrade to Access" : "Start Test" })
      ] }, test._id);
    }) })
  ] });
}
export {
  TestList as component
};
