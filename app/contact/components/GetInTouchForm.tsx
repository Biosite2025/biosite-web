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
import { FORM_ICONS, Icon } from "@/src/components/forms/FloatingField";

type TextName = "name" | "email" | "phone" | "subject" | "message";

const CONTROL =
  "block w-full rounded-md border bg-white px-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition-colors duration-150 focus:ring-2 lg:text-sm";
const controlState = (error?: string) =>
  error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
    : "border-gray-300 hover:border-gray-400 focus:border-[#2B3990] focus:ring-[#2B3990]/15";

/** Label above the control; an error shows on the same line, so it never moves the layout. */
function FieldLabel({ htmlFor, label, required, error, errorId }: { htmlFor: string; label: string; required?: boolean; error?: string; errorId: string }) {
  return (
    <div className="mb-1 flex items-baseline justify-between gap-2">
      <label htmlFor={htmlFor} className="shrink-0 text-[13px] font-medium text-gray-700">
        {label}
        {required && <span aria-hidden="true" className="ml-0.5 text-red-600">*</span>}
      </label>
      {error && <span id={errorId} className="truncate text-xs text-red-600">{error}</span>}
    </div>
  );
}

function Field({ name, label, required, error, valid, multiline, className, footer, ...props }: {
  name: TextName;
  label: string;
  required?: boolean;
  error?: string;
  valid?: boolean;
  multiline?: boolean;
  className?: string;
  footer?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    "aria-required": required,
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
    "data-valid": valid || undefined,
  };
  return (
    <div className={`flex min-h-0 flex-col ${className ?? ""}`}>
      <FieldLabel htmlFor={id} label={label} required={required} error={error} errorId={errorId} />
      <div className="relative min-h-0 flex-1">
        {multiline ? (
          <textarea {...props} {...shared} className={`${CONTROL} ${controlState(error)} h-full min-h-[110px] resize-none py-2 pb-5 lg:min-h-0`} />
        ) : (
          <input {...props} {...shared} className={`${CONTROL} ${controlState(error)} h-10`} />
        )}
        {footer}
      </div>
    </div>
  );
}

function SelectField({ name, label, placeholder, options, value, error, onChange }: {
  name: "department" | "location";
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required error={error} errorId={errorId} />
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-required
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${CONTROL} ${controlState(error)} h-10 cursor-pointer appearance-none pr-9 ${value ? "" : "text-gray-400"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.label}
            </option>
          ))}
        </select>
        <Icon path={FORM_ICONS.chevron} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>
    </div>
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
      className="relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:h-[500px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="border-b border-gray-200 px-5 pb-3 pt-4">
        <h2 className="text-xl font-bold leading-tight text-[#2B3990] lg:text-2xl">Get in Touch</h2>
        <p className="mt-0.5 text-sm text-gray-600">Tell us what you need and the right team will get back to you.</p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            role="status"
            className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Icon path={FORM_ICONS.check} className="h-7 w-7" />
            </span>
            <h3 className="text-xl font-bold text-gray-900">Message sent</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-600">
              Thank you, {sent.name}. Your message is on its way to our {sent.team} team, and we&apos;ll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setSent(null)}
              className="mt-6 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
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
            className="flex min-h-0 flex-1 flex-col gap-3 px-5 pb-5 pt-4"
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SelectField
                name="department"
                label="Team"
                placeholder="Select a team"
                options={departmentOptions}
                value={form.department}
                error={errorFor("department")}
                onChange={(value) => setField("department", value)}
              />
              <SelectField
                name="location"
                label="Region"
                placeholder="Select your region"
                options={regionOptions}
                value={form.location}
                error={errorFor("location")}
                onChange={(value) => setField("location", value)}
              />
              <Field label="Name" required autoComplete="name" name="name" {...textProps("name", cleanName)} />
              <Field label="Email" required type="email" autoComplete="email" autoCapitalize="off" spellCheck={false} name="email" {...textProps("email")} />
              <Field label="Phone" type="tel" autoComplete="tel" name="phone" {...textProps("phone", cleanPhone)} />
              <Field label="Subject" name="subject" {...textProps("subject")} />
            </div>
            <Field
              label="Message"
              required
              multiline
              className="flex-1"
              name="message"
              placeholder="How can we help?"
              {...textProps("message")}
              footer={
                <span className={`pointer-events-none absolute bottom-1 right-2.5 text-[11px] ${form.message.length >= MAX_LENGTH.message ? "font-semibold text-red-600" : "text-gray-400"}`}>
                  {form.message.length} / {MAX_LENGTH.message}
                </span>
              }
            />

            {failure && (
              <p role="alert" className="flex items-center gap-1.5 truncate text-xs font-semibold text-red-700">
                <Icon path={FORM_ICONS.alert} className="h-4 w-4 shrink-0" />
                {failure}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#2B3990] text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#232f78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
