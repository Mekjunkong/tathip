/**
 * Numerology calculator — Pythagorean (Western) and Thai (เลขศาสตร์) systems.
 *
 * Calculates Life Path, Expression, Soul Urge numbers from name and birthdate.
 * Also supports Thai-style phone number and license plate analysis.
 */

// Pythagorean letter-to-number mapping
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

// Vowels for Soul Urge calculation
const VOWELS = new Set(["a", "e", "i", "o", "u"]);

// Master numbers are not reduced further
const MASTER_NUMBERS = new Set([11, 22, 33]);

/**
 * Reduce a number to a single digit (or master number).
 */
function reduceToSingle(num: number): number {
  while (num > 9 && !MASTER_NUMBERS.has(num)) {
    num = String(num)
      .split("")
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return num;
}

/**
 * Sum digits of a string of numbers.
 */
function sumDigits(str: string): number {
  return str
    .replace(/\D/g, "")
    .split("")
    .reduce((sum, d) => sum + parseInt(d, 10), 0);
}

// ===== LIFE PATH NUMBER (from birthdate) =====

export interface LifePathResult {
  number: number;
  calculation: string;
  meaning: string;
  meaningThai: string;
}

const LIFE_PATH_MEANINGS: Record<number, { en: string; th: string }> = {
  1: { en: "The Leader — Independent, ambitious, innovative. Natural-born leader with strong drive.", th: "ผู้นำ — อิสระ ทะเยอทะยาน สร้างสรรค์ เป็นผู้นำโดยธรรมชาติที่มีพลังขับเคลื่อนสูง" },
  2: { en: "The Peacemaker — Diplomatic, cooperative, sensitive. Excels in partnership and mediation.", th: "ผู้สร้างสันติ — มีไหวพริบ ให้ความร่วมมือ อ่อนไหว เก่งในเรื่องหุ้นส่วนและการไกล่เกลี่ย" },
  3: { en: "The Communicator — Creative, expressive, social. Natural entertainer with artistic talent.", th: "นักสื่อสาร — สร้างสรรค์ แสดงออก เข้าสังคม นักสร้างความบันเทิงที่มีพรสวรรค์ทางศิลปะ" },
  4: { en: "The Builder — Practical, organized, dependable. Creates solid foundations through hard work.", th: "ผู้สร้าง — ปฏิบัติจริง เป็นระเบียบ เชื่อถือได้ สร้างรากฐานที่มั่นคงผ่านการทำงานหนัก" },
  5: { en: "The Freedom Seeker — Adventurous, versatile, dynamic. Thrives on change and variety.", th: "ผู้แสวงหาอิสรภาพ — ชอบผจญภัย หลากหลาย มีพลัง เจริญเติบโตจากการเปลี่ยนแปลงและความหลากหลาย" },
  6: { en: "The Nurturer — Responsible, loving, protective. Strong sense of duty to family and community.", th: "ผู้เลี้ยงดู — รับผิดชอบ รักใคร่ ปกป้อง มีหน้าที่ต่อครอบครัวและชุมชนอย่างแรงกล้า" },
  7: { en: "The Seeker — Analytical, introspective, spiritual. Deep thinker drawn to truth and wisdom.", th: "ผู้แสวงหา — มีการวิเคราะห์ พิจารณาตนเอง จิตวิญญาณ นักคิดที่ลึกซึ้งถูกดึงดูดสู่ความจริงและปัญญา" },
  8: { en: "The Powerhouse — Authoritative, ambitious, materialistic. Strong in business and achievement.", th: "ผู้ทรงพลัง — มีอำนาจ ทะเยอทะยาน นิยมวัตถุ แข็งแกร่งในธุรกิจและความสำเร็จ" },
  9: { en: "The Humanitarian — Compassionate, generous, idealistic. Driven by desire to serve others.", th: "มนุษยธรรม — เมตตากรุณา ใจกว้าง มีอุดมคติ ขับเคลื่อนด้วยความปรารถนาที่จะรับใช้ผู้อื่น" },
  11: { en: "Master Intuitive — Highly intuitive, inspirational, spiritual teacher. Channel for higher wisdom.", th: "ปรมาจารย์แห่งสัญชาตญาณ — สัญชาตญาณสูง เป็นแรงบันดาลใจ ครูทางจิตวิญญาณ ช่องทางแห่งปัญญาที่สูงขึ้น" },
  22: { en: "Master Builder — Visionary, practical, powerful manifestor. Can turn dreams into reality on grand scale.", th: "ปรมาจารย์แห่งการสร้าง — มีวิสัยทัศน์ ปฏิบัติจริง ผู้บรรลุเป้าหมายอันยิ่งใหญ่ สามารถเปลี่ยนความฝันเป็นจริงในระดับใหญ่" },
  33: { en: "Master Teacher — Selfless, nurturing, spiritual guide. Dedicated to uplifting humanity.", th: "ปรมาจารย์แห่งการสอน — ไม่เห็นแก่ตัว เอาใจใส่ ผู้นำทางจิตวิญญาณ อุทิศตนเพื่อยกระดับมนุษยชาติ" },
};

export function calculateLifePath(birthDate: string): LifePathResult {
  const [year, month, day] = birthDate.split("-").map(Number);

  const monthReduced = reduceToSingle(month);
  const dayReduced = reduceToSingle(day);
  const yearReduced = reduceToSingle(sumDigits(String(year)));

  const total = monthReduced + dayReduced + yearReduced;
  const lifePathNumber = reduceToSingle(total);

  const meanings = LIFE_PATH_MEANINGS[lifePathNumber] ?? { en: "Unique path", th: "เส้นทางพิเศษ" };

  return {
    number: lifePathNumber,
    calculation: `Month (${month} → ${monthReduced}) + Day (${day} → ${dayReduced}) + Year (${year} → ${yearReduced}) = ${total} → ${lifePathNumber}`,
    meaning: meanings.en,
    meaningThai: meanings.th,
  };
}

// ===== EXPRESSION NUMBER (from full name) =====

export interface ExpressionResult {
  number: number;
  calculation: string;
  meaning: string;
}

export function calculateExpression(fullName: string): ExpressionResult {
  const letters = fullName.toLowerCase().replace(/[^a-z]/g, "");
  const sum = letters
    .split("")
    .reduce((total, letter) => total + (PYTHAGOREAN_MAP[letter] ?? 0), 0);
  const expressionNumber = reduceToSingle(sum);

  return {
    number: expressionNumber,
    calculation: `Letters: "${letters}" → sum = ${sum} → ${expressionNumber}`,
    meaning: LIFE_PATH_MEANINGS[expressionNumber]?.en ?? "Unique expression",
  };
}

// ===== SOUL URGE NUMBER (from vowels in name) =====

export interface SoulUrgeResult {
  number: number;
  calculation: string;
  meaning: string;
}

export function calculateSoulUrge(fullName: string): SoulUrgeResult {
  const letters = fullName.toLowerCase().replace(/[^a-z]/g, "");
  const vowelLetters = letters.split("").filter((l) => VOWELS.has(l));
  const sum = vowelLetters.reduce(
    (total, letter) => total + (PYTHAGOREAN_MAP[letter] ?? 0),
    0
  );
  const soulUrgeNumber = reduceToSingle(sum);

  return {
    number: soulUrgeNumber,
    calculation: `Vowels: "${vowelLetters.join("")}" → sum = ${sum} → ${soulUrgeNumber}`,
    meaning: LIFE_PATH_MEANINGS[soulUrgeNumber]?.en ?? "Unique soul urge",
  };
}

// ===== THAI NUMEROLOGY — Phone / License Plate Analysis =====

export interface ThaiNumberResult {
  inputNumber: string;
  digitSum: number;
  reducedNumber: number;
  meaning: string;
  meaningThai: string;
  isAuspicious: boolean;
}

const THAI_NUMBER_MEANINGS: Record<number, { en: string; th: string; auspicious: boolean }> = {
  1: { en: "Leadership, new beginnings, self-reliance. Brings independence and ambition.", th: "ความเป็นผู้นำ จุดเริ่มต้นใหม่ การพึ่งพาตนเอง นำมาซึ่งความเป็นอิสระและความทะเยอทะยาน", auspicious: true },
  2: { en: "Partnership, diplomacy, cooperation. Good for relationships and harmony.", th: "ความเป็นหุ้นส่วน การทูต ความร่วมมือ ดีสำหรับความสัมพันธ์และความกลมกลืน", auspicious: true },
  3: { en: "Creativity, communication, growth. Attracts joy and social connections.", th: "ความคิดสร้างสรรค์ การสื่อสาร การเติบโต ดึงดูดความสุขและความสัมพันธ์ทางสังคม", auspicious: true },
  4: { en: "Stability but stagnation risk. Mixed energy — solid foundation but may feel stuck.", th: "ความมั่นคงแต่เสี่ยงหยุดนิ่ง พลังงานผสม — รากฐานแข็งแรงแต่อาจรู้สึกติดอยู่", auspicious: false },
  5: { en: "Change, freedom, adventure. Dynamic energy that brings opportunities.", th: "การเปลี่ยนแปลง อิสรภาพ การผจญภัย พลังงานที่เคลื่อนไหวนำมาซึ่งโอกาส", auspicious: true },
  6: { en: "Love, family, responsibility. Nurturing energy for home and relationships.", th: "ความรัก ครอบครัว ความรับผิดชอบ พลังงานเอาใจใส่สำหรับบ้านและความสัมพันธ์", auspicious: true },
  7: { en: "Spirituality, wisdom, introspection. Good for learning but may bring isolation.", th: "จิตวิญญาณ ปัญญา การพิจารณาตนเอง ดีสำหรับการเรียนรู้แต่อาจนำมาซึ่งความโดดเดี่ยว", auspicious: true },
  8: { en: "Prosperity, power, material success. Strong financial energy.", th: "ความเจริญรุ่งเรือง อำนาจ ความสำเร็จทางวัตถุ พลังงานทางการเงินที่แข็งแกร่ง", auspicious: true },
  9: { en: "Completion, wisdom, universal love. Highest single digit — brings fulfillment.", th: "ความสมบูรณ์ ปัญญา ความรักสากล เลขหลักเดียวสูงสุด — นำมาซึ่งความสมหวัง", auspicious: true },
};

export function analyzeThaiNumber(numberStr: string): ThaiNumberResult {
  const digitsOnly = numberStr.replace(/\D/g, "");
  const digitSum = sumDigits(digitsOnly);
  const reducedNumber = reduceToSingle(digitSum);

  const meanings = THAI_NUMBER_MEANINGS[reducedNumber] ?? {
    en: "Unique vibration",
    th: "ความสั่นสะเทือนพิเศษ",
    auspicious: true,
  };

  return {
    inputNumber: numberStr,
    digitSum,
    reducedNumber,
    meaning: meanings.en,
    meaningThai: meanings.th,
    isAuspicious: meanings.auspicious,
  };
}

// ===== COMPLETE NUMEROLOGY PROFILE =====

export interface NumerologyProfile {
  lifePath: LifePathResult;
  expression: ExpressionResult;
  soulUrge: SoulUrgeResult;
  compatibility: string;
}

export function calculateFullProfile(
  fullName: string,
  birthDate: string
): NumerologyProfile {
  const lifePath = calculateLifePath(birthDate);
  const expression = calculateExpression(fullName);
  const soulUrge = calculateSoulUrge(fullName);

  // Simple compatibility analysis between numbers
  const numbers = [lifePath.number, expression.number, soulUrge.number];
  const uniqueNumbers = new Set(numbers.map((n) => (n > 9 ? reduceToSingle(n) : n)));

  let compatibility: string;
  if (uniqueNumbers.size === 1) {
    compatibility =
      "Highly aligned — your life path, expression, and soul urge all resonate at the same frequency. Strong internal harmony.";
  } else if (uniqueNumbers.size === 2) {
    compatibility =
      "Well balanced — two of your core numbers align, creating a stable foundation with productive creative tension.";
  } else {
    compatibility =
      "Diverse energies — your three core numbers bring different strengths. This creates versatility but may require conscious integration.";
  }

  return { lifePath, expression, soulUrge, compatibility };
}
