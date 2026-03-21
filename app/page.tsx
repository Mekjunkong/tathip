"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/ui/starfield";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";
import { ZodiacIcon, TarotIcon, NumerologyIcon, BaZiIcon, DivineEyeIcon } from "@/components/icons/mystical-icons";

const FEATURES = [
  {
    Icon: ZodiacIcon,
    titleKey: "featureAstrology" as const,
    descKey: "featureAstrologyDesc" as const,
    color: "text-violet-400",
    borderHover: "hover:border-violet-500/30",
    bgHover: "hover:bg-violet-500/5",
  },
  {
    Icon: TarotIcon,
    titleKey: "featureTarot" as const,
    descKey: "featureTarotDesc" as const,
    color: "text-indigo-400",
    borderHover: "hover:border-indigo-500/30",
    bgHover: "hover:bg-indigo-500/5",
  },
  {
    Icon: NumerologyIcon,
    titleKey: "featureNumerology" as const,
    descKey: "featureNumerologyDesc" as const,
    color: "text-fuchsia-400",
    borderHover: "hover:border-fuchsia-500/30",
    bgHover: "hover:bg-fuchsia-500/5",
  },
  {
    Icon: BaZiIcon,
    titleKey: "featureBazi" as const,
    descKey: "featureBaziDesc" as const,
    color: "text-amber-400",
    borderHover: "hover:border-amber-500/30",
    bgHover: "hover:bg-amber-500/5",
  },
] as const;

export default function HomePage() {
  const language = useChatStore((s) => s.language);

  return (
    <main className="relative flex min-h-dvh flex-col items-center px-4 overflow-hidden">
      <Starfield count={80} />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85dvh] text-center max-w-3xl mx-auto">
        {/* Divine Eye hero icon */}
        <div className="relative mb-10 animate-fade-in">
          <div className="absolute inset-0 scale-150 blur-3xl bg-violet-600/10 rounded-full animate-glow-pulse" />
          <DivineEyeIcon className="relative w-28 h-28 md:w-36 md:h-36 animate-float" />
        </div>

        {/* Title */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider" style={{ fontFamily: "var(--font-cinzel), serif" }}>
            <span className="bg-gradient-to-b from-white via-violet-200 to-violet-400/80 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              {t(language, "siteName")}
            </span>
          </h1>
          <p className="text-base md:text-lg text-violet-300/60 font-light tracking-[0.25em] uppercase">
            {t(language, "tagline")}
          </p>
        </div>

        {/* Description */}
        <p
          className="mt-8 text-muted-foreground/70 text-base md:text-lg max-w-md mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          {t(language, "aiDescription")}
        </p>

        {/* CTA */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up"
          style={{ animationDelay: "600ms", animationFillMode: "both" }}
        >
          <Link href="/chat">
            <Button
              size="lg"
              className="group relative text-base px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-900/40 transition-all duration-300 hover:shadow-violet-800/60 hover:scale-[1.02] cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t(language, "startReading")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </Link>
          <Link href="/chat">
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 border-violet-500/20 text-violet-300/80 hover:bg-violet-500/10 hover:border-violet-400/30 hover:text-violet-200 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              {t(language, "tryTarot")}
            </Button>
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 animate-bounce opacity-20">
          <div className="w-5 h-8 rounded-full border border-violet-400/30 flex items-start justify-center p-1.5">
            <div className="w-0.5 h-1.5 rounded-full bg-violet-400/50" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 w-full max-w-4xl pb-24">
        <h2
          className="text-center text-xl md:text-2xl font-medium mb-12 text-violet-300/50 tracking-wide animate-fade-in-up"
          style={{ animationDelay: "800ms", animationFillMode: "both" }}
        >
          {language === "th" ? "ศาสตร์แห่งการพยากรณ์" : "The Arts of Divination"}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {FEATURES.map((feature, i) => {
            const { Icon } = feature;
            return (
              <Link key={i} href="/chat" className="group cursor-pointer">
                <div className={`relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 text-center transition-all duration-300 ${feature.borderHover} ${feature.bgHover} hover:-translate-y-1`}>
                  {/* Icon */}
                  <div className={`${feature.color} flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-12 h-12 md:w-14 md:h-14" />
                  </div>
                  {/* Text */}
                  <h3 className="font-semibold text-sm md:text-base text-foreground/80 mb-1.5 group-hover:text-foreground transition-colors">
                    {t(language, feature.titleKey)}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground/50 leading-relaxed">
                    {t(language, feature.descKey)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />
    </main>
  );
}
