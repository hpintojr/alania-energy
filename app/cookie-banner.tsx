"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const KEY = "alania_cookie_consent";
export const OPEN_EVENT = "alania:open-cookie-notice";

function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
function write(v: "accepted" | "declined") {
  try {
    localStorage.setItem(KEY, JSON.stringify({ choice: v, at: new Date().toISOString(), version: 1 }));
  } catch {
    /* storage unavailable: banner simply shows again next visit */
  }
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!read()) setOpen(true);
    const reopen = () => {
      setOpen(true);
      setTimeout(() => headingRef.current?.focus(), 30);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        write("declined");
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  const choose = (v: "accepted" | "declined") => {
    write(v);
    setOpen(false);
  };

  return (
    <section
      role="region"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
      className="fixed inset-x-0 bottom-0 z-50 border-t-4 border-brand-green bg-white text-ink shadow-[0_-8px_30px_rgba(4,28,59,0.18)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-8">
        <div>
          <h2 id="cookie-title" ref={headingRef} tabIndex={-1} className="text-base font-bold outline-none">
            Cookies and disclosures
          </h2>
          <p id="cookie-text" className="mt-1 text-[15px] leading-relaxed text-ink/80">
            We use cookies only where they are essential, such as keeping the Investor Access page unlocked. We do not use
            advertising or tracking cookies. By selecting Accept, you acknowledge our{" "}
            <Link href="/privacy" className="font-semibold underline">Privacy Policy</Link> and{" "}
            <Link href="/terms" className="font-semibold underline">Terms of Use</Link>, including our forward-looking statements disclosure.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button type="button" onClick={() => choose("declined")} className="btn border border-ink/30 text-ink hover:bg-mist">
            Decline
          </button>
          <button type="button" onClick={() => choose("accepted")} className="btn btn-navy">
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}

export function CookiePreferencesLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie preferences
    </button>
  );
}
