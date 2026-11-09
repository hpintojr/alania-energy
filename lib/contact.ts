import { neon } from "@neondatabase/serverless";

export const CRM_LOCATION_ID = "XbX1MnjeeSAgS6bEaJ0j"; // XBeton sub-account
export const INTERESTS = [
  "Power supply for a large load",
  "Research or industrial space",
  "Investment",
  "Partnership",
  "Media",
  "Other",
] as const;

export type ContactInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
  consent: boolean;
  page: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: FormDataEntryValue | null, max: number) =>
  (typeof v === "string" ? v : "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);

export function parseContact(form: FormData): { ok: true; data: ContactInput } | { ok: false; error: string } {
  const data: ContactInput = {
    firstName: clean(form.get("firstName"), 80),
    lastName: clean(form.get("lastName"), 80),
    email: clean(form.get("email"), 200).toLowerCase(),
    phone: clean(form.get("phone"), 40),
    company: clean(form.get("company"), 120),
    interest: clean(form.get("interest"), 60),
    message: (typeof form.get("message") === "string" ? (form.get("message") as string) : "").trim().slice(0, 4000),
    consent: form.get("consent") === "yes",
    page: clean(form.get("page"), 100) || "/",
  };
  if (!data.firstName) return { ok: false, error: "name" };
  if (!EMAIL_RE.test(data.email)) return { ok: false, error: "email" };
  if (data.phone && !/^[0-9+().\-\s]{7,40}$/.test(data.phone)) return { ok: false, error: "phone" };
  if (!data.consent) return { ok: false, error: "consent" };
  if (!(INTERESTS as readonly string[]).includes(data.interest)) data.interest = "Other";
  return { ok: true, data };
}

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return neon(url);
}

/** Too many submissions from one IP in the last hour. Fails open (never blocks a real lead because the DB hiccuped). */
export async function tooMany(ip: string): Promise<boolean> {
  try {
    const rows = await sql()`SELECT count(*)::int AS n FROM contact_submissions WHERE ip = ${ip} AND created_at > now() - interval '1 hour'`;
    return Number(rows[0]?.n ?? 0) >= 5;
  } catch {
    return false;
  }
}

export async function saveSubmission(d: ContactInput, ip: string, ua: string): Promise<number | null> {
  try {
    const rows = await sql()`
      INSERT INTO contact_submissions (first_name, last_name, email, phone, company, interest, message, consent, page, ip, user_agent)
      VALUES (${d.firstName}, ${d.lastName || null}, ${d.email}, ${d.phone || null}, ${d.company || null}, ${d.interest}, ${d.message || null}, ${d.consent}, ${d.page}, ${ip}, ${ua})
      RETURNING id`;
    return Number(rows[0]?.id ?? 0) || null;
  } catch (err) {
    console.error("[contact] save failed", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function markCrm(id: number | null, status: string, detail: string) {
  if (!id) return;
  try {
    await sql()`UPDATE contact_submissions SET crm_status = ${status}, crm_detail = ${detail.slice(0, 500)} WHERE id = ${id}`;
  } catch (err) {
    console.error("[contact] status update failed", err instanceof Error ? err.message : err);
  }
}

/** Forwards to the XBeton CRM inbound-webhook workflow. Flat, predictable field names for mapping in the builder. */
export async function forwardToCrm(d: ContactInput, submissionId: number | null): Promise<{ status: string; detail: string }> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return { status: "not_configured", detail: "CRM_WEBHOOK_URL not set" };
  const payload = {
    locationId: CRM_LOCATION_ID,
    source: "website",
    sourceSite: "alaniaenergy.com",
    tags: ["alania-energy", "alania-website-form"],
    firstName: d.firstName,
    lastName: d.lastName,
    fullName: [d.firstName, d.lastName].filter(Boolean).join(" "),
    email: d.email,
    phone: d.phone,
    companyName: d.company,
    interest: d.interest,
    message: d.message,
    consentToContact: d.consent,
    page: d.page,
    submissionId,
    submittedAt: new Date().toISOString(),
  };
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (process.env.CRM_WEBHOOK_SECRET) headers["x-webhook-secret"] = process.env.CRM_WEBHOOK_SECRET;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(payload), signal: ctrl.signal });
    clearTimeout(t);
    const text = (await res.text().catch(() => "")).slice(0, 200);
    return res.ok ? { status: "sent", detail: `${res.status}` } : { status: "failed", detail: `${res.status} ${text}` };
  } catch (err) {
    return { status: "failed", detail: err instanceof Error ? err.message : "error" };
  }
}
