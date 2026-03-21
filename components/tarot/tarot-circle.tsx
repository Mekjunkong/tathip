"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { t, type Language } from "@/lib/i18n";
import { FULL_DECK, type TarotCard } from "@/types/tarot";
import { TarotCardComponent } from "./tarot-card";
import { TarotReading } from "./tarot-reading";

const TOTAL_CARDS = 78;
const MAX_SELECTION = 3;
const ANGLE_STEP = 360 / TOTAL_CARDS;

/* ─── Fisher-Yates shuffle ─── */
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ─── Determine reversed (~30%) ─── */
function rollReversed(): boolean {
  return Math.random() < 0.3;
}

interface TarotCircleProps {
  language: Language;
}

export function TarotCircle({ language }: TarotCircleProps) {
  const [deck, setDeck] = useState<TarotCard[]>(() => shuffleArray([...FULL_DECK]));
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isShuffling, setIsShuffling] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [reversedMap, setReversedMap] = useState<Record<string, boolean>>({});
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
  const shuffleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ─── Shuffle handler ─── */
  const handleShuffle = useCallback(() => {
    if (isShuffling) return;
    setIsShuffling(true);
    setSelectedIds(new Set());
    setShowReading(false);
    setFlippedIds(new Set());
    setReversedMap({});

    // First randomize
    setDeck(shuffleArray([...FULL_DECK]));

    // Settle after animation
    if (shuffleTimeoutRef.current) clearTimeout(shuffleTimeoutRef.current);
    shuffleTimeoutRef.current = setTimeout(() => {
      setDeck(shuffleArray([...FULL_DECK]));
      setIsShuffling(false);
    }, 800);
  }, [isShuffling]);

  /* ─── Cut handler ─── */
  const handleCut = useCallback(() => {
    if (isShuffling) return;
    setIsShuffling(true);
    setSelectedIds(new Set());
    setShowReading(false);
    setFlippedIds(new Set());

    const cutPoint = Math.floor(Math.random() * (TOTAL_CARDS - 10)) + 5;
    setDeck((prev) => [...prev.slice(cutPoint), ...prev.slice(0, cutPoint)]);

    if (shuffleTimeoutRef.current) clearTimeout(shuffleTimeoutRef.current);
    shuffleTimeoutRef.current = setTimeout(() => {
      setIsShuffling(false);
    }, 600);
  }, [isShuffling]);

  /* ─── Card selection ─── */
  const handleCardClick = useCallback(
    (cardId: string) => {
      if (isShuffling || showReading) return;

      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(cardId)) {
          next.delete(cardId);
        } else if (next.size < MAX_SELECTION) {
          next.add(cardId);
          // Roll reversed status on selection
          setReversedMap((rm) => ({ ...rm, [cardId]: rollReversed() }));
        }
        return next;
      });
    },
    [isShuffling, showReading]
  );

  /* ─── Read fortune ─── */
  const handleReadFortune = useCallback(() => {
    if (selectedIds.size === 0) return;
    // Flip selected cards
    setFlippedIds(new Set(selectedIds));
    // Small delay before showing the reading panel
    setTimeout(() => {
      setShowReading(true);
    }, 900);
  }, [selectedIds]);

  /* ─── Reset for new reading ─── */
  const handleNewReading = useCallback(() => {
    setShowReading(false);
    setFlippedIds(new Set());
    setSelectedIds(new Set());
    setReversedMap({});
    handleShuffle();
  }, [handleShuffle]);

  /* ─── Build drawn cards for reading ─── */
  const drawnCards = useMemo(() => {
    return deck
      .filter((c) => selectedIds.has(c.id))
      .map((card) => ({
        card,
        reversed: reversedMap[card.id] ?? false,
      }));
  }, [deck, selectedIds, reversedMap]);

  const selectionCount = selectedIds.size;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Title */}
      <div className="text-center space-y-1">
        <h1
          className="text-2xl md:text-3xl font-bold text-mystical tracking-wider"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          {t(language, "tarotTitle")}
        </h1>
        <p className="text-sm text-violet-300/70">
          {t(language, "tarotSubtitle")}
        </p>
      </div>

      {/* Circle container */}
      <div
        className="relative mx-auto"
        style={
          {
            "--card-w": "clamp(36px, 6vw, 55px)",
            "--card-h": "clamp(54px, 9vw, 80px)",
            "--radius": "clamp(160px, 35vw, 300px)",
            width: "calc(var(--radius) * 2 + var(--card-w))",
            height: "calc(var(--radius) * 2 + var(--card-h))",
          } as React.CSSProperties
        }
      >
        {/* Ambient glow behind the circle */}
        <div className="absolute inset-0 rounded-full bg-violet-600/5 blur-3xl" />

        {/* Cards arranged in circle */}
        {deck.map((card, i) => {
          const angle = i * ANGLE_STEP;
          const isSelected = selectedIds.has(card.id);
          const isFlipped = flippedIds.has(card.id);

          return (
            <TarotCardComponent
              key={card.id}
              card={card}
              reversed={reversedMap[card.id] ?? false}
              isFlipped={isFlipped}
              isSelected={isSelected}
              isDisabled={
                !isSelected && selectionCount >= MAX_SELECTION && !showReading
              }
              onClick={() => handleCardClick(card.id)}
              language={language}
              style={{
                left: "50%",
                top: "50%",
                transform: `rotate(${angle}deg) translateY(calc(var(--radius) * -1)) rotate(${-angle}deg) translate(-50%, -50%)`,
                transition: isShuffling
                  ? `transform ${300 + Math.random() * 400}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
                  : "transform 0.5s ease-out, opacity 0.3s ease",
              }}
            />
          );
        })}

        {/* Center controls */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center gap-3 glass-card rounded-2xl px-5 py-4">
            {!showReading && (
              <>
                {/* Selection count */}
                {selectionCount > 0 && (
                  <div className="text-xs text-violet-300/80 text-center">
                    {t(language, "selectedCards")}{" "}
                    <span className="font-bold text-violet-200">
                      {selectionCount}
                    </span>{" "}
                    {t(language, "cardOf")}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleShuffle}
                    disabled={isShuffling}
                    className="border-violet-500/40 text-violet-200 hover:bg-violet-500/20 hover:text-violet-100 text-xs"
                  >
                    {t(language, "shuffle")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCut}
                    disabled={isShuffling}
                    className="border-violet-500/40 text-violet-200 hover:bg-violet-500/20 hover:text-violet-100 text-xs"
                  >
                    {t(language, "cutCards")}
                  </Button>
                </div>

                {selectionCount > 0 && (
                  <Button
                    size="sm"
                    onClick={handleReadFortune}
                    disabled={isShuffling}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs"
                  >
                    {t(language, "readFortune")}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reading panel */}
      {showReading && (
        <TarotReading
          cards={drawnCards}
          language={language}
          onClose={handleNewReading}
        />
      )}
    </div>
  );
}
