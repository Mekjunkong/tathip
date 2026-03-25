"use client";

import Link from "next/link";
import Image from "next/image";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: string;
  title: { th: string; en: string };
  description: { th: string; en: string };
}

interface SEOLandingProps {
  heroImage: string;
  heroAlt: string;
  title: { th: string; en: string };
  subtitle: { th: string; en: string };
  description: { th: string; en: string };
  features: Feature[];
  ctaLink: string;
  faq: { q: { th: string; en: string }; a: { th: string; en: string } }[];
}

export function SEOLanding({
  heroImage,
  heroAlt,
  title,
  subtitle,
  description,
  features,
  ctaLink,
  faq,
}: SEOLandingProps) {
  const language = useChatStore((s) => s.language);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-background to-background" />
        <div className="container relative z-10 max-w-4xl text-center px-4">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-2 border-violet-500/30 shadow-lg shadow-violet-500/20">
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-violet-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {title[language]}
          </h1>
          <p className="text-lg md:text-xl text-violet-300/80 mb-3">
            {subtitle[language]}
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {description[language]}
          </p>
          <Link href={ctaLink}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-base px-8"
            >
              {t(language, "startReading")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <Card
                key={i}
                className="border-violet-500/15 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="text-lg font-semibold text-violet-200 mb-2">
                    {f.title[language]}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description[language]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (SEO-rich) */}
      <section className="py-12 md:py-16 border-t border-border/30">
        <div className="container max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-center text-violet-200 mb-8">
            {language === "th" ? "คำถามที่พบบ่อย" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-6">
            {faq.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-violet-300 mb-2">
                  {item.q[language]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.a[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 text-center">
        <Link href={ctaLink}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-base px-8"
          >
            {t(language, "startReading")}
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground mt-3">
          {language === "th"
            ? "ฟรี 5 ครั้ง/วัน — ไม่ต้องสมัครสมาชิก"
            : "5 free readings/day — no signup required"}
        </p>
      </section>
    </div>
  );
}
