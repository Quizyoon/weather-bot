import { FlexMessage, FlexBubble } from "@line/bot-sdk";
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

  const productItems = gifts.map((gift) => ({
    type: "box" as const,
    layout: "horizontal" as const,
    contents: [
      {
        type: "box" as const,
        layout: "vertical" as const,
        flex: 1,
        cornerRadius: "8px",
        contents: [
          {
            type: "image" as const,
            url: gift.imageUrl,
            size: "full" as any,
            aspectRatio: "1:1",
            aspectMode: "cover" as const,
          },
        ],
      } as any,
      {
        type: "box" as const,
        layout: "vertical" as const,
        flex: 3,
        paddingStart: "12px" as any,
        justifyContent: "center" as any,
        contents: [
          {
            type: "text" as const,
            text: gift.name,
            size: "12px" as any,
            color: "#111111",
            wrap: true,
            maxLines: 1,
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
    ],
    margin: "8px" as any,
    action: {
      type: "uri" as const,
      label: gift.name,
      uri: gift.shopUrl,
    },
  }));

  const now = new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Taipei",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const bubble: FlexBubble = {
    type: "bubble",
    size: "kilo" as any,
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
          size: "18px" as any,
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
                  text: `  ${weather.city}`,
                  size: "12px" as any,
                  color: "#111111",
                  weight: "bold",
                  margin: "8px" as any,
                  contents: [
                    {
                      type: "icon",
                      url: "https://raw.githubusercontent.com/Quizyoon/weather-bot/main/img/place.png",
                      size: "xxs" as any,
                    },
                    {
                      type: "span",
                      text: ` ${weather.city}`,
                      weight: "bold",
                    },
                  ],
                } as any,
                {
                  type: "text",
                  text: " ",
                  size: "12px" as any,
                  margin: "8px" as any,
                  contents: [
                    {
                      type: "span",
                      text: `${weather.tempMax}°`,
                      color: "#000000",
                    },
                    {
                      type: "span",
                      text: ` / ${weather.tempMin}°  `,
                      color: "#999999",
                    },
                    {
                      type: "icon",
                      url: "https://raw.githubusercontent.com/Quizyoon/weather-bot/main/img/Fill%204.png",
                      size: "xxs" as any,
                    },
                    {
                      type: "span",
                      text: ` ${weather.humidity}%`,
                      color: "#96B2FF",
                    },
                  ],
                } as any,
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
        // 시간대별 날씨
        {
          type: "box",
          layout: "horizontal",
          margin: "24px" as any,
          contents: hourlyBlocks.length > 0
            ? hourlyBlocks
            : [{ type: "filler" as const }],
        },
        // 디바이더
        {
          type: "separator",
          margin: "16px" as any,
          color: "#EEEEEE",
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
        ...(productItems.map((item, i) =>
          i === 0 ? { ...item, margin: "16px" } : item
        ) as any[]),
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
              text: "More Gifts",
              size: "13px" as any,
              color: "#111111",
              align: "center" as const,
              weight: "bold" as const,
            },
          ],
          height: "40px",
          justifyContent: "center" as any,
          backgroundColor: "#F0F0F0",
          cornerRadius: "8px",
          action: {
            type: "uri" as const,
            label: "More Gifts",
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
