"use client";

import { SEOLanding } from "@/components/seo/seo-landing";

export function NumerologyLanding() {
  return (
    <SEOLanding
      heroImage="/images/numerology.webp"
      heroAlt="Numerology symbols with sacred geometry and numbers"
      title={{
        th: "เลขศาสตร์",
        en: "Numerology",
      }}
      subtitle={{
        th: "วิเคราะห์ตัวเลขชีวิต เบอร์โทร ทะเบียนรถ",
        en: "Life Path, Phone Numbers & License Plate Analysis",
      }}
      description={{
        th: "ตาทิพย์วิเคราะห์ตัวเลขในชีวิตคุณทั้งระบบ Pythagorean และเลขศาสตร์ไทย คำนวณเลขชีวิต เลขวิถีชีวิต ปีส่วนตัว รวมถึงวิเคราะห์เบอร์โทรศัพท์ ทะเบียนรถ และตัวเลขมงคล",
        en: "TaThip analyzes the numbers in your life using both Pythagorean and Thai เลขศาสตร์ systems. Calculate life path number, destiny number, personal year, and analyze phone numbers, license plates, and lucky numbers.",
      }}
      features={[
        {
          icon: "🔢",
          title: { th: "เลขชีวิต", en: "Life Path Number" },
          description: {
            th: "คำนวณเลขชีวิตจากวันเกิด เผยบุคลิกภาพ จุดแข็ง จุดอ่อน และเส้นทางชีวิตที่เหมาะสมที่สุดสำหรับคุณ",
            en: "Calculate your life path number from your birth date. Reveals personality traits, strengths, weaknesses, and your ideal life direction.",
          },
        },
        {
          icon: "📱",
          title: { th: "วิเคราะห์เบอร์โทร", en: "Phone Number Analysis" },
          description: {
            th: "วิเคราะห์พลังงานของเบอร์โทรศัพท์ของคุณ แนะนำเบอร์มงคลที่เหมาะกับเลขชีวิตและวัตถุประสงค์",
            en: "Analyze the energy of your phone number. Get recommendations for lucky numbers that align with your life path and goals.",
          },
        },
        {
          icon: "🚗",
          title: { th: "ทะเบียนรถ", en: "License Plate Analysis" },
          description: {
            th: "วิเคราะห์ทะเบียนรถยนต์ตามหลักเลขศาสตร์ไทย เลือกเลขทะเบียนที่เสริมดวงชะตาของคุณ",
            en: "Analyze car license plates using Thai numerology principles. Choose plate numbers that enhance your fortune.",
          },
        },
        {
          icon: "📊",
          title: { th: "2 ระบบวิเคราะห์", en: "Dual System Analysis" },
          description: {
            th: "ผสมผสาน Pythagorean numerology สากลกับเลขศาสตร์ไทยแบบดั้งเดิม ให้มุมมองที่ครอบคลุมและแม่นยำ",
            en: "Combines universal Pythagorean numerology with traditional Thai เลขศาสตร์ for comprehensive and accurate insights.",
          },
        },
      ]}
      ctaLink="/chat"
      faq={[
        {
          q: {
            th: "เลขชีวิตคืออะไร?",
            en: "What is a life path number?",
          },
          a: {
            th: "เลขชีวิต (Life Path Number) คำนวณจากผลรวมของตัวเลขวันเกิด เดือน และปี ลดลงเหลือเลขหลักเดียว (1-9) หรือเลขมาสเตอร์ (11, 22, 33) เป็นตัวเลขที่สำคัญที่สุดในเลขศาสตร์ เผยถึงบุคลิกภาพพื้นฐานและเส้นทางชีวิต",
            en: "Your life path number is calculated by reducing your birth date, month, and year to a single digit (1-9) or master number (11, 22, 33). It's the most important number in numerology, revealing your core personality and life direction.",
          },
        },
        {
          q: {
            th: "เบอร์โทรมีผลต่อดวงชะตาจริงหรือ?",
            en: "Do phone numbers really affect fortune?",
          },
          a: {
            th: "ในหลักเลขศาสตร์ไทย ตัวเลขแต่ละตัวมีพลังงานเฉพาะ เบอร์โทรที่ใช้ทุกวันจะส่งผลต่อพลังงานรอบตัวคุณ ตาทิพย์วิเคราะห์ทั้งผลรวมและตำแหน่งเลขเพื่อให้คำแนะนำที่ครบถ้วน",
            en: "In Thai numerology, each number carries specific energy. Phone numbers you use daily can influence the energy around you. TaThip analyzes both sum totals and digit positions for comprehensive guidance.",
          },
        },
        {
          q: {
            th: "เลขศาสตร์ไทยต่างจาก Pythagorean อย่างไร?",
            en: "How does Thai numerology differ from Pythagorean?",
          },
          a: {
            th: "Pythagorean เน้นการลดผลรวมเป็นเลขหลักเดียวและวิเคราะห์ตามความหมายสากล ส่วนเลขศาสตร์ไทยคำนึงถึงตำแหน่งของตัวเลข ความสัมพันธ์กับธาตุทั้ง 5 และอิทธิพลของดาวเคราะห์ตามโหราศาสตร์ไทย",
            en: "Pythagorean focuses on reducing sums to single digits with universal meanings. Thai เลขศาสตร์ considers digit positions, relationships with the Five Elements, and planetary influences from Thai astrology.",
          },
        },
      ]}
    />
  );
}
