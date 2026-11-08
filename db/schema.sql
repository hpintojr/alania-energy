-- Run once in the Neon SQL editor before the first deploy.
CREATE TABLE IF NOT EXISTS brochure_access_log (
  id          BIGSERIAL PRIMARY KEY,
  event       TEXT NOT NULL CHECK (event IN ('unlock_success','unlock_fail','unlock_paused','download','download_denied')),
  ip          TEXT,
  user_agent  TEXT,
  path        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS brochure_access_log_event_time ON brochure_access_log (event, created_at DESC);

-- Handy read query (Pacific time):
-- SELECT id, event, ip, left(user_agent, 60) AS device, created_at AT TIME ZONE 'America/Los_Angeles' AS at_pacific
-- FROM brochure_access_log ORDER BY id DESC LIMIT 100;
