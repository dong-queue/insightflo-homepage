> 2026-10-30 개편으로 이 문서의 색·서체·컴포넌트 정의는 더 이상 쓰지 않습니다. 현재 기준: `10-content-strategy.md` 7절, `src/styles/global.css`.

# Design System

## 1. 디자인 방향

### 1.1 키워드
- **전문적 (Professional)**
- **신뢰감 (Trustworthy)**
- **모던 (Modern)**
- **클린 (Clean)**

### 1.2 분위기
코포릿/비즈니스 톤, 딥블루와 그레이 기반의 차분하고 신뢰감 있는 디자인

---

## 2. 컬러 팔레트

### 2.1 Primary Colors

| 이름 | 용도 | HEX | Tailwind |
|------|------|-----|----------|
| Deep Blue | 주요 브랜드 색상, CTA | #1E3A5F | `blue-900` 또는 커스텀 |
| Navy | 헤더, 강조 | #0F172A | `slate-900` |

### 2.2 Secondary Colors

| 이름 | 용도 | HEX | Tailwind |
|------|------|-----|----------|
| Light Blue | 링크, 하이라이트 | #3B82F6 | `blue-500` |
| Accent | 특별 강조 | #2563EB | `blue-600` |

### 2.3 Neutral Colors

| 이름 | 용도 | HEX | Tailwind |
|------|------|-----|----------|
| White | 배경 | #FFFFFF | `white` |
| Light Gray | 섹션 배경 | #F8FAFC | `slate-50` |
| Gray | 본문 텍스트 | #64748B | `slate-500` |
| Dark Gray | 제목 텍스트 | #1E293B | `slate-800` |

### 2.4 시맨틱 컬러

| 이름 | 용도 | HEX |
|------|------|-----|
| Success | 성공 상태 | #22C55E |
| Error | 에러 상태 | #EF4444 |
| Warning | 경고 상태 | #F59E0B |

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

| 용도 | 폰트 | Fallback |
|------|------|----------|
| 한글 | Pretendard | Noto Sans KR, sans-serif |
| 영문 | Inter | system-ui, sans-serif |
| 코드 | JetBrains Mono | monospace |

### 3.2 폰트 사이즈 (Tailwind 기준)

| 레벨 | 용도 | 크기 | Tailwind |
|------|------|------|----------|
| H1 | 히어로 타이틀 | 48px / 60px | `text-5xl` / `text-6xl` |
| H2 | 섹션 타이틀 | 36px | `text-4xl` |
| H3 | 서브 타이틀 | 24px | `text-2xl` |
| H4 | 카드 타이틀 | 20px | `text-xl` |
| Body | 본문 | 16px | `text-base` |
| Small | 부가 설명 | 14px | `text-sm` |
| XSmall | 캡션, 라벨 | 12px | `text-xs` |

### 3.3 폰트 웨이트

| 용도 | Weight | Tailwind |
|------|--------|----------|
| 일반 본문 | 400 | `font-normal` |
| 강조 | 500 | `font-medium` |
| 서브타이틀 | 600 | `font-semibold` |
| 타이틀 | 700 | `font-bold` |

---

## 4. 스페이싱

### 4.1 기본 단위
8px 그리드 시스템 (Tailwind 기본값 활용)

### 4.2 섹션 간 여백

| 용도 | 크기 | Tailwind |
|------|------|----------|
| 섹션 간 여백 | 96px / 80px | `py-24` / `py-20` |
| 섹션 내 요소 간 | 48px | `gap-12` |
| 카드 간 | 24px | `gap-6` |
| 요소 내부 | 16px | `p-4` |

### 4.3 컨테이너

| 용도 | 최대 너비 | Tailwind |
|------|----------|----------|
| 콘텐츠 영역 | 1280px | `max-w-7xl` |
| 좁은 콘텐츠 | 768px | `max-w-3xl` |
| 좌우 패딩 | 24px | `px-6` |

---

## 5. 컴포넌트 스타일

### 5.1 버튼

```css
/* Primary Button */
.btn-primary {
  @apply bg-blue-600 text-white px-6 py-3 rounded-lg
         font-semibold hover:bg-blue-700
         transition-colors duration-200;
}

/* Secondary Button */
.btn-secondary {
  @apply border-2 border-blue-600 text-blue-600 px-6 py-3
         rounded-lg font-semibold hover:bg-blue-50
         transition-colors duration-200;
}
```

### 5.2 카드

```css
.card {
  @apply bg-white rounded-xl shadow-md p-6
         hover:shadow-lg transition-shadow duration-200;
}
```

### 5.3 아이콘 뱃지 (기술 스택용)

```css
.tech-badge {
  @apply flex items-center gap-2 px-4 py-2
         bg-slate-100 rounded-lg text-slate-700;
}
```

---

## 6. 그림자 & 효과

### 6.1 그림자

| 용도 | Tailwind |
|------|----------|
| 카드 기본 | `shadow-md` |
| 카드 호버 | `shadow-lg` |
| 헤더 | `shadow-sm` |

### 6.2 모서리 둥글기

| 용도 | Tailwind |
|------|----------|
| 버튼 | `rounded-lg` (8px) |
| 카드 | `rounded-xl` (12px) |
| 아이콘 배경 | `rounded-full` |

### 6.3 트랜지션

```css
/* 기본 트랜지션 */
.transition-default {
  @apply transition-all duration-200 ease-in-out;
}
```

---

## 7. 반응형 디자인

### 7.1 브레이크포인트

| 이름 | 크기 | Tailwind |
|------|------|----------|
| Mobile | < 640px | (default) |
| Tablet | >= 640px | `sm:` |
| Laptop | >= 768px | `md:` |
| Desktop | >= 1024px | `lg:` |
| Large | >= 1280px | `xl:` |

### 7.2 반응형 패턴

```css
/* 그리드 예시 */
.service-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.tech-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4;
}
```

---

## 8. 아이콘

### 8.1 아이콘 세트
- **UI 아이콘**: Lucide Icons 또는 Heroicons
- **기술 스택**: Simple Icons, Devicons

### 8.2 아이콘 크기

| 용도 | 크기 | Tailwind |
|------|------|----------|
| 인라인 | 16px | `w-4 h-4` |
| 기본 | 24px | `w-6 h-6` |
| 강조 | 32px | `w-8 h-8` |
| 히어로 | 48px | `w-12 h-12` |

---

## 9. 이미지 가이드

### 9.1 이미지 비율

| 용도 | 비율 |
|------|------|
| 히어로 배경 | 16:9 또는 전체 화면 |
| 포트폴리오 썸네일 | 16:9 |
| 프로필 | 1:1 (원형) |

### 9.2 이미지 최적화
- 형식: WebP 우선, fallback으로 JPEG/PNG
- 최대 너비: 2x 디스플레이 고려 (예: 1280px 표시 → 2560px 원본)
- 지연 로딩: 스크롤 영역 이미지

---

## 10. Tailwind 커스텀 설정

```javascript
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A5F',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
```
