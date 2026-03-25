import type { Metadata } from "next";
import { TarotView } from "./tarot-view";

export const metadata: Metadata = {
  title: "Tarot Card Reading — Free AI Tarot Spread | TaThip",
  description:
    "Draw tarot cards and get AI-powered interpretations. Full 78-card Rider-Waite deck with Past-Present-Future, Celtic Cross, and single card spreads. Free daily readings.",
  keywords: [
    "tarot reading",
    "ดูไพ่ทาโรต์",
    "tarot cards",
    "Rider-Waite",
    "tarot spread",
    "AI tarot",
    "free tarot",
    "ไพ่ทาโรต์ฟรี",
    "Celtic Cross",
    "Past Present Future",
  ],
  openGraph: {
    title: "Free AI Tarot Reading — TaThip",
    description:
      "Draw tarot cards from a full 78-card Rider-Waite deck and get AI-powered interpretations. Free daily readings.",
    images: [{ url: "/images/tarot.webp", width: 800, height: 800 }],
    type: "website",
    url: "https://tathip.com/tarot",
  },
  alternates: { canonical: "https://tathip.com/tarot" },
};

export default function Page() {
  return <TarotView />;
}
