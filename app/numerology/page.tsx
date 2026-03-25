import type { Metadata } from "next";
import { NumerologyLanding } from "./landing";

export const metadata: Metadata = {
  title: "Numerology Calculator — Life Path & Name Analysis | TaThip",
  description:
    "Calculate your life path number, destiny number, and personal year with AI-powered numerology. Analyze phone numbers, license plates, and lucky numbers using Pythagorean and Thai เลขศาสตร์ systems.",
  keywords: [
    "numerology",
    "เลขศาสตร์",
    "life path number",
    "เลขชีวิต",
    "phone number analysis",
    "เบอร์มงคล",
    "license plate",
    "ทะเบียนรถ",
    "AI numerology",
    "lucky numbers",
  ],
  openGraph: {
    title: "Numerology Calculator — AI Life Path Analysis | TaThip",
    description:
      "Free AI numerology readings. Calculate life path, destiny, and personal year numbers. Analyze phone numbers and license plates for luck.",
    images: [{ url: "/images/numerology.webp", width: 800, height: 800 }],
    type: "website",
    url: "https://tathip.com/numerology",
  },
  alternates: { canonical: "https://tathip.com/numerology" },
};

export default function Page() {
  return <NumerologyLanding />;
}
