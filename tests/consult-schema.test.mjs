// 상담 신청서 입력 규칙 테스트(브라우저와 서버가 같이 쓰는 규칙). 실행: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry, shortId, LIMITS } from '../src/lib/consult-schema.ts';

const valid = {
  name: ' 김민지 ',
  company: '오름물류',
  email: ' Minji@Orum-Logis.co.kr ',
  phone: '02-555-0199',
  task: '해외 선사 운임표를 매주 받아 견적 시스템에 다시 입력하는 일입니다.',
  current: '담당자 한 명이\r\n매주 월요일 오전을 씁니다.',
  volume: '1kto10k',
  consent: true,
};

test('올바른 입력은 정리된 값으로 통과합니다', () => {
  const result = validateInquiry(valid);
  assert.equal(result.ok, true);
  assert.equal(result.value.name, '김민지');
  assert.equal(result.value.email, 'minji@orum-logis.co.kr');
  assert.equal(result.value.current, '담당자 한 명이\n매주 월요일 오전을 씁니다.');
});

test('필수 항목, 형식, 길이, 동의를 검사합니다', () => {
  const result = validateInquiry({ name: '', email: 'not-an-email', task: '짧음', phone: 'abc', volume: 'zzz', consent: false, current: 'x'.repeat(LIMITS.current + 1) });
  assert.equal(result.ok, false);
  assert.deepEqual(result.fields, { name: 'required', email: 'format', phone: 'format', task: 'too_short', current: 'too_long', volume: 'format', consent: 'required' });
});

test('한 줄 필드의 줄바꿈과 제어 문자는 공백으로 바꿉니다', () => {
  const result = validateInquiry({ ...valid, name: '김민지\r\nBcc: x@evil.example', company: 'A\u0000B' });
  assert.equal(result.ok, true);
  assert.equal(result.value.name.includes('\n'), false);
  assert.equal(result.value.company, 'A B');
});

test('동의는 true, "on", "true"만 인정합니다', () => {
  for (const consent of [true, 'on', 'true']) assert.equal(validateInquiry({ ...valid, consent }).ok, true);
  for (const consent of [false, 'yes', 1, undefined]) assert.equal(validateInquiry({ ...valid, consent }).ok, false);
});

test('접수 번호는 IF-와 대문자 8자리입니다', () => {
  assert.equal(shortId('a6ab7473-8325-41f1-beef-58cfc0d5ca6b'), 'IF-A6AB7473');
});
