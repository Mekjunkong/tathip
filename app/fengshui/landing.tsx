"use client";

import { SEOLanding } from "@/components/seo/seo-landing";

export function FengShuiLanding() {
  return (
    <SEOLanding
      heroImage="/images/chinese-astrology.webp"
      heroAlt="Feng Shui compass with Eight Mansions directional analysis"
      title={{
        th: "ฮวงจุ้ย (風水)",
        en: "Feng Shui (風水)",
      }}
      subtitle={{
        th: "คำนวณเลขกว้า ค้นหาทิศมงคลของคุณ",
        en: "Kua Number Calculator & Lucky Directions",
      }}
      description={{
        th: "ตาทิพย์คำนวณเลขกว้า (Kua Number) จากปีเกิดและเพศ วิเคราะห์ทิศมงคล 4 ทิศและทิศอัปมงคล 4 ทิศ ตามหลักปาจั๊กหรือแปดที่พักอาศัย (八宅) สำหรับจัดห้องนอน ห้องทำงาน และบ้านเพื่อเสริมโชคลาภ สุขภาพ และความรัก",
        en: "TaThip calculates your Kua Number from birth year and gender, analyzing 4 auspicious and 4 inauspicious directions using the Eight Mansions (八宅) system. Optimize your bedroom, office, and home layout for wealth, health, and relationships.",
      }}
      features={[
        {
          icon: "🧭",
          title: { th: "เลขกว้า (Kua Number)", en: "Kua Number" },
          description: {
            th: "เลขกว้าเป็นตัวเลขส่วนบุคคลที่คำนวณจากปีเกิดและเพศ กำหนดว่าคุณอยู่ในกลุ่มตะวันออกหรือตะวันตก และทิศใดเป็นทิศมงคลสำหรับคุณ",
            en: "Your Kua number is a personal number calculated from birth year and gender. It determines whether you belong to the East or West group, and which directions are auspicious for you.",
          },
        },
        {
          icon: "🏠",
          title: { th: "จัดบ้านเสริมดวง", en: "Home Layout" },
          description: {
            th: "ทราบว่าควรหันหัวเตียงไปทิศไหน วางโต๊ะทำงานหันทิศใด และห้องไหนในบ้านเป็นห้องมงคลที่สุดสำหรับคุณ",
            en: "Know which direction to face your bed, desk, and main entrance. Discover which rooms in your home carry the most positive energy for you.",
          },
        },
        {
          icon: "💼",
          title: { th: "ฮวงจุ้ยสำนักงาน", en: "Office Feng Shui" },
          description: {
            th: "จัดโต๊ะทำงาน เลือกทิศนั่งประชุม และวางตำแหน่งโต๊ะในออฟฟิศให้เสริมพลังความสำเร็จและโชคลาภในหน้าที่การงาน",
            en: "Arrange your desk, choose meeting seat positions, and optimize your office layout to enhance career success and wealth energy.",
          },
        },
        {
          icon: "⭐",
          title: { th: "4 ดาวมงคล", en: "4 Auspicious Stars" },
          description: {
            th: "เซิงชี่ (โชคลาภ), เทียนอี้ (สุขภาพ), เหยียนเหนียน (ความรัก), ฝูเว่ย (ความมั่นคง) — รู้จักดาวมงคลทั้ง 4 และทิศที่ดาวแต่ละดวงอยู่สำหรับคุณ",
            en: "Sheng Qi (Wealth), Tian Yi (Health), Yan Nian (Love), Fu Wei (Stability) — know all 4 auspicious stars and their directions specific to you.",
          },
        },
      ]}
      ctaLink="/chat"
      faq={[
        {
          q: {
            th: "ฮวงจุ้ยเกี่ยวข้องกับโหราศาสตร์อย่างไร?",
            en: "How does Feng Shui relate to astrology?",
          },
          a: {
            th: "ฮวงจุ้ยและโหราศาสตร์จีน (บาจื่อ) ใช้ระบบธาตุ 5 เหมือนกัน เลขกว้าจากฮวงจุ้ยสามารถผสมผสานกับธาตุจากบาจื่อเพื่อให้คำแนะนำที่แม่นยำยิ่งขึ้น ตาทิพย์สามารถวิเคราะห์ทั้ง 2 ระบบให้คุณพร้อมกัน",
            en: "Feng Shui and Chinese astrology (BaZi) share the Five Elements system. Your Kua number from Feng Shui can be combined with BaZi elements for more precise guidance. TaThip can analyze both systems together.",
          },
        },
        {
          q: {
            th: "ต้องรู้ทิศบ้านด้วยไหม?",
            en: "Do I need to know my house's facing direction?",
          },
          a: {
            th: "สำหรับการวิเคราะห์เบื้องต้นด้วยเลขกว้า ไม่จำเป็นต้องรู้ทิศบ้าน แค่ปีเกิดและเพศก็เพียงพอ แต่หากต้องการวิเคราะห์ Flying Star ขั้นสูง จะต้องทราบทิศหน้าบ้านด้วย",
            en: "For basic Kua number analysis, you don't need your house direction — just birth year and gender. For advanced Flying Star analysis, you'd need the house facing direction.",
          },
        },
        {
          q: {
            th: "ฮวงจุ้ยช่วยเรื่องอะไรได้บ้าง?",
            en: "What can Feng Shui help with?",
          },
          a: {
            th: "ฮวงจุ้ยช่วยจัดวางสิ่งแวดล้อมรอบตัวให้สอดคล้องกับพลังงานของคุณ เช่น ทิศหัวเตียงเพื่อนอนหลับดี ทิศโต๊ะทำงานเพื่อเสริมสมาธิ ทิศหน้าบ้านเพื่อรับโชคลาภ และการจัดห้องครัวเพื่อสุขภาพที่ดี",
            en: "Feng Shui helps align your environment with your personal energy — bed direction for better sleep, desk direction for focus, front door for wealth, and kitchen layout for health.",
          },
        },
      ]}
    />
  );
}
