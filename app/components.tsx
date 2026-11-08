import Link from "next/link";

export function Logo({ variant = "light", className = "h-10" }: { variant?: "light" | "dark"; className?: string }) {
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src={`/brand/logo-${variant}.svg`} alt="Alania Energy" className={`${className} w-auto`} />;
}

export function Header({ onDark = false }: { onDark?: boolean }) {
  const link = onDark ? "text-white/85 hover:text-white" : "text-ink/80 hover:text-ink";
  return (
    <header className={onDark ? "bg-navy" : "bg-white border-b border-line"}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" aria-label="Alania Energy home">
          <Logo variant={onDark ? "dark" : "light"} className="h-9 sm:h-11" />
        </Link>
        <nav className={`flex items-center gap-5 text-sm font-semibold sm:gap-8 sm:text-base ${link}`}>
          <Link href="/">Home</Link>
          <Link href="/investors">Investors</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="accent-rule" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo variant="dark" className="h-9" />
        <nav className="flex gap-6 text-sm text-white/80">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/investors" className="hover:text-white">Investors</Link>
          <Link href="/#contact" className="hover:text-white">Contact</Link>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-white/50 sm:px-6">
        © 2026 Alania Energy. All rights reserved.
      </div>
    </footer>
  );
}
