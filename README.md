# Alania Energy website

Public site for Alania Energy (alaniaenergy.com) plus a password-gated investor briefing download.
Next.js 15 (App Router) · Tailwind 4 · Vercel · Neon Postgres (access log).

## Routes
- `/` public home page
- `/investors` access-code gate; unlocked state shows the briefing and a Download PDF button
- `POST /api/brochure/unlock` checks the code, sets a signed 12-hour cookie, redirects back
- `POST /api/brochure/lock` clears the cookie
- `GET /api/brochure/download?format=pdf|pptx` serves the briefing from `private/` (PDF or PowerPoint) to a valid session only

## Environment variables (Vercel: Production only)
| Name | What |
|---|---|
| `ACCESS_CODE` | Shared investor access code. 16+ characters or nobody can unlock. |
| `SESSION_SECRET` | `openssl rand -hex 32`. Signs the session cookie. |
| `DATABASE_URL` | Neon pooled connection string. |

Missing or short values mean the gate is locked for everyone (this is how Preview deployments stay safe).

## Changing or pausing access
- **Change the code:** edit `ACCESS_CODE` in Vercel and redeploy. New unlocks need the new code and every open session dies immediately (the cookie carries a hash of the code).
- **Pause access:** set `ACCESS_CODE` to a long random value you tell nobody, redeploy.
- **Automatic breaker:** 50 or more failed attempts across all visitors in 15 minutes pauses the gate for everyone until the count drops. If the database can't be read, the gate also pauses (fails closed).

## Access log (Neon)
Table `brochure_access_log`, created from `db/schema.sql`. Events: `unlock_success`, `unlock_fail`, `unlock_paused`, `download`, `download_denied`.

```sql
SELECT id, event, ip, left(user_agent, 60) AS device,
       created_at AT TIME ZONE 'America/Los_Angeles' AS at_pacific
FROM brochure_access_log ORDER BY id DESC LIMIT 100;
```
Rows with user agent `alania-smoke-test` come from `npm run smoke`.
One shared code means the log shows IP, time and device, not which person.

## Local development
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

## Smoke test
```bash
BASE_URL=https://<deployment> ACCESS_CODE=... DATABASE_URL=... EXPECTED_PDF_BYTES=1163002 npm run smoke
```

## Replacing the PDF
Overwrite the PDF and/or PPTX in `private/`, update `bytes`, `sizeLabel`, `pages`, `dated` (and `HIGHLIGHTS` if figures changed) in `lib/brochure.ts`, commit, push.

## QR codes
`npm run qr` regenerates `assets/qr/*.png|svg` for `https://alaniaenergy.com/` and `https://alaniaenergy.com/investors`.
They only scan to something once DNS for alaniaenergy.com points at Vercel.

## Domain and email
1. In Vercel, project Domains: add `alaniaenergy.com` and `www.alaniaenergy.com`; copy the exact A / CNAME values Vercel shows and set them at the registrar.
2. `information@alaniaenergy.com`: use the registrar's email forwarding or Cloudflare Email Routing (MX records + one rule) to forward to the CEO's mailbox. Not code; needs DNS access.

## Repo visibility
This repo must be **private** before any QR code or link is shared. While public, the PDF under `private/` is readable from GitHub regardless of the site's password.
