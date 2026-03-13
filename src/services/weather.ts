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

const DEFAULT_LAT = process.env.DEFAULT_LAT || "25.03";
const DEFAULT_LON = process.env.DEFAULT_LON || "121.57";
const DEFAULT_CITY = process.env.DEFAULT_CITY || "Taipei";

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

export async function getCurrentWeather(): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_LAT}&longitude=${DEFAULT_LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTaipei&forecast_days=1`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status} ${res.statusText}`);
  }

  const data: any = await res.json();
  const current = data.current;
  const code = current.weather_code as number;
  const wmo = WMO_CODES[code] || { description: "알 수 없음", type: "Clear" };

  // 현재 시간 기준으로 앞으로 5개 시간대 추출
  const now = new Date();
  const currentHour = now.getHours();
  const hourly: HourlyForecast[] = [];

  if (data.hourly) {
    for (let i = 0; i < data.hourly.time.length && hourly.length < 5; i++) {
      const hour = new Date(data.hourly.time[i]).getHours();
      if (hour >= currentHour) {
        hourly.push({
          time: `${hour > 12 ? hour - 12 : hour || 12}${hour >= 12 ? "PM" : "AM"}`,
          temp: Math.round(data.hourly.temperature_2m[i]),
          weatherCode: data.hourly.weather_code[i],
        });
      }
    }
  }

  return {
    temp: Math.round(current.temperature_2m),
    tempMax: Math.round(data.daily.temperature_2m_max[0]),
    tempMin: Math.round(data.daily.temperature_2m_min[0]),
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: code,
    description: wmo.description,
    city: DEFAULT_CITY,
    hourly,
  };
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
