import { CONTACT_EMAIL } from "./components";
import { INTERESTS } from "@/lib/contact";

const ERRORS: Record<string, string> = {
  name: "Please enter your first name.",
  email: "Please enter a valid email address.",
  phone: "Please check your phone number.",
  consent: "Please confirm we may contact you.",
  busy: "We received several messages from your connection. Please try again later or email us.",
  server: "Something went wrong on our side. Please email us instead.",
  invalid: "Something went wrong. Please try again.",
};

export function ContactForm({ page, sent, error }: { page: string; sent?: boolean; error?: string }) {
  if (sent) {
    return (
      <div role="status" className="rounded-lg border border-brand-green/30 bg-brand-green/10 p-8">
        <h3 className="text-xl font-bold">Thank you. Your message is in.</h3>
        <p className="mt-2 text-ink/75">
          Our team will follow up shortly. If it is urgent, email{" "}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    );
  }
  const label = "mb-1.5 block text-sm font-semibold text-ink/80";
  return (
    <form action="/api/contact" method="post" className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      <input type="hidden" name="page" value={page} />
      {/* Honeypot (hidden from people and screen readers) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {error && ERRORS[error] && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2">
          {ERRORS[error]}
        </p>
      )}

      <div>
        <label htmlFor="firstName" className={label}>First name *</label>
        <input id="firstName" name="firstName" required maxLength={80} autoComplete="given-name" className="field" />
      </div>
      <div>
        <label htmlFor="lastName" className={label}>Last name</label>
        <input id="lastName" name="lastName" maxLength={80} autoComplete="family-name" className="field" />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email *</label>
        <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className="field" />
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone</label>
        <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className="field" />
      </div>
      <div>
        <label htmlFor="company" className={label}>Company</label>
        <input id="company" name="company" maxLength={120} autoComplete="organization" className="field" />
      </div>
      <div>
        <label htmlFor="interest" className={label}>I&apos;m interested in</label>
        <select id="interest" name="interest" className="field" defaultValue="">
          <option value="" disabled>Select one</option>
          {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" rows={5} maxLength={4000} className="field !min-h-32" />
      </div>
      <label className="flex items-start gap-3 text-sm text-ink/75 sm:col-span-2">
        <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 accent-[#0752bc]" />
        <span>I agree that Alania Energy may contact me about my inquiry by email or phone.</span>
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-navy w-full sm:w-auto">Send message</button>
      </div>
    </form>
  );
}
