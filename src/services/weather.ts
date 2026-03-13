export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  city: string;
}

// Taipei default coordinates
const DEFAULT_LAT = process.env.DEFAULT_LAT || "25.03";
const DEFAULT_LON = process.env.DEFAULT_LON || "121.57";
const DEFAULT_CITY = process.env.DEFAULT_CITY || "Taipei";

// WMO Weather interpretation codes
const WMO_CODES: Record<number, { description: string; type: string }> = {
  0: { description: "맑음", type: "Clear" },
  1: { description: "대체로 맑음", type: "Clear" },
  2: { description: "구름 조금", type: "Clouds" },
  3: { description: "흐림", type: "Clouds" },
  45: { description: "안개", type: "Fog" },
  48: { description: "안개", type: "Fog" },
  51: { description: "이슬비", type: "Drizzle" },
  53: { description: "이슬비", type: "Drizzle" },
  55: { description: "이슬비", type: "Drizzle" },
  56: { description: "빙결 이슬비", type: "Drizzle" },
  57: { description: "빙결 이슬비", type: "Drizzle" },
  61: { description: "약한 비", type: "Rain" },
  63: { description: "비", type: "Rain" },
  65: { description: "강한 비", type: "Rain" },
  66: { description: "빙결 비", type: "Rain" },
  67: { description: "강한 빙결 비", type: "Rain" },
  71: { description: "약한 눈", type: "Snow" },
  73: { description: "눈", type: "Snow" },
  75: { description: "강한 눈", type: "Snow" },
  77: { description: "싸락눈", type: "Snow" },
  80: { description: "소나기", type: "Rain" },
  81: { description: "소나기", type: "Rain" },
  82: { description: "강한 소나기", type: "Rain" },
  85: { description: "눈보라", type: "Snow" },
  86: { description: "강한 눈보라", type: "Snow" },
  95: { description: "뇌우", type: "Thunderstorm" },
  96: { description: "우박 뇌우", type: "Thunderstorm" },
  99: { description: "강한 우박 뇌우", type: "Thunderstorm" },
};

export async function getCurrentWeather(): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_LAT}&longitude=${DEFAULT_LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status} ${res.statusText}`);
  }

  const data: any = await res.json();
  const current = data.current;
  const code = current.weather_code as number;
  const wmo = WMO_CODES[code] || { description: "알 수 없음", type: "Clear" };

  return {
    temp: Math.round(current.temperature_2m),
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: code,
    description: wmo.description,
    city: DEFAULT_CITY,
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
