import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Footer, Header } from "../components";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { BROCHURE } from "@/lib/brochure";

export const metadata: Metadata = {
  title: "Investor Access",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const CONTACT = "information@alaniaenergy.com";

function Message({ error }: { error?: string }) {
  if (error === "invalid") {
    return (
      <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        That access code was not recognized. Questions:{" "}
        <a className="underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>
      </p>
    );
  }
  if (error === "paused") {
    return (
      <p role="alert" className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Access is paused for a few minutes. Questions:{" "}
        <a className="underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>
      </p>
    );
  }
  return null;
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
      <main className="bg-mist">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 py-14 sm:px-6">
          <div className="mx-auto w-full max-w-lg rounded-lg border border-line bg-white p-7 shadow-sm sm:p-10">
            {unlocked ? (
              <>
                <p className="eyebrow text-brand-green">Unlocked</p>
                <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                  {BROCHURE.title}
                  <span className="block text-lg font-semibold text-ink/70 sm:text-xl">{BROCHURE.subtitle}</span>
                </h1>
                <p className="mt-3 text-sm text-ink/60">
                  Dated {BROCHURE.dated}. Confidential, for discussion purposes only.
                </p>
                <ul className="mt-6 space-y-2 text-ink/80">
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />The project has crossed the highest-risk development gates</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />Development milestones are substantially complete</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />Path to financial close</li>
                </ul>
                <a href="/api/brochure/download" className="btn btn-primary mt-8 w-full" download={BROCHURE.fileName}>
                  Download PDF
                </a>
                <p className="mt-3 text-center text-xs text-ink/55">
                  {BROCHURE.fileName} · {BROCHURE.pages} pages · {BROCHURE.sizeLabel}
                </p>
                <form action="/api/brochure/lock" method="post" className="mt-8 text-center">
                  <button type="submit" className="text-sm font-semibold text-ink/60 underline-offset-4 hover:underline">
                    Lock this page
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="eyebrow text-brand-blue">Investor Briefing</p>
                <h1 className="mt-3 text-2xl font-bold sm:text-3xl">Enter your access code</h1>
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
                  <button type="submit" className="btn btn-navy mt-4 w-full">Unlock</button>
                </form>
                <Message error={error} />
                <p className="mt-8 text-center text-sm text-ink/60">
                  Questions: <a className="underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
