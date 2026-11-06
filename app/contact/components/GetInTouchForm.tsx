"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CONTACT_FIELDS,
  DEPARTMENTS,
  MAX_LENGTH,
  REGIONS,
  cleanName,
  cleanPhone,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contactValidation";

const ICONS = {
  name: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  email: "M3 6h18v12H3zM3 7l9 7 9-7",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  subject: "M4 7h16M4 12h16M4 17h10",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  check: "M5 13l4 4L19 7",
  alert: "M12 8v5M12 16.5v.5M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function Field({ name, label, required, error, valid, className, footer, multiline, ...inputProps }: {
  name: "name" | "email" | "phone" | "subject" | "message";
  label: string;
  required?: boolean;
  error?: string;
  valid?: boolean;
  className?: string;
  footer?: React.ReactNode;
  multiline?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    // A blank placeholder lets the label float using :placeholder-shown.
    placeholder: " ",
    "aria-required": required,
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
    className: `peer block w-full rounded-lg border bg-slate-50/70 pl-10 pr-8 pt-5 pb-1 text-base lg:text-sm text-gray-900 outline-none transition-colors duration-200 focus:bg-white focus:ring-2 ${
      error
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
        : "border-slate-200 hover:border-slate-300 focus:border-[#2B3990] focus:ring-[#2B3990]/10"
    } ${multiline ? "h-full min-h-[110px] resize-none pb-5 lg:min-h-0" : "h-12"}`,
  };

  return (
    <div className={className}>
      <div className="relative h-full">
        {multiline ? <textarea {...inputProps} {...shared} /> : <input {...inputProps} {...shared} />}
        <Icon path={ICONS[name]} className={`pointer-events-none absolute left-3 top-3.5 h-[18px] w-[18px] transition-colors ${error ? "text-red-500" : "text-slate-400 peer-focus:text-[#2B3990]"}`} />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-[41px] right-8 top-1.5 truncate text-[11px] font-semibold transition-all duration-200 ${
            error
              ? "text-red-600"
              : "text-slate-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#2B3990] peer-autofill:top-1.5 peer-autofill:text-[11px]"
          }`}
        >
          {error ? (
            <>
              <span className="sr-only">{label}: </span>
              <span id={errorId}>{error}</span>
            </>
          ) : (
            <>
              {label}
              {required && <span aria-hidden="true" className="ml-0.5 text-red-600">*</span>}
            </>
          )}
        </label>
        {(error || valid) && (
          <Icon path={error ? ICONS.alert : ICONS.check} className={`pointer-events-none absolute right-2.5 top-3.5 h-[18px] w-[18px] ${error ? "text-red-500" : "text-emerald-600"}`} />
        )}
        {footer}
      </div>
    </div>
  );
}

function ChoiceGroup({ name, legend, options, value, error, onChange, wide }: {
  name: "department" | "location";
  legend: string;
  options: { value: string; label: string }[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
  wide?: boolean;
}) {
  const errorId = `contact-${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-1 flex w-full items-baseline justify-between gap-2 text-xs font-semibold text-[#2B3990]">
        <span>
          {legend}
          <span aria-hidden="true" className="ml-0.5 text-red-600">*</span>
        </span>
        {error && <span id={errorId} className="truncate font-semibold text-red-600">{error}</span>}
      </legend>
      <div className={`grid gap-1.5 ${wide ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
        {options.map((option) => (
          <label key={option.value} className="relative block cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span
              className={`flex h-9 items-center justify-center whitespace-nowrap rounded-lg border px-1 text-xs font-semibold transition-colors duration-200 peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-[#2B3990] peer-checked:to-blue-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#2B3990]/40 ${
                error ? "border-red-400 text-red-700" : "border-slate-200 bg-slate-50/70 text-slate-600 hover:border-[#2B3990]/40 hover:text-[#2B3990]"
              }`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "", department: "", location: "" };

const departmentOptions = Object.entries(DEPARTMENTS).map(([value, label]) => ({ value, label }));
const regionOptions = Object.entries(REGIONS).map(([value, label]) => ({ value, label }));

export default function GetInTouchForm() {
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState("");
  const [sent, setSent] = useState<{ name: string; team: string } | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reducedMotion = useReducedMotion();

  // "Request a Quote" on a product links here with ?product=<name>.
  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product")?.slice(0, 150);
    if (!product) return;
    setForm((f) => ({
      ...f,
      department: "quotation",
      subject: `Quotation request: ${product}`,
      message: `Hello, I would like to request a quote for the ${product}.`,
    }));
  }, []);

  const values = form;
  const errors = validateContact(values);
  const errorFor = (field: ContactField) => serverErrors[field] || (touched[field] ? errors[field] : undefined);
  const isValid = (field: ContactField) => !!touched[field] && !!values[field].trim() && !errorFor(field);

  const clearFor = (field: ContactField) => {
    setServerErrors((e) => ({ ...e, [field]: undefined }));
    setFailure("");
  };
  const setField = (field: keyof typeof EMPTY, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    clearFor(field);
  };
  const textProps = (field: "name" | "email" | "phone" | "subject" | "message", clean?: (value: string) => string) => ({
    value: form[field],
    maxLength: MAX_LENGTH[field],
    error: errorFor(field),
    valid: isValid(field),
    onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) =>
      setField(field, clean ? clean(e.target.value) : e.target.value),
    onBlur: () => setTouched((t) => ({ ...t, [field]: true })),
  });

  const showErrors = (found: ContactErrors) => {
    setTouched(Object.fromEntries(CONTACT_FIELDS.map((field) => [field, true])));
    const first = CONTACT_FIELDS.find((field) => found[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFailure("");
    if (Object.keys(errors).length > 0) {
      showErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value }),
      });
      const data = await response.json();
      if (data.success) {
        setSent({ name: form.name.trim().split(/\s+/)[0], team: DEPARTMENTS[form.department] });
        setForm(EMPTY);
        setTouched({});
      } else if (data.fieldErrors) {
        setServerErrors(data.fieldErrors);
        showErrors(data.fieldErrors);
      } else {
        setFailure(data.error || "Your message could not be sent. Please try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setFailure("Your message could not be sent. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      id="userform"
      className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(43,57,144,0.35)] ring-1 ring-slate-200/70 lg:h-[500px]"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2B3990] via-[#2B3990] to-blue-600 px-4 py-3">
        <span aria-hidden="true" className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/10" />
        <span aria-hidden="true" className="absolute -bottom-16 right-20 h-28 w-28 rounded-full bg-white/10" />
        <h2 className="relative text-xl font-bold leading-tight text-white lg:text-2xl">Get in Touch</h2>
        <p className="relative text-xs text-blue-100 sm:text-sm">Tell us what you need and the right team will get back to you.</p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            role="status"
            className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Icon path={ICONS.check} className="h-8 w-8" />
            </span>
            <h3 className="text-2xl font-bold text-[#2B3990]">Message sent</h3>
            <p className="mt-2 max-w-sm text-gray-600">
              Thank you, {sent.name}. Your message is on its way to our {sent.team} team, and we&apos;ll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setSent(null)}
              className="mt-6 rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-[#2B3990] transition-colors hover:border-[#2B3990] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col gap-2.5 p-4"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Spam trap: hidden from people, filled in by bots. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              ref={honeypot}
            />

            <ChoiceGroup
              name="department"
              legend="Which team do you need?"
              options={departmentOptions}
              value={form.department}
              error={errorFor("department")}
              onChange={(value) => setField("department", value)}
              wide
            />
            <ChoiceGroup
              name="location"
              legend="Your region"
              options={regionOptions}
              value={form.location}
              error={errorFor("location")}
              onChange={(value) => setField("location", value)}
            />

            <div className="grid grid-cols-12 gap-2">
              <Field label="Name" required autoComplete="name" className="col-span-12 sm:col-span-6" name="name" {...textProps("name", cleanName)} />
              <Field label="Email" required type="email" autoComplete="email" autoCapitalize="off" spellCheck={false} className="col-span-12 sm:col-span-6" name="email" {...textProps("email")} />
              <Field label="Phone" type="tel" autoComplete="tel" className="col-span-12 sm:col-span-5" name="phone" {...textProps("phone", cleanPhone)} />
              <Field label="Subject" className="col-span-12 sm:col-span-7" name="subject" {...textProps("subject")} />
            </div>
            <Field
              label="Your message"
              required
              multiline
              className="min-h-0 flex-1"
              name="message"
              {...textProps("message")}
              footer={
                <span className={`pointer-events-none absolute bottom-1 right-2.5 text-[11px] ${form.message.length >= MAX_LENGTH.message ? "font-semibold text-red-600" : "text-slate-500"}`}>
                  {form.message.length} / {MAX_LENGTH.message}
                </span>
              }
            />

            {failure && (
              <p role="alert" className="flex items-center gap-1.5 truncate text-xs font-semibold text-red-700">
                <Icon path={ICONS.alert} className="h-4 w-4 shrink-0" />
                {failure}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden h-11 shrink-0 rounded-lg bg-gradient-to-r from-[#2B3990] to-blue-600 text-base font-semibold text-white shadow-md shadow-[#2B3990]/25 transition-shadow duration-200 hover:shadow-lg hover:shadow-[#2B3990]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span aria-hidden="true" className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/20 opacity-0 transition-all duration-500 group-hover:left-full group-hover:opacity-100" />
              {submitting ? (
                <>
                  <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Icon path={ICONS.arrow} className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
