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

/** Crystal ball / divine eye - main hero icon */
export function DivineEyeIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 96 96" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer glow ring */}
      <circle cx="48" cy="48" r="40" stroke="url(#eyeGrad)" strokeWidth="1" opacity="0.4" />
      <circle cx="48" cy="48" r="36" stroke="url(#eyeGrad)" strokeWidth="0.5" opacity="0.2" />
      {/* Eye shape */}
      <path
        d="M16 48c0 0 14-20 32-20s32 20 32 20-14 20-32 20S16 48 16 48z"
        stroke="url(#eyeGrad)"
        strokeWidth="2"
        opacity="0.8"
      />
      {/* Iris */}
      <circle cx="48" cy="48" r="12" stroke="url(#eyeGrad)" strokeWidth="1.5" opacity="0.7" />
      {/* Pupil */}
      <circle cx="48" cy="48" r="5" fill="url(#eyeGrad)" opacity="0.8" />
      {/* Light reflection */}
      <circle cx="44" cy="44" r="2" fill="white" opacity="0.6" />
      {/* Eyelash rays */}
      {[-40, -25, -10, 10, 25, 40].map((deg, i) => {
        const angle = (deg - 90) * (Math.PI / 180);
        const x1 = 48 + 22 * Math.cos(angle);
        const y1 = 48 + 22 * Math.sin(angle);
        const x2 = 48 + 28 * Math.cos(angle);
        const y2 = 48 + 28 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#eyeGrad)" strokeWidth="1" opacity="0.4" />;
      })}
      <defs>
        <linearGradient id="eyeGrad" x1="16" y1="16" x2="80" y2="80">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}
