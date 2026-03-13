export interface HourlyForecast {
  time: string; // "8AM", "10AM" etc.
  temp: number;
  weatherCode: number;
}

export interface WeatherData {
  temp: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  city: string;
  hourly: HourlyForecast[];
}

const DEFAULT_CITY = process.env.DEFAULT_CITY || "Taipei";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "";

// WMO Weather interpretation codes
const WMO_CODES: Record<number, { description: string; type: string }> = {
  0: { description: "Clear sky", type: "Clear" },
  1: { description: "Mostly clear", type: "Clear" },
  2: { description: "Partly cloudy", type: "Clouds" },
  3: { description: "Cloudy", type: "Clouds" },
  45: { description: "Foggy", type: "Fog" },
  48: { description: "Foggy", type: "Fog" },
  51: { description: "Light drizzle", type: "Drizzle" },
  53: { description: "Drizzle", type: "Drizzle" },
  55: { description: "Heavy drizzle", type: "Drizzle" },
  56: { description: "Freezing drizzle", type: "Drizzle" },
  57: { description: "Freezing drizzle", type: "Drizzle" },
  61: { description: "Light rain", type: "Rain" },
  63: { description: "Rain", type: "Rain" },
  65: { description: "Heavy rain", type: "Rain" },
  66: { description: "Freezing rain", type: "Rain" },
  67: { description: "Heavy freezing rain", type: "Rain" },
  71: { description: "Light snow", type: "Snow" },
  73: { description: "Snow", type: "Snow" },
  75: { description: "Heavy snow", type: "Snow" },
  77: { description: "Snow grains", type: "Snow" },
  80: { description: "Rain showers", type: "Rain" },
  81: { description: "Rain showers", type: "Rain" },
  82: { description: "Heavy showers", type: "Rain" },
  85: { description: "Snow showers", type: "Snow" },
  86: { description: "Heavy snow showers", type: "Snow" },
  95: { description: "Thunderstorm", type: "Thunderstorm" },
  96: { description: "Thunderstorm with hail", type: "Thunderstorm" },
  99: { description: "Heavy thunderstorm", type: "Thunderstorm" },
};

// 캐싱: 10분간 날씨 데이터 재사용
let cachedWeather: WeatherData | null = null;
let cacheExpiry = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1시간

// WeatherAPI.com condition code → WMO code 매핑
function mapToWmoCode(conditionCode: number, isDay: boolean): number {
  if (conditionCode === 1000) return isDay ? 0 : 0; // Clear
  if (conditionCode === 1003) return 2; // Partly cloudy
  if (conditionCode === 1006 || conditionCode === 1009) return 3; // Cloudy
  if (conditionCode === 1030 || conditionCode === 1135 || conditionCode === 1147) return 45; // Fog
  if (conditionCode >= 1063 && conditionCode <= 1072) return 51; // Drizzle
  if (conditionCode >= 1150 && conditionCode <= 1171) return 53; // Drizzle
  if (conditionCode >= 1180 && conditionCode <= 1201) return 63; // Rain
  if (conditionCode >= 1240 && conditionCode <= 1246) return 80; // Rain showers
  if (conditionCode >= 1204 && conditionCode <= 1237) return 71; // Snow/Sleet
  if (conditionCode >= 1255 && conditionCode <= 1264) return 85; // Snow showers
  if (conditionCode >= 1273) return 95; // Thunderstorm
  return 2;
}

export async function getCurrentWeather(): Promise<WeatherData> {
  if (cachedWeather && Date.now() < cacheExpiry) {
    console.log("Using cached weather data");
    return cachedWeather;
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${DEFAULT_CITY}&days=1&aqi=no`;

  const res = await fetch(url);
  if (!res.ok) {
    if (cachedWeather) {
      console.log("API error, returning stale cache");
      return cachedWeather;
    }
    throw new Error(`Weather API error: ${res.status} ${res.statusText}`);
  }

  const data: any = await res.json();
  const current = data.current;
  const forecast = data.forecast.forecastday[0];
  const wmoCode = mapToWmoCode(current.condition.code, current.is_day === 1);
  const wmo = WMO_CODES[wmoCode] || { description: current.condition.text, type: "Clear" };

  // 현재 시간 기준으로 앞으로 5개 시간대 추출
  const now = new Date();
  const currentHour = now.getHours();
  const hourly: HourlyForecast[] = [];

  if (forecast.hour) {
    for (let i = 0; i < forecast.hour.length && hourly.length < 5; i++) {
      const hour = new Date(forecast.hour[i].time).getHours();
      if (hour >= currentHour) {
        const hCode = mapToWmoCode(forecast.hour[i].condition.code, forecast.hour[i].is_day === 1);
        hourly.push({
          time: `${hour > 12 ? hour - 12 : hour || 12}${hour >= 12 ? "PM" : "AM"}`,
          temp: Math.round(forecast.hour[i].temp_c),
          weatherCode: hCode,
        });
      }
    }
  }

  const weather: WeatherData = {
    temp: Math.round(current.temp_c),
    tempMax: Math.round(forecast.day.maxtemp_c),
    tempMin: Math.round(forecast.day.mintemp_c),
    humidity: current.humidity,
    windSpeed: current.wind_kph,
    weatherCode: wmoCode,
    description: wmo.description,
    city: DEFAULT_CITY,
    hourly,
  };

  cachedWeather = weather;
  cacheExpiry = Date.now() + CACHE_TTL;
  console.log("Weather data cached for 1 hour");

  return weather;
}

export function getWeatherType(code: number): string {
  return WMO_CODES[code]?.type || "Clear";
}

export function getWeatherEmoji(code: number): string {
  const type = getWeatherType(code);
  const map: Record<string, string> = {
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Rain: "🌧️",
    Snow: "❄️",
    Fog: "🌫️",
    Clear: "☀️",
    Clouds: "☁️",
  };
  return map[type] || "🌤️";
}

export function getSmallWeatherEmoji(code: number): string {
  const type = getWeatherType(code);
  const map: Record<string, string> = {
    Thunderstorm: "⛈",
    Drizzle: "🌦",
    Rain: "🌧",
    Snow: "❄",
    Fog: "🌫",
    Clear: "☀",
    Clouds: "☁",
  };
  return map[type] || "🌤";
}
