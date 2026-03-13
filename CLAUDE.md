# LINE Weather Gift Bot

날씨 기반 LINE 선물 추천 봇 (대만 시장 타겟)

## Project Overview

- **Stack:** TypeScript, Express, @line/bot-sdk v10, node-cron, WeatherAPI.com
- **Entry:** `src/index.ts` → Express 서버 + webhook + 스케줄러
- **Port:** 3001 (`.env` 설정), Render에서는 10000
- **Target:** 대만 (Taipei, Asia/Taipei, LINE Gift Shop TW)
- **Deploy:** Render (Auto-Deploy from GitHub main branch)

### Architecture

```
LINE User → POST /webhook → handler.ts
  ├── follow/unfollow → 구독자 관리 (in-memory Set)
  ├── /today, /오늘 → 날씨 추천 카드 발송
  └── /help, /도움말 → 도움말 텍스트

scheduler/cron.ts → 매일 15:00 KST → 전체 구독자에게 push
                   → 14분마다 keep-alive self-ping
```

### Key Files

| Path | 역할 |
|------|------|
| `src/index.ts` | Express 서버, 미들웨어, 스케줄러 초기화, webhook 로깅 |
| `src/webhook/handler.ts` | LINE 이벤트 처리 (follow/unfollow/message), 디버그 로깅 |
| `src/services/weather.ts` | WeatherAPI.com 날씨 조회 + 1시간 캐싱 + WMO 코드 매핑 |
| `src/services/giftshop.ts` | 날씨→선물 매칭 (rain/cloudy/clear/dry) + 상품 이미지 URL |
| `src/services/recommend.ts` | 날씨+선물 조합 → Flex Message 생성 |
| `src/flex/recommendCard.ts` | LINE Flex Message 카드 빌더 |
| `src/scheduler/cron.ts` | 매일 15:00 KST 푸시 + 14분 keep-alive ping |
| `preview.html` | Flex 메시지 HTML 프리뷰 |
| `img/` | 아이콘 에셋 (place.png, Fill 4.png) — 현재 미사용 |

---

## Claude

### Code Style

- TypeScript strict mode
- `as any` / `as const` 캐스팅으로 LINE SDK 타입 호환 처리
- Flex Message 구조는 `recommendCard.ts`에서 JSON-like 객체로 직접 구성
- 프리뷰 변경 시 `preview.html`도 함께 동기화

### Build & Run

```bash
npm run dev        # 개발 (ts-node)
npm run build      # tsc 컴파일 → dist/
npm start          # 프로덕션 실행
```

### Environment Variables

```
LINE_CHANNEL_SECRET, LINE_CHANNEL_ACCESS_TOKEN
DEFAULT_CITY, DEFAULT_LAT, DEFAULT_LON
PORT
WEATHER_API_KEY          # WeatherAPI.com API key
RENDER_EXTERNAL_URL      # Render 자동 주입, keep-alive에 사용
```

> `.env` 파일은 절대 커밋하지 않는다.
> Render 환경변수는 대시보드에서 별도 관리.

---

## Skill

### Flex Message 카드 수정

1. `src/flex/recommendCard.ts` 수정 (실제 LINE 메시지)
2. `preview.html` 동기화 (브라우저 프리뷰)
3. 색상/레이아웃 변경 시 두 파일 모두 업데이트

### 선물 상품 추가/변경

- `src/services/giftshop.ts`의 `GIFT_MAP` 수정
- 카테고리: `rain`, `cloudy`, `clear`, `dry`
- `imageUrl`: LINE Gift Shop 상품 페이지에서 og:image 추출
- URL 형식: `https://giftshop-tw.line.me/shipping/{id}` 또는 `/voucher/{id}`

### 날씨 조건 튜닝

- `src/services/giftshop.ts`의 `getConditionFromWeather()` 함수
- 습도 50% 기준으로 clear/dry 분기

---

## Hook

### 커밋 컨벤션

- 커밋 메시지: 영문, 간결하게 (예: `Style: high temp black, humidity blue`)
- 카드 디자인 변경: `recommendCard.ts` + `preview.html` 동시 커밋
- 연속 푸시 시 Render 배포 충돌(Deploy cancelled) 주의 → 한번에 모아서 푸시

### 주의사항

- `.env` 커밋 금지
- 구독자 목록은 in-memory → 서버 재시작 시 리셋됨 (DB 전환 필요)
- LINE Flex `icon` 타입은 `text.contents` 안에서 사용 불가 (400 에러 발생) → 이모지 사용
- LINE Flex `image`의 `size`는 키워드만 지원 (xxs, xs, sm, md, lg, xl 등)
- 상품 썸네일은 `image` + `flex` 비율로 크기 조정 (box wrap 시 에러 가능)
- 날씨 API 과다 호출 시 429 에러 → 1시간 캐싱으로 해결, API 에러 시 이전 캐시 반환

---

## Workflow

### 카드 디자인 변경 흐름

```
1. 사용자 요청 (색상, 레이아웃 등)
2. src/flex/recommendCard.ts 수정
3. preview.html 동기화
4. npm run build 확인
5. 커밋 & 푸시 (한번에)
6. Render 자동 배포 → Live 확인 → /오늘 테스트
```

### 새 기능 추가 흐름

```
1. 서비스 로직 추가/수정 (src/services/)
2. 필요 시 Flex 카드 수정 (src/flex/)
3. webhook handler 연결 (src/webhook/)
4. 빌드 확인: npm run build
5. 커밋 & 푸시
6. Render 환경변수 필요 시 대시보드에서 추가
```

### 배포 흐름

```
1. GitHub push → Render Auto-Deploy
2. Deploy cancelled 시 → Manual Deploy → Deploy latest commit
3. LINE webhook URL: https://weather-bot-4wu4.onrender.com/webhook
4. Health check: GET /health
5. Render 로그에서 webhook/에러 확인
```

---

## Change Log

### 2026-03-13

**카드 디자인**
- 최고기온 블랙, 습도 `#96B2FF` 블루 색상 (span 분리)
- 카드 사이즈 `mega` → `kilo`
- description 폰트 18px, hourly margin 24px, temp-range margin 8px
- 시간대별 날씨 하단 디바이더 추가 (색상 `#EEEEEE`)
- 추천 메시지 ~ 첫 상품 간격 16px
- 아이콘: 커스텀 icon 타입 실패 → 이모지(📍, 💧)로 확정

**상품 영역**
- 선물 상품 썸네일 이미지 추가 (LINE Gift Shop에서 추출, 12개)
- 썸네일: image + flex 1:3 비율, cornerRadius 제거
- Send Gift 버튼 제거, 상품 행 전체 탭으로 이동
- More Gifts 버튼 → 회색 (`#F0F0F0`), 높이 40px
- 제품명 12px 레귤러, 1줄 말줄임 (wrap + maxLines:1)
- 상품 배경색 제거, 패딩 제거

**인프라**
- 날씨 API: Open-Meteo → WeatherAPI.com 전환 (429 rate limit 문제)
- 날씨 데이터 1시간 캐싱 (API 에러 시 이전 캐시 반환)
- Keep-alive self-ping cron 추가 (14분 간격, sleep 방지)
- Webhook 이벤트 로깅 + handler 디버그 로깅 추가
- LINE Developers Console: Webhook URL 설정, Use webhook 활성화
- Render 환경변수: `WEATHER_API_KEY` 추가
