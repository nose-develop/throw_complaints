export type DestinationTheme =
  | "park"
  | "town"
  | "japan"
  | "island"
  | "overseas"
  | "space"
  | "mars"
  | "jupiter"
  | "neptune";

export type Destination = {
  min: number;
  max: number;
  place: string;
  level: number;
  theme: DestinationTheme;
  icon: string;
  message: string;
};

export const MAX_COMPLAINT_LENGTH = 500;

export const destinations: Destination[] = [
  {
    min: 1,
    max: 20,
    place: "近所の公園",
    level: 1,
    theme: "park",
    icon: "🌳",
    message: "ちょっとだけスッキリしたかも",
  },
  {
    min: 21,
    max: 50,
    place: "隣町",
    level: 2,
    theme: "town",
    icon: "🏘️",
    message: "ほどよく遠くへ投げました",
  },
  {
    min: 51,
    max: 100,
    place: "北海道",
    level: 3,
    theme: "japan",
    icon: "🗾",
    message: "北の大地までグチが飛びました",
  },
  {
    min: 101,
    max: 150,
    place: "沖縄",
    level: 4,
    theme: "island",
    icon: "🌺",
    message: "南の風に乗って飛んでいきました",
  },
  {
    min: 151,
    max: 200,
    place: "ハワイ",
    level: 5,
    theme: "overseas",
    icon: "🏝️",
    message: "かなり遠くまでグチが飛んでいきました",
  },
  {
    min: 201,
    max: 250,
    place: "ニューヨーク",
    level: 6,
    theme: "overseas",
    icon: "🗽",
    message: "海を越えてビルの向こうへ消えました",
  },
  {
    min: 251,
    max: 300,
    place: "月",
    level: 7,
    theme: "space",
    icon: "🌕",
    message: "そのグチ、地球を出ました",
  },
  {
    min: 301,
    max: 350,
    place: "火星",
    level: 8,
    theme: "mars",
    icon: "🔴",
    message: "赤い惑星まで届きました",
  },
  {
    min: 351,
    max: 400,
    place: "木星",
    level: 9,
    theme: "jupiter",
    icon: "🪐",
    message: "とんでもない重力圏まで飛ばしました",
  },
  {
    min: 401,
    max: 500,
    place: "海王星",
    level: 10,
    theme: "neptune",
    icon: "🔵",
    message: "もう誰にも届かないレベルまで飛ばしました",
  },
];

export function getDestinationByLength(length: number): Destination {
  return (
    destinations.find(
      (destination) => length >= destination.min && length <= destination.max,
    ) ?? destinations[destinations.length - 1]
  );
}

export function getThrowDuration(level: number): number {
  if (level <= 2) {
    return 1000;
  }

  if (level <= 4) {
    return 1300;
  }

  if (level <= 6) {
    return 1700;
  }

  if (level <= 8) {
    return 2200;
  }

  return 2800;
}
