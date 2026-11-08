import Link from "next/link";

export const SERVICES = [
  { href: "/natural-gas", label: "Natural Gas" },
  { href: "/nuclear", label: "Nuclear" },
  { href: "/technology", label: "Technology" },
  { href: "/campus", label: "Campus" },
  { href: "/data-centers", label: "Data Centers" },
] as const;

export const CONTACT_EMAIL = "info@alaniaenergy.com";

export function Logo({ variant = "light", className = "h-10" }: { variant?: "light" | "dark"; className?: string }) {
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src={`/brand/logo-${variant}.svg`} alt="Alania Energy" className={`${className} w-auto`} />;
}

export function Header({ onDark = false }: { onDark?: boolean }) {
  const link = onDark ? "text-white/85 hover:text-white" : "text-ink/80 hover:text-ink";
  const panel = onDark ? "bg-navy border-white/10" : "bg-white border-line";
  return (
    <header className={`relative z-20 ${onDark ? "bg-navy" : "bg-white border-b border-line"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" aria-label="Alania Energy home">
          <Logo variant={onDark ? "dark" : "light"} className="h-9 sm:h-11" />
        </Link>

        {/* Desktop */}
        <nav className={`hidden items-center gap-6 text-[15px] font-semibold lg:flex ${link}`}>
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href}>{s.label}</Link>
          ))}
          <Link href="/contact">Contact</Link>
          <Link href="/investors" className="btn btn-primary !min-h-0 !px-4 !py-2 text-sm">Investors</Link>
        </nav>

        {/* Mobile: works without JavaScript */}
        <details className="group lg:hidden">
          <summary className={`flex cursor-pointer list-none items-center gap-2 rounded-md px-3 py-2 font-semibold ${link} [&::-webkit-details-marker]:hidden`}>
            Menu
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path className="group-open:hidden" d="M4 7h16M4 12h16M4 17h16" />
              <path className="hidden group-open:block" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </summary>
          <nav className={`absolute inset-x-0 top-full border-t ${panel} px-4 pb-6 pt-2 shadow-lg sm:px-6`}>
            <ul className={`divide-y ${onDark ? "divide-white/10" : "divide-line"} text-base font-semibold ${link}`}>
              <li><Link href="/" className="block py-3">Home</Link></li>
              {SERVICES.map((s) => (
                <li key={s.href}><Link href={s.href} className="block py-3">{s.label}</Link></li>
              ))}
              <li><Link href="/contact" className="block py-3">Contact</Link></li>
            </ul>
            <Link href="/investors" className="btn btn-primary mt-4 w-full">Investor Access</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="accent-rule" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo variant="dark" className="h-9" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            A power energy company developing large-scale generation in Cedar City, Utah.
          </p>
        </div>
        <div>
          <p className="eyebrow text-white/50">What we do</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {SERVICES.map((s) => (
              <li key={s.href}><Link href={s.href} className="hover:text-white">{s.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-white/50">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/investors" className="hover:text-white">Investor Access</Link></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="break-all hover:text-white">{CONTACT_EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl space-y-3 px-4 pb-8 text-xs leading-relaxed text-white/50 sm:px-6">
        <p>
          The Cedar City Energy Campus is in development. Statements on this site about planned facilities, technology and
          timing are forward-looking and may change. Nothing on this site is an offer to sell or a solicitation of an offer
          to buy securities.
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <span>© 2026 Alania Energy. All rights reserved.</span>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Use</Link>
        </p>
      </div>
    </footer>
  );
}
