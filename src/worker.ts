// Cloudflare Worker 진입점. 요청 처리는 Astro 어댑터의 기본 처리기를 그대로 쓰고,
// 매일 한 번(wrangler.jsonc의 triggers.crons) 보관 기간이 지난 문의를 지웁니다.
import type { SSRManifest } from 'astro';
import { App } from 'astro/app';
import { handle } from '@astrojs/cloudflare/handler';
import { purgeExpired } from './server/inquiries';
import type { SiteEnv, WaitUntilContext } from './server/cf-types';

type HandleArgs = Parameters<typeof handle>;

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);
  return {
    default: {
      async fetch(request: Request, env: SiteEnv, ctx: WaitUntilContext) {
        return handle(manifest, app, request as unknown as HandleArgs[2], env as unknown as HandleArgs[3], ctx as unknown as HandleArgs[4]);
      },
      async scheduled(_controller: unknown, env: SiteEnv, ctx: WaitUntilContext) {
        ctx.waitUntil(
          purgeExpired(env.DB).then(
            (removed) => console.log(`purge: removed ${removed} expired inquiries`),
            (error) => console.error('purge failed', error instanceof Error ? error.message : error),
          ),
        );
      },
    },
  };
}
