// 관리 화면 접근 확인. Cloudflare Access가 앞에서 로그인을 받고, 이 코드는 Access가 붙인
// 서명 토큰(Cf-Access-Jwt-Assertion)을 다시 확인합니다. 설정이 비어 있으면 닫힌 상태로 둡니다.
import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from 'jose';
import type { SiteEnv } from './cf-types';

export type AdminCheck =
  | { ok: true; email: string }
  | { ok: false; status: 403 | 503; reason: 'not_configured' | 'missing_token' | 'invalid_token' | 'not_allowed' };

const TEAM_DOMAIN_RE = /^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/;
const jwksByTeam = new Map<string, JWTVerifyGetKey>();

/** 순수 확인 함수. 테스트에서는 로컬 키 묶음(JWKS)을 넘깁니다. */
export async function verifyAccessToken(
  token: string,
  keys: JWTVerifyGetKey,
  options: { issuer: string; audience: string; allowedEmails?: string[] },
): Promise<AdminCheck> {
  try {
    const { payload } = await jwtVerify(token, keys, {
      issuer: options.issuer,
      audience: options.audience,
      algorithms: ['RS256'],
    });
    const email = typeof payload.email === 'string' ? payload.email.toLowerCase() : '';
    if (options.allowedEmails?.length && !options.allowedEmails.includes(email)) {
      return { ok: false, status: 403, reason: 'not_allowed' };
    }
    return { ok: true, email };
  } catch {
    return { ok: false, status: 403, reason: 'invalid_token' };
  }
}

export function parseAdminEmails(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

/** 운영에서 쓰는 확인. dev 서버(astro dev)에서만 확인을 건너뜁니다. */
export async function checkAdmin(request: Request, env: SiteEnv, devBypass: boolean): Promise<AdminCheck> {
  if (devBypass) return { ok: true, email: 'dev@localhost' };
  const team = (env.ACCESS_TEAM_DOMAIN ?? '').trim().replace(/\/+$/, '');
  const audience = (env.ACCESS_AUD ?? '').trim();
  if (!TEAM_DOMAIN_RE.test(team) || !audience) return { ok: false, status: 503, reason: 'not_configured' };

  const token = request.headers.get('cf-access-jwt-assertion');
  if (!token) return { ok: false, status: 403, reason: 'missing_token' };

  let keys = jwksByTeam.get(team);
  if (!keys) {
    keys = createRemoteJWKSet(new URL(`${team}/cdn-cgi/access/certs`));
    jwksByTeam.set(team, keys);
  }
  return verifyAccessToken(token, keys, { issuer: team, audience, allowedEmails: parseAdminEmails(env.ADMIN_EMAILS) });
}
