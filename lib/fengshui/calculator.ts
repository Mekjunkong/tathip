/**
 * Feng Shui calculator — Kua number, flying stars, and directional analysis.
 *
 * Based on the Eight Mansions (八宅) system and Flying Star (玄空飛星) basics.
 */

/** Kua number calculation based on birth year and gender */
export function calculateKuaNumber(
  birthYear: number,
  gender: "male" | "female"
): number {
  // Sum digits of birth year until single digit
  let sum = birthYear
    .toString()
    .split("")
    .reduce((a, b) => a + parseInt(b, 10), 0);
  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b, 10), 0);
  }

  if (gender === "male") {
    const kua = 11 - sum;
    return kua === 5 ? 2 : kua > 9 ? kua - 9 : kua;
  } else {
    const kua = 4 + sum;
    return kua === 5 ? 8 : kua > 9 ? kua - 9 : kua;
  }
}

export type Direction =
  | "N"
  | "S"
  | "E"
  | "W"
  | "NE"
  | "NW"
  | "SE"
  | "SW";

export interface DirectionInfo {
  direction: Direction;
  directionThai: string;
  type: "auspicious" | "inauspicious";
  star: string;
  starThai: string;
  meaning: string;
  meaningThai: string;
}

const DIRECTION_NAMES: Record<Direction, string> = {
  N: "เหนือ",
  S: "ใต้",
  E: "ตะวันออก",
  W: "ตะวันตก",
  NE: "ตะวันออกเฉียงเหนือ",
  NW: "ตะวันตกเฉียงเหนือ",
  SE: "ตะวันออกเฉียงใต้",
  SW: "ตะวันตกเฉียงใต้",
};

interface KuaDirections {
  auspicious: {
    direction: Direction;
    star: string;
    starThai: string;
    meaning: string;
    meaningThai: string;
  }[];
  inauspicious: {
    direction: Direction;
    star: string;
    starThai: string;
    meaning: string;
    meaningThai: string;
  }[];
}

/** Direction map for each Kua number */
const KUA_DIRECTIONS: Record<number, KuaDirections> = {
  1: {
    auspicious: [
      { direction: "SE", star: "Sheng Qi", starThai: "เซิงชี่", meaning: "Wealth & success", meaningThai: "โชคลาภ ความสำเร็จ" },
      { direction: "E", star: "Tian Yi", starThai: "เทียนอี้", meaning: "Health & mentors", meaningThai: "สุขภาพ ผู้อุปถัมภ์" },
      { direction: "S", star: "Yan Nian", starThai: "เหยียนเหนียน", meaning: "Relationships & longevity", meaningThai: "ความรัก อายุยืน" },
      { direction: "N", star: "Fu Wei", starThai: "ฝูเว่ย", meaning: "Stability & personal growth", meaningThai: "ความมั่นคง การพัฒนาตน" },
    ],
    inauspicious: [
      { direction: "W", star: "Huo Hai", starThai: "ฮั่วไห้", meaning: "Minor setbacks", meaningThai: "อุปสรรคเล็กน้อย" },
      { direction: "NE", star: "Wu Gui", starThai: "อู่กุ้ย", meaning: "Five ghosts — conflicts", meaningThai: "ห้าผี — ความขัดแย้ง" },
      { direction: "NW", star: "Liu Sha", starThai: "ลิ่วซา", meaning: "Six killings — legal issues", meaningThai: "หกอันตราย — ปัญหาทางกฎหมาย" },
      { direction: "SW", star: "Jue Ming", starThai: "เจี๋ยหมิง", meaning: "Total loss — worst direction", meaningThai: "สูญเสีย — ทิศที่แย่ที่สุด" },
    ],
  },
  2: {
    auspicious: [
      { direction: "NE", star: "Sheng Qi", starThai: "เซิงชี่", meaning: "Wealth & success", meaningThai: "โชคลาภ ความสำเร็จ" },
      { direction: "W", star: "Tian Yi", starThai: "เทียนอี้", meaning: "Health & mentors", meaningThai: "สุขภาพ ผู้อุปถัมภ์" },
      { direction: "NW", star: "Yan Nian", starThai: "เหยียนเหนียน", meaning: "Relationships & longevity", meaningThai: "ความรัก อายุยืน" },
      { direction: "SW", star: "Fu Wei", starThai: "ฝูเว่ย", meaning: "Stability & personal growth", meaningThai: "ความมั่นคง การพัฒนาตน" },
    ],
    inauspicious: [
      { direction: "E", star: "Huo Hai", starThai: "ฮั่วไห้", meaning: "Minor setbacks", meaningThai: "อุปสรรคเล็กน้อย" },
      { direction: "SE", star: "Wu Gui", starThai: "อู่กุ้ย", meaning: "Five ghosts — conflicts", meaningThai: "ห้าผี — ความขัดแย้ง" },
      { direction: "S", star: "Liu Sha", starThai: "ลิ่วซา", meaning: "Six killings — legal issues", meaningThai: "หกอันตราย — ปัญหาทางกฎหมาย" },
      { direction: "N", star: "Jue Ming", starThai: "เจี๋ยหมิง", meaning: "Total loss — worst direction", meaningThai: "สูญเสีย — ทิศที่แย่ที่สุด" },
    ],
  },
  3: {
    auspicious: [
      { direction: "S", star: "Sheng Qi", starThai: "เซิงชี่", meaning: "Wealth & success", meaningThai: "โชคลาภ ความสำเร็จ" },
      { direction: "N", star: "Tian Yi", starThai: "เทียนอี้", meaning: "Health & mentors", meaningThai: "สุขภาพ ผู้อุปถัมภ์" },
      { direction: "SE", star: "Yan Nian", starThai: "เหยียนเหนียน", meaning: "Relationships & longevity", meaningThai: "ความรัก อายุยืน" },
      { direction: "E", star: "Fu Wei", starThai: "ฝูเว่ย", meaning: "Stability & personal growth", meaningThai: "ความมั่นคง การพัฒนาตน" },
    ],
    inauspicious: [
      { direction: "SW", star: "Huo Hai", starThai: "ฮั่วไห้", meaning: "Minor setbacks", meaningThai: "อุปสรรคเล็กน้อย" },
      { direction: "NW", star: "Wu Gui", starThai: "อู่กุ้ย", meaning: "Five ghosts — conflicts", meaningThai: "ห้าผี — ความขัดแย้ง" },
      { direction: "NE", star: "Liu Sha", starThai: "ลิ่วซา", meaning: "Six killings — legal issues", meaningThai: "หกอันตราย — ปัญหาทางกฎหมาย" },
      { direction: "W", star: "Jue Ming", starThai: "เจี๋ยหมิง", meaning: "Total loss — worst direction", meaningThai: "สูญเสีย — ทิศที่แย่ที่สุด" },
    ],
  },
  4: {
    auspicious: [
      { direction: "N", star: "Sheng Qi", starThai: "เซิงชี่", meaning: "Wealth & success", meaningThai: "โชคลาภ ความสำเร็จ" },
      { direction: "S", star: "Tian Yi", starThai: "เทียนอี้", meaning: "Health & mentors", meaningThai: "สุขภาพ ผู้อุปถัมภ์" },
      { direction: "E", star: "Yan Nian", starThai: "เหยียนเหนียน", meaning: "Relationships & longevity", meaningThai: "ความรัก อายุยืน" },
      { direction: "SE", star: "Fu Wei", starThai: "ฝูเว่ย", meaning: "Stability & personal growth", meaningThai: "ความมั่นคง การพัฒนาตน" },
    ],
    inauspicious: [
      { direction: "NW", star: "Huo Hai", starThai: "ฮั่วไห้", meaning: "Minor setbacks", meaningThai: "อุปสรรคเล็กน้อย" },
      { direction: "SW", star: "Wu Gui", starThai: "อู่กุ้ย", meaning: "Five ghosts — conflicts", meaningThai: "ห้าผี — ความขัดแย้ง" },
      { direction: "W", star: "Liu Sha", starThai: "ลิ่วซา", meaning: "Six killings — legal issues", meaningThai: "หกอันตราย — ปัญหาทางกฎหมาย" },
      { direction: "NE", star: "Jue Ming", starThai: "เจี๋ยหมิง", meaning: "Total loss — worst direction", meaningThai: "สูญเสีย — ทิศที่แย่ที่สุด" },
    ],
  },
  6: {
    auspicious: [
      { direction: "W", star: "Sheng Qi", starThai: "เซิงชี่", meaning: "Wealth & success", meaningThai: "โชคลาภ ความสำเร็จ" },
      { direction: "NE", star: "Tian Yi", starThai: "เทียนอี้", meaning: "Health & mentors", meaningThai: "สุขภาพ ผู้อุปถัมภ์" },
      { direction: "SW", star: "Yan Nian", starThai: "เหยียนเหนียน", meaning: "Relationships & longevity", meaningThai: "ความรัก อายุยืน" },
      { direction: "NW", star: "Fu Wei", starThai: "ฝูเว่ย", meaning: "Stability & personal growth", meaningThai: "ความมั่นคง การพัฒนาตน" },
    ],
    inauspicious: [
      { direction: "SE", star: "Huo Hai", starThai: "ฮั่วไห้", meaning: "Minor setbacks", meaningThai: "อุปสรรคเล็กน้อย" },
      { direction: "E", star: "Wu Gui", starThai: "อู่กุ้ย", meaning: "Five ghosts — conflicts", meaningThai: "ห้าผี — ความขัดแย้ง" },
      { direction: "N", star: "Liu Sha", starThai: "ลิ่วซา", meaning: "Six killings — legal issues", meaningThai: "หกอันตราย — ปัญหาทางกฎหมาย" },
      { direction: "S", star: "Jue Ming", starThai: "เจี๋ยหมิง", meaning: "Total loss — worst direction", meaningThai: "สูญเสีย — ทิศที่แย่ที่สุด" },
    ],
  },
  7: {
    auspicious: [
      { direction: "NW", star: "Sheng Qi", starThai: "เซิงชี่", meaning: "Wealth & success", meaningThai: "โชคลาภ ความสำเร็จ" },
      { direction: "SW", star: "Tian Yi", starThai: "เทียนอี้", meaning: "Health & mentors", meaningThai: "สุขภาพ ผู้อุปถัมภ์" },
      { direction: "NE", star: "Yan Nian", starThai: "เหยียนเหนียน", meaning: "Relationships & longevity", meaningThai: "ความรัก อายุยืน" },
      { direction: "W", star: "Fu Wei", starThai: "ฝูเว่ย", meaning: "Stability & personal growth", meaningThai: "ความมั่นคง การพัฒนาตน" },
    ],
    inauspicious: [
      { direction: "S", star: "Huo Hai", starThai: "ฮั่วไห้", meaning: "Minor setbacks", meaningThai: "อุปสรรคเล็กน้อย" },
      { direction: "N", star: "Wu Gui", starThai: "อู่กุ้ย", meaning: "Five ghosts — conflicts", meaningThai: "ห้าผี — ความขัดแย้ง" },
      { direction: "E", star: "Liu Sha", starThai: "ลิ่วซา", meaning: "Six killings — legal issues", meaningThai: "หกอันตราย — ปัญหาทางกฎหมาย" },
      { direction: "SE", star: "Jue Ming", starThai: "เจี๋ยหมิง", meaning: "Total loss — worst direction", meaningThai: "สูญเสีย — ทิศที่แย่ที่สุด" },
    ],
  },
  8: {
    auspicious: [
      { direction: "SW", star: "Sheng Qi", starThai: "เซิงชี่", meaning: "Wealth & success", meaningThai: "โชคลาภ ความสำเร็จ" },
      { direction: "NW", star: "Tian Yi", starThai: "เทียนอี้", meaning: "Health & mentors", meaningThai: "สุขภาพ ผู้อุปถัมภ์" },
      { direction: "W", star: "Yan Nian", starThai: "เหยียนเหนียน", meaning: "Relationships & longevity", meaningThai: "ความรัก อายุยืน" },
      { direction: "NE", star: "Fu Wei", starThai: "ฝูเว่ย", meaning: "Stability & personal growth", meaningThai: "ความมั่นคง การพัฒนาตน" },
    ],
    inauspicious: [
      { direction: "N", star: "Huo Hai", starThai: "ฮั่วไห้", meaning: "Minor setbacks", meaningThai: "อุปสรรคเล็กน้อย" },
      { direction: "S", star: "Wu Gui", starThai: "อู่กุ้ย", meaning: "Five ghosts — conflicts", meaningThai: "ห้าผี — ความขัดแย้ง" },
      { direction: "SE", star: "Liu Sha", starThai: "ลิ่วซา", meaning: "Six killings — legal issues", meaningThai: "หกอันตราย — ปัญหาทางกฎหมาย" },
      { direction: "E", star: "Jue Ming", starThai: "เจี๋ยหมิง", meaning: "Total loss — worst direction", meaningThai: "สูญเสีย — ทิศที่แย่ที่สุด" },
    ],
  },
  9: {
    auspicious: [
      { direction: "E", star: "Sheng Qi", starThai: "เซิงชี่", meaning: "Wealth & success", meaningThai: "โชคลาภ ความสำเร็จ" },
      { direction: "SE", star: "Tian Yi", starThai: "เทียนอี้", meaning: "Health & mentors", meaningThai: "สุขภาพ ผู้อุปถัมภ์" },
      { direction: "N", star: "Yan Nian", starThai: "เหยียนเหนียน", meaning: "Relationships & longevity", meaningThai: "ความรัก อายุยืน" },
      { direction: "S", star: "Fu Wei", starThai: "ฝูเว่ย", meaning: "Stability & personal growth", meaningThai: "ความมั่นคง การพัฒนาตน" },
    ],
    inauspicious: [
      { direction: "NE", star: "Huo Hai", starThai: "ฮั่วไห้", meaning: "Minor setbacks", meaningThai: "อุปสรรคเล็กน้อย" },
      { direction: "W", star: "Wu Gui", starThai: "อู่กุ้ย", meaning: "Five ghosts — conflicts", meaningThai: "ห้าผี — ความขัดแย้ง" },
      { direction: "SW", star: "Liu Sha", starThai: "ลิ่วซา", meaning: "Six killings — legal issues", meaningThai: "หกอันตราย — ปัญหาทางกฎหมาย" },
      { direction: "NW", star: "Jue Ming", starThai: "เจี๋ยหมิง", meaning: "Total loss — worst direction", meaningThai: "สูญเสีย — ทิศที่แย่ที่สุด" },
    ],
  },
};

export interface FengShuiResult {
  kuaNumber: number;
  group: "East" | "West";
  groupThai: string;
  directions: DirectionInfo[];
  bestDirection: DirectionInfo;
  worstDirection: DirectionInfo;
  element: string;
  elementThai: string;
}

const KUA_ELEMENTS: Record<number, { en: string; th: string }> = {
  1: { en: "Water", th: "น้ำ" },
  2: { en: "Earth", th: "ดิน" },
  3: { en: "Wood", th: "ไม้" },
  4: { en: "Wood", th: "ไม้" },
  6: { en: "Metal", th: "ทอง" },
  7: { en: "Metal", th: "ทอง" },
  8: { en: "Earth", th: "ดิน" },
  9: { en: "Fire", th: "ไฟ" },
};

export function calculateFengShui(
  birthYear: number,
  gender: "male" | "female"
): FengShuiResult {
  const kua = calculateKuaNumber(birthYear, gender);
  const dirs = KUA_DIRECTIONS[kua];

  if (!dirs) {
    throw new Error(`Invalid Kua number: ${kua}`);
  }

  const isEast = [1, 3, 4, 9].includes(kua);

  const allDirections: DirectionInfo[] = [
    ...dirs.auspicious.map((d) => ({
      direction: d.direction,
      directionThai: DIRECTION_NAMES[d.direction],
      type: "auspicious" as const,
      star: d.star,
      starThai: d.starThai,
      meaning: d.meaning,
      meaningThai: d.meaningThai,
    })),
    ...dirs.inauspicious.map((d) => ({
      direction: d.direction,
      directionThai: DIRECTION_NAMES[d.direction],
      type: "inauspicious" as const,
      star: d.star,
      starThai: d.starThai,
      meaning: d.meaning,
      meaningThai: d.meaningThai,
    })),
  ];

  const element = KUA_ELEMENTS[kua];

  return {
    kuaNumber: kua,
    group: isEast ? "East" : "West",
    groupThai: isEast ? "กลุ่มตะวันออก" : "กลุ่มตะวันตก",
    directions: allDirections,
    bestDirection: allDirections[0],
    worstDirection: allDirections[allDirections.length - 1],
    element: element.en,
    elementThai: element.th,
  };
}
