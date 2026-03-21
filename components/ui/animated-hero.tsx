"use client";

/**
 * AnimatedHero — Full-screen animated hero section.
 *
 * - Deep space background with twinkling + drifting stars
 * - Cosmic nebula glow orbs
 * - Real AI-generated Hamsa hand PNG with animated glow aura
 * - TATHIP title with gradient shimmer
 * - Thai taglines
 * - Golden donation badge
 * - Beautiful pill-shaped CTA buttons
 */

import Link from "next/link";
import Image from "next/image";
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
          width: "700px", height: "700px",
          top: "5%", left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(99,102,241,0.10) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute rounded-full animate-glow-pulse"
        style={{
          width: "450px", height: "350px",
          top: "15%", left: "0%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute rounded-full animate-glow-pulse"
        style={{
          width: "400px", height: "320px",
          top: "10%", right: "0%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
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

        {/* Bright 4-point sparkle stars */}
        {[
          { x: 12, y: 18, size: 3 }, { x: 87, y: 12, size: 3.5 },
          { x: 6, y: 58, size: 2.5 }, { x: 93, y: 52, size: 3 },
          { x: 18, y: 82, size: 2 }, { x: 80, y: 78, size: 2.5 },
          { x: 50, y: 6, size: 2 }, { x: 33, y: 92, size: 2 },
          { x: 65, y: 88, size: 1.8 }, { x: 4, y: 35, size: 1.5 },
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
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-16 md:py-20 w-full max-w-4xl mx-auto">

        {/* Hamsa hand — AI-generated PNG with animated glow */}
        <div
          className="relative mb-4 md:mb-6 animate-float"
          style={{ width: "clamp(180px, 26vw, 320px)", height: "clamp(240px, 35vw, 430px)" }}
        >
          {/* Multi-layer glow aura behind the image */}
          <div
            className="absolute inset-[-15%] rounded-full animate-glow-pulse"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(99,102,241,0.20) 45%, transparent 70%)",
              filter: "blur(25px)",
            }}
          />
          <div
            className="absolute inset-[-8%] rounded-full animate-glow-pulse"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.30) 0%, transparent 65%)",
              filter: "blur(15px)",
              animationDelay: "1s",
            }}
          />

          {/* The actual Hamsa PNG */}
          <Image
            src="/hamsa-hand.png"
            alt="Hamsa Hand — TATHIP mystical symbol"
            fill
            priority
            className="object-contain drop-shadow-[0_0_40px_rgba(139,92,246,0.8)]"
            sizes="(max-width: 768px) 180px, 320px"
          />
        </div>

        {/* TATHIP title */}
        <h1
          className="font-bold tracking-[0.15em] mb-3 select-none"
          style={{
            fontFamily: "var(--font-cinzel), 'Cinzel', serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            background: "linear-gradient(180deg, #ffffff 0%, #e0d7ff 40%, #c4b5fd 70%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(167,139,250,0.5))",
          }}
        >
          TATHIP
        </h1>

        {/* Thai tagline */}
        <p
          className="text-white/70 mb-2 tracking-widest"
          style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.2rem)", letterSpacing: "0.2em" }}
        >
          ต า ทิ พ ย์ ที่ ม อ ง เ ห็ น ช ะ ต า ข อ ง คุ ณ
        </p>

        {/* AI description */}
        <p className="text-white/45 text-sm md:text-base mb-7 md:mb-9">
          AI ดูดวงผสมผสาน โหราศาสตร์ไทย ตะวันตก เวทิค และจีน
        </p>

        {/* Donation badge */}
        <div className="relative mb-7 md:mb-9">
          <div
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border"
            style={{
              background: "linear-gradient(135deg, rgba(30,20,5,0.9) 0%, rgba(50,35,5,0.9) 100%)",
              borderColor: "rgba(212,175,55,0.5)",
              boxShadow: "0 0 20px rgba(212,175,55,0.15), inset 0 0 20px rgba(212,175,55,0.05)",
            }}
          >
            <span className="flex gap-1">
              {[0, 0.3, 0.6].map((d, i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full bg-amber-400/70 animate-typing-dot"
                  style={{ animationDelay: `${d}s` }}
                />
              ))}
            </span>
            <span className="text-xs md:text-sm font-medium" style={{ color: "#D4AF37" }}>
              รายได้ 50% บริจาคให้วัดบนดอย ชาวบ้าน และผู้ยากไร้ในลาว
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
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
              <span className="relative z-10 mr-2 text-white/60 text-sm">✦</span>
              <span className="relative z-10 text-white/80 font-medium text-sm md:text-base tracking-wide group-hover:text-white transition-colors">
                {language === "th" ? "ดูไพ่ทาโรต์" : "Tarot Reading"}
              </span>
            </div>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 md:mt-14 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>
      </div>

      {/* Bottom fade to page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
