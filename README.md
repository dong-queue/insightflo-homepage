# InsightFlo Homepage

AI 기반 서비스 개발 전문가 홈페이지

## 기술 스택

- **프레임워크**: Astro
- **스타일링**: Tailwind CSS v4
- **언어**: TypeScript
- **배포**: Cloudflare Workers (정적 페이지 + 상담 신청 API, 문의 관리 화면), D1, Turnstile, Cloudflare Access

## 프로젝트 구조

```
insightflo-homepage/
├── src/
│   ├── components/
│   │   ├── common/       # 공통 컴포넌트
│   │   └── sections/     # 섹션별 컴포넌트
│   ├── layouts/          # 레이아웃
│   │   └── Layout.astro
│   ├── pages/            # 페이지
│   │   ├── index.astro
│   │   ├── api/consult.ts        # 상담 신청 접수 API
│   │   └── admin/inquiries.astro # 문의 관리 화면
│   ├── server/           # Worker 전용 코드(D1, 알림, Access 검사)
│   ├── worker.ts         # Worker 진입점(요청 처리, 매일 보관 기간 지난 문의 삭제)
│   ├── data/             # 정적 데이터
│   │   ├── services.ts
│   │   └── techStack.ts
│   ├── styles/           # 글로벌 스타일
│   │   └── global.css
│   └── types/            # 타입 정의
│       └── index.ts
├── docs/                 # 기획 문서
├── specs/                # 화면 명세
├── migrations/           # D1 스키마
├── public/               # 정적 파일
└── wrangler.jsonc        # Cloudflare Worker 설정
```

## 시작하기

### 개발 서버 실행

처음 한 번 로컬 비밀 값과 로컬 D1을 준비합니다.

```bash
cp .dev.vars.example .dev.vars
npm run db:migrate:local
```

```bash
npm run dev
```

로컬 서버: http://localhost:4321

### 빌드

```bash
npm run build
```

빌드 결과물: `./dist/`. 운영 빌드에는 Turnstile 사이트 키가 필요합니다(`PUBLIC_TURNSTILE_SITE_KEY`, 없으면 빌드가 실패합니다).

### 프리뷰

wrangler dev로 Worker까지 로컬에서 돌립니다.

```bash
PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build
npm run preview
```

### 검사

```bash
npm run check
npm test
```

## 배포

`main` 브랜치에 푸시하면 GitHub Actions가 테스트, 빌드, D1 마이그레이션 후 Cloudflare Workers에 배포합니다. 처음 전환하는 절차는 [Cloudflare 전환 체크리스트](docs/planning/11-cloudflare-migration.md)에 있습니다.

## 문서

- [PRD](docs/planning/01-prd.md) - 프로젝트 요구사항
- [TRD](docs/planning/02-trd.md) - 기술 요구사항
- [Design System](docs/planning/05-design-system.md) - 디자인 시스템
- [Coding Convention](docs/planning/07-coding-convention.md) - 코딩 컨벤션
- [Content Strategy](docs/planning/10-content-strategy.md) - 현재 콘텐츠 전략과 디자인 결정
- [Cloudflare Migration](docs/planning/11-cloudflare-migration.md) - Cloudflare 전환과 운영

## 라이센스

MIT
