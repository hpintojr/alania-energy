import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE_NAME = "alania_access";
const SESSION_HOURS = 12;
const MIN_CODE_LENGTH = 16;

function sha256(s: string) {
  return createHash("sha256").update(s, "utf8").digest();
}

/** First 8 hex chars of the SHA-256 of the current access code. Changing the code invalidates every cookie. */
export function codeVersion(): string | null {
  const code = process.env.ACCESS_CODE ?? "";
  if (code.length < MIN_CODE_LENGTH) return null;
  return sha256(code).toString("hex").slice(0, 8);
}

export function gateConfigured(): boolean {
  return codeVersion() !== null && (process.env.SESSION_SECRET ?? "").length >= 32;
}

/** Constant-time comparison on equal-length digests. */
export function checkCode(input: string): boolean {
  const code = process.env.ACCESS_CODE ?? "";
  if (code.length < MIN_CODE_LENGTH) return false;
  if (typeof input !== "string" || input.length === 0 || input.length > 200) return false;
  return timingSafeEqual(sha256(input.trim()), sha256(code));
}

function sign(payload: string): string {
  return createHmac("sha256", process.env.SESSION_SECRET ?? "").update(payload).digest("base64url");
}

export function createToken(): string {
  const v = codeVersion();
  if (!v) throw new Error("gate not configured");
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + SESSION_HOURS * 3600;
  const payload = `${iat}.${exp}.${v}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [iat, exp, v, sig] = parts;
  const payload = `${iat}.${exp}.${v}`;
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const now = Math.floor(Date.now() / 1000);
  if (!/^\d+$/.test(exp) || Number(exp) < now) return false;
  const current = codeVersion();
  return current !== null && v === current;
}

export function cookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export const SESSION_MAX_AGE = SESSION_HOURS * 3600;
