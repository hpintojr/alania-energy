import { Footer, Header } from "./components";

export type LegalSection = { heading: string; paras?: string[]; bullets?: string[] };

export function LegalPage({
  title,
  effective,
  intro,
  sections,
}: {
  title: string;
  effective: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="eyebrow text-brand-blue">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold">{title}</h1>
          <p className="mt-3 text-sm text-ink/70">Effective {effective}</p>
          <p className="mt-8 text-lg leading-relaxed text-ink/80">{intro}</p>
          <nav aria-label="On this page" className="mt-8 rounded-lg border border-line bg-mist p-5">
            <p className="eyebrow text-ink/70">On this page</p>
            <ol className="mt-3 grid gap-1.5 text-[15px] sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a className="text-ink/75 underline-offset-4 hover:underline" href={`#s${i + 1}`}>
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {sections.map((s, i) => (
            <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-6 border-b border-line py-8 last:border-0">
              <h2 className="text-xl font-bold">
                {i + 1}. {s.heading}
              </h2>
              {s.paras?.map((p) => (
                <p key={p.slice(0, 50)} className="mt-4 leading-relaxed text-ink/80">{p}</p>
              ))}
              {s.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-ink/80">
                  {s.bullets.map((b) => <li key={b.slice(0, 50)}>{b}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
