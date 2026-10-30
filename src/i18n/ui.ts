// 다국어 사전: 한국어(ko) 기본, 영어(en)
// 모든 페이지 문안은 이 파일에서 관리합니다.
// 전략과 숫자 출처: docs/planning/10-content-strategy.md

export const languages = { ko: '한국어', en: 'English' };
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'ko';

/** 제품 이름. 이름이 바뀌면 이 값만 고칩니다. */
export const PRODUCT = 'paperwork';

export const links = {
  email: 'teo@insightflo.co',
  repo: 'https://github.com/insightflo/papercompany-runtime',
  repoName: 'papercompany-runtime',
  intro: 'https://an.mock.co.kr/',
  github: 'https://github.com/insightflo',
  linkedin: 'https://www.linkedin.com/in/dongkyookwak',
  linkedinCompany: 'https://www.linkedin.com/company/insightflo-co/',
  crunchbase: 'https://www.crunchbase.com/organization/insightflo',
  youtube: 'https://www.youtube.com/@inflo7777',
  mock: 'https://mock.co.kr',
  newbom: 'https://www.newbom.co.kr',
};

const P = PRODUCT;

const ko = {
  meta: {
    homeTitle: 'InsightFlo | 지켜볼 수 있는 AI 에이전트를 업무 현장에 배치합니다',
    homeDescription: `FDE가 업무 현장에 들어가 흐름을 파악하고, 모든 단계가 기록되고 위험한 일은 사람이 결재하는 에이전트 실행 시스템 ${P} 위에 업무를 옮깁니다. 회계, 정산, 물류 업무를 20년 동안 시스템으로 만들어 온 엔지니어가 진단부터 운영까지 직접 맡습니다.`,
    companyTitle: '회사 소개 | InsightFlo (인사이트플로)',
    companyDescription: `인사이트플로(InsightFlo)는 FDE 방식으로 AI 에이전트를 고객 업무에 배치하고, 에이전트 실행 시스템 ${P}를 직접 만들어 운영하는 서울의 AI 소프트웨어 회사입니다.`,
    privacyTitle: '개인정보처리방침 | InsightFlo',
    notFoundTitle: '페이지를 찾을 수 없습니다 | InsightFlo',
    ogImage: '/og.png',
    ogAlt: 'InsightFlo, 지켜볼 수 있는 AI 에이전트를 업무 현장에 배치합니다',
  },
  skip: '본문으로 건너뛰기',
  nav: {
    label: '주요 메뉴',
    home: 'InsightFlo 홈',
    paperwork: P,
    proof: '운영 기록',
    how: '일하는 방식',
    faq: '자주 묻는 질문',
    cta: '상담 신청',
    menu: '메뉴 열기',
    close: '메뉴 닫기',
    switchShort: 'EN',
    switchLong: 'English',
    switchLabel: 'Switch to English',
    theme: '다크 모드',
  },
  newTab: '새 창에서 열림',
  hero: {
    lines: ['지켜볼 수 있는', 'AI 에이전트를', '업무 현장에 배치합니다'],
    sub: '모든 단계를 기록으로 남기고, 위험한 일은 사람이 결재해야 실행됩니다.',
    ctaPrimary: '무료 상담 신청하기',
    ctaSecondary: `${P} 살펴보기`,
    receipt: {
      label: '실행 영수증',
      title: '세무 포털 시제품',
      date: '2026년 8월 12일 시험 실행',
      rows: [
        { k: '실행한 사례', v: '16건', hold: false },
        { k: '산출물이 남은 사례', v: '16건', hold: false },
        { k: '실행 기록이 남은 사례', v: '16건', hold: false },
        { k: '내부 승인 후 전달', v: '3건', hold: false },
        { k: '사람 검토로 멈춤', v: '13건', hold: true },
      ],
      total: { k: '증거 없이 끝난 사례', v: '0건' },
      stamp: ['검토', '대기'],
      note: '사실이 불완전하거나 지원하지 않는 계산은 추측하지 않고 멈췄습니다. 외부 기관 연계는 합성 데이터여서 실제 신고는 없었습니다.',
    },
  },
  paperwork: {
    title: '무엇을 했는지 모두 남기고, 위험한 일 앞에서는 멈춥니다',
    lead: `에이전트는 “완료했습니다”라고 보고하지만, 무엇을 했고 무엇을 검사했는지는 남기지 않습니다. ${P}는 업무를 단계로 나눠 맡기고, 단계마다 증거를 남기는 범용 에이전트 실행 시스템입니다.`,
    flowLabel: `${P}에서 업무 하나가 지나가는 길`,
    flow: [
      { t: '업무 정의', d: '단계와 담당 에이전트를 정합니다', gate: '' },
      { t: '단계 실행', d: '도구와 에이전트가 순서대로 일합니다', gate: '' },
      { t: '산출물 확인', d: '결과물이 없으면 완료할 수 없습니다', gate: 'check' },
      { t: '검토', d: '반려되면 해당 단계로 돌아갑니다', gate: '' },
      { t: '사람 결재', d: '되돌리기 어려운 일은 여기서 기다립니다', gate: 'human' },
      { t: '전달과 보관', d: '산출물과 기록을 함께 남깁니다', gate: '' },
    ],
    loop: '반려되면 이전 시도를 남긴 채 다시 실행합니다',
    pillarsLabel: `${P}의 세 가지 성질`,
    pillars: [
      { t: '안전하게', d: '배포, 삭제, 외부 발송은 기본 권한 밖에 있습니다. 에이전트별 예산 한도를 넘으면 실행이 멈춥니다.' },
      { t: '지켜볼 수 있게', d: '단계마다 실행 기록과 산출물이 남습니다. 재작업해도 이전 시도는 지우지 않습니다.' },
      { t: '어떤 업무든', d: '단계마다 Claude Code, Codex, Gemini 같은 에이전트를 골라 붙입니다. 쓰고 계신 ERP는 그대로 둡니다.' },
    ],
    repoNote: `MIT 오픈소스입니다. 현재 ${links.repoName} 저장소에서 ${P}로 이름을 바꾸고 있습니다.`,
    repoLink: 'GitHub 저장소 보기',
    introLink: '작동 방식 소개 보기',
  },
  tagline: {
    lines: ['증거 없이는 완료하지 않고,', '결재 없이는 실행하지 않습니다.'],
  },
  proof: {
    title: '제 사업부터 이 위에서 운영합니다',
    lead: `시연용이 아니라 매일 돌아가는 업무입니다. 시장 브리핑, 제안서, 영업 접수, 뉴스 발행, 세무 지식 정리가 ${P} 위에서 운영됩니다.`,
    media: {
      title: 'mock.co.kr에 2026년 6월부터 863편을 발행했습니다',
      note: '2026년 10월 30일 사이트맵 기준이며, 가장 이른 글은 6월 10일자입니다. 리서치부터 발행까지 워크플로가 매일 처리합니다.',
      alt: `${P} 워크플로가 매일 발행하는 AI 뉴스 사이트 mock.co.kr의 첫 화면`,
      link: 'mock.co.kr 열기',
    },
    ab: {
      title: '판단 계층을 붙이자 토큰이 72.8% 줄었습니다',
      desc: '규칙은 코드가, 짧은 판단은 판단 전용 모델이, 산출 작업은 에이전트가 맡도록 나눴습니다.',
      caption: '같은 작업을 방식별로 한 번씩 실행한 결과',
      head: ['항목', '기존 방식', '판단 계층'],
      rows: [
        ['총 토큰', '29.31M', '7.98M'],
        ['비용', '$24.80', '$7.54'],
        ['사용자 대기', '536초', '394초'],
        ['LLM 호출', '232회', '64회'],
      ],
      note: '1회 관측이므로 품질이 같다는 증거는 아닙니다. 결과물의 판단 항목은 10개 중 9개가 같았습니다.',
    },
  },
  how: {
    title: '현장을 아는 엔지니어가 직접 들어갑니다',
    lead: 'FDE(Forward Deployed Engineer)는 고객의 업무 현장에서 문제를 찾고, 제품을 붙여 운영까지 만드는 엔지니어입니다.',
    askLabel: '첫 미팅에서 가장 먼저 묻는 질문',
    ask: '이 업무는 어디서 멈추고, 누가 다시 움직일 수 있습니까?',
    stepsLabel: '진행 순서',
    steps: [
      { t: '현장 진단', d: '흐름, 데이터, 예외, 운영 책임 네 칸으로 업무 지도를 그립니다.' },
      { t: '배치', d: `업무 하나를 ${P} 위에 옮깁니다. 규칙은 코드에, 판단은 에이전트에, 위험한 결정은 사람에게 맡깁니다.` },
      { t: '검증 운영', d: '실제 데이터로 함께 운영하고, 멈춘 건은 사람이 확인해 규칙으로 남깁니다.' },
      { t: '이관', d: '운영 기준과 권한, 기록을 인계합니다. 시스템은 귀사 서버에 남습니다.' },
    ],
  },
  profile: {
    title: '20년 동안 업무를 시스템으로 옮겨 왔습니다',
    name: '곽동규',
    role: '인사이트플로 대표, FDE',
    creds: ['AICPA (미국 공인회계사)', '국민대학교 비즈니스IT 석사'],
    linkedin: 'LinkedIn 프로필',
    timelineLabel: '경력',
    timeline: [
      { when: '2025~', org: 'InsightFlo', what: `${P}를 만들어 운영하고, 고객 업무에 에이전트를 배치합니다.` },
      { when: '2022~2025', org: 'LX Pantos 디지털혁신팀', what: 'API Gateway와 Developer Portal 구축·운영, 브라질 적하목록 신고 자동화, AI 챗봇 시범 사업의 지식베이스 전환을 맡았습니다.' },
      { when: '2017~2022', org: 'Biznent', what: '자체 회계 플랫폼을 처음부터 설계해 출시하고 AWS에서 운영했습니다.' },
      { when: '2004~2009\n2011~2017', org: 'LG CNS', what: 'GS리테일 배달 정산 PM, 다이소 관리회계와 수협 예산회계 파트 리더, GS홈쇼핑 SAP 결제 정산을 맡았습니다.' },
    ],
    projectsTitle: '최근 고객 프로젝트',
    projectsHead: ['프로젝트', '한 일', '상태'],
    projects: [
      { name: '새봄컨설팅 웹사이트', client: '수출 인증·허가 전문 관세사 사무소', what: '서비스 소개와 견적 문의 화면을 만들었습니다.', status: '완료', url: links.newbom, linkLabel: '사이트 보기' },
      { name: '관세 신고서 AI 작성 시스템', client: '새봄컨설팅', what: 'AI가 수출입 신고서 초안을 작성하고 관세사가 검토합니다.', status: '진행 중', url: '', linkLabel: '' },
      { name: '무인 출력 플랫폼 웹', client: '고객사 비공개', what: '다국어 화면, 업로드 보안 검사, 외부 서비스 연동, 운영 배포까지 맡았습니다.', status: '', url: '', linkLabel: '' },
    ],
    channelsTitle: '운영하며 배운 것은 공개합니다',
    channels: [
      { name: 'mock.co.kr', desc: 'AI 뉴스와 운영 매뉴얼, 매일 발행', url: links.mock },
      { name: '인플로 AI 꿀팁', desc: '매일 60초 AI 활용법, YouTube', url: links.youtube },
      { name: 'AX 운영 노트', desc: '에이전트 운영 현장 노트, LinkedIn', url: links.linkedin },
      { name: 'GitHub', desc: `${P}와 에이전트 도구`, url: links.github },
    ],
  },
  faq: {
    title: '자주 묻는 질문',
    items: [
      {
        q: 'FDE 방식은 일반 외주 개발과 무엇이 다릅니까?',
        a: '요구사항 문서를 받아 개발하는 데서 시작하지 않습니다. 담당자 곁에서 업무가 실제로 어디서 멈추는지 확인하고, 만든 뒤에도 실제 데이터로 함께 운영하며 고칩니다. 운영 기준까지 인계해야 끝납니다.',
      },
      {
        q: '어떤 업무부터 맡기는 것이 좋습니까?',
        a: '반복되고, 판단 기준이 있으며, 틀리면 사람이 바로 알아챌 수 있는 업무가 좋습니다. 정산 대사, 신고서 초안, 정기 보고서, 문서 분류 같은 일입니다. 처음에는 업무 하나만 고릅니다.',
      },
      {
        q: '에이전트가 틀리면 어떻게 됩니까?',
        a: '산출물이 없으면 완료로 처리되지 않고, 검토에서 반려되면 해당 단계로 돌아가 다시 수행합니다. 사실이 불완전하면 추측하지 않고 사람 검토 단계에서 멈춥니다. 세무 포털 시제품 시험 실행에서는 16건 중 13건이 이렇게 멈췄습니다.',
      },
      {
        q: '회사 데이터가 밖으로 나가지 않을까 걱정됩니다.',
        a: `${P}는 귀사 서버에 설치해 사용할 수 있습니다. 어떤 AI 모델에 어떤 데이터를 보낼지는 처음에 함께 정하고, 외부 발송은 기본 권한 밖에 둡니다.`,
      },
      {
        q: '지금 쓰는 시스템을 바꿔야 합니까?',
        a: `아닙니다. ERP나 그룹웨어 같은 기존 시스템은 그대로 두고, 그 위에서 에이전트 작업을 관리합니다. ${P}는 MIT 오픈소스이므로 계약이 끝나도 시스템은 귀사에 남습니다.`,
      },
      {
        q: '비용과 기간은 어떻게 정합니까?',
        a: '첫 상담은 무료입니다. 업무 하나를 정해 현장 진단을 하고, 그 결과로 범위와 견적을 드립니다. 진단은 보통 1~2주 걸립니다.',
      },
      {
        q: '어떤 AI 모델을 사용합니까?',
        a: 'Claude Code, Codex, Gemini 등 에이전트 어댑터 9개를 지원하며, 단계마다 다른 모델을 사용할 수 있습니다. 특정 모델에 묶이지 않도록 만듭니다.',
      },
      {
        q: '어떤 업종과 회사 규모에 적합합니까?',
        a: '회계, 정산, 물류, 관세 업무는 용어 설명 없이 바로 시작할 수 있습니다. AI를 처음 도입하는 중소기업부터, 시범 사업은 해 봤지만 운영 구조가 필요한 기업까지 함께합니다.',
      },
    ],
  },
  contact: {
    title: '업무 하나부터 맡겨 보십시오',
    sub: '어떤 업무인지, 지금 어떻게 처리하고 계신지, 한 달에 몇 건인지 적어 보내 주십시오. 첫 상담은 무료입니다.',
    cta: '상담 메일 쓰기',
    copy: '주소 복사',
    copied: '주소를 복사했습니다',
    copyFail: '복사하지 못했습니다. 주소를 직접 선택해 주십시오.',
    emailLabel: '상담 메일 주소',
    assure: `${P}는 MIT 오픈소스이므로, 함께 만든 시스템은 귀사에 남습니다.`,
    partner: 'FDE가 필요한 팀의 협업 제안도 환영합니다.',
    mailSubject: '[InsightFlo 상담] 업무 자동화 문의',
    mailBody: '1. 맡기고 싶은 업무:\n2. 지금 처리하는 방식:\n3. 한 달 처리 건수:\n4. 회사와 담당자:\n',
  },
  footer: {
    tagline: '지켜볼 수 있는 AI 에이전트를 업무 현장에 배치합니다.',
    siteTitle: '사이트',
    company: '회사 소개',
    privacy: '개인정보처리방침',
    channelsTitle: '채널',
    contactTitle: '연락',
    bizLabel: '사업자 정보',
    biz: [
      ['상호', '인사이트플로 (InsightFlo)'],
      ['대표', '곽동규'],
      ['사업자등록번호', '820-09-03326'],
      ['개업일', '2025년 6월 16일'],
      ['업종', '응용소프트웨어개발업'],
    ],
  },
  company: {
    h1: '회사 소개',
    lead: `인사이트플로(InsightFlo)는 2025년 6월 서울에서 문을 연 AI 소프트웨어 회사입니다. FDE 방식으로 고객 업무 현장에 AI 에이전트를 배치하고, 그 바탕이 되는 에이전트 실행 시스템 ${P}를 직접 만들어 운영합니다.`,
    infoTitle: '회사 정보',
    info: [
      { k: '상호', v: '인사이트플로 (InsightFlo)', href: '' },
      { k: '대표', v: '곽동규 (Dongkyoo Kwak)', href: links.linkedin },
      { k: '설립일', v: '2025년 6월 16일', href: '' },
      { k: '소재지', v: '서울특별시, 대한민국', href: '' },
      { k: '사업자등록번호', v: '820-09-03326', href: '' },
      { k: '업종', v: '응용소프트웨어개발업 (AI 소프트웨어)', href: '' },
      { k: '웹사이트', v: 'insightflo.co', href: 'https://insightflo.co' },
      { k: '연락처', v: links.email, href: `mailto:${links.email}` },
      { k: 'Crunchbase', v: 'InsightFlo', href: links.crunchbase },
      { k: 'LinkedIn', v: 'InsightFlo 회사 페이지', href: links.linkedinCompany },
    ],
    whatTitle: '제품과 서비스',
    what: [
      { t: 'FDE 방식의 AI 업무 자동화', d: `고객 업무를 현장에서 진단하고, 업무 하나를 ${P} 위에 옮겨 실제 데이터로 검증 운영한 뒤 운영 기준과 함께 인계합니다.` },
      { t: P, d: `안전하면서 지켜볼 수 있는 범용 에이전트 실행 시스템입니다. 오픈소스 Paperclip을 기반으로 미션 중심 실행, 산출물 게이트, 검토 루프, 사람 결재, 권한과 예산 통제를 더해 확장했습니다. MIT 라이선스이며, 현재 ${links.repoName} 저장소에서 ${P}로 이름을 바꾸고 있습니다.` },
      { t: '운영 사례', d: `${P} 위의 워크플로가 AI 뉴스 사이트 mock.co.kr의 글을 매일 리서치하고 작성해 발행합니다. 2026년 6월부터 863편이 발행되었습니다(사이트맵 기준, 10월 30일).` },
    ],
    techTitle: '기술',
    tech: 'TypeScript (React, Node.js), PostgreSQL, 워크플로 DAG 실행 엔진, 에이전트 어댑터(Claude Code, Codex, Gemini 등), S3 호환 산출물 저장소, Docker, GitHub Actions, Oracle Cloud, Cloudflare',
    back: '홈으로 돌아가기',
  },
  notFound: {
    title: '페이지를 찾을 수 없습니다',
    desc: '주소가 바뀌었거나 없는 페이지입니다.',
    home: '홈으로 가기',
  },
};

const en: typeof ko = {
  meta: {
    homeTitle: 'InsightFlo | We deploy AI agents you can watch',
    homeDescription: `A forward deployed engineer maps your workflow and moves it onto ${P}, an agent execution system where every step is recorded and risky actions wait for human approval. Twenty years of turning accounting, settlement and logistics work into systems.`,
    companyTitle: 'Company | InsightFlo',
    companyDescription: `InsightFlo is an AI software company in Seoul. We deploy AI agents into client operations as forward deployed engineers, and we build and run ${P}, the agent execution system underneath.`,
    privacyTitle: 'Privacy policy | InsightFlo',
    notFoundTitle: 'Page not found | InsightFlo',
    ogImage: '/og-en.png',
    ogAlt: 'InsightFlo, we deploy AI agents you can watch',
  },
  skip: 'Skip to content',
  nav: {
    label: 'Main menu',
    home: 'InsightFlo home',
    paperwork: P,
    proof: 'Track record',
    how: 'How we work',
    faq: 'FAQ',
    cta: 'Contact',
    menu: 'Open menu',
    close: 'Close menu',
    switchShort: 'KO',
    switchLong: '한국어',
    switchLabel: '한국어로 보기',
    theme: 'Dark mode',
  },
  newTab: 'opens in a new tab',
  hero: {
    lines: ['We deploy AI agents', 'you can watch'],
    sub: 'Every step is recorded, and nothing risky runs without a person’s approval.',
    ctaPrimary: 'Request a free consultation',
    ctaSecondary: `See ${P}`,
    receipt: {
      label: 'Run receipt',
      title: 'Tax portal prototype',
      date: 'Test run, August 12, 2026',
      rows: [
        { k: 'Cases run', v: '16', hold: false },
        { k: 'Cases with a work product', v: '16', hold: false },
        { k: 'Cases with a run log', v: '16', hold: false },
        { k: 'Delivered after internal approval', v: '3', hold: false },
        { k: 'Stopped for human review', v: '13', hold: true },
      ],
      total: { k: 'Finished without evidence', v: '0' },
      stamp: ['On', 'hold'],
      note: 'Where facts were incomplete or a calculation was unsupported, it stopped instead of guessing. External agency links used synthetic data, so nothing was filed.',
    },
  },
  paperwork: {
    title: 'Everything it did stays on record, and it stops before anything risky',
    lead: `Agents report “done” without keeping what they did or checked. ${P}, a general purpose agent execution system, splits work into steps and keeps evidence at each one.`,
    flowLabel: `How one piece of work moves through ${P}`,
    flow: [
      { t: 'Define the work', d: 'Steps, and an agent for each', gate: '' },
      { t: 'Run the steps', d: 'Tools and agents, in order', gate: '' },
      { t: 'Check the output', d: 'No output, no completion', gate: 'check' },
      { t: 'Review', d: 'Rejected work goes back', gate: '' },
      { t: 'Human approval', d: 'Anything hard to undo waits here', gate: 'human' },
      { t: 'Deliver and keep', d: 'Output kept with its record', gate: '' },
    ],
    loop: 'Rejected work runs again, earlier attempt kept',
    pillarsLabel: `Three properties of ${P}`,
    pillars: [
      { t: 'Safe', d: 'Deploys, deletions and outbound messages sit outside default permissions. Each agent stops at its budget.' },
      { t: 'Watchable', d: 'Every step keeps its run log and work product. Rework never erases the earlier attempt.' },
      { t: 'Any workflow', d: 'Pick an agent per step: Claude Code, Codex, Gemini and more. Your ERP stays as it is.' },
    ],
    repoNote: `MIT licensed open source, being renamed from ${links.repoName} to ${P}.`,
    repoLink: 'View the GitHub repository',
    introLink: 'See how it works (Korean)',
  },
  tagline: {
    lines: ['Without evidence, nothing is done.', 'Without approval, nothing runs.'],
  },
  proof: {
    title: 'I run my own business on it first',
    lead: `Daily operations, not demo scripts. Market briefings, proposals, sales intake, news publishing and tax knowledge work run on ${P}.`,
    media: {
      title: '863 posts on mock.co.kr since June 2026',
      note: 'Sitemap count on October 30, 2026; the earliest post is dated June 10. A workflow researches, writes and publishes daily.',
      alt: `Front page of mock.co.kr, the AI news site a ${P} workflow publishes every day`,
      link: 'Open mock.co.kr',
    },
    ab: {
      title: 'A judgment layer cut tokens by 72.8%',
      desc: 'Code settles the rules, a small judgment model makes quick calls, and agents do the producing work.',
      caption: 'The same job, run once each way',
      head: ['Measure', 'Before', 'Judgment layer'],
      rows: [
        ['Total tokens', '29.31M', '7.98M'],
        ['Cost', '$24.80', '$7.54'],
        ['User wait', '536 s', '394 s'],
        ['LLM calls', '232', '64'],
      ],
      note: 'One observation, so not proof of equal quality. Nine of ten judgment items in the output matched.',
    },
  },
  how: {
    title: 'I work where the work actually happens',
    lead: 'A forward deployed engineer (FDE) finds the problem inside your operations, fits the product to it, and stays until it runs.',
    askLabel: 'The first question I ask',
    ask: 'Where does this work stop, and who can get it moving again?',
    stepsLabel: 'How an engagement runs',
    steps: [
      { t: 'Field diagnosis', d: 'Map the work in four boxes: flow, data, exceptions and who is responsible.' },
      { t: 'Deploy', d: `Move one workflow onto ${P}. Rules go to code, judgment to agents, risky decisions to people.` },
      { t: 'Run and verify', d: 'Run it on real data together. Every stop gets a human look and becomes a rule.' },
      { t: 'Hand over', d: 'Hand over the operating rules, permissions and records. The system stays on your servers.' },
    ],
  },
  profile: {
    title: 'Twenty years of turning work into systems',
    name: 'Dongkyoo Kwak',
    role: 'Founder of InsightFlo, FDE',
    creds: ['AICPA (US Certified Public Accountant)', 'MS in Business IT, Kookmin University'],
    linkedin: 'LinkedIn profile',
    timelineLabel: 'Career',
    timeline: [
      { when: '2025 to now', org: 'InsightFlo', what: `Builds and runs ${P}, and deploys agents into client work.` },
      { when: '2022 to 2025', org: 'LX Pantos, digital innovation team', what: 'Built and ran the API Gateway and Developer Portal, automated Brazil cargo manifest filing, and turned an AI chatbot pilot into a managed knowledge base.' },
      { when: '2017 to 2022', org: 'Biznent', what: 'Designed an accounting platform from scratch, launched it, and ran it on AWS.' },
      { when: '2004 to 2009\n2011 to 2017', org: 'LG CNS', what: 'PM for GS Retail delivery settlement, part lead for Daiso management accounting and Suhyup budget accounting, and SAP payment settlement for GS Home Shopping.' },
    ],
    projectsTitle: 'Recent client work',
    projectsHead: ['Project', 'What was built', 'Status'],
    projects: [
      { name: 'Newbom Consulting website', client: 'A customs firm for export certification and permits', what: 'Built the service pages and the quote request flow.', status: 'Completed', url: links.newbom, linkLabel: 'Visit site' },
      { name: 'AI customs declaration drafting', client: 'Newbom Consulting', what: 'AI drafts declarations and a licensed customs broker reviews them.', status: 'In progress', url: '', linkLabel: '' },
      { name: 'Unattended print platform, web', client: 'Client confidential', what: 'Multilingual pages, upload security scanning, third party integrations and production release.', status: '', url: '', linkLabel: '' },
    ],
    channelsTitle: 'What I learn in operation, I publish',
    channels: [
      { name: 'mock.co.kr', desc: 'AI news and operating manuals, daily (Korean)', url: links.mock },
      { name: '인플로 AI 꿀팁', desc: 'A 60 second AI tip a day, YouTube (Korean)', url: links.youtube },
      { name: 'AX operating notes', desc: 'Field notes on running agents, LinkedIn', url: links.linkedin },
      { name: 'GitHub', desc: `${P} and agent tools`, url: links.github },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'How is the FDE approach different from outsourced development?',
        a: 'It does not start from a requirements document. I sit with the people doing the work and find where it actually stops. After building, we run it on real data together and fix what breaks. It is finished when the operating rules are handed over.',
      },
      {
        q: 'Which work should we start with?',
        a: 'Work that repeats, follows clear criteria, and where a person would notice a mistake right away: settlement reconciliation, declaration drafts, recurring reports, document sorting. We start with a single workflow.',
      },
      {
        q: 'What happens when an agent gets it wrong?',
        a: 'Without a work product, nothing counts as complete. Rejected work goes back to its step and runs again. When facts are incomplete, it stops for human review instead of guessing. In the tax portal prototype test run, 13 of 16 cases stopped this way.',
      },
      {
        q: 'Will our data leave the company?',
        a: `${P} can be installed on your own servers. We decide together, up front, which AI models may receive which data, and outbound sending stays outside default permissions.`,
      },
      {
        q: 'Do we have to replace our current systems?',
        a: `No. Your ERP and groupware stay in place, and agent work is managed on top of them. ${P} is MIT licensed, so the system stays with you after the engagement ends.`,
      },
      {
        q: 'How are cost and timeline set?',
        a: 'The first consultation is free. We pick one workflow and run a field diagnosis, and the scope and quote come from that. A diagnosis usually takes one to two weeks.',
      },
      {
        q: 'Which AI models do you use?',
        a: 'It supports nine agent adapters, including Claude Code, Codex and Gemini, and each step can use a different model. It is built so you are not tied to one model.',
      },
      {
        q: 'Which industries and company sizes fit?',
        a: 'Accounting, settlement, logistics and customs work can start without a vocabulary lesson. We work with small companies adopting AI for the first time and with companies that ran pilots but need an operating structure.',
      },
    ],
  },
  contact: {
    title: 'Start with one workflow',
    sub: 'Tell me what the work is, how you handle it today, and how many cases come in a month. The first consultation is free.',
    cta: 'Write an email',
    copy: 'Copy address',
    copied: 'Address copied',
    copyFail: 'Could not copy. Please select the address.',
    emailLabel: 'Consultation email',
    assure: `${P} is MIT licensed, so what we build together stays with you.`,
    partner: 'Teams that need an FDE are welcome to propose working together.',
    mailSubject: '[InsightFlo] Consultation request',
    mailBody: '1. The work you want to hand over:\n2. How you handle it today:\n3. Cases per month:\n4. Company and contact:\n',
  },
  footer: {
    tagline: 'We deploy AI agents you can watch.',
    siteTitle: 'Site',
    company: 'Company',
    privacy: 'Privacy policy (Korean)',
    channelsTitle: 'Channels',
    contactTitle: 'Contact',
    bizLabel: 'Business information',
    biz: [
      ['Business name', '인사이트플로 (InsightFlo)'],
      ['Representative', 'Dongkyoo Kwak'],
      ['Registration no.', '820-09-03326'],
      ['Opened', 'June 16, 2025'],
      ['Industry', 'Application software development'],
    ],
  },
  company: {
    h1: 'Company',
    lead: `InsightFlo (인사이트플로) is an AI software company founded in Seoul in June 2025. We deploy AI agents into client operations as forward deployed engineers, and we build and run ${P}, the agent execution system underneath.`,
    infoTitle: 'Company information',
    info: [
      { k: 'Name', v: 'InsightFlo (인사이트플로)', href: '' },
      { k: 'Founder', v: 'Dongkyoo Kwak (곽동규)', href: links.linkedin },
      { k: 'Founded', v: 'June 16, 2025', href: '' },
      { k: 'Location', v: 'Seoul, South Korea', href: '' },
      { k: 'Business registration', v: '820-09-03326', href: '' },
      { k: 'Industry', v: 'Application software development (AI software)', href: '' },
      { k: 'Website', v: 'insightflo.co', href: 'https://insightflo.co' },
      { k: 'Contact', v: links.email, href: `mailto:${links.email}` },
      { k: 'Crunchbase', v: 'InsightFlo', href: links.crunchbase },
      { k: 'LinkedIn', v: 'InsightFlo company page', href: links.linkedinCompany },
    ],
    whatTitle: 'Products and services',
    what: [
      { t: 'AI workflow automation, the FDE way', d: `We diagnose client work on site, move one workflow onto ${P}, run and verify it on real data, then hand it over with its operating rules.` },
      { t: P, d: `A safe, watchable, general purpose agent execution system. It extends the open source Paperclip base with mission centred execution, work product gates, review loops, human approval, and permission and budget controls. It is MIT licensed and currently lives in the ${links.repoName} repository while it is renamed to ${P}.` },
      { t: 'In production', d: `A ${P} workflow researches, writes and publishes articles for the AI news site mock.co.kr every day. It has published 863 posts since June 2026 (sitemap count, October 30).` },
    ],
    techTitle: 'Technology',
    tech: 'TypeScript (React, Node.js), PostgreSQL, a workflow DAG execution engine, agent adapters (Claude Code, Codex, Gemini and more), S3 compatible work product storage, Docker, GitHub Actions, Oracle Cloud, Cloudflare',
    back: 'Back to home',
  },
  notFound: {
    title: 'Page not found',
    desc: 'The address changed, or this page does not exist.',
    home: 'Go to the home page',
  },
};

export const ui = { ko, en };

export function useTranslations(lang: Lang) {
  const t = (path: string): any => {
    const get = (locale: Lang) =>
      path.split('.').reduce<any>((obj, key) => (obj == null ? undefined : obj[key]), ui[locale]);
    return get(lang) ?? get(defaultLang);
  };
  return t;
}

/** 현재 경로의 다른 언어 페이지 주소 */
export function alternatePath(pathname: string, target: Lang): string {
  const base = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (target === 'en') return '/en' + (base === '/' ? '/' : base);
  return base;
}

/** 언어별 홈 주소 */
export function homePath(lang: Lang): string {
  return lang === 'en' ? '/en/' : '/';
}
