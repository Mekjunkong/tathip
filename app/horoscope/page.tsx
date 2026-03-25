import type { Metadata } from "next";
import { HoroscopeView } from "./horoscope-view";

export const metadata: Metadata = {
  title: "Daily Horoscope — Thai & Western Zodiac Predictions | TaThip",
  description:
    "Free daily horoscope for all 12 zodiac signs. AI-powered predictions combining Thai sidereal and Western tropical astrology for love, career, health, and lucky numbers.",
  keywords: [
    "daily horoscope",
    "ดวงรายวัน",
    "zodiac",
    "ราศี",
    "Thai horoscope",
    "ดวงชะตาประจำวัน",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ],
  openGraph: {
    title: "Free Daily Horoscope — All 12 Signs | TaThip",
    description:
      "AI-powered daily horoscope combining Thai and Western astrology. Free predictions for love, career, health, and lucky numbers.",
    images: [{ url: "/images/thai-astrology.webp", width: 800, height: 800 }],
    type: "website",
    url: "https://tathip.com/horoscope",
  },
  alternates: { canonical: "https://tathip.com/horoscope" },
};

export default function Page() {
  return <HoroscopeView />;
}
