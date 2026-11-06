// Rules for the careers application form, shared by the form and the API route.
import { emailError, nameError } from './contactValidation';

export const APPLICATION_FIELDS = ['name', 'email', 'phone', 'position', 'location', 'resume', 'message'] as const;
export type ApplicationField = (typeof APPLICATION_FIELDS)[number];
export type ApplicationValues = Record<Exclude<ApplicationField, 'resume'>, string>;
export type ApplicationErrors = Partial<Record<ApplicationField, string>>;

export const MAX_LENGTH = { name: 100, email: 254, phone: 11, position: 150, location: 150, message: 2000 };
export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

/** Keeps only digits, as the visitor types a mobile number. */
export const cleanDigits = (value: string) => value.replace(/\D/g, '');

export function validateApplication(values: ApplicationValues): ApplicationErrors {
  const errors: ApplicationErrors = {};
  const name = nameError(values.name.trim());
  if (name) errors.name = name;
  const email = emailError(values.email.trim());
  if (email) errors.email = email;

  const phone = values.phone.trim();
  if (!phone) errors.phone = 'Enter your mobile number';
  else if (!/^09\d{9}$/.test(phone)) errors.phone = 'Enter 11 digits, starting with 09';

  const position = values.position.trim();
  if (!position) errors.position = 'Choose a position';
  else if (position.length > MAX_LENGTH.position) errors.position = 'Choose a position from the list';

  const location = values.location.trim();
  if (!location) errors.location = 'Choose a location';
  else if (location.length > MAX_LENGTH.location) errors.location = 'Choose a location from the list';

  if (values.message.trim().length > MAX_LENGTH.message) errors.message = `Use ${MAX_LENGTH.message} characters or fewer`;
  return errors;
}

/** Checks a chosen résumé file in the browser. */
export async function resumeError(file: File | null) {
  if (!file) return 'Attach your résumé';
  if (file.size > MAX_RESUME_BYTES) return 'The file is over 5 MB';
  const header = await file.slice(0, 5).text();
  if (header !== '%PDF-') return 'Attach a PDF file';
}
