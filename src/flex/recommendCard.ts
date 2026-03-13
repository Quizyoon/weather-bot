import { FlexMessage, FlexBubble } from "@line/bot-sdk";
import { WeatherData, getWeatherEmoji, getSmallWeatherEmoji } from "../services/weather";
import { GiftProduct, WeatherCondition } from "../services/giftshop";

interface RecommendCardOptions {
  weather: WeatherData;
  condition: WeatherCondition;
  message: string;
  gifts: GiftProduct[];
}

export function buildRecommendCard(
  options: RecommendCardOptions
): FlexMessage {
  const { weather, message, gifts } = options;
  const emoji = getWeatherEmoji(weather.weatherCode);

  // 시간대별 날씨 블록
  const hourlyBlocks = weather.hourly.map((h) => ({
    type: "box" as const,
    layout: "vertical" as const,
    flex: 1,
    alignItems: "center" as any,
    contents: [
      {
        type: "text" as const,
        text: h.time,
        size: "11px" as any,
        color: "#999999",
        align: "center" as const,
      },
      {
        type: "text" as const,
        text: getSmallWeatherEmoji(h.weatherCode),
        size: "lg" as const,
        align: "center" as const,
        margin: "4px" as any,
      },
      {
        type: "text" as const,
        text: `${h.temp}°`,
        size: "13px" as any,
        color: "#111111",
        align: "center" as const,
        weight: "bold" as const,
        margin: "4px" as any,
      },
    ],
  }));

  // 상품 목록 블록
  const productItems = gifts.map((gift) => ({
    type: "box" as const,
    layout: "horizontal" as const,
    contents: [
      {
        type: "box" as const,
        layout: "vertical" as const,
        flex: 1,
        contents: [
          {
            type: "text" as const,
            text: gift.name,
            size: "14px" as any,
            color: "#111111",
            weight: "bold" as const,
            wrap: true,
            maxLines: 2,
          },
          {
            type: "text" as const,
            text: `NT$ ${gift.price}`,
            size: "12px" as any,
            color: "#999999",
            margin: "4px" as any,
          },
        ],
      },
      {
        type: "text" as const,
        text: "선물하기",
        size: "13px" as any,
        color: "#000000",
        align: "end" as const,
        gravity: "center" as const,
        flex: 0,
        action: {
          type: "uri" as const,
          label: "선물하기",
          uri: gift.shopUrl,
        },
      },
    ],
    paddingAll: "12px",
    backgroundColor: "#F0F0F0",
    cornerRadius: "8px",
    margin: "8px" as any,
  }));

  const now = new Date().toLocaleDateString("ko-KR", {
    timeZone: "Asia/Taipei",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const bubble: FlexBubble = {
    type: "bubble",
    size: "mega" as any,
    body: {
      type: "box",
      layout: "vertical",
      paddingAll: "16px",
      contents: [
        // Weather 라벨
        {
          type: "text",
          text: "Weather",
          size: "13px" as any,
          color: "#999999",
        },
        // 날씨 설명 (볼드)
        {
          type: "text",
          text: weather.description,
          size: "lg" as const,
          weight: "bold",
          color: "#111111",
          margin: "4px" as any,
        },
        // 날짜
        {
          type: "text",
          text: now,
          size: "12px" as any,
          color: "#BBBBBB",
          margin: "4px" as any,
        },
        // 온도 + 이모지
        {
          type: "box",
          layout: "horizontal",
          margin: "16px" as any,
          contents: [
            {
              type: "box",
              layout: "vertical",
              flex: 1,
              contents: [
                {
                  type: "text",
                  text: `${weather.temp}°`,
                  size: "3xl" as const,
                  weight: "bold",
                  color: "#111111",
                },
                {
                  type: "text",
                  text: `📍 ${weather.city}`,
                  size: "14px" as any,
                  color: "#111111",
                  margin: "8px" as any,
                },
                {
                  type: "text",
                  text: `${weather.tempMax}° / ${weather.tempMin}°  💧${weather.humidity}%`,
                  size: "12px" as any,
                  color: "#999999",
                  margin: "4px" as any,
                },
              ],
            },
            {
              type: "text",
              text: emoji,
              size: "5xl" as any,
              align: "end" as const,
              gravity: "center" as const,
              flex: 0,
            },
          ],
        },
        // 구분선
        {
          type: "separator",
          margin: "16px" as any,
        },
        // 시간대별 날씨
        {
          type: "box",
          layout: "horizontal",
          margin: "16px" as any,
          contents: hourlyBlocks.length > 0
            ? hourlyBlocks
            : [{ type: "filler" as const }],
        },
        // 구분선
        {
          type: "separator",
          margin: "16px" as any,
        },
        // 추천 메시지
        {
          type: "text",
          text: message,
          size: "14px" as any,
          color: "#333333",
          wrap: true,
          margin: "16px" as any,
        },
        // 상품 목록
        ...(productItems as any[]),
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "기프트샵 더보기",
              size: "14px" as any,
              color: "#111111",
              align: "center" as const,
              weight: "bold" as const,
            },
          ],
          paddingAll: "12px",
          backgroundColor: "#A5FF05",
          cornerRadius: "8px",
          action: {
            type: "uri" as const,
            label: "기프트샵 더보기",
            uri: "https://giftshop-tw.line.me",
          },
        } as any,
      ],
      paddingBottom: "16px",
      paddingTop: "0px",
      paddingStart: "16px",
      paddingEnd: "16px",
    },
  };

  return {
    type: "flex",
    altText: `${emoji} ${weather.city} ${weather.temp}° — ${message}`,
    contents: bubble,
  };
}
