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

/** Detailed occult Hamsa with evil eye, radiating rays, mystical symbols, crescent moon — main hero icon */
export function DivineEyeIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 200 240" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg" x1="30" y1="10" x2="170" y2="230">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="ec" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#4c1d95" />
        </radialGradient>
        <radialGradient id="ig" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* === RADIATING RAYS from center eye === */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15) * (Math.PI / 180);
        const x1 = 100 + 42 * Math.cos(angle);
        const y1 = 115 + 42 * Math.sin(angle);
        const x2 = 100 + 95 * Math.cos(angle);
        const y2 = 115 + 95 * Math.sin(angle);
        return (
          <line key={`r${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#hg)" strokeWidth={i % 2 === 0 ? "1.2" : "0.5"}
            opacity={i % 2 === 0 ? 0.25 : 0.12} />
        );
      })}

      {/* === OUTER FRAME — decorative border === */}
      <rect x="8" y="8" width="184" height="224" rx="4" stroke="url(#hg)" strokeWidth="0.8" opacity="0.15" />
      <rect x="14" y="14" width="172" height="212" rx="2" stroke="url(#hg)" strokeWidth="0.5" opacity="0.1" />

      {/* === CORNER SYMBOLS === */}
      {/* Top-left: triangle with eye */}
      <path d="M24 32 L32 18 L40 32 Z" stroke="url(#hg)" strokeWidth="0.8" opacity="0.35" />
      <circle cx="32" cy="27" r="2" stroke="url(#hg)" strokeWidth="0.5" opacity="0.3" />
      {/* Top-right: triangle with eye */}
      <path d="M160 32 L168 18 L176 32 Z" stroke="url(#hg)" strokeWidth="0.8" opacity="0.35" />
      <circle cx="168" cy="27" r="2" stroke="url(#hg)" strokeWidth="0.5" opacity="0.3" />
      {/* Bottom-left: pentagram */}
      <circle cx="32" cy="212" r="8" stroke="url(#hg)" strokeWidth="0.6" opacity="0.25" />
      <path d="M32 204 L34.5 211 L41 211 L36 215.5 L38 222 L32 218 L26 222 L28 215.5 L23 211 L29.5 211 Z" stroke="url(#hg)" strokeWidth="0.5" opacity="0.3" />
      {/* Bottom-right: hexagram */}
      <path d="M168 206 L174 216 L162 216 Z" stroke="url(#hg)" strokeWidth="0.6" opacity="0.25" />
      <path d="M168 220 L162 210 L174 210 Z" stroke="url(#hg)" strokeWidth="0.6" opacity="0.25" />

      {/* === SIDE SYMBOLS === */}
      {/* Left: circle-dot-circle (alchemical gold) */}
      <circle cx="24" cy="80" r="4" stroke="url(#hg)" strokeWidth="0.6" opacity="0.25" />
      <circle cx="24" cy="80" r="1" fill="url(#hg)" opacity="0.3" />
      {/* Left: crescent */}
      <path d="M22 120 A6 6 0 1 1 22 132 A4 4 0 1 0 22 120" stroke="url(#hg)" strokeWidth="0.6" opacity="0.25" />
      {/* Right: cross */}
      <line x1="176" y1="76" x2="176" y2="86" stroke="url(#hg)" strokeWidth="0.6" opacity="0.25" />
      <line x1="171" y1="81" x2="181" y2="81" stroke="url(#hg)" strokeWidth="0.6" opacity="0.25" />
      {/* Right: diamond */}
      <path d="M176 120 L180 126 L176 132 L172 126 Z" stroke="url(#hg)" strokeWidth="0.6" opacity="0.25" />

      {/* === HAMSA HAND — detailed with finger markings === */}
      {/* Main hand outline */}
      <path
        d="M100 22 C94 22 90 26 90 34 L90 72
           C84 66 76 52 72 42 C70 32 64 26 58 26 C52 26 48 30 48 38 L48 80
           C46 76 42 68 38 60 C36 52 32 48 28 48 C24 48 22 52 22 58 L22 95
           C22 100 24 108 30 118 C36 128 44 140 48 150 C52 160 58 172 100 185
           C142 172 148 160 152 150 C156 140 164 128 170 118 C176 108 178 100 178 95
           L178 58 C178 52 176 48 172 48 C168 48 164 52 162 60 C158 68 154 76 152 80
           L152 38 C152 30 148 26 142 26 C136 26 130 32 128 42 C124 52 116 66 110 72
           L110 34 C110 26 106 22 100 22 Z"
        stroke="url(#hg)" strokeWidth="2" fill="none" opacity="0.75"
      />
      {/* Inner hand border */}
      <path
        d="M100 30 C96 30 94 33 94 38 L94 78
           C88 72 80 58 76 48 C74 38 70 34 64 34 C58 34 54 37 54 43 L54 82
           C52 78 48 72 44 64 C42 58 38 54 34 54 C30 54 28 57 28 62 L28 95
           C28 99 30 106 34 114 C40 124 46 134 50 144 C54 154 60 166 100 178
           C140 166 146 154 150 144 C154 134 160 124 166 114 C170 106 172 99 172 95
           L172 62 C172 57 170 54 166 54 C162 54 158 58 156 64 C152 72 148 78 146 82
           L146 43 C146 37 142 34 136 34 C130 34 126 38 124 48 C120 58 112 72 106 78
           L106 38 C106 33 104 30 100 30 Z"
        stroke="url(#hg)" strokeWidth="0.6" fill="none" opacity="0.2"
      />

      {/* Finger segment lines */}
      {/* Middle finger */}
      <line x1="94" y1="42" x2="106" y2="42" stroke="url(#hg)" strokeWidth="0.5" opacity="0.2" />
      <line x1="94" y1="55" x2="106" y2="55" stroke="url(#hg)" strokeWidth="0.5" opacity="0.2" />
      {/* Left index */}
      <line x1="54" y1="50" x2="64" y2="44" stroke="url(#hg)" strokeWidth="0.4" opacity="0.15" />
      <line x1="52" y1="62" x2="66" y2="56" stroke="url(#hg)" strokeWidth="0.4" opacity="0.15" />
      {/* Right index */}
      <line x1="136" y1="44" x2="146" y2="50" stroke="url(#hg)" strokeWidth="0.4" opacity="0.15" />
      <line x1="134" y1="56" x2="148" y2="62" stroke="url(#hg)" strokeWidth="0.4" opacity="0.15" />
      {/* Left pinky */}
      <line x1="28" y1="64" x2="38" y2="58" stroke="url(#hg)" strokeWidth="0.4" opacity="0.12" />
      {/* Right pinky */}
      <line x1="162" y1="58" x2="172" y2="64" stroke="url(#hg)" strokeWidth="0.4" opacity="0.12" />

      {/* === EVIL EYE — detailed === */}
      {/* Outer almond eye shape */}
      <path
        d="M58 115 C58 115 74 94 100 94 C126 94 142 115 142 115 C142 115 126 136 100 136 C74 136 58 115 58 115 Z"
        stroke="url(#hg)" strokeWidth="2" fill="none" opacity="0.85"
      />
      {/* Inner almond */}
      <path
        d="M66 115 C66 115 80 100 100 100 C120 100 134 115 134 115 C134 115 120 130 100 130 C80 130 66 115 66 115 Z"
        stroke="url(#hg)" strokeWidth="0.6" fill="none" opacity="0.3"
      />

      {/* Outer iris circle */}
      <circle cx="100" cy="115" r="15" stroke="url(#hg)" strokeWidth="1.2" opacity="0.6" />
      <circle cx="100" cy="115" r="15" fill="url(#ig)" opacity="0.2" />

      {/* Inner iris */}
      <circle cx="100" cy="115" r="10" stroke="url(#hg)" strokeWidth="0.8" opacity="0.5" />
      <circle cx="100" cy="115" r="10" fill="url(#ec)" opacity="0.3" />

      {/* Pupil */}
      <circle cx="100" cy="115" r="5.5" fill="url(#ec)" opacity="0.9" />

      {/* Light reflections */}
      <circle cx="96" cy="111" r="2.2" fill="white" opacity="0.75" />
      <circle cx="104" cy="112" r="1" fill="white" opacity="0.4" />

      {/* Decorative circles around iris */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = 100 + 15 * Math.cos(angle);
        const y = 115 + 15 * Math.sin(angle);
        return <circle key={`id${i}`} cx={x} cy={y} r="0.8" fill="url(#hg)" opacity="0.3" />;
      })}

      {/* === BELOW EYE — crescent moon + stars === */}
      {/* Crescent moon */}
      <path
        d="M94 152 A8 8 0 1 1 106 152 A6 6 0 1 0 94 152"
        stroke="url(#hg)" strokeWidth="1" fill="none" opacity="0.5"
      />
      {/* Stars beside moon */}
      <circle cx="82" cy="150" r="1.2" fill="url(#hg)" opacity="0.4" />
      <circle cx="118" cy="150" r="1.2" fill="url(#hg)" opacity="0.4" />
      <circle cx="76" cy="158" r="0.8" fill="url(#hg)" opacity="0.3" />
      <circle cx="124" cy="158" r="0.8" fill="url(#hg)" opacity="0.3" />

      {/* === ABOVE EYE — small symbols on palm === */}
      {/* Triangle above eye */}
      <path d="M96 86 L100 78 L104 86 Z" stroke="url(#hg)" strokeWidth="0.6" opacity="0.3" />
      {/* Small cross marks */}
      <line x1="80" y1="88" x2="84" y2="88" stroke="url(#hg)" strokeWidth="0.5" opacity="0.2" />
      <line x1="82" y1="86" x2="82" y2="90" stroke="url(#hg)" strokeWidth="0.5" opacity="0.2" />
      <line x1="116" y1="88" x2="120" y2="88" stroke="url(#hg)" strokeWidth="0.5" opacity="0.2" />
      <line x1="118" y1="86" x2="118" y2="90" stroke="url(#hg)" strokeWidth="0.5" opacity="0.2" />

      {/* === WAVY AURA around hand edges === */}
      <path
        d="M20 95 C18 92 16 88 18 84 C20 80 18 76 20 72"
        stroke="url(#hg)" strokeWidth="0.6" opacity="0.15" fill="none"
      />
      <path
        d="M180 95 C182 92 184 88 182 84 C180 80 182 76 180 72"
        stroke="url(#hg)" strokeWidth="0.6" opacity="0.15" fill="none"
      />
      <path
        d="M50 168 C46 172 42 176 44 180 C46 184 42 188 46 192"
        stroke="url(#hg)" strokeWidth="0.6" opacity="0.15" fill="none"
      />
      <path
        d="M150 168 C154 172 158 176 156 180 C154 184 158 188 154 192"
        stroke="url(#hg)" strokeWidth="0.6" opacity="0.15" fill="none"
      />

      {/* Fingertip dots */}
      <circle cx="100" cy="24" r="2" fill="url(#hg)" opacity="0.4" />
      <circle cx="58" cy="28" r="1.5" fill="url(#hg)" opacity="0.3" />
      <circle cx="142" cy="28" r="1.5" fill="url(#hg)" opacity="0.3" />
      <circle cx="28" cy="50" r="1.5" fill="url(#hg)" opacity="0.25" />
      <circle cx="172" cy="50" r="1.5" fill="url(#hg)" opacity="0.25" />
    </svg>
  );
}
