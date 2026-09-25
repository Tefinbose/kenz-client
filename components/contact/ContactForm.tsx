"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  /* ── SUCCESS STATE ────────────────────────────────────── */
  if (submitted) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-[620px] flex-col items-center justify-center border border-steel-200 bg-white px-6 py-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid h-16 w-16 place-items-center border border-copper-500/40 bg-copper-500/10"
          >
            <CheckCircle2 className="h-8 w-8 text-copper-600" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-copper-600"
          >
            Inquiry Received
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-4 max-w-xl font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl"
          >
            Thank You for Contacting Kenz Engineering
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-6 max-w-lg leading-7 text-steel-700"
          >
            Your project inquiry has been recorded. Our team will review the
            information provided and follow up with you.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-10 group inline-flex items-center gap-3 border border-navy-950 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-navy-950 transition-all duration-300 hover:bg-navy-950 hover:text-white"
          >
            Submit Another Inquiry
            <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      </AnimatePresence>
    );
  }

  /* ── FORM ─────────────────────────────────────────────── */
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      className="border border-steel-200 bg-white"
    >
      {/* FORM HEADER */}
      <div className="relative overflow-hidden border-b border-steel-200 bg-navy-950 px-6 py-8 text-white sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(193,122,62,0.2) 0%, transparent 70%)",
          }}
        />
        <div className="relative flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-copper-400">
              KENZ / PROJECT INQUIRY
            </p>
            <h3 className="mt-3 font-display text-3xl uppercase sm:text-4xl">
              Tell Us About Your Project
            </h3>
          </div>
          <span className="hidden font-mono text-[9px] text-steel-700 sm:block">
            RFQ / 001
          </span>
        </div>
        <p className="relative mt-4 max-w-2xl text-sm leading-6 text-steel-400">
          Provide the basic project information below and our team can better
          understand your technical requirements.
        </p>
      </div>

      {/* FORM BODY */}
      <div className="space-y-12 p-6 sm:p-8 lg:p-10">

        {/* SECTION 01 — CONTACT INFO */}
        <section>
          <FormSectionHeader number="01" title="Your Information" />
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Full Name" name="name" placeholder="Your full name" required />
            <Field label="Company" name="company" placeholder="Company name" required />
            <Field label="Email Address" name="email" type="email" placeholder="you@company.com" required />
            <Field label="Phone / WhatsApp" name="phone" type="tel" placeholder="+1 000 000 0000" />
          </div>
        </section>

        {/* SECTION 02 — PROJECT INFO */}
        <section>
          <FormSectionHeader number="02" title="Project Information" />
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Project Name" name="projectName" placeholder="Project name" required />
            <SelectField label="Project Type" name="projectType" options={projectTypes} required />

            <div className="md:col-span-2">
              <label
                htmlFor="service"
                className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-steel-700"
              >
                Service Required
                <span className="ml-1 text-copper-600">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="h-12 w-full appearance-none border border-steel-300 bg-paper px-4 text-sm text-navy-950 outline-none transition-all duration-200 focus:border-copper-500 focus:ring-1 focus:ring-copper-500 hover:border-steel-400"
              >
                <option value="" disabled>Select a service</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-steel-700"
              >
                Project Description
                <span className="ml-1 text-copper-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                placeholder="Tell us about your project, scope, requirements, schedule, or any other relevant information..."
                className="w-full resize-y border border-steel-300 bg-paper px-4 py-4 text-sm leading-6 text-navy-950 outline-none transition-all duration-200 placeholder:text-steel-500 focus:border-copper-500 focus:ring-1 focus:ring-copper-500 hover:border-steel-400"
              />
            </div>
          </div>
        </section>

        {/* SECTION 03 — FILES */}
        <section>
          <FormSectionHeader number="03" title="Project Files" />
          <label
            htmlFor="projectFile"
            className="group flex cursor-pointer flex-col items-center justify-center border border-dashed border-steel-400 bg-paper px-6 py-12 text-center transition-all duration-300 hover:border-copper-500 hover:bg-copper-500/5"
          >
            <div className="grid h-12 w-12 place-items-center border border-steel-300 bg-white transition-all duration-300 group-hover:border-copper-500 group-hover:bg-copper-500/10">
              {fileName ? (
                <FileText className="h-5 w-5 text-copper-600" />
              ) : (
                <Upload className="h-5 w-5 text-copper-600" />
              )}
            </div>

            {fileName ? (
              <>
                <p className="mt-5 text-sm font-semibold text-navy-950">{fileName}</p>
                <p className="mt-2 text-xs text-steel-500">File selected successfully</p>
              </>
            ) : (
              <>
                <p className="mt-5 text-sm font-semibold text-navy-950">Upload Project Files</p>
                <p className="mt-2 text-xs text-steel-500">
                  Drawings, specifications, PDFs, or other relevant documents
                </p>
              </>
            )}

            <input
              id="projectFile"
              name="projectFile"
              type="file"
              className="hidden"
              accept=".pdf,.dwg,.dxf,.zip,.rar,.doc,.docx,.xls,.xlsx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFileName(file.name);
              }}
            />
          </label>
          <p className="mt-3 text-[10px] leading-5 text-steel-500">
            File upload is currently prepared for the frontend. Server-side
            file handling will be connected when the inquiry backend is added.
          </p>
        </section>

        {/* SUBMIT */}
        <div className="border-t border-steel-200 pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-xs leading-5 text-steel-500">
              By submitting this form, you are providing your project
              information to Kenz Engineering LLC for the purpose of responding
              to your inquiry.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-copper-600 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-copper-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Submit Project Inquiry
                  <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.form>
  );
}

/* ── FORM SECTION HEADER ──────────────────────────────────── */
function FormSectionHeader({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <span className="font-mono text-[10px] text-copper-600">{number}</span>
      <h4 className="font-display text-2xl uppercase text-navy-950">{title}</h4>
      <div className="h-px flex-1 bg-steel-200" />
    </div>
  );
}

/* ── FIELD ────────────────────────────────────────────────── */
function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-steel-700"
      >
        {label}
        {required && <span className="ml-1 text-copper-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 w-full border border-steel-300 bg-paper px-4 text-sm text-navy-950 outline-none transition-all duration-200 placeholder:text-steel-500 focus:border-copper-500 focus:ring-1 focus:ring-copper-500 hover:border-steel-400"
      />
    </div>
  );
}

/* ── SELECT ───────────────────────────────────────────────── */
function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-steel-700"
      >
        {label}
        {required && <span className="ml-1 text-copper-600">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="h-12 w-full appearance-none border border-steel-300 bg-paper px-4 text-sm text-navy-950 outline-none transition-all duration-200 focus:border-copper-500 focus:ring-1 focus:ring-copper-500 hover:border-steel-400"
      >
        <option value="" disabled>Select project type</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}