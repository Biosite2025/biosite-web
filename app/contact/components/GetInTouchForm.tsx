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
import { FORM_ICONS, FormField, FormHeader, Icon, SECONDARY_BUTTON, SUBMIT_BUTTON, SelectField } from "@/src/components/forms/FormField";

type TextName = "name" | "email" | "phone" | "subject" | "message";

function Field({ name, ...props }: { name: TextName } & Omit<React.ComponentProps<typeof FormField>, "id" | "name">) {
  return <FormField id={`contact-${name}`} name={name} {...props} />;
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
      <FormHeader title="Get in Touch" subtitle="Tell us what you need and the right team will get back to you." />

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
              className={SECONDARY_BUTTON}
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
                id="contact-department"
                name="department"
                label="Team"
                placeholder="Select a team"
                options={departmentOptions}
                value={form.department}
                error={errorFor("department")}
                onChange={(value) => setField("department", value)}
              />
              <SelectField
                id="contact-location"
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
              className={SUBMIT_BUTTON}
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
