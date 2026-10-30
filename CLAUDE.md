# CLAUDE.md - 회사 소개 페이지

> 이 파일은 Claude Code가 프로젝트를 이해하는 데 사용됩니다.

## 프로젝트 개요

**InsightFlo 회사 홈페이지** - FDE 방식의 AI 업무 자동화와 에이전트 실행 시스템 paperwork를 소개하는 정적 웹사이트입니다.

- **목적**: 프로젝트 의뢰 기업과 협업 파트너에게 신뢰감 형성
- **타입**: 정적 사이트 (원페이지)
- **배포**: GitHub Pages

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Astro |
| 스타일링 | Tailwind CSS |
| 언어 | TypeScript |
| 호스팅 | GitHub Pages |
| CI/CD | GitHub Actions |

## 프로젝트 구조

```
insightflo-homepage/
├── src/
│   ├── components/
│   │   ├── common/          # Header(떠 있는 내비), Footer, Logo(인 도장), Icon(직접 그린 선 아이콘)
│   │   ├── sections/        # Hero, Paperwork, Tagline, Proof, HowWeWork, Profile, FAQ, Contact
│   │   └── pages/           # Home, Company (ko/en 페이지가 공유)
│   ├── i18n/ui.ts           # 모든 문안(ko/en), 제품 이름 상수 PRODUCT, 링크 모음 links
│   ├── layouts/Layout.astro # 메타, og:image, 구조화 데이터, 서체, 건너뛰기 링크
│   ├── pages/               # index, company, privacy, 404, en/index, en/company
│   └── styles/global.css    # 디자인 토큰(@theme)과 공용 스타일. 첫 줄은 디자인 스탬프
├── public/                  # favicon(svg/ico), apple-touch-icon, og.png, og-en.png, images/
├── docs/planning/10-content-strategy.md  # 현재 콘텐츠 전략, 숫자 출처, 디자인 결정
└── astro.config.mjs
```

## 주요 명령어

```bash
npm run dev       # 개발 서버
npm run build     # 프로덕션 빌드 (dist/)
npm run preview   # 빌드 미리보기
```

## 화면 구성 (2026-10-30 개편)

방향: 개인은 FDE, 제품은 paperwork(구 papercompany, 저장소 papercompany-runtime). 주요 행동은 상담 메일 하나.

문체: 한국어 문안은 합니다체로 통일합니다(해요체 금지). 버튼과 라벨은 명사형(예: "상담 메일 쓰기").

1. **Hero** (#hero) - 약속 한 줄 + 실행 영수증(실제 시험 실행 숫자)
2. **Paperwork** (#paperwork) - 실행 흐름(게이트, 재작업 루프)과 세 가지 성질
3. **Tagline** - 믿음 한 줄, 스크롤하면 단어별로 켜짐
4. **Proof** (#proof) - 어두운 면. mock.co.kr 발행 수, 판단 계층 A/B
5. **HowWeWork** (#how) - FDE 진행 순서
6. **Profile** (#profile) - 경력, 고객 프로젝트, 공개 채널
7. **FAQ** (#faq) - 8문항, FAQPage 구조화 데이터
8. **Contact** (#contact) - 상담 메일(제목·본문 양식), 주소 복사

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
- 초기 기획 문서(2026-01, 일부는 개편 전 내용): `docs/planning/`, `specs/screens/`, `TASKS.md`
