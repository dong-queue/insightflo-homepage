# 11. Cloudflare 전환 체크리스트

상담 신청서와 문의 관리 화면을 운영에 올리는 순서입니다. 코드는 브랜치 `feature/cloudflare-consult`에 있습니다.

## 진행 상황 (2026-10-30)

| 단계 | 상태 |
|---|---|
| 1. 메일 알림 | B(텔레그램만)로 결정 |
| 2. DNS 이전 | 아직. DNSSEC는 꺼져 있습니다(`dig DS insightflo.co`가 비어 있음) |
| 3.1 D1 | 만듦. `insightflo-inquiries`, APAC, 표 생성까지 |
| 3.2 Turnstile | 만듦. 위젯 `insightflo-consult`, Site Key `0x4AAAAAAFsX9oersep1F08R`, 허용 주소 insightflo.co와 workers.dev |
| 3.3 텔레그램 | 아직 |
| 3.5 Access | 아직 |
| 3.6 GitHub 설정 | 일부. 변수 `PUBLIC_TURNSTILE_SITE_KEY`와 비밀 값 `CLOUDFLARE_ACCOUNT_ID`는 넣었고, `CLOUDFLARE_API_TOKEN`은 아직 |
| 4. workers.dev 확인 | 마침. `https://insightflo-homepage.insightflo.workers.dev`에서 실제 브라우저로 신청 1건이 Turnstile을 통과해 저장되는 것을 보고 지웠습니다 |
| 5. 전환 | 아직 |

이 문서의 5단계를 마치기 전에는 main에 합치지 않습니다. main에 합치면 GitHub Pages 배포 워크플로가 사라지고 Cloudflare 배포가 돌기 때문입니다. 그동안 insightflo.co는 GitHub Pages가 마지막 배포본을 계속 내보냅니다.

## 왜 옮기는가

GitHub Pages는 정적 파일만 내보내므로 신청서를 받아 저장할 서버 코드를 돌릴 수 없습니다. Cloudflare Workers로 옮기면 정적 페이지는 지금처럼 빌드한 파일 그대로 나가고, `/api/consult`(신청 접수)와 `/admin/inquiries`(문의 관리)만 Worker가 처리합니다. 신청 내용은 D1에 저장하고, 1년이 지난 신청은 매일 03:00(한국 시간)에 지웁니다.

## 표시

- **[대표]**: 대시보드나 외부 서비스에서 대표만 할 수 있는 일
- **[에이전트]**: 이 컴퓨터에 로그인된 wrangler로 에이전트가 대신 할 수 있는 일. wrangler는 insightflo@gmail.com 계정으로 로그인되어 있고 Workers, D1, Email Routing, Email Sending, Turnstile 쓰기 권한이 있습니다(2026-10-30 `npx wrangler whoami`).

## 1. 메일 알림 [결정: B, 2026-10-30]

새 신청 알림은 텔레그램으로만 받습니다. `wrangler.jsonc`에 `send_email` 바인딩과 `MAIL_FROM`, `MAIL_TO`가 없으므로 메일은 보내지 않고, 관리 화면에도 메일 결과를 보이지 않습니다. 나중에 메일 알림을 켜는 방법은 8절에 있습니다.

| 선택 | 비용 | 하는 일 |
|---|---|---|
| A. 메일과 텔레그램 | Workers Paid 월 5달러 | 하위 도메인 `notify.insightflo.co`를 Email Sending에 등록하고 `consult@notify.insightflo.co`에서 보냅니다 |
| B. 텔레그램만 (선택함) | 무료 | 메일 바인딩과 변수를 두지 않습니다. 개인정보처리방침 4절 Cloudflare 이용 목적에 "알림 메일 발송"을 넣지 않습니다 |

근거(Cloudflare Email Service 문서, 2026-10-30 확인):

- 보내는 주소의 도메인은 Email Service에 등록되어 있어야 합니다(Send bindings 문서).
- Email Sending은 Workers Free에서 쓸 수 없습니다(Pricing 문서). 2026-10 기준 베타입니다.
- 무료인 Email Routing은 등록할 때 루트 도메인의 MX를 Cloudflare로 바꿉니다. 그러면 teo@insightflo.co로 오는 메일이 Daum에 도착하지 않습니다. **insightflo.co에는 Email Routing을 켜지 않습니다.**
- 확인된 수신 주소(teo@insightflo.co)로 보내는 메일은 요금과 발송 한도에 들어가지 않습니다.

## 2. DNS를 Cloudflare로 옮기기 [대표]

이 단계는 사이트와 메일에 영향이 없어야 합니다. 모든 레코드를 지금 값 그대로, 프록시를 끈 상태(DNS only, 회색 구름)로 옮기기 때문입니다. 프록시를 켜면 GitHub Pages 인증서 갱신이 실패할 수 있습니다.

1. Cloudflare 대시보드 > Add a domain > `insightflo.co` > Free 플랜.
2. Cloudflare가 가져온 레코드를 아래 표, 그리고 GoDaddy DNS 화면과 대조합니다. DKIM(`..._domainkey`)처럼 이름을 모르면 밖에서 조회할 수 없는 레코드가 있을 수 있으니 GoDaddy 화면을 기준으로 빠짐없이 옮깁니다. 가져온 A, CNAME 레코드가 프록시 켬(주황 구름)으로 들어오면 끕니다.

   | 종류 | 이름 | 값 | 프록시 |
   |---|---|---|---|
   | A | `@` | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 | 끔 |
   | CNAME | `www` | `insightflo.github.io` | 끔 |
   | MX | `@` | 10 `aspmx.daum.net`, 20 `alt.aspmx.daum.net` | |
   | TXT | `@` | `v=spf1 include:_spf.daum.net -all` | |
   | TXT | `@` | `google-site-verification=4_JQ9Oz82QtJwcKLmhIQbz8OC8ATjvdxMc3cjrlZKh0` | |
   | TXT | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:teo@insightflo.co; pct=100; aspf=r` | |

3. GoDaddy에서 DNSSEC가 켜져 있으면 먼저 끕니다. 켠 채로 네임서버를 바꾸면 도메인 조회가 실패합니다.
4. GoDaddy > 도메인 > 네임서버 > 직접 입력에 Cloudflare가 알려 준 네임서버 두 개를 넣습니다.
5. Cloudflare에서 도메인 상태가 Active가 될 때까지 기다립니다(보통 몇 시간, 길면 24시간).
6. 확인
   - `dig NS insightflo.co +short`에 Cloudflare 네임서버가 나옵니다.
   - `dig MX insightflo.co +short`에 Daum 서버 두 개가 그대로 나옵니다.
   - https://insightflo.co 가 지금처럼 열립니다.
   - 바깥 주소에서 teo@insightflo.co로 메일을 보내 받고, teo@에서 바깥으로도 보내 봅니다.

## 3. 자원 만들기

### 3.1 D1 데이터베이스 [에이전트]

```bash
npx wrangler d1 create insightflo-inquiries --location apac
```

출력된 `database_id`를 `wrangler.jsonc`의 `d1_databases[0].database_id`에 넣고 표를 만듭니다. 2026-10-30에 만든 값은 `8803a34f-bd00-43ca-a6d7-e8f863c71a23`이고 이미 들어 있습니다.

```bash
npm run db:migrate:remote
```

`--location apac`은 위치 힌트입니다. 그 지역 안의 어느 데이터센터에 둘지는 Cloudflare가 정합니다. 개인정보처리방침 4절의 "아시아·태평양 지역에 두도록 설정"이 이 설정을 가리킵니다.

### 3.2 Turnstile(봇 차단) [에이전트, GitHub 설정은 대표]

```bash
npx wrangler turnstile widget create insightflo-consult --mode managed --domain insightflo.co
```

wrangler 4.156.0의 alpha 명령입니다. 대시보드 Turnstile > Add widget에서 같은 값으로 만들어도 됩니다. workers.dev 주소는 4단계 첫 배포 때 나옵니다. 처음에는 `insightflo.co`만 넣어 만들고, 첫 배포 뒤 `npx wrangler turnstile widget update <Site Key> --domain insightflo.co --domain <workers.dev 주소>`로 두 주소를 다시 지정합니다.

2026-10-30에 만든 위젯: 이름 `insightflo-consult`, Site Key `0x4AAAAAAFsX9oersep1F08R`, 허용 주소 `insightflo.co`, `insightflo-homepage.insightflo.workers.dev`. Secret Key는 Worker 비밀 값 `TURNSTILE_SECRET_KEY`로만 넣었고 파일에는 적지 않았습니다. 다시 넣을 때는 `npx wrangler turnstile widget get <Site Key> --json`의 `secret` 값을 화면에 띄우지 말고 `wrangler secret put`으로 바로 넘깁니다.

1. `insightflo.co`를 넣으면 www를 포함한 하위 도메인이 함께 허용됩니다. workers.dev 주소는 4단계 시험용입니다.
2. Site Key는 GitHub 저장소 Settings > Secrets and variables > Actions > **Variables**에 `PUBLIC_TURNSTILE_SITE_KEY`로 넣습니다. 페이지에 그대로 나가는 공개 값입니다. 로컬에서 배포할 때도 이 값이 필요합니다.
3. Secret Key는 4단계에서 `TURNSTILE_SECRET_KEY`로 넣습니다.

`PUBLIC_TURNSTILE_SITE_KEY`가 비어 있으면 빌드가 일부러 실패합니다. 키 없이 배포되어 신청서가 막히는 일을 막기 위해서입니다.

### 3.3 텔레그램 봇 [대표]

1. 텔레그램에서 @BotFather > `/newbot`으로 봇을 만들고 봇 토큰을 받습니다.
2. 새 봇에게 `/start`를 보낸 뒤 브라우저에서 `https://api.telegram.org/bot<토큰>/getUpdates`를 열고 `"chat":{"id": ...}` 값을 적어 둡니다.
3. 4단계에서 `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`로 넣습니다.

알림에는 접수 번호, 한 달 처리 건수, 관리 화면 링크만 담습니다. 신청자가 적은 내용은 텔레그램으로 보내지 않습니다(`src/server/notify.ts`, 개인정보처리방침 4절).

### 3.4 메일 [하지 않음. 1번에서 B를 골랐습니다. 메일 알림을 켤 때 참고]

1. Workers Paid를 구독합니다.
2. 대시보드 > Compute > Email Service > Email Routing > **Destination Addresses**에서 `teo@insightflo.co`를 추가하고, 받은 확인 메일에서 Verify email address를 누릅니다. 확인된 주소로 보내는 메일은 월 발송 한도에 들어가지 않습니다. 이 화면의 **Onboard Domain**은 누르지 않습니다. 루트 MX가 바뀝니다. 주소를 추가하려는데 도메인 등록을 먼저 요구하면 이 단계는 건너뜁니다. 알림 메일은 Workers Paid에 포함된 월 3,000건 안에서 나갑니다.
3. Compute > Email Service > Email Sending > **Onboard Domain**에서 `notify.insightflo.co`를 고릅니다. 반송 처리용 MX와 SPF(`cf-bounce.notify.insightflo.co`), DKIM(`cf-bounce._domainkey.notify.insightflo.co`), DMARC(`_dmarc.notify.insightflo.co`)가 추가됩니다.
4. 루트 레코드가 그대로인지 확인합니다. `dig MX insightflo.co +short`는 Daum 서버, `dig TXT _dmarc.insightflo.co +short`는 기존 값이어야 합니다.

이어서 8절 "메일 알림을 켜려면"을 따릅니다.

### 3.5 Cloudflare Access(관리 화면 로그인) [대표]

1. Zero Trust 대시보드(one.dash.cloudflare.com)를 엽니다. 처음이면 팀 이름을 정하고 Free 플랜을 고릅니다.
2. Access > Applications > Add an application > Self-hosted.
   - 이름: InsightFlo 문의 관리
   - 도메인 `insightflo.co`, 경로 `admin`. 하위 경로 `/admin/inquiries`도 함께 보호됩니다.
   - 정책: Allow, Include > Emails > `teo@insightflo.co`
   - 로그인 방법: One-time PIN(메일로 받은 숫자로 로그인)
3. 애플리케이션의 **Application Audience (AUD) Tag**와 팀 도메인을 `wrangler.jsonc`의 `vars`에 넣습니다. 둘 다 비밀 값이 아니라서 커밋해도 됩니다.
   - `ACCESS_TEAM_DOMAIN`: `https://<팀 이름>.cloudflareaccess.com`. 형식이 다르면 관리 화면이 닫힌 채로 남습니다.
   - `ACCESS_AUD`: AUD 태그 값

Access는 insightflo.co가 Cloudflare를 거쳐 나가는 5단계부터 동작합니다. Worker도 Access 토큰을 직접 검사하므로, Access 앞단이 없거나 설정이 빠지면 관리 화면은 열리지 않습니다(설정 없음 503, 토큰 없음 403).

### 3.6 GitHub 배포 설정 [대표]

저장소 Settings > Secrets and variables > Actions:

| 종류 | 이름 | 값 |
|---|---|---|
| Secret | `CLOUDFLARE_API_TOKEN` | 아래 권한으로 만든 API 토큰 |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 계정 ID(`npx wrangler whoami`에 나옵니다) |
| Variable | `PUBLIC_TURNSTILE_SITE_KEY` | 3.2의 Site Key |

API 토큰은 My Profile > API Tokens > Create Token에서 "Edit Cloudflare Workers" 템플릿으로 시작해 **Account > D1 > Edit**을 더하고, 범위를 이 계정과 `insightflo.co`로 좁힙니다. 첫 배포가 권한 오류로 멈추면 오류에 나온 권한을 더합니다.

## 4. workers.dev 주소로 먼저 확인 [에이전트]

```bash
PUBLIC_TURNSTILE_SITE_KEY=<Site Key> npm run deploy
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

`npm run deploy`는 빌드, D1 마이그레이션, 배포를 차례로 합니다. Turnstile 비밀 값을 넣기 전에는 신청 API가 503을 돌려줍니다.

`https://insightflo-homepage.insightflo.workers.dev`에서 확인합니다. 2026-10-30에 텔레그램을 뺀 항목을 모두 확인했습니다.

- [ ] `/`, `/en/`, `/company/`, `/privacy/`가 열리고 테마·언어 전환이 됩니다
- [ ] 신청서를 한 건 보내면 접수 영수증이 나옵니다
- [ ] 텔레그램 알림이 옵니다(접수 번호, 한 달 처리 건수, 관리 화면 링크만)
- [ ] 저장과 알림 결과를 봅니다:
  `npx wrangler d1 execute DB --remote --command "select id, status, telegram_status, email_status from inquiries order by created_at desc limit 5"`
- [ ] `/admin/inquiries`가 닫혀 있습니다(Access 값을 넣었으면 403, 아직이면 503)
- [ ] `/_worker.js/index.js`와 `/_routes.json`이 404입니다

시험으로 넣은 신청은 5단계에서 관리 화면으로 지웁니다.

## 5. 전환: insightflo.co를 Worker로 [에이전트, 대표 확인]

1. 준비
   - `wrangler.jsonc`에서 `routes` 줄의 주석을 풀고, 3.5의 Access 값이 들어 있는지 확인합니다.
   - 개인정보처리방침 시행일(`src/pages/privacy.astro`의 `effectiveDate`, 지금 2026년 11월 6일)과 전환일을 맞춥니다. 신청서가 열리는 날부터 새 방침이 시행되어야 합니다.
2. 로컬에서 배포합니다.

   ```bash
   PUBLIC_TURNSTILE_SITE_KEY=<Site Key> npm run deploy
   ```

   wrangler가 `You already have DNS records that conflict for these Custom Domains`로 시작하는 질문을 하면 yes를 고릅니다. GitHub Pages를 가리키던 A 레코드가 Worker 연결로 바로 바뀌므로 A 레코드를 미리 지울 필요가 없고, 사이트가 비는 시간이 없습니다. 터미널이 아닌 환경(GitHub Actions)에서는 wrangler가 묻지 않고 덮어씁니다(wrangler 4.156.0 `publishCustomDomains`). 그래서 이 단계는 로컬에서 지켜보며 합니다.

   덮어쓰기가 실패하면 DNS 화면에서 `@` A 레코드 네 개를 지우고 바로 다시 배포합니다. 지운 뒤 배포가 끝날 때까지 사이트가 열리지 않습니다.
3. www를 insightflo.co로 보냅니다.
   - DNS에서 `www` CNAME(`insightflo.github.io`)을 지우고, `www` AAAA `100::`를 프록시 켬(주황 구름)으로 추가합니다.
   - Rules > Redirect Rules에서 "Redirect from WWW to root" 템플릿을 씁니다. 301, 쿼리 문자열 유지.
   - SSL/TLS > Edge Certificates에서 **Always Use HTTPS**를 켭니다. 리다이렉트 규칙은 `https://www.`만 맞추므로, `http://` 요청은 이 설정이 먼저 HTTPS로 보냅니다.
   - GitHub를 가리키는 www 레코드를 남겨 두면, 나중에 GitHub Pages를 내렸을 때 다른 사람이 그 주소를 자기 Pages에 연결할 수 있습니다.
4. 확인
   - [ ] `curl -sI https://insightflo.co/ | grep -i '^server'`가 `cloudflare`입니다
   - [ ] `curl -sI "https://www.insightflo.co/company/?a=1"`이 `https://insightflo.co/company/?a=1`로 301을 돌려줍니다
   - [ ] `curl -sI http://insightflo.co/`가 `https://insightflo.co/`로 보냅니다
   - [ ] 신청서 한 건을 보내고 알림이 옵니다
   - [ ] `https://insightflo.co/admin/inquiries`에서 Access 로그인(teo@로 받은 숫자)을 거쳐 목록이 보입니다. 시험 건을 지웁니다
   - [ ] teo@insightflo.co 메일을 그대로 주고받습니다
5. `wrangler.jsonc`의 `workers_dev`를 `false`로 바꾸고, Turnstile 위젯에서 workers.dev 주소를 지웁니다.
6. 1번과 5번에서 바꾼 `wrangler.jsonc`(routes, Access 값, workers_dev)와 D1 `database_id`를 브랜치에 커밋하고 main에 합칩니다. GitHub Actions의 "Deploy to Cloudflare Workers"가 성공하는지 봅니다. 이때부터 main에 푸시하면 Cloudflare로 배포됩니다.

## 6. 정리(전환 뒤 1~2주 안정되면) [대표]

- Google Search Console에 사이트맵 `https://insightflo.co/sitemap-index.xml`을 다시 제출합니다. 소유 확인 파일(`public/googleafbf999ca5b137e1.html`)과 TXT 레코드는 그대로 남아 있습니다.
- GitHub 저장소 Settings > Pages에서 사용자 지정 도메인을 지우고 Pages를 내립니다. 그 전까지는 7단계 되돌리기가 바로 됩니다.

## 7. 되돌리기

GitHub Pages를 내리기 전이라면:

1. Workers & Pages > insightflo-homepage > Settings > Domains & Routes에서 `insightflo.co`를 지웁니다.
2. DNS에 A 레코드 네 개(185.199.108.153~185.199.111.153, 프록시 끔)를 다시 넣고, www를 CNAME `insightflo.github.io`(프록시 끔)로 되돌리고, www 리다이렉트 규칙을 끕니다.
3. GitHub Pages가 마지막 배포본을 다시 내보냅니다. GitHub가 인증서를 다시 발급하는 동안 잠시 HTTPS 경고가 날 수 있습니다.
4. `wrangler.jsonc`의 `routes`를 다시 주석 처리해 main에 올립니다. 그대로 두면 다음 배포가 도메인을 다시 Worker에 붙입니다.

D1에 쌓인 신청은 그대로 남습니다.

## 8. 운영 메모

- 비밀 값 교체: `npx wrangler secret put <이름>`. 대상은 `TURNSTILE_SECRET_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`입니다.
- 오류 기록: Workers & Pages > insightflo-homepage > Observability. 요청마다 남는 기록은 꺼 두었고, 코드가 남기는 오류만 보입니다.
- 알림이 실패해도 신청은 저장됩니다. 관리 화면의 각 신청에 텔레그램과 메일 결과(보냄, 실패, 보내지 않음)가 보입니다.
- 보관 기간을 바꾸면 `src/server/inquiries.ts`의 `RETENTION_DAYS`와 개인정보처리방침 2절을 같이 고칩니다.
- 텔레그램 알림에 신청 내용을 더 담으려면 개인정보처리방침 4절에 텔레그램(Telegram Messenger Inc.)을 국외 이전 받는 자로 적어야 합니다.

### 메일 알림을 켜려면

1. 3.4를 따라 Workers Paid를 구독하고 `notify.insightflo.co`를 Email Sending에 등록합니다. insightflo.co 루트에는 Email Routing을 켜지 않습니다.
2. `wrangler.jsonc`에 다음을 넣습니다.

   ```jsonc
   "send_email": [{ "name": "EMAIL", "destination_address": "teo@insightflo.co" }],
   // vars 안에
   "MAIL_FROM": "consult@notify.insightflo.co",
   "MAIL_TO": "teo@insightflo.co",
   ```

3. 개인정보처리방침 4절 Cloudflare 이용 목적에 "알림 메일 발송"을 더하고, 알림을 텔레그램으로 받는다는 문단을 고칩니다.
4. 배포한 뒤 시험 신청 한 건으로 메일이 오는지, 답장 주소가 신청자인지 확인합니다. 관리 화면에 메일 결과가 다시 보입니다.
