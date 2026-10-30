// 서버에서 만드는 응답(관리 화면, API)에만 붙이는 헤더. 정적 페이지 헤더는 public/_headers에 있습니다.
import { defineMiddleware } from 'astro:middleware';

const PRIVATE_PREFIXES = ['/admin', '/api/'];

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const path = context.url.pathname;
  if (!PRIVATE_PREFIXES.some((prefix) => path.startsWith(prefix))) return response;

  const headers = new Headers(response.headers);
  headers.set('cache-control', 'no-store');
  headers.set('x-robots-tag', 'noindex, nofollow');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('referrer-policy', 'same-origin');
  headers.set('x-frame-options', 'DENY');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
});
