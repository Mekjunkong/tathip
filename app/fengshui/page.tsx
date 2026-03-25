import type { Metadata } from "next";
import { FengShuiLanding } from "./landing";

export const metadata: Metadata = {
  title: "Feng Shui Calculator — Kua Number & Lucky Directions | TaThip",
  description:
    "Calculate your Feng Shui Kua number and discover your auspicious directions for home, office, and bedroom layout. AI-powered Eight Mansions analysis for wealth, health, relationships, and career.",
  keywords: [
    "Feng Shui",
    "ฮวงจุ้ย",
    "Kua number",
    "เลขกว้า",
    "lucky directions",
    "ทิศมงคล",
    "Eight Mansions",
    "home layout",
    "office Feng Shui",
    "bedroom direction",
    "AI Feng Shui",
  ],
  openGraph: {
    title: "Feng Shui Kua Number Calculator — AI Analysis | TaThip",
    description:
      "Free AI Feng Shui analysis. Calculate your Kua number and find your best directions for wealth, health, and relationships.",
    images: [{ url: "/images/chinese-astrology.webp", width: 800, height: 800 }],
    type: "website",
    url: "https://tathip.com/fengshui",
  },
  alternates: { canonical: "https://tathip.com/fengshui" },
};

export default function Page() {
  return <FengShuiLanding />;
}
