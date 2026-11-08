import type { Metadata } from "next";
import { CONTACT_EMAIL, Footer, Header } from "../components";
import { ContactForm } from "../contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Alania Energy about power supply, data centers, partnerships or investment.",
  alternates: { canonical: "/contact" },
};
export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;
  return (
    <>
      <Header onDark />
      <main>
        <section className="relative overflow-hidden bg-navy text-white">
          <div className="grid-lines absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
            <p className="eyebrow text-brand-green">Contact</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.08] sm:text-5xl">Let&apos;s talk power.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Tell us about your load, timeline or partnership idea. Our team reads every message and will follow up.
            </p>
          </div>
          <div className="accent-rule relative" />
        </section>
        <section id="contact" className="scroll-mt-4 bg-mist">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3">
            <div className="space-y-6 text-ink/80">
              <div>
                <p className="eyebrow text-ink/50">Email</p>
                <a className="mt-2 block break-all font-semibold underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div>
                <p className="eyebrow text-ink/50">Location</p>
                <p className="mt-2 font-semibold">Cedar City, Utah</p>
              </div>
            </div>
            <div className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-10 lg:col-span-2">
              <ContactForm page="/contact" sent={sent === "1"} error={error} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
