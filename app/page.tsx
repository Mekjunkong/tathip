"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/ui/starfield";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";
import { Sparkles, Layers, Hash, Moon, ArrowRight, Eye } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    titleKey: "featureAstrology" as const,
    descKey: "featureAstrologyDesc" as const,
    gradient: "from-violet-500 to-purple-600",
    glow: "violet",
  },
  {
    icon: Layers,
    titleKey: "featureTarot" as const,
    descKey: "featureTarotDesc" as const,
    gradient: "from-indigo-500 to-blue-600",
    glow: "indigo",
  },
  {
    icon: Hash,
    titleKey: "featureNumerology" as const,
    descKey: "featureNumerologyDesc" as const,
    gradient: "from-fuchsia-500 to-pink-600",
    glow: "fuchsia",
  },
  {
    icon: Moon,
    titleKey: "featureBazi" as const,
    descKey: "featureBaziDesc" as const,
    gradient: "from-amber-500 to-orange-600",
    glow: "amber",
  },
] as const;

export default function HomePage() {
  const language = useChatStore((s) => s.language);

  return (
    <main className="relative flex min-h-dvh flex-col items-center px-4 overflow-hidden">
      <Starfield count={80} />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85dvh] text-center max-w-3xl mx-auto">
        {/* Mystical eye icon */}
        <div className="relative mb-8 animate-fade-in">
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/20 blur-2xl animate-glow-pulse" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-violet-900/40 to-indigo-900/40 backdrop-blur-sm border border-violet-500/20" />
            <Eye className="relative w-10 h-10 md:w-14 md:h-14 text-violet-300 animate-float" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-b from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
              {t(language, "siteName")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-violet-300/70 font-light tracking-widest uppercase">
            {t(language, "tagline")}
          </p>
        </div>

        {/* Description */}
        <p
          className="mt-6 text-muted-foreground/80 text-base md:text-lg max-w-lg mx-auto leading-relaxed animate-fade-in-up"
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
              className="text-base px-8 py-6 border-violet-500/25 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400/40 hover:text-violet-200 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              {t(language, "tryTarot")}
            </Button>
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 animate-bounce opacity-30">
          <div className="w-5 h-8 rounded-full border-2 border-violet-400/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-violet-400/60" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-5xl pb-20">
        <h2
          className="text-center text-2xl md:text-3xl font-semibold mb-12 bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent animate-fade-in-up"
          style={{ animationDelay: "800ms", animationFillMode: "both" }}
        >
          {language === "th" ? "ศาสตร์ที่ครอบคลุม" : "Comprehensive Systems"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Link
                key={i}
                href="/chat"
                className="group cursor-pointer"
                style={{ animationDelay: `${900 + i * 100}ms`, animationFillMode: "both" }}
              >
                <div className="relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-violet-900/20 hover:-translate-y-1 overflow-hidden">
                  {/* Subtle glow on hover */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <h3 className="font-semibold text-base text-foreground/90 mb-2 group-hover:text-white transition-colors">
                    {t(language, feature.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">
                    {t(language, feature.descKey)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />
    </main>
  );
}
