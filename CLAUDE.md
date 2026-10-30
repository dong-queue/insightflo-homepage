# CLAUDE.md - 회사 소개 페이지

> 이 파일은 Claude Code가 프로젝트를 이해하는 데 사용됩니다.

## 프로젝트 개요

**InsightFlo 회사 홈페이지** - FDE 방식의 AI 업무 자동화와 에이전트 실행 시스템 paperwork를 소개하는 정적 웹사이트입니다.

- **목적**: 프로젝트 의뢰 기업과 협업 파트너에게 신뢰감을 주고 상담 신청을 받습니다
- **타입**: 정적 사이트(원페이지) + 상담 신청 API와 문의 관리 화면
- **배포**: Cloudflare Workers. 정적 페이지는 빌드한 파일 그대로 나가고 `/api/consult`와 `/admin`만 Worker가 처리합니다. 전환 절차와 운영 메모는 `docs/planning/11-cloudflare-migration.md`(전환을 마치기 전까지 운영 사이트는 GitHub Pages)

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Astro |
| 스타일링 | Tailwind CSS |
| 언어 | TypeScript |
| 호스팅 | Cloudflare Workers + Static Assets (`@astrojs/cloudflare` 12, Astro 5용) |
| 데이터 | Cloudflare D1(문의). 매일 03:00(한국 시간) cron이 1년 지난 문의를 지웁니다 |
| 보호 | Turnstile(신청서), Rate Limiting(IP당 1분 5건), Cloudflare Access(관리 화면) |
| 알림 | 텔레그램 봇, Cloudflare Email Service |
| CI/CD | GitHub Actions → `wrangler deploy` (`.github/workflows/deploy-cloudflare.yml`) |

## 프로젝트 구조

```
insightflo-homepage/
├── src/
│   ├── components/
│   │   ├── common/          # Header(떠 있는 내비), Footer, Logo(인 도장), Icon(직접 그린 선 아이콘)
│   │   ├── sections/        # Hero, Paperwork, Tagline, Proof, HowWeWork, Profile, FAQ, Contact
│   │   └── pages/           # Home, Company (ko/en 페이지가 공유)
│   ├── i18n/ui.ts           # 모든 문안(ko/en), 제품 이름 상수 PRODUCT, 링크 모음 links
│   ├── layouts/             # Layout(메타, og:image, 구조화 데이터, 서체, 건너뛰기 링크), AdminLayout
│   ├── pages/               # index, company, privacy, 404, en/*, api/consult.ts, admin/inquiries.astro
│   ├── lib/consult-schema.ts  # 신청서 입력 규칙. 브라우저와 서버가 같이 씁니다
│   ├── scripts/             # reveal.ts(테마·언어 전환), consult-form.ts(신청서 제출, Turnstile 지연 로드)
│   ├── server/              # Worker 전용: inquiries(D1), notify(텔레그램·메일), access(Access 토큰), turnstile, http, cf-types
│   ├── middleware.ts        # /admin, /api 응답에 no-store, noindex 같은 헤더
│   ├── worker.ts            # Worker 진입점. fetch는 Astro, scheduled는 보관 기간 지난 문의 삭제
│   └── styles/global.css    # 디자인 토큰(@theme)과 공용 스타일. 첫 줄은 디자인 스탬프
├── public/                  # favicon, og 이미지, _headers(보안 헤더), .assetsignore, robots.txt
├── migrations/              # D1 스키마
├── tests/                   # node --test (Access 토큰 검사, 신청서 검사)
├── docs/planning/           # 10-content-strategy.md(전략, 숫자 출처, 디자인), 11-cloudflare-migration.md(전환)
├── wrangler.jsonc           # Worker 설정: D1, 요청 제한, 메일, cron, 환경 변수
└── astro.config.mjs
```

## 주요 명령어

```bash
cp .dev.vars.example .dev.vars   # 처음 한 번: 로컬 비밀 값(Turnstile 테스트 키)
npm run db:migrate:local         # 처음 한 번, 그리고 migrations/가 바뀔 때: 로컬 D1에 표 만들기
npm run dev       # 개발 서버. Turnstile 테스트 키를 쓰고, 관리 화면이 Access 없이 열립니다
npm run build     # 운영 빌드(dist/). PUBLIC_TURNSTILE_SITE_KEY가 비어 있으면 일부러 실패합니다
npm run preview   # wrangler dev로 Worker까지 돌려 봅니다. 먼저 PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build
npm run check     # astro check
npm test          # node --test tests/*.test.mjs
npm run deploy    # 빌드 + 원격 D1 마이그레이션 + 배포. 평소에는 main 푸시로 GitHub Actions가 합니다
```

## 화면 구성 (2026-10-30 개편)

방향: 개인은 FDE, 제품은 paperwork(구 papercompany, 저장소 papercompany-runtime). 주요 행동은 상담 신청서 하나(메일은 대안).

문체: 한국어 문안은 합니다체로 통일합니다(해요체 금지). 버튼과 라벨은 명사형(예: "신청서 보내기", "주소 복사").

1. **Hero** (#hero) - 약속 한 줄 + 실행 영수증(실제 시험 실행 숫자)
2. **Paperwork** (#paperwork) - 실행 흐름(게이트, 재작업 루프)과 세 가지 성질
3. **Tagline** - 믿음 한 줄, 스크롤하면 단어별로 켜짐
4. **Proof** (#proof) - 어두운 면. mock.co.kr 발행 수, 판단 계층 A/B
5. **HowWeWork** (#how) - FDE 진행 순서
6. **Profile** (#profile) - 경력, 고객 프로젝트, 공개 채널
7. **FAQ** (#faq) - 8문항, FAQPage 구조화 데이터
8. **Contact** (#contact) - 상담 신청서와 접수 영수증. 메일 주소와 주소 복사는 대안

## 상담 신청과 문의 관리

- 흐름: 신청서 → `/api/consult` → D1 저장 → 텔레그램·메일 알림(`waitUntil`, 실패해도 신청은 남음) → `/admin/inquiries`에서 상태와 메모 관리
- `/api/consult` 검사 순서: 같은 출처(403) → JSON(415) → 32KB(413) → 비밀 값(503) → 요청 제한(429) → Turnstile(400) → 입력 검사(422) → 허니팟(스팸으로 저장, 알림 없음) → 저장
- 입력 규칙(글자 수, 형식)은 `src/lib/consult-schema.ts` 한 곳에서 고칩니다
- 관리 화면은 Cloudflare Access 뒤에 있고, Worker도 `cf-access-jwt-assertion` 토큰을 검사합니다. `ACCESS_TEAM_DOMAIN`이나 `ACCESS_AUD`가 비면 503으로 닫힙니다. 우회는 개발 서버(`import.meta.env.DEV`)에서만 됩니다
- 개인정보: 보관 기간(`src/server/inquiries.ts`의 `RETENTION_DAYS`, 365일)을 바꾸면 개인정보처리방침 2절도 고칩니다. 텔레그램에는 접수 번호, 한 달 처리 건수, 관리 화면 링크만 보냅니다. 신청 내용을 더 보내려면 방침 4절에 텔레그램을 국외 이전 받는 자로 적습니다
- 비밀 값: `TURNSTILE_SECRET_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. 운영은 `wrangler secret put`, 로컬은 `.dev.vars`(커밋하지 않음)

## 디자인 시스템

- 재료: 종이(`paper`), 잉크(`ink`), 인주색 하나(`stamp`, 사람이 개입하는 지점에만), 증거 섹션의 어두운 면(`night`)
- 서체: Pretendard Variable, 숫자와 영수증은 IBM Plex Mono
- 토큰은 `src/styles/global.css`의 `@theme`에만 둡니다. Tailwind 기본 팔레트는 꺼져 있습니다(`--color-*: initial`)
- 다크 모드: `:root[data-theme="dark"]` 토큰 블록. 색 토큰을 추가하면 라이트(@theme)와 다크 두 곳에 넣고, `--color-paper`를 바꾸면 `src/scripts/reveal.ts`의 THEME_COLOR도 맞춥니다
- 전환 연출: 테마·언어 전환은 `src/scripts/reveal.ts`(mock.co.kr 원형 전환) 하나를 씁니다. 스크립트에 `transition` 같은 유틸리티 이름을 변수로 쓰면 Tailwind가 그 클래스를 만들어 내니 피합니다
- 금지: eyebrow 라벨, 자간 넓힌 대문자 라벨, 배경 그라디언트, Material Symbols, `transition: all`, 근거 없는 숫자
- 움직임: `ease-settle`(cubic-bezier(0.22, 1, 0.36, 1)), transform과 opacity만. 움직임 줄이기 설정과 스크립트 없는 환경에서도 내용이 보여야 합니다
- 숫자를 바꿀 때는 `docs/planning/10-content-strategy.md` 4절의 출처 표를 같이 고칩니다

### 반응형 브레이크포인트
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 코딩 컨벤션

### 파일명
- Astro 컴포넌트: PascalCase (`Hero.astro`)
- 데이터 파일: camelCase (`services.ts`)

### 컴포넌트 구조
```astro
---
// 1. 타입 임포트
// 2. 컴포넌트 임포트
// 3. Props 정의
// 4. 로직
---
<!-- 템플릿 -->
<style>
  /* 스코프 스타일 */
</style>
```

### Tailwind 클래스 순서
레이아웃 → 크기 → 스페이싱 → 배경 → 테두리 → 타이포그래피 → 트랜지션 → 호버

## 참고 문서

- 현재 전략과 디자인: `docs/planning/10-content-strategy.md`
- Cloudflare 전환과 운영: `docs/planning/11-cloudflare-migration.md`
- 초기 기획 문서(2026-01, 일부는 개편 전 내용): `docs/planning/`, `specs/screens/`, `TASKS.md`
