"use client";

import { FormEvent, useState, DragEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  FileText,
  Loader2,
  Upload,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
  Send,
  Building2,
  User,
  Mail,
  Phone,
  Layers,
  FileCode,
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

const steps = [
  { id: 1, label: "Your Info", subtitle: "Contact Details" },
  { id: 2, label: "Project Scope", subtitle: "Specs & Service" },
  { id: 3, label: "Files & Submit", subtitle: "Drawings & RFQ" },
];

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form Fields State
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

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
      setFileSize(`${sizeInMb} MB`);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      if (!formData.company.trim()) newErrors.company = "Company is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else if (step === 2) {
      if (!formData.projectName.trim()) newErrors.projectName = "Project name is required";
      if (!formData.service) newErrors.service = "Please select a service";
      if (!formData.description.trim()) newErrors.description = "Project description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setDirection("forward");
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setDirection("backward");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep(1) || !validateStep(2)) {
      return;
    }
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
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-steel-200 bg-white p-8 text-center shadow-[0_20px_50px_rgba(10,20,32,0.06)] sm:p-14 lg:p-16"
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-copper-500/10 blur-3xl" />

          {/* Success Check Badge */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-copper-500/30 bg-copper-50 text-copper-600 shadow-sm"
          >
            <CheckCircle2 className="h-10 w-10 text-copper-600" />
          </motion.div>

          {/* Pill status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-copper-200 bg-copper-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-copper-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-600" />
            </span>
            Inquiry Logged & Verified
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-5 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl"
          >
            Thank You for Contacting Kenz Engineering
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-steel-700"
          >
            Your project inquiry has been recorded. Our detailing and engineering
            team will review your requirements and follow up promptly.
          </motion.p>

          {/* Summary pill recap */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-2 rounded-xl border border-steel-200 bg-steel-50/70 p-3 text-xs text-steel-700"
          >
            <span className="font-semibold text-navy-950">{formData.name}</span>
            <span>•</span>
            <span>{formData.company}</span>
            <span>•</span>
            <span className="text-copper-600 font-semibold">{formData.service}</span>
          </motion.div>

          {/* Guarantee Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-4 text-xs text-steel-600"
          >
            <div className="flex items-center gap-2 rounded-lg bg-steel-50 px-3 py-1.5 border border-steel-200">
              <Clock size={14} className="text-copper-600" />
              <span>Response: Within 24h</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-steel-50 px-3 py-1.5 border border-steel-200">
              <ShieldCheck size={14} className="text-copper-600" />
              <span>Direct Technical Confidentiality</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8"
          >
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
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
              className="group inline-flex items-center gap-3 rounded-xl border border-navy-950 bg-navy-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 hover:border-copper-500 hover:bg-copper-500 hover:shadow-lg hover:shadow-copper-500/20"
            >
              <span>Submit Another Inquiry</span>
              <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  /* ── MULTI-STEP INTERACTIVE FORM ──────────────────────── */
  return (
    <div className="relative overflow-hidden rounded-3xl border border-steel-200/90 bg-white shadow-[0_20px_50px_-15px_rgba(10,20,32,0.06)]">
      {/* ── TOP CONSOLE HEADER ── */}
      <div className="relative overflow-hidden border-b border-white/10 bg-navy-950 px-6 py-6 text-white sm:px-8">
        {/* Subtle grid and ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-copper-500/15 blur-2xl" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-copper-500/40 bg-copper-500/15 text-copper-400">
              <Send size={14} />
            </span>
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-copper-400">
                KENZ / PROJECT INQUIRY
              </p>
              <h3 className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
                Tell Us About Your Project
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] text-steel-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>STEP {currentStep} OF 3</span>
          </div>
        </div>

        {/* ── INTERACTIVE STEPPER TABS ── */}
        <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
          <div className="grid grid-cols-3 gap-2">
            {steps.map((s) => {
              const isPassed = currentStep > s.id;
              const isActive = currentStep === s.id;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    // Allow clicking back or to current
                    if (s.id < currentStep) {
                      setDirection("backward");
                      setCurrentStep(s.id);
                    } else if (s.id === currentStep + 1 && validateStep(currentStep)) {
                      setDirection("forward");
                      setCurrentStep(s.id);
                    }
                  }}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 border border-copper-500/50 text-white"
                      : isPassed
                      ? "bg-white/5 text-copper-300 hover:bg-white/10 cursor-pointer"
                      : "opacity-40 text-steel-400 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold font-mono transition-colors ${
                      isActive
                        ? "bg-copper-500 text-white shadow-sm"
                        : isPassed
                        ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/40"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {isPassed ? <Check size={12} /> : s.id}
                  </div>

                  <div className="hidden sm:block min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider truncate">
                      {s.label}
                    </p>
                    <p className="text-[9px] text-steel-400 truncate">
                      {s.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Glowing Animated Progress Line */}
          <div className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-copper-500 to-copper-400"
              initial={false}
              animate={{
                width:
                  currentStep === 1 ? "33%" : currentStep === 2 ? "66%" : "100%",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* ── FORM BODY CONTAINER ── */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {/* =========================================================
              STEP 1: YOUR INFORMATION
              ========================================================= */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: direction === "forward" ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "forward" ? -25 : 25 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-600">
                  SECTION 01 / CLIENT DETAILS
                </span>
                <h4 className="font-display text-2xl uppercase tracking-wide text-navy-950 sm:text-3xl">
                  Your Information
                </h4>
                <p className="text-xs text-steel-500">
                  Please provide your contact information so our engineering coordinators can reach you.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-navy-950"
                  >
                    <span>Full Name *</span>
                    {errors.name && (
                      <span className="text-[10px] text-red-500 normal-case font-normal">
                        {errors.name}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="e.g. Johnathan Smith"
                      className={`h-12 w-full rounded-xl border px-4 text-sm text-navy-950 outline-none transition-all ${
                        errors.name
                          ? "border-red-400 bg-red-50/20"
                          : "border-steel-200 bg-steel-50/40 focus:border-copper-500 focus:bg-white focus:ring-2 focus:ring-copper-500/20"
                      }`}
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-navy-950"
                  >
                    <span>Company Name *</span>
                    {errors.company && (
                      <span className="text-[10px] text-red-500 normal-case font-normal">
                        {errors.company}
                      </span>
                    )}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    placeholder="e.g. Apex Steel Fabricators LLC"
                    className={`h-12 w-full rounded-xl border px-4 text-sm text-navy-950 outline-none transition-all ${
                      errors.company
                        ? "border-red-400 bg-red-50/20"
                        : "border-steel-200 bg-steel-50/40 focus:border-copper-500 focus:bg-white focus:ring-2 focus:ring-copper-500/20"
                    }`}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-navy-950"
                  >
                    <span>Email Address *</span>
                    {errors.email && (
                      <span className="text-[10px] text-red-500 normal-case font-normal">
                        {errors.email}
                      </span>
                    )}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="e.g. john@apexsteel.com"
                    className={`h-12 w-full rounded-xl border px-4 text-sm text-navy-950 outline-none transition-all ${
                      errors.email
                        ? "border-red-400 bg-red-50/20"
                        : "border-steel-200 bg-steel-50/40 focus:border-copper-500 focus:bg-white focus:ring-2 focus:ring-copper-500/20"
                    }`}
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-navy-950"
                  >
                    <span>Phone / WhatsApp</span>
                    <span className="text-[10px] font-normal text-steel-400">Optional</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="h-12 w-full rounded-xl border border-steel-200 bg-steel-50/40 px-4 text-sm text-navy-950 outline-none transition-all focus:border-copper-500 focus:bg-white focus:ring-2 focus:ring-copper-500/20"
                  />
                </div>
              </div>

              {/* Step 1 Controls */}
              <div className="border-t border-steel-100 pt-6 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-copper-500/20"
                >
                  <span>Continue to Project Scope</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* =========================================================
              STEP 2: PROJECT INFORMATION & SCOPE
              ========================================================= */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: direction === "forward" ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "forward" ? -25 : 25 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-600">
                  SECTION 02 / PROJECT SCOPE
                </span>
                <h4 className="font-display text-2xl uppercase tracking-wide text-navy-950 sm:text-3xl">
                  Project Information
                </h4>
                <p className="text-xs text-steel-500">
                  Select your required engineering discipline and project specifications.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Project Name */}
                <div>
                  <label
                    htmlFor="projectName"
                    className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-navy-950"
                  >
                    <span>Project Name *</span>
                    {errors.projectName && (
                      <span className="text-[10px] text-red-500 normal-case font-normal">
                        {errors.projectName}
                      </span>
                    )}
                  </label>
                  <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) => updateField("projectName", e.target.value)}
                    placeholder="e.g. Metro Logistics Distribution Center"
                    className={`h-12 w-full rounded-xl border px-4 text-sm text-navy-950 outline-none transition-all ${
                      errors.projectName
                        ? "border-red-400 bg-red-50/20"
                        : "border-steel-200 bg-steel-50/40 focus:border-copper-500 focus:bg-white focus:ring-2 focus:ring-copper-500/20"
                    }`}
                  />
                </div>

                {/* Project Type Chips */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-navy-950">
                    Project Type *
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => updateField("projectType", type)}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                          formData.projectType === type
                            ? "bg-navy-950 text-white shadow-sm"
                            : "bg-steel-100 text-steel-700 hover:bg-steel-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Required - 6 Interactive Cards */}
                <div className="sm:col-span-2">
                  <label className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-navy-950">
                    Service Required *
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {serviceOptions.map((s) => {
                      const isSelected = formData.service === s;
                      return (
                        <button
                          type="button"
                          key={s}
                          onClick={() => updateField("service", s)}
                          className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-semibold transition-all ${
                            isSelected
                              ? "border-copper-500 bg-copper-50/80 text-copper-800 shadow-sm ring-1 ring-copper-500"
                              : "border-steel-200 bg-white text-navy-950 hover:border-steel-300 hover:bg-steel-50/50"
                          }`}
                        >
                          <div
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] transition-colors ${
                              isSelected
                                ? "border-copper-600 bg-copper-600 text-white"
                                : "border-steel-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check size={10} />}
                          </div>
                          <span className="truncate">{s}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Description */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-navy-950"
                  >
                    <span>Project Description *</span>
                    {errors.description && (
                      <span className="text-[10px] text-red-500 normal-case font-normal">
                        {errors.description}
                      </span>
                    )}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Tell us about your project, scope, requirements, schedule, or connection detailing expectations..."
                    className={`w-full resize-none rounded-xl border p-4 text-sm leading-relaxed text-navy-950 outline-none transition-all ${
                      errors.description
                        ? "border-red-400 bg-red-50/20"
                        : "border-steel-200 bg-steel-50/40 focus:border-copper-500 focus:bg-white focus:ring-2 focus:ring-copper-500/20"
                    }`}
                  />
                </div>
              </div>

              {/* Step 2 Controls */}
              <div className="border-t border-steel-100 pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-2 rounded-xl border border-steel-200 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-steel-700 transition-all hover:bg-steel-50"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-copper-500/20"
                >
                  <span>Continue to Files & Submit</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* =========================================================
              STEP 3: FILES & SUBMISSION
              ========================================================= */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: direction === "forward" ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "forward" ? -25 : 25 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-600">
                  SECTION 03 / ATTACHMENTS & REVIEW
                </span>
                <h4 className="font-display text-2xl uppercase tracking-wide text-navy-950 sm:text-3xl">
                  Project Files & Final Submission
                </h4>
                <p className="text-xs text-steel-500">
                  Attach architectural/structural design drawings or specifications for rapid quotation.
                </p>
              </div>

              {/* Quick Inquiry Recap Card */}
              <div className="rounded-2xl border border-steel-200 bg-steel-50/60 p-4">
                <div className="flex items-center justify-between border-b border-steel-200/60 pb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-navy-950">
                    Inquiry Summary
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setDirection("backward");
                      setCurrentStep(1);
                    }}
                    className="text-[10px] font-semibold uppercase tracking-wider text-copper-600 hover:underline"
                  >
                    Edit Info
                  </button>
                </div>

                <div className="mt-2.5 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <span className="text-[10px] text-steel-500 uppercase">Client</span>
                    <p className="font-semibold text-navy-950 truncate">{formData.name || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-steel-500 uppercase">Company</span>
                    <p className="font-semibold text-navy-950 truncate">{formData.company || "—"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-steel-500 uppercase">Service</span>
                    <p className="font-semibold text-copper-600 truncate">{formData.service}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-steel-500 uppercase">Type</span>
                    <p className="font-semibold text-navy-950 truncate">{formData.projectType}</p>
                  </div>
                </div>
              </div>

              {/* File Upload Zone */}
              <div>
                <label
                  htmlFor="projectFile"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all ${
                    isDragging
                      ? "border-copper-500 bg-copper-50/60 scale-[0.99]"
                      : "border-steel-300 bg-steel-50/30 hover:border-copper-400 hover:bg-copper-50/20"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-copper-500/20 bg-white text-copper-600 shadow-sm transition-transform group-hover:scale-105">
                    {fileName ? (
                      <FileText className="h-5 w-5 text-copper-600" />
                    ) : (
                      <Upload className="h-5 w-5 text-copper-600" />
                    )}
                  </div>

                  {fileName ? (
                    <div className="mt-3 flex flex-col items-center">
                      <div className="flex items-center gap-2 rounded-xl border border-copper-200 bg-white px-3.5 py-1.5 shadow-sm">
                        <span className="text-xs font-semibold text-navy-950">{fileName}</span>
                        <span className="text-[11px] text-steel-500">({fileSize})</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setFileName("");
                            setFileSize("");
                          }}
                          className="ml-2 rounded p-0.5 text-steel-400 hover:text-navy-950"
                        >
                          <X size={13} />
                        </button>
                      </div>
                      <p className="mt-1.5 text-xs text-copper-600 font-medium">
                        File attached and ready for transmission
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="mt-3 text-xs font-semibold text-navy-950 group-hover:text-copper-600 transition-colors">
                        Drag & Drop or Click to Attach Project Drawings
                      </p>
                      <p className="mt-1 text-[11px] text-steel-500">
                        PDF, DWG, DXF, ZIP, RAR, or XLSX (AISC / Architectural drawings)
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
                      handleFileChange(file);
                    }}
                  />
                </label>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] leading-relaxed text-steel-500">
                By submitting this form, you are providing your project
                information to Kenz Engineering LLC for the purpose of responding
                to your technical inquiry.
              </p>

              {/* Step 3 Controls */}
              <div className="border-t border-steel-100 pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-2 rounded-xl border border-steel-200 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-steel-700 transition-all hover:bg-steel-50"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex min-h-12 shrink-0 items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-copper-600 via-copper-500 to-copper-600 px-9 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-copper-500/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-copper-500/35 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}