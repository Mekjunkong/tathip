"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { t, type Language } from "@/lib/i18n";
import type { TarotCard } from "@/types/tarot";

interface DrawnCardInfo {
  card: TarotCard;
  reversed: boolean;
}

interface TarotReadingProps {
  cards: DrawnCardInfo[];
  language: Language;
  onClose: () => void;
}

export function TarotReading({ cards, language, onClose }: TarotReadingProps) {
  const router = useRouter();

  function handleAskTathip() {
    // Build a query string with card info for the chat
    const cardSummary = cards
      .map((c) => {
        const dir = c.reversed ? "Reversed" : "Upright";
        return `${c.card.name} (${c.card.nameThai}) - ${dir}`;
      })
      .join("; ");

    const query = encodeURIComponent(
      `I drew these tarot cards: ${cardSummary}. Please interpret them for me.`
    );
    router.push(`/chat?tarot=${query}`);
  }

  return (
    <div className="animate-fade-in-up">
      <div className="glass-card rounded-2xl p-6 max-w-lg mx-auto space-y-5">
        <h3 className="text-lg font-semibold text-center text-mystical">
          {t(language, "readFortune")}
        </h3>

        <div className="space-y-4">
          {cards.map((drawn) => {
            const isThaiLang = language === "th";
            const name = isThaiLang ? drawn.card.nameThai : drawn.card.name;
            const meaning = drawn.reversed
              ? isThaiLang
                ? drawn.card.meaningReversedThai
                : drawn.card.meaningReversed
              : isThaiLang
                ? drawn.card.meaningUprightThai
                : drawn.card.meaningUpright;

            return (
              <div
                key={drawn.card.id}
                className="rounded-xl border border-violet-500/30 bg-violet-950/30 p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-violet-200">{name}</h4>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      drawn.reversed
                        ? "bg-red-500/20 text-red-300"
                        : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    {drawn.reversed
                      ? t(language, "reversedMeaning")
                      : t(language, "uprightMeaning")}
                  </span>
                </div>

                {/* Show both names */}
                <p className="text-xs text-violet-400">
                  {isThaiLang ? drawn.card.name : drawn.card.nameThai}
                </p>

                <p className="text-sm text-violet-200/80 leading-relaxed">
                  {meaning}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {drawn.card.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300/70"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button
            onClick={handleAskTathip}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
          >
            {t(language, "askTathip")}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-violet-300 hover:text-violet-100"
          >
            {t(language, "shuffle")}
          </Button>
        </div>
      </div>
    </div>
  );
}
