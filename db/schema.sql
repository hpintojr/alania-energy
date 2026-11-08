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

-- Contact form submissions (native form; also forwarded to the XBeton CRM workflow webhook).
CREATE TABLE IF NOT EXISTS contact_submissions (
  id           BIGSERIAL PRIMARY KEY,
  first_name   TEXT NOT NULL,
  last_name    TEXT,
  email        TEXT NOT NULL,
  phone        TEXT,
  company      TEXT,
  interest     TEXT,
  message      TEXT,
  consent      BOOLEAN NOT NULL DEFAULT false,
  page         TEXT,
  ip           TEXT,
  user_agent   TEXT,
  crm_status   TEXT NOT NULL DEFAULT 'pending',  -- pending | sent | failed | not_configured
  crm_detail   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS contact_submissions_ip_time ON contact_submissions (ip, created_at DESC);

-- Read submissions (Pacific time):
-- SELECT id, first_name, last_name, email, phone, company, interest, crm_status,
--        created_at AT TIME ZONE 'America/Los_Angeles' AS at_pacific
-- FROM contact_submissions ORDER BY id DESC LIMIT 50;
