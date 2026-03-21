"use client";

/**
 * AnimatedHero — Full-screen animated hero section.
 *
 * Replaces the static JPEG banner with a live CSS/SVG animation:
 * - Deep space background with twinkling + drifting stars
 * - Cosmic nebula glow orbs
 * - Hamsa hand SVG with animated eye and swirling aura
 * - TATHIP title with gradient shimmer
 * - Thai taglines
 * - Golden donation badge (scrolling marquee)
 * - Beautiful pill-shaped CTA buttons matching the original design
 */

import Link from "next/link";
import { useMemo } from "react";
import { useChatStore } from "@/stores/chat-store";

/* ── Star data ── */
interface StarDef {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  drift: number;
  driftDuration: number;
}

function generateStars(count: number, seed = 1): StarDef[] {
  // Deterministic pseudo-random to avoid hydration mismatch
  let s = seed;
  function rand() {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  }
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 2.5 + 0.5,
    opacity: rand() * 0.7 + 0.15,
    delay: rand() * 6,
    duration: rand() * 3 + 2,
    drift: (rand() - 0.5) * 30,
    driftDuration: rand() * 20 + 15,
  }));
}

/* ── Hamsa Hand SVG ── */
function HamsaHand() {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Animated swirl aura */}
      <circle cx="100" cy="110" r="85" stroke="url(#auraGrad)" strokeWidth="1" opacity="0.4" className="animate-spin-slow" />
      <circle cx="100" cy="110" r="70" stroke="url(#auraGrad2)" strokeWidth="0.5" opacity="0.3" className="animate-spin-reverse" />

      {/* Hand outline */}
      <path
        d="M100 195 C70 195 45 175 40 150 L35 120 C33 110 36 100 44 96 C50 93 57 95 61 100 L63 105 L63 70 C63 63 68 58 75 58 C82 58 87 63 87 70 L87 60 C87 53 92 48 99 48 C106 48 111 53 111 60 L111 70 C111 63 116 58 123 58 C130 58 135 63 135 70 L135 105 L137 100 C141 95 148 93 154 96 C162 100 165 110 163 120 L158 150 C153 175 128 195 100 195 Z"
        stroke="white"
        strokeWidth="1.5"
        fill="rgba(255,255,255,0.05)"
        opacity="0.9"
      />

      {/* Decorative lines on hand */}
      <path d="M75 130 Q100 125 125 130" stroke="white" strokeWidth="0.8" opacity="0.4" />
      <path d="M72 145 Q100 140 128 145" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <path d="M70 160 Q100 155 130 160" stroke="white" strokeWidth="0.8" opacity="0.2" />

      {/* Finger details */}
      <line x1="75" y1="58" x2="75" y2="30" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="99" y1="48" x2="99" y2="20" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="123" y1="58" x2="123" y2="30" stroke="white" strokeWidth="0.5" opacity="0.3" />

      {/* Eye iris */}
      <ellipse cx="100" cy="115" rx="18" ry="12" stroke="white" strokeWidth="1.2" fill="rgba(100,60,180,0.3)" opacity="0.9" />
      {/* Eye pupil — glowing purple */}
      <circle cx="100" cy="115" r="7" fill="url(#eyeGrad)" className="animate-eye-pulse" />
      <circle cx="100" cy="115" r="3" fill="rgba(200,160,255,0.9)" />
      <circle cx="97" cy="112" r="1.5" fill="white" opacity="0.8" />

      {/* Eye lashes / rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180);
        const r1 = 14, r2 = 20;
        return (
          <line
            key={i}
            x1={100 + r1 * Math.cos(angle)}
            y1={115 + r1 * Math.sin(angle) * 0.65}
            x2={100 + r2 * Math.cos(angle)}
            y2={115 + r2 * Math.sin(angle) * 0.65}
            stroke="white"
            strokeWidth="0.8"
            opacity="0.5"
          />
        );
      })}

      {/* Small decorative stars on hand */}
      {[
        { cx: 60, cy: 140 }, { cx: 140, cy: 140 },
        { cx: 70, cy: 175 }, { cx: 130, cy: 175 },
        { cx: 100, cy: 185 },
      ].map((pos, i) => (
        <circle key={i} cx={pos.cx} cy={pos.cy} r="1.5" fill="white" opacity="0.5" />
      ))}

      {/* Corner triangles (mystical symbols) */}
      <path d="M30 30 L38 30 L34 22 Z" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M162 30 L170 30 L166 22 Z" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M15 60 L23 60 L19 52 Z" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M177 60 L185 60 L181 52 Z" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />

      {/* Small star dots */}
      <circle cx="20" cy="40" r="1" fill="white" opacity="0.6" />
      <circle cx="180" cy="40" r="1" fill="white" opacity="0.6" />
      <circle cx="10" cy="80" r="0.8" fill="white" opacity="0.5" />
      <circle cx="190" cy="80" r="0.8" fill="white" opacity="0.5" />

      {/* Gradients */}
      <defs>
        <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="60%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </radialGradient>
        <linearGradient id="auraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="auraGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Main component ── */
export function AnimatedHero() {
  const language = useChatStore((s) => s.language);
  const stars = useMemo(() => generateStars(120, 42), []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050510]">

      {/* ── Layer 1: Deep space background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0520] to-[#050510]" />

      {/* ── Layer 2: Nebula glow orbs ── */}
      <div
        className="absolute rounded-full animate-glow-pulse"
        style={{
          width: "600px", height: "600px",
          top: "10%", left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full animate-glow-pulse"
        style={{
          width: "400px", height: "300px",
          top: "20%", left: "5%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute rounded-full animate-glow-pulse"
        style={{
          width: "350px", height: "280px",
          top: "15%", right: "5%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "3s",
        }}
      />

      {/* ── Layer 3: Twinkling + drifting stars ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite, starDrift ${star.driftDuration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s, ${star.delay * 0.5}s`,
              "--drift-x": `${star.drift}px`,
            } as React.CSSProperties}
          />
        ))}

        {/* Bright sparkle stars */}
        {[
          { x: 15, y: 20, size: 3 }, { x: 85, y: 15, size: 3.5 },
          { x: 8, y: 60, size: 2.5 }, { x: 92, y: 55, size: 3 },
          { x: 20, y: 80, size: 2 }, { x: 78, y: 75, size: 2.5 },
          { x: 50, y: 8, size: 2 }, { x: 35, y: 90, size: 2 },
        ].map((s, i) => (
          <div
            key={`bright-${i}`}
            className="absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              animation: `sparkle ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {/* 4-point star shape */}
            <div className="relative" style={{ width: `${s.size * 6}px`, height: `${s.size * 6}px` }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full" style={{ width: `${s.size}px`, height: `${s.size * 5}px`, opacity: 0.9 }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full" style={{ width: `${s.size * 5}px`, height: `${s.size}px`, opacity: 0.9 }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full" style={{ width: `${s.size * 0.5}px`, height: `${s.size * 0.5}px` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Layer 4: Hero content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-16 md:py-24 w-full max-w-4xl mx-auto">

        {/* Hamsa hand logo */}
        <div
          className="relative mb-6 md:mb-8"
          style={{ width: "clamp(120px, 18vw, 200px)", height: "clamp(132px, 20vw, 220px)" }}
        >
          {/* Outer glow ring */}
          <div
            className="absolute inset-[-20%] rounded-full animate-glow-pulse"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)",
              filter: "blur(15px)",
            }}
          />
          <HamsaHand />
        </div>

        {/* TATHIP title */}
        <h1
          className="font-bold tracking-[0.15em] mb-4 select-none"
          style={{
            fontFamily: "var(--font-cinzel), 'Cinzel', serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            background: "linear-gradient(180deg, #ffffff 0%, #e0d7ff 40%, #c4b5fd 70%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 0 30px rgba(167,139,250,0.4))",
          }}
        >
          TATHIP
        </h1>

        {/* Thai tagline */}
        <p
          className="text-white/70 mb-3 tracking-[0.25em]"
          style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.2rem)", letterSpacing: "0.2em" }}
        >
          ต า ทิ พ ย์ ที่ ม อ ง เ ห็ น ช ะ ต า ข อ ง คุ ณ
        </p>

        {/* AI description */}
        <p className="text-white/45 text-sm md:text-base mb-8 md:mb-10">
          AI ดูดวงผสมผสาน โหราศาสตร์ไทย ตะวันตก เวทิค และจีน
        </p>

        {/* Donation badge — scrolling marquee style */}
        <div className="relative mb-8 md:mb-10 overflow-hidden">
          <div
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border"
            style={{
              background: "linear-gradient(135deg, rgba(30,20,5,0.9) 0%, rgba(50,35,5,0.9) 100%)",
              borderColor: "rgba(212,175,55,0.5)",
              boxShadow: "0 0 20px rgba(212,175,55,0.15), inset 0 0 20px rgba(212,175,55,0.05)",
            }}
          >
            {/* Animated dots */}
            <span className="flex gap-1">
              {[0, 0.3, 0.6].map((d, i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full bg-amber-400/70 animate-typing-dot"
                  style={{ animationDelay: `${d}s` }}
                />
              ))}
            </span>
            <span
              className="text-xs md:text-sm font-medium"
              style={{ color: "#D4AF37" }}
            >
              รายได้ 50% บริจาคให้วัดบนดอย ชาวบ้าน และผู้ยากไร้ในลาว
            </span>
          </div>
        </div>

        {/* CTA Buttons — matching original banner style */}
        <div className="flex flex-col sm:flex-row items-center gap-4">

          {/* Primary: เริ่มดูดวง */}
          <Link href="/chat" className="group">
            <div
              className="relative flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
                boxShadow: "0 0 30px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
              <span className="relative z-10 text-white font-medium text-sm md:text-base tracking-wide">
                {language === "th" ? "เริ่มดูดวง" : "Start Reading"}
              </span>
              <span className="relative z-10 text-white/80 text-base md:text-lg transition-transform group-hover:translate-x-1 duration-300">
                →
              </span>
            </div>
          </Link>

          {/* Secondary: ดูไพ่ทาโรต์ */}
          <Link href="/tarot" className="group">
            <div
              className="relative flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 0 20px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
              {/* Sparkle icon */}
              <span className="relative z-10 mr-2 text-white/60 text-sm">✦</span>
              <span className="relative z-10 text-white/80 font-medium text-sm md:text-base tracking-wide group-hover:text-white transition-colors">
                {language === "th" ? "ดูไพ่ทาโรต์" : "Tarot Reading"}
              </span>
            </div>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 md:mt-16 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>
      </div>

      {/* Bottom fade to page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
