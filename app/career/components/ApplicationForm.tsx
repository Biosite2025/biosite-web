"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FORM_ICONS, FloatingField, Icon } from "@/src/components/forms/FloatingField";
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

/** Accessible type-to-filter dropdown: arrow keys, Enter and Escape work as in a native list. */
function Combobox({ id, label, icon, options, value, onChange, onBlur, error, loading, unavailable }: {
  id: string;
  label: string;
  icon: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  loading: boolean;
  unavailable: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = `${id}-list`;
  const filtered = query ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase())) : options;

  useEffect(() => {
    if (open) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  const show = () => {
    setOpen(true);
    setQuery("");
    setActive(Math.max(0, options.indexOf(value)));
  };
  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
    setQuery("");
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return show();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (filtered.length ? (i + step + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      if (filtered[active]) choose(filtered[active]);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <FloatingField
      id={id}
      name={id}
      label={label}
      icon={icon}
      required
      error={error}
      role="combobox"
      aria-expanded={open}
      aria-controls={listId}
      aria-autocomplete="list"
      aria-activedescendant={open && filtered[active] ? `${listId}-${active}` : undefined}
      autoComplete="off"
      value={open ? query : value}
      onChange={(e) => {
        setQuery(e.target.value);
        setOpen(true);
        setActive(0);
      }}
      onFocus={show}
      onClick={() => !open && show()}
      onBlur={() => {
        setOpen(false);
        setQuery("");
        onBlur();
      }}
      onKeyDown={onKeyDown}
      className="col-span-12 sm:col-span-6"
      trailing={<Icon path={FORM_ICONS.chevron} className={`pointer-events-none absolute right-2.5 top-3.5 h-[18px] w-[18px] transition-transform ${error ? "text-red-500" : "text-slate-400"} ${open ? "rotate-180" : ""}`} />}
      footer={
        open && (
          <ul
            id={listId}
            role="listbox"
            aria-label={label}
            // Keeps focus in the input while choosing with the mouse.
            onMouseDown={(e) => e.preventDefault()}
            className="custom-scrollbar absolute left-0 right-0 top-full z-30 mt-1 max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-[0_16px_32px_-12px_rgba(43,57,144,0.35)]"
          >
            {loading ? (
              <li className="px-3 py-2 text-sm text-slate-500">Loading…</li>
            ) : filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-slate-500">{options.length ? "No matches" : unavailable}</li>
            ) : (
              filtered.map((option, i) => (
                <li
                  key={option}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={option === value}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(option)}
                  className={`flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm ${i === active ? "bg-[#eef1fb] text-[#2B3990]" : "text-gray-800"} ${option === value ? "font-semibold" : ""}`}
                >
                  {option}
                  {option === value && <Icon path={FORM_ICONS.check} className="h-4 w-4 shrink-0 text-[#2B3990]" />}
                </li>
              ))
            )}
          </ul>
        )
      }
    />
  );
}

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
    <div className="relative">
      <label
        htmlFor="application-resume"
        onDragEnter={(e) => onDrag(e, true)}
        onDragOver={(e) => onDrag(e, true)}
        onDragLeave={(e) => onDrag(e, false)}
        onDrop={(e) => {
          onDrag(e, false);
          const dropped = e.dataTransfer.files?.[0];
          if (dropped) onFile(dropped);
        }}
        className={`flex h-[84px] cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed px-4 transition-colors focus-within:ring-2 focus-within:ring-[#2B3990]/20 ${file ? "pr-12" : ""} ${
          drag
            ? "border-[#2B3990] bg-[#eef1fb]"
            : error
              ? "border-red-400 bg-red-50/40"
              : file
                ? "border-emerald-300 bg-emerald-50/40"
                : "border-slate-300 bg-slate-50/70 hover:border-[#2B3990]/50 hover:bg-[#f5f7fc]"
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
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${error ? "bg-red-100 text-red-600" : file ? "bg-emerald-100 text-emerald-700" : "bg-[#eef1fb] text-[#2B3990]"}`}>
          <Icon path={file ? FORM_ICONS.file : FORM_ICONS.upload} className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1 text-left">
          {file ? (
            <span className="block truncate text-sm font-semibold text-gray-900">{file.name}</span>
          ) : (
            <span className="block text-sm font-semibold text-gray-800">
              Drag your résumé here, or <span className="text-[#2B3990] underline underline-offset-2">browse</span>
              <span aria-hidden="true" className="ml-0.5 text-red-600">*</span>
            </span>
          )}
          <span id={error ? errorId : undefined} className={`mt-0.5 block truncate text-xs ${error ? "font-semibold text-red-600" : "text-slate-500"}`}>
            {error || (file ? `${formatSize(file.size)} · Click to replace` : "PDF only, up to 5 MB")}
          </span>
        </span>
      </label>
      {file && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${file.name}`}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-white hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40"
        >
          <Icon path={FORM_ICONS.close} className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

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
      className="relative flex flex-col rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(43,57,144,0.35)] ring-1 ring-slate-200/70 lg:h-[670px]"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#2B3990] via-[#2B3990] to-blue-600 px-5 py-4">
        <span aria-hidden="true" className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/10" />
        <span aria-hidden="true" className="absolute -bottom-16 right-24 h-28 w-28 rounded-full bg-white/10" />
        <h2 className="relative text-xl font-bold leading-tight text-white lg:text-2xl">Apply now</h2>
        <p className="relative mt-0.5 hidden text-sm text-blue-100 sm:block">Send us your details and résumé, and our HR team will review your application.</p>
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
              <Icon path={FORM_ICONS.check} className="h-8 w-8" />
            </span>
            <h3 className="text-2xl font-bold text-[#2B3990]">Application sent</h3>
            <p className="mt-2 max-w-sm text-gray-600">
              Thank you, {sent.name}. Our HR team will review your application for {sent.position} and contact you by email or phone.
            </p>
            <button
              type="button"
              onClick={() => setSent(null)}
              className="mt-6 rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-[#2B3990] transition-colors hover:border-[#2B3990] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
            >
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
            className="flex min-h-0 flex-1 flex-col gap-3 p-5"
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

            <div className="grid grid-cols-12 gap-3">
              <FloatingField label="Full name" required autoComplete="name" icon={FORM_ICONS.name} className="col-span-12" {...textProps("name", cleanName)} />
              <FloatingField label="Email" required type="email" autoComplete="email" autoCapitalize="off" spellCheck={false} icon={FORM_ICONS.email} className="col-span-12 sm:col-span-6" {...textProps("email")} />
              {/* Limited after cleaning, so a pasted "0917-111-5008" still fits. */}
              <FloatingField label="Mobile number" required type="tel" inputMode="numeric" autoComplete="tel" icon={FORM_ICONS.phone} className="col-span-12 sm:col-span-6" {...textProps("phone", (v) => cleanDigits(v).slice(0, MAX_LENGTH.phone))} maxLength={undefined} />
              <Combobox
                id="application-position"
                label="Position"
                icon={FORM_ICONS.briefcase}
                options={positions}
                value={form.position}
                onChange={(value) => setField("position", value)}
                onBlur={() => touch("position")}
                error={errorFor("position")}
                loading={loading}
                unavailable="No open positions right now"
              />
              <Combobox
                id="application-location"
                label="Location"
                icon={FORM_ICONS.pin}
                options={locations}
                value={form.location}
                onChange={(value) => setField("location", value)}
                onBlur={() => touch("location")}
                error={errorFor("location")}
                loading={loading}
                unavailable="No locations available"
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

            <FloatingField
              label="Message (optional)"
              multiline
              icon={FORM_ICONS.message}
              className="min-h-0 flex-1"
              {...textProps("message")}
              footer={
                <span className={`pointer-events-none absolute bottom-1 right-2.5 text-[11px] ${form.message.length >= MAX_LENGTH.message ? "font-semibold text-red-600" : "text-slate-500"}`}>
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
              disabled={busy}
              className="group relative flex h-12 w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#2B3990] to-blue-600 text-base font-semibold text-white shadow-md shadow-[#2B3990]/25 transition-shadow duration-200 hover:shadow-lg hover:shadow-[#2B3990]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span aria-hidden="true" className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/20 opacity-0 transition-all duration-500 group-hover:left-full group-hover:opacity-100" />
              {busy ? (
                <>
                  <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  {step === "uploading" ? "Uploading résumé..." : "Sending application..."}
                </>
              ) : (
                <>
                  Submit application
                  <Icon path={FORM_ICONS.arrow} className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
