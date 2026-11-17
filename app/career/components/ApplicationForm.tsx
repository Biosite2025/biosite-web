"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FORM_ICONS, FieldLabel, FormField, FormHeader, Icon, SECONDARY_BUTTON, SUBMIT_BUTTON, SelectField } from "@/src/components/forms/FormField";
import { cleanName } from "@/lib/contactValidation";
import {
  APPLICATION_FIELDS,
  MAX_LENGTH,
  cleanDigits,
  resumeError,
  validateApplication,
  type ApplicationErrors,
  type ApplicationField,
} from "@/lib/applicationValidation";

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function ResumeDrop({ file, error, onFile, onRemove }: {
  file: File | null;
  error?: string;
  onFile: (file: File) => void;
  onRemove: () => void;
}) {
  const [drag, setDrag] = useState(false);
  const errorId = "application-resume-error";
  const onDrag = (e: React.DragEvent, over: boolean) => {
    e.preventDefault();
    setDrag(over);
  };

  return (
    <div>
      <FieldLabel htmlFor="application-resume" label="Résumé" required error={error} errorId={errorId} />
      <div className="relative">
        <label
          onDragEnter={(e) => onDrag(e, true)}
          onDragOver={(e) => onDrag(e, true)}
          onDragLeave={(e) => onDrag(e, false)}
          onDrop={(e) => {
            onDrag(e, false);
            const dropped = e.dataTransfer.files?.[0];
            if (dropped) onFile(dropped);
          }}
          className={`flex h-16 cursor-pointer items-center gap-3 rounded-md border border-dashed px-3 transition-colors focus-within:ring-2 focus-within:ring-[#2B3990]/15 ${file ? "pr-11" : ""} ${
            drag
              ? "border-[#2B3990] bg-[#f5f7fc]"
              : error
                ? "border-red-500 bg-white"
                : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          <input
            id="application-resume"
            name="resume"
            type="file"
            accept="application/pdf,.pdf"
            aria-required
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className="sr-only"
            onChange={(e) => {
              const chosen = e.target.files?.[0];
              if (chosen) onFile(chosen);
              // Lets the same file be chosen again after removing it.
              e.target.value = "";
            }}
          />
          <Icon path={file ? FORM_ICONS.file : FORM_ICONS.upload} className={`h-5 w-5 shrink-0 ${file && !error ? "text-emerald-600" : "text-gray-400"}`} />
          <span className="min-w-0 flex-1 text-left">
            {file ? (
              <span className="block truncate text-sm font-medium text-gray-900">{file.name}</span>
            ) : (
              <span className="block text-sm text-gray-700">
                Drag a PDF here, or <span className="font-semibold text-[#2B3990] underline underline-offset-2">browse</span>
              </span>
            )}
            <span className="mt-0.5 block truncate text-xs text-gray-500">
              {file ? `${formatSize(file.size)} · Click to replace` : "PDF only, up to 5 MB"}
            </span>
          </span>
        </label>
        {file && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${file.name}`}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40"
          >
            <Icon path={FORM_ICONS.close} className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

const toOptions = (items: string[]) => items.map((item) => ({ value: item, label: item }));

const EMPTY = { name: "", email: "", phone: "", position: "", location: "", message: "" };
type Step = "idle" | "uploading" | "sending";

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function ApplicationForm() {
  const [form, setForm] = useState(EMPTY);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeProblem, setResumeProblem] = useState<string>();
  const [positions, setPositions] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [touched, setTouched] = useState<Partial<Record<ApplicationField, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<ApplicationErrors>({});
  const [step, setStep] = useState<Step>("idle");
  const [failure, setFailure] = useState("");
  const [sent, setSent] = useState<{ name: string; position: string } | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reducedMotion = useReducedMotion();

  // Open positions and office locations come from the admin database.
  useEffect(() => {
    const titles = async (url: string) => {
      const data = await (await fetch(url)).json();
      return data.success ? (data.data as { title: string }[]).map((item) => item.title) : [];
    };
    Promise.all([titles("/api/job-positions"), titles("/api/locations")])
      .then(([p, l]) => {
        setPositions(p);
        setLocations(l);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  const errors = validateApplication(form);
  // Only list values are accepted once the lists have loaded.
  if (!errors.position && positions.length && !positions.includes(form.position)) errors.position = "Choose a position from the list";
  if (!errors.location && locations.length && !locations.includes(form.location)) errors.location = "Choose a location from the list";
  const errorFor = (field: ApplicationField) =>
    field === "resume" ? resumeProblem : serverErrors[field] || (touched[field] ? errors[field] : undefined);
  const isValid = (field: Exclude<ApplicationField, "resume">) => !!touched[field] && !!form[field].trim() && !errorFor(field);

  const clearFor = (field: ApplicationField) => {
    setServerErrors((e) => ({ ...e, [field]: undefined }));
    setFailure("");
  };
  const setField = (field: keyof typeof EMPTY, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    clearFor(field);
  };
  const touch = (field: ApplicationField) => setTouched((t) => ({ ...t, [field]: true }));
  const textProps = (field: "name" | "email" | "phone" | "message", clean?: (value: string) => string) => ({
    id: `application-${field}`,
    name: field,
    value: form[field],
    maxLength: MAX_LENGTH[field],
    error: errorFor(field),
    valid: isValid(field),
    onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => setField(field, clean ? clean(e.target.value) : e.target.value),
    onBlur: () => touch(field),
  });

  const chooseResume = async (file: File) => {
    setResume(file);
    clearFor("resume");
    setResumeProblem(await resumeError(file));
  };

  const showErrors = (found: ApplicationErrors) => {
    setTouched(Object.fromEntries(APPLICATION_FIELDS.map((field) => [field, true])));
    const first = APPLICATION_FIELDS.find((field) => found[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#application-${first}`)?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFailure("");
    const fileProblem = await resumeError(resume);
    setResumeProblem(fileProblem);
    const found: ApplicationErrors = { ...errors, ...(fileProblem ? { resume: fileProblem } : {}) };
    if (Object.keys(found).length > 0) {
      showErrors(found);
      return;
    }

    try {
      setStep("uploading");
      const upload = await (
        await fetch("/api/upload-resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: await readAsDataUrl(resume!), fileName: resume!.name, website: honeypot.current?.value }),
        })
      ).json();
      if (!upload.success) {
        setResumeProblem(upload.error || "Your résumé could not be uploaded");
        return;
      }

      setStep("sending");
      const data = await (
        await fetch("/api/applicants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, resumeUrl: upload.url, resumeFileName: resume!.name, website: honeypot.current?.value }),
        })
      ).json();
      if (data.success) {
        setSent({ name: form.name.trim().split(/\s+/)[0], position: form.position });
        setForm(EMPTY);
        setResume(null);
        setTouched({});
      } else if (data.fieldErrors) {
        setServerErrors(data.fieldErrors);
        showErrors(data.fieldErrors);
      } else {
        setFailure(data.error || "Your application could not be sent. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setFailure("Your application could not be sent. Please check your connection and try again.");
    } finally {
      setStep("idle");
    }
  };

  const busy = step !== "idle";

  return (
    <motion.div
      id="application-form"
      className="relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:h-[670px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <FormHeader title="Apply now" subtitle="Send us your details and résumé, and our HR team will review your application." subtitleClassName="hidden sm:block" />

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
            <h3 className="text-xl font-bold text-gray-900">Application sent</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-600">
              Thank you, {sent.name}. Our HR team will review your application for {sent.position} and contact you by email or phone.
            </p>
            <button type="button" onClick={() => setSent(null)} className={SECONDARY_BUTTON}>
              Submit another application
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            aria-label="Job application"
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
              <FormField label="Full name" required autoComplete="name" className="sm:col-span-2" {...textProps("name", cleanName)} />
              <FormField label="Email" required type="email" autoComplete="email" autoCapitalize="off" spellCheck={false} {...textProps("email")} />
              {/* Limited after cleaning, so a pasted "0917-111-5008" still fits. */}
              <FormField label="Mobile number" required type="tel" inputMode="numeric" autoComplete="tel" {...textProps("phone", (v) => cleanDigits(v).slice(0, MAX_LENGTH.phone))} maxLength={undefined} />
              <SelectField
                id="application-position"
                name="position"
                label="Position"
                placeholder={loading ? "Loading…" : positions.length ? "Select a position" : "No open positions right now"}
                options={toOptions(positions)}
                value={form.position}
                disabled={loading || !positions.length}
                onChange={(value) => {
                  setField("position", value);
                  touch("position");
                }}
                onBlur={() => touch("position")}
                error={errorFor("position")}
              />
              <SelectField
                id="application-location"
                name="location"
                label="Location"
                placeholder={loading ? "Loading…" : locations.length ? "Select a location" : "No locations available"}
                options={toOptions(locations)}
                value={form.location}
                disabled={loading || !locations.length}
                onChange={(value) => {
                  setField("location", value);
                  touch("location");
                }}
                onBlur={() => touch("location")}
                error={errorFor("location")}
              />
            </div>

            <ResumeDrop
              file={resume}
              error={errorFor("resume")}
              onFile={chooseResume}
              onRemove={() => {
                setResume(null);
                setResumeProblem(touched.resume ? "Attach your résumé" : undefined);
              }}
            />

            <FormField
              label="Message (optional)"
              multiline
              className="flex-1"
              placeholder="Tell us a little about yourself"
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

            <button type="submit" disabled={busy} className={SUBMIT_BUTTON}>
              {busy ? (
                <>
                  <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  {step === "uploading" ? "Uploading résumé..." : "Sending application..."}
                </>
              ) : (
                "Submit application"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
