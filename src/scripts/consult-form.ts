// 상담 신청서 동작: 입력 검사 → Turnstile 토큰 → /api/consult 전송 → 접수 영수증 표시.
// Turnstile 스크립트는 신청서가 화면에 가까워지거나 입력을 시작할 때만 불러옵니다.
import { validateInquiry, shortId, LIMITS, type FieldName, type FieldError } from '../lib/consult-schema';

type Messages = {
  errors: Record<string, string>;
  submit: string;
  sending: string;
};

type TurnstileApi = {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  reset(widgetId?: string): void;
  getResponse(widgetId?: string): string | undefined;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    __insightfloTurnstileReady?: () => void;
  }
}

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__insightfloTurnstileReady';
const FIELD_LIMIT: Partial<Record<FieldName, number>> = {
  name: LIMITS.name,
  company: LIMITS.company,
  email: LIMITS.email,
  phone: LIMITS.phone,
  task: LIMITS.task,
  current: LIMITS.current,
};

let turnstilePromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (turnstilePromise) return turnstilePromise;
  turnstilePromise = new Promise<TurnstileApi>((resolve, reject) => {
    window.__insightfloTurnstileReady = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile missing')));
    const script = document.createElement('script');
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      turnstilePromise = null;
      reject(new Error('turnstile load failed'));
    };
    document.head.appendChild(script);
  });
  return turnstilePromise;
}

function uuid(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

export function initConsultForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-consult-form]');
  const doneEl = document.querySelector<HTMLElement>('[data-consult-done]');
  if (!form || !doneEl) return;

  const messages = JSON.parse(form.dataset.messages ?? '{}') as Messages;
  const lang = form.dataset.lang === 'en' ? 'en' : 'ko';
  const siteKey = form.dataset.sitekey ?? '';
  const fieldset = form.querySelector<HTMLFieldSetElement>('[data-fields]');
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const statusEl = form.querySelector<HTMLElement>('[data-status]');
  const alertEl = form.querySelector<HTMLElement>('[data-form-error]');
  const captchaEl = form.querySelector<HTMLElement>('[data-turnstile]');
  if (!submit || !captchaEl) return;

  const submissionId = uuid();
  let widgetId: string | null = null;
  let token: string | null = null;
  let waiters: Array<(value: string | null) => void> = [];
  let busy = false;

  const settleToken = (value: string | null) => {
    token = value;
    const pending = waiters;
    waiters = [];
    pending.forEach((resolve) => resolve(value));
  };

  let widgetPromise: Promise<void> | null = null;
  const ensureWidget = (): Promise<void> => {
    if (widgetPromise) return widgetPromise;
    widgetPromise = loadTurnstile()
      .then((api) => {
        widgetId = api.render(captchaEl, {
          sitekey: siteKey,
          action: 'consult',
          appearance: 'interaction-only',
          size: 'flexible',
          language: lang,
          theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
          callback: (value: string) => settleToken(value),
          'expired-callback': () => {
            token = null;
          },
          'error-callback': () => {
            settleToken(null);
            return true;
          },
        });
      })
      .catch((error) => {
        widgetPromise = null;
        throw error;
      });
    return widgetPromise;
  };

  const waitForToken = (timeoutMs: number): Promise<string | null> => {
    if (token) return Promise.resolve(token);
    return new Promise((resolve) => {
      const timer = window.setTimeout(() => {
        waiters = waiters.filter((w) => w !== done);
        resolve(null);
      }, timeoutMs);
      const done = (value: string | null) => {
        window.clearTimeout(timer);
        resolve(value);
      };
      waiters.push(done);
    });
  };

  // 화면에 가까워지거나 입력을 시작하면 보안 확인을 미리 준비합니다.
  const warm = () => ensureWidget().catch(() => {});
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          warm();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(form);
  }
  form.addEventListener('focusin', warm, { once: true });

  const fieldInput = (name: FieldName) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;

  const setFieldError = (name: FieldName, error: FieldError | null) => {
    const input = fieldInput(name);
    const errorEl = form.querySelector<HTMLElement>(`#cf-${name}-error`);
    if (!input || !errorEl) return;
    if (!error) {
      input.removeAttribute('aria-invalid');
      errorEl.hidden = true;
      errorEl.textContent = '';
      return;
    }
    const key = error === 'too_long' ? 'too_long' : `${name}_${error}`;
    const text = (messages.errors[key] ?? messages.errors.summary).replace('{n}', String(FIELD_LIMIT[name] ?? ''));
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = text;
    errorEl.hidden = false;
  };

  const showAlert = (text: string | null) => {
    if (!alertEl) return;
    alertEl.textContent = text ?? '';
    alertEl.hidden = !text;
  };

  const setBusy = (value: boolean) => {
    busy = value;
    submit.disabled = value;
    submit.setAttribute('aria-busy', String(value));
    if (fieldset) fieldset.disabled = value;
    if (submitLabel) submitLabel.textContent = value ? messages.sending : messages.submit;
    if (statusEl) statusEl.textContent = value ? messages.sending : '';
  };

  const collect = () => {
    const data = new FormData(form);
    return {
      name: String(data.get('name') ?? ''),
      company: String(data.get('company') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      task: String(data.get('task') ?? ''),
      current: String(data.get('current') ?? ''),
      volume: String(data.get('volume') ?? ''),
      consent: data.get('consent') === 'on',
      hp: String(data.get('hp') ?? ''),
    };
  };

  const ALL_FIELDS: FieldName[] = ['name', 'company', 'email', 'phone', 'task', 'current', 'volume', 'consent'];

  const applyErrors = (fields: Partial<Record<FieldName, FieldError>>) => {
    ALL_FIELDS.forEach((name) => setFieldError(name, fields[name] ?? null));
    const first = ALL_FIELDS.find((name) => fields[name]);
    if (first) fieldInput(first)?.focus();
  };

  // 오류를 고치는 중에는 그 칸의 오류를 바로 지웁니다.
  ALL_FIELDS.forEach((name) => {
    const input = fieldInput(name);
    input?.addEventListener(name === 'consent' || name === 'volume' ? 'change' : 'input', () => {
      if (input.getAttribute('aria-invalid') === 'true') setFieldError(name, null);
    });
  });

  const showDone = (id: string, createdAt: string, email: string) => {
    const fmt = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'ko-KR', {
      timeZone: 'Asia/Seoul',
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    const set = (selector: string, value: string) => {
      const el = doneEl.querySelector<HTMLElement>(selector);
      if (el) el.textContent = value;
    };
    set('[data-done-id]', shortId(id));
    set('[data-done-time]', `${fmt.format(new Date(createdAt))}${lang === 'en' ? ' KST' : ''}`);
    set('[data-done-email]', email);
    form.hidden = true;
    doneEl.hidden = false;
    doneEl.focus({ preventScroll: true });
    doneEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  submit.disabled = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    showAlert(null);

    const data = collect();
    const checked = validateInquiry(data);
    if (!checked.ok) {
      applyErrors(checked.fields);
      showAlert(messages.errors.summary);
      return;
    }
    applyErrors({});

    setBusy(true);
    try {
      await ensureWidget();
      const value = await waitForToken(20000);
      if (!value) {
        showAlert(messages.errors.captcha);
        return;
      }
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ ...data, id: submissionId, token: value, lang, page: location.pathname }),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: true; id: string; createdAt: string }
        | { ok: false; error?: string; fields?: Partial<Record<FieldName, FieldError>> }
        | null;
      if (res.ok && body && body.ok) {
        showDone(body.id, body.createdAt, checked.value.email);
        return;
      }
      if (body && !body.ok && body.error === 'invalid' && body.fields) {
        applyErrors(body.fields);
        showAlert(messages.errors.summary);
      } else {
        const code = body && !body.ok ? body.error : undefined;
        showAlert(code && messages.errors[code] ? messages.errors[code] : messages.errors.server);
      }
    } catch {
      showAlert(messages.errors.server);
    } finally {
      if (!form.hidden) {
        setBusy(false);
        // 토큰은 한 번만 쓸 수 있어서 다음 시도를 위해 새로 받습니다.
        token = null;
        if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
      }
    }
  });
}
