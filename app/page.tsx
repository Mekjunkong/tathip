"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/ui/starfield";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";

const FEATURES = [
  {
    icon: "\u2728", // sparkles
    titleKey: "featureAstrology" as const,
    descKey: "featureAstrologyDesc" as const,
  },
  {
    icon: "\u{1F0CF}", // joker card
    titleKey: "featureTarot" as const,
    descKey: "featureTarotDesc" as const,
  },
  {
    icon: "\u{1F522}", // input numbers
    titleKey: "featureNumerology" as const,
    descKey: "featureNumerologyDesc" as const,
  },
  {
    icon: "\u262F\uFE0F", // yin yang
    titleKey: "featureBazi" as const,
    descKey: "featureBaziDesc" as const,
  },
] as const;

export default function HomePage() {
  const language = useChatStore((s) => s.language);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
      <Starfield count={100} />

      {/* Hero Section */}
      <div className="relative z-10 text-center space-y-8 max-w-3xl animate-fade-in">
        {/* Mystical orb icon */}
        <div className="relative inline-block">
          <div className="text-7xl md:text-8xl animate-float" role="img" aria-label="Crystal ball">
            &#128302;
          </div>
          <div
            className="absolute inset-0 animate-glow-pulse"
            style={{
              background: "radial-gradient(circle, oklch(0.6 0.2 280 / 0.4), transparent 60%)",
              filter: "blur(20px)",
            }}
          />
        </div>

        {/* Title */}
        <div className="space-y-3 animate-fade-in-up delay-200" style={{ animationFillMode: "both" }}>
          <h1 className="text-5xl md:text-7xl font-bold text-mystical tracking-tight">
            {t(language, "siteName")}
          </h1>
          <p className="text-lg md:text-xl text-purple-300/80 font-light tracking-wide">
            {t(language, "tagline")}
          </p>
        </div>

        {/* Description */}
        <p
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-400"
          style={{ animationFillMode: "both" }}
        >
          {t(language, "aiDescription")}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-2 animate-fade-in-up delay-500"
          style={{ animationFillMode: "both" }}
        >
          <Link href="/chat">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all hover:shadow-purple-900/50 hover:scale-[1.02] cursor-pointer"
            >
              {t(language, "startReading")}
            </Button>
          </Link>
          <Link href="/chat">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              {t(language, "tryTarot")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mt-20 mb-12 w-full animate-slide-up delay-700"
        style={{ animationFillMode: "both" }}
      >
        {FEATURES.map((feature, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-5 text-center hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.03] group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-sm md:text-base text-foreground/90 mb-1">
              {t(language, feature.titleKey)}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t(language, feature.descKey)}
            </p>
          </div>
        ))}
      </div>

      {/* Subtle bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />
    </main>
  );
}
