export type Planet =
  | "sun"
  | "moon"
  | "mars"
  | "mercury"
  | "jupiter"
  | "venus"
  | "saturn"
  | "rahu"
  | "ketu";

export interface PlanetPosition {
  planet: Planet;
  longitude: number;
  sign: number;
  signName: string;
  signNameThai: string;
  degree: number;
  house: number;
  retrograde: boolean;
}

export interface HouseData {
  house: number;
  sign: number;
  signName: string;
  signNameThai: string;
  degree: number;
}

export interface BirthChart {
  ascendant: number;
  ascendantSign: number;
  ascendantSignName: string;
  ascendantSignNameThai: string;
  planets: PlanetPosition[];
  houses: HouseData[];
  birthData: {
    date: string;
    time: string;
    place: string;
    lat: number;
    lng: number;
    timezone: string;
  };
  system: "thai" | "western" | "vedic";
}

export const ZODIAC_SIGNS = [
  { en: "Aries", th: "เมษ" },
  { en: "Taurus", th: "พฤษภ" },
  { en: "Gemini", th: "เมถุน" },
  { en: "Cancer", th: "กรกฎ" },
  { en: "Leo", th: "สิงห์" },
  { en: "Virgo", th: "กันย์" },
  { en: "Libra", th: "ตุลย์" },
  { en: "Scorpio", th: "พิจิก" },
  { en: "Sagittarius", th: "ธนู" },
  { en: "Capricorn", th: "มกร" },
  { en: "Aquarius", th: "กุมภ์" },
  { en: "Pisces", th: "มีน" },
] as const;

export const PLANET_NAMES: Record<Planet, { en: string; th: string }> = {
  sun: { en: "Sun", th: "อาทิตย์" },
  moon: { en: "Moon", th: "จันทร์" },
  mars: { en: "Mars", th: "อังคาร" },
  mercury: { en: "Mercury", th: "พุธ" },
  jupiter: { en: "Jupiter", th: "พฤหัสบดี" },
  venus: { en: "Venus", th: "ศุกร์" },
  saturn: { en: "Saturn", th: "เสาร์" },
  rahu: { en: "Rahu", th: "ราหู" },
  ketu: { en: "Ketu", th: "เกตุ" },
};
