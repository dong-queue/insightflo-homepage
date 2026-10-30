/// <reference path="../.astro/types.d.ts" />

type SiteEnv = import('./server/cf-types').SiteEnv;
type CloudflareRuntime = import('@astrojs/cloudflare').Runtime<SiteEnv>;

declare namespace App {
  interface Locals extends CloudflareRuntime {}
}

interface ImportMetaEnv {
  /** Cloudflare Turnstile 사이트 키. 운영 빌드에서는 반드시 설정합니다. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
