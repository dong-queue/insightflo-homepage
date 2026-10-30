// 관리 화면 접근 확인(Cloudflare Access 토큰) 테스트. 실행: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPair, exportJWK, SignJWT, createLocalJWKSet } from 'jose';
import { verifyAccessToken, checkAdmin, parseAdminEmails } from '../src/server/access.ts';

const ISSUER = 'https://insightflo.cloudflareaccess.com';
const AUD = 'aud-tag-for-admin-app';

async function keyset() {
  const { publicKey, privateKey } = await generateKeyPair('RS256');
  const jwk = { ...(await exportJWK(publicKey)), kid: 'k1', alg: 'RS256' };
  return { privateKey, jwks: createLocalJWKSet({ keys: [jwk] }) };
}

function sign(privateKey, claims = {}, { iss = ISSUER, aud = AUD, exp = '5m', kid = 'k1' } = {}) {
  return new SignJWT({ email: 'teo@insightflo.co', ...claims })
    .setProtectedHeader({ alg: 'RS256', kid })
    .setIssuer(iss)
    .setAudience(aud)
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(privateKey);
}

test('올바른 토큰은 통과하고 메일을 돌려줍니다', async () => {
  const { privateKey, jwks } = await keyset();
  const token = await sign(privateKey);
  const result = await verifyAccessToken(token, jwks, { issuer: ISSUER, audience: AUD, allowedEmails: ['teo@insightflo.co'] });
  assert.deepEqual(result, { ok: true, email: 'teo@insightflo.co' });
});

test('다른 애플리케이션(AUD), 다른 팀(ISS), 만료, 다른 키로 서명한 토큰은 막습니다', async () => {
  const { privateKey, jwks } = await keyset();
  const other = await keyset();
  const cases = [
    await sign(privateKey, {}, { aud: 'another-app' }),
    await sign(privateKey, {}, { iss: 'https://evil.cloudflareaccess.com' }),
    await sign(privateKey, {}, { exp: Math.floor(Date.now() / 1000) - 60 }),
    await sign(other.privateKey),
    'not-a-jwt',
  ];
  for (const token of cases) {
    const result = await verifyAccessToken(token, jwks, { issuer: ISSUER, audience: AUD });
    assert.equal(result.ok, false);
    assert.equal(result.reason, 'invalid_token');
  }
});

test('허용 목록에 없는 메일은 막습니다', async () => {
  const { privateKey, jwks } = await keyset();
  const token = await sign(privateKey, { email: 'someone@example.com' });
  const result = await verifyAccessToken(token, jwks, { issuer: ISSUER, audience: AUD, allowedEmails: ['teo@insightflo.co'] });
  assert.deepEqual(result, { ok: false, status: 403, reason: 'not_allowed' });
});

test('HS256으로 바꿔 서명한 토큰(알고리즘 바꿔치기)은 막습니다', async () => {
  const { jwks } = await keyset();
  const token = await new SignJWT({ email: 'teo@insightflo.co' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(ISSUER)
    .setAudience(AUD)
    .setExpirationTime('5m')
    .sign(new TextEncoder().encode('guessable-secret-guessable-secret'));
  const result = await verifyAccessToken(token, jwks, { issuer: ISSUER, audience: AUD });
  assert.equal(result.ok, false);
});

test('설정이 없거나 형식이 틀리면 닫힌 상태(503)이고, 토큰이 없으면 403입니다', async () => {
  const request = new Request('https://insightflo.co/admin/inquiries');
  assert.equal((await checkAdmin(request, {}, false)).status, 503);
  assert.equal((await checkAdmin(request, { ACCESS_TEAM_DOMAIN: 'http://evil.example', ACCESS_AUD: AUD }, false)).status, 503);
  assert.equal((await checkAdmin(request, { ACCESS_TEAM_DOMAIN: ISSUER, ACCESS_AUD: '' }, false)).status, 503);
  const missing = await checkAdmin(request, { ACCESS_TEAM_DOMAIN: ISSUER, ACCESS_AUD: AUD }, false);
  assert.deepEqual(missing, { ok: false, status: 403, reason: 'missing_token' });
});

test('관리자 메일 목록은 쉼표로 나누고 소문자로 맞춥니다', () => {
  assert.deepEqual(parseAdminEmails(' Teo@InsightFlo.co, ,kwak@example.com '), ['teo@insightflo.co', 'kwak@example.com']);
  assert.deepEqual(parseAdminEmails(undefined), []);
});
