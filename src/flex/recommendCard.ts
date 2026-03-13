import { FlexMessage, FlexBubble, FlexComponent } from "@line/bot-sdk";
import { WeatherData, getWeatherEmoji } from "../services/weather";
import {
  GiftProduct,
  WeatherCondition,
} from "../services/giftshop";

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

  const giftBubbles: FlexComponent[] = gifts.map((gift) => ({
    type: "box" as const,
    layout: "horizontal" as const,
    margin: "lg" as any,
    spacing: "md" as any,
    contents: [
      {
        type: "box" as const,
        layout: "vertical" as const,
        flex: 1,
        contents: [
          {
            type: "text" as const,
            text: gift.name,
            size: "sm" as const,
            color: "#111111",
            weight: "bold" as const,
            wrap: true,
          },
          {
            type: "text" as const,
            text: `${gift.currency} ${gift.price}`,
            size: "xs" as const,
            color: "#999999",
            margin: "xs" as any,
          },
        ],
      },
    ],
    action: {
      type: "uri" as const,
      label: "선물하기",
      uri: `${gift.shopUrl}?type=gift`,
    },
  }));

  const bubble: FlexBubble = {
    type: "bubble",
    size: "giga" as any,
    body: {
      type: "box",
      layout: "vertical",
      paddingAll: "16px",
      contents: [
        {
          type: "text",
          text: `${emoji} 오늘의 날씨`,
          size: "lg" as const,
          weight: "bold",
          color: "#111111",
        },
        {
          type: "box",
          layout: "horizontal",
          margin: "md" as any,
          contents: [
            {
              type: "text",
              text: `${weather.city}`,
              size: "sm" as const,
              color: "#666666",
              flex: 1,
            },
            {
              type: "text",
              text: `${weather.temp}° ${weather.description}`,
              size: "sm" as const,
              color: "#666666",
              align: "end" as const,
              flex: 2,
            },
          ],
        },
        {
          type: "separator",
          margin: "lg" as any,
        },
        {
          type: "text",
          text: message,
          size: "sm" as const,
          color: "#333333",
          wrap: true,
          margin: "lg" as any,
        },
        ...giftBubbles,
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
            label: "기프트샵 둘러보기",
            uri: "https://giftshop-tw.line.me?type=gift",
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
