import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as StudentLayout } from "./StudentLayout-BRfqHLM0.mjs";
import { S as StatCard } from "./StatCard-vGq83LsQ.mjs";
import { S as ScoreCircle } from "./ScoreCircle-Dj63AhLr.mjs";
import { B as Badge } from "./Badge-CruYiyAR.mjs";
import { E as EmptyState } from "./EmptyState-CLtSl-5O.mjs";
import { a as api } from "./router-Be_1-VPB.mjs";
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
import "./useAuth-CCZE-M2R.mjs";
import "./Footer-CN17TUqH.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function Analytics() {
  const [stats, setStats] = reactExports.useState(null);
  const [performance, setPerformance] = reactExports.useState([]);
  const [breakdown, setBreakdown] = reactExports.useState([]);
  const [predicted, setPredicted] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const load = async () => {
      const [statsRes, perfRes, catRes, predRes] = await Promise.all([api.get("/api/analytics/dashboard"), api.get("/api/analytics/performance"), api.get("/api/analytics/category-breakdown"), api.get("/api/analytics/predicted-score")]);
      if (statsRes.success) setStats(statsRes.stats);
      if (perfRes.success) setPerformance(perfRes.performance || []);
      if (catRes.success) setBreakdown(catRes.breakdown || []);
      if (predRes.success && predRes.predicted) setPredicted(predRes.predicted);
      setLoading(false);
    };
    load();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(StudentLayout, { activeItem: "/dashboard/analytics", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-on-surface-variant", children: "Loading analytics..." }) });
  }
  if (!stats || stats.totalTests === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(StudentLayout, { activeItem: "/dashboard/analytics", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-8", children: "Performance Analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: "insights", title: "No data yet", description: "Complete at least one diagnostic test to see your analytics" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(StudentLayout, { activeItem: "/dashboard/analytics", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-8", children: "Performance Analytics" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Tests Taken", value: stats.totalTests, icon: "quiz", color: "primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Average Score", value: `${stats.avgScore}%`, icon: "trending_up", color: "secondary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Best Score", value: `${stats.bestScore}%`, icon: "emoji_events", color: "accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Questions Practiced", value: stats.practiceCount, icon: "fitness_center", color: "primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-surface-container-lowest p-8 shark-shadow border border-outline-variant/40 flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-6 self-start", children: "Predicted SAT Score" }),
        predicted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreCircle, { score: predicted.score, label: "Estimated", sublabel: `${predicted.range.low} – ${predicted.range.high}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "info", className: "mt-4", children: [
            predicted.confidence,
            "% Confidence"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-on-surface-variant", children: "Not enough data" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-2xl bg-surface-container-lowest p-8 shark-shadow border border-outline-variant/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-6", children: "Score Trend" }),
        performance.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: performance.map((p, i) => {
          const prev = i > 0 ? performance[i - 1].score : p.score;
          const diff = p.score - prev;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-8 text-xs font-mono text-on-surface-variant text-right", children: [
              "#",
              p.index
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-6 bg-surface-container-high rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full transition-all duration-500 ${p.score >= 70 ? "bg-primary" : p.score >= 50 ? "bg-accent" : "bg-error"}`, style: {
              width: `${p.score}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-12 text-sm font-bold text-right", children: [
              p.score,
              "%"
            ] }),
            i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `w-14 text-xs font-bold text-right ${diff > 0 ? "text-primary" : diff < 0 ? "text-error" : "text-on-surface-variant"}`, children: [
              diff > 0 ? `+${diff}` : diff,
              "%"
            ] })
          ] }, i);
        }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-on-surface-variant", children: "No data" })
      ] })
    ] }),
    breakdown.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-surface-container-lowest p-8 shark-shadow border border-outline-variant/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-6", children: "Category Breakdown" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: breakdown.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: cat.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: cat.percentage >= 70 ? "success" : cat.percentage >= 50 ? "warning" : "error", children: [
            cat.percentage,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-surface-container-high rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${cat.percentage >= 70 ? "bg-primary" : cat.percentage >= 50 ? "bg-accent" : "bg-error"}`, style: {
          width: `${cat.percentage}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-on-surface-variant", children: [
          cat.correct,
          " / ",
          cat.total,
          " correct"
        ] })
      ] }, cat.category)) })
    ] })
  ] });
}
export {
  Analytics as component
};
