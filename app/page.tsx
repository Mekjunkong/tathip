"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useChatStore } from "@/stores/chat-store";

interface StarDef { id: number; x: number; y: number; size: number; opacity: number; delay: number; duration: number; }
function generateStars(count: number, seed = 99): StarDef[] {
  let s = seed;
  const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  return Array.from({ length: count }, (_, i) => ({ id: i, x: rand() * 100, y: rand() * 100, size: rand() * 2 + 0.5, opacity: rand() * 0.6 + 0.15, delay: rand() * 8, duration: rand() * 4 + 3 }));
}

const SYSTEMS = [
  { img: "/thai-astro.webp", color: "#f59e0b", glow: "rgba(245,158,11,0.3)", border: "rgba(245,158,11,0.25)", sub: { th: "ระบบโบราณ", en: "Ancient System" }, title: { th: "โหราศาสตร์ไทย", en: "Thai Astrology" }, desc: { th: "คำนวณจากดาวนพเคราะห์ทั้ง 9 ดวง ตามหลักโหราศาสตร์ไทยดั้งเดิม", en: "Calculated from 9 celestial bodies using traditional Thai astrological principles" } },
  { img: "/western-astro.webp", color: "#a78bfa", glow: "rgba(167,139,250,0.3)", border: "rgba(167,139,250,0.25)", sub: { th: "TROPICAL ZODIAC", en: "TROPICAL ZODIAC" }, title: { th: "โหราศาสตร์ตะวันตก", en: "Western Astrology" }, desc: { th: "12 ราศีตะวันตก วิเคราะห์ดาวเคราะห์แต่ละราศีอย่างละเอียด", en: "12 tropical zodiac signs with detailed planetary analysis" } },
  { img: "/vedic-astro.webp", color: "#34d399", glow: "rgba(52,211,153,0.3)", border: "rgba(52,211,153,0.25)", sub: { th: "JYOTISH · LAHIRI", en: "JYOTISH · LAHIRI" }, title: { th: "โหราศาสตร์เวทิค", en: "Vedic Astrology" }, desc: { th: "ระบบ Sidereal จากอินเดียโบราณ ใช้ Ayanamsa Lahiri มาตรฐาน", en: "Sidereal system from ancient India using standard Lahiri Ayanamsa" } },
  { img: "/chinese-astro.webp", color: "#f87171", glow: "rgba(248,113,113,0.3)", border: "rgba(248,113,113,0.25)", sub: { th: "บาจื่อ · ห้าธาตุ", en: "BA ZI · 八字" }, title: { th: "โหราศาสตร์จีน", en: "Chinese Astrology" }, desc: { th: "วิเคราะห์ธาตุทั้ง 5 และปีนักษัตร 12 ราศีตามหลักจีนโบราณ", en: "Analyze 5 elements and 12 zodiac animals using ancient Chinese principles" } },
];

const REVIEWS = [
  { name: "ธนพล ว.", role: { th: "นักธุรกิจ", en: "Entrepreneur" }, stars: 5, quote: { th: "แม่นมากครับ ทายนิสัยได้ตรงเป๊ะ และยังบอกช่วงเวลาที่ดีสำหรับการทำธุรกิจได้ด้วย", en: "Very accurate! Nailed my personality and told me the best timing for business decisions." } },
  { name: "สุภาพร ก.", role: { th: "ครู", en: "Teacher" }, stars: 5, quote: { th: "ดูดวงมาหลายที่แต่ที่นี่ผสมหลายศาสตร์ได้ดีมาก คำทำนายละเอียดและเข้าใจง่าย", en: "Tried many fortune tellers but TATHIP blends multiple sciences beautifully. Detailed and easy to understand." } },
  { name: "วิชัย ม.", role: { th: "วิศวกร", en: "Engineer" }, stars: 5, quote: { th: "แผนภูมิดาวเคราะห์สวยมาก และ AI อธิบายได้เข้าใจง่ายกว่าหมอดูทั่วไปมาก", en: "Beautiful birth chart and AI explains things much more clearly than traditional fortune tellers." } },
];

export default function HomePage() {
  const language = useChatStore((s) => s.language);
  const stars = useMemo(() => generateStars(80, 42), []);
  const lang = language as "th" | "en";
  return (
    <div className="relative min-h-screen bg-[#050510] overflow-x-hidden">

      {/* HERO */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-bg.webp" alt="Cosmic background" fill className="object-cover object-center" priority quality={90} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {stars.map((star) => (
            <div key={star.id} className="absolute rounded-full bg-white" style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, opacity: star.opacity, animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite` }} />
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
          <div className="relative mb-6 md:mb-8">
            <div className="absolute inset-0 rounded-full blur-3xl opacity-60" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(79,70,229,0.4) 50%, transparent 70%)" }} />
            <Image src="/hamsa-hand.webp" alt="TATHIP Hamsa" width={180} height={180} className="relative z-10" style={{ filter: "drop-shadow(0 0 30px rgba(139,92,246,0.8)) drop-shadow(0 0 60px rgba(79,70,229,0.4))", animation: "float 6s ease-in-out infinite" }} priority />
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.15em] mb-4" style={{ fontFamily: "var(--font-cinzel), serif", background: "linear-gradient(135deg, #ffffff 0%, #e0d7ff 30%, #c4b5fd 60%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 40px rgba(167,139,250,0.5))" }}>TATHIP</h1>
          <p className="text-lg md:text-2xl text-white/90 tracking-[0.2em] mb-2 font-light">{language === "th" ? "ตาทิพย์ที่มองเห็นชะตาของคุณ" : "The Divine Eye that sees your destiny"}</p>
          <p className="text-sm md:text-base text-white/60 mb-8 tracking-wide">{language === "th" ? "AI ดูดวงผสมผสาน โหราศาสตร์ไทย ตะวันตก เวทิค และจีน" : "AI fortune telling combining Thai, Western, Vedic, and Chinese astrology"}</p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-10" style={{ borderColor: "rgba(212,175,55,0.5)", background: "rgba(212,175,55,0.08)", backdropFilter: "blur(12px)" }}>
            <span className="flex gap-1">{[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{ animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite` }} />)}</span>
            <span className="text-amber-300 text-sm font-medium">{language === "th" ? "รายได้ 50% บริจาคให้วัดบนดอย ชาวบ้าน และผู้ยากไร้ในลาว" : "50% of revenue donated to mountain temples, villagers & the poor in Laos"}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/chat">
              <button className="group relative px-8 py-4 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)", boxShadow: "0 0 30px rgba(124,58,237,0.5), 0 4px 20px rgba(0,0,0,0.3)" }}>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">{language === "th" ? "เริ่มดูดวง" : "Start Reading"} <span>→</span></span>
              </button>
            </Link>
            <Link href="/tarot">
              <button className="group relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", color: "white" }}>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <span className="relative flex items-center gap-2"><span>✦</span>{language === "th" ? "ดูไพ่ทาโรต์" : "Tarot Reading"}</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
          <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" style={{ animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 w-full border-y border-white/5" style={{ background: "rgba(10,5,30,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ val: "4", label: { th: "ศาสตร์โหราศาสตร์", en: "Astrology Systems" } }, { val: "78", label: { th: "ใบไพ่ทาโรต์", en: "Tarot Cards" } }, { val: "∞", label: { th: "คำถามไม่จำกัด", en: "Unlimited Questions" } }, { val: "100%", label: { th: "ฟรี ไม่ต้องสมัคร", en: "Free, No Sign-up" } }].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-cinzel), serif", background: "linear-gradient(135deg, #e0d7ff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{item.val}</span>
              <span className="text-white/50 text-sm">{item.label[lang]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4 SCIENCES */}
      <section className="relative z-10 w-full py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/features-bg.webp" alt="" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-transparent to-[#050510]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm tracking-[0.3em] uppercase mb-3">{language === "th" ? "ศาสตร์แห่งการพยากรณ์" : "Sciences of Divination"}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-cinzel), serif" }}>{language === "th" ? "4 ศาสตร์ ผสานเป็นหนึ่ง" : "4 Sciences, One Reading"}</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">{language === "th" ? "TATHIP ผสมผสานโหราศาสตร์ 4 สายหลักเข้าด้วยกัน เพื่อให้คำทำนายที่ครอบคลุมและแม่นยำที่สุด" : "TATHIP combines 4 major astrological traditions for the most comprehensive and accurate readings"}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SYSTEMS.map((sys, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]" style={{ background: "rgba(15,10,40,0.8)", border: `1px solid ${sys.border}`, backdropFilter: "blur(20px)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 0%, ${sys.glow} 0%, transparent 70%)` }} />
                <div className="relative w-full h-48 overflow-hidden">
                  <Image src={sys.img} alt={sys.title[lang]} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a28] via-[#0f0a28]/30 to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold tracking-widest" style={{ background: sys.glow, color: sys.color, border: `1px solid ${sys.border}` }}>{sys.sub[lang]}</div>
                </div>
                <div className="relative z-10 p-5">
                  <h3 className="text-xl font-bold mb-2" style={{ color: sys.color }}>{sys.title[lang]}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{sys.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 w-full py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm tracking-[0.3em] uppercase mb-3">{language === "th" ? "วิธีการทำงาน" : "How It Works"}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel), serif" }}>{language === "th" ? "3 ขั้นตอน สู่คำทำนาย" : "3 Steps to Your Reading"}</h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(139,92,246,0.5), transparent)" }} />
            {[{ icon: "🌙", step: "01", title: { th: "กรอกข้อมูลวันเกิด", en: "Enter Birth Data" }, desc: { th: "วันเกิด เวลาเกิด และสถานที่เกิด เพื่อความแม่นยำสูงสุด", en: "Birth date, time, and place for maximum accuracy" } }, { icon: "✨", step: "02", title: { th: "AI วิเคราะห์ดวงชะตา", en: "AI Analyzes Your Chart" }, desc: { th: "คำนวณตำแหน่งดาวจริงด้วย Swiss Ephemeris แล้วให้ AI ตีความ 4 ศาสตร์", en: "Real planetary positions via Swiss Ephemeris, interpreted across 4 systems" } }, { icon: "🔮", step: "03", title: { th: "รับคำทำนายเชิงลึก", en: "Receive Deep Insights" }, desc: { th: "คำทำนายละเอียด พร้อมแผนภูมิดาวเคราะห์ Interactive และถามได้ไม่จำกัด", en: "Detailed reading with interactive birth chart and unlimited follow-up questions" } }].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.4), rgba(79,70,229,0.4))", border: "1px solid rgba(139,92,246,0.4)", boxShadow: "0 0 30px rgba(109,40,217,0.3)" }}>{step.icon}</div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)" }}>{step.step}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title[lang]}</h3>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs">{step.desc[lang]}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-14">
            <Link href="/chat">
              <button className="group relative px-10 py-4 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", boxShadow: "0 0 40px rgba(124,58,237,0.4), 0 4px 20px rgba(0,0,0,0.3)" }}>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">{language === "th" ? "ลองดูดวงฟรีเลย →" : "Try Free Now →"}</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TAROT SECTION */}
      <section className="relative z-10 w-full py-24 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-violet-400 text-sm tracking-[0.3em] uppercase mb-3">{language === "th" ? "ไพ่ทาโรต์ 78 ใบ" : "78 Tarot Cards"}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-cinzel), serif" }}>{language === "th" ? "ดูไพ่ทาโรต์ด้วย AI" : "AI-Powered Tarot Reading"}</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">{language === "th" ? "เลือกไพ่ 1-3 ใบจากสำรับไพ่ Rider-Waite 78 ใบ แล้วให้ AI ตีความตามสถานการณ์ของคุณอย่างลึกซึ้ง" : "Choose 1-3 cards from the 78-card Rider-Waite deck and let AI interpret them deeply based on your situation"}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[{ icon: "🃏", label: { th: "78 ใบ Rider-Waite", en: "78 Rider-Waite Cards" } }, { icon: "🔄", label: { th: "ไพ่หงาย & คว่ำ", en: "Upright & Reversed" } }, { icon: "🤖", label: { th: "AI ตีความเชิงลึก", en: "Deep AI Interpretation" } }, { icon: "💬", label: { th: "ถามต่อได้ไม่จำกัด", en: "Unlimited Follow-ups" } }].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}>
                    <span className="text-2xl">{feat.icon}</span>
                    <span className="text-white/70 text-sm">{feat.label[lang]}</span>
                  </div>
                ))}
              </div>
              <Link href="/tarot">
                <button className="group relative px-8 py-4 rounded-full font-semibold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", backdropFilter: "blur(12px)" }}>
                  <span className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  <span className="relative">✦ {language === "th" ? "เริ่มดูไพ่ทาโรต์" : "Start Tarot Reading"}</span>
                </button>
              </Link>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-72 h-96 md:w-80 md:h-[28rem]">
                <div className="absolute inset-0 rounded-2xl blur-3xl opacity-50" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(79,70,229,0.3) 50%, transparent 70%)" }} />
                <Image src="/tarot-preview.webp" alt="Tarot cards" fill className="object-cover rounded-2xl relative z-10" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.3)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 w-full py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm tracking-[0.3em] uppercase mb-3">{language === "th" ? "รีวิวจากผู้ใช้จริง" : "Real User Reviews"}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel), serif" }}>{language === "th" ? "เสียงจากผู้ที่ได้ดูดวง" : "Voices from Our Users"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(15,10,40,0.8)", border: "1px solid rgba(139,92,246,0.15)", backdropFilter: "blur(20px)" }}>
                <div className="absolute top-4 right-5 text-5xl font-serif leading-none" style={{ color: "rgba(139,92,246,0.2)" }}>"</div>
                <div className="flex gap-1 mb-4">{Array.from({ length: review.stars }).map((_, j) => <span key={j} className="text-amber-400 text-lg">★</span>)}</div>
                <p className="text-white/75 text-sm leading-relaxed mb-5 italic">&ldquo;{review.quote[lang]}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)" }}>{review.name[0]}</div>
                  <div><p className="text-white font-semibold text-sm">{review.name}</p><p className="text-white/40 text-xs">{review.role[lang]}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATION */}
      <section className="relative z-10 w-full py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/donation-bg.webp" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-black/60 to-[#050510]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-3">{language === "th" ? "เพื่อสังคม" : "For Society"}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-cinzel), serif" }}>{language === "th" ? "รายได้ 50% เพื่อผู้ยากไร้" : "50% Revenue for the Poor"}</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">{language === "th" ? "ทุกครั้งที่คุณใช้บริการ TATHIP รายได้ครึ่งหนึ่งจะถูกบริจาคให้กับวัดบนดอย ชาวบ้านในพื้นที่ห่างไกล และผู้ยากไร้ในลาว" : "Every time you use TATHIP, half of the revenue is donated to mountain temples, remote villagers, and the poor in Laos"}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[{ icon: "🏔️", val: "50%", label: { th: "บริจาคทุกครั้ง", en: "Donated Every Time" } }, { icon: "⛩️", val: "∞", label: { th: "วัดบนดอย", en: "Mountain Temples" } }, { icon: "🏘️", val: "100+", label: { th: "ครอบครัวที่ได้รับ", en: "Families Helped" } }, { icon: "🇱🇦", val: "🙏", label: { th: "ผู้ยากไร้ในลาว", en: "Poor in Laos" } }].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", backdropFilter: "blur(12px)" }}>
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-2xl font-bold text-amber-300" style={{ fontFamily: "var(--font-cinzel), serif" }}>{stat.val}</span>
                <span className="text-white/60 text-xs text-center">{stat.label[lang]}</span>
              </div>
            ))}
          </div>
          <Link href="/chat">
            <button className="group relative px-10 py-4 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105" style={{ background: "linear-gradient(135deg, #d97706, #b45309)", boxShadow: "0 0 40px rgba(217,119,6,0.4), 0 4px 20px rgba(0,0,0,0.3)" }}>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">{language === "th" ? "ดูดวงและสร้างบุญ →" : "Read Fortune & Do Good →"}</span>
            </button>
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 w-full py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative p-10 md:p-16 rounded-3xl text-center overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.2) 0%, rgba(79,70,229,0.15) 50%, rgba(109,40,217,0.2) 100%)", border: "1px solid rgba(139,92,246,0.25)", backdropFilter: "blur(20px)" }}>
            {["top-4 left-8", "top-4 right-8", "bottom-4 left-8", "bottom-4 right-8"].map((pos, i) => <div key={i} className={`absolute ${pos} text-violet-400/40 text-2xl`} style={{ animation: `twinkle ${2 + i * 0.5}s ease-in-out infinite` }}>✦</div>)}
            <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <p className="text-violet-400 text-sm tracking-[0.3em] uppercase mb-3">{language === "th" ? "พร้อมแล้วหรือยัง?" : "Ready to Begin?"}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-cinzel), serif" }}>{language === "th" ? "ดวงชะตาของคุณรอคุณอยู่" : "Your Destiny Awaits You"}</h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">{language === "th" ? "เริ่มต้นดูดวงฟรี ไม่ต้องสมัครสมาชิก ไม่ต้องใช้บัตรเครดิต" : "Start your free reading now. No sign-up required, no credit card needed."}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <button className="group relative px-10 py-4 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)", boxShadow: "0 0 40px rgba(124,58,237,0.5), 0 4px 20px rgba(0,0,0,0.3)" }}>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative">{language === "th" ? "เริ่มดูดวง →" : "Start Reading →"}</span>
                  </button>
                </Link>
                <Link href="/tarot">
                  <button className="group relative px-10 py-4 rounded-full font-semibold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(12px)" }}>
                    <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    <span className="relative">✦ {language === "th" ? "ดูไพ่ทาโรต์" : "Tarot Reading"}</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg tracking-widest text-violet-300/70" style={{ fontFamily: "var(--font-cinzel), serif" }}>TATHIP</span>
          <p className="text-white/30 text-sm text-center">{language === "th" ? "© 2025 TATHIP · ตาทิพย์ที่มองเห็นชะตาของคุณ · รายได้ 50% บริจาคเพื่อสังคม" : "© 2025 TATHIP · The Divine Eye · 50% of revenue donated to charity"}</p>
          <div className="flex gap-4 text-white/30 text-sm">
            <Link href="/chat" className="hover:text-violet-400 transition-colors">{language === "th" ? "ดูดวง" : "Reading"}</Link>
            <Link href="/tarot" className="hover:text-violet-400 transition-colors">{language === "th" ? "ทาโรต์" : "Tarot"}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
