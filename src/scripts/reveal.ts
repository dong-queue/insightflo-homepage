// 원형 전환 연출: 테마 전환과 언어 전환이 같이 씁니다.
// mock.co.kr(manual-onboarding)의 src/reader/theme-reveal.ts, shared/theme-reveal.ts(2026-10-29)를 옮겨 왔습니다.
// 새 화면을 버튼 중심의 원으로 잘라 가장 먼 화면 모서리까지 키웁니다.
// 즉시 전환: 움직임 줄이기 설정, 삼성 인터넷(실기기에서 화면이 세로로 찌그러짐), API 미지원, 전환 시작 실패.

/** 영상 실측으로 맞춘 값입니다. 약 0.4초에 화면의 95%를 덮고 남은 테두리를 천천히 채웁니다. */
export const REVEAL_MS = 850;
export const REVEAL_EASING = 'cubic-bezier(.16,1,.3,1)';

export const THEME_KEY = 'insightflo:theme';
export const LANG_REVEAL_KEY = 'insightflo:lang-reveal';

/** meta theme-color 값. global.css의 --color-paper(라이트·다크)와 같은 값을 유지합니다. */
export const THEME_COLOR = { light: '#f3f4f2', dark: '#131412' } as const;

export type Theme = keyof typeof THEME_COLOR;

/** 원점에서 가장 먼 화면 모서리까지의 거리. 원이 화면 전체를 덮는 최소 반지름입니다. */
export function revealRadius(x: number, y: number, width = window.innerWidth, height = window.innerHeight): number {
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
}

/** 요소 중심. 키보드로 눌러도 마우스와 같은 자리에서 퍼집니다. 숨은 요소면 null입니다. */
export function elementCenter(element: Element): { x: number; y: number } | null {
  const rect = element.getBoundingClientRect();
  if (!rect.width && !rect.height) return null;
  return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) };
}

export function skipReveal(): boolean {
  let reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    reduce = false;
  }
  return reduce || /SamsungBrowser\//i.test(navigator.userAgent);
}

/** 새 화면(::view-transition-new(root))을 원으로 키웁니다. */
export function animateReveal(x: number, y: number): void {
  const at = `at ${x}px ${y}px`;
  document.documentElement.animate(
    { clipPath: [`circle(0px ${at})`, `circle(${revealRadius(x, y)}px ${at})`] },
    { duration: REVEAL_MS, easing: REVEAL_EASING, pseudoElement: '::view-transition-new(root)' },
  );
}

/** update(상태 변경)를 원형 연출로 감쌉니다. update는 어느 경로든 정확히 한 번 실행됩니다. */
export function revealChange(update: () => void, origin: { x: number; y: number } | null): void {
  if (!origin || skipReveal() || typeof document.startViewTransition !== 'function') {
    update();
    return;
  }
  let vt: ViewTransition;
  try {
    vt = document.startViewTransition(update);
  } catch {
    update();
    return;
  }
  // update가 실패하면 세 약속이 모두 거절됩니다. 실패는 한 번만 알리고 나머지는 조용히 받습니다.
  vt.updateCallbackDone.catch((error) => console.warn('theme change failed', error));
  vt.finished.catch(() => {});
  vt.ready.then(
    () => animateReveal(origin.x, origin.y),
    () => {},
  );
}
