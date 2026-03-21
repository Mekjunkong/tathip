/** Custom SVG icons with mystical fortune-telling visual language */

interface IconProps {
  className?: string;
}

/** Zodiac wheel with 12 segments and star center */
export function ZodiacIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* 12 zodiac marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = 32 + 22 * Math.cos(angle);
        const y1 = 32 + 22 * Math.sin(angle);
        const x2 = 32 + 28 * Math.cos(angle);
        const y2 = 32 + 28 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" opacity="0.5" />;
      })}
      {/* Center star */}
      <path d="M32 20l2.5 7.5H42l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" fill="currentColor" opacity="0.9" />
      {/* Inner glow dots */}
      <circle cx="32" cy="14" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="32" cy="50" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="14" cy="32" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="50" cy="32" r="1.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/** Tarot card with mystical eye */
export function TarotIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Card shape */}
      <rect x="14" y="6" width="36" height="52" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* Inner border */}
      <rect x="18" y="10" width="28" height="44" rx="2" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      {/* All-seeing eye */}
      <path d="M22 32c0 0 4.5-8 10-8s10 8 10 8-4.5 8-10 8-10-8-10-8z" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <circle cx="32" cy="32" r="3.5" fill="currentColor" opacity="0.7" />
      <circle cx="32" cy="32" r="1.5" fill="currentColor" opacity="1" />
      {/* Rays above eye */}
      <line x1="32" y1="20" x2="32" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="26" y1="21" x2="24" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="38" y1="21" x2="40" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Stars on card */}
      <circle cx="20" cy="13" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="44" cy="13" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="20" cy="51" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="44" cy="51" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/** Numerology - sacred geometry number pattern */
export function NumerologyIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Triangle */}
      <path d="M32 10L52 48H12z" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* Inner circle */}
      <circle cx="32" cy="34" r="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Number 9 in center (sacred number) */}
      <text x="32" y="39" textAnchor="middle" fill="currentColor" fontSize="18" fontWeight="300" opacity="0.9" fontFamily="serif">
        9
      </text>
      {/* Small dots at triangle vertices */}
      <circle cx="32" cy="10" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="52" cy="48" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="48" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/** BaZi - Yin Yang with five elements */
export function BaZiIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      {/* Yin Yang S-curve */}
      <path
        d="M32 6a26 26 0 0 1 0 52a13 13 0 0 1 0-26a13 13 0 0 0 0-26z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M32 6a26 26 0 0 0 0 52a13 13 0 0 0 0-26a13 13 0 0 1 0-26z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Dots */}
      <circle cx="32" cy="19" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="32" cy="45" r="3" fill="currentColor" opacity="0.85" />
      {/* Five element markers around the edge */}
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const angle = (deg - 90) * (Math.PI / 180);
        const x = 32 + 30 * Math.cos(angle);
        const y = 32 + 30 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="1.5" fill="currentColor" opacity="0.5" />;
      })}
    </svg>
  );
}

/** Hamsa hand with evil eye inside Star of David — main hero icon */
export function DivineEyeIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 120 140" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hamsaGrad" x1="20" y1="10" x2="100" y2="130">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="40%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <radialGradient id="eyeCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="60%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </radialGradient>
        <radialGradient id="irisGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hamsa hand shape */}
      <path
        d="M60 8 C60 8 52 8 52 20 L52 42 C48 38 40 28 36 20 C36 8 28 8 28 8 C28 8 20 8 20 20 L20 55 C20 55 20 62 24 70 L24 70 C28 80 36 92 38 98 C40 104 44 112 60 118 C76 112 80 104 82 98 C84 92 92 80 96 70 L96 70 C100 62 100 55 100 55 L100 20 C100 8 92 8 92 8 C92 8 84 8 84 20 C80 28 72 38 68 42 L68 20 C68 8 60 8 60 8 Z"
        stroke="url(#hamsaGrad)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />

      {/* Inner decorative border following hand shape */}
      <path
        d="M60 16 C60 16 56 16 56 24 L56 48 C52 44 46 36 42 28 C42 20 38 16 34 16 C30 16 26 16 26 24 L26 55 C26 55 26 60 29 67 C32 76 38 86 40 92 C42 97 46 106 60 112 C74 106 78 97 80 92 C82 86 88 76 91 67 C94 60 94 55 94 55 L94 24 C94 16 90 16 86 16 C82 16 78 20 78 28 C74 36 68 44 64 48 L64 24 C64 16 60 16 60 16 Z"
        stroke="url(#hamsaGrad)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.25"
      />

      {/* Star of David (two overlapping triangles) */}
      <path
        d="M60 46 L74 70 L46 70 Z"
        stroke="url(#hamsaGrad)"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M60 78 L46 54 L74 54 Z"
        stroke="url(#hamsaGrad)"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />

      {/* Evil eye - outer almond shape */}
      <path
        d="M42 62 C42 62 50 50 60 50 C70 50 78 62 78 62 C78 62 70 74 60 74 C50 74 42 62 42 62 Z"
        stroke="url(#hamsaGrad)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />

      {/* Evil eye - outer iris */}
      <circle cx="60" cy="62" r="9" stroke="url(#hamsaGrad)" strokeWidth="1" opacity="0.6" />
      <circle cx="60" cy="62" r="9" fill="url(#irisGlow)" opacity="0.15" />

      {/* Evil eye - inner iris ring */}
      <circle cx="60" cy="62" r="6" fill="url(#eyeCenter)" opacity="0.4" />

      {/* Evil eye - pupil */}
      <circle cx="60" cy="62" r="3.5" fill="url(#eyeCenter)" opacity="0.9" />

      {/* Evil eye - light reflection */}
      <circle cx="57.5" cy="59.5" r="1.5" fill="white" opacity="0.7" />
      <circle cx="63" cy="60.5" r="0.7" fill="white" opacity="0.4" />

      {/* Small decorative dots on fingertips */}
      <circle cx="60" cy="11" r="1.5" fill="url(#hamsaGrad)" opacity="0.5" />
      <circle cx="28" cy="11" r="1.5" fill="url(#hamsaGrad)" opacity="0.4" />
      <circle cx="92" cy="11" r="1.5" fill="url(#hamsaGrad)" opacity="0.4" />

      {/* Small crescents on palm sides */}
      <path d="M30 85 C32 82 34 80 36 82" stroke="url(#hamsaGrad)" strokeWidth="0.8" opacity="0.3" />
      <path d="M90 85 C88 82 86 80 84 82" stroke="url(#hamsaGrad)" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}
