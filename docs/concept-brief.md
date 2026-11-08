# Concept Brief: Alania Energy website

Date: 2026-11-07
Owner: Hamilton (build), CEO direction from 2026-11-04 meeting

## Goal
A simple public website for Alania Energy at AlaniaEnergy.com that presents the company as a power energy company (natural gas, nuclear, GE turbines), gives prospects a way to reach the company, and holds the Cedar City Energy Campus investor briefing behind a password so it can be shared by QR code with selected people only.

## Audience
1. Investors and partners the CEO sends to the site by QR code or link, who have been given the password verbally.
2. Counterparties, utilities, municipal partners and press who look the company up and need to see a credible, simple presence.

## Must-haves (from CEO and Hamilton)
- Very few pages. Simple. No fluff.
- Public content: natural gas generation, nuclear, GE turbines, "a power energy company". High level only.
- Alania Energy logo from the deck, as SVG, light and dark mode versions.
- Password-protected investor page. QR code opens the page, page asks for the password, then shows the briefing and a PDF download.
- The download is a PDF (not PowerPoint) of Alania_Energy_Investor_Briefing. Typo fixes only; figures untouched.
- One shared passphrase, plus every unlock attempt and download logged in Neon.
- Contact email info@alaniaenergy.com, forwarded to the CEO.
- QR code image for the site and for the investor page.
- Code on Hamilton's GitHub, deployed to Vercel, domain AlaniaEnergy.com (already owned).
- Zarla used only as a design and copy reference, not as the live site.

## Out of scope (v1)
- AI chat on the site (CEO wants it, do it after v1 ships).
- The XBeton green data center page (separate site).
- Partner logos (Fluor, Hylion, GE and others) until contracts are signed; CEO said add them "correctly" once signed.
- Site plan, elevations, renderings (Sean to send; add in v2).
- Per-investor access codes, admin dashboard for the log.
- Deck content corrections beyond spelling ($7.0B vs $8.0B, 1,800 vs 5,000 acres stay as they are).

## Open questions
- Where is DNS for AlaniaEnergy.com (registrar / Cloudflare)? Needed to point the domain at Vercel and set up email forwarding.
- Which mail provider handles info@alaniaenergy.com (Cloudflare Email Routing, Google Workspace, registrar forwarding)?
- What passphrase does the CEO want to hand out? Default: Hamilton sets one and shares it.
- Company address and phone for the footer, if any should be public.
