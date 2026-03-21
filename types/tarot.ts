/**
 * Tarot card type definitions — 78-card Rider-Waite deck.
 *
 * Organized into Major Arcana (22) and Minor Arcana (56).
 * Each card has upright/reversed meanings in both Thai and English.
 */

export type TarotSuit = "wands" | "cups" | "swords" | "pentacles";
export type TarotArcana = "major" | "minor";

export interface TarotCard {
  id: string;
  name: string;
  nameThai: string;
  arcana: TarotArcana;
  suit?: TarotSuit;
  number: number;
  meaningUpright: string;
  meaningUprightThai: string;
  meaningReversed: string;
  meaningReversedThai: string;
  imageDescription: string;
  keywords: string[];
}

export interface DrawnCard {
  card: TarotCard;
  reversed: boolean;
  position?: string;
}

export interface TarotSpread {
  name: string;
  nameThai: string;
  cards: DrawnCard[];
  spreadType: "single" | "three-card" | "celtic-cross";
}

// ===== MAJOR ARCANA (22 cards) =====

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: "major-0",
    name: "The Fool",
    nameThai: "คนโง่",
    arcana: "major",
    number: 0,
    meaningUpright: "New beginnings, innocence, spontaneity, free spirit",
    meaningUprightThai: "การเริ่มต้นใหม่ ความไร้เดียงสา ความเป็นธรรมชาติ จิตวิญญาณอิสระ",
    meaningReversed: "Recklessness, risk-taking, held back, naivety",
    meaningReversedThai: "ความประมาท การเสี่ยง ถูกยับยั้ง ความไร้เดียงสาเกินไป",
    imageDescription: "A young person standing at the edge of a cliff, carrying a small bag, a white rose, and a small dog at their feet",
    keywords: ["beginnings", "freedom", "adventure"],
  },
  {
    id: "major-1",
    name: "The Magician",
    nameThai: "นักมายากล",
    arcana: "major",
    number: 1,
    meaningUpright: "Willpower, desire, creation, manifestation, resourcefulness",
    meaningUprightThai: "พลังใจ ความปรารถนา การสร้างสรรค์ การบรรลุเป้าหมาย ความมีไหวพริบ",
    meaningReversed: "Manipulation, poor planning, untapped talents",
    meaningReversedThai: "การหลอกลวง การวางแผนที่ไม่ดี พรสวรรค์ที่ยังไม่ได้ใช้",
    imageDescription: "A figure with one hand pointing to the sky and one to the ground, with the four suit symbols on a table before them",
    keywords: ["power", "skill", "concentration"],
  },
  {
    id: "major-2",
    name: "The High Priestess",
    nameThai: "นักบวชหญิงสูงศักดิ์",
    arcana: "major",
    number: 2,
    meaningUpright: "Intuition, sacred knowledge, divine feminine, the subconscious mind",
    meaningUprightThai: "สัญชาตญาณ ความรู้ศักดิ์สิทธิ์ พลังหญิง จิตใต้สำนึก",
    meaningReversed: "Secrets, withdrawal, silence, disconnected from intuition",
    meaningReversedThai: "ความลับ การถอนตัว ความเงียบ ขาดการเชื่อมต่อกับสัญชาตญาณ",
    imageDescription: "A serene woman seated between two pillars, holding a scroll, with a crescent moon at her feet",
    keywords: ["intuition", "mystery", "inner voice"],
  },
  {
    id: "major-3",
    name: "The Empress",
    nameThai: "จักรพรรดินี",
    arcana: "major",
    number: 3,
    meaningUpright: "Femininity, beauty, nature, nurturing, abundance",
    meaningUprightThai: "ความเป็นหญิง ความงาม ธรรมชาติ การเลี้ยงดู ความอุดมสมบูรณ์",
    meaningReversed: "Creative block, dependence, emptiness, smothering",
    meaningReversedThai: "ติดขัดในความคิดสร้างสรรค์ การพึ่งพา ความว่างเปล่า การปกป้องมากเกินไป",
    imageDescription: "A regal woman seated on a throne in a lush garden, wearing a crown of stars",
    keywords: ["abundance", "fertility", "nature"],
  },
  {
    id: "major-4",
    name: "The Emperor",
    nameThai: "จักรพรรดิ",
    arcana: "major",
    number: 4,
    meaningUpright: "Authority, structure, control, fatherhood, stability",
    meaningUprightThai: "อำนาจ โครงสร้าง การควบคุม ความเป็นพ่อ ความมั่นคง",
    meaningReversed: "Tyranny, rigidity, coldness, excessive control",
    meaningReversedThai: "เผด็จการ ความแข็งกระด้าง ความเย็นชา การควบคุมมากเกินไป",
    imageDescription: "A stern ruler seated on a stone throne decorated with ram heads, holding an ankh and orb",
    keywords: ["authority", "structure", "leadership"],
  },
  {
    id: "major-5",
    name: "The Hierophant",
    nameThai: "พระสันตะปาปา",
    arcana: "major",
    number: 5,
    meaningUpright: "Tradition, conformity, morality, ethics, spiritual wisdom",
    meaningUprightThai: "ประเพณี ความสอดคล้อง ศีลธรรม จริยธรรม ปัญญาทางจิตวิญญาณ",
    meaningReversed: "Rebellion, subversiveness, new approaches, personal beliefs",
    meaningReversedThai: "การกบฏ การล้มล้าง แนวทางใหม่ ความเชื่อส่วนตัว",
    imageDescription: "A religious figure seated between two pillars, raising one hand in blessing, with two followers kneeling before him",
    keywords: ["tradition", "teaching", "guidance"],
  },
  {
    id: "major-6",
    name: "The Lovers",
    nameThai: "คู่รัก",
    arcana: "major",
    number: 6,
    meaningUpright: "Love, harmony, relationships, values alignment, choices",
    meaningUprightThai: "ความรัก ความกลมกลืน ความสัมพันธ์ ค่านิยมที่สอดคล้อง ทางเลือก",
    meaningReversed: "Imbalance, misalignment of values, disharmony",
    meaningReversedThai: "ความไม่สมดุล ค่านิยมที่ไม่สอดคล้อง ความไม่กลมกลืน",
    imageDescription: "A man and woman standing beneath an angel, with the Tree of Knowledge and Tree of Life behind them",
    keywords: ["love", "union", "choices"],
  },
  {
    id: "major-7",
    name: "The Chariot",
    nameThai: "รถศึก",
    arcana: "major",
    number: 7,
    meaningUpright: "Control, willpower, success, action, determination",
    meaningUprightThai: "การควบคุม พลังใจ ความสำเร็จ การกระทำ ความมุ่งมั่น",
    meaningReversed: "Aggression, lack of direction, obstacles, lack of willpower",
    meaningReversedThai: "ความก้าวร้าว ขาดทิศทาง อุปสรรค ขาดพลังใจ",
    imageDescription: "A warrior riding a chariot pulled by two sphinxes, one black and one white",
    keywords: ["victory", "determination", "control"],
  },
  {
    id: "major-8",
    name: "Strength",
    nameThai: "พลัง",
    arcana: "major",
    number: 8,
    meaningUpright: "Inner strength, bravery, compassion, focus, patience",
    meaningUprightThai: "พลังภายใน ความกล้าหาญ ความเมตตา สมาธิ ความอดทน",
    meaningReversed: "Self-doubt, weakness, insecurity, raw emotion",
    meaningReversedThai: "ความสงสัยในตัวเอง ความอ่อนแอ ความไม่มั่นใจ อารมณ์ดิบ",
    imageDescription: "A woman gently closing the mouth of a lion, with an infinity symbol above her head",
    keywords: ["courage", "patience", "compassion"],
  },
  {
    id: "major-9",
    name: "The Hermit",
    nameThai: "ฤๅษี",
    arcana: "major",
    number: 9,
    meaningUpright: "Soul-searching, introspection, being alone, inner guidance",
    meaningUprightThai: "การค้นหาจิตวิญญาณ การพิจารณาตนเอง การอยู่คนเดียว การนำทางภายใน",
    meaningReversed: "Isolation, loneliness, withdrawal, lost",
    meaningReversedThai: "การแยกตัว ความเหงา การถอนตัว หลงทาง",
    imageDescription: "An old man standing on a mountain peak, holding a lantern with a star inside",
    keywords: ["wisdom", "solitude", "guidance"],
  },
  {
    id: "major-10",
    name: "Wheel of Fortune",
    nameThai: "วงล้อแห่งโชคชะตา",
    arcana: "major",
    number: 10,
    meaningUpright: "Good luck, karma, life cycles, destiny, a turning point",
    meaningUprightThai: "โชคดี กรรม วัฏจักรชีวิต ชะตากรรม จุดเปลี่ยน",
    meaningReversed: "Bad luck, resistance to change, breaking cycles",
    meaningReversedThai: "โชคร้าย การต่อต้านการเปลี่ยนแปลง การทำลายวัฏจักร",
    imageDescription: "A great wheel with mystical symbols, surrounded by four winged creatures",
    keywords: ["fate", "change", "cycles"],
  },
  {
    id: "major-11",
    name: "Justice",
    nameThai: "ความยุติธรรม",
    arcana: "major",
    number: 11,
    meaningUpright: "Justice, fairness, truth, cause and effect, law",
    meaningUprightThai: "ความยุติธรรม ความเป็นธรรม ความจริง เหตุและผล กฎหมาย",
    meaningReversed: "Unfairness, lack of accountability, dishonesty",
    meaningReversedThai: "ความไม่เป็นธรรม ขาดความรับผิดชอบ ความไม่ซื่อสัตย์",
    imageDescription: "A figure seated between two pillars, holding a sword in one hand and scales in the other",
    keywords: ["truth", "balance", "karma"],
  },
  {
    id: "major-12",
    name: "The Hanged Man",
    nameThai: "ชายห้อยหัว",
    arcana: "major",
    number: 12,
    meaningUpright: "Pause, surrender, letting go, new perspectives",
    meaningUprightThai: "การหยุดชั่วคราว การยอมจำนน การปล่อยวาง มุมมองใหม่",
    meaningReversed: "Delays, resistance, stalling, indecision",
    meaningReversedThai: "ความล่าช้า การต่อต้าน การยืดเยื้อ ความไม่แน่ใจ",
    imageDescription: "A man hanging upside down from a tree by one foot, with a serene expression and a halo",
    keywords: ["sacrifice", "perspective", "waiting"],
  },
  {
    id: "major-13",
    name: "Death",
    nameThai: "ความตาย",
    arcana: "major",
    number: 13,
    meaningUpright: "Endings, change, transformation, transition",
    meaningUprightThai: "การสิ้นสุด การเปลี่ยนแปลง การเปลี่ยนรูป การเปลี่ยนผ่าน",
    meaningReversed: "Resistance to change, personal transformation delayed, stagnation",
    meaningReversedThai: "การต่อต้านการเปลี่ยนแปลง การเปลี่ยนแปลงส่วนตัวถูกเลื่อน ความหยุดนิ่ง",
    imageDescription: "A skeleton knight on a white horse, with figures of all ages before him",
    keywords: ["transformation", "endings", "renewal"],
  },
  {
    id: "major-14",
    name: "Temperance",
    nameThai: "ความพอดี",
    arcana: "major",
    number: 14,
    meaningUpright: "Balance, moderation, patience, purpose, meaning",
    meaningUprightThai: "ความสมดุล ความพอประมาณ ความอดทน จุดมุ่งหมาย ความหมาย",
    meaningReversed: "Imbalance, excess, self-healing, re-alignment needed",
    meaningReversedThai: "ความไม่สมดุล ความเกินพอดี การเยียวยาตนเอง ต้องปรับสมดุลใหม่",
    imageDescription: "An angel pouring water between two cups, standing with one foot on land and one in water",
    keywords: ["balance", "patience", "moderation"],
  },
  {
    id: "major-15",
    name: "The Devil",
    nameThai: "ปีศาจ",
    arcana: "major",
    number: 15,
    meaningUpright: "Shadow self, attachment, addiction, restriction, sexuality",
    meaningUprightThai: "ด้านมืดของตัวเอง ความยึดติด การเสพติด ข้อจำกัด เรื่องเพศ",
    meaningReversed: "Releasing limiting beliefs, exploring dark thoughts, detachment",
    meaningReversedThai: "การปล่อยความเชื่อที่จำกัด การสำรวจความคิดมืด การปล่อยวาง",
    imageDescription: "A horned devil figure seated on a pedestal, with two chained figures below",
    keywords: ["bondage", "temptation", "shadow"],
  },
  {
    id: "major-16",
    name: "The Tower",
    nameThai: "หอคอย",
    arcana: "major",
    number: 16,
    meaningUpright: "Sudden change, upheaval, chaos, revelation, awakening",
    meaningUprightThai: "การเปลี่ยนแปลงกะทันหัน ความปั่นป่วน ความโกลาหล การเปิดเผย การตื่นรู้",
    meaningReversed: "Personal transformation, fear of change, averting disaster",
    meaningReversedThai: "การเปลี่ยนแปลงส่วนตัว ความกลัวการเปลี่ยนแปลง การหลีกเลี่ยงหายนะ",
    imageDescription: "A tall tower struck by lightning, with flames and figures falling from it",
    keywords: ["upheaval", "revelation", "awakening"],
  },
  {
    id: "major-17",
    name: "The Star",
    nameThai: "ดวงดาว",
    arcana: "major",
    number: 17,
    meaningUpright: "Hope, faith, purpose, renewal, spirituality",
    meaningUprightThai: "ความหวัง ศรัทธา จุดมุ่งหมาย การฟื้นฟู จิตวิญญาณ",
    meaningReversed: "Lack of faith, despair, discouragement, insecurity",
    meaningReversedThai: "ขาดศรัทธา ความสิ้นหวัง ความท้อแท้ ความไม่มั่นคง",
    imageDescription: "A naked woman kneeling by a pool, pouring water with one hand on land and one into the water, with eight stars above",
    keywords: ["hope", "inspiration", "serenity"],
  },
  {
    id: "major-18",
    name: "The Moon",
    nameThai: "พระจันทร์",
    arcana: "major",
    number: 18,
    meaningUpright: "Illusion, fear, anxiety, subconscious, intuition",
    meaningUprightThai: "ภาพลวงตา ความกลัว ความวิตกกังวล จิตใต้สำนึก สัญชาตญาณ",
    meaningReversed: "Release of fear, repressed emotion, inner confusion clearing",
    meaningReversedThai: "การปลดปล่อยความกลัว อารมณ์ที่ถูกกดทับ ความสับสนภายในหายไป",
    imageDescription: "A full moon between two towers, with a dog, a wolf, and a crayfish emerging from water",
    keywords: ["illusion", "intuition", "subconscious"],
  },
  {
    id: "major-19",
    name: "The Sun",
    nameThai: "พระอาทิตย์",
    arcana: "major",
    number: 19,
    meaningUpright: "Positivity, fun, warmth, success, vitality",
    meaningUprightThai: "ความเป็นบวก ความสนุก ความอบอุ่น ความสำเร็จ พลังชีวิต",
    meaningReversed: "Inner child issues, feeling down, overly optimistic",
    meaningReversedThai: "ปัญหาเด็กภายใน ความรู้สึกหดหู่ มองโลกในแง่ดีเกินไป",
    imageDescription: "A bright sun shining over a garden wall, with a joyful child riding a white horse",
    keywords: ["joy", "success", "vitality"],
  },
  {
    id: "major-20",
    name: "Judgement",
    nameThai: "การพิพากษา",
    arcana: "major",
    number: 20,
    meaningUpright: "Judgement, rebirth, inner calling, absolution",
    meaningUprightThai: "การตัดสิน การเกิดใหม่ เสียงเรียกภายใน การอภัย",
    meaningReversed: "Self-doubt, refusal of self-examination, ignoring the call",
    meaningReversedThai: "ความสงสัยในตนเอง การปฏิเสธการตรวจสอบตนเอง การเพิกเฉยต่อเสียงเรียก",
    imageDescription: "An angel blowing a trumpet above rising figures, with mountains and sea below",
    keywords: ["rebirth", "calling", "reckoning"],
  },
  {
    id: "major-21",
    name: "The World",
    nameThai: "โลก",
    arcana: "major",
    number: 21,
    meaningUpright: "Completion, integration, accomplishment, travel, wholeness",
    meaningUprightThai: "ความสมบูรณ์ การรวมเป็นหนึ่ง ความสำเร็จ การเดินทาง ความครบถ้วน",
    meaningReversed: "Seeking personal closure, short-cuts, delays in completion",
    meaningReversedThai: "การค้นหาการปิดบัญชีส่วนตัว ทางลัด ความล่าช้าในการสำเร็จ",
    imageDescription: "A dancing figure inside a wreath, surrounded by four creatures representing the fixed zodiac signs",
    keywords: ["completion", "achievement", "wholeness"],
  },
];

// ===== MINOR ARCANA — Helper to generate all 56 cards =====

interface MinorCardTemplate {
  name: string;
  nameThai: string;
  meaningUpright: string;
  meaningUprightThai: string;
  meaningReversed: string;
  meaningReversedThai: string;
  keywords: string[];
}

const SUIT_INFO: Record<TarotSuit, { en: string; th: string; element: string }> = {
  wands: { en: "Wands", th: "ไม้เท้า", element: "Fire" },
  cups: { en: "Cups", th: "ถ้วย", element: "Water" },
  swords: { en: "Swords", th: "ดาบ", element: "Air" },
  pentacles: { en: "Pentacles", th: "เหรียญ", element: "Earth" },
};

const COURT_NAMES = [
  { en: "Page", th: "เพจ", num: 11 },
  { en: "Knight", th: "อัศวิน", num: 12 },
  { en: "Queen", th: "ราชินี", num: 13 },
  { en: "King", th: "ราชา", num: 14 },
];

// Minor arcana numbered card meanings (Ace through Ten) for each suit
const MINOR_TEMPLATES: Record<TarotSuit, MinorCardTemplate[]> = {
  wands: [
    { name: "Ace of Wands", nameThai: "เอซไม้เท้า", meaningUpright: "Inspiration, new opportunities, growth, potential", meaningUprightThai: "แรงบันดาลใจ โอกาสใหม่ การเติบโต ศักยภาพ", meaningReversed: "Delays, lack of motivation, weighed down", meaningReversedThai: "ความล่าช้า ขาดแรงจูงใจ ถูกถ่วง", keywords: ["inspiration", "potential"] },
    { name: "Two of Wands", nameThai: "ไม้เท้าสอง", meaningUpright: "Future planning, progress, decisions, discovery", meaningUprightThai: "การวางแผนอนาคต ความก้าวหน้า การตัดสินใจ การค้นพบ", meaningReversed: "Fear of unknown, lack of planning", meaningReversedThai: "กลัวสิ่งที่ไม่รู้ ขาดการวางแผน", keywords: ["planning", "decisions"] },
    { name: "Three of Wands", nameThai: "ไม้เท้าสาม", meaningUpright: "Expansion, foresight, overseas opportunities", meaningUprightThai: "การขยาย วิสัยทัศน์ โอกาสต่างประเทศ", meaningReversed: "Obstacles, delays, frustration", meaningReversedThai: "อุปสรรค ความล่าช้า ความหงุดหงิด", keywords: ["expansion", "foresight"] },
    { name: "Four of Wands", nameThai: "ไม้เท้าสี่", meaningUpright: "Celebration, harmony, marriage, home, community", meaningUprightThai: "การเฉลิมฉลอง ความกลมกลืน การแต่งงาน บ้าน ชุมชน", meaningReversed: "Lack of support, instability, feeling unwelcome", meaningReversedThai: "ขาดการสนับสนุน ไม่มั่นคง รู้สึกไม่เป็นที่ต้อนรับ", keywords: ["celebration", "harmony"] },
    { name: "Five of Wands", nameThai: "ไม้เท้าห้า", meaningUpright: "Conflict, disagreements, competition, tension", meaningUprightThai: "ความขัดแย้ง ความไม่เห็นด้วย การแข่งขัน ความตึงเครียด", meaningReversed: "Avoiding conflict, inner conflict, peace after storm", meaningReversedThai: "หลีกเลี่ยงความขัดแย้ง ความขัดแย้งภายใน สงบหลังพายุ", keywords: ["conflict", "competition"] },
    { name: "Six of Wands", nameThai: "ไม้เท้าหก", meaningUpright: "Success, public recognition, progress, self-confidence", meaningUprightThai: "ความสำเร็จ การยอมรับจากสาธารณะ ความก้าวหน้า ความมั่นใจ", meaningReversed: "Ego, fall from grace, excess pride", meaningReversedThai: "อีโก้ ตกจากความสำเร็จ ความภูมิใจเกินไป", keywords: ["victory", "recognition"] },
    { name: "Seven of Wands", nameThai: "ไม้เท้าเจ็ด", meaningUpright: "Challenge, competition, perseverance, defending beliefs", meaningUprightThai: "ความท้าทาย การแข่งขัน ความเพียร การปกป้องความเชื่อ", meaningReversed: "Overwhelmed, giving up, exhaustion", meaningReversedThai: "ท่วมท้น ยอมแพ้ หมดแรง", keywords: ["perseverance", "defense"] },
    { name: "Eight of Wands", nameThai: "ไม้เท้าแปด", meaningUpright: "Speed, action, air travel, movement, swift change", meaningUprightThai: "ความเร็ว การกระทำ การเดินทาง การเคลื่อนไหว การเปลี่ยนแปลงรวดเร็ว", meaningReversed: "Delays, frustration, holding off, internal alignment needed", meaningReversedThai: "ความล่าช้า ความหงุดหงิด การรอ ต้องปรับภายใน", keywords: ["speed", "movement"] },
    { name: "Nine of Wands", nameThai: "ไม้เท้าเก้า", meaningUpright: "Resilience, grit, last stand, persistence, test of faith", meaningUprightThai: "ความยืดหยุ่น ความแกร่ง การยืนหยัดครั้งสุดท้าย ความมุ่งมั่น บททดสอบศรัทธา", meaningReversed: "Exhaustion, fatigue, defensiveness, paranoia", meaningReversedThai: "ความเหนื่อยล้า อ่อนเพลีย การตั้งรับ หวาดระแวง", keywords: ["resilience", "persistence"] },
    { name: "Ten of Wands", nameThai: "ไม้เท้าสิบ", meaningUpright: "Burden, extra responsibility, hard work, completion", meaningUprightThai: "ภาระ ความรับผิดชอบพิเศษ การทำงานหนัก ความสำเร็จ", meaningReversed: "Unable to delegate, overstressed, burnt out", meaningReversedThai: "ไม่สามารถมอบหมายงาน เครียดมากเกินไป หมดไฟ", keywords: ["burden", "responsibility"] },
    { name: "Page of Wands", nameThai: "เพจไม้เท้า", meaningUpright: "Inspiration, ideas, discovery, limitless potential, free spirit", meaningUprightThai: "แรงบันดาลใจ ความคิด การค้นพบ ศักยภาพไร้ขีดจำกัด จิตวิญญาณอิสระ", meaningReversed: "Newly formed ideas, redirecting energy, self-limiting", meaningReversedThai: "ความคิดที่เพิ่งเกิด เปลี่ยนทิศทางพลังงาน จำกัดตนเอง", keywords: ["exploration", "discovery"] },
    { name: "Knight of Wands", nameThai: "อัศวินไม้เท้า", meaningUpright: "Energy, passion, inspired action, adventure, impulsiveness", meaningUprightThai: "พลังงาน ความหลงใหล การกระทำจากแรงบันดาลใจ การผจญภัย ความหุนหันพลันแล่น", meaningReversed: "Passion project without follow-through, haste, scattered energy", meaningReversedThai: "โปรเจกต์ที่ทำไม่เสร็จ ความเร่งรีบ พลังงานกระจาย", keywords: ["adventure", "passion"] },
    { name: "Queen of Wands", nameThai: "ราชินีไม้เท้า", meaningUpright: "Courage, confidence, independence, social butterfly, determination", meaningUprightThai: "ความกล้าหาญ ความมั่นใจ ความเป็นอิสระ ชอบเข้าสังคม ความมุ่งมั่น", meaningReversed: "Self-respect issues, jealousy, selfish, demanding", meaningReversedThai: "ปัญหาเรื่องการเคารพตนเอง ความอิจฉา เห็นแก่ตัว เรียกร้อง", keywords: ["confidence", "independence"] },
    { name: "King of Wands", nameThai: "ราชาไม้เท้า", meaningUpright: "Natural leader, vision, entrepreneur, honour, big picture", meaningUprightThai: "ผู้นำโดยธรรมชาติ วิสัยทัศน์ ผู้ประกอบการ เกียรติ ภาพรวม", meaningReversed: "Impulsive, overbearing, unachievable expectations, haste", meaningReversedThai: "หุนหันพลันแล่น เผด็จการ ความคาดหวังที่ทำไม่ได้ เร่งรีบ", keywords: ["leadership", "vision"] },
  ],
  cups: [
    { name: "Ace of Cups", nameThai: "เอซถ้วย", meaningUpright: "Love, new feelings, emotional awakening, creativity", meaningUprightThai: "ความรัก ความรู้สึกใหม่ การตื่นรู้ทางอารมณ์ ความคิดสร้างสรรค์", meaningReversed: "Emotional loss, blocked creativity, emptiness", meaningReversedThai: "การสูญเสียทางอารมณ์ ความคิดสร้างสรรค์ถูกปิดกั้น ความว่างเปล่า", keywords: ["love", "emotion"] },
    { name: "Two of Cups", nameThai: "ถ้วยสอง", meaningUpright: "Unified love, partnership, mutual attraction, connection", meaningUprightThai: "ความรักที่เป็นหนึ่งเดียว ความเป็นหุ้นส่วน ความดึงดูดซึ่งกันและกัน ความเชื่อมโยง", meaningReversed: "Self-love, break-ups, disharmony, distrust", meaningReversedThai: "ความรักตัวเอง การเลิกรา ความไม่กลมกลืน ความไม่ไว้ใจ", keywords: ["partnership", "connection"] },
    { name: "Three of Cups", nameThai: "ถ้วยสาม", meaningUpright: "Celebration, friendship, creativity, collaborations", meaningUprightThai: "การเฉลิมฉลอง มิตรภาพ ความคิดสร้างสรรค์ ความร่วมมือ", meaningReversed: "Overindulgence, gossip, isolation", meaningReversedThai: "การหลงระเริงเกินไป ซุบซิบ ความโดดเดี่ยว", keywords: ["friendship", "celebration"] },
    { name: "Four of Cups", nameThai: "ถ้วยสี่", meaningUpright: "Meditation, contemplation, apathy, reevaluation", meaningUprightThai: "สมาธิ การไตร่ตรอง ความเฉยเมย การประเมินใหม่", meaningReversed: "Retreat, withdrawal, checking in with yourself", meaningReversedThai: "การถอยกลับ การถอนตัว การตรวจสอบตัวเอง", keywords: ["contemplation", "apathy"] },
    { name: "Five of Cups", nameThai: "ถ้วยห้า", meaningUpright: "Regret, failure, disappointment, pessimism, grief", meaningUprightThai: "ความเสียใจ ความล้มเหลว ความผิดหวัง การมองโลกในแง่ร้าย ความเศร้า", meaningReversed: "Personal setbacks, self-forgiveness, moving on", meaningReversedThai: "ความพ่ายแพ้ส่วนตัว การให้อภัยตัวเอง การก้าวต่อไป", keywords: ["loss", "grief"] },
    { name: "Six of Cups", nameThai: "ถ้วยหก", meaningUpright: "Revisiting the past, childhood memories, innocence, joy", meaningUprightThai: "การทบทวนอดีต ความทรงจำวัยเด็ก ความไร้เดียงสา ความสุข", meaningReversed: "Living in the past, forgiveness, lacking playfulness", meaningReversedThai: "มีชีวิตอยู่ในอดีต การให้อภัย ขาดความสนุกสนาน", keywords: ["nostalgia", "innocence"] },
    { name: "Seven of Cups", nameThai: "ถ้วยเจ็ด", meaningUpright: "Opportunities, choices, wishful thinking, illusion", meaningUprightThai: "โอกาส ทางเลือก ความคิดฝัน ภาพลวงตา", meaningReversed: "Alignment, personal values, being overwhelmed by choices", meaningReversedThai: "ความสอดคล้อง ค่านิยมส่วนตัว ท่วมท้นจากทางเลือก", keywords: ["choices", "illusion"] },
    { name: "Eight of Cups", nameThai: "ถ้วยแปด", meaningUpright: "Disappointment, abandonment, withdrawal, escapism", meaningUprightThai: "ความผิดหวัง การละทิ้ง การถอนตัว การหลีกหนี", meaningReversed: "Trying one more time, indecision, aimless drifting", meaningReversedThai: "ลองอีกครั้ง ความไม่แน่ใจ เร่ร่อนไม่มีจุดหมาย", keywords: ["walking away", "searching"] },
    { name: "Nine of Cups", nameThai: "ถ้วยเก้า", meaningUpright: "Contentment, satisfaction, gratitude, wish fulfilled", meaningUprightThai: "ความพอใจ ความพึงพอใจ ความกตัญญู ความปรารถนาสำเร็จ", meaningReversed: "Inner happiness, materialism, dissatisfaction", meaningReversedThai: "ความสุขภายใน วัตถุนิยม ความไม่พอใจ", keywords: ["wishes", "satisfaction"] },
    { name: "Ten of Cups", nameThai: "ถ้วยสิบ", meaningUpright: "Happiness, harmony, alignment, family, fulfilment", meaningUprightThai: "ความสุข ความกลมกลืน ความสอดคล้อง ครอบครัว ความสมหวัง", meaningReversed: "Broken home, domestic conflict, disharmony", meaningReversedThai: "ครอบครัวแตกแยก ความขัดแย้งในบ้าน ความไม่กลมกลืน", keywords: ["family", "fulfilment"] },
    { name: "Page of Cups", nameThai: "เพจถ้วย", meaningUpright: "Creative opportunity, intuitive messages, curiosity, possibility", meaningUprightThai: "โอกาสสร้างสรรค์ ข้อความจากสัญชาตญาณ ความอยากรู้ ความเป็นไปได้", meaningReversed: "New idea that may not work, emotional immaturity", meaningReversedThai: "ไอเดียใหม่ที่อาจไม่ได้ผล ความไม่เป็นผู้ใหญ่ทางอารมณ์", keywords: ["creativity", "curiosity"] },
    { name: "Knight of Cups", nameThai: "อัศวินถ้วย", meaningUpright: "Creativity, romance, charm, imagination, beauty", meaningUprightThai: "ความคิดสร้างสรรค์ ความโรแมนติก เสน่ห์ จินตนาการ ความงาม", meaningReversed: "Overactive imagination, unrealistic, jealousy, moodiness", meaningReversedThai: "จินตนาการมากเกินไป ไม่สมจริง ความอิจฉา อารมณ์แปรปรวน", keywords: ["romance", "charm"] },
    { name: "Queen of Cups", nameThai: "ราชินีถ้วย", meaningUpright: "Compassionate, caring, emotionally stable, intuitive, in flow", meaningUprightThai: "เมตตากรุณา ห่วงใย มั่นคงทางอารมณ์ มีสัญชาตญาณ ลื่นไหล", meaningReversed: "Inner feelings, self-care, self-love, co-dependency", meaningReversedThai: "ความรู้สึกภายใน การดูแลตัวเอง ความรักตัวเอง การพึ่งพาซึ่งกันและกัน", keywords: ["compassion", "intuition"] },
    { name: "King of Cups", nameThai: "ราชาถ้วย", meaningUpright: "Emotionally balanced, compassionate, diplomatic, calm", meaningUprightThai: "สมดุลทางอารมณ์ มีเมตตา มีไหวพริบ สงบ", meaningReversed: "Emotionally manipulative, moody, withdrawn", meaningReversedThai: "ปั่นอารมณ์ อารมณ์แปรปรวน เก็บตัว", keywords: ["balance", "diplomacy"] },
  ],
  swords: [
    { name: "Ace of Swords", nameThai: "เอซดาบ", meaningUpright: "Breakthrough, clarity, sharp mind, truth, new idea", meaningUprightThai: "ความก้าวหน้าครั้งใหญ่ ความชัดเจน จิตใจเฉียบแหลม ความจริง ไอเดียใหม่", meaningReversed: "Inner clarity needed, re-thinking an idea, clouded judgement", meaningReversedThai: "ต้องการความชัดเจนภายใน คิดใหม่ การตัดสินใจที่ขุ่นมัว", keywords: ["clarity", "truth"] },
    { name: "Two of Swords", nameThai: "ดาบสอง", meaningUpright: "Difficult decisions, weighing options, stalemate, avoidance", meaningUprightThai: "การตัดสินใจที่ยาก ชั่งน้ำหนักทางเลือก ทางตัน การหลีกเลี่ยง", meaningReversed: "Indecision, confusion, information overload", meaningReversedThai: "ความไม่แน่ใจ ความสับสน ข้อมูลท่วมท้น", keywords: ["decisions", "stalemate"] },
    { name: "Three of Swords", nameThai: "ดาบสาม", meaningUpright: "Heartbreak, emotional pain, sorrow, grief, hurt", meaningUprightThai: "อกหัก ความเจ็บปวดทางอารมณ์ ความเศร้า ความทุกข์ ความเจ็บ", meaningReversed: "Recovery, forgiveness, moving on, releasing pain", meaningReversedThai: "การฟื้นตัว การให้อภัย การก้าวต่อไป การปลดปล่อยความเจ็บปวด", keywords: ["heartbreak", "sorrow"] },
    { name: "Four of Swords", nameThai: "ดาบสี่", meaningUpright: "Rest, relaxation, meditation, contemplation, recuperation", meaningUprightThai: "การพักผ่อน การผ่อนคลาย สมาธิ การไตร่ตรอง การพักฟื้น", meaningReversed: "Exhaustion, burnout, needing rest, restlessness", meaningReversedThai: "ความเหนื่อยล้า หมดไฟ ต้องการพักผ่อน กระสับกระส่าย", keywords: ["rest", "recovery"] },
    { name: "Five of Swords", nameThai: "ดาบห้า", meaningUpright: "Conflict, disagreements, competition, defeat, winning at all costs", meaningUprightThai: "ความขัดแย้ง ความไม่เห็นด้วย การแข่งขัน ความพ่ายแพ้ ชนะไม่ว่าจะอย่างไร", meaningReversed: "Reconciliation, making amends, past resentment", meaningReversedThai: "การคืนดี การชดเชย ความแค้นในอดีต", keywords: ["conflict", "defeat"] },
    { name: "Six of Swords", nameThai: "ดาบหก", meaningUpright: "Transition, change, rite of passage, releasing baggage", meaningUprightThai: "การเปลี่ยนผ่าน การเปลี่ยนแปลง พิธีกรรมแห่งการผ่าน การปล่อยวางภาระ", meaningReversed: "Personal transition, resistance to change, unfinished business", meaningReversedThai: "การเปลี่ยนผ่านส่วนตัว การต่อต้านการเปลี่ยนแปลง ธุระที่ยังไม่เสร็จ", keywords: ["transition", "moving on"] },
    { name: "Seven of Swords", nameThai: "ดาบเจ็ด", meaningUpright: "Deception, trickery, tactics, strategy, resourcefulness", meaningUprightThai: "การหลอกลวง เล่ห์เหลี่ยม กลยุทธ์ ยุทธศาสตร์ ความมีไหวพริบ", meaningReversed: "Coming clean, rethinking approach, confession", meaningReversedThai: "เปิดเผยความจริง คิดใหม่ การสารภาพ", keywords: ["deception", "strategy"] },
    { name: "Eight of Swords", nameThai: "ดาบแปด", meaningUpright: "Imprisonment, entrapment, self-victimization, restriction", meaningUprightThai: "การถูกจองจำ การติดกับดัก การทำตัวเป็นเหยื่อ ข้อจำกัด", meaningReversed: "Self-acceptance, new perspective, freedom", meaningReversedThai: "การยอมรับตัวเอง มุมมองใหม่ อิสรภาพ", keywords: ["restriction", "self-imposed"] },
    { name: "Nine of Swords", nameThai: "ดาบเก้า", meaningUpright: "Anxiety, worry, fear, depression, nightmares", meaningUprightThai: "ความวิตกกังวล ความกังวล ความกลัว ความซึมเศร้า ฝันร้าย", meaningReversed: "Inner turmoil, deep-seated fears, releasing worry", meaningReversedThai: "ความวุ่นวายภายใน ความกลัวที่ฝังลึก การปล่อยความกังวล", keywords: ["anxiety", "worry"] },
    { name: "Ten of Swords", nameThai: "ดาบสิบ", meaningUpright: "Painful endings, deep wounds, betrayal, loss, crisis", meaningUprightThai: "จุดจบที่เจ็บปวด บาดแผลลึก การทรยศ การสูญเสีย วิกฤต", meaningReversed: "Recovery, regeneration, resisting an inevitable end", meaningReversedThai: "การฟื้นตัว การเกิดใหม่ การต่อต้านจุดจบที่หลีกเลี่ยงไม่ได้", keywords: ["endings", "rock bottom"] },
    { name: "Page of Swords", nameThai: "เพจดาบ", meaningUpright: "New ideas, curiosity, thirst for knowledge, communication", meaningUprightThai: "ไอเดียใหม่ ความอยากรู้ กระหายความรู้ การสื่อสาร", meaningReversed: "Self-expression, all talk no action, haste", meaningReversedThai: "การแสดงออก พูดไม่ทำ ความเร่งรีบ", keywords: ["curiosity", "communication"] },
    { name: "Knight of Swords", nameThai: "อัศวินดาบ", meaningUpright: "Ambitious, action-oriented, driven to succeed, fast-thinking", meaningUprightThai: "มีความทะเยอทะยาน มุ่งเน้นการกระทำ มุ่งมั่นสู่ความสำเร็จ คิดเร็ว", meaningReversed: "Restless, unfocused, no direction, burnout", meaningReversedThai: "กระสับกระส่าย ไม่มีจุดสนใจ ไม่มีทิศทาง หมดไฟ", keywords: ["ambition", "action"] },
    { name: "Queen of Swords", nameThai: "ราชินีดาบ", meaningUpright: "Independent, unbiased judgement, clear boundaries, direct communication", meaningUprightThai: "เป็นอิสระ การตัดสินที่ไม่ลำเอียง ขอบเขตชัดเจน การสื่อสารตรง", meaningReversed: "Overly emotional, easily influenced, cold-hearted", meaningReversedThai: "อารมณ์มากเกินไป ถูกชักจูงง่าย ใจเย็นชา", keywords: ["independence", "clarity"] },
    { name: "King of Swords", nameThai: "ราชาดาบ", meaningUpright: "Intellectual power, authority, truth, clear thinking", meaningUprightThai: "อำนาจทางปัญญา อำนาจ ความจริง การคิดชัดเจน", meaningReversed: "Quiet power, inner truth, misuse of power, manipulation", meaningReversedThai: "อำนาจเงียบ ความจริงภายใน การใช้อำนาจผิด การปั่น", keywords: ["authority", "intellect"] },
  ],
  pentacles: [
    { name: "Ace of Pentacles", nameThai: "เอซเหรียญ", meaningUpright: "New financial opportunity, prosperity, abundance, security", meaningUprightThai: "โอกาสทางการเงินใหม่ ความเจริญรุ่งเรือง ความอุดมสมบูรณ์ ความมั่นคง", meaningReversed: "Lost opportunity, lack of planning, scarcity mindset", meaningReversedThai: "โอกาสที่สูญเสีย ขาดการวางแผน ทัศนคติแห่งความขาดแคลน", keywords: ["prosperity", "opportunity"] },
    { name: "Two of Pentacles", nameThai: "เหรียญสอง", meaningUpright: "Multiple priorities, time management, flexibility, adaptability", meaningUprightThai: "หลายสิ่งสำคัญ การจัดการเวลา ความยืดหยุ่น ความสามารถในการปรับตัว", meaningReversed: "Over-committed, disorganization, overwhelmed", meaningReversedThai: "รับภาระมากเกินไป ไม่เป็นระเบียบ ท่วมท้น", keywords: ["balance", "flexibility"] },
    { name: "Three of Pentacles", nameThai: "เหรียญสาม", meaningUpright: "Teamwork, collaboration, learning, implementation", meaningUprightThai: "การทำงานเป็นทีม ความร่วมมือ การเรียนรู้ การนำไปใช้", meaningReversed: "Disharmony, lack of teamwork, misalignment", meaningReversedThai: "ความไม่กลมกลืน ขาดการทำงานเป็นทีม ไม่สอดคล้อง", keywords: ["teamwork", "learning"] },
    { name: "Four of Pentacles", nameThai: "เหรียญสี่", meaningUpright: "Saving money, security, conservatism, scarcity, control", meaningUprightThai: "การออมเงิน ความมั่นคง ความอนุรักษ์นิยม ความขาดแคลน การควบคุม", meaningReversed: "Over-spending, greed, self-protection, letting go", meaningReversedThai: "ใช้จ่ายเกินไป ความโลภ การปกป้องตัวเอง การปล่อยวาง", keywords: ["security", "control"] },
    { name: "Five of Pentacles", nameThai: "เหรียญห้า", meaningUpright: "Financial loss, poverty, lack mindset, isolation, worry", meaningUprightThai: "การสูญเสียทางการเงิน ความยากจน ทัศนคติขาดแคลน ความโดดเดี่ยว ความกังวล", meaningReversed: "Recovery from loss, spiritual poverty, improvement", meaningReversedThai: "การฟื้นตัวจากการสูญเสีย ความยากจนทางจิตวิญญาณ การปรับปรุง", keywords: ["hardship", "loss"] },
    { name: "Six of Pentacles", nameThai: "เหรียญหก", meaningUpright: "Giving, receiving, sharing wealth, generosity, charity", meaningUprightThai: "การให้ การรับ การแบ่งปันทรัพย์ ความเอื้อเฟื้อ การกุศล", meaningReversed: "Self-care, unpaid debts, one-sided charity", meaningReversedThai: "การดูแลตัวเอง หนี้ที่ยังไม่ชำระ การให้ฝ่ายเดียว", keywords: ["generosity", "sharing"] },
    { name: "Seven of Pentacles", nameThai: "เหรียญเจ็ด", meaningUpright: "Long-term view, sustainable results, perseverance, investment", meaningUprightThai: "มุมมองระยะยาว ผลลัพธ์ที่ยั่งยืน ความเพียร การลงทุน", meaningReversed: "Lack of long-term vision, limited success, impatience", meaningReversedThai: "ขาดวิสัยทัศน์ระยะยาว ความสำเร็จที่จำกัด ความใจร้อน", keywords: ["patience", "investment"] },
    { name: "Eight of Pentacles", nameThai: "เหรียญแปด", meaningUpright: "Apprenticeship, repetitive tasks, mastery, skill development", meaningUprightThai: "การฝึกงาน งานซ้ำ ความชำนาญ การพัฒนาทักษะ", meaningReversed: "Self-development, perfectionism, misdirected activity", meaningReversedThai: "การพัฒนาตนเอง ความสมบูรณ์แบบนิยม กิจกรรมที่ผิดทิศทาง", keywords: ["mastery", "skill"] },
    { name: "Nine of Pentacles", nameThai: "เหรียญเก้า", meaningUpright: "Abundance, luxury, self-sufficiency, financial independence", meaningUprightThai: "ความอุดมสมบูรณ์ ความหรูหรา ความพึ่งพาตนเอง อิสรภาพทางการเงิน", meaningReversed: "Self-worth, over-investment in work, hustling", meaningReversedThai: "คุณค่าตนเอง การลงทุนในงานมากเกินไป ทำงานหนักเกินไป", keywords: ["luxury", "independence"] },
    { name: "Ten of Pentacles", nameThai: "เหรียญสิบ", meaningUpright: "Wealth, financial security, family, long-term success, contribution", meaningUprightThai: "ความมั่งคั่ง ความมั่นคงทางการเงิน ครอบครัว ความสำเร็จระยะยาว การมีส่วนร่วม", meaningReversed: "Family financial disputes, instability, breaking traditions", meaningReversedThai: "ข้อพิพาททางการเงินในครอบครัว ความไม่มั่นคง การทำลายประเพณี", keywords: ["legacy", "wealth"] },
    { name: "Page of Pentacles", nameThai: "เพจเหรียญ", meaningUpright: "Manifestation, financial opportunity, skill development, ambition", meaningUprightThai: "การบรรลุเป้าหมาย โอกาสทางการเงิน การพัฒนาทักษะ ความทะเยอทะยาน", meaningReversed: "Lack of progress, procrastination, learn from failure", meaningReversedThai: "ขาดความก้าวหน้า การผัดวันประกันพรุ่ง เรียนรู้จากความล้มเหลว", keywords: ["ambition", "learning"] },
    { name: "Knight of Pentacles", nameThai: "อัศวินเหรียญ", meaningUpright: "Hard work, productivity, routine, conservatism, responsibility", meaningUprightThai: "การทำงานหนัก ผลิตภาพ กิจวัตร ความอนุรักษ์นิยม ความรับผิดชอบ", meaningReversed: "Self-discipline issues, boredom, feeling stuck, perfectionism", meaningReversedThai: "ปัญหาวินัยตนเอง ความเบื่อ รู้สึกติดอยู่ ความสมบูรณ์แบบนิยม", keywords: ["diligence", "routine"] },
    { name: "Queen of Pentacles", nameThai: "ราชินีเหรียญ", meaningUpright: "Nurturing, practical, providing financially, down-to-earth", meaningUprightThai: "เอาใจใส่ ใช้ได้จริง สนับสนุนทางการเงิน เรียบง่าย", meaningReversed: "Financial independence, self-care, work-home conflict", meaningReversedThai: "อิสรภาพทางการเงิน การดูแลตัวเอง ขัดแย้งระหว่างงานกับบ้าน", keywords: ["nurturing", "practical"] },
    { name: "King of Pentacles", nameThai: "ราชาเหรียญ", meaningUpright: "Wealth, business, leadership, security, discipline, abundance", meaningUprightThai: "ความมั่งคั่ง ธุรกิจ ภาวะผู้นำ ความมั่นคง วินัย ความอุดมสมบูรณ์", meaningReversed: "Financially inept, obsessive, stubborn, materialistic", meaningReversedThai: "ไม่เก่งเรื่องการเงิน หมกมุ่น ดื้อรั้น วัตถุนิยม", keywords: ["success", "abundance"] },
  ],
};

function buildMinorArcana(): TarotCard[] {
  const cards: TarotCard[] = [];

  for (const suit of Object.keys(MINOR_TEMPLATES) as TarotSuit[]) {
    const templates = MINOR_TEMPLATES[suit];
    const suitInfo = SUIT_INFO[suit];

    templates.forEach((template, index) => {
      const num = index < 10 ? index + 1 : COURT_NAMES[index - 10].num;
      cards.push({
        id: `${suit}-${num}`,
        name: template.name,
        nameThai: template.nameThai,
        arcana: "minor",
        suit,
        number: num,
        meaningUpright: template.meaningUpright,
        meaningUprightThai: template.meaningUprightThai,
        meaningReversed: template.meaningReversed,
        meaningReversedThai: template.meaningReversedThai,
        imageDescription: `${template.name} from the ${suitInfo.en} suit (${suitInfo.element} element)`,
        keywords: template.keywords,
      });
    });
  }

  return cards;
}

export const MINOR_ARCANA = buildMinorArcana();
export const FULL_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];
