import { NextResponse } from "next/server";
import { checkCode, COOKIE_NAME, cookieOptions, createToken, gateConfigured, SESSION_MAX_AGE } from "@/lib/auth";
import { gatePaused, logEvent } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function redirect(req: Request, to: string) {
  return NextResponse.redirect(new URL(to, req.url), 303);
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const code = typeof form?.get("code") === "string" ? (form!.get("code") as string).slice(0, 200) : "";

  if (!gateConfigured()) {
    // Missing or short ACCESS_CODE / SESSION_SECRET: nobody gets in (previews, misconfig).
    await logEvent("unlock_paused", req, "/api/brochure/unlock");
    return redirect(req, "/investors?error=paused");
  }

  if (await gatePaused()) {
    await logEvent("unlock_paused", req, "/api/brochure/unlock");
    return redirect(req, "/investors?error=paused");
  }

  if (!checkCode(code)) {
    await logEvent("unlock_fail", req, "/api/brochure/unlock");
    return redirect(req, "/investors?error=invalid");
  }

  await logEvent("unlock_success", req, "/api/brochure/unlock");
  const res = redirect(req, "/investors");
  res.cookies.set(COOKIE_NAME, createToken(), cookieOptions(SESSION_MAX_AGE));
  return res;
}

export async function GET(req: Request) {
  return redirect(req, "/investors");
}
