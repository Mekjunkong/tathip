"use client";

import { SEOLanding } from "@/components/seo/seo-landing";

export function AstrologyLanding() {
  return (
    <SEOLanding
      heroImage="/images/thai-astrology.webp"
      heroAlt="Thai Astrology Birth Chart with zodiac constellations"
      title={{
        th: "โหราศาสตร์ไทย",
        en: "Thai Astrology",
      }}
      subtitle={{
        th: "คำนวณดวงชะตาแบบสุริยคติไทย ด้วย AI",
        en: "AI-Powered Sidereal Birth Chart Readings",
      }}
      description={{
        th: "ตาทิพย์คำนวณดวงชะตาของคุณด้วยระบบโหราศาสตร์ไทยแบบสุริยคติ (Lahiri ayanamsa) วิเคราะห์ตำแหน่งดาวเคราะห์ นักษัตร และทศาเพื่อทำนายเรื่องความรัก การงาน สุขภาพ และเส้นทางชีวิต",
        en: "TaThip calculates your birth chart using the Thai sidereal system (Lahiri ayanamsa). Our AI analyzes planetary positions, nakshatras, and dasha periods to provide personalized predictions about love, career, health, and life path.",
      }}
      features={[
        {
          icon: "🌟",
          title: { th: "คำนวณแม่นยำ", en: "Precise Calculations" },
          description: {
            th: "ใช้ astronomy-engine คำนวณตำแหน่งดาวเคราะห์แบบเรียลไทม์ ไม่ใช้ตารางสำเร็จรูป ความแม่นยำระดับวินาทีของอาร์ค",
            en: "Real-time planetary position calculations using astronomy-engine. No pre-computed tables — arc-second precision for every birth chart.",
          },
        },
        {
          icon: "🪐",
          title: { th: "ดาวเคราะห์ทั้ง 9", en: "All 9 Grahas" },
          description: {
            th: "วิเคราะห์ตำแหน่งดวงอาทิตย์ ดวงจันทร์ ดาวพุธ ดาวศุกร์ ดาวอังคาร ดาวพฤหัส ดาวเสาร์ ราหู และเกตุ ในจักรราศีทั้ง 12",
            en: "Analyzes positions of Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Rahu, and Ketu across all 12 zodiac signs.",
          },
        },
        {
          icon: "📅",
          title: { th: "ปฏิทินไทย", en: "Thai Calendar" },
          description: {
            th: "แปลงวันเกิดเป็นปฏิทินจันทรคติไทย วันพระ ฤกษ์ดี และช่วงเวลามงคลตามโหราศาสตร์ไทยโบราณ",
            en: "Converts your birth date to the Thai lunar calendar with auspicious days and periods according to traditional Thai astrology.",
          },
        },
        {
          icon: "🔮",
          title: { th: "AI วิเคราะห์เชิงลึก", en: "Deep AI Analysis" },
          description: {
            th: "AI ผสานความรู้โหราศาสตร์ไทยดั้งเดิมกับการตีความสมัยใหม่ ให้คำแนะนำที่ใช้ได้จริงในชีวิตประจำวัน",
            en: "AI combines traditional Thai astrological knowledge with modern interpretation to give practical, actionable guidance for daily life.",
          },
        },
      ]}
      ctaLink="/chat"
      faq={[
        {
          q: {
            th: "โหราศาสตร์ไทยต่างจากโหราศาสตร์ตะวันตกอย่างไร?",
            en: "How is Thai astrology different from Western astrology?",
          },
          a: {
            th: "โหราศาสตร์ไทยใช้ระบบสุริยคติ (Sidereal) ที่ปรับตาม Lahiri ayanamsa ทำให้ตำแหน่งดาวต่างจากโหราศาสตร์ตะวันตกที่ใช้ระบบ Tropical ประมาณ 24 องศา นอกจากนี้ยังมีระบบนักษัตร 27 ตัว และทศาที่ใช้ทำนายช่วงเวลาในชีวิต",
            en: "Thai astrology uses the Sidereal zodiac with Lahiri ayanamsa correction, placing planets about 24° different from the Western Tropical system. It also uses 27 nakshatras (lunar mansions) and dasha periods for timing predictions.",
          },
        },
        {
          q: {
            th: "ต้องรู้เวลาเกิดแม่นยำแค่ไหน?",
            en: "How precise does my birth time need to be?",
          },
          a: {
            th: "ยิ่งแม่นยำยิ่งดี โดยเฉพาะลัคนา (Ascendant) ที่เปลี่ยนทุก 2 ชั่วโมง หากไม่ทราบเวลาเกิด ตาทิพย์จะยังวิเคราะห์ตำแหน่งดาวเคราะห์ได้ แต่จะไม่สามารถระบุลัคนาและภพ (Houses) ได้",
            en: "The more precise, the better — especially for your Ascendant (Lagna), which changes every ~2 hours. If you don't know your birth time, TaThip can still analyze planetary positions but won't be able to determine your Ascendant and house placements.",
          },
        },
        {
          q: {
            th: "ดวงชะตาจากตาทิพย์แม่นแค่ไหน?",
            en: "How accurate are TaThip's readings?",
          },
          a: {
            th: "การคำนวณตำแหน่งดาวแม่นยำระดับวิทยาศาสตร์ (ใช้ astronomy-engine) ส่วนการตีความนั้น AI อ้างอิงจากตำราโหราศาสตร์ไทยดั้งเดิม ควรใช้เป็นแนวทางในการตัดสินใจ ไม่ใช่คำตอบสำเร็จรูป",
            en: "Planetary calculations are scientifically precise (using astronomy-engine). Interpretations are based on traditional Thai astrological texts, analyzed by AI. Use readings as guidance for decision-making, not as definitive answers.",
          },
        },
      ]}
    />
  );
}
