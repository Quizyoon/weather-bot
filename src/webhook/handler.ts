import { messagingApi, WebhookEvent } from "@line/bot-sdk";
import { addSubscriber, removeSubscriber } from "../scheduler/cron";
import { getWeatherRecommendation } from "../services/recommend";

type Client = messagingApi.MessagingApiClient;

export async function handleEvent(
  client: Client,
  event: WebhookEvent
): Promise<void> {
  if (event.type === "follow") {
    const userId = event.source.userId;
    if (userId) addSubscriber(userId);

    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: "text",
        text: "Weather Gift Bot ☀️🎁\nGet daily gift recommendations based on today's weather!\n\n/today — Get recommendation now",
      }],
    });
    return;
  }

  if (event.type === "unfollow") {
    const userId = event.source.userId;
    if (userId) removeSubscriber(userId);
    return;
  }

  if (event.type === "join") {
    // 그룹/채팅방 입장
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: "text",
        text: "Weather Gift Bot ☀️🎁\n/today — Weather + gift recommendation\n/help — Command list",
      }],
    });
    return;
  }

  if (event.type === "message" && event.message.type === "text") {
    const text = event.message.text.trim();

    if (text === "/오늘" || text === "/today") {
      const card = await getWeatherRecommendation();
      if (card) {
        await client.replyMessage({
          replyToken: event.replyToken,
          messages: [card as any],
        });
      } else {
        await client.replyMessage({
          replyToken: event.replyToken,
          messages: [{
            type: "text",
            text: "Could not fetch weather data. Please try again later.",
          }],
        });
      }
      return;
    }

    if (text === "/도움말" || text === "/help") {
      await client.replyMessage({
        replyToken: event.replyToken,
        messages: [{
          type: "text",
          text: "📌 Commands\n/today — Weather + gift recommendation\n/help — Command list",
        }],
      });
      return;
    }
  }
}
