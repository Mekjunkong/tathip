"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { t, type Language } from "@/lib/i18n";
import { FULL_DECK, type TarotCard } from "@/types/tarot";
import { TarotReading } from "./tarot-reading";

const MAX_PICK = 3;
const FAN_COUNT = 15; // Number of cards fanned out on the table

/* ─── Fisher-Yates shuffle ─── */
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ─── Card back SVG (small, for fan) ─── */
function CardBack() {
  return (
    <svg viewBox="0 0 60 90" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cbg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </radialGradient>
      </defs>
      <rect width="60" height="90" rx="4" fill="url(#cbg)" />
      <rect x="1" y="1" width="58" height="88" rx="3" fill="none" stroke="#7c3aed" strokeWidth="0.8" opacity="0.6" />
      <rect x="4" y="4" width="52" height="82" rx="2" fill="none" stroke="#7c3aed" strokeWidth="0.3" opacity="0.3" />
      <polygon
        points="30,20 33.5,32 46,32 36,39 39.5,51 30,44 20.5,51 24,39 14,32 26.5,32"
        fill="none" stroke="#a78bfa" strokeWidth="0.6" opacity="0.5"
      />
      <circle cx="30" cy="36" r="1.5" fill="#a78bfa" opacity="0.3" />
      <circle cx="8" cy="8" r="1" fill="#7c3aed" opacity="0.4" />
      <circle cx="52" cy="8" r="1" fill="#7c3aed" opacity="0.4" />
      <circle cx="8" cy="82" r="1" fill="#7c3aed" opacity="0.4" />
      <circle cx="52" cy="82" r="1" fill="#7c3aed" opacity="0.4" />
      <text x="30" y="72" textAnchor="middle" fontSize="5" fill="#a78bfa" opacity="0.25" fontFamily="serif">
        TATHIP
      </text>
    </svg>
  );
}

/* ─── Card front with real Rider-Waite image ─── */
function CardFrontLarge({
  card,
  reversed,
  language,
}: {
  card: TarotCard;
  reversed: boolean;
  language: "th" | "en";
}) {
  const isTh = language === "th";
  const name = isTh ? card.nameThai : card.name;
  const imgSrc = `/tarot/${card.id}.jpg`;

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-violet-500/50 bg-indigo-950">
      {/* Real tarot card image */}
      <img
        src={imgSrc}
        alt={card.name}
        className={`w-full h-full object-cover ${reversed ? "rotate-180" : ""}`}
        loading="lazy"
      />

      {/* Bottom overlay with card name */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-2 py-2">
        <p className="text-[10px] font-semibold text-white text-center leading-tight truncate">
          {name}
        </p>
        <p className={`text-[8px] text-center mt-0.5 font-medium ${reversed ? "text-red-400" : "text-emerald-400"}`}>
          {reversed ? (isTh ? "ไพ่คว่ำ" : "Reversed") : (isTh ? "ไพ่หงาย" : "Upright")}
        </p>
      </div>
    </div>
  );
}

const POSITION_LABELS = ["past", "present", "future"] as const;

interface TarotSpreadProps {
  language: Language;
}

type Phase = "fan" | "picked" | "reading";

export function TarotSpread({ language }: TarotSpreadProps) {
  const [deck, setDeck] = useState<TarotCard[]>(() => shuffleArray([...FULL_DECK]));
  const [phase, setPhase] = useState<Phase>("fan");
  const [pickedIndices, setPickedIndices] = useState<number[]>([]); // indices into fan cards
  const [reversedMap, setReversedMap] = useState<Record<number, boolean>>({});
  const [flippedSlots, setFlippedSlots] = useState<Set<number>>(new Set());
  const [isShuffling, setIsShuffling] = useState(false);
  const [showReading, setShowReading] = useState(false);

  const fanCards = deck.slice(0, FAN_COUNT);

  /* ─── Pick a card from the fan ─── */
  const handlePickCard = useCallback(
    (fanIndex: number) => {
      if (phase !== "fan" || pickedIndices.includes(fanIndex) || pickedIndices.length >= MAX_PICK) return;

      const newPicked = [...pickedIndices, fanIndex];
      setReversedMap((prev) => ({ ...prev, [fanIndex]: Math.random() < 0.3 }));
      setPickedIndices(newPicked);

      // Automatically transition to picked phase when 3 cards selected
      if (newPicked.length >= MAX_PICK) {
        setTimeout(() => setPhase("picked"), 600);
      }
    },
    [phase, pickedIndices]
  );

  /* ─── Flip a picked card ─── */
  const handleFlipCard = useCallback(
    (slotIndex: number) => {
      if (flippedSlots.has(slotIndex)) return;
      setFlippedSlots((prev) => {
        const next = new Set(prev);
        next.add(slotIndex);
        if (next.size === MAX_PICK) {
          setTimeout(() => setShowReading(true), 800);
        }
        return next;
      });
    },
    [flippedSlots]
  );

  /* ─── Shuffle / reset ─── */
  const handleShuffle = useCallback(() => {
    setIsShuffling(true);
    setPickedIndices([]);
    setFlippedSlots(new Set());
    setReversedMap({});
    setShowReading(false);
    setPhase("fan");

    setTimeout(() => {
      setDeck(shuffleArray([...FULL_DECK]));
      setIsShuffling(false);
    }, 800);
  }, []);

  /* ─── New reading ─── */
  const handleNewReading = useCallback(() => {
    setShowReading(false);
    setPickedIndices([]);
    setFlippedSlots(new Set());
    setReversedMap({});
    setPhase("fan");
    setDeck(shuffleArray([...FULL_DECK]));
  }, []);

  /* ─── Build drawn cards for reading ─── */
  const drawnCards = pickedIndices.map((fi) => ({
    card: fanCards[fi],
    reversed: reversedMap[fi] ?? false,
  }));

  const positionLabels = POSITION_LABELS.map((p) => t(language, p));

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1
          className="text-2xl md:text-3xl font-bold text-mystical tracking-wider"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          {t(language, "tarotTitle")}
        </h1>
        <p className="text-sm text-violet-300/70">
          {phase === "fan"
            ? language === "th"
              ? `เลือกไพ่ ${MAX_PICK} ใบจากกองไพ่ (เลือกแล้ว ${pickedIndices.length}/${MAX_PICK})`
              : `Pick ${MAX_PICK} cards from the spread (${pickedIndices.length}/${MAX_PICK} selected)`
            : t(language, "tarotSubtitle")}
        </p>
      </div>

      {/* ══════════════════════════════════════════
          PHASE: FAN — Cards spread on the table
      ══════════════════════════════════════════ */}
      {phase === "fan" && (
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Fan of cards in an arc */}
          <div
            className="relative mx-auto"
            style={{
              width: "min(90vw, 700px)",
              height: "clamp(200px, 35vw, 320px)",
            }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

            {fanCards.map((card, i) => {
              const isPicked = pickedIndices.includes(i);
              const isDisabled = !isPicked && pickedIndices.length >= MAX_PICK;

              // Arc math: spread cards in a semi-arc
              const totalAngle = 70; // total arc degrees
              const startAngle = -totalAngle / 2;
              const angleStep = totalAngle / (FAN_COUNT - 1);
              const angle = startAngle + i * angleStep;
              const radian = (angle * Math.PI) / 180;

              // Arc center below the fan
              const arcRadius = 400;
              const centerX = 50; // percentage
              const centerY = 120; // percentage (below the container)

              const x = centerX + Math.sin(radian) * 38; // 38% spread
              const y = centerY - Math.cos(radian) * 50 - 50; // lift up

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handlePickCard(i)}
                  disabled={isDisabled || isShuffling}
                  className={`absolute transition-all duration-500 ease-out origin-bottom
                    ${isPicked
                      ? "z-30 -translate-y-8 scale-110"
                      : isDisabled
                        ? "opacity-30 cursor-not-allowed z-10"
                        : "z-10 hover:-translate-y-4 hover:scale-105 cursor-pointer"
                    }
                    ${isShuffling ? "animate-shuffle-card" : ""}
                  `}
                  style={{
                    width: "clamp(48px, 8vw, 70px)",
                    height: "clamp(72px, 12vw, 105px)",
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)${isPicked ? " translateY(-32px) scale(1.1)" : ""}`,
                    animationDelay: isShuffling ? `${i * 0.03}s` : undefined,
                  }}
                >
                  {/* Selection glow */}
                  {isPicked && (
                    <div className="absolute -inset-1 rounded-lg bg-violet-400/40 blur-md animate-pulse-ring" />
                  )}

                  {/* Pick number badge */}
                  {isPicked && (
                    <div className="absolute -top-3 -right-1 z-40 w-5 h-5 rounded-full bg-violet-500 border border-violet-300 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">
                        {pickedIndices.indexOf(i) + 1}
                      </span>
                    </div>
                  )}

                  <div className="w-full h-full rounded shadow-lg shadow-violet-900/30">
                    <CardBack />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Shuffle button */}
          <Button
            variant="outline"
            onClick={handleShuffle}
            disabled={isShuffling}
            className="border-violet-500/40 text-violet-200 hover:bg-violet-500/20 hover:text-violet-100"
          >
            {t(language, "shuffle")}
          </Button>
        </div>
      )}

      {/* ══════════════════════════════════════════
          PHASE: PICKED — 3 cards laid out to flip
      ══════════════════════════════════════════ */}
      {phase === "picked" && !showReading && (
        <div className="w-full">
          <div className="flex justify-center gap-5 md:gap-10">
            {drawnCards.map((drawn, i) => {
              const isFlipped = flippedSlots.has(i);

              return (
                <div key={drawn.card.id} className="flex flex-col items-center gap-3">
                  {/* Position label */}
                  <span className="text-xs text-violet-400/60 uppercase tracking-widest font-medium">
                    {positionLabels[i]}
                  </span>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => handleFlipCard(i)}
                    disabled={isFlipped}
                    className={`relative transition-all duration-500 ${
                      isFlipped
                        ? "cursor-default"
                        : "cursor-pointer hover:scale-[1.03] hover:-translate-y-2"
                    }`}
                    style={{
                      width: "clamp(90px, 22vw, 130px)",
                      height: "clamp(135px, 33vw, 195px)",
                      perspective: "600px",
                    }}
                  >
                    {/* Card with 3D flip */}
                    <div
                      className="relative w-full h-full transition-transform duration-700 ease-out animate-deal-in"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      {/* Back */}
                      <div
                        className="absolute inset-0 rounded-lg overflow-hidden shadow-xl shadow-violet-900/30"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <CardBack />
                        <div className="absolute inset-0 flex items-end justify-center pb-3">
                          <span className="text-[9px] text-violet-300/40 animate-pulse">
                            {t(language, "tapToReveal")}
                          </span>
                        </div>
                      </div>

                      {/* Front */}
                      <div
                        className="absolute inset-0 rounded-lg overflow-hidden shadow-xl shadow-violet-900/50"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <CardFrontLarge
                          card={drawn.card}
                          reversed={drawn.reversed}
                          language={language as "th" | "en"}
                        />
                      </div>
                    </div>

                    {/* Glow ring when flipped */}
                    {isFlipped && (
                      <div className="absolute -inset-1 rounded-xl bg-violet-500/20 blur-sm animate-pulse-ring pointer-events-none" />
                    )}
                  </button>

                  {/* Card name (after flip) */}
                  {isFlipped && (
                    <div className="text-center animate-fade-in">
                      <p className="text-xs font-medium text-violet-200 line-clamp-1">
                        {language === "th" ? drawn.card.nameThai : drawn.card.name}
                      </p>
                      <p className={`text-[10px] mt-0.5 ${drawn.reversed ? "text-red-400/70" : "text-emerald-400/70"}`}>
                        {drawn.reversed ? t(language, "reversedMeaning") : t(language, "uprightMeaning")}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-3 mt-8">
            {flippedSlots.size < MAX_PICK && (
              <Button
                variant="outline"
                onClick={() => {
                  setFlippedSlots(new Set(Array.from({ length: MAX_PICK }, (_, i) => i)));
                  setTimeout(() => setShowReading(true), 800);
                }}
                className="border-violet-500/40 text-violet-200 hover:bg-violet-500/20"
              >
                {t(language, "revealAll")}
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={handleNewReading}
              className="text-violet-400/60 hover:text-violet-300"
            >
              {t(language, "newReading2")}
            </Button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          Reading panel
      ══════════════════════════════════════════ */}
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
