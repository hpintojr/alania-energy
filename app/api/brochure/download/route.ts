import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { logEvent } from "@/lib/db";
import { BROCHURE } from "@/lib/brochure";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cookieValue(req: Request, name: string): string | undefined {
  const raw = req.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return undefined;
}

export async function GET(req: Request) {
  const token = cookieValue(req, COOKIE_NAME);
  if (!verifyToken(token)) {
    await logEvent("download_denied", req, "/api/brochure/download");
    const wantsHtml = (req.headers.get("accept") ?? "").includes("text/html");
    if (wantsHtml) return NextResponse.redirect(new URL("/investors", req.url), 303);
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const filePath = path.join(process.cwd(), "private", BROCHURE.fileName);
  let data: Buffer;
  try {
    data = await readFile(filePath);
  } catch (err) {
    console.error("[download] file read failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "file unavailable" }, { status: 500 });
  }

  await logEvent("download", req, "/api/brochure/download");
  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(data.byteLength),
      "Content-Disposition": `attachment; filename="${BROCHURE.fileName}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
