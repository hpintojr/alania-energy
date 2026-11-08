import { neon } from "@neondatabase/serverless";

export type AccessEvent =
  | "unlock_success"
  | "unlock_fail"
  | "unlock_paused"
  | "download"
  | "download_denied";

const BREAKER_LIMIT = 50; // failed unlocks, all visitors
const BREAKER_WINDOW_MINUTES = 15;

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return neon(url);
}

export function clientInfo(req: Request) {
  const xff = req.headers.get("x-forwarded-for") ?? "";
  const ip = xff.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const ua = (req.headers.get("user-agent") ?? "").slice(0, 300);
  return { ip, ua };
}

/** Best effort. Never throws; failures go to the server log. */
export async function logEvent(event: AccessEvent, req: Request, path: string): Promise<void> {
  try {
    const { ip, ua } = clientInfo(req);
    await sql()`INSERT INTO brochure_access_log (event, ip, user_agent, path) VALUES (${event}, ${ip}, ${ua}, ${path})`;
  } catch (err) {
    console.error("[access-log] write failed", event, path, err instanceof Error ? err.message : err);
  }
}

/**
 * Site-wide circuit breaker. True when the gate must refuse every code.
 * Fails CLOSED: if the log cannot be read, the gate is treated as paused.
 */
export async function gatePaused(): Promise<boolean> {
  try {
    const rows = await sql()`
      SELECT count(*)::int AS n FROM brochure_access_log
      WHERE event = 'unlock_fail' AND created_at > now() - make_interval(mins => ${BREAKER_WINDOW_MINUTES})`;
    const n = Number(rows[0]?.n ?? 0);
    return n >= BREAKER_LIMIT;
  } catch (err) {
    console.error("[breaker] read failed, failing closed", err instanceof Error ? err.message : err);
    return true;
  }
}
