"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/ui/starfield";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";
import { ArrowRight, Eye, Star, Sparkles } from "lucide-react";
import {
  ZodiacIcon,
  TarotIcon,
  NumerologyIcon,
  BaZiIcon,
} from "@/components/icons/mystical-icons";

/* ─── Feature cards ─── */
const FEATURES = [
  {
    Icon: ZodiacIcon,
    titleKey: "featureAstrology" as const,
    descKey: "featureAstrologyDesc" as const,
    color: "text-violet-400",
    glow: "shadow-violet-500/20",
    border: "hover:border-violet-500/40",
    bg: "hover:bg-violet-500/5",
    badge: "โหราศาสตร์",
  },
  {
    Icon: TarotIcon,
    titleKey: "featureTarot" as const,
    descKey: "featureTarotDesc" as const,
    color: "text-indigo-400",
    glow: "shadow-indigo-500/20",
    border: "hover:border-indigo-500/40",
    bg: "hover:bg-indigo-500/5",
    badge: "ไพ่ทาโรต์",
  },
  {
    Icon: NumerologyIcon,
    titleKey: "featureNumerology" as const,
    descKey: "featureNumerologyDesc" as const,
    color: "text-fuchsia-400",
    glow: "shadow-fuchsia-500/20",
    border: "hover:border-fuchsia-500/40",
    bg: "hover:bg-fuchsia-500/5",
    badge: "เลขศาสตร์",
  },
  {
    Icon: BaZiIcon,
    titleKey: "featureBazi" as const,
    descKey: "featureBaziDesc" as const,
    color: "text-amber-400",
    glow: "shadow-amber-500/20",
    border: "hover:border-amber-500/40",
    bg: "hover:bg-amber-500/5",
    badge: "บาจื่อ",
  },
] as const;

/* ─── How it works ─── */
const STEPS_TH = [
  { num: "01", title: "กรอกข้อมูลวันเกิด", desc: "ระบุวัน เดือน ปี และเวลาเกิดของคุณ เพื่อความแม่นยำสูงสุด", icon: "🌙" },
  { num: "02", title: "AI วิเคราะห์ดวงชะตา", desc: "ระบบ AI ผสมผสานโหราศาสตร์ 4 ศาสตร์ เพื่อการพยากรณ์ที่ครอบคลุม", icon: "✨" },
  { num: "03", title: "รับคำทำนายส่วนตัว", desc: "อ่านผลดูดวงเชิงลึก และถามคำถามเพิ่มเติมได้ไม่จำกัด", icon: "🔮" },
];
const STEPS_EN = [
  { num: "01", title: "Enter Your Birth Data", desc: "Provide your date, month, year, and time of birth for maximum accuracy.", icon: "🌙" },
  { num: "02", title: "AI Analyzes Your Chart", desc: "Our AI blends 4 astrological traditions for a comprehensive reading.", icon: "✨" },
  { num: "03", title: "Receive Your Personal Reading", desc: "Get in-depth fortune insights and ask unlimited follow-up questions.", icon: "🔮" },
];

/* ─── Testimonials ─── */
const TESTIMONIALS_TH = [
  { quote: "ตาทิพย์บอกเรื่องความรักได้แม่นมาก ประหลาดใจมากเลย ไม่คิดว่า AI จะทำได้ขนาดนี้", name: "ปวีณา ส.", role: "ลูกค้าประจำ", stars: 5 },
  { quote: "ดูดวงเรื่องการงานแล้วได้ข้อมูลที่ลึกมาก ช่วยตัดสินใจเรื่องงานได้จริงๆ", name: "ธนพล ก.", role: "นักธุรกิจ", stars: 5 },
  { quote: "ไพ่ทาโรต์ที่นี่ตีความได้ดีมาก เหมือนคุยกับหมอดูจริงๆ แต่สะดวกกว่าเยอะ", name: "มณีรัตน์ พ.", role: "ครู", stars: 5 },
];
const TESTIMONIALS_EN = [
  { quote: "TaThip's love reading was incredibly accurate. I was amazed at how precise the AI was.", name: "Pawina S.", role: "Regular User", stars: 5 },
  { quote: "The career reading gave me deep insights that genuinely helped me make a major decision.", name: "Thanaphol K.", role: "Entrepreneur", stars: 5 },
  { quote: "The Tarot interpretation here is excellent — like talking to a real fortune teller, but far more convenient.", name: "Maneerat P.", role: "Teacher", stars: 5 },
];

export default function HomePage() {
  const language = useChatStore((s) => s.language);
  const steps = language === "th" ? STEPS_TH : STEPS_EN;
  const testimonials = language === "th" ? TESTIMONIALS_TH : TESTIMONIALS_EN;

  return (
    <main className="relative flex flex-col items-center overflow-hidden">
      <Starfield count={80} />

      {/* ══════════════════════════════════════════
          HERO — Banner image only, no text overlay
      ══════════════════════════════════════════ */}
      <section className="relative w-full">
        {/* Banner image — displayed as-is, full width */}
        <div className="relative w-full">
          <Image
            src="/tathip-banner.png"
            alt="TATHIP — ตาทิพย์ที่มองเห็นชะตาของคุณ"
            width={2752}
            height={1536}
            priority
            className="w-full h-auto block"
            sizes="100vw"
          />
          {/* Smooth fade into the page background at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS ROW — just below the banner
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-3xl px-4 -mt-8 mb-16">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          {[
            { value: "4", label: language === "th" ? "ศาสตร์โหราศาสตร์" : "Astrology Systems" },
            { value: "78", label: language === "th" ? "ใบไพ่ทาโรต์" : "Tarot Cards" },
            { value: "∞", label: language === "th" ? "คำถามไม่จำกัด" : "Unlimited Questions" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-violet-300 bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground/50 tracking-wide text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES — 4 divination arts
      ══════════════════════════════════════════ */}
      <section id="features" className="relative z-10 w-full max-w-5xl px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] uppercase text-violet-400/50 mb-3">
            <Sparkles className="w-3 h-3" />
            {language === "th" ? "ศาสตร์แห่งการพยากรณ์" : "The Arts of Divination"}
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-violet-300/70 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {language === "th" ? "4 ศาสตร์ในหนึ่งเดียว" : "4 Sciences in One"}
          </h2>
          <p className="mt-4 text-muted-foreground/60 max-w-md mx-auto text-sm md:text-base">
            {language === "th"
              ? "ผสมผสานภูมิปัญญาโหราศาสตร์จากทั่วโลก เพื่อการพยากรณ์ที่แม่นยำและครอบคลุมที่สุด"
              : "Combining astrological wisdom from around the world for the most accurate and comprehensive reading."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => {
            const { Icon } = feature;
            return (
              <Link key={i} href="/chat" className="group cursor-pointer">
                <div className={`relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center transition-all duration-300 ${feature.border} ${feature.bg} hover:-translate-y-2 hover:shadow-xl ${feature.glow} backdrop-blur-sm`}>
                  <div className={`${feature.color} flex justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-14 h-14 md:w-16 md:h-16" />
                  </div>
                  <span className={`inline-block text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full border mb-3 ${feature.color} border-current opacity-50`}>
                    {feature.badge}
                  </span>
                  <h3 className="font-semibold text-sm md:text-base text-foreground/80 mb-2 group-hover:text-foreground transition-colors">
                    {t(language, feature.titleKey)}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground/50 leading-relaxed">
                    {t(language, feature.descKey)}
                  </p>
                  <div className={`mt-4 flex items-center justify-center gap-1 text-xs ${feature.color} opacity-0 group-hover:opacity-70 transition-all duration-300 translate-y-1 group-hover:translate-y-0`}>
                    <span>{language === "th" ? "เริ่มดูดวง" : "Start Reading"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS — 3 steps
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-4xl px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-violet-400/50 mb-3">
            {language === "th" ? "วิธีใช้งาน" : "How It Works"}
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-violet-300/70 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {language === "th" ? "เริ่มต้นง่ายใน 3 ขั้นตอน" : "3 Simple Steps"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-[-50%] h-px bg-gradient-to-r from-violet-500/30 to-transparent" />
              )}
              <div className="relative mb-5">
                <div className="w-20 h-20 rounded-full border border-violet-500/20 bg-violet-500/5 backdrop-blur-sm flex items-center justify-center group-hover:border-violet-500/40 group-hover:bg-violet-500/10 transition-all duration-300">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <span className="absolute -top-2 -right-2 text-xs font-bold text-violet-400/40 tracking-wider" style={{ fontFamily: "var(--font-cinzel), serif" }}>
                  {step.num}
                </span>
              </div>
              <h3 className="font-semibold text-base md:text-lg text-foreground/80 mb-2 group-hover:text-foreground transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground/50 leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/chat">
            <Button
              size="lg"
              className="group relative text-base px-10 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-900/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden rounded-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                {language === "th" ? "ลองดูดวงฟรีเลย" : "Try a Free Reading"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-5xl px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-violet-400/50 mb-3">
            {language === "th" ? "เสียงจากผู้ใช้" : "What Users Say"}
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-violet-300/70 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {language === "th" ? "ประสบการณ์จริง" : "Real Experiences"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item, i) => (
            <div key={i} className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-6 hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all duration-300">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.stars }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed mb-5 italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground/80">{item.name}</p>
                  <p className="text-xs text-muted-foreground/50">{item.role}</p>
                </div>
              </div>
              <div className="absolute top-4 right-5 text-4xl text-violet-500/10 font-serif leading-none select-none">
                &ldquo;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DONATION SECTION
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-3xl px-4 py-16">
        <div className="relative rounded-3xl border border-amber-500/15 bg-amber-500/[0.03] backdrop-blur-sm p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="text-4xl mb-5">&#9781;</div>
            <h3
              className="text-2xl md:text-3xl font-bold text-amber-200/90 mb-4"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              {t(language, "donationTitle")}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground/60 leading-relaxed max-w-lg mx-auto mb-8">
              {t(language, "donationDesc")}
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
              {[
                { value: "50%", label: language === "th" ? "บริจาค" : "Donated" },
                { value: "⛩", label: language === "th" ? "วัดบนดอย" : "Temples" },
                { value: "🏘", label: language === "th" ? "ชาวบ้าน" : "Villagers" },
                { value: "🇱🇦", label: language === "th" ? "ผู้ยากไร้ลาว" : "Laos" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-full border border-amber-500/20 bg-amber-500/5 flex items-center justify-center">
                    <span className="text-xl">{item.value}</span>
                  </div>
                  <span className="text-xs text-amber-400/50 text-center leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-4xl px-4 pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-indigo-900/40 to-violet-900/60 backdrop-blur-sm border border-violet-500/15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30 animate-twinkle"
              style={{ top: `${20 + i * 12}%`, left: `${5 + i * 15}%`, animationDelay: `${i * 0.4}s` }}
            />
          ))}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <Eye className="w-5 h-5 text-violet-400" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-violet-400/70">
                  {language === "th" ? "ตาทิพย์พร้อมแล้ว" : "TaThip is Ready"}
                </span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                {language === "th" ? "ดวงชะตาของคุณรอคุณอยู่" : "Your Destiny Awaits"}
              </h2>
              <p className="text-sm text-muted-foreground/60 max-w-sm">
                {language === "th"
                  ? "เริ่มต้นดูดวงฟรีวันนี้ ไม่ต้องสมัครสมาชิก"
                  : "Start your free reading today. No sign-up required."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="group relative text-base px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-900/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden rounded-xl"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t(language, "startReading")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 border-violet-500/25 text-violet-300/80 hover:bg-violet-500/10 hover:border-violet-400/40 hover:text-violet-200 transition-all duration-300 cursor-pointer backdrop-blur-sm rounded-xl"
                >
                  {t(language, "tryTarot")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />
    </main>
  );
}
