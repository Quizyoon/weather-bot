export interface GiftProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  shopUrl: string;
}

export type WeatherCondition = "rain" | "cold" | "hot" | "warm" | "snow" | "default";

// 스타벅스 기프트샵 상품 매핑 (날씨 조건별)
const GIFT_MAP: Record<WeatherCondition, GiftProduct[]> = {
  rain: [
    {
      id: "starbucks-hot-latte",
      name: "스타벅스 카페 라떼 (HOT)",
      price: 150,
      currency: "TWD",
      imageUrl: "https://giftshop-tw.line.me/img/product/starbucks-hot-latte.jpg",
      shopUrl: "https://giftshop-tw.line.me",
    },
    {
      id: "starbucks-hot-choco",
      name: "스타벅스 핫 초콜릿",
      price: 150,
      currency: "TWD",
      imageUrl: "https://giftshop-tw.line.me/img/product/starbucks-hot-choco.jpg",
      shopUrl: "https://giftshop-tw.line.me",
    },
  ],
  cold: [
    {
      id: "starbucks-hot-americano",
      name: "스타벅스 카페 아메리카노 (HOT)",
      price: 130,
      currency: "TWD",
      imageUrl: "https://giftshop-tw.line.me/img/product/starbucks-hot-americano.jpg",
      shopUrl: "https://giftshop-tw.line.me",
    },
    {
      id: "starbucks-hot-tea",
      name: "스타벅스 잉글리시 브렉퍼스트 티",
      price: 140,
      currency: "TWD",
      imageUrl: "https://giftshop-tw.line.me/img/product/starbucks-hot-tea.jpg",
      shopUrl: "https://giftshop-tw.line.me",
    },
  ],
  hot: [
    {
      id: "starbucks-iced-americano",
      name: "스타벅스 아이스 아메리카노",
      price: 140,
      currency: "TWD",
      imageUrl: "https://giftshop-tw.line.me/img/product/starbucks-iced-americano.jpg",
      shopUrl: "https://giftshop-tw.line.me",
    },
    {
      id: "starbucks-frappuccino",
      name: "스타벅스 프라푸치노",
      price: 170,
      currency: "TWD",
      imageUrl: "https://giftshop-tw.line.me/img/product/starbucks-frappuccino.jpg",
      shopUrl: "https://giftshop-tw.line.me",
    },
  ],
  warm: [
    {
      id: "starbucks-iced-latte",
      name: "스타벅스 아이스 카페 라떼",
      price: 160,
      currency: "TWD",
      imageUrl: "https://giftshop-tw.line.me/img/product/starbucks-iced-latte.jpg",
      shopUrl: "https://giftshop-tw.line.me",
    },
  ],
  snow: [
    {
      id: "starbucks-hot-mocha",
      name: "스타벅스 카페 모카 (HOT)",
      price: 160,
      currency: "TWD",
      imageUrl: "https://giftshop-tw.line.me/img/product/starbucks-hot-mocha.jpg",
      shopUrl: "https://giftshop-tw.line.me",
    },
  ],
  default: [
    {
      id: "starbucks-drip-coffee",
      name: "스타벅스 오늘의 커피",
      price: 120,
      currency: "TWD",
      imageUrl: "https://giftshop-tw.line.me/img/product/starbucks-drip-coffee.jpg",
      shopUrl: "https://giftshop-tw.line.me",
    },
  ],
};

export function getConditionFromWeather(
  type: string,
  temp: number
): WeatherCondition {
  if (type === "Snow") return "snow";
  if (type === "Rain" || type === "Drizzle" || type === "Thunderstorm")
    return "rain";
  if (temp <= 10) return "cold";
  if (temp >= 30) return "hot";
  if (temp >= 20) return "warm";
  return "cold";
}

export function getGiftsByCondition(condition: WeatherCondition): GiftProduct[] {
  return GIFT_MAP[condition] || GIFT_MAP.default;
}

export function getConditionMessage(condition: WeatherCondition): string {
  const messages: Record<WeatherCondition, string> = {
    rain: "비 오는 날, 따뜻한 음료로 마음을 전해보세요 ☕",
    cold: "쌀쌀한 날씨에 따뜻한 선물은 어떨까요? 🧣",
    hot: "더운 날엔 시원한 음료가 최고! 🧊",
    warm: "따뜻한 날씨에 어울리는 음료 한 잔 ☕",
    snow: "눈 오는 날, 달달한 모카로 온기를 전하세요 ❄️",
    default: "오늘도 좋은 하루! 커피 한 잔 어때요? ☕",
  };
  return messages[condition];
}
