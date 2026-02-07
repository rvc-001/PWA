/**
 * Client-side validation helpers. No external APIs.
 */

export function required(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

export function minLength(value: string, n: number): boolean {
  return value.trim().length >= n;
}

export function maxLength(value: string, n: number): boolean {
  return value.length <= n;
}

export function email(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function phone(value: string): boolean {
  return /^[\d\s+()-]{10,}$/.test(value.replace(/\s/g, ""));
}

export function url(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function dateMMYYYY(value: string): boolean {
  return /^(0[1-9]|1[0-2])\/\d{4}$/.test(value.trim());
}

export function pinCode(value: string): boolean {
  return /^\d{6}$/.test(value.trim());
}

export type ValidationResult = { ok: true } | { ok: false; message: string };

export function validateOrgBasic(data: {
  name?: string;
  description?: string;
  establishedYear?: string;
}): ValidationResult {
  if (!required(data.name)) return { ok: false, message: "Organization name is required" };
  if (data.establishedYear && !dateMMYYYY(data.establishedYear))
    return { ok: false, message: "Established year must be MM/YYYY" };
  return { ok: true };
}

export function validateOrgContact(data: { email?: string; phone?: string; website?: string }): ValidationResult {
  if (data.email && !email(data.email)) return { ok: false, message: "Invalid email" };
  if (data.phone && !phone(data.phone)) return { ok: false, message: "Invalid phone number" };
  if (data.website && data.website.trim() && !url(data.website)) return { ok: false, message: "Invalid website URL" };
  return { ok: true };
}

export function validateTournamentBasic(data: { name?: string; startDate?: string }): ValidationResult {
  if (!required(data.name)) return { ok: false, message: "Tournament name is required" };
  if (data.startDate && isNaN(Date.parse(data.startDate)))
    return { ok: false, message: "Invalid start date" };
  return { ok: true };
}
