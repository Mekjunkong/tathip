import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Thai, Cinzel_Decorative } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-thai",
  weight: ["300", "400", "500", "600", "700"],
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "TaThip — AI Fortune Teller",
  description:
    "The Divine Eye that sees your destiny. AI-powered fortune telling combining Thai, Western, Vedic, and Chinese astrology.",
  openGraph: {
    title: "TaThip — AI Fortune Teller",
    description:
      "The Divine Eye that sees your destiny. AI-powered fortune telling combining Thai, Western, Vedic, and Chinese astrology.",
    images: [
      {
        url: "/tathip-banner.webp",
        width: 2752,
        height: 1536,
        alt: "TATHIP — ตาทิพย์ที่มองเห็นชะตาของคุณ",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaThip — AI Fortune Teller",
    description:
      "The Divine Eye that sees your destiny. AI-powered fortune telling combining Thai, Western, Vedic, and Chinese astrology.",
    images: ["/tathip-banner.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansThai.variable} ${cinzelDecorative.variable} dark`}
    >
      <body className="min-h-screen font-sans antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
