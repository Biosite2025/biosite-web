// Rules for the contact form, shared by the form and the API route so the same
// input is accepted in both places.

export const DEPARTMENTS: Record<string, string> = {
  quotation: 'Quotation',
  sales: 'Sales',
  technical_service: 'Technical Service',
  marketing: 'Marketing',
};

export const REGIONS: Record<string, string> = {
  luzon: 'Luzon',
  vismin: 'VisMin',
};

export const MAX_LENGTH = { name: 100, email: 254, phone: 25, subject: 180, message: 2000 };

export const CONTACT_FIELDS = ['department', 'location', 'name', 'email', 'phone', 'subject', 'message'] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Removes characters a name can't contain, as the visitor types. */
export const cleanName = (value: string) => value.replace(/[^\p{L}\p{M} .'’-]/gu, '');

/** Removes characters a phone number can't contain, as the visitor types. */
export const cleanPhone = (value: string) =>
  value.replace(/[^\d+() -]/g, '').replace(/(?!^)\+/g, '');

const NAME = /^[\p{L}\p{M}]+(?:[ .'’-]+[\p{L}\p{M}]+)*\.?$/u;
const EMAIL = /^[a-z0-9._%+'-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
const LETTER = /\p{L}/u;
// One character over and over, such as "aaaaaa".
const REPEATED = /^([\s\S])\1*$/u;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!Object.hasOwn(DEPARTMENTS, values.department)) errors.department = 'Choose a team';
  if (!Object.hasOwn(REGIONS, values.location)) errors.location = 'Choose your region';

  if (!name) errors.name = 'Enter your name';
  else if (name.length > MAX_LENGTH.name) errors.name = `Use ${MAX_LENGTH.name} characters or fewer`;
  else if (name.length < 2 || !NAME.test(name) || REPEATED.test(name)) {
    errors.name = 'Letters only, at least 2';
  }

  if (!email) errors.email = 'Enter your email';
  else if (email.length > MAX_LENGTH.email || !EMAIL.test(email) || /\.\.|^\.|\.@/.test(email)) {
    errors.email = 'Enter a valid email address';
  }

  if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (phone.length > MAX_LENGTH.phone || digits.length < 7 || digits.length > 15 || cleanPhone(phone) !== phone) {
      errors.phone = 'Enter a valid phone number';
    }
  }

  if (subject) {
    if (subject.length > MAX_LENGTH.subject) errors.subject = `Use ${MAX_LENGTH.subject} characters or fewer`;
    else if (subject.length < 3 || !LETTER.test(subject)) errors.subject = 'Use words, not just numbers';
  }

  if (!message) errors.message = 'Enter your message';
  else if (message.length > MAX_LENGTH.message) errors.message = `Use ${MAX_LENGTH.message} characters or fewer`;
  else if (message.length < 10 || !LETTER.test(message) || REPEATED.test(message)) {
    errors.message = 'Please write at least 10 characters';
  }

  return errors;
}
