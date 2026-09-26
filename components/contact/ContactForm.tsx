"use client";

import { FormEvent, DragEvent, ReactNode, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";

const serviceOptions = [
  "Steel Detailing",
  "Miscellaneous Detailing",
  "Connection & Delegated Design",
  "Joist & Deck Detailing",
  "BIM Support",
  "Estimation & Material Take-Off",
];

const projectTypes = [
  "Commercial",
  "Industrial",
  "Residential",
  "Infrastructure",
  "Renovation",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectName: "",
    projectType: "Commercial",
    service: "Steel Detailing",
    description: "",
  });

  const updateField = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileChange = (file?: File) => {
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Required";
    if (!formData.company.trim()) next.company = "Required";
    if (!formData.email.trim()) {
      next.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      next.email = "Enter a valid email";
    }
    if (!formData.projectName.trim()) next.projectName = "Required";
    if (!formData.description.trim()) next.description = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  /* ── SUCCESS STATE ─────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="rounded-2xl border border-steel-200 bg-white p-10 text-center sm:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-copper-50 text-copper-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-3xl text-navy-950 sm:text-4xl">
          Thank you, {formData.name.split(" ")[0] || "we've received it"}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-steel-600">
          Your inquiry for <span className="font-semibold text-navy-950">{formData.projectName}</span> has
          been sent to our detailing team. Expect a response within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFileName("");
            setFormData({
              name: "",
              company: "",
              email: "",
              phone: "",
              projectName: "",
              projectType: "Commercial",
              service: "Steel Detailing",
              description: "",
            });
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-steel-200 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:border-copper-300 hover:text-copper-700"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  /* ── FORM ──────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-steel-200 bg-white p-6 sm:p-9"
    >
      <h3 className="font-display text-2xl text-navy-950 sm:text-3xl">
        Project inquiry
      </h3>
      <p className="mt-1.5 text-sm text-steel-500">
        Fields marked with * are required.
      </p>

      {/* Contact details */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={errors.name}>
          <input
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Johnathan Smith"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Company" required error={errors.company}>
          <input
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            placeholder="Apex Steel Fabricators LLC"
            className={inputClass(!!errors.company)}
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="john@apexsteel.com"
            className={inputClass(!!errors.email)}
          />
        </Field>
        <Field label="Phone" hint="Optional">
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+1 (555) 019-2834"
            className={inputClass(false)}
          />
        </Field>
      </div>

      {/* Project details */}
      <div className="mt-8 border-t border-steel-100 pt-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Project name" required error={errors.projectName}>
            <input
              value={formData.projectName}
              onChange={(e) => updateField("projectName", e.target.value)}
              placeholder="Metro Logistics Distribution Center"
              className={inputClass(!!errors.projectName)}
            />
          </Field>

          <Field label="Project type" required>
            <select
              value={formData.projectType}
              onChange={(e) => updateField("projectType", e.target.value)}
              className={inputClass(false)}
            >
              {projectTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>

          <div className="sm:col-span-2">
            <Field label="Service required" required>
              <select
                value={formData.service}
                onChange={(e) => updateField("service", e.target.value)}
                className={inputClass(false)}
              >
                {serviceOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label="Project description" required error={errors.description}>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Scope, connection details, schedule, and anything else that helps us quote accurately."
                className={`${inputClass(!!errors.description)} h-auto resize-none py-3`}
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Attachment */}
      <div className="mt-8 border-t border-steel-100 pt-8">
        <label className="mb-2 block text-sm font-medium text-navy-950">
          Drawings or specs <span className="font-normal text-steel-400">(optional)</span>
        </label>
        <label
          htmlFor="projectFile"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${isDragging
            ? "border-copper-400 bg-copper-50/50"
            : "border-steel-200 hover:border-copper-300"
            }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-steel-50 text-steel-500">
            {fileName ? <FileText size={18} /> : <Upload size={18} />}
          </div>

          {fileName ? (
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-steel-200 bg-white px-3 py-1.5">
              <span className="text-xs font-medium text-navy-950">{fileName}</span>
              <span className="text-xs text-steel-400">({fileSize})</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFileName("");
                  setFileSize("");
                }}
                className="text-steel-400 hover:text-navy-950"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <>
              <p className="mt-3 text-sm font-medium text-navy-950">
                Drag & drop, or click to attach
              </p>
              <p className="mt-1 text-xs text-steel-500">
                PDF, DWG, DXF, ZIP, or XLSX
              </p>
            </>
          )}

          <input
            id="projectFile"
            type="file"
            className="hidden"
            accept=".pdf,.dwg,.dxf,.zip,.rar,.doc,.docx,.xls,.xlsx"
            onChange={(e) => handleFileChange(e.target.files?.[0])}
          />
        </label>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-steel-400">
        By submitting, you agree to share this information with Kenz
        Engineering LLC so our team can respond to your inquiry.
      </p>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-navy-950 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-copper-600 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Submit inquiry
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `h-11 w-full rounded-lg border px-3.5 text-sm text-navy-950 outline-none transition-colors ${hasError
    ? "border-red-300 bg-red-50/30"
    : "border-steel-200 bg-white focus:border-copper-500"
    }`;
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-navy-950">
          {label}
          {required && <span className="text-copper-600"> *</span>}
        </label>
        {hint && <span className="text-xs text-steel-400">{hint}</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      {children}
    </div>
  );
}