import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { A as AdminLayout } from "./AdminLayout-f1rdBm4s.mjs";
import { B as Badge } from "./Badge-CruYiyAR.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
import { S as Select } from "./Select-DQBG2uP0.mjs";
import { T as Textarea } from "./Textarea-BWaDv9iL.mjs";
import { e as Route, a as api } from "./router-Be_1-VPB.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function ReviewUpload() {
  const {
    uploadId
  } = Route.useParams();
  const navigate = useNavigate();
  const [upload, setUpload] = reactExports.useState(null);
  const [questions, setQuestions] = reactExports.useState([]);
  const [reviewNotes, setReviewNotes] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [publishing, setPublishing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    api.get(`/api/uploads/${uploadId}`).then((res) => {
      if (res.success && res.upload) {
        setUpload(res.upload);
        setQuestions(res.upload.extractedQuestions || []);
        setReviewNotes(res.upload.reviewNotes || "");
      }
      setLoading(false);
    });
  }, [uploadId]);
  const updateQuestion = (idx, field, value) => {
    setQuestions((prev) => prev.map((q, i) => i === idx ? {
      ...q,
      [field]: value
    } : q));
  };
  const toggleApproval = (idx) => {
    setQuestions((prev) => prev.map((q, i) => i === idx ? {
      ...q,
      approved: !q.approved
    } : q));
  };
  const handleSaveReview = async () => {
    setSaving(true);
    await api.put(`/api/uploads/${uploadId}/review`, {
      extractedQuestions: questions,
      reviewNotes
    });
    setSaving(false);
  };
  const handlePublish = async () => {
    const approvedCount2 = questions.filter((q) => q.approved).length;
    if (approvedCount2 === 0) {
      alert("No questions approved for publishing.");
      return;
    }
    if (!confirm(`Publish ${approvedCount2} approved questions to the question bank?`)) return;
    setPublishing(true);
    await handleSaveReview();
    const res = await api.post(`/api/uploads/${uploadId}/publish`, {});
    if (res.success) {
      navigate({
        to: "/admin/uploads"
      });
    }
    setPublishing(false);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { activeItem: "/admin/uploads", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-on-surface-variant", children: "Loading..." }) });
  }
  if (!upload) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { activeItem: "/admin/uploads", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-error", children: "Upload not found" }) });
  }
  const approvedCount = questions.filter((q) => q.approved).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { activeItem: "/admin/uploads", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Review Extracted Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-on-surface-variant text-sm mt-1", children: [
          upload.title,
          " — ",
          upload.fileName
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: upload.status === "PUBLISHED" ? "success" : "info", children: upload.status }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSaveReview, disabled: saving, className: "inline-flex items-center gap-2 rounded-xl border border-outline-variant px-5 py-2.5 text-sm font-semibold hover:bg-surface-container-low transition-colors disabled:opacity-50 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "save", className: "text-lg" }),
        " ",
        saving ? "Saving..." : "Save Review"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handlePublish, disabled: publishing || approvedCount === 0, className: "btn-shimmer inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shark-shadow hover:bg-accent transition-all disabled:opacity-50 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "publish", className: "text-lg" }),
        " Publish ",
        approvedCount,
        " Questions"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 mb-8", children: questions.map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl p-6 border shark-shadow ${q.approved ? "border-primary/40 bg-primary/5" : "border-outline-variant/40 bg-surface-container-lowest"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-on-surface-variant", children: [
            "Q",
            idx + 1
          ] }),
          q.confidence > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: q.confidence >= 0.8 ? "success" : q.confidence >= 0.5 ? "warning" : "error", children: [
            Math.round(q.confidence * 100),
            "% confidence"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleApproval(idx), className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${q.approved ? "bg-primary text-on-primary" : "bg-surface-container-high hover:bg-surface-container-highest"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: q.approved ? "check_circle" : "radio_button_unchecked", className: "text-[18px]" }),
          q.approved ? "Approved" : "Approve"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { label: "Question Text", value: q.text, onChange: (e) => updateQuestion(idx, "text", e.target.value), rows: 2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mt-3", children: q.options.map((opt, oi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${q.correctAnswer === opt.label ? "bg-primary text-on-primary" : "bg-surface-container-high"}`, children: opt.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: opt.text, onChange: (e) => {
          const newOpts = [...q.options];
          newOpts[oi] = {
            ...newOpts[oi],
            text: e.target.value
          };
          updateQuestion(idx, "options", newOpts);
        }, className: "flex-1 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-sm outline-none focus:border-primary transition-colors" })
      ] }, oi)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Correct Answer", value: q.correctAnswer, onChange: (e) => updateQuestion(idx, "correctAnswer", e.target.value), options: [{
          value: "A",
          label: "A"
        }, {
          value: "B",
          label: "B"
        }, {
          value: "C",
          label: "C"
        }, {
          value: "D",
          label: "D"
        }] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Difficulty", value: q.difficulty, onChange: (e) => updateQuestion(idx, "difficulty", e.target.value), options: [{
          value: "EASY",
          label: "Easy"
        }, {
          value: "MEDIUM",
          label: "Medium"
        }, {
          value: "HARD",
          label: "Hard"
        }] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Category", value: q.category, onChange: (e) => updateQuestion(idx, "category", e.target.value), options: [{
          value: "Algebra",
          label: "Algebra"
        }, {
          value: "Geometry",
          label: "Geometry"
        }, {
          value: "Reading Comprehension",
          label: "Reading Comprehension"
        }, {
          value: "Grammar",
          label: "Grammar"
        }] })
      ] })
    ] }, idx)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { label: "Review Notes", value: reviewNotes, onChange: (e) => setReviewNotes(e.target.value), rows: 3, placeholder: "Add notes about this review..." })
  ] });
}
export {
  ReviewUpload as component
};
