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
        text: "날씨 기반 선물 추천 봇입니다! ☀️🎁\n매일 오후 3시에 날씨에 맞는 선물을 추천해드려요.\n\n/오늘 — 지금 바로 추천 받기",
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
        text: "날씨 기반 선물 추천 봇입니다! ☀️🎁\n/오늘 — 날씨 + 선물 추천\n/도움말 — 명령어 안내",
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
            text: "날씨 정보를 가져오지 못했어요. 잠시 후 다시 시도해주세요.",
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
          text: "📌 명령어\n/오늘 — 오늘 날씨 + 선물 추천\n/도움말 — 명령어 안내",
        }],
      });
      return;
    }
  }
}
