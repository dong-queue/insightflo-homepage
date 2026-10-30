// Cloudflare 바인딩의 최소 타입. 이 프로젝트가 쓰는 부분만 적었습니다.
// @cloudflare/workers-types를 전역으로 불러오면 브라우저 타입과 충돌해서 직접 선언합니다.

export interface D1Result<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
  meta: { changes?: number; last_row_id?: number; duration?: number; [key: string]: unknown };
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(column?: string): Promise<T | null>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = Record<string, unknown>>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

/** Workers Rate Limiting 바인딩 */
export interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface EmailAddress {
  email: string;
  name?: string;
}

/** Cloudflare Email Service의 send_email 바인딩(구조화 메시지 방식) */
export interface EmailBinding {
  send(message: {
    to: string | EmailAddress;
    from: string | EmailAddress;
    subject: string;
    text?: string;
    html?: string;
    replyTo?: string | EmailAddress;
  }): Promise<{ messageId: string }>;
}

export interface WaitUntilContext {
  waitUntil(promise: Promise<unknown>): void;
}

export interface SiteEnv {
  DB: D1Database;
  ASSETS: { fetch(request: Request | string): Promise<Response> };
  CONSULT_LIMITER?: RateLimitBinding;
  EMAIL?: EmailBinding;
  TURNSTILE_SECRET_KEY?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  /** 테스트에서만 바꿉니다. 기본값 https://api.telegram.org */
  TELEGRAM_API_BASE?: string;
  MAIL_FROM?: string;
  MAIL_TO?: string;
  /** 예: https://insightflo.cloudflareaccess.com */
  ACCESS_TEAM_DOMAIN?: string;
  /** Cloudflare Access 애플리케이션의 AUD 태그 */
  ACCESS_AUD?: string;
  /** 쉼표로 구분한 관리자 메일. 비어 있으면 Access 정책만 따릅니다. */
  ADMIN_EMAILS?: string;
}
