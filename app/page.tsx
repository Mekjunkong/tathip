"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";
import { AnimatedHero } from "@/components/ui/animated-hero";

/* ─── Seeded RNG for deterministic star positions ─── */
interface StarDef { id: number; x: number; y: number; size: number; opacity: number; delay: number; duration: number; }
function generateStars(count: number, seed = 99): StarDef[] {
  let s = seed;
  const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  return Array.from({ length: count }, (_, i) => ({
    id: i, x: rand() * 100, y: rand() * 100,
    size: rand() * 1.8 + 0.4, opacity: rand() * 0.5 + 0.1,
    delay: rand() * 8, duration: rand() * 4 + 3,
  }));
}

/* ─── Divination systems ─── */
const SYSTEMS = [
  {
    icon: "☉", color: "#f59e0b", glow: "rgba(245,158,11,0.22)", border: "rgba(245,158,11,0.18)",
    th: { title: "โหราศาสตร์ไทย", sub: "ระบบโบราณ", desc: "คำนวณจากดาวนพเคราะห์ทั้ง 9 ดวง ตามหลักโหราศาสตร์ไทยดั้งเดิม" },
    en: { title: "Thai Astrology", sub: "Ancient System", desc: "Calculated from 9 celestial bodies using traditional Thai astrological principles" },
  },
  {
    icon: "☽", color: "#a78bfa", glow: "rgba(167,139,250,0.22)", border: "rgba(167,139,250,0.18)",
    th: { title: "โหราศาสตร์ตะวันตก", sub: "Tropical Zodiac", desc: "12 ราศีตะวันตก วิเคราะห์ดาวเคราะห์ในแต่ละเรือนชะตาอย่างละเอียด" },
    en: { title: "Western Astrology", sub: "Tropical Zodiac", desc: "12 Western signs with detailed planetary house analysis for deep insights" },
  },
  {
    icon: "✦", color: "#34d399", glow: "rgba(52,211,153,0.22)", border: "rgba(52,211,153,0.18)",
    th: { title: "โหราศาสตร์เวทิค", sub: "Jyotish · Lahiri", desc: "ระบบ Sidereal จากอินเดียโบราณ ใช้ Ayanamsa Lahiri มาตรฐาน" },
    en: { title: "Vedic Astrology", sub: "Jyotish · Lahiri", desc: "Sidereal system from ancient India using standard Lahiri Ayanamsa" },
  },
  {
    icon: "龍", color: "#f87171", glow: "rgba(248,113,113,0.22)", border: "rgba(248,113,113,0.18)",
    th: { title: "โหราศาสตร์จีน", sub: "บาจื่อ · ห้าธาตุ", desc: "วิเคราะห์ธาตุทั้ง 5 และปีนักษัตร 12 ราศีตามหลักจีนโบราณ" },
    en: { title: "Chinese Astrology", sub: "BaZi · Five Elements", desc: "Analyze 5 elements and 12 zodiac animals using ancient Chinese principles" },
  },
];

/* ─── Steps ─── */
const STEPS = [
  {
    icon: "🌙",
    th: { title: "กรอกข้อมูลวันเกิด", desc: "วันเกิด เวลาเกิด และสถานที่เกิด เพื่อความแม่นยำสูงสุด" },
    en: { title: "Enter Birth Details", desc: "Date, time, and place of birth for maximum accuracy" },
  },
  {
    icon: "✨",
    th: { title: "AI วิเคราะห์ดวงชะตา", desc: "คำนวณตำแหน่งดาวจริงด้วย Swiss Ephemeris แล้วให้ AI ตีความ 4 ศาสตร์" },
    en: { title: "AI Analyzes Your Chart", desc: "Real planetary positions via Swiss Ephemeris, AI interprets across 4 traditions" },
  },
  {
    icon: "🔮",
    th: { title: "รับคำทำนายเชิงลึก", desc: "คำทำนายละเอียด พร้อมแผนภูมิดาวเคราะห์ Interactive และถามได้ไม่จำกัด" },
    en: { title: "Receive Deep Insights", desc: "Detailed reading with interactive birth chart and unlimited follow-up questions" },
  },
];

/* ─── Testimonials ─── */
const REVIEWS = [
  {
    stars: 5,
    th: { text: "แม่นมากครับ ทายนิสัยได้ตรงเป๊ะ และยังบอกช่วงเวลาที่ดีสำหรับการทำธุรกิจได้ด้วย", name: "ธนพล ว.", role: "นักธุรกิจ" },
    en: { text: "Incredibly accurate. Nailed my personality and identified the best timing for my business.", name: "Thanaphon W.", role: "Entrepreneur" },
  },
  {
    stars: 5,
    th: { text: "ดูดวงมาหลายที่แต่ที่นี่ผสมหลายศาสตร์ได้ดีมาก คำทำนายละเอียดและเข้าใจง่าย", name: "สุภาพร ก.", role: "ครู" },
    en: { text: "I've tried many fortune tellers but TATHIP blends multiple systems beautifully. Clear and detailed.", name: "Supaporn K.", role: "Teacher" },
  },
  {
    stars: 5,
    th: { text: "แผนภูมิดาวเคราะห์สวยมาก และ AI อธิบายได้เข้าใจง่ายกว่าหมอดูทั่วไปมาก", name: "วิชัย ม.", role: "วิศวกร" },
    en: { text: "Beautiful birth chart and the AI explains it far more clearly than traditional fortune tellers.", name: "Wichai M.", role: "Engineer" },
  },
];

/* ─── Planet data for mock chart ─── */
const PLANETS = [
  { angle: 30, r: 60, color: "#f59e0b", symbol: "☉", nameTh: "อาทิตย์", nameEn: "Sun", deg: "15° ♈" },
  { angle: 75, r: 65, color: "#a78bfa", symbol: "☽", nameTh: "จันทร์", nameEn: "Moon", deg: "28° ♊" },
  { angle: 120, r: 58, color: "#60a5fa", symbol: "☿", nameTh: "พุธ", nameEn: "Mercury", deg: "3° ♋" },
  { angle: 200, r: 62, color: "#f472b6", symbol: "♀", nameTh: "ศุกร์", nameEn: "Venus", deg: "22° ♑" },
  { angle: 280, r: 60, color: "#f87171", symbol: "♂", nameTh: "อังคาร", nameEn: "Mars", deg: "11° ♓" },
  { angle: 330, r: 65, color: "#fbbf24", symbol: "♃", nameTh: "พฤหัส", nameEn: "Jupiter", deg: "7° ♒" },
];

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const language = useChatStore((s) => s.language);
  const bgStars = useMemo(() => generateStars(55, 77), []);

  return (
    <main className="relative flex flex-col items-center overflow-x-hidden bg-[#06030f]" id="main-content">

      {/* Skip link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:outline-none">
        {language === "th" ? "ข้ามไปเนื้อหาหลัก" : "Skip to main content"}
      </a>

      {/* ── Global background stars (fixed, decorative) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {bgStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`, top: `${star.y}%`,
              width: `${star.size}px`, height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — Animated Hero (keeps existing logo)
      ══════════════════════════════════════════ */}
      <AnimatedHero />

      {/* ══════════════════════════════════════════
          SECTION 2 — Stats Bar
      ══════════════════════════════════════════ */}
      <section
        className="relative z-10 w-full"
        aria-label={language === "th" ? "สถิติ" : "Statistics"}
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(6,3,15,0.97) 25%, rgba(6,3,15,0.97) 75%, transparent 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/[0.07]">
            {[
              { value: "4", label: language === "th" ? "ศาสตร์โหราศาสตร์" : "Astrology Systems" },
              { value: "78", label: language === "th" ? "ใบไพ่ทาโรต์" : "Tarot Cards" },
              { value: "∞", label: language === "th" ? "คำถามไม่จำกัด" : "Unlimited Questions" },
              { value: "100%", label: language === "th" ? "ฟรี ไม่ต้องสมัคร" : "Free, No Sign-up" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 px-4 py-2">
                <span
                  className="text-3xl md:text-4xl font-bold tabular-nums"
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    background: "linear-gradient(135deg, #e0d7ff, #a78bfa)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-white/35 text-center tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — 4 Divination Systems
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-6xl px-4 py-20 md:py-28" aria-labelledby="systems-heading">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />

        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-violet-400/55 mb-3">
            {language === "th" ? "ศาสตร์แห่งการพยากรณ์" : "Arts of Divination"}
          </p>
          <h2
            id="systems-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-cinzel), serif", textWrap: "balance" }}
          >
            {language === "th" ? "4 ศาสตร์ ผสานเป็นหนึ่ง" : "4 Systems, One Reading"}
          </h2>
          <p className="text-sm md:text-base text-white/38 max-w-xl mx-auto" style={{ textWrap: "pretty" }}>
            {language === "th"
              ? "TATHIP ผสมผสานโหราศาสตร์ 4 สายหลักเข้าด้วยกัน เพื่อให้คำทำนายที่ครอบคลุมและแม่นยำที่สุด"
              : "TATHIP blends 4 major astrological traditions for the most comprehensive and accurate reading."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SYSTEMS.map((sys, i) => {
            const content = language === "th" ? sys.th : sys.en;
            return (
              <article
                key={i}
                className="group relative rounded-2xl p-6 cursor-default"
                style={{
                  background: "linear-gradient(145deg, rgba(12,7,28,0.95) 0%, rgba(18,10,40,0.9) 100%)",
                  border: `1px solid ${sys.border}`,
                  transition: "transform 300ms ease, box-shadow 300ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${sys.glow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: sys.glow, border: `1px solid ${sys.border}` }}
                  aria-hidden="true"
                >
                  {sys.icon}
                </div>
                {/* Sub-label */}
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: sys.color, opacity: 0.65 }}>
                  {content.sub}
                </p>
                {/* Title */}
                <h3 className="text-base font-semibold text-white mb-2.5" style={{ textWrap: "balance" }}>
                  {content.title}
                </h3>
                {/* Description */}
                <p className="text-xs text-white/38 leading-relaxed" style={{ textWrap: "pretty" }}>
                  {content.desc}
                </p>
                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${sys.color}, transparent)` }}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — How It Works
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-5xl px-4 py-20 md:py-28" aria-labelledby="how-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />

        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-indigo-400/55 mb-3">
            {language === "th" ? "วิธีการทำงาน" : "How It Works"}
          </p>
          <h2
            id="how-heading"
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-cinzel), serif", textWrap: "balance" }}
          >
            {language === "th" ? "3 ขั้นตอน สู่คำทำนาย" : "3 Steps to Your Reading"}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Connector line desktop */}
          <div
            className="hidden md:block absolute top-[3.25rem] left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] h-px"
            aria-hidden="true"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), rgba(139,92,246,0.25), transparent)" }}
          />

          {STEPS.map((step, i) => {
            const content = language === "th" ? step.th : step.en;
            return (
              <div key={i} className="relative flex flex-col items-center text-center gap-4">
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center text-2xl z-10 shrink-0"
                  style={{
                    background: "linear-gradient(145deg, rgba(99,102,241,0.18), rgba(139,92,246,0.12))",
                    border: "1px solid rgba(139,92,246,0.28)",
                    boxShadow: "0 0 28px rgba(139,92,246,0.12)",
                  }}
                >
                  <span aria-hidden="true">{step.icon}</span>
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white/60"
                    style={{ background: "rgba(99,102,241,0.55)", border: "1px solid rgba(139,92,246,0.35)" }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2" style={{ textWrap: "balance" }}>
                    {content.title}
                  </h3>
                  <p className="text-sm text-white/38 leading-relaxed max-w-xs mx-auto" style={{ textWrap: "pretty" }}>
                    {content.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-14">
          <Link
            href="/chat"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06030f]"
            style={{
              background: "linear-gradient(135deg, #6d28d9, #4f46e5)",
              boxShadow: "0 0 32px rgba(109,40,217,0.38), 0 4px 20px rgba(79,70,229,0.28)",
              touchAction: "manipulation",
            }}
          >
            <span>{language === "th" ? "ลองดูดวงฟรีเลย" : "Try a Free Reading"}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — Birth Chart Preview
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-6xl px-4 py-20 md:py-28" aria-labelledby="chart-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left: Text */}
          <div>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-emerald-400/55 mb-3">
              {language === "th" ? "แผนภูมิดาวเคราะห์จริง" : "Real Birth Chart"}
            </p>
            <h2
              id="chart-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-5 whitespace-pre-line"
              style={{ fontFamily: "var(--font-cinzel), serif", textWrap: "balance" }}
            >
              {language === "th" ? "Swiss Ephemeris\nความแม่นยำระดับ NASA" : "Swiss Ephemeris\nNASA-Grade Accuracy"}
            </h2>
            <p className="text-sm md:text-base text-white/40 leading-relaxed mb-8" style={{ textWrap: "pretty" }}>
              {language === "th"
                ? "ระบบคำนวณตำแหน่งดาวเคราะห์จริงด้วย Swiss Ephemeris มาตรฐานสากล พร้อมแสดงแผนภูมิดาวเคราะห์แบบ Interactive ที่คุณสามารถ hover เพื่อดูรายละเอียดแต่ละดาวได้"
                : "Real planetary positions calculated with Swiss Ephemeris to international standards. Interactive birth chart with hover details for each planet."}
            </p>
            <ul className="space-y-3" role="list">
              {(language === "th"
                ? ["ตำแหน่งดาว 9 ดวงแบบ Real-time", "ระบบเรือน Whole Sign", "อายนัมศะ Lahiri มาตรฐาน", "จันทรคติไทย + ปีนักษัตร"]
                : ["9 Planets Real-time Positions", "Whole Sign House System", "Standard Lahiri Ayanamsa", "Thai Lunar Calendar + Zodiac Year"]
              ).map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/55">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                    style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.28)", color: "#34d399" }}
                    aria-hidden="true"
                  >✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Mock chart */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(8,4,22,0.97), rgba(12,6,32,0.95))",
              border: "1px solid rgba(139,92,246,0.14)",
              boxShadow: "0 0 60px rgba(99,102,241,0.08)",
            }}
          >
            <div className="p-8">
              <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-6">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  aria-label={language === "th" ? "ตัวอย่างแผนภูมิดาวเคราะห์" : "Birth chart preview"}
                  role="img"
                >
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(139,92,246,0.18)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="30" fill="rgba(99,102,241,0.04)" stroke="rgba(139,92,246,0.18)" strokeWidth="0.5" />
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    return (
                      <line key={i}
                        x1={100 + 30 * Math.cos(angle)} y1={100 + 30 * Math.sin(angle)}
                        x2={100 + 90 * Math.cos(angle)} y2={100 + 90 * Math.sin(angle)}
                        stroke="rgba(139,92,246,0.12)" strokeWidth="0.5"
                      />
                    );
                  })}
                  {PLANETS.map((p, i) => {
                    const a = (p.angle - 90) * (Math.PI / 180);
                    const x = 100 + p.r * Math.cos(a);
                    const y = 100 + p.r * Math.sin(a);
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="4" fill={p.color} opacity="0.85" />
                        <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="5" fill={p.color} opacity="0.95">{p.symbol}</text>
                      </g>
                    );
                  })}
                  <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="3,3" />
                  <text x="6" y="103" fontSize="5" fill="rgba(255,255,255,0.35)">ASC</text>
                  <text x="178" y="103" fontSize="5" fill="rgba(255,255,255,0.35)">DSC</text>
                  <text x="96" y="8" fontSize="5" fill="rgba(255,255,255,0.35)">MC</text>
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PLANETS.map((p, i) => (
                  <div key={i} className="flex items-center gap-1.5 p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.025)" }}>
                    <span className="text-sm shrink-0" style={{ color: p.color }} aria-hidden="true">{p.symbol}</span>
                    <div className="min-w-0">
                      <p className="text-[9px] text-white/55 truncate">{language === "th" ? p.nameTh : p.nameEn}</p>
                      <p className="text-[8px] text-white/28 tabular-nums">{p.deg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — Testimonials
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-6xl px-4 py-20 md:py-28" aria-labelledby="reviews-heading">
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-400/55 mb-3">
            {language === "th" ? "รีวิวจากผู้ใช้จริง" : "Real User Reviews"}
          </p>
          <h2
            id="reviews-heading"
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-cinzel), serif", textWrap: "balance" }}
          >
            {language === "th" ? "เสียงจากผู้ที่ได้ดูดวง" : "What Our Users Say"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => {
            const content = language === "th" ? review.th : review.en;
            return (
              <figure
                key={i}
                className="relative rounded-2xl p-7"
                style={{
                  background: "linear-gradient(145deg, rgba(12,7,28,0.95), rgba(18,10,40,0.9))",
                  border: "1px solid rgba(255,255,255,0.055)",
                }}
              >
                <span className="absolute top-5 right-6 text-5xl leading-none font-serif text-violet-500/12 select-none" aria-hidden="true">"</span>
                <div className="flex gap-1 mb-4" role="img" aria-label={`${review.stars} stars`}>
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm" aria-hidden="true">★</span>
                  ))}
                </div>
                <blockquote>
                  <p className="text-sm text-white/60 leading-relaxed mb-5 italic" style={{ textWrap: "pretty" }}>
                    "{content.text}"
                  </p>
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.28), rgba(99,102,241,0.18))", border: "1px solid rgba(139,92,246,0.18)" }}
                    aria-hidden="true"
                  >
                    {content.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/75 truncate">{content.name}</p>
                    <p className="text-xs text-white/32 truncate">{content.role}</p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 7 — Donation
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-4xl px-4 py-16 md:py-20" aria-labelledby="donation-heading">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
          style={{
            background: "linear-gradient(145deg, rgba(28,18,4,0.97) 0%, rgba(42,28,4,0.95) 100%)",
            border: "1px solid rgba(212,175,55,0.18)",
            boxShadow: "0 0 60px rgba(212,175,55,0.06), inset 0 0 60px rgba(212,175,55,0.025)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <p className="text-xs font-medium tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(212,175,55,0.55)" }}>
              {language === "th" ? "เพื่อสังคม" : "For Society"}
            </p>
            <h2
              id="donation-heading"
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-cinzel), serif", color: "#D4AF37", textWrap: "balance" }}
            >
              {language === "th" ? "รายได้ 50% เพื่อผู้ยากไร้" : "50% of Revenue for the Needy"}
            </h2>
            <p className="text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-10" style={{ color: "rgba(212,175,55,0.48)", textWrap: "pretty" }}>
              {language === "th"
                ? "ทุกครั้งที่คุณใช้บริการ TATHIP รายได้ครึ่งหนึ่งจะถูกบริจาคให้วัดบนดอย ชาวบ้านในพื้นที่ห่างไกล และผู้ยากไร้ในลาว"
                : "Every time you use TATHIP, half the revenue is donated to mountain temples, remote villagers, and the poor in Laos."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: null, value: "50%", label: language === "th" ? "บริจาคทุกครั้ง" : "Every Transaction" },
                { icon: "⛩", value: "⛩", label: language === "th" ? "วัดบนดอย" : "Mountain Temples" },
                { icon: "🏘", value: "🏘", label: language === "th" ? "ชาวบ้านห่างไกล" : "Remote Villagers" },
                { icon: "🇱🇦", value: "🇱🇦", label: language === "th" ? "ผู้ยากไร้ในลาว" : "Poor in Laos" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.14)" }}
                    aria-hidden="true"
                  >
                    {i === 0
                      ? <span className="text-lg font-bold tabular-nums" style={{ color: "#D4AF37" }}>50%</span>
                      : <span className="text-2xl">{item.icon}</span>
                    }
                  </div>
                  <span className="text-xs text-center leading-tight" style={{ color: "rgba(212,175,55,0.45)" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 8 — Final CTA
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-4xl px-4 pb-28" aria-labelledby="cta-heading">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, rgba(55,25,110,0.48) 0%, rgba(35,18,80,0.58) 50%, rgba(55,25,110,0.48) 100%)",
            border: "1px solid rgba(139,92,246,0.18)",
            boxShadow: "0 0 80px rgba(99,102,241,0.1)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />

          {/* Decorative stars */}
          {[
            { top: "15%", left: "5%", size: 4 }, { top: "25%", right: "8%", size: 3 },
            { top: "70%", left: "8%", size: 3 }, { top: "60%", right: "5%", size: 4 },
            { top: "45%", left: "2%", size: 2 }, { top: "40%", right: "3%", size: 2 },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/18 animate-twinkle"
              style={{ top: s.top, ...(s as any).left !== undefined ? { left: (s as any).left } : { right: (s as any).right }, width: `${s.size}px`, height: `${s.size}px`, animationDelay: `${i * 0.5}s` }}
              aria-hidden="true"
            />
          ))}

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14">
            <div className="text-center md:text-left">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-violet-400/55 mb-3">
                {language === "th" ? "ตาทิพย์พร้อมแล้ว" : "TaThip Is Ready"}
              </p>
              <h2
                id="cta-heading"
                className="text-2xl md:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-cinzel), serif", textWrap: "balance" }}
              >
                {language === "th" ? "ดวงชะตาของคุณรอคุณอยู่" : "Your Destiny Awaits"}
              </h2>
              <p className="text-sm text-white/38 max-w-sm" style={{ textWrap: "pretty" }}>
                {language === "th"
                  ? "เริ่มต้นดูดวงฟรีวันนี้ ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่าย"
                  : "Start your free reading today. No sign-up, no cost."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/chat"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06030f]"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: "0 0 32px rgba(124,58,237,0.38), 0 4px 20px rgba(79,70,229,0.28)",
                  touchAction: "manipulation",
                }}
              >
                <span className="relative z-10">{language === "th" ? "เริ่มดูดวง" : "Start Reading"}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" aria-hidden="true" />
              </Link>

              <Link
                href="/tarot"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium transition-all duration-300 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06030f]"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(12px)",
                  touchAction: "manipulation",
                }}
              >
                <span aria-hidden="true">✦</span>
                <span>{language === "th" ? "ดูไพ่ทาโรต์" : "Tarot Reading"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom fade */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#06030f] to-transparent pointer-events-none z-[1]" aria-hidden="true" />
    </main>
  );
}
