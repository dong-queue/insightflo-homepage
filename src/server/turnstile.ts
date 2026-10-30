// Cloudflare Turnstile 서버 확인. 토큰은 한 번만 쓸 수 있고 5분 뒤 만료됩니다.
const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export interface TurnstileResult {
  success: boolean;
  codes: string[];
}

export async function verifyTurnstile(secret: string, token: unknown, remoteIp: string): Promise<TurnstileResult> {
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048) {
    return { success: false, codes: ['missing-input-response'] };
  }
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (remoteIp) body.append('remoteip', remoteIp);
  try {
    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body });
    const data = (await res.json().catch(() => null)) as { success?: boolean; 'error-codes'?: string[] } | null;
    return { success: data?.success === true, codes: data?.['error-codes'] ?? [`http-${res.status}`] };
  } catch (error) {
    console.error('turnstile verify error', error instanceof Error ? error.message : error);
    return { success: false, codes: ['internal-error'] };
  }
}
