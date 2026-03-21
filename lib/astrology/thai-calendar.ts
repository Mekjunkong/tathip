/**
 * Thai Calendar Utilities
 *
 * Converts Gregorian dates to Thai Buddhist Era (BE) dates,
 * Thai lunar calendar (จันทรคติ), and provides Thai day/month names.
 */

/** Thai Buddhist Era offset: BE = CE + 543 */
export const BE_OFFSET = 543;

/** Thai day names (0=Sunday) */
export const THAI_DAY_NAMES = [
  "อาทิตย์",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
];

/** Thai day abbreviations */
export const THAI_DAY_ABBR = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

/** Thai month names (1-indexed) */
export const THAI_MONTH_NAMES = [
  "",
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

/** Thai month abbreviations */
export const THAI_MONTH_ABBR = [
  "",
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

/** Thai lunar month names (1-indexed, 13 = intercalary Asalha) */
export const THAI_LUNAR_MONTHS = [
  "",
  "อ้าย",
  "ยี่",
  "สาม",
  "สี่",
  "ห้า",
  "หก",
  "เจ็ด",
  "แปด",
  "เก้า",
  "สิบ",
  "สิบเอ็ด",
  "สิบสอง",
  "แปดหลัง",
];

/** Thai lunar waxing/waning phase names */
export const THAI_LUNAR_PHASES = {
  waxing: "ขึ้น",
  waning: "แรม",
  full: "เพ็ญ",
  new: "ดับ",
};

/** Thai number words for lunar day */
export const THAI_NUMBERS = [
  "",
  "๑",
  "๒",
  "๓",
  "๔",
  "๕",
  "๖",
  "๗",
  "๘",
  "๙",
  "๑๐",
  "๑๑",
  "๑๒",
  "๑๓",
  "๑๔",
  "๑๕",
];

export interface ThaiDateInfo {
  /** Thai Buddhist Era year */
  thaiYear: number;
  /** Gregorian year */
  gregorianYear: number;
  /** Month number (1-12) */
  month: number;
  /** Day number */
  day: number;
  /** Day of week (0=Sunday) */
  dayOfWeek: number;
  /** Thai day name */
  thaiDayName: string;
  /** Thai month name */
  thaiMonthName: string;
  /** Full Thai date string */
  thaiDateString: string;
  /** Short Thai date string */
  thaiDateShort: string;
  /** Time string HH:MM */
  timeString: string;
}

export interface ThaiLunarInfo {
  /** Lunar month number (1-13) */
  lunarMonth: number;
  /** Lunar month name */
  lunarMonthName: string;
  /** Lunar day (1-15) */
  lunarDay: number;
  /** Whether waxing (true) or waning (false) */
  isWaxing: boolean;
  /** Phase description */
  phaseDesc: string;
  /** Full lunar date string in Thai */
  lunarDateString: string;
  /** Thai year (Jula Sakarat) */
  julaSakarat: number;
  /** Thai year name (e.g. ปีมะเมีย) */
  thaiYearName: string;
}

/** Thai zodiac year names (12-year cycle) */
const THAI_YEAR_NAMES = [
  "ชวด", // Rat
  "ฉลู", // Ox
  "ขาล", // Tiger
  "เถาะ", // Rabbit
  "มะโรง", // Dragon
  "มะเส็ง", // Snake
  "มะเมีย", // Horse
  "มะแม", // Goat
  "วอก", // Monkey
  "ระกา", // Rooster
  "จอ", // Dog
  "กุน", // Pig
];

/**
 * Convert a Gregorian date to Thai date information.
 */
export function toThaiDate(date: Date, timezone: number = 7): ThaiDateInfo {
  // Adjust for timezone
  const localDate = new Date(date.getTime() + timezone * 3600000);
  const year = localDate.getUTCFullYear();
  const month = localDate.getUTCMonth() + 1;
  const day = localDate.getUTCDate();
  const hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();
  const dayOfWeek = localDate.getUTCDay();

  const thaiYear = year + BE_OFFSET;
  const thaiDayName = THAI_DAY_NAMES[dayOfWeek];
  const thaiMonthName = THAI_MONTH_NAMES[month];
  const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  const thaiDateString = `วัน${thaiDayName}ที่ ${day} ${thaiMonthName} พ.ศ.${thaiYear}`;
  const thaiDateShort = `${day} ${THAI_MONTH_ABBR[month]} ${thaiYear}`;

  return {
    thaiYear,
    gregorianYear: year,
    month,
    day,
    dayOfWeek,
    thaiDayName,
    thaiMonthName,
    thaiDateString,
    thaiDateShort,
    timeString,
  };
}

/**
 * Calculate approximate Thai lunar calendar date.
 *
 * Uses a simplified algorithm based on the synodic month (29.53059 days).
 * Reference new moon: January 11, 2024 at 11:57 UTC (known new moon).
 */
export function toThaiLunar(date: Date): ThaiLunarInfo {
  // Reference new moon: Jan 11, 2024 11:57 UTC
  const refNewMoon = new Date("2024-01-11T11:57:00Z");
  const synodicMonth = 29.53059; // days

  const daysSinceRef = (date.getTime() - refNewMoon.getTime()) / (24 * 3600 * 1000);
  const cyclePosition = ((daysSinceRef % synodicMonth) + synodicMonth) % synodicMonth;
  const cycleNumber = Math.floor(daysSinceRef / synodicMonth);

  // Lunar day within cycle (1-30)
  const lunarDayInCycle = Math.floor(cyclePosition) + 1;

  // Thai lunar: 1-15 waxing, then 1-15 waning
  let lunarDay: number;
  let isWaxing: boolean;

  if (lunarDayInCycle <= 15) {
    lunarDay = lunarDayInCycle;
    isWaxing = true;
  } else {
    lunarDay = lunarDayInCycle - 15;
    isWaxing = false;
  }

  // Approximate lunar month (Thai lunar year starts around April)
  // Reference: cycle 0 = Thai month 12 (ธันวาคม/มกราคม area)
  const lunarMonthRaw = ((cycleNumber + 12) % 12) + 1;
  const lunarMonth = lunarMonthRaw === 0 ? 12 : lunarMonthRaw;
  const lunarMonthName = THAI_LUNAR_MONTHS[lunarMonth] || THAI_LUNAR_MONTHS[1];

  // Phase description
  let phaseDesc: string;
  if (lunarDay === 15 && isWaxing) {
    phaseDesc = THAI_LUNAR_PHASES.full;
  } else if (lunarDay === 15 && !isWaxing) {
    phaseDesc = THAI_LUNAR_PHASES.new;
  } else {
    phaseDesc = isWaxing ? THAI_LUNAR_PHASES.waxing : THAI_LUNAR_PHASES.waning;
  }

  // Thai year name (12-year animal cycle)
  const year = date.getUTCFullYear();
  const thaiYearIndex = (year - 2000 + 4) % 12; // 2000 = ปีมะโรง (index 4)
  const adjustedIndex = ((thaiYearIndex % 12) + 12) % 12;
  const thaiYearName = `ปี${THAI_YEAR_NAMES[adjustedIndex]}`;

  // Jula Sakarat (จุลศักราช) = BE - 1181
  const julaSakarat = year + BE_OFFSET - 1181;

  const lunarDayNum = lunarDay <= 15 ? THAI_NUMBERS[lunarDay] || String(lunarDay) : THAI_NUMBERS[lunarDay] || String(lunarDay);
  const lunarDateString = `${phaseDesc} ${lunarDayNum} ค่ำ เดือน${lunarMonthName} ${thaiYearName}`;

  return {
    lunarMonth,
    lunarMonthName,
    lunarDay,
    isWaxing,
    phaseDesc,
    lunarDateString,
    julaSakarat,
    thaiYearName,
  };
}

/**
 * Format a degree value as degrees, minutes, seconds string.
 */
export function formatDMS(degrees: number): string {
  const d = Math.floor(degrees);
  const mFloat = (degrees - d) * 60;
  const m = Math.floor(mFloat);
  const s = Math.round((mFloat - m) * 60);
  return `${d}° ${m}' ${s}"`;
}

/**
 * Get Thai zodiac sign symbol (Unicode).
 */
export const ZODIAC_SYMBOLS = [
  "♈", // Aries
  "♉", // Taurus
  "♊", // Gemini
  "♋", // Cancer
  "♌", // Leo
  "♍", // Virgo
  "♎", // Libra
  "♏", // Scorpio
  "♐", // Sagittarius
  "♑", // Capricorn
  "♒", // Aquarius
  "♓", // Pisces
];

/** Planet symbols */
export const PLANET_SYMBOLS: Record<string, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  rahu: "☊",
  ketu: "☋",
};

/** Planet colors for the wheel */
export const PLANET_COLORS: Record<string, string> = {
  sun: "#FFD700",
  moon: "#C0C0FF",
  mercury: "#90EE90",
  venus: "#FFB6C1",
  mars: "#FF6B6B",
  jupiter: "#FFA500",
  saturn: "#8B7355",
  rahu: "#9370DB",
  ketu: "#708090",
};
