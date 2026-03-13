import { FlexMessage, FlexBubble, FlexCarousel } from "@line/bot-sdk";
import { WeatherData, getWeatherEmoji, getSmallWeatherEmoji } from "../services/weather";
import { GiftProduct, WeatherCondition } from "../services/giftshop";

interface RecommendCardOptions {
  weather: WeatherData;
  condition: WeatherCondition;
  message: string;
  gifts: GiftProduct[];
}

const CONDITION_MSG_EN: Record<WeatherCondition, string> = {
  rain: "Rainy day — send an umbrella to someone you care about 🌧️",
  cloudy: "Cloudy day — a warm cup of tea sounds perfect ☁️",
  clear: "Sunny day! Treat someone to a cool drink ☀️",
  dry: "Dry weather — a moisturizing gift goes a long way 🧴",
};

export function buildRecommendCard(
  options: RecommendCardOptions
): FlexMessage {
  const { weather, condition, gifts } = options;
  const emoji = getWeatherEmoji(weather.weatherCode);
  const message = CONDITION_MSG_EN[condition];

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
        size: "12px" as any,
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
        size: "12px" as any,
        color: "#111111",
        align: "center" as const,
        weight: "bold" as const,
        margin: "4px" as any,
      },
    ],
  }));

  const now = new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Taipei",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 날씨 버블
  const weatherBubble: FlexBubble = {
    type: "bubble",
    size: "mega" as any,
    body: {
      type: "box",
      layout: "vertical",
      paddingAll: "16px",
      contents: [
        {
          type: "text",
          text: "Weather",
          size: "12px" as any,
          color: "#999999",
          weight: "bold",
        },
        {
          type: "text",
          text: weather.description,
          size: "16px" as any,
          weight: "bold",
          color: "#111111",
          margin: "4px" as any,
        },
        {
          type: "text",
          text: now,
          size: "11px" as any,
          color: "#BBBBBB",
          margin: "4px" as any,
        },
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
                  size: "5xl" as any,
                  weight: "bold",
                  color: "#111111",
                },
                {
                  type: "text",
                  text: `📍 ${weather.city}`,
                  size: "12px" as any,
                  color: "#111111",
                  weight: "bold",
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
        {
          type: "separator",
          margin: "16px" as any,
        },
        {
          type: "box",
          layout: "horizontal",
          margin: "16px" as any,
          contents: hourlyBlocks.length > 0
            ? hourlyBlocks
            : [{ type: "filler" as const }],
        },
      ],
    },
  };

  // 상품 버블들
  const productBubbles: FlexBubble[] = gifts.map((gift) => ({
    type: "bubble",
    size: "mega" as any,
    body: {
      type: "box",
      layout: "vertical",
      paddingAll: "16px",
      contents: [
        {
          type: "text",
          text: "Gift Recommendation",
          size: "12px" as any,
          color: "#999999",
        },
        {
          type: "text",
          text: message,
          size: "14px" as any,
          color: "#333333",
          wrap: true,
          margin: "8px" as any,
        },
        {
          type: "separator",
          margin: "16px" as any,
        },
        {
          type: "text",
          text: gift.name,
          size: "16px" as any,
          color: "#111111",
          weight: "bold",
          wrap: true,
          margin: "16px" as any,
        },
        {
          type: "text",
          text: `NT$ ${gift.price}`,
          size: "13px" as any,
          color: "#999999",
          margin: "8px" as any,
        },
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
              text: "Send Gift",
              size: "13px" as any,
              color: "#111111",
              align: "center" as const,
              weight: "bold" as const,
            },
          ],
          height: "35px",
          justifyContent: "center" as any,
          backgroundColor: "#A5FF05",
          cornerRadius: "8px",
          action: {
            type: "uri" as const,
            label: "Send Gift",
            uri: gift.shopUrl,
          },
        } as any,
      ],
      paddingBottom: "16px",
      paddingTop: "0px",
      paddingStart: "16px",
      paddingEnd: "16px",
    },
  }));

  const carousel: FlexCarousel = {
    type: "carousel",
    contents: [weatherBubble, ...productBubbles],
  };

  return {
    type: "flex",
    altText: `${emoji} ${weather.city} ${weather.temp}° — ${message}`,
    contents: carousel,
  };
}
