import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as StudentLayout } from "./StudentLayout-BRfqHLM0.mjs";
import { B as Badge } from "./Badge-CruYiyAR.mjs";
import { E as EmptyState } from "./EmptyState-CLtSl-5O.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
import { a as api } from "./router-Be_1-VPB.mjs";
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
import "./useAuth-CCZE-M2R.mjs";
import "./Footer-CN17TUqH.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function TestHistory() {
  const [attempts, setAttempts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [page, setPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const fetchHistory = async (p) => {
    setLoading(true);
    const res = await api.get(`/api/analytics/history?page=${p}&limit=15`);
    if (res.success) {
      setAttempts(res.attempts || []);
      setTotalPages(res.pagination?.pages || 1);
    }
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetchHistory(page);
  }, [page]);
  const sectionLabel = (s) => {
    if (s === "READING_WRITING") return "R&W";
    if (s === "MATH") return "Math";
    return "Full";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(StudentLayout, { activeItem: "/dashboard/history", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: "Test History" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-on-surface-variant mb-8", children: "Review all your completed diagnostic tests" }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-on-surface-variant", children: "Loading history..." }) : attempts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: "history", title: "No test history yet", description: "Complete a diagnostic test to see your results here", action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/tests", className: "inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary hover:bg-accent transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "quiz", className: "text-[18px]" }),
      " Take a Test"
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-surface-container-lowest border border-outline-variant/40 overflow-hidden shark-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-surface-container-low border-b border-outline-variant/40 text-xs uppercase tracking-wider text-on-surface-variant", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Test" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Section" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Result" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-outline-variant/20", children: attempts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-surface-container-low/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-semibold text-sm", children: a.test?.title || `Test #${a._id.slice(-6).toUpperCase()}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: sectionLabel(a.test?.section || "FULL") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 font-mono font-bold text-sm", children: [
            a.correctCount,
            "/",
            a.totalQuestions
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: a.percentage >= 70 ? "success" : a.percentage >= 50 ? "warning" : "error", children: [
            a.percentage,
            "%"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 text-sm text-on-surface-variant", children: [
            Math.floor(a.timeTaken / 60),
            "m ",
            a.timeTaken % 60,
            "s"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-sm text-on-surface-variant", children: new Date(a.completedAt || a.createdAt).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/dashboard/test-result/${a._id}`, className: "text-primary hover:underline text-sm font-semibold", children: "Review" }) })
        ] }, a._id)) })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPage(Math.max(1, page - 1)), disabled: page === 1, className: "px-4 py-2 rounded-lg border border-outline-variant text-sm disabled:opacity-30 hover:bg-surface-container-low transition-colors", children: "Previous" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-on-surface-variant px-4", children: [
          "Page ",
          page,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPage(Math.min(totalPages, page + 1)), disabled: page === totalPages, className: "px-4 py-2 rounded-lg border border-outline-variant text-sm disabled:opacity-30 hover:bg-surface-container-low transition-colors", children: "Next" })
      ] })
    ] })
  ] });
}
export {
  TestHistory as component
};
