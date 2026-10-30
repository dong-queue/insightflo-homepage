// 상담 신청서의 필드 규칙. 브라우저(신청서 스크립트)와 서버(/api/consult)가 같은 규칙을 씁니다.
// 규칙을 바꾸면 두 쪽이 함께 바뀝니다. 문구는 src/i18n/ui.ts의 contact.form에 있습니다.

export const LIMITS = {
  name: 80,
  company: 120,
  email: 254,
  phone: 40,
  task: 4000,
  taskMin: 10,
  current: 4000,
} as const;

/** 한 달 처리 건수 선택지. 값은 저장용 코드이고, 화면 문구는 ui.ts에 있습니다. */
export const VOLUMES = ['lt100', '100to1k', '1kto10k', 'gt10k', 'unknown'] as const;
export type Volume = (typeof VOLUMES)[number];

export const LANGS = ['ko', 'en'] as const;
export type InquiryLang = (typeof LANGS)[number];

export const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
export const PHONE_RE = /^[0-9+()\-.\s]{6,40}$/;
export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type FieldName = 'name' | 'company' | 'email' | 'phone' | 'task' | 'current' | 'volume' | 'consent';
export type FieldError = 'required' | 'too_long' | 'too_short' | 'format';

export interface InquiryInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  task: string;
  current: string;
  volume: Volume | '';
  consent: boolean;
}

export type ValidationResult =
  | { ok: true; value: InquiryInput }
  | { ok: false; fields: Partial<Record<FieldName, FieldError>> };

/** 줄바꿈은 남기고 앞뒤 공백과 제어 문자를 지웁니다. */
function clean(value: unknown, multiline = false): string {
  if (typeof value !== 'string') return '';
  const stripped = multiline
    ? value.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    : value.replace(/[\u0000-\u001f\u007f]/g, ' ');
  return stripped.trim();
}

/** 신청서 입력을 검사하고 정리된 값을 돌려줍니다. */
export function validateInquiry(input: Record<string, unknown>): ValidationResult {
  const value: InquiryInput = {
    name: clean(input.name),
    company: clean(input.company),
    email: clean(input.email).toLowerCase(),
    phone: clean(input.phone),
    task: clean(input.task, true),
    current: clean(input.current, true),
    volume: (VOLUMES as readonly string[]).includes(String(input.volume)) ? (input.volume as Volume) : '',
    consent: input.consent === true || input.consent === 'on' || input.consent === 'true',
  };
  const fields: Partial<Record<FieldName, FieldError>> = {};

  if (!value.name) fields.name = 'required';
  else if (value.name.length > LIMITS.name) fields.name = 'too_long';

  if (value.company.length > LIMITS.company) fields.company = 'too_long';

  if (!value.email) fields.email = 'required';
  else if (value.email.length > LIMITS.email) fields.email = 'too_long';
  else if (!EMAIL_RE.test(value.email)) fields.email = 'format';

  if (value.phone && !PHONE_RE.test(value.phone)) fields.phone = 'format';

  if (!value.task) fields.task = 'required';
  else if (value.task.length < LIMITS.taskMin) fields.task = 'too_short';
  else if (value.task.length > LIMITS.task) fields.task = 'too_long';

  if (value.current.length > LIMITS.current) fields.current = 'too_long';

  const rawVolume = input.volume;
  if (rawVolume !== undefined && rawVolume !== '' && value.volume === '') fields.volume = 'format';

  if (!value.consent) fields.consent = 'required';

  return Object.keys(fields).length ? { ok: false, fields } : { ok: true, value };
}

/** 화면과 알림에 쓰는 짧은 접수 번호. */
export function shortId(id: string): string {
  return `IF-${id.replace(/-/g, '').slice(0, 8).toUpperCase()}`;
}
