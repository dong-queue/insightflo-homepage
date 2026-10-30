// 서버 응답 공용 함수
export function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
}

/** 다른 사이트에서 보낸 요청을 막습니다. 같은 출처의 fetch와 폼 전송은 Origin 헤더가 요청 주소와 같습니다. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

/** 본문을 최대 maxBytes까지만 읽습니다. 넘으면 null. */
export async function readBodyLimited(request: Request, maxBytes: number): Promise<string | null> {
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > maxBytes) return null;
  const text = await request.text();
  return new TextEncoder().encode(text).length > maxBytes ? null : text;
}
