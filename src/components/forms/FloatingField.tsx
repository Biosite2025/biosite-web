"use client";

import React from "react";

// Outline icons (24px grid) used by the site's forms.
export const FORM_ICONS = {
  name: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  email: "M3 6h18v12H3zM3 7l9 7 9-7",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  subject: "M4 7h16M4 12h16M4 17h10",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  briefcase: "M4 7h16v13H4zM9 7V4h6v3M4 12h16",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  upload: "M12 16V4M7 9l5-5 5 5M4 16v4h16v-4",
  file: "M7 3h7l5 5v13H7zM14 3v5h5M9.5 13h5M9.5 17h5",
  close: "M6 6l12 12M18 6L6 18",
  chevron: "M6 9l6 6 6-6",
  check: "M5 13l4 4L19 7",
  alert: "M12 8v5M12 16.5v.5M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

export function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

/**
 * Input with an icon and a label that floats up once the field has a value.
 * An error replaces the label text, so showing one never changes the layout.
 */
export function FloatingField({ id, label, icon, required, error, valid, className, footer, trailing, multiline, ...inputProps }: {
  id: string;
  label: string;
  icon: string;
  required?: boolean;
  error?: string;
  valid?: boolean;
  className?: string;
  /** Rendered inside the field's positioned box, e.g. a counter or a dropdown list. */
  footer?: React.ReactNode;
  /** Replaces the valid/error mark at the right edge. */
  trailing?: React.ReactNode;
  multiline?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errorId = `${id}-error`;
  const shared = {
    id,
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
        <Icon path={icon} className={`pointer-events-none absolute left-3 top-3.5 h-[18px] w-[18px] transition-colors ${error ? "text-red-500" : "text-slate-400 peer-focus:text-[#2B3990]"}`} />
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
        {trailing ??
          ((error || valid) && (
            <Icon path={error ? FORM_ICONS.alert : FORM_ICONS.check} className={`pointer-events-none absolute right-2.5 top-3.5 h-[18px] w-[18px] ${error ? "text-red-500" : "text-emerald-600"}`} />
          ))}
        {footer}
      </div>
    </div>
  );
}
