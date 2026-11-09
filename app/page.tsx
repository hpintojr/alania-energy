import Link from "next/link";
import { CONTACT_EMAIL, Footer, Header } from "./components";
import { ContactForm } from "./contact-form";

export const dynamic = "force-dynamic";

const CAPABILITIES = [
  {
    title: "Natural Gas Generation",
    href: "/natural-gas",
    body: "Utility-scale natural gas generation designed for reliable, dispatchable baseload power.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s0 2 2 2c0-3-1-5 1-8z" />
      </svg>
    ),
  },
  {
    title: "Nuclear",
    href: "/nuclear",
    body: "Advanced nuclear as the long-term green power source in the campus generation mix.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2.5a9.5 9.5 0 0 1 8.2 4.75L15.5 10a4 4 0 0 0-7 0L3.8 7.25A9.5 9.5 0 0 1 12 2.5z" />
        <path d="M3.8 16.75 8.5 14a4 4 0 0 0 3.5 2v5.5a9.5 9.5 0 0 1-8.2-4.75z" />
        <path d="M20.2 16.75A9.5 9.5 0 0 1 12 21.5V16a4 4 0 0 0 3.5-2z" />
      </svg>
    ),
  },
  {
    title: "Proven Technology",
    href: "/technology",
    body: "Generation designed around GE turbine technology, proven in power applications worldwide.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 9.5c0-4 2-6.5 5-7-1 3-2 5-5 7z" />
        <path d="M14.2 13.2c3.5 2 5.5 4 5.8 7-3-1-5-2.5-5.8-7z" />
        <path d="M9.8 13.2c-3.5 2-5.5 4-5.8 7 3-1 5-2.5 5.8-7z" />
      </svg>
    ),
  },
];

const INFRA = ["Power", "Water", "Natural Gas", "Fiber", "Rail"];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;
  return (
    <>
      <Header onDark />
      <main id="main" tabIndex={-1}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy text-white">
          <div className="grid-lines absolute inset-0" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/turbine.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[2%] top-1/2 hidden w-[45%] max-w-[760px] -translate-y-1/2 opacity-90 lg:block"
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
            <p className="eyebrow text-brand-green">Cedar City, Utah</p>
            <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Powering the next generation of industry.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Alania Energy is a power energy company developing large-scale natural gas and nuclear
              generation in Cedar City, Utah.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/investors" className="btn btn-primary">Investor Access</Link>
              <Link href="/contact" className="btn btn-ghost">Contact us</Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/art/turbine.svg" alt="" aria-hidden className="mt-12 w-full opacity-80 lg:hidden" />
          </div>
          <div className="accent-rule relative" />
        </section>

        {/* What we do */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="eyebrow text-brand-blue">What we do</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">Reliable power, built for scale.</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {CAPABILITIES.map((c) => (
                <Link key={c.title} href={c.href} className="group rounded-lg border border-line bg-mist p-7 transition-colors hover:border-brand-blue">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-navy text-brand-green">{c.icon}</div>
                  <h3 className="mt-6 text-xl font-bold">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/75">{c.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                    Learn more <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Green */}
        <section className="relative overflow-hidden bg-navy text-white">
          <div className="grid-lines absolute inset-0" aria-hidden />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-brand-green">Green Technology</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Green by design.</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/80">
                The Cedar City Energy Campus is being developed around green technology: green buildings with on-site
                power, and planned carbon capture and waste-to-nanocarbon processes designed to reduce carbon and lock it away.
              </p>
              <Link href="/green-technology" className="btn btn-primary mt-8">Explore green technology</Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                ["Green buildings", "Planned with insulating XBeton AAC block."],
                ["Green research & industry", "AAC buildings with power generated on site."],
                ["Carbon capture", "Planned to remove CO2 from generation exhaust."],
                ["Waste to nanocarbon", "Carbon locked into durable building materials."],
              ].map(([t, b]) => (
                <li key={t} className="rounded-lg border border-white/10 bg-white/5 p-5">
                  <span className="block h-1 w-10 rounded-full bg-brand-green" aria-hidden />
                  <p className="mt-3 font-bold">{t}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-white/75">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Campus */}
        <section className="bg-mist">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <p className="eyebrow text-green-ink">Now in development</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Cedar City Energy Campus</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
                An energy campus in Cedar City, Utah, designed to serve a planned research facility and
                industrial space, planned around access to power, water, gas, fiber and rail.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/campus" className="btn btn-navy">About the campus</Link>
                <Link href="/research-industrial" className="btn border border-navy/20 text-ink hover:bg-white">Research &amp; industrial space</Link>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-lg bg-navy p-7 text-white">
                <p className="eyebrow text-white/60">Planned infrastructure</p>
                <ul className="mt-4 divide-y divide-white/10">
                  {INFRA.map((i) => (
                    <li key={i} className="flex items-center gap-3 py-3 font-semibold">
                      <span className="h-2 w-2 rounded-full bg-brand-green" aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-4 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-3">
            <div>
              <p className="eyebrow text-brand-blue">Contact</p>
              <h2 className="mt-3 text-3xl font-bold">Get in touch</h2>
              <p className="mt-3 text-ink/75">
                Planning a large load, exploring a partnership, or have a question? Send us a note and our team will follow up.
              </p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-navy mt-6 w-full break-all sm:w-auto">{CONTACT_EMAIL}</a>
              <p className="mt-6 text-sm text-ink/65">
                <span className="font-semibold text-ink">Cedar City, Utah.</span> Received an investor access code?{" "}
                <Link className="underline" href="/investors">Go to Investor Access</Link>.
              </p>
            </div>
            <div className="lg:col-span-2">
              <ContactForm page="/" sent={sent === "1"} error={error} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
