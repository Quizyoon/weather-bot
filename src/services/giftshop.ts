export interface GiftProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  shopUrl: string;
}

export type WeatherCondition = "rain" | "cloudy" | "clear" | "dry";

const GIFT_MAP: Record<WeatherCondition, GiftProduct[]> = {
  // 비 올 때 → 우산/우비
  rain: [
    {
      id: "322449198",
      name: "Coca-Cola 經典口袋晴雨傘",
      price: 799,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/shipping/322449198",
    },
    {
      id: "322378700",
      name: "莫蘭迪色系口袋款晴雨傘",
      price: 349,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/shipping/322378700",
    },
    {
      id: "322403722",
      name: "ROLLS Eclipse 全日防禦傘",
      price: 1350,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/shipping/322403722",
    },
  ],
  // 흐린 날 → 차/커피
  cloudy: [
    {
      id: "322312031",
      name: "綜合花茶禮",
      price: 505,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/shipping/322312031",
    },
    {
      id: "322200050",
      name: "黑糖薑茶/黑糖桂圓禮盒",
      price: 359,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/shipping/322200050",
    },
    {
      id: "322451132",
      name: "咖啡點心組",
      price: 549,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/shipping/322451132",
    },
  ],
  // 맑은 날 → 음료 바우처
  clear: [
    {
      id: "322135157",
      name: "全家 大杯熱拿鐵",
      price: 55,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/voucher/322135157",
    },
    {
      id: "322460146",
      name: "星巴克 為你星動組合",
      price: 219,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/voucher/322460146",
    },
    {
      id: "322461768",
      name: "CoCo都可 紅柚香檸美式(大) 2杯",
      price: 100,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/voucher/322461768",
    },
  ],
  // 건조한 날 → 바디케어/핸드크림
  dry: [
    {
      id: "322360411",
      name: "Aesop 經典護手霜(75mL)",
      price: 1050,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/shipping/322360411",
    },
    {
      id: "322319404",
      name: "MONCLOS COMFORT護手霜+DIY鑰匙圈",
      price: 590,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/shipping/322319404",
    },
    {
      id: "322193974",
      name: "MUMĆHIT 生日快樂香氛心意禮1+1",
      price: 290,
      imageUrl: "",
      shopUrl: "https://giftshop-tw.line.me/shipping/322193974",
    },
  ],
};

export function getConditionFromWeather(
  type: string,
  temp: number,
  humidity: number
): WeatherCondition {
  // 비/눈/뇌우 → rain
  if (type === "Rain" || type === "Drizzle" || type === "Thunderstorm" || type === "Snow")
    return "rain";
  // 흐림/안개 → cloudy
  if (type === "Clouds" || type === "Fog") return "cloudy";
  // 맑은데 건조 → dry
  if (type === "Clear" && humidity < 50) return "dry";
  // 맑음 → clear
  return "clear";
}

export function getGiftsByCondition(condition: WeatherCondition): GiftProduct[] {
  return GIFT_MAP[condition] || GIFT_MAP.clear;
}

export function getConditionMessage(condition: WeatherCondition): string {
  const messages: Record<WeatherCondition, string> = {
    rain: "비 오는 날, 소중한 사람에게 우산을 선물해보세요 🌧️",
    cloudy: "흐린 날엔 따뜻한 차 한 잔 어때요? ☁️",
    clear: "맑은 날! 시원한 음료 한 잔 선물하세요 ☀️",
    dry: "건조한 날, 촉촉한 핸드크림 선물은 어떨까요? 🧴",
  };
  return messages[condition];
}
