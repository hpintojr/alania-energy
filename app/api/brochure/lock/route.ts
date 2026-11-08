import { NextResponse } from "next/server";
import { COOKIE_NAME, cookieOptions } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/investors", req.url), 303);
  res.cookies.set(COOKIE_NAME, "", cookieOptions(0));
  return res;
}

export async function GET(req: Request) {
  return NextResponse.redirect(new URL("/investors", req.url), 303);
}
