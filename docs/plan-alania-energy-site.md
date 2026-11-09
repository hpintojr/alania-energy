# Plan: Alania Energy website (v1)

Version: 1.1, 2026-11-07 (revised after goldfish review; accepted fixes marked [R])

## 1. Purpose
Build and launch a simple public website for Alania Energy, a power energy company developing large-scale generation in Cedar City, Utah. The site has two jobs: (a) present the company credibly in a few screens, and (b) hold a confidential investor briefing PDF behind a password so the CEO can share it by QR code with selected people only. Every unlock attempt and download is logged.

## 2. Audience
- Investors and partners who were given the password verbally and arrive by QR code or link. They want the PDF in two taps.
- Anyone else looking up the company. They should understand in 10 seconds what Alania Energy does and how to contact it.

## 3. Brand assets
- Logo: extracted from the investor deck (blue and green mountain-style mark, "ALANIA" in navy, "ENERGY" letterspaced). Recreated as SVG in three files: `logo-light.svg` (navy wordmark, for white backgrounds), `logo-dark.svg` (white wordmark, same blue/green mark, for navy backgrounds), `mark.svg` (mark only, used for favicon and QR center).
- Colors taken from the deck: navy `#0B1F3A` (background of dark slides), brand blue `#1F5BC4` (mark), brand green `#4CA545` (mark and accent line), off-white `#F4F6F9`. Exact hex values are sampled from the deck images during build; these are estimates until then.
- Type: a clean geometric sans (Inter or similar free font) in heavy weight for headings, regular for body. No custom paid fonts.
- Imagery: the deck's cover line-art (transmission towers on navy) for the hero. The plant renderings from the deck's last slide are NOT used publicly (CEO said renderings should describe the project, not pretend to be the factory; they belong in the gated area at most).

## 4. Site structure (3 routes)

### 4.1 `/` Home (single scrolling page)
1. Header: logo (light variant on white), nav links: Home, Investors, Contact (anchor).
2. Hero: navy background with the deck's tower line-art. Headline: "Powering the next generation of industry." Sub: "Alania Energy is a power energy company developing large-scale natural gas and nuclear generation in Cedar City, Utah." Button: "Investor Access" (to `/investors`). Secondary link: "Contact us".
3. What we do (three cards):
   - Natural Gas Generation: "Utility-scale natural gas generation designed for reliable, dispatchable baseload power."
   - Nuclear: "Advanced nuclear as a long-term, carbon-free component of the campus generation mix."
   - Proven Technology: "Generation built on GE turbine technology, proven in power applications worldwide." (Card retitled so it reads as what we do, not a product we sell; GE turbines named in the sentence.) [R]
   All three sentences are written at the level the CEO asked for: name the technology, do not explain specs. The specific model (LM2500) is not mentioned, per the CEO's "just say GE turbines".
4. Cedar City Energy Campus (one band): "Now in development: an energy campus in Cedar City, Utah, designed to serve a planned research facility and industrial space, with power, water, gas, fiber and rail infrastructure on site." ("In development" added so no visitor assumes the plant is operating.) [R] No MW figures, no dollar figures, no counterparties, no partner names. Those stay in the gated PDF.
5. Contact band: "info@alaniaenergy.com" as a mailto link, plus the line "Investor materials are available to qualified parties on request." Phone and address omitted until the CEO provides them.
6. Footer: dark logo variant, copyright "© 2026 Alania Energy. All rights reserved.", links Home / Investors / Contact.

### 4.2 `/investors` Gate and brochure page
State A, locked (no valid cookie):
- Logo, title "Investor Briefing", one sentence: "This material is confidential and intended for invited parties. Enter the access code you were given."
- Single access-code field, "Unlock" button. The form POSTs to `/api/brochure/unlock` (route handler, works without JavaScript) which answers with a 303 redirect back to `/investors`, `/investors?error=invalid` or `/investors?error=paused`; the page renders the message from the query string. [R]
- On failure: "That access code was not recognized. Questions: info@alaniaenergy.com". No hint about the code. [R]
- Site-wide circuit breaker [R]: if 50 or more failed attempts were logged across all visitors in the last 15 minutes, the gate shows "Access is paused for a few minutes. Questions: info@alaniaenergy.com" and refuses every code, correct or not, until the count drops. If the log cannot be read, the gate fails closed with the same message. No per-IP blocking (shared venue Wi-Fi and carrier NAT would lock out real investors).
- Footer: contact email and link back to Home.

State B, unlocked (valid cookie):
- Title "Cedar City Energy Campus, Equity Partner Briefing", date "September 15, 2026", confidentiality note from the deck ("Confidential, for discussion purposes only").
- Short summary (3 bullets taken from the deck's own slide titles, no new claims): the project has crossed the highest-risk development gates; development milestones are substantially complete; path to financial close.
- Primary button "Download PDF": a plain anchor (no prefetch) to `/api/brochure/download`. Shows file name and size (size hardcoded at build time). [R]
- "Lock this page": a POST form to `/api/brochure/lock` that clears the cookie (never a GET link, so nothing can prefetch it). [R]

### 4.3 `/api/brochure/download` (server route)
- Requires the valid signed cookie. Without it: browser navigations (Accept includes text/html) get a 303 redirect to `/investors`; other requests get 401 JSON. Logged as `download_denied`, which never counts toward the breaker. [R]
- With it: returns `Alania_Energy_Investor_Briefing.pdf` as a Buffer with `Content-Disposition: attachment`, `Cache-Control: private, no-store`, and logs `download`.
- The PDF lives in the repo at `private/Alania_Energy_Investor_Briefing.pdf`, outside `/public`, so it has no direct URL on the site. Route uses `runtime = "nodejs"`, `dynamic = "force-dynamic"`, reads `path.join(process.cwd(), "private", ...)`, and `next.config` sets `outputFileTracingIncludes: { "/api/brochure/download": ["./private/**"] }`. [R]
- Repo note [R]: Hamilton creates the repo public (plan/API reasons) and flips it private before any QR code or link is shared. While public, the PDF is downloadable from GitHub regardless of the gate.

## 5. Access control design
- One shared access code in env var `ACCESS_CODE` (Vercel Production env only, never in the repo). Comparison is constant-time on SHA-256 digests. The server refuses to unlock anyone if `ACCESS_CODE` is missing or shorter than 16 characters; missing env means locked, so Preview and Development deployments can never unlock. [R]
- On success the server sets cookie `alania_access`: HMAC-SHA256 signed token (payload: issued-at, expiry, first 8 hex chars of SHA-256 of the current access code) using env `SESSION_SECRET` (generate with `openssl rand -hex 32`). httpOnly, SameSite=Lax, Secure in production only, 12-hour expiry. [R]
- Off switch [R]: change `ACCESS_CODE` in Vercel. New unlocks need the new code and every open session dies immediately because the code hash in the cookie no longer matches. To pause entirely, set `ACCESS_CODE` to a random 40-char value and tell nobody. Env changes on Vercel apply on the next request after redeploy (Vercel redeploys automatically on env change when "redeploy" is chosen; otherwise trigger one). No separate `BROCHURE_ENABLED` flag.
- Brute force: see the site-wide breaker in 4.2. A 16+ character code makes online guessing impractical; the breaker is a backstop and a signal in the log.

## 6. Data (Neon Postgres)
One table, `brochure_access_log`:
- `id` bigserial primary key
- `event` text: `unlock_success`, `unlock_fail`, `unlock_paused`, `download`, `download_denied`
- `ip` text (from `x-forwarded-for`, first value)
- `user_agent` text
- `path` text
- `created_at` timestamptz default now()
Index on `(event, created_at)` for the breaker query. Schema lives in `db/schema.sql` in the repo and is run once in Neon before the first deploy (rollout step 0). [R]
Connection string in env `DATABASE_URL`, used through `@neondatabase/serverless` (HTTP driver, fine for Vercel serverless). Logging failures never block the user: wrapped in try/catch, errors go to the server log.
Hamilton reads the log in the Neon console SQL editor (sample query in README, with `at time zone 'America/Los_Angeles'`). No admin UI in v1. Known limit, stated plainly: one shared code means the log shows IP, time and device, not which person.

## 7. The PDF
- Source: Alania_Energy_Investor_Briefing.pptx (12 slides, 16:9).
- Edits before conversion: "recieved" to "received" (slide 6), "on going" to "ongoing" (slide 6), and the malformed "5,0000 acres" to "5,000 acres" (slide 5), which matches the deck's own "5,000 ACRES CONTROLLED" on slide 6. Dollar figures and all other wording unchanged. Done 2026-11-07; 12 pages, Inter fonts embedded, every page checked.
- Convert with LibreOffice headless to PDF. Check every page visually against the original deck render for font or layout breakage. If a slide renders wrong, fix in the source and reconvert; never hand-edit the PDF.
- Output name: `Alania_Energy_Investor_Briefing.pdf`. Also delivered to Hamilton as a file.

## 8. QR codes
Two PNGs (and SVGs) generated in the build, saved in the repo under `assets/qr/` and sent to Hamilton:
- `qr-alaniaenergy-home.png` pointing to `https://alaniaenergy.com/`
- `qr-alaniaenergy-investors.png` pointing to `https://alaniaenergy.com/investors`
High error correction, navy on white, logo mark in the center. These codes do NOT scan to anything until DNS for alaniaenergy.com points at Vercel (rollout step 6). Do not print or share them before that. [R]

## 9. Email
info@alaniaenergy.com forwarding to the CEO is a DNS / mail-provider task, not code. The plan: if DNS is on Cloudflare, use Cloudflare Email Routing (free, MX plus one forwarding rule). Otherwise use the registrar's forwarding. Hamilton needs DNS access either way. The site only uses the address as a mailto link, so the site launches regardless; forwarding is a follow-up step with written instructions in the README.

## 10. Stack and deployment
- Next.js (App Router, TypeScript), Tailwind CSS. Node 22.
- Repo: `hpintojr/alania-energy` (private) on GitHub. Branch `main`.
- Hosting: Vercel project `alania-energy`, connected to the repo, production branch `main`. Env vars: `BROCHURE_PASSWORD`, `SESSION_SECRET`, `DATABASE_URL`, `BROCHURE_ENABLED=true`.
- Domain: add `alaniaenergy.com` and `www.alaniaenergy.com` to the Vercel project. Vercel gives the A record (76.76.21.21) and CNAME (cname.vercel-dns.com). Hamilton sets them at the registrar. www redirects to apex.
- Design reference: a Zarla site "Alania Energy" is generated with the same business info to see Zarla's layout and copy suggestions. Preview only; it is not published and not linked anywhere. (Hamilton chose to keep this.)
- Env scope [R]: `ACCESS_CODE`, `SESSION_SECRET`, `DATABASE_URL` set for Production only. Preview deployments stay locked by design.
- Domain: use the exact A / CNAME values the Vercel dashboard shows for this project rather than any value written here.

## 11. Edge cases
- Wrong password, empty password, very long input: all return the same error, input capped at 200 chars.
- Cookie tampered or expired: treated as locked, no error shown, just the gate.
- Direct hit on the download URL without cookie: 401, logged as `download_denied`? No: keep event list small; log as `unlock_fail` with path `/api/brochure/download`.
- Neon unreachable: unlock still works (rate limit check fails open to allow access; logged to server console). Download still works.
- JavaScript disabled: the gate is a plain HTML form posting to a server action, so it works without JS.
- Mobile: single column, 16px gutters, password field with `autocomplete="off"`, large tap targets. Most QR scans are on phones.
- Search engines: `/investors` and the download route carry `noindex, nofollow`; robots.txt disallows `/api/`.
- PDF caching: `no-store`, so a revoked session cannot refetch from a shared cache.

## 12. Rollout and test plan
0. Create the Neon database and run `db/schema.sql` once. [R]
1. Build locally; `next build` passes with zero type errors.
2. Smoke test [R]: a Node fetch script (`scripts/smoke.mjs`, user agent `alania-smoke-test`) run against `next start`: home 200 with logo and three cards; `/investors` shows gate; wrong code redirects with `?error=invalid` and writes `unlock_fail`; right code sets the cookie and writes `unlock_success`; download returns `application/pdf` with the exact byte length and writes `download`; download without cookie redirects to `/investors` and writes `download_denied`. The script fails loudly if any expected log row is missing. No breaker test against production.
3. Push to GitHub, Vercel deploys. Run the same script once against the `*.vercel.app` URL; its rows are identifiable in the log by user agent.
4. Visual check: screenshot home and gate at phone and desktop widths, light and dark header variants.
5. Send Hamilton: live URL, the access code (16+ chars, generated, Hamilton can change it in Vercel), QR PNGs with the DNS warning, the PDF, DNS records to set, email forwarding steps, and the reminder to flip the repo private.
6. Domain goes live when DNS is pointed; recheck both URLs then.

## 13. Success measure
- A phone scanning the investor QR reaches the gate, unlocks with the passphrase, and downloads the PDF in under 30 seconds.
- Every unlock and download appears in Neon within seconds with IP and timestamp.
- Home page passes a 10-second read test: a stranger can say what the company does and how to contact it.

## 14. Later (not v1)
AI chat widget, partner logos once contracts are signed, site plan / elevations / renderings, contact form stored in Neon with email notification, per-investor codes or per-card tracking tokens, per-download PDF stamping, in-app-browser download hint, log viewer page, Vercel Blob for the PDF if the repo must stay public.

## 15. People and ownership
- CEO: decides what is public, hands out the access code verbally, asks Hamilton for code changes or a pause.
- Hamilton: owns the GitHub repo, Vercel project and Neon database; sets and rotates the access code; reads the log; points DNS and sets up email forwarding.
