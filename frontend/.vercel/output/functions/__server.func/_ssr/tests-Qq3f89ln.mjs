import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout } from "./AdminLayout-f1rdBm4s.mjs";
import { M as Modal } from "./Modal-IFcukRHK.mjs";
import { B as Badge } from "./Badge-CruYiyAR.mjs";
import { I as Icon } from "./Icon-Fsbc55mr.mjs";
import { I as Input } from "./Input-3QnCriAW.mjs";
import { S as Select } from "./Select-DQBG2uP0.mjs";
import { T as Textarea } from "./Textarea-BWaDv9iL.mjs";
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
import "./useAuth-CCZE-M2R.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function AdminTests() {
  const [tests, setTests] = reactExports.useState([]);
  const [questions, setQuestions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingTest, setEditingTest] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    section: "MATH",
    timeLimit: "60",
    accessLevel: "FREE",
    selectedQuestions: []
  });
  const [formError, setFormError] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const fetchTests = async () => {
    const res = await api.get("/api/tests/admin/all");
    if (res.success) setTests(res.tests || []);
    setLoading(false);
  };
  const fetchQuestions = async () => {
    const res = await api.get("/api/questions/admin?status=PUBLISHED&limit=100");
    if (res.success) setQuestions(res.questions || []);
  };
  reactExports.useEffect(() => {
    fetchTests();
    fetchQuestions();
  }, []);
  const openCreate = () => {
    setEditingTest(null);
    setForm({
      title: "",
      description: "",
      section: "MATH",
      timeLimit: "60",
      accessLevel: "FREE",
      selectedQuestions: []
    });
    setFormError("");
    setModalOpen(true);
  };
  const openEdit = (t) => {
    setEditingTest(t);
    setForm({
      title: t.title,
      description: t.description,
      section: t.section,
      timeLimit: String(t.timeLimit),
      accessLevel: t.accessLevel,
      selectedQuestions: t.questions.map((q) => q._id || q)
    });
    setFormError("");
    setModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.title || form.selectedQuestions.length === 0) {
      setFormError("Title and at least one question are required.");
      return;
    }
    setSubmitting(true);
    const body = {
      title: form.title,
      description: form.description,
      section: form.section,
      timeLimit: parseInt(form.timeLimit),
      accessLevel: form.accessLevel,
      questions: form.selectedQuestions
    };
    const res = editingTest ? await api.put(`/api/tests/${editingTest._id}`, body) : await api.post("/api/tests", body);
    if (res.success) {
      setModalOpen(false);
      fetchTests();
    } else {
      setFormError(res.error || "Failed to save test.");
    }
    setSubmitting(false);
  };
  const toggleActive = async (id, current) => {
    await api.put(`/api/tests/${id}`, {
      isActive: !current
    });
    fetchTests();
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this test?")) return;
    await api.delete(`/api/tests/${id}`);
    fetchTests();
  };
  const toggleQuestion = (qId) => {
    setForm((prev) => ({
      ...prev,
      selectedQuestions: prev.selectedQuestions.includes(qId) ? prev.selectedQuestions.filter((id) => id !== qId) : [...prev.selectedQuestions, qId]
    }));
  };
  const sectionLabel = (s) => s === "READING_WRITING" ? "Reading & Writing" : s === "MATH" ? "Math" : "Full Test";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { activeItem: "/admin/tests", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Test Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openCreate, className: "btn-shimmer inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary shark-shadow hover:bg-accent transition-all cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "add", className: "text-lg" }),
        " Create Test"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-on-surface-variant", children: "Loading..." }) : tests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: "quiz", title: "No tests created yet", description: "Create your first diagnostic test" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-surface-container-lowest border border-outline-variant/40 overflow-hidden shark-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-surface-container-low border-b border-outline-variant/40 text-xs uppercase tracking-wider text-on-surface-variant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Section" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-semibold", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-outline-variant/20", children: tests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-surface-container-low/50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-semibold text-sm", children: t.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: sectionLabel(t.section) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-sm", children: t.questions.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 text-sm", children: [
          t.timeLimit,
          " min"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: t.accessLevel === "PAID" ? "accent" : "success", children: t.accessLevel }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleActive(t._id, t.isActive), className: "cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: t.isActive ? "success" : "error", children: t.isActive ? "Active" : "Inactive" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(t), className: "px-3 py-1 bg-surface-container-high hover:bg-surface-container-highest rounded text-sm transition-colors cursor-pointer", children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(t._id), className: "px-3 py-1 bg-error/10 text-error hover:bg-error/20 rounded text-sm transition-colors cursor-pointer", children: "Delete" })
        ] }) })
      ] }, t._id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { open: modalOpen, onClose: () => setModalOpen(false), title: editingTest ? "Edit Test" : "Create Test", icon: editingTest ? "edit" : "add_box", maxWidth: "max-w-2xl", children: [
      formError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-error/15 text-error rounded-xl text-sm border border-error/25 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "error", className: "shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formError })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Test Title", value: form.title, onChange: (e) => setForm((p) => ({
          ...p,
          title: e.target.value
        })), required: true, placeholder: "e.g. SAT Math Practice Test 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { label: "Description", value: form.description, onChange: (e) => setForm((p) => ({
          ...p,
          description: e.target.value
        })), rows: 2, placeholder: "Brief description..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Section", value: form.section, onChange: (e) => setForm((p) => ({
            ...p,
            section: e.target.value
          })), options: [{
            value: "MATH",
            label: "Math"
          }, {
            value: "READING_WRITING",
            label: "Reading & Writing"
          }, {
            value: "FULL",
            label: "Full Test"
          }] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Time Limit (min)", type: "number", value: form.timeLimit, onChange: (e) => setForm((p) => ({
            ...p,
            timeLimit: e.target.value
          })), min: "1", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Access Level", value: form.accessLevel, onChange: (e) => setForm((p) => ({
            ...p,
            accessLevel: e.target.value
          })), options: [{
            value: "FREE",
            label: "Free"
          }, {
            value: "PAID",
            label: "Paid"
          }] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block font-mono text-[12px] uppercase tracking-[0.08em] text-on-surface-variant", children: [
            "Select Questions (",
            form.selectedQuestions.length,
            " selected)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-60 overflow-y-auto border border-outline-variant rounded-xl p-3 space-y-2", children: questions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-on-surface-variant text-center py-4", children: "No published questions available" }) : questions.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 p-2 rounded-lg hover:bg-surface-container-low cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.selectedQuestions.includes(q._id), onChange: () => toggleQuestion(q._id), className: "mt-1 accent-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm line-clamp-1", children: q.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: q.section === "MATH" ? "Math" : "R&W" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: q.difficulty === "EASY" ? "success" : q.difficulty === "HARD" ? "error" : "warning", children: q.difficulty }),
                q.tags && q.tags.find((t) => t.startsWith("sat-test-")) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", children: [
                  "SAT ",
                  q.tags.find((t) => t.startsWith("sat-test-"))?.split("-")[2]
                ] })
              ] })
            ] })
          ] }, q._id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-4 border-t border-outline-variant/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setModalOpen(false), className: "flex-1 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container-low text-sm font-semibold transition-colors cursor-pointer", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "flex-1 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-accent font-semibold transition-all disabled:opacity-50 cursor-pointer", children: submitting ? "Saving..." : "Save Test" })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminTests as component
};
