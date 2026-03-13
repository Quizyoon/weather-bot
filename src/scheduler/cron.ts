import cron from "node-cron";
import { Client } from "@line/bot-sdk";
import { getWeatherRecommendation } from "../services/recommend";

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
      await client.pushMessage(userId, card);
    } catch (err) {
      console.error(`Failed to push to ${userId}:`, err);
    }
  }
}

export function setupScheduler(client: Client): void {
  const tz = { timezone: "Asia/Seoul" as const };

  // 매일 아침 8시 (KST) 날씨 기반 선물 추천 푸시
  cron.schedule("0 8 * * *", () => sendDailyRecommendation(client), tz);

  console.log("Scheduler initialized — daily push at 08:00 KST");
}
