// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// 정적 페이지는 빌드 때 만들고(dist/), prerender = false인 경로(/api/consult, /admin)만 Cloudflare Worker가 처리합니다.
export default defineConfig({
  site: 'https://insightflo.co',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: { enabled: true },
    workerEntryPoint: { path: 'src/worker.ts' },
  }),
  integrations: [
    sitemap({
      filter: (page) => !/\/(admin|api)(\/|$)/.test(new URL(page).pathname),
    }),
  ],
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
