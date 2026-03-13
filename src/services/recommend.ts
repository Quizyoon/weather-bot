import { FlexMessage } from "@line/bot-sdk";
import { getCurrentWeather, getWeatherType } from "./weather";
import {
  getConditionFromWeather,
  getGiftsByCondition,
  getConditionMessage,
} from "./giftshop";
import { buildRecommendCard } from "../flex/recommendCard";

export async function getWeatherRecommendation(): Promise<FlexMessage | null> {
  try {
    const weather = await getCurrentWeather();
    const type = getWeatherType(weather.weatherCode);
    const condition = getConditionFromWeather(type, weather.temp, weather.humidity);
    const gifts = getGiftsByCondition(condition);
    const message = getConditionMessage(condition);

    return buildRecommendCard({
      weather,
      condition,
      message,
      gifts,
    });
  } catch (err) {
    console.error("Recommendation error:", err);
    return null;
  }
}
