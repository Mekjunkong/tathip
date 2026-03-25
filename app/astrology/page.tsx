import type { Metadata } from "next";
import { AstrologyLanding } from "./landing";

export const metadata: Metadata = {
  title: "Thai Astrology Birth Chart — AI-Powered Sidereal Readings | TaThip",
  description:
    "Get your Thai astrology birth chart calculated with Lahiri ayanamsa. AI analyzes your planetary positions, nakshatras, and dashas for personalized predictions about love, career, and life path.",
  keywords: [
    "Thai astrology",
    "โหราศาสตร์ไทย",
    "birth chart",
    "ดวงชะตา",
    "Lahiri ayanamsa",
    "sidereal astrology",
    "planetary positions",
    "nakshatra",
    "AI fortune telling",
  ],
  openGraph: {
    title: "Thai Astrology Birth Chart — AI Fortune Teller | TaThip",
    description:
      "Free AI-powered Thai astrology readings with sidereal birth chart calculation. Discover what the stars reveal about your destiny.",
    images: [{ url: "/images/thai-astrology.webp", width: 800, height: 800 }],
    type: "website",
    url: "https://tathip.com/astrology",
  },
  alternates: { canonical: "https://tathip.com/astrology" },
};

export default function Page() {
  return <AstrologyLanding />;
}
