-- 상담 신청(문의) 저장소. 보관 기간은 문의일로부터 1년이며, 매일 새벽 정리 작업이 지난 문의를 지웁니다.
-- 시각은 모두 UTC ISO 8601 문자열(예: 2026-10-30T07:05:00.000Z)로 저장해 문자열 비교로 정렬·삭제합니다.
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'ko',
  name TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  task TEXT NOT NULL,
  current_process TEXT NOT NULL DEFAULT '',
  volume TEXT NOT NULL DEFAULT '',
  page TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new',
  memo TEXT NOT NULL DEFAULT '',
  telegram_status TEXT NOT NULL DEFAULT 'pending',
  email_status TEXT NOT NULL DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status_created_at ON inquiries (status, created_at DESC);
