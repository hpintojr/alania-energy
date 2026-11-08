#!/usr/bin/env node
/**
 * Smoke test for the Alania Energy site. No browser needed.
 * Usage: BASE_URL=http://localhost:3000 ACCESS_CODE=... DATABASE_URL=... node scripts/smoke.mjs
 * Rows written by this script carry user agent "alania-smoke-test".
 */
import { neon } from "@neondatabase/serverless";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const CODE = process.env.ACCESS_CODE;
const DB = process.env.DATABASE_URL;
const UA = "alania-smoke-test";
const EXPECTED_PDF_BYTES = Number(process.env.EXPECTED_PDF_BYTES ?? 0);

let failures = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`);
  if (!cond) failures++;
};
const get = (path, opts = {}) =>
  fetch(BASE + path, { redirect: "manual", headers: { "user-agent": UA, ...(opts.headers ?? {}) }, ...opts });

const sql = DB ? neon(DB) : null;
async function lastEvents(n = 8) {
  if (!sql) return [];
  const rows = await sql`SELECT event, path FROM brochure_access_log WHERE user_agent = ${UA} ORDER BY id DESC LIMIT ${n}`;
  return rows.map((r) => r.event);
}
async function countEvent(event) {
  if (!sql) return -1;
  const rows = await sql`SELECT count(*)::int AS n FROM brochure_access_log WHERE user_agent = ${UA} AND event = ${event}`;
  return Number(rows[0].n);
}

const before = {
  fail: await countEvent("unlock_fail"),
  success: await countEvent("unlock_success"),
  download: await countEvent("download"),
  denied: await countEvent("download_denied"),
};

// 1. Home
{
  const r = await get("/");
  const html = await r.text();
  ok(r.status === 200, "home returns 200");
  ok(html.includes("/brand/logo-dark.svg"), "home shows the logo");
  ok(["Natural Gas Generation", "Nuclear", "Proven Technology"].every((t) => html.includes(t)), "home shows the three cards");
  ok(html.includes("info@alaniaenergy.com"), "home shows the contact email");
}

// 2. Gate
{
  const r = await get("/investors", { headers: { accept: "text/html" } });
  const html = await r.text();
  ok(r.status === 200 && html.includes('name="code"'), "/investors shows the gate");
  ok(html.includes("noindex"), "/investors carries noindex");
}

// 3. Download without cookie
{
  const r = await get("/api/brochure/download", { headers: { accept: "text/html" } });
  ok(r.status === 303 && (r.headers.get("location") ?? "").endsWith("/investors"), "download without cookie redirects to the gate (browser)");
  const r2 = await get("/api/brochure/download", { headers: { accept: "application/json" } });
  ok(r2.status === 401, "download without cookie returns 401 (non-browser)");
}

// 4. Wrong code
{
  const r = await get("/api/brochure/unlock", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: "code=definitely-not-the-code-123",
  });
  ok(r.status === 303 && (r.headers.get("location") ?? "").includes("error=invalid"), "wrong code redirects with error=invalid");
  ok(!r.headers.get("set-cookie"), "wrong code sets no cookie");
}

// 5. Right code
let cookie = "";
if (CODE) {
  const r = await get("/api/brochure/unlock", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: "code=" + encodeURIComponent(CODE),
  });
  const loc = r.headers.get("location") ?? "";
  const sc = r.headers.get("set-cookie") ?? "";
  ok(r.status === 303 && loc.endsWith("/investors") && !loc.includes("error"), "right code redirects to the unlocked page");
  ok(sc.startsWith("alania_access="), "right code sets the session cookie");
  cookie = sc.split(";")[0];

  const page = await get("/investors", { headers: { cookie, accept: "text/html" } });
  const html = await page.text();
  ok(html.includes("Download PDF"), "unlocked page shows the download button");

  const dl = await get("/api/brochure/download", { headers: { cookie } });
  const buf = Buffer.from(await dl.arrayBuffer());
  ok(dl.status === 200 && dl.headers.get("content-type") === "application/pdf", "download returns application/pdf");
  ok(buf.subarray(0, 5).toString() === "%PDF-", "download body is a PDF");
  ok(!EXPECTED_PDF_BYTES || buf.length === EXPECTED_PDF_BYTES, `download is ${buf.length} bytes${EXPECTED_PDF_BYTES ? ` (expected ${EXPECTED_PDF_BYTES})` : ""}`);
  ok((dl.headers.get("cache-control") ?? "").includes("no-store"), "download is no-store");

  // 6. Lock
  const lock = await get("/api/brochure/lock", { method: "POST", headers: { cookie } });
  const cleared = (lock.headers.get("set-cookie") ?? "").includes("Max-Age=0");
  ok(lock.status === 303 && cleared, "lock clears the cookie");
} else {
  console.log("SKIP  ACCESS_CODE not set: unlock/download checks skipped");
}

// 7. Log rows
if (sql) {
  await new Promise((r) => setTimeout(r, 800));
  const after = {
    fail: await countEvent("unlock_fail"),
    success: await countEvent("unlock_success"),
    download: await countEvent("download"),
    denied: await countEvent("download_denied"),
  };
  ok(after.fail === before.fail + 1, "log has the unlock_fail row");
  ok(after.denied === before.denied + 2, "log has the download_denied rows");
  if (CODE) {
    ok(after.success === before.success + 1, "log has the unlock_success row");
    ok(after.download === before.download + 1, "log has the download row");
  }
  console.log("recent events:", (await lastEvents()).join(", "));
} else {
  console.log("SKIP  DATABASE_URL not set: log checks skipped");
}

console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed");
process.exit(failures ? 1 : 0);
