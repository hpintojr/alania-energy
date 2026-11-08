import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CONTACT_EMAIL, Footer, Header } from "../components";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { BROCHURE, DECK_CONTENTS, HIGHLIGHTS } from "@/lib/brochure";

export const metadata: Metadata = {
  title: "Investor Access",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

function Message({ error }: { error?: string }) {
  if (error === "invalid") {
    return (
      <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        That access code was not recognized. Questions:{" "}
        <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    );
  }
  if (error === "paused") {
    return (
      <p role="alert" className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Access is paused for a few minutes. Questions:{" "}
        <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    );
  }
  return null;
}

function Downloads({ compact = false, onDark = false }: { compact?: boolean; onDark?: boolean }) {
  const f = BROCHURE.files;
  return (
    <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
      <a href="/api/brochure/download?format=pdf" className="btn btn-primary w-full" download={f.pdf.fileName}>
        Download PDF <span className="text-sm font-medium opacity-80">({f.pdf.sizeLabel})</span>
      </a>
      <a href="/api/brochure/download?format=pptx" className={`btn w-full ${onDark ? "btn-ghost" : "btn-navy"}`} download={f.pptx.fileName}>
        Download PowerPoint <span className="text-sm font-medium opacity-80">({f.pptx.sizeLabel})</span>
      </a>
    </div>
  );
}

function Locked({ error }: { error?: string }) {
  return (
    <section className="bg-mist">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-start">
        {/* Teaser */}
        <div>
          <p className="eyebrow text-brand-green">Investor Briefing</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            {BROCHURE.title}
            <span className="block text-xl font-semibold text-ink/65 sm:text-2xl">{BROCHURE.subtitle}</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/80">
            A {BROCHURE.pages}-page briefing on the Cedar City Energy Campus, a private ownership platform for scaled
            energy infrastructure and data-center growth in Cedar City, Utah.
          </p>
          <p className="mt-8 eyebrow text-ink/50">What&apos;s inside</p>
          <ol className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {DECK_CONTENTS.map((t, i) => (
              <li key={t} className="flex items-baseline gap-3 text-ink/80">
                <span className="display w-6 shrink-0 text-sm font-bold text-brand-blue">{String(i + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-ink/60">Available as PDF or PowerPoint once unlocked.</p>
        </div>

        {/* Gate */}
        <div className="rounded-lg border border-line bg-white p-7 shadow-sm sm:p-10">
          <h2 className="text-2xl font-bold">Enter your access code</h2>
          <p className="mt-3 text-ink/75">
            This material is confidential and intended for invited parties. Enter the access code you were given.
          </p>
          <form action="/api/brochure/unlock" method="post" className="mt-6">
            <label htmlFor="code" className="sr-only">Access code</label>
            <input
              id="code"
              name="code"
              type="password"
              className="field"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              maxLength={200}
              required
              placeholder="Access code"
            />
            <button type="submit" className="btn btn-navy mt-4 w-full">Unlock briefing</button>
          </form>
          <Message error={error} />
          <p className="mt-8 text-center text-sm text-ink/60">
            Need access? <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Unlocked() {
  const h = HIGHLIGHTS;
  return (
    <>
      {/* Header band */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-5 lg:items-end">
          <div className="lg:col-span-3">
            <p className="eyebrow text-brand-green">Unlocked · Confidential</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              {BROCHURE.title}
              <span className="block text-xl font-semibold text-white/70 sm:text-2xl">{BROCHURE.subtitle}</span>
            </h1>
            <p className="mt-4 text-sm text-white/60">
              Dated {BROCHURE.dated}. Confidential, for discussion purposes only.
            </p>
          </div>
          <div className="lg:col-span-2">
            <Downloads compact onDark />
          </div>
        </div>
        <div className="accent-rule relative" />
      </section>

      {/* Headline stats */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="max-w-3xl text-2xl font-bold sm:text-3xl">{h.headline}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {h.stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-line bg-mist p-6">
                <p className="display text-3xl font-extrabold text-brand-blue">{s.value}</p>
                <p className="mt-1 font-bold">{s.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones + site */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Development milestones</h2>
            <table className="mt-6 w-full overflow-hidden rounded-lg bg-white text-left text-[15px]">
              <tbody>
                {h.milestones.map((m) => (
                  <tr key={m.item} className="border-b border-line last:border-0">
                    <th scope="row" className="px-4 py-3 font-semibold">{m.item}</th>
                    <td className="px-4 py-3 text-right font-semibold text-brand-green">{m.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Site infrastructure</h2>
            <ul className="mt-6 space-y-3">
              {h.site.map((s) => (
                <li key={s} className="flex gap-3 rounded-lg bg-white px-4 py-3 text-[15px]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Opportunity */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Equity investment opportunity</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {h.opportunity.map((o) => (
              <div key={o.title} className="border-l-2 border-brand-blue pl-4">
                <dt className="font-bold">{o.title}</dt>
                <dd className="mt-1 leading-relaxed text-ink/75">{o.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Next steps + downloads */}
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Path to financial close</h2>
            <ol className="mt-6 space-y-3">
              {h.nextSteps.map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green font-bold">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-white/70">
              To begin, email <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </div>
          <div className="rounded-lg bg-white/5 p-6 sm:p-8">
            <p className="font-bold">Get the full {BROCHURE.pages}-page briefing</p>
            <p className="mt-1 mb-5 text-sm text-white/65">Choose the format that suits you.</p>
            <Downloads compact onDark />
            <form action="/api/brochure/lock" method="post" className="mt-6 text-center">
              <button type="submit" className="text-sm font-semibold text-white/60 underline-offset-4 hover:underline">
                Lock this page
              </button>
            </form>
          </div>
        </div>
      </section>

      <p className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-ink/55 sm:px-6">
        Highlights are summarized from the briefing dated {BROCHURE.dated} and are subject to change. This material is
        confidential and is not an offer to sell or a solicitation of an offer to buy securities.
      </p>
    </>
  );
}

export default async function InvestorsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const jar = await cookies();
  const unlocked = verifyToken(jar.get(COOKIE_NAME)?.value);

  return (
    <>
      <Header />
      <main>{unlocked ? <Unlocked /> : <Locked error={error} />}</main>
      <Footer />
    </>
  );
}
