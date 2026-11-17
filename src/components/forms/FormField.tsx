"use client";

import React from "react";

// Outline icons (24px grid) used by the site's forms.
export const FORM_ICONS = {
  upload: "M12 16V4M7 9l5-5 5 5M4 16v4h16v-4",
  file: "M7 3h7l5 5v13H7zM14 3v5h5M9.5 13h5M9.5 17h5",
  close: "M6 6l12 12M18 6L6 18",
  chevron: "M6 9l6 6 6-6",
  check: "M5 13l4 4L19 7",
  alert: "M12 8v5M12 16.5v.5M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
};

export function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const CONTROL =
  "block w-full rounded-md border bg-white px-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition-colors duration-150 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 lg:text-sm";
export const controlState = (error?: string) =>
  error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
    : "border-gray-300 hover:border-gray-400 focus:border-[#2B3990] focus:ring-[#2B3990]/15";

/** Label above the control; an error shows on the same line, so it never moves the layout. */
export function FieldLabel({ htmlFor, label, required, error, errorId }: { htmlFor: string; label: string; required?: boolean; error?: string; errorId: string }) {
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

/** Standard text input or textarea with its label above. */
export function FormField({ id, label, required, error, valid, multiline, className, footer, ...props }: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  valid?: boolean;
  multiline?: boolean;
  className?: string;
  /** Rendered inside the control's positioned box, e.g. a character counter. */
  footer?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errorId = `${id}-error`;
  const shared = {
    id,
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

/** Standard native dropdown with its label above and a placeholder option. */
export function SelectField({ id, name, label, placeholder, options, value, error, onChange, onBlur, disabled, className }: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} label={label} required error={error} errorId={errorId} />
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-required
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${CONTROL} ${controlState(error)} h-10 cursor-pointer appearance-none truncate pr-9 ${value ? "" : "text-gray-400"}`}
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

/** Plain card header used by the site's forms. */
export function FormHeader({ title, subtitle, subtitleClassName = "" }: { title: string; subtitle: string; subtitleClassName?: string }) {
  return (
    <div className="border-b border-gray-200 px-5 pb-3 pt-4">
      <h2 className="text-xl font-bold leading-tight text-[#2B3990] lg:text-2xl">{title}</h2>
      <p className={`mt-0.5 text-sm text-gray-600 ${subtitleClassName}`}>{subtitle}</p>
    </div>
  );
}

export const SUBMIT_BUTTON =
  "flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#2B3990] text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#232f78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990] disabled:cursor-not-allowed disabled:opacity-70";

export const SECONDARY_BUTTON =
  "mt-6 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]";
