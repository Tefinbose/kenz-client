"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
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
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    /*
     * Backend/email integration will be connected later.
     * For now this provides the complete frontend interaction.
     */
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[620px] flex-col items-center justify-center border border-steel-200 bg-white px-6 py-20 text-center">
        <div className="grid h-16 w-16 place-items-center border border-copper-500/40 bg-copper-500/10">
          <CheckCircle2 className="h-8 w-8 text-copper-600" />
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
          Inquiry Received
        </p>

        <h3 className="mt-4 max-w-xl font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
          Thank You for Contacting Kenz Engineering
        </h3>

        <p className="mt-6 max-w-lg leading-7 text-steel-700">
          Your project inquiry has been recorded. Our team will review the
          information provided and follow up with you.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-10 inline-flex items-center gap-3 border border-navy-950 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-navy-950 transition hover:bg-navy-950 hover:text-white"
        >
          Submit Another Inquiry
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-steel-200 bg-white"
    >
      {/* FORM HEADER */}
      <div className="border-b border-steel-200 bg-navy-950 px-6 py-8 text-white sm:px-8">
        <div className="flex items-start justify-between gap-6">
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

        <p className="mt-4 max-w-2xl text-sm leading-6 text-steel-400">
          Provide the basic project information below and our team can better
          understand your technical requirements.
        </p>
      </div>

      {/* FORM BODY */}
      <div className="space-y-12 p-6 sm:p-8 lg:p-10">
        {/* CONTACT INFORMATION */}
        <section>
          <div className="mb-7 flex items-center gap-4">
            <span className="font-mono text-[10px] text-copper-600">
              01
            </span>

            <h4 className="font-display text-2xl uppercase text-navy-950">
              Your Information
            </h4>

            <div className="h-px flex-1 bg-steel-200" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Full Name"
              name="name"
              placeholder="Your full name"
              required
            />

            <Field
              label="Company"
              name="company"
              placeholder="Company name"
              required
            />

            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
            />

            <Field
              label="Phone / WhatsApp"
              name="phone"
              type="tel"
              placeholder="+1 000 000 0000"
            />
          </div>
        </section>

        {/* PROJECT INFORMATION */}
        <section>
          <div className="mb-7 flex items-center gap-4">
            <span className="font-mono text-[10px] text-copper-600">
              02
            </span>

            <h4 className="font-display text-2xl uppercase text-navy-950">
              Project Information
            </h4>

            <div className="h-px flex-1 bg-steel-200" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Project Name"
              name="projectName"
              placeholder="Project name"
              required
            />

            <SelectField
              label="Project Type"
              name="projectType"
              options={projectTypes}
              required
            />

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
                className="h-12 w-full appearance-none border border-steel-300 bg-paper px-4 text-sm text-navy-950 outline-none transition focus:border-copper-500 focus:ring-1 focus:ring-copper-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>

                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
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
                className="w-full resize-y border border-steel-300 bg-paper px-4 py-4 text-sm leading-6 text-navy-950 outline-none transition placeholder:text-steel-500 focus:border-copper-500 focus:ring-1 focus:ring-copper-500"
              />
            </div>
          </div>
        </section>

        {/* FILE UPLOAD */}
        <section>
          <div className="mb-7 flex items-center gap-4">
            <span className="font-mono text-[10px] text-copper-600">
              03
            </span>

            <h4 className="font-display text-2xl uppercase text-navy-950">
              Project Files
            </h4>

            <div className="h-px flex-1 bg-steel-200" />
          </div>

          <label
            htmlFor="projectFile"
            className="group flex cursor-pointer flex-col items-center justify-center border border-dashed border-steel-400 bg-paper px-6 py-12 text-center transition hover:border-copper-500 hover:bg-copper-500/5"
          >
            <div className="grid h-12 w-12 place-items-center border border-steel-300 bg-white transition group-hover:border-copper-500">
              {fileName ? (
                <FileText className="h-5 w-5 text-copper-600" />
              ) : (
                <Upload className="h-5 w-5 text-copper-600" />
              )}
            </div>

            {fileName ? (
              <>
                <p className="mt-5 text-sm font-semibold text-navy-950">
                  {fileName}
                </p>

                <p className="mt-2 text-xs text-steel-500">
                  File selected successfully
                </p>
              </>
            ) : (
              <>
                <p className="mt-5 text-sm font-semibold text-navy-950">
                  Upload Project Files
                </p>

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
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  setFileName(file.name);
                }
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
              className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-copper-600 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-copper-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Submit Project Inquiry
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* FIELD                                                                     */
/* -------------------------------------------------------------------------- */

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

        {required && (
          <span className="ml-1 text-copper-600">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 w-full border border-steel-300 bg-paper px-4 text-sm text-navy-950 outline-none transition placeholder:text-steel-500 focus:border-copper-500 focus:ring-1 focus:ring-copper-500"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SELECT                                                                    */
/* -------------------------------------------------------------------------- */

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

        {required && (
          <span className="ml-1 text-copper-600">*</span>
        )}
      </label>

      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="h-12 w-full appearance-none border border-steel-300 bg-paper px-4 text-sm text-navy-950 outline-none transition focus:border-copper-500 focus:ring-1 focus:ring-copper-500"
      >
        <option value="" disabled>
          Select project type
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}