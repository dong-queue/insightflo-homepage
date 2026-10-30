// 문의(상담 신청) 저장소. 모든 쿼리는 매개변수 바인딩을 씁니다.
import type { D1Database } from './cf-types';
import type { InquiryInput, InquiryLang } from '../lib/consult-schema';

export const STATUSES = ['new', 'contacted', 'in_progress', 'closed', 'spam'] as const;
export type InquiryStatus = (typeof STATUSES)[number];

export const STATUS_LABEL: Record<InquiryStatus, string> = {
  new: '신규',
  contacted: '연락함',
  in_progress: '진행 중',
  closed: '종료',
  spam: '스팸',
};

export type NotifyStatus = 'pending' | 'sent' | 'failed' | 'skipped';

/** 문의일로부터 보관하는 기간(일). 개인정보처리방침의 보관 기간과 같아야 합니다. */
export const RETENTION_DAYS = 365;
export const MEMO_MAX = 2000;

export interface Inquiry {
  id: string;
  created_at: string;
  updated_at: string;
  lang: InquiryLang;
  name: string;
  company: string;
  email: string;
  phone: string;
  task: string;
  current_process: string;
  volume: string;
  page: string;
  status: InquiryStatus;
  memo: string;
  telegram_status: NotifyStatus;
  email_status: NotifyStatus;
}

export function isStatus(value: unknown): value is InquiryStatus {
  return typeof value === 'string' && (STATUSES as readonly string[]).includes(value);
}

export interface NewInquiry extends InquiryInput {
  id: string;
  createdAt: string;
  lang: InquiryLang;
  page: string;
  status: InquiryStatus;
}

/** 같은 접수 번호가 다시 오면(재시도) 새로 만들지 않습니다. 새로 저장했으면 true. */
export async function insertInquiry(db: D1Database, item: NewInquiry): Promise<{ inserted: boolean; createdAt: string }> {
  const skipped = item.status === 'spam' ? 'skipped' : 'pending';
  const result = await db
    .prepare(
      `INSERT OR IGNORE INTO inquiries
        (id, created_at, updated_at, lang, name, company, email, phone, task, current_process, volume, page, status, telegram_status, email_status)
       VALUES (?1, ?2, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?13)`,
    )
    .bind(
      item.id,
      item.createdAt,
      item.lang,
      item.name,
      item.company,
      item.email,
      item.phone,
      item.task,
      item.current,
      item.volume,
      item.page,
      item.status,
      skipped,
    )
    .run();
  if ((result.meta.changes ?? 0) > 0) return { inserted: true, createdAt: item.createdAt };
  const existing = await db.prepare('SELECT created_at FROM inquiries WHERE id = ?1').bind(item.id).first<{ created_at: string }>();
  return { inserted: false, createdAt: existing?.created_at ?? item.createdAt };
}

export async function setNotifyStatus(
  db: D1Database,
  id: string,
  statuses: { telegram: NotifyStatus; email: NotifyStatus },
): Promise<void> {
  await db
    .prepare('UPDATE inquiries SET telegram_status = ?2, email_status = ?3 WHERE id = ?1')
    .bind(id, statuses.telegram, statuses.email)
    .run();
}

export async function listInquiries(db: D1Database, options: { status?: InquiryStatus | null; limit?: number } = {}): Promise<Inquiry[]> {
  const limit = Math.min(Math.max(options.limit ?? 200, 1), 500);
  const statement = options.status
    ? db.prepare('SELECT * FROM inquiries WHERE status = ?1 ORDER BY created_at DESC LIMIT ?2').bind(options.status, limit)
    : db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT ?1').bind(limit);
  const { results } = await statement.all<Inquiry>();
  return results;
}

export async function countByStatus(db: D1Database): Promise<Record<InquiryStatus | 'all', number>> {
  const { results } = await db
    .prepare('SELECT status, COUNT(*) AS n FROM inquiries GROUP BY status')
    .all<{ status: string; n: number }>();
  const counts = { all: 0, new: 0, contacted: 0, in_progress: 0, closed: 0, spam: 0 } as Record<InquiryStatus | 'all', number>;
  for (const row of results) {
    if (isStatus(row.status)) counts[row.status] = row.n;
    counts.all += row.n;
  }
  return counts;
}

export async function updateInquiry(db: D1Database, id: string, patch: { status: InquiryStatus; memo: string }): Promise<boolean> {
  const result = await db
    .prepare('UPDATE inquiries SET status = ?2, memo = ?3, updated_at = ?4 WHERE id = ?1')
    .bind(id, patch.status, patch.memo.slice(0, MEMO_MAX), new Date().toISOString())
    .run();
  return (result.meta.changes ?? 0) > 0;
}

export async function deleteInquiry(db: D1Database, id: string): Promise<boolean> {
  const result = await db.prepare('DELETE FROM inquiries WHERE id = ?1').bind(id).run();
  return (result.meta.changes ?? 0) > 0;
}

/** 보관 기간이 지난 문의를 지우고 지운 건수를 돌려줍니다. */
export async function purgeExpired(db: D1Database, now = new Date()): Promise<number> {
  const cutoff = new Date(now.getTime() - RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const result = await db.prepare('DELETE FROM inquiries WHERE created_at < ?1').bind(cutoff).run();
  return result.meta.changes ?? 0;
}
