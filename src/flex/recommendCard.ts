import { FlexMessage, FlexBubble, FlexBox } from "@line/bot-sdk";
import { WeatherData, getWeatherEmoji } from "../services/weather";
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

  const productItems: FlexBox[] = gifts.map((gift) => ({
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
        type: "button" as const,
        action: {
          type: "uri" as const,
          label: "선물하기",
          uri: gift.shopUrl,
        },
        style: "link" as const,
        height: "sm" as const,
        flex: 0,
        color: "#111111",
      } as any,
    ],
    paddingAll: "12px",
    backgroundColor: "#F8F8F8",
    cornerRadius: "8px",
    margin: "8px" as any,
  }));

  const bubble: FlexBubble = {
    type: "bubble",
    size: "giga" as any,
    body: {
      type: "box",
      layout: "vertical",
      paddingAll: "16px",
      contents: [
        // 날씨 타이틀
        {
          type: "text",
          text: `${emoji} ${weather.city} ${weather.temp}°`,
          size: "xl" as const,
          weight: "bold",
          color: "#111111",
        },
        // 날씨 설명
        {
          type: "text",
          text: weather.description,
          size: "13px" as any,
          color: "#999999",
          margin: "4px" as any,
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
        ...productItems,
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          action: {
            type: "uri",
            label: "기프트샵 더보기",
            uri: "https://giftshop-tw.line.me",
          },
          style: "primary",
          color: "#A5FF05",
          height: "sm" as const,
        },
      ],
      paddingBottom: "10px",
    },
  };

  return {
    type: "flex",
    altText: `${emoji} ${weather.city} ${weather.temp}° — ${message}`,
    contents: bubble,
  };
}
