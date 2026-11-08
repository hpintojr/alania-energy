import { NextResponse } from "next/server";
import { clientInfo } from "@/lib/db";
import { forwardToCrm, markCrm, parseContact, saveSubmission, tooMany } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function back(req: Request, page: string, query: string) {
  const safe = page.startsWith("/") && !page.startsWith("//") ? page : "/contact";
  const u = new URL(safe, req.url);
  u.search = query;
  u.hash = "contact";
  return NextResponse.redirect(u, 303);
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) return back(req, "/contact", "error=invalid");
  const page = typeof form.get("page") === "string" ? (form.get("page") as string) : "/contact";

  // Honeypot: real people never fill this hidden field. Pretend success.
  if (typeof form.get("website") === "string" && (form.get("website") as string).trim() !== "") {
    return back(req, page, "sent=1");
  }

  const parsed = parseContact(form);
  if (!parsed.ok) return back(req, page, `error=${parsed.error}`);

  const { ip, ua } = clientInfo(req);
  if (await tooMany(ip)) return back(req, page, "error=busy");

  const id = await saveSubmission(parsed.data, ip, ua);
  const crm = await forwardToCrm(parsed.data, id);
  await markCrm(id, crm.status, crm.detail);
  if (crm.status === "failed") console.error("[contact] CRM forward failed", id, crm.detail);

  // Saved in Neon or delivered to the CRM: either way the lead is captured.
  if (id === null && crm.status !== "sent") return back(req, page, "error=server");
  return back(req, page, "sent=1");
}

export async function GET(req: Request) {
  return NextResponse.redirect(new URL("/contact", req.url), 303);
}
