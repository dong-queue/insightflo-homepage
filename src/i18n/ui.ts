// 다국어 사전 - 한국어(ko) 기본, 영어(en)
// 모든 페이지 문안은 이 파일에서 관리합니다.

export const languages = { ko: '한국어', en: 'English' };
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'ko';

const ko = {
  meta: {
    homeTitle: 'InsightFlo - 비주얼 워크플로우 자동화 플랫폼 | AI 에이전트 · 컨설팅',
    homeDescription: '업무를 워크플로우로 옮기면 AI 에이전트가 실행하고 관리합니다. InsightFlo의 비주얼 워크플로우 자동화 플랫폼, 자체 운영 AI 매체 온보딩(mock.co.kr), GEO/SEO 진단 에이전트를 소개합니다.',
    companyTitle: '회사 소개 - InsightFlo (인사이트플로)',
    companyDescription: '인사이트플로(InsightFlo) 회사 소개. 서울 소재 AI 소프트웨어 스타트업. 비주얼 워크플로우 자동화 플랫폼을 직접 만들어 운영합니다.',
  },
  nav: { products: '제품', services: '서비스', about: '회사 소개', contact: '문의' },
  hero: {
    badge: '2025년 설립 · AI 에이전트 스타트업',
    headline: ['업무를 워크플로우로 옮기면,', 'AI 에이전트가 실행하고 관리합니다'],
    sub: '비주얼 워크플로우 자동화 플랫폼을 직접 만들어 운영합니다. 매일 발행되는 AI 매체 \'온보딩\'과 GEO/SEO 진단 에이전트에 같은 방식을 씁니다.',
    ctaPrimary: '제품 보기',
    ctaSecondary: '무료 상담 신청',
    stats: [
      { value: '581편+', label: '자체 매체 누적 발행' },
      { value: '매일', label: '자동 발행 운영 중' },
      { value: '10년+', label: '도메인 실무 경험' },
    ],
    shotAlt: 'AI 네이티브 뉴스 브리핑 온보딩(mock.co.kr) 화면',
    shotCaption: "자체 운영 중인 AI 매체 '온보딩' — 리서치부터 발행·배포까지 전 과정 자동화, 지표는 그대로 공개",
  },
  products: {
    eyebrow: 'Products',
    heading: '자체 AI 제품',
    sub: '직접 만들고 직접 운영합니다. 제품에서 검증된 구조를 기업 프로젝트에 그대로 적용합니다.',
    main: {
      badge: '메인 제품',
      status: '내부 운영 중',
      title: '비주얼 워크플로우 자동화 플랫폼',
      desc: '업무 흐름을 화면에서 끊어 연결하면 AI 에이전트가 실행합니다. 실행 상태 추적, 실패 시 재시도·재개, 산출물 검증까지 한곳에서 관리합니다.',
      features: [
        '비주얼 그래프 편집기로 워크플로우 구성',
        'DAG 실행 엔진 - 재시도·재개·반복 관리',
        '산출물 검증과 Claude·Codex 어댑터',
      ],
      note: '* 오픈소스 Paperclip 프로젝트를 기반으로 확장하여 구축했습니다.',
    },
    onboarding: {
      badge: '운영 중',
      title: '온보딩',
      tagline: 'Manual Onboarding',
      desc: 'AI 네이티브 데일리 뉴스 브리핑입니다. 리서치부터 초안 작성, 발행, 배포까지 콘텐츠 파이프라인 전 과정을 에이전트가 자동으로 돌립니다.',
      features: [
        '매일 자동 발행되는 AI 뉴스 브리핑',
        '기획-작성-발행-배포 전 과정 자동화',
        '검색·생성형 AI 노출 최적화 적용',
      ],
      link: 'mock.co.kr 바로가기',
    },
    geo: {
      badge: '개발 중',
      title: 'GEO/SEO 진단 에이전트',
      desc: '웹사이트를 분석해 검색엔진과 생성형 AI에서의 노출 이슈를 진단하고, 개선 우선순위가 정리된 리포트를 자동으로 뽑아줍니다.',
      features: [
        'GA4·Search Console 데이터 분석',
        '구조·콘텐츠·스키마 종합 진단',
        '한국어 개선 리포트 자동 생성',
      ],
    },
  },
  services: {
    eyebrow: 'Our Expertise',
    heading: '핵심 서비스 영역',
    ai: {
      title: 'AI Consulting',
      desc: '최신 LLM 기술과 RAG 아키텍처를 기반으로 기업 고유의 데이터를 활용한 지능형 솔루션 도입 전략을 제시합니다.',
      features: ['RAG (검색 증강 생성) 구축', 'LLM 파인튜닝 및 맞춤형 에이전트', '업무 프로세스 자동화 (Workflow Automation)'],
    },
    sys: {
      title: 'System Development',
      desc: '안정적인 아키텍처와 최신 스택을 사용하여 비즈니스 로직에 최적화된 고성능 엔터프라이즈 시스템을 개발합니다.',
      features: ['Modern Web & App 개발', '시스템 통합 (SI) 및 API 설계', '데이터 파이프라인 및 백엔드 고도화'],
    },
  },
  whyus: {
    eyebrow: 'Why Choose Us',
    heading: '왜 InsightFlo인가요?',
    sub: ['오랜 현장 경험과 검증된 기술력으로', '고객의 비즈니스 성공을 함께 만들어갑니다.'],
    items: [
      { icon: 'military_tech', number: '10년+', title: '실무 경력', description: '대형 SI 프로젝트 구축부터 운영까지의 현장 경험' },
      { icon: 'rocket_launch', number: '다수', title: 'PoC 수행 경험', description: '신기술 도입과 프로토타입 개발을 직접 수행' },
      { icon: 'code_blocks', number: '자체', title: '플랫폼 개발·운영', description: '직접 설계해 운영 중인 워크플로우 플랫폼 보유' },
      { icon: 'handshake', number: '100%', title: '고객 성공 중심', description: '고객이 원하는 결과를 끝까지 책임지는 파트너십' },
    ],
  },
  tech: {
    eyebrow: 'Tech Stack',
    heading: '신뢰할 수 있는 기술 스택',
    categories: [
      { name: 'Frontend', items: ['React', 'TypeScript'] },
      { name: 'Backend', items: ['Node.js / TypeScript'] },
      {
        name: 'AI Models',
        items: ['Claude', 'Codex', 'GPT'],
      },
      { name: 'AI Framework & RAG', items: ['LangChain', 'LlamaIndex'] },
      { name: 'Database', items: ['PostgreSQL', 'Pinecone'] },
      { name: 'Cloud Infrastructure', items: ['AWS', 'GCP'] },
    ],
  },
  about: {
    eyebrow: 'Why InsightFlo',
    heading: ['도메인 전문성 + AI 기술력', '= 확실한 비즈니스 성과'],
    p1: "인사이트플로는 2025년 6월 서울에서 문을 연 AI 소프트웨어 스타트업입니다.\n자체 제품을 직접 만들고 운영하며 얻은 자동화 노하우를 기업 프로젝트에 씁니다.",
    p2: 'AICPA 자격과 회계 SI 구축 경험, 물류 신기술 POC 실무를 바탕으로\n고객의 비즈니스를 깊이 이해하고 AI로 실질적 문제를 해결합니다.',
    domains: [
      { icon: 'account_balance', title: '회계·재무', desc: 'AICPA · ERP/회계시스템 구축 · 재무 데이터 분석' },
      { icon: 'local_shipping', title: '물류·SCM', desc: '물류 자동화 POC · 수출입 프로세스 · 재고 최적화' },
      { icon: 'gavel', title: '관세·무역', desc: 'AI 신고서 생성 · 인증/허가 자동화 · 규정 검토' },
    ],
    approach: [
      { icon: 'bolt', title: 'Fast Delivery', desc: '검증된 AI 도구(Claude, GPT, LangChain 등)를 효율적으로 조합해 2주 내 MVP를 제공합니다.' },
      { icon: 'savings', title: 'Cost Effective', desc: '처음부터 만들지 않습니다. 기존 솔루션을 활용해 개발 비용을 최대 50% 절감합니다.' },
      { icon: 'verified', title: 'Proven Results', desc: '도메인을 이해하는 개발자가 만들기에 현업에서 바로 쓸 수 있는 실용적 결과물을 보장합니다.' },
    ],
  },
  portfolio: {
    eyebrow: 'Portfolio',
    sub: '최근 완료 및 진행 중인 프로젝트',
    statusDone: '완료',
    statusWip: '진행 예정',
    visit: '사이트 방문',
    items: [
      {
        title: '새봄컨설팅 공식 웹사이트',
        client: '새봄컨설팅',
        description: '해외 수출 인증·허가 전문 관세사 사무실 랜딩페이지. AI 자동화와 전문 관세사 검토를 결합한 서비스 소개 및 견적 문의 기능 구현.',
        tags: ['Astro', 'React', 'Tailwind CSS', '랜딩페이지'],
        url: 'https://www.newbom.co.kr',
        status: 'completed',
      },
      {
        title: '관세 AI 신고서 생성 시스템',
        client: '새봄컨설팅',
        description: 'AI 기반 수출입 신고서 자동 생성 시스템. 관세사 업무 효율화를 위한 문서 자동화 솔루션 개발 예정.',
        tags: ['AI', 'Python', 'FastAPI', '문서 자동화'],
        status: 'in-progress',
      },
    ],
  },
  faq: {
    heading: '자주 묻는 질문',
    items: [
      {
        q: '워크플로우 자동화 플랫폼이 무엇인가요?',
        a: '업무 흐름을 화면에서 시각적으로 구성하면 AI 에이전트가 실행해주는 시스템입니다. 실행 추적, 실패 시 재시도·재개, 산출물 검증까지 관리하며, 오픈소스 Paperclip을 기반으로 확장해 구축했습니다.',
      },
      {
        q: 'GEO가 무엇인가요?',
        a: 'Generative Engine Optimization의 약자입니다. ChatGPT, Claude, Perplexity 같은 생성형 AI가 질문에 답할 때 내 웹사이트를 찾아 인용하도록 만드는 작업이에요. 기존 SEO가 검색 결과에서의 순위를 다룬다면, GEO는 AI 답변 안에 들어가는 자리를 다룹니다.',
      },
      {
        q: 'SEO와 GEO는 같이 해야 하나요?',
        a: '네. 생성형 AI도 결국 검색 결과를 참고하기 때문에 기본 SEO가 무너진 상태에서는 GEO 효과를 기대하기 어렵습니다. 구조·콘텐츠·스키마를 함께 잡는 게 순서입니다. 저희는 이 사이트와 자체 매체에 같은 기준을 적용해 운영합니다.',
      },
      {
        q: "'온보딩'은 어떻게 운영되고 있나요?",
        aHtml: "리서치, 초안 작성, 발행, 배포까지 콘텐츠 파이프라인 전 과정을 AI 에이전트가 자동으로 돌립니다. 매일 발행되고 있으며 발행 편수·조회수 같은 운영 지표는 <a href=\"https://mock.co.kr\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-deep-blue font-semibold hover:underline\">mock.co.kr</a>에서 그대로 공개합니다.",
      },
      {
        q: '자체 제품을 직접 만드는 이유가 뭔가요?',
        a: '파는 것을 우리가 먼저 쓰기 위해서입니다. 노출 최적화와 자동화를 직접 운영해보니 뭘 해야 하고 뭘 하면 안 되는지가 명확해집니다. 자체 매체에서 실패한 방법은 고객 프로젝트에 쓰지 않습니다.',
      },
      {
        q: '컨설팅은 어떻게 진행되나요?',
        a: '현업 흐름 진단(1~2주) → 검증 가능한 MVP(2주~) → 운영 이관 순으로 진행합니다. 처음부터 큰 시스템을 만들지 않습니다. 작게 검증하고 확장하는 게 실패 확률을 줄이는 방법이라고 믿습니다.',
      },
      {
        q: '어느 정도 규모의 기업에 적합한가요?',
        a: 'AI를 처음 도입하는 중소기업부터, 시범 사업은 돌려봤지만 운영 가능한 구조가 필요한 기업까지입니다. 회계·물류·관세 분야 실무 경험이 있어 해당 업종에서는 더 빠르게 시작할 수 있습니다.',
      },
    ],
  },
  contact: {
    heading: '문의하기',
    lines: ['귀사의 비즈니스에 AI를 더하고 싶으신가요?', '전문 엔지니어와 직접 상담을 시작해 보세요.'],
    cta: '이메일 보내기',
  },
  footer: {
    company: '회사 소개',
    privacy: '개인정보처리방침',
    biz: '인사이트플로 | 대표: 곽동규 | 사업자등록번호: 820-09-03326 | 개업일: 2025. 06. 16. | 업종: 응용소프트웨어개발업',
    rights: 'All rights reserved.',
  },
};

const en: typeof ko = {
  meta: {
    homeTitle: 'InsightFlo - Visual Workflow Automation Platform | AI Agents',
    homeDescription: 'Move work into workflows and let AI agents execute and manage them. InsightFlo builds and operates a visual workflow automation platform, the AI-native daily briefing Onboarding (mock.co.kr), and a GEO/SEO audit agent.',
    companyTitle: 'Company - InsightFlo',
    companyDescription: 'InsightFlo company profile. An AI software startup in Seoul, South Korea building and operating a visual workflow automation platform.',
  },
  nav: { products: 'Products', services: 'Services', about: 'About', contact: 'Contact' },
  hero: {
    badge: 'Founded 2025 · AI Agent Startup',
    headline: ['Move work into workflows,', 'and AI agents execute and manage them'],
    sub: "We build and operate our own visual workflow automation platform. The same approach powers our daily AI media 'Onboarding' and our GEO/SEO audit agent.",
    ctaPrimary: 'View Products',
    ctaSecondary: 'Free Consultation',
    stats: [
      { value: '581+', label: 'posts on our own media' },
      { value: 'Daily', label: 'automated publishing, live' },
      { value: '10+', label: 'years of domain experience' },
    ],
    shotAlt: "Screenshot of Onboarding (mock.co.kr), our AI-native news briefing",
    shotCaption: "Our own AI media 'Onboarding' — fully automated from research to publishing and distribution, with metrics published as-is",
  },
  products: {
    eyebrow: 'Products',
    heading: 'AI Products of Our Own',
    sub: 'We build what we sell — and run it ourselves. What is proven in our products goes straight into client projects.',
    main: {
      badge: 'Main Product',
      status: 'In production',
      title: 'Visual Workflow Automation Platform',
      desc: 'Draw your workflow on screen and AI agents execute it. Run tracking, retry and resume on failure, and artifact verification — managed in one place.',
      features: [
        'Visual graph editor for workflow design',
        'DAG execution engine with retry, resume & loops',
        'Artifact verification with Claude & Codex adapters',
      ],
      note: '* Built on the open-source Paperclip project and extended for production use.',
    },
    onboarding: {
      badge: 'Live',
      title: 'Onboarding',
      tagline: 'Manual Onboarding',
      desc: 'An AI-native daily news briefing. Agents run the entire content pipeline — research, drafting, publishing, and distribution.',
      features: [
        'A daily AI news briefing, published automatically',
        'End-to-end automation from planning to distribution',
        'Optimized for search and generative-AI visibility',
      ],
      link: 'Visit mock.co.kr',
    },
    geo: {
      badge: 'In development',
      title: 'GEO/SEO Audit Agent',
      desc: 'Analyzes your website, diagnoses visibility issues across search engines and generative AI, and generates a prioritized improvement report automatically.',
      features: [
        'GA4 and Search Console data analysis',
        'Structure, content and schema diagnostics',
        'Automated improvement reports',
      ],
    },
  },
  services: {
    eyebrow: 'Our Expertise',
    heading: 'Core Services',
    ai: {
      title: 'AI Consulting',
      desc: 'Adoption strategy for intelligent solutions built on current LLM technology and RAG architecture, leveraging your own data.',
      features: ['RAG (Retrieval-Augmented Generation)', 'LLM fine-tuning & custom agents', 'Workflow automation'],
    },
    sys: {
      title: 'System Development',
      desc: 'High-performance systems tailored to your business logic, on a solid architecture and a modern stack.',
      features: ['Modern web & app development', 'System integration (SI) & API design', 'Data pipelines & backend modernization'],
    },
  },
  whyus: {
    eyebrow: 'Why Choose Us',
    heading: 'Why InsightFlo?',
    sub: ['Long field experience and proven engineering,', 'working toward your business outcomes.'],
    items: [
      { icon: 'military_tech', number: '10+', title: 'Years in the field', description: 'From large-scale SI delivery to operations' },
      { icon: 'rocket_launch', number: 'Multiple', title: 'PoC deliveries', description: 'New-technology adoption and prototype builds, hands-on' },
      { icon: 'code_blocks', number: 'In-house', title: 'Platform engineering', description: 'A workflow platform we designed, built, and operate ourselves' },
      { icon: 'handshake', number: '100%', title: 'Customer success', description: 'A partnership that owns outcomes to the end' },
    ],
  },
  tech: {
    eyebrow: 'Tech Stack',
    heading: 'A Stack You Can Trust',
    categories: [
      { name: 'Frontend', items: ['React', 'TypeScript'] },
      { name: 'Backend', items: ['Node.js / TypeScript'] },
      {
        name: 'AI Models',
        items: ['Claude', 'Codex', 'GPT'],
      },
      { name: 'AI Framework & RAG', items: ['LangChain', 'LlamaIndex'] },
      { name: 'Database', items: ['PostgreSQL', 'Pinecone'] },
      { name: 'Cloud Infrastructure', items: ['AWS', 'GCP'] },
    ],
  },
  about: {
    eyebrow: 'Why InsightFlo',
    heading: ['Domain expertise + AI engineering', '= real business outcomes'],
    p1: "InsightFlo is an AI software startup founded in June 2025 in Seoul.\nAutomation know-how from building and running our own products goes directly into client projects.",
    p2: 'An AICPA credential, accounting SI delivery, and hands-on logistics POC experience let us understand your business deeply and solve real problems with AI.',
    domains: [
      { icon: 'account_balance', title: 'Accounting & Finance', desc: 'AICPA · ERP/accounting systems · financial data analysis' },
      { icon: 'local_shipping', title: 'Logistics & SCM', desc: 'Logistics automation POC · trade processes · inventory optimization' },
      { icon: 'gavel', title: 'Customs & Trade', desc: 'AI customs declarations · certification/permit automation · regulation review' },
    ],
    approach: [
      { icon: 'bolt', title: 'Fast Delivery', desc: 'By combining proven AI tools such as Claude, GPT, and LangChain, we deliver an MVP within two weeks.' },
      { icon: 'savings', title: 'Cost Effective', desc: "We don't build from scratch. Leveraging existing solutions cuts development costs by up to 50%." },
      { icon: 'verified', title: 'Proven Results', desc: 'Built by developers who understand the domain — practical results your team can use on day one.' },
    ],
  },
  portfolio: {
    eyebrow: 'Portfolio',
    sub: 'Recent completed and ongoing projects',
    statusDone: 'Completed',
    statusWip: 'Upcoming',
    visit: 'Visit site',
    items: [
      {
        title: 'Newbom Consulting Website',
        client: 'Newbom Consulting',
        description: "Landing page for a customs firm specializing in export certification and permits. Service introduction and quote-inquiry features combining AI automation with professional customs review.",
        tags: ['Astro', 'React', 'Tailwind CSS', 'Landing page'],
        url: 'https://www.newbom.co.kr',
        status: 'completed',
      },
      {
        title: 'AI Customs Declaration System',
        client: 'Newbom Consulting',
        description: 'AI-based automated generation of import/export declarations. A document automation solution to streamline customs workflows.',
        tags: ['AI', 'Python', 'FastAPI', 'Document automation'],
        status: 'in-progress',
      },
    ],
  },
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        q: 'What is the workflow automation platform?',
        a: 'It is a system where you design workflows visually on screen and AI agents execute them. It manages run tracking, retry and resume on failure, and artifact verification. It is built on the open-source Paperclip project and extended for production.',
      },
      {
        q: 'What is GEO?',
        a: "GEO stands for Generative Engine Optimization — making your website discoverable and citable when generative AI such as ChatGPT, Claude, or Perplexity answers questions. While SEO deals with rankings in search results, GEO deals with getting into the AI's answer itself.",
      },
      {
        q: 'Should SEO and GEO be done together?',
        a: 'Yes. Generative AI still refers to search results, so GEO has little effect when basic SEO is broken. Structure, content, and schema come first. We apply the same standard to this site and our own media.',
      },
      {
        q: "How is 'Onboarding' operated?",
        aHtml: "AI agents run the entire content pipeline — research, drafting, publishing, and distribution. It is published daily, and operating metrics such as post counts and views are published as-is on <a href=\"https://mock.co.kr\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-deep-blue font-semibold hover:underline\">mock.co.kr</a>.",
      },
      {
        q: 'Why do you build your own products?',
        a: 'To use what we sell before selling it. Running optimization and automation ourselves makes it clear what works and what does not. Methods that failed on our own media are never used in client projects.',
      },
      {
        q: 'How does consulting work?',
        a: 'We start with a workflow diagnosis (1-2 weeks), deliver a verifiable MVP (from 2 weeks), and hand over operations. We do not build big systems from day one — validate small, then expand.',
      },
      {
        q: 'What company size is a good fit?',
        a: 'From SMEs adopting AI for the first time to companies that ran pilots but need an operable structure. With hands-on experience in accounting, logistics, and customs, we can start even faster in those industries.',
      },
    ],
  },
  contact: {
    heading: 'Contact',
    lines: ['Want to bring AI into your business?', 'Start with a direct conversation with an engineer.'],
    cta: 'Send an Email',
  },
  footer: {
    company: 'Company',
    privacy: 'Privacy Policy',
    biz: '인사이트플로 | 대표: 곽동규 | 사업자등록번호: 820-09-03326 | 개업일: 2025. 06. 16. | 업종: 응용소프트웨어개발업',
    rights: 'All rights reserved.',
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
