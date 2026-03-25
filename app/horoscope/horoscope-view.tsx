"use client";

import Link from "next/link";
import { useChatStore } from "@/stores/chat-store";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SIGNS = [
  { en: "Aries", th: "เมษ", emoji: "♈", dates: "Mar 21 – Apr 19", datesTh: "21 มี.ค. – 19 เม.ย." },
  { en: "Taurus", th: "พฤษภ", emoji: "♉", dates: "Apr 20 – May 20", datesTh: "20 เม.ย. – 20 พ.ค." },
  { en: "Gemini", th: "เมถุน", emoji: "♊", dates: "May 21 – Jun 20", datesTh: "21 พ.ค. – 20 มิ.ย." },
  { en: "Cancer", th: "กรกฎ", emoji: "♋", dates: "Jun 21 – Jul 22", datesTh: "21 มิ.ย. – 22 ก.ค." },
  { en: "Leo", th: "สิงห์", emoji: "♌", dates: "Jul 23 – Aug 22", datesTh: "23 ก.ค. – 22 ส.ค." },
  { en: "Virgo", th: "กันย์", emoji: "♍", dates: "Aug 23 – Sep 22", datesTh: "23 ส.ค. – 22 ก.ย." },
  { en: "Libra", th: "ตุลย์", emoji: "♎", dates: "Sep 23 – Oct 22", datesTh: "23 ก.ย. – 22 ต.ค." },
  { en: "Scorpio", th: "พิจิก", emoji: "♏", dates: "Oct 23 – Nov 21", datesTh: "23 ต.ค. – 21 พ.ย." },
  { en: "Sagittarius", th: "ธนู", emoji: "♐", dates: "Nov 22 – Dec 21", datesTh: "22 พ.ย. – 21 ธ.ค." },
  { en: "Capricorn", th: "มกร", emoji: "♑", dates: "Dec 22 – Jan 19", datesTh: "22 ธ.ค. – 19 ม.ค." },
  { en: "Aquarius", th: "กุมภ์", emoji: "♒", dates: "Jan 20 – Feb 18", datesTh: "20 ม.ค. – 18 ก.พ." },
  { en: "Pisces", th: "มีน", emoji: "♓", dates: "Feb 19 – Mar 20", datesTh: "19 ก.พ. – 20 มี.ค." },
] as const;

export function HoroscopeView() {
  const language = useChatStore((s) => s.language);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-4xl py-12 px-4">
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent mb-3"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {language === "th" ? "ดวงรายวัน" : "Daily Horoscope"}
          </h1>
          <p className="text-muted-foreground">
            {language === "th"
              ? "เลือกราศีของคุณเพื่อดูดวงประจำวัน"
              : "Choose your zodiac sign for today's reading"}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SIGNS.map((sign) => (
            <Link
              key={sign.en}
              href={`/chat?sign=${sign.en.toLowerCase()}`}
            >
              <Card className="border-violet-500/15 hover:border-violet-500/40 transition-all hover:shadow-lg hover:shadow-violet-500/5 cursor-pointer group">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {sign.emoji}
                  </div>
                  <h2 className="font-semibold text-violet-200">
                    {language === "th" ? sign.th : sign.en}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === "th" ? sign.datesTh : sign.dates}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground mb-4">
            {language === "th"
              ? "ต้องการดวงชะตาเชิงลึก? ใส่วันเกิดของคุณเพื่อคำนวณดวงชะตาแบบเต็ม"
              : "Want a deeper reading? Enter your birth data for a full chart analysis"}
          </p>
          <Link href="/chat">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
              {language === "th" ? "ดูดวงแบบเต็ม" : "Full Chart Reading"}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
