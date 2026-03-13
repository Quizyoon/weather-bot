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
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hLh6ibU7rE0cLEAxQk4RsEFpNHzY4YRdPYmgOei9VMSt7awd3bXMMRF4QJhEjIC9OS34Mfl4TNihGKD9jXHY9RFlQHXR7fSh3djIMalFRJjxWfAR0NjA",
      shopUrl: "https://giftshop-tw.line.me/shipping/322449198",
    },
    {
      id: "322378700",
      name: "莫蘭迪色系口袋款晴雨傘",
      price: 349,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hYTwg46u9BntKHhimzfZ5LBlDCgp5bwJzI2YbRm5bJ0hnbBJxFTE2azZYCwAPLBNlHTMoey5YJxMMLyBLFiQceG5XCC4xLz5mKyI1Vg9VJy01aDpxLHA1bQ",
      shopUrl: "https://giftshop-tw.line.me/shipping/322378700",
    },
    {
      id: "322403722",
      name: "ROLLS Eclipse 全日防禦傘",
      price: 1350,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hpDkv66HPL2tWDzAM1nRQPAVSIxplfitjP3cyVnJKDjIMZjtYCmwcaClJDy06ewNlASIBazJJDgMQPglbCjU1aHJGITILPRdbLGocRiVEGlgpeRNhMGEcfQ",
      shopUrl: "https://giftshop-tw.line.me/shipping/322403722",
    },
  ],
  // 흐린 날 → 차/커피
  cloudy: [
    {
      id: "322312031",
      name: "綜合花茶禮",
      price: 505,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hvcy5N9K6KUxETDcxtn5WGxURJT13PS1ELTQ0cWBOCAkeOjxsMW8ZUwYNJzcaNxVFBCI2dRFPDCMJdAVoEyoHTxYSCxkOOhFGPi40YR4MHDcZID5_eWw",
      shopUrl: "https://giftshop-tw.line.me/shipping/322312031",
    },
    {
      id: "322200050",
      name: "黑糖薑茶/黑糖桂圓禮盒",
      price: 359,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hzkFo8O8LJUR7FjX6XjNaEypLKTVIZyFMEm44eV8XBC8PejF3OC0WVDlUKQJSbRlNO3g6fS4VACs2LglgLHALRylLKxIXfBx0EnEBaSIUED8uejJ3RjY",
      shopUrl: "https://giftshop-tw.line.me/shipping/322200050",
    },
    {
      id: "322451132",
      name: "咖啡點心組",
      price: 549,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hxbbqogrUJ01fCDhei-dYGgxVKzxseSNFNnA6cHtNBTYvcBxtZms7cCgJLBQOOB9pCCUJTTtOBiUZOQF9AzI9TntBKSE7eDMYADcAdzgJLAsgfhtHOWYUWw",
      shopUrl: "https://giftshop-tw.line.me/shipping/322451132",
    },
  ],
  // 맑은 날 → 음료 바우처
  clear: [
    {
      id: "322135157",
      name: "全家 大杯熱拿鐵",
      price: 55,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0h9QvF8w4GZn5LP3aXCroZKRhiag94TmJ2Ikd7Q296RBJuUF4rLV1VRDw8RBEdVUpKHBJIfi95RxYNDkBOFwV8fW92UysVVnFBA1h8bTh0RisWSVp0LVFVaA",
      shopUrl: "https://giftshop-tw.line.me/voucher/322135157",
    },
    {
      id: "322460146",
      name: "星巴克 為你星動組合",
      price: 219,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hO5aIQOMYEBpcMA_xYIJvTQ1tHGtvQRQSNUgNJ3h1G3UaWD8THw0hGjh0G3UOASwTHF4PIwkzNXURCDw-C1Y-GQ5wHHYFATxPaFcjCR5rJWEBXAcpYRA",
      shopUrl: "https://giftshop-tw.line.me/voucher/322460146",
    },
    {
      id: "322461768",
      name: "CoCo都可 紅柚香檸美式(大) 2杯",
      price: 100,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hmC0AFFmQMmwNOC2F9qdNO1xlPh0-STZkZEAvUSl9OQdXCSdhQgICbFd_PxdXCw5lTVYtVVg7FwNAAB5IWl4cb194PgNLTydMVRgDf1dwBxdQVCVfMBg",
      shopUrl: "https://giftshop-tw.line.me/voucher/322461768",
    },
  ],
  // 건조한 날 → 바디케어/핸드크림
  dry: [
    {
      id: "322360411",
      name: "Aesop 經典護手霜(75mL)",
      price: 1050,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0h6G14rGP9aWgMTXfcq6AWP10QZRk_PG1gZTV0VShPZC5Zf0ZibWtaDShJYgRjf1VhTCN2UVlOTAdBdUVMWytHa14MXD14IkU9MCt1RUoUSy1RIX5bMW0",
      shopUrl: "https://giftshop-tw.line.me/shipping/322360411",
    },
    {
      id: "322319404",
      name: "MONCLOS COMFORT護手霜+DIY鑰匙圈",
      price: 590,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hzWxwKZkIJXhFDjuBtpNaLxRTKQl2fyFwLHY4RWENBC0MOjBLDWg5eGhGBEsLdhlxBWA6QRANABcINglcEmgLexdPBy4IeDJyfGoUawQKEAMYYjJLeC4",
      shopUrl: "https://giftshop-tw.line.me/shipping/322319404",
    },
    {
      id: "322193974",
      name: "MUMĆHIT 生日快樂香氛心意禮1+1",
      price: 290,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0h3npCyKePbEFNOnNeIIQTFh5nYDB-S2hJJEJxfGl_TS0lQXthCVxdUgg-Tio1Cnh1GhdCQSl8TSkLC0pxEQB2QmlzYi1gVkNxFRVfUWE7TQcyTFBLK1RfVw/f640w",
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
