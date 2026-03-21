"use client";

import type { TarotCard } from "@/types/tarot";

/* ─── Card back SVG ─── */
function CardBack() {
  return (
    <svg
      viewBox="0 0 60 90"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cardBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </radialGradient>
      </defs>
      {/* Background */}
      <rect width="60" height="90" rx="4" fill="url(#cardBg)" />
      {/* Border */}
      <rect
        x="1"
        y="1"
        width="58"
        height="88"
        rx="3"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="0.8"
        opacity="0.6"
      />
      {/* Inner border */}
      <rect
        x="4"
        y="4"
        width="52"
        height="82"
        rx="2"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="0.3"
        opacity="0.3"
      />
      {/* Pentagram star */}
      <polygon
        points="30,20 33.5,32 46,32 36,39 39.5,51 30,44 20.5,51 24,39 14,32 26.5,32"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="0.6"
        opacity="0.5"
      />
      {/* Center dot */}
      <circle cx="30" cy="36" r="1.5" fill="#a78bfa" opacity="0.3" />
      {/* Corner dots */}
      <circle cx="8" cy="8" r="1" fill="#7c3aed" opacity="0.4" />
      <circle cx="52" cy="8" r="1" fill="#7c3aed" opacity="0.4" />
      <circle cx="8" cy="82" r="1" fill="#7c3aed" opacity="0.4" />
      <circle cx="52" cy="82" r="1" fill="#7c3aed" opacity="0.4" />
      {/* TaThip text */}
      <text
        x="30"
        y="72"
        textAnchor="middle"
        fontSize="5"
        fill="#a78bfa"
        opacity="0.25"
        fontFamily="serif"
      >
        TATHIP
      </text>
    </svg>
  );
}

/* ─── Card front ─── */
function CardFront({
  card,
  reversed,
  language,
}: {
  card: TarotCard;
  reversed: boolean;
  language: "th" | "en";
}) {
  const isThaiLang = language === "th";
  const name = isThaiLang ? card.nameThai : card.name;
  const meaning = reversed
    ? isThaiLang
      ? card.meaningReversedThai
      : card.meaningReversed
    : isThaiLang
      ? card.meaningUprightThai
      : card.meaningUpright;

  const suitSymbol: Record<string, string> = {
    wands: "\u2660",
    cups: "\u2665",
    swords: "\u2666",
    pentacles: "\u2663",
  };

  return (
    <div className="w-full h-full rounded-[4px] bg-gradient-to-b from-indigo-950 via-violet-950 to-indigo-950 border border-violet-500/50 flex flex-col items-center justify-between p-1.5 overflow-hidden">
      {/* Arcana badge */}
      <div className="text-[6px] text-violet-300/70 uppercase tracking-widest">
        {card.arcana === "major" ? "Major" : card.suit}
      </div>

      {/* Symbol */}
      <div className="text-lg leading-none text-violet-300">
        {card.arcana === "major" ? (
          <span className="text-xl">&#x2726;</span>
        ) : (
          <span>{suitSymbol[card.suit!] ?? "\u2726"}</span>
        )}
      </div>

      {/* Name */}
      <div className="text-[7px] font-medium text-center leading-tight text-violet-100 line-clamp-2 px-0.5">
        {name}
      </div>

      {/* Direction */}
      <div
        className={`text-[5px] font-semibold uppercase tracking-wide ${reversed ? "text-red-400" : "text-emerald-400"}`}
      >
        {reversed ? (isThaiLang ? "คว่ำ" : "Rev") : isThaiLang ? "หงาย" : "Up"}
      </div>

      {/* Meaning preview */}
      <div className="text-[5px] text-violet-300/60 text-center leading-tight line-clamp-2 px-0.5">
        {meaning.split(",").slice(0, 2).join(",")}
      </div>
    </div>
  );
}

/* ─── Main TarotCard component with flip ─── */
interface TarotCardProps {
  card: TarotCard;
  reversed: boolean;
  isFlipped: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
  language: "th" | "en";
}

export function TarotCardComponent({
  card,
  reversed,
  isFlipped,
  isSelected,
  isDisabled,
  onClick,
  style,
  className = "",
  language,
}: TarotCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`absolute cursor-pointer transition-all duration-500 ease-out origin-center
        ${isSelected ? "z-20" : "z-10"}
        ${isDisabled && !isSelected ? "opacity-40 cursor-not-allowed" : ""}
        ${className}
      `}
      style={{
        width: "var(--card-w)",
        height: "var(--card-h)",
        ...style,
      }}
    >
      {/* Glow effect for selected */}
      {isSelected && (
        <div className="absolute -inset-1 rounded-lg bg-violet-500/30 blur-md animate-pulse-ring" />
      )}

      {/* Card container with 3D flip */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Back face */}
        <div
          className={`absolute inset-0 rounded-[4px] overflow-hidden transition-all duration-300
            ${isSelected ? "ring-2 ring-violet-400 shadow-lg shadow-violet-500/40 -translate-y-3" : ""}
            ${!isDisabled && !isSelected ? "hover:-translate-y-1 hover:shadow-md hover:shadow-violet-500/20" : ""}
          `}
          style={{ backfaceVisibility: "hidden" }}
        >
          <CardBack />
        </div>

        {/* Front face */}
        <div
          className="absolute inset-0 rounded-[4px] overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardFront card={card} reversed={reversed} language={language} />
        </div>
      </div>
    </button>
  );
}
