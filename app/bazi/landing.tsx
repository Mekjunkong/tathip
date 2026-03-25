"use client";

import { SEOLanding } from "@/components/seo/seo-landing";

export function BaziLanding() {
  return (
    <SEOLanding
      heroImage="/images/chinese-astrology.webp"
      heroAlt="Chinese BaZi Four Pillars with Five Elements symbols"
      title={{
        th: "บาจื่อ (八字)",
        en: "BaZi (八字)",
      }}
      subtitle={{
        th: "ศาสตร์ 4 เสาแห่งชีวิต — ธาตุทั้ง 5",
        en: "Four Pillars of Destiny — Five Elements",
      }}
      description={{
        th: "ตาทิพย์คำนวณ 4 เสาแห่งชีวิต (ปี เดือน วัน ชั่วโมง) วิเคราะห์ธาตุทั้ง 5 (ดิน น้ำ ไฟ ไม้ ทอง) ความแข็งแกร่งของ Day Master และเสาโชคลาภ 10 ปี ด้วย AI",
        en: "TaThip calculates your Four Pillars (Year, Month, Day, Hour) and analyzes the Five Elements (Wood, Fire, Earth, Metal, Water), Day Master strength, and 10-year luck pillars with AI interpretation.",
      }}
      features={[
        {
          icon: "🏛️",
          title: { th: "4 เสาแห่งชีวิต", en: "Four Pillars" },
          description: {
            th: "คำนวณเสาปี เดือน วัน และชั่วโมง จากวันเกิดของคุณ แต่ละเสาประกอบด้วยราศีสวรรค์ (Heavenly Stem) และราศีโลก (Earthly Branch)",
            en: "Calculates your Year, Month, Day, and Hour pillars from your birth date. Each pillar consists of a Heavenly Stem and Earthly Branch pair.",
          },
        },
        {
          icon: "🔥",
          title: { th: "ธาตุทั้ง 5", en: "Five Elements" },
          description: {
            th: "วิเคราะห์สมดุลของธาตุ 5 (ดิน น้ำ ไฟ ไม้ ทอง) ในดวงชะตาของคุณ ธาตุที่ขาดหรือเกินส่งผลต่อบุคลิกภาพ สุขภาพ และโชคลาภ",
            en: "Analyzes the balance of Five Elements (Wood, Fire, Earth, Metal, Water) in your chart. Deficiencies or excesses affect personality, health, and fortune.",
          },
        },
        {
          icon: "👤",
          title: { th: "Day Master", en: "Day Master" },
          description: {
            th: "Day Master คือแก่นแท้ของตัวคุณ วิเคราะห์ความแข็งแกร่ง (Strong/Weak) เพื่อหาธาตุเสริมดวงและสิ่งที่ควรหลีกเลี่ยง",
            en: "Your Day Master represents your true self. Analyzes its strength (Strong/Weak) to determine favorable elements and what to avoid.",
          },
        },
        {
          icon: "📈",
          title: { th: "เสาโชคลาภ 10 ปี", en: "10-Year Luck Pillars" },
          description: {
            th: "ทำนายวงจรโชคลาภทุก 10 ปี เผยช่วงเวลาที่ดีที่สุดสำหรับการลงทุน ความรัก การเปลี่ยนงาน และการตัดสินใจสำคัญ",
            en: "Predicts 10-year luck cycles revealing the best periods for investments, relationships, career changes, and major life decisions.",
          },
        },
      ]}
      ctaLink="/chat"
      faq={[
        {
          q: {
            th: "บาจื่อคืออะไร?",
            en: "What is BaZi?",
          },
          a: {
            th: "บาจื่อ (八字 แปลว่า '8 ตัวอักษร') หรือ Four Pillars of Destiny เป็นโหราศาสตร์จีนโบราณที่ใช้วันเกิดและเวลาเกิดสร้าง 4 เสา (ปี เดือน วัน ชั่วโมง) แต่ละเสามี 2 ตัวอักษร รวมเป็น 8 ตัว ใช้วิเคราะห์ชะตาชีวิตทุกด้าน",
            en: "BaZi (八字, meaning '8 characters') or Four Pillars of Destiny is an ancient Chinese astrology system using your birth date and time to create 4 pillars (Year, Month, Day, Hour). Each pillar has 2 characters, totaling 8, used to analyze every aspect of life.",
          },
        },
        {
          q: {
            th: "ต้องรู้เวลาเกิดไหม?",
            en: "Do I need to know my birth time?",
          },
          a: {
            th: "เวลาเกิดจำเป็นสำหรับเสาชั่วโมง (Hour Pillar) ซึ่งเผยด้านบุคลิกภาพซ่อนเร้นและลูกหลาน หากไม่ทราบ ตาทิพย์จะวิเคราะห์จาก 3 เสาที่เหลือ ซึ่งยังให้ข้อมูลเชิงลึกที่มีคุณค่า",
            en: "Birth time is needed for the Hour Pillar, which reveals hidden personality and children aspects. Without it, TaThip analyzes from the remaining 3 pillars, which still provides valuable insights.",
          },
        },
        {
          q: {
            th: "บาจื่อกับโหราศาสตร์ไทยใช้ร่วมกันได้ไหม?",
            en: "Can BaZi be combined with Thai astrology?",
          },
          a: {
            th: "ได้ครับ! ตาทิพย์เป็นหนึ่งในไม่กี่ระบบที่ผสมผสานทั้ง 2 ศาสตร์ บาจื่อเน้นธาตุ 5 และวงจรโชคลาภ ส่วนโหราศาสตร์ไทยเน้นดาวเคราะห์และนักษัตร การใช้ร่วมกันให้ภาพที่ครบถ้วนกว่า",
            en: "Absolutely! TaThip is one of the few systems combining both. BaZi focuses on Five Elements and luck cycles, while Thai astrology emphasizes planets and nakshatras. Using both gives a more complete picture.",
          },
        },
      ]}
    />
  );
}
