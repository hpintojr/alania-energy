import Link from "next/link";
import { CONTACT_EMAIL, Footer, Header } from "./components";

export type ServiceContent = {
  eyebrow: string;
  title: string;
  intro: string;
  points: { title: string; body: string }[];
  sections: { heading: string; paras: string[]; bullets?: { title: string; body: string }[] }[];
  related: { href: string; label: string; blurb: string }[];
  cta: { title: string; body: string };
  footnote?: string;
};

export function ServicePage({ c }: { c: ServiceContent }) {
  return (
    <>
      <Header onDark />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy text-white">
          <div className="grid-lines absolute inset-0" aria-hidden />
          <div
            className="absolute inset-y-0 right-0 hidden w-[42%] bg-cover bg-left opacity-60 md:block"
            style={{ backgroundImage: "url(/hero-towers.webp)" }}
            aria-hidden
          />
          <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-r from-navy to-transparent md:block" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
            <p className="eyebrow text-brand-green">{c.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.08] sm:text-5xl">{c.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{c.intro}</p>
          </div>
          <div className="accent-rule relative" />
        </section>

        {/* Key points */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {c.points.map((p) => (
              <div key={p.title} className="rounded-lg border border-line bg-mist p-6">
                <span className="block h-1 w-10 rounded-full bg-brand-green" aria-hidden />
                <h2 className="mt-4 text-lg font-bold">{p.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Detail sections */}
        {c.sections.map((s, i) => (
          <section key={s.heading} className={i % 2 === 0 ? "bg-mist" : "bg-white"}>
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-3">
              <h2 className="text-2xl font-bold sm:text-3xl">{s.heading}</h2>
              <div className="md:col-span-2">
                {s.paras.map((p) => (
                  <p key={p.slice(0, 40)} className="mb-5 text-lg leading-relaxed text-ink/80 last:mb-0">{p}</p>
                ))}
                {s.bullets && (
                  <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <div key={b.title} className="border-l-2 border-brand-blue pl-4">
                        <dt className="font-bold">{b.title}</dt>
                        <dd className="mt-1 leading-relaxed text-ink/75">{b.body}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* Related */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <p className="eyebrow text-brand-blue">Keep exploring</p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {c.related.map((r) => (
                <Link key={r.href} href={r.href} className="group rounded-lg border border-line p-6 transition-colors hover:border-brand-blue">
                  <h3 className="text-lg font-bold">
                    {r.label} <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{r.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{c.cta.title}</h2>
              <p className="mt-3 max-w-xl text-white/75">{c.cta.body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">Email us</a>
              <Link href="/investors" className="btn btn-ghost">Investor Access</Link>
            </div>
          </div>
        </section>

        {c.footnote && (
          <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-ink/55 sm:px-6">{c.footnote}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
