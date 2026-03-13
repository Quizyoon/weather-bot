import cron from "node-cron";
import { messagingApi } from "@line/bot-sdk";
import { getWeatherRecommendation } from "../services/recommend";

type Client = messagingApi.MessagingApiClient;

// 구독자 목록 (추후 DB로 이동)
const subscribers: Set<string> = new Set();

export function addSubscriber(userId: string): void {
  subscribers.add(userId);
}

export function removeSubscriber(userId: string): void {
  subscribers.delete(userId);
}

export function getSubscribers(): string[] {
  return Array.from(subscribers);
}

async function sendDailyRecommendation(client: Client): Promise<void> {
  const card = await getWeatherRecommendation();
  if (!card) {
    console.log("No recommendation generated — skipping push.");
    return;
  }

  const users = getSubscribers();
  if (users.length === 0) {
    console.log("No subscribers — skipping push.");
    return;
  }

  console.log(`Sending daily recommendation to ${users.length} users...`);

  for (const userId of users) {
    try {
      await client.pushMessage({
        to: userId,
        messages: [card as any],
      });
    } catch (err) {
      console.error(`Failed to push to ${userId}:`, err);
    }
  }
}

function keepAlive(): void {
  const url = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3001}`;
  fetch(`${url}/health`).catch(() => {});
}

export function setupScheduler(client: Client): void {
  const tz = { timezone: "Asia/Seoul" as const };

  // 매일 오전 11:30 (KST) 날씨 기반 선물 추천 푸시
  cron.schedule("30 11 * * *", () => sendDailyRecommendation(client), tz);

  // 14분마다 self-ping → 서버 sleep 방지
  cron.schedule("*/14 * * * *", keepAlive);

  console.log("Scheduler initialized — daily push at 11:30 KST, keep-alive every 14min");
}
