# LINE Weather Gift Bot

날씨 기반 LINE 선물 추천 봇 (대만 시장 타겟)

## Project Overview

- **Stack:** TypeScript, Express, @line/bot-sdk v10, node-cron, Open-Meteo API
- **Entry:** `src/index.ts` → Express 서버 + webhook + 스케줄러
- **Port:** 3001 (`.env` 설정)
- **Target:** 대만 (Taipei, Asia/Taipei, LINE Gift Shop TW)

### Architecture

```
LINE User → POST /webhook → handler.ts
  ├── follow/unfollow → 구독자 관리 (in-memory Set)
  ├── /today, /오늘 → 날씨 추천 카드 발송
  └── /help, /도움말 → 도움말 텍스트

scheduler/cron.ts → 매일 15:00 KST → 전체 구독자에게 push
```

### Key Files

| Path | 역할 |
|------|------|
| `src/index.ts` | Express 서버, 미들웨어, 스케줄러 초기화 |
| `src/webhook/handler.ts` | LINE 이벤트 처리 (follow/unfollow/message) |
| `src/services/weather.ts` | Open-Meteo API 날씨 조회 + WMO 코드 파싱 |
| `src/services/giftshop.ts` | 날씨→선물 매칭 (rain/cloudy/clear/dry) |
| `src/services/recommend.ts` | 날씨+선물 조합 → Flex Message 생성 |
| `src/flex/recommendCard.ts` | LINE Flex Message 카드 빌더 |
| `preview.html` | Flex 메시지 HTML 프리뷰 |

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
```

> `.env` 파일은 절대 커밋하지 않는다.

---

## Skill

### Flex Message 카드 수정

1. `src/flex/recommendCard.ts` 수정 (실제 LINE 메시지)
2. `preview.html` 동기화 (브라우저 프리뷰)
3. 색상/레이아웃 변경 시 두 파일 모두 업데이트

### 선물 상품 추가/변경

- `src/services/giftshop.ts`의 `PRODUCTS` 배열 수정
- 카테고리: `rain`, `cloudy`, `clear`, `dry`
- URL 형식: `https://giftshop-tw.line.me/shipping/{id}` 또는 `/voucher/{id}`

### 날씨 조건 튜닝

- `src/services/giftshop.ts`의 `getConditionFromWeather()` 함수
- 습도 50% 기준으로 clear/dry 분기

---

## Hook

### 커밋 컨벤션

- 커밋 메시지: 영문, 간결하게 (예: `Style: high temp black, humidity blue`)
- 카드 디자인 변경: `recommendCard.ts` + `preview.html` 동시 커밋

### 주의사항

- `.env` 커밋 금지
- `img/` 디렉토리는 디자인 참고용 에셋 (untracked 상태 유지 가능)
- 구독자 목록은 in-memory → 서버 재시작 시 리셋됨

---

## Workflow

### 카드 디자인 변경 흐름

```
1. 사용자 요청 (색상, 레이아웃 등)
2. src/flex/recommendCard.ts 수정
3. preview.html 동기화
4. 커밋 & 푸시
```

### 새 기능 추가 흐름

```
1. 서비스 로직 추가/수정 (src/services/)
2. 필요 시 Flex 카드 수정 (src/flex/)
3. webhook handler 연결 (src/webhook/)
4. 빌드 확인: npm run build
5. 커밋 & 푸시
```

### 배포 흐름

```
1. npm run build (TypeScript → dist/)
2. npm start (dist/index.js 실행)
3. LINE webhook URL: https://{domain}/webhook
4. Health check: GET /health
```
