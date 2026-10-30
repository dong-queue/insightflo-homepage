// 새 문의 알림: 텔레그램, 그리고 send_email 바인딩이 있을 때만 메일(지금은 꺼 둠).
// 저장이 먼저이고, 알림은 실패해도 문의는 남습니다.
// 결과(sent/failed/skipped)는 문의마다 기록되어 관리 화면에 보입니다.
import type { SiteEnv } from './cf-types';
import { setNotifyStatus, type NewInquiry, type NotifyStatus } from './inquiries';
import { shortId } from '../lib/consult-schema';

const VOLUME_LABEL: Record<string, string> = {
  lt100: '100건 미만',
  '100to1k': '100~1,000건',
  '1kto10k': '1,000~10,000건',
  gt10k: '10,000건 이상',
  unknown: '잘 모르겠음',
};

const kstFormat = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export function formatKst(iso: string): string {
  return kstFormat.format(new Date(iso));
}

/** 메일 제목·이름처럼 한 줄이어야 하는 값에서 줄바꿈과 제어 문자를 지웁니다. */
function oneLine(value: string, max = 120): string {
  return value.replace(/[\r\n\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
}

function excerpt(value: string, max: number): string {
  const flat = value.replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

export function adminLink(origin: string, id: string): string {
  return `${origin}/admin/inquiries#i-${id}`;
}

/**
 * 텔레그램에는 접수 번호, 한 달 건수, 관리 화면 링크만 보냅니다.
 * 신청자가 적은 내용(이름, 회사, 업무 설명)은 국외 메신저로 보내지 않고 메일과 관리 화면에서만 봅니다.
 * 내용을 더 보내려면 개인정보처리방침 4절(처리 위탁과 국외 이전)에 텔레그램을 함께 적어야 합니다.
 */
export function telegramText(item: NewInquiry, origin: string): string {
  const lines = [`새 상담 신청 ${shortId(item.id)}${item.lang === 'en' ? ' [EN]' : ''}`];
  if (item.volume) lines.push(`한 달 건수: ${VOLUME_LABEL[item.volume] ?? item.volume}`);
  lines.push('자세한 내용은 관리 화면에서 확인합니다.');
  lines.push(`관리 화면: ${adminLink(origin, item.id)}`);
  return lines.join('\n');
}

export function emailContent(item: NewInquiry, origin: string): { subject: string; text: string } {
  const subject = oneLine(`[상담 신청] ${item.company || item.name}: ${excerpt(item.task, 40)}`, 150);
  const text = [
    '새 상담 신청이 접수되었습니다.',
    '',
    `접수 번호: ${shortId(item.id)}`,
    `접수 시각: ${formatKst(item.createdAt)} (한국 시간)`,
    `이름: ${oneLine(item.name)}`,
    `회사: ${oneLine(item.company) || '적지 않음'}`,
    `이메일: ${item.email}`,
    `연락처: ${oneLine(item.phone) || '적지 않음'}`,
    `한 달 처리 건수: ${item.volume ? VOLUME_LABEL[item.volume] ?? item.volume : '선택하지 않음'}`,
    `언어: ${item.lang === 'en' ? '영어' : '한국어'}`,
    '',
    '[맡기고 싶은 업무]',
    item.task,
    '',
    '[지금 처리하는 방식]',
    item.current || '적지 않음',
    '',
    `관리 화면: ${adminLink(origin, item.id)}`,
    '이 메일에 답장하면 신청자에게 바로 회신됩니다.',
  ].join('\n');
  return { subject, text };
}

async function sendTelegram(env: SiteEnv, item: NewInquiry, origin: string): Promise<NotifyStatus> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return 'skipped';
  const base = (env.TELEGRAM_API_BASE || 'https://api.telegram.org').replace(/\/$/, '');
  try {
    const res = await fetch(`${base}/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: telegramText(item, origin),
        disable_web_page_preview: true,
      }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; description?: string } | null;
    if (res.ok && data?.ok) return 'sent';
    console.error('telegram notify failed', res.status, data?.description ?? '');
    return 'failed';
  } catch (error) {
    console.error('telegram notify error', error instanceof Error ? error.message : error);
    return 'failed';
  }
}

async function sendEmail(env: SiteEnv, item: NewInquiry, origin: string): Promise<NotifyStatus> {
  if (!env.EMAIL || !env.MAIL_FROM || !env.MAIL_TO) return 'skipped';
  const { subject, text } = emailContent(item, origin);
  try {
    await env.EMAIL.send({
      to: env.MAIL_TO,
      from: { email: env.MAIL_FROM, name: 'InsightFlo 상담 접수' },
      replyTo: { email: item.email, name: oneLine(item.name, 80) },
      subject,
      text,
    });
    return 'sent';
  } catch (error) {
    const code = (error as { code?: string })?.code ?? '';
    console.error('email notify failed', code, error instanceof Error ? error.message : error);
    return 'failed';
  }
}

/** 두 알림을 함께 보내고 결과를 기록합니다. 요청 응답을 막지 않도록 waitUntil 안에서 부릅니다. */
export async function notifyNewInquiry(env: SiteEnv, item: NewInquiry, origin: string): Promise<void> {
  const [telegram, email] = await Promise.all([sendTelegram(env, item, origin), sendEmail(env, item, origin)]);
  try {
    await setNotifyStatus(env.DB, item.id, { telegram, email });
  } catch (error) {
    console.error('notify status update failed', error instanceof Error ? error.message : error);
  }
}
