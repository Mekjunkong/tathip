import type { Metadata } from "next";
import { BaziLanding } from "./landing";

export const metadata: Metadata = {
  title: "BaZi (八字) Four Pillars of Destiny — AI Chinese Astrology | TaThip",
  description:
    "Calculate your BaZi Four Pillars of Destiny with AI analysis. Discover your Five Elements balance, Day Master strength, and 10-year luck pillars for career, relationships, and life planning.",
  keywords: [
    "BaZi",
    "八字",
    "บาจื่อ",
    "Four Pillars of Destiny",
    "Chinese astrology",
    "โหราศาสตร์จีน",
    "Five Elements",
    "ธาตุทั้ง 5",
    "Day Master",
    "AI fortune telling",
  ],
  openGraph: {
    title: "BaZi Four Pillars — AI Chinese Astrology | TaThip",
    description:
      "Free AI-powered BaZi readings. Calculate your Four Pillars, analyze Five Elements balance, and discover your 10-year luck pillars.",
    images: [{ url: "/images/chinese-astrology.webp", width: 800, height: 800 }],
    type: "website",
    url: "https://tathip.com/bazi",
  },
  alternates: { canonical: "https://tathip.com/bazi" },
};

export default function Page() {
  return <BaziLanding />;
}
