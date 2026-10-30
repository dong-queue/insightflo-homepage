// 상담 신청 접수: 확인(출처, 크기, 횟수, Turnstile, 입력) → 저장 → 알림(응답을 막지 않음)
import type { APIRoute } from 'astro';
import { json, isSameOrigin, readBodyLimited } from '../../server/http';
import { verifyTurnstile } from '../../server/turnstile';
import { insertInquiry, purgeExpired, type NewInquiry } from '../../server/inquiries';
import { notifyNewInquiry } from '../../server/notify';
import { validateInquiry, UUID_RE, LANGS, type InquiryLang } from '../../lib/consult-schema';

export const prerender = false;

const MAX_BODY_BYTES = 32 * 1024;

export const POST: APIRoute = async ({ request, locals }) => {
  const { env, ctx } = locals.runtime;

  if (!isSameOrigin(request)) return json({ ok: false, error: 'forbidden' }, 403);
  if (!(request.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) {
    return json({ ok: false, error: 'invalid' }, 415);
  }

  const raw = await readBodyLimited(request, MAX_BODY_BYTES);
  if (raw === null) return json({ ok: false, error: 'too_large' }, 413);
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  if (!env.TURNSTILE_SECRET_KEY) {
    console.error('consult: TURNSTILE_SECRET_KEY is not set');
    return json({ ok: false, error: 'unavailable' }, 503);
  }

  const ip = request.headers.get('cf-connecting-ip') ?? '';
  if (env.CONSULT_LIMITER) {
    const { success } = await env.CONSULT_LIMITER.limit({ key: `consult:${ip || 'unknown'}` });
    if (!success) return json({ ok: false, error: 'rate_limited' }, 429, { 'retry-after': '60' });
  }

  const captcha = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, body.token, ip);
  if (!captcha.success) {
    console.warn('consult: turnstile rejected', captcha.codes.join(','));
    return json({ ok: false, error: 'captcha' }, 400);
  }

  const result = validateInquiry(body);
  if (!result.ok) return json({ ok: false, error: 'invalid', fields: result.fields }, 422);

  const lang: InquiryLang = (LANGS as readonly string[]).includes(String(body.lang)) ? (body.lang as InquiryLang) : 'ko';
  const page = typeof body.page === 'string' && body.page.startsWith('/') ? body.page.slice(0, 200) : '';
  // 숨긴 칸(hp)이 채워졌으면 저장은 하되 스팸으로 두고 알림을 보내지 않습니다. 자동 완성 실수도 버리지 않으려는 선택입니다.
  const isSpam = typeof body.hp === 'string' && body.hp.trim() !== '';
  const item: NewInquiry = {
    ...result.value,
    id: typeof body.id === 'string' && UUID_RE.test(body.id) ? body.id.toLowerCase() : crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    lang,
    page,
    status: isSpam ? 'spam' : 'new',
  };

  let saved: { inserted: boolean; createdAt: string };
  try {
    saved = await insertInquiry(env.DB, item);
  } catch (error) {
    console.error('consult: insert failed', error instanceof Error ? error.message : error);
    return json({ ok: false, error: 'server' }, 500);
  }

  const origin = new URL(request.url).origin;
  if (saved.inserted && !isSpam) ctx.waitUntil(notifyNewInquiry(env, item, origin));
  ctx.waitUntil(purgeExpired(env.DB).catch(() => 0));

  return json({ ok: true, id: item.id, createdAt: saved.createdAt });
};

export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), {
    status: 405,
    headers: { allow: 'POST', 'content-type': 'application/json; charset=utf-8' },
  });
