export interface GiftProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  shopUrl: string;
}

export type WeatherCondition = "rain" | "typhoon" | "cloudy" | "clear" | "clear_hot" | "clear_cool" | "dry" | "dust" | "cold" | "uv_high";

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
  // 맑은 날 (기본) → 음료 바우처
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
  // 맑은 더운 날 (≥25°C) → 아이스 음료
  clear_hot: [
    {
      id: "322461768",
      name: "CoCo 紅柚香檸美式(大) 2杯",
      price: 100,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hmC0AFFmQMmwNOC2F9qdNO1xlPh0-STZkZEAvUSl9OQdXCSdhQgICbFd_PxdXCw5lTVYtVVg7FwNAAB5IWl4cb194PgNLTydMVRgDf1dwBxdQVCVfMBg",
      shopUrl: "https://giftshop-tw.line.me/voucher/322461768",
    },
    {
      id: "322461769",
      name: "CoCo 珍珠職人拿鐵(14oz)",
      price: 70,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hNgUjVpHvEUhoEw6hkBtuHzlOHTlbYhVAAWsMdUwSJxEuZypFDSsiLCUSMDMQZC1BKH0OcT0QNCclKz1sP3U_SzpTHScuZz1oMy8OZS5TJDM1fwZ7VTM",
      shopUrl: "https://giftshop-tw.line.me/voucher/322461769",
    },
    {
      id: "322461770",
      name: "CoCo 職人美式(14oz)",
      price: 30,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hzw9V93P2JVgELzqx_eBaD1dyKSk3XiFQbVc4ZSBqBB5WWQoNRAI5S3xwEA5oRB5GUwILWGBpBDBCHgNoWBU_WyBmKzdSHDFofkkBZVEuEDR7WRlSYkEWTg",
      shopUrl: "https://giftshop-tw.line.me/voucher/322461770",
    },
  ],
  // 맑은 시원한 날 (<25°C) → 따뜻한 음료
  clear_cool: [
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
      id: "322312031",
      name: "綜合花茶禮",
      price: 505,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hvcy5N9K6KUxETDcxtn5WGxURJT13PS1ELTQ0cWBOCAkeOjxsMW8ZUwYNJzcaNxVFBCI2dRFPDCMJdAVoEyoHTxYSCxkOOhFGPi40YR4MHDcZID5_eWw",
      shopUrl: "https://giftshop-tw.line.me/shipping/322312031",
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
  // 태풍 (풍속 > 60km/h) → 집에서 즐길 디저트
  typhoon: [
    {
      id: "322060405",
      name: "狸小路 6吋十勝重乳酪蛋糕",
      price: 670,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hjuSmih5eNVpuFCYiqFJKDT1JOStdZTFSB2woZ0pRFw8_JgxqKSkRWjxUADY4YQxuOTkbWgpSFDIoJRNqMi4vWUpdAzEobAx5LSovZx1fFR8zYglQCHoGTA",
      shopUrl: "https://giftshop-tw.line.me/shipping/322060405",
    },
    {
      id: "322352357",
      name: "狸小路 起酥千層蛋糕",
      price: 530,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hqjQbHfhYLkVsGzBX2LtREj9GIjRfaipNBWMzeEheDCoyawF6IzwxVTJQIC4lKhVbOzYARQhdDy0qKgh1MCE0RkhSIANFcjlPL3weWjUbDCkTbRJPCnUdUw",
      shopUrl: "https://giftshop-tw.line.me/shipping/322352357",
    },
    {
      id: "321754157",
      name: "承繼 -18°c 焦糖起司蛋糕",
      price: 950,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hKogl5m_YFEBaFQrzvFprFwlIGDFpZBBIM20JfX5QNhUUbi1wZjskUARUGgkcZzhkDTg6QD5TNSgcJDJwBi8OQ35cGhYQZC1wGnYOTwMUGCwlYyhKPHsnVg",
      shopUrl: "https://giftshop-tw.line.me/shipping/321754157",
    },
  ],
  // 한파 (<15°C) → 따뜻한 담요/차/보양식
  cold: [
    {
      id: "321813864",
      name: "窩在家 日富一日退休午睡毯",
      price: 530,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hCag_RznUHE5aJgM7xypjGQt7ED9pVxhGM14Bc34mPRsPFA5uHRs4Kg9tEQsuFiBHGkgDdw8lOSEXHjBqDUAyTQhnFwg2XQgbZh84YwB5PgsHSgt9ZwY",
      shopUrl: "https://giftshop-tw.line.me/shipping/321813864",
    },
    {
      id: "322200050",
      name: "暖暖純手作 黑糖薑茶禮盒 12入",
      price: 359,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hzkFo8O8LJUR7FjX6XjNaEypLKTVIZyFMEm44eV8XBC8PejF3OC0WVDlUKQJSbRlNO3g6fS4VACs2LglgLHALRylLKxIXfBx0EnEBaSIUED8uejJ3RjY",
      shopUrl: "https://giftshop-tw.line.me/shipping/322200050",
    },
    {
      id: "322156138",
      name: "老協珍 熬雞精禮盒(常溫/7入)",
      price: 888,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hl6XRwIeBMxllKyOFBElMTjR2P2hWWjcRDFMuJEEqPlwzRR8pAAwDCSNuEkwwUg8QJUUsIDAoFnYoEx89Mk0dGjd2P0AgUB8mMgsCCjwpEVw4RyQqWAs",
      shopUrl: "https://giftshop-tw.line.me/shipping/322156138",
    },
  ],
  // 자외선 강한 날 (UV ≥ 8) → 양산/자외선 차단
  uv_high: [
    {
      id: "322378700",
      name: "莫蘭迪色系 抗UV遮陽折疊晴雨傘",
      price: 349,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hYTwg46u9BntKHhimzfZ5LBlDCgp5bwJzI2YbRm5bJ0hnbBJxFTE2azZYCwAPLBNlHTMoey5YJxMMLyBLFiQceG5XCC4xLz5mKyI1Vg9VJy01aDpxLHA1bQ",
      shopUrl: "https://giftshop-tw.line.me/shipping/322378700",
    },
    {
      id: "322403722",
      name: "ROLLS Eclipse 全日防禦瞬間捲收傘",
      price: 1350,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0hpDkv66HPL2tWDzAM1nRQPAVSIxplfitjP3cyVnJKDjIMZjtYCmwcaClJDy06ewNlASIBazJJDgMQPglbCjU1aHJGITILPRdbLGocRiVEGlgpeRNhMGEcfQ",
      shopUrl: "https://giftshop-tw.line.me/shipping/322403722",
    },
    {
      id: "321730009",
      name: "Estee Lauder 氣墊粉餅 SPF45",
      price: 1950,
      imageUrl: "https://lcp-prod-obs.line-scdn.net/0h8mO9oHnWZ0JyQHiL4MoYFSMdazNBMWNKGzh6f1ZAawQKcHJiTnx4eCAfawQ_dFtLMi54eydDQi0_eEtmJSZJQSADRXFaO3VhG2Z7bzQGRQcvLHBxT2A/f640w",
      shopUrl: "https://giftshop-tw.line.me/shipping/321730009",
    },
  ],
  // 미세먼지 많은 날 → 실내에서 즐길 차/음료
  dust: [
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
};

export function getConditionFromWeather(
  type: string,
  temp: number,
  humidity: number,
  pm25: number = 0,
  uv: number = 0,
  windSpeed: number = 0
): WeatherCondition {
  // 태풍 (풍속 > 60km/h) → typhoon
  if (windSpeed > 60) return "typhoon";
  // 미세먼지 많은 날 (PM2.5 > 35) → dust
  if (pm25 > 35) return "dust";
  // 비/눈/뇌우 → rain
  if (type === "Rain" || type === "Drizzle" || type === "Thunderstorm" || type === "Snow")
    return "rain";
  // 한파 (<15°C) → cold
  if (temp < 15) return "cold";
  // 자외선 강한 날 (UV ≥ 8) → uv_high
  if (uv >= 8) return "uv_high";
  // 흐림/안개 → cloudy
  if (type === "Clouds" || type === "Fog") return "cloudy";
  // 맑은데 건조 → dry
  if (type === "Clear" && humidity < 50) return "dry";
  // 맑고 더운 날 (≥25°C) → 아이스 음료
  if (temp >= 25) return "clear_hot";
  // 맑고 시원한 날 (<25°C) → 따뜻한 음료
  if (temp < 25) return "clear_cool";
  // 맑음 → clear
  return "clear";
}

export function getGiftsByCondition(condition: WeatherCondition): GiftProduct[] {
  return GIFT_MAP[condition] || GIFT_MAP.clear;
}

export function getConditionMessage(condition: WeatherCondition): string {
  const messages: Record<WeatherCondition, string> = {
    typhoon: "태풍이 오고 있어요! 집에서 맛있는 간식 어때요? 🌀",
    rain: "비 오는 날, 소중한 사람에게 우산을 선물해보세요 🌧️",
    cold: "추운 날, 따뜻한 선물로 마음을 전해보세요 🧣",
    uv_high: "자외선이 강해요! 피부를 지켜줄 선물 어때요? 🕶️",
    cloudy: "흐린 날엔 따뜻한 차 한 잔 어때요? ☁️",
    clear: "맑은 날! 시원한 음료 한 잔 선물하세요 ☀️",
    clear_hot: "더운 날! 시원한 아이스 음료 한 잔 선물하세요 🧊",
    clear_cool: "선선한 날, 따뜻한 음료 한 잔 어때요? ☕",
    dry: "건조한 날, 촉촉한 핸드크림 선물은 어떨까요? 🧴",
    dust: "미세먼지 많은 날, 실내에서 따뜻한 차 한 잔 어때요? 😷",
  };
  return messages[condition];
}
