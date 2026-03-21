/**
 * Chinese BaZi (Four Pillars of Destiny) Calculator.
 *
 * Calculates Year, Month, Day, and Hour pillars using the
 * Heavenly Stems and Earthly Branches system.
 * Includes Five Elements balance analysis.
 */

// ===== CONSTANTS =====

export const HEAVENLY_STEMS = [
  { en: "Jia", zh: "甲", th: "เจี่ย", element: "Wood", yin_yang: "Yang" },
  { en: "Yi", zh: "乙", th: "อี่", element: "Wood", yin_yang: "Yin" },
  { en: "Bing", zh: "丙", th: "ปิ่ง", element: "Fire", yin_yang: "Yang" },
  { en: "Ding", zh: "丁", th: "ติง", element: "Fire", yin_yang: "Yin" },
  { en: "Wu", zh: "戊", th: "อู่", element: "Earth", yin_yang: "Yang" },
  { en: "Ji", zh: "己", th: "จี่", element: "Earth", yin_yang: "Yin" },
  { en: "Geng", zh: "庚", th: "เกิง", element: "Metal", yin_yang: "Yang" },
  { en: "Xin", zh: "辛", th: "ซิน", element: "Metal", yin_yang: "Yin" },
  { en: "Ren", zh: "壬", th: "เหริน", element: "Water", yin_yang: "Yang" },
  { en: "Gui", zh: "癸", th: "กุ่ย", element: "Water", yin_yang: "Yin" },
] as const;

export const EARTHLY_BRANCHES = [
  { en: "Zi", zh: "子", th: "จื่อ", animal: "Rat", element: "Water", hours: "23:00-01:00" },
  { en: "Chou", zh: "丑", th: "โฉ่ว", animal: "Ox", element: "Earth", hours: "01:00-03:00" },
  { en: "Yin", zh: "寅", th: "อิ๋น", animal: "Tiger", element: "Wood", hours: "03:00-05:00" },
  { en: "Mao", zh: "卯", th: "เหม่า", animal: "Rabbit", element: "Wood", hours: "05:00-07:00" },
  { en: "Chen", zh: "辰", th: "เฉิน", animal: "Dragon", element: "Earth", hours: "07:00-09:00" },
  { en: "Si", zh: "巳", th: "ซื่อ", animal: "Snake", element: "Fire", hours: "09:00-11:00" },
  { en: "Wu", zh: "午", th: "อู่", animal: "Horse", element: "Fire", hours: "11:00-13:00" },
  { en: "Wei", zh: "未", th: "เว่ย", animal: "Goat", element: "Earth", hours: "13:00-15:00" },
  { en: "Shen", zh: "申", th: "เซิน", animal: "Monkey", element: "Metal", hours: "15:00-17:00" },
  { en: "You", zh: "酉", th: "โย่ว", animal: "Rooster", element: "Metal", hours: "17:00-19:00" },
  { en: "Xu", zh: "戌", th: "ซวี", animal: "Dog", element: "Earth", hours: "19:00-21:00" },
  { en: "Hai", zh: "亥", th: "ไห่", animal: "Pig", element: "Water", hours: "21:00-23:00" },
] as const;

export type Element = "Wood" | "Fire" | "Earth" | "Metal" | "Water";

export interface Pillar {
  name: string;
  nameThai: string;
  heavenlyStem: typeof HEAVENLY_STEMS[number];
  earthlyBranch: typeof EARTHLY_BRANCHES[number];
}

export interface ElementBalance {
  element: Element;
  count: number;
  percentage: number;
  status: "Deficient" | "Balanced" | "Excessive";
  statusThai: string;
}

export interface BaZiChart {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  dayMaster: typeof HEAVENLY_STEMS[number];
  chineseZodiac: string;
  chineseZodiacThai: string;
  elementBalance: ElementBalance[];
  dominantElement: Element;
  weakestElement: Element;
  summary: string;
  summaryThai: string;
}

// ===== CALCULATION FUNCTIONS =====

/**
 * Calculate the Year Pillar.
 * The Chinese year starts at Li Chun (approx Feb 4).
 * For simplicity, we use Feb 4 as the cutoff.
 */
function calculateYearPillar(year: number, month: number, day: number): Pillar {
  // Adjust year if before Li Chun (Feb 4)
  const adjustedYear = (month < 2 || (month === 2 && day < 4)) ? year - 1 : year;

  // Year stem: (year - 4) % 10
  const stemIndex = ((adjustedYear - 4) % 10 + 10) % 10;
  // Year branch: (year - 4) % 12
  const branchIndex = ((adjustedYear - 4) % 12 + 12) % 12;

  return {
    name: "Year Pillar",
    nameThai: "เสาปี",
    heavenlyStem: HEAVENLY_STEMS[stemIndex],
    earthlyBranch: EARTHLY_BRANCHES[branchIndex],
  };
}

/**
 * Calculate the Month Pillar.
 * Month stems depend on the year stem.
 * Chinese solar months roughly correspond to:
 * Month 1 (Tiger) = Feb 4 - Mar 5
 * Month 2 (Rabbit) = Mar 6 - Apr 4
 * etc.
 */
function calculateMonthPillar(year: number, month: number, day: number): Pillar {
  // Determine the Chinese solar month (1-12, where 1 = Tiger month starting ~Feb 4)
  const solarMonth = getSolarMonth(month, day);

  // Month branch is fixed: month 1 = Yin (Tiger, index 2), month 2 = Mao (Rabbit, index 3), etc.
  const branchIndex = (solarMonth + 1) % 12;

  // Month stem is derived from year stem
  // Formula: ((yearStem % 5) * 2 + monthNumber) % 10
  const adjustedYear = (month < 2 || (month === 2 && day < 4)) ? year - 1 : year;
  const yearStemIndex = ((adjustedYear - 4) % 10 + 10) % 10;
  const stemIndex = ((yearStemIndex % 5) * 2 + solarMonth) % 10;

  return {
    name: "Month Pillar",
    nameThai: "เสาเดือน",
    heavenlyStem: HEAVENLY_STEMS[stemIndex],
    earthlyBranch: EARTHLY_BRANCHES[branchIndex],
  };
}

/**
 * Get the Chinese solar month number (1-12) from Gregorian date.
 */
function getSolarMonth(month: number, day: number): number {
  // Approximate solar term start dates
  const solarTerms = [
    { month: 2, day: 4 },   // Month 1: Li Chun
    { month: 3, day: 6 },   // Month 2: Jing Zhe
    { month: 4, day: 5 },   // Month 3: Qing Ming
    { month: 5, day: 6 },   // Month 4: Li Xia
    { month: 6, day: 6 },   // Month 5: Mang Zhong
    { month: 7, day: 7 },   // Month 6: Xiao Shu
    { month: 8, day: 7 },   // Month 7: Li Qiu
    { month: 9, day: 8 },   // Month 8: Bai Lu
    { month: 10, day: 8 },  // Month 9: Han Lu
    { month: 11, day: 7 },  // Month 10: Li Dong
    { month: 12, day: 7 },  // Month 11: Da Xue
    { month: 1, day: 6 },   // Month 12: Xiao Han
  ];

  for (let i = solarTerms.length - 1; i >= 0; i--) {
    const term = solarTerms[i];
    if (month > term.month || (month === term.month && day >= term.day)) {
      return (i % 12) + 1;
    }
  }

  // If before Jan 6 (Xiao Han), it's still month 12 of previous cycle
  return 12;
}

/**
 * Calculate the Day Pillar using the day count method.
 * Reference: January 1, 1900 = Jia Zi (Stem 0, Branch 0)
 * Actually Jan 1 1900 = Jia Chen, we use a known reference point.
 */
function calculateDayPillar(year: number, month: number, day: number): Pillar {
  // Calculate days from a known reference date
  // Reference: January 0 (Dec 31, 1899) = Day 0, known as Gui Hai (stem=9, branch=11)
  // Jan 1, 1900 = Jia Zi (stem=0, branch=0)
  const referenceDate = new Date(1900, 0, 1); // Jan 1, 1900
  const targetDate = new Date(year, month - 1, day);
  const daysDiff = Math.floor((targetDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));

  // Jan 1, 1900 is Jia Xu (stem 0, branch 10) — adjusted from historical calendar
  const stemIndex = ((daysDiff + 0) % 10 + 10) % 10;
  const branchIndex = ((daysDiff + 10) % 12 + 12) % 12;

  return {
    name: "Day Pillar",
    nameThai: "เสาวัน",
    heavenlyStem: HEAVENLY_STEMS[stemIndex],
    earthlyBranch: EARTHLY_BRANCHES[branchIndex],
  };
}

/**
 * Calculate the Hour Pillar.
 * Each Chinese "hour" (時辰) spans 2 hours.
 * Hour stem depends on day stem.
 */
function calculateHourPillar(year: number, month: number, day: number, hour: number): Pillar {
  // Determine the double-hour (時辰) index
  // Zi (23-1), Chou (1-3), Yin (3-5), etc.
  let branchIndex: number;
  if (hour >= 23 || hour < 1) branchIndex = 0;       // Zi
  else if (hour < 3) branchIndex = 1;                 // Chou
  else if (hour < 5) branchIndex = 2;                 // Yin
  else if (hour < 7) branchIndex = 3;                 // Mao
  else if (hour < 9) branchIndex = 4;                 // Chen
  else if (hour < 11) branchIndex = 5;                // Si
  else if (hour < 13) branchIndex = 6;                // Wu
  else if (hour < 15) branchIndex = 7;                // Wei
  else if (hour < 17) branchIndex = 8;                // Shen
  else if (hour < 19) branchIndex = 9;                // You
  else if (hour < 21) branchIndex = 10;               // Xu
  else branchIndex = 11;                               // Hai

  // Get day stem to derive hour stem
  const dayPillar = calculateDayPillar(year, month, day);
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayPillar.heavenlyStem);

  // Hour stem formula: ((dayStem % 5) * 2 + branchIndex) % 10
  const stemIndex = ((dayStemIndex % 5) * 2 + branchIndex) % 10;

  return {
    name: "Hour Pillar",
    nameThai: "เสาชั่วโมง",
    heavenlyStem: HEAVENLY_STEMS[stemIndex],
    earthlyBranch: EARTHLY_BRANCHES[branchIndex],
  };
}

/**
 * Analyze the Five Elements balance across all four pillars.
 */
function analyzeElements(pillars: Pillar[]): ElementBalance[] {
  const counts: Record<Element, number> = {
    Wood: 0,
    Fire: 0,
    Earth: 0,
    Metal: 0,
    Water: 0,
  };

  // Count elements from all stems and branches
  for (const pillar of pillars) {
    const stemElement = pillar.heavenlyStem.element as Element;
    const branchElement = pillar.earthlyBranch.element as Element;
    counts[stemElement]++;
    counts[branchElement]++;
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (Object.entries(counts) as [Element, number][]).map(([element, count]) => {
    const percentage = Math.round((count / total) * 100);
    let status: ElementBalance["status"];
    let statusThai: string;

    if (count === 0) {
      status = "Deficient";
      statusThai = "ขาด";
    } else if (count >= 3) {
      status = "Excessive";
      statusThai = "มากเกินไป";
    } else {
      status = "Balanced";
      statusThai = "สมดุล";
    }

    return { element, count, percentage, status, statusThai };
  });
}

// ===== MAIN CALCULATION =====

/**
 * Calculate a complete BaZi (Four Pillars) chart.
 *
 * @param birthDate - ISO date string "YYYY-MM-DD"
 * @param birthTime - Time string "HH:MM" (24-hour)
 * @returns Complete BaZi chart
 */
export function calculateBaZi(birthDate: string, birthTime: string): BaZiChart {
  const [year, month, day] = birthDate.split("-").map(Number);
  const [hour] = birthTime.split(":").map(Number);

  const yearPillar = calculateYearPillar(year, month, day);
  const monthPillar = calculateMonthPillar(year, month, day);
  const dayPillar = calculateDayPillar(year, month, day);
  const hourPillar = calculateHourPillar(year, month, day, hour);

  const allPillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const elementBalance = analyzeElements(allPillars);

  // Day Master is the Heavenly Stem of the Day Pillar
  const dayMaster = dayPillar.heavenlyStem;

  // Chinese zodiac from year branch
  const zodiacAnimal = yearPillar.earthlyBranch.animal;

  // Find dominant and weakest elements
  const sorted = [...elementBalance].sort((a, b) => b.count - a.count);
  const dominantElement = sorted[0].element;
  const weakestElement = sorted[sorted.length - 1].element;

  // Element relationship descriptions
  const ELEMENT_DESCRIPTIONS: Record<Element, { en: string; th: string }> = {
    Wood: { en: "growth, creativity, and compassion", th: "การเติบโต ความคิดสร้างสรรค์ และความเมตตา" },
    Fire: { en: "passion, joy, and enthusiasm", th: "ความหลงใหล ความสุข และความกระตือรือร้น" },
    Earth: { en: "stability, nourishment, and reliability", th: "ความมั่นคง การบำรุง และความน่าเชื่อถือ" },
    Metal: { en: "precision, discipline, and strength", th: "ความแม่นยำ วินัย และความแข็งแกร่ง" },
    Water: { en: "wisdom, adaptability, and flow", th: "ปัญญา ความสามารถในการปรับตัว และการไหลลื่น" },
  };

  const dominantDesc = ELEMENT_DESCRIPTIONS[dominantElement];
  const weakDesc = ELEMENT_DESCRIPTIONS[weakestElement];

  const summary = `Day Master: ${dayMaster.en} (${dayMaster.zh}) ${dayMaster.element} — Your core essence is ${dayMaster.yin_yang} ${dayMaster.element}. ` +
    `Dominant element is ${dominantElement} (${dominantDesc.en}). ` +
    `Consider strengthening ${weakestElement} (${weakDesc.en}) for better balance.`;

  const summaryThai = `เจ้าชะตาวัน: ${dayMaster.th} (${dayMaster.zh}) ธาตุ${translateElement(dayMaster.element as Element)} — แก่นแท้ของคุณคือ ${dayMaster.yin_yang === "Yang" ? "หยาง" : "หยิน"} ธาตุ${translateElement(dayMaster.element as Element)} ` +
    `ธาตุเด่นคือ${translateElement(dominantElement)} (${dominantDesc.th}) ` +
    `ควรเสริมธาตุ${translateElement(weakestElement)} (${weakDesc.th}) เพื่อความสมดุล`;

  // Chinese zodiac Thai translations
  const ZODIAC_THAI: Record<string, string> = {
    Rat: "ชวด (หนู)", Ox: "ฉลู (วัว)", Tiger: "ขาล (เสือ)", Rabbit: "เถาะ (กระต่าย)",
    Dragon: "มะโรง (มังกร)", Snake: "มะเส็ง (งู)", Horse: "มะเมีย (ม้า)", Goat: "มะแม (แพะ)",
    Monkey: "วอก (ลิง)", Rooster: "ระกา (ไก่)", Dog: "จอ (สุนัข)", Pig: "กุน (หมู)",
  };

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster,
    chineseZodiac: zodiacAnimal,
    chineseZodiacThai: ZODIAC_THAI[zodiacAnimal] ?? zodiacAnimal,
    elementBalance,
    dominantElement,
    weakestElement,
    summary,
    summaryThai,
  };
}

function translateElement(element: Element): string {
  const map: Record<Element, string> = {
    Wood: "ไม้", Fire: "ไฟ", Earth: "ดิน", Metal: "ทอง", Water: "น้ำ",
  };
  return map[element];
}

/**
 * Format a BaZi chart into a readable string for AI interpretation.
 */
export function formatBaZiChart(chart: BaZiChart): string {
  const formatPillar = (p: Pillar): string =>
    `${p.name} (${p.nameThai}): ${p.heavenlyStem.en}/${p.earthlyBranch.en} (${p.heavenlyStem.zh}${p.earthlyBranch.zh}) — ${p.heavenlyStem.element}/${p.earthlyBranch.element} [${p.earthlyBranch.animal}]`;

  const pillars = [
    formatPillar(chart.yearPillar),
    formatPillar(chart.monthPillar),
    formatPillar(chart.dayPillar),
    formatPillar(chart.hourPillar),
  ].join("\n");

  const elements = chart.elementBalance
    .map((e) => `  ${e.element}: ${e.count}/8 (${e.percentage}%) — ${e.status} (${e.statusThai})`)
    .join("\n");

  return `Chinese BaZi (Four Pillars of Destiny)
${"=".repeat(50)}
Chinese Zodiac: ${chart.chineseZodiac} (${chart.chineseZodiacThai})
Day Master: ${chart.dayMaster.en} (${chart.dayMaster.zh}) — ${chart.dayMaster.yin_yang} ${chart.dayMaster.element}

Four Pillars:
${pillars}

Five Elements Balance:
${elements}

${chart.summary}`;
}
