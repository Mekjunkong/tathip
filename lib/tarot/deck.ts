/**
 * Tarot deck operations — shuffle, draw, and spread functions.
 *
 * Uses cryptographically random shuffling for fair draws.
 */

import { FULL_DECK, type TarotCard, type DrawnCard, type TarotSpread } from "@/types/tarot";

/**
 * Fisher-Yates shuffle using crypto.getRandomValues for fairness.
 */
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomValues = new Uint32Array(1);
    crypto.getRandomValues(randomValues);
    const j = randomValues[0] % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Determine if a card is drawn reversed (roughly 30% chance).
 */
function isReversed(): boolean {
  const randomValues = new Uint32Array(1);
  crypto.getRandomValues(randomValues);
  return randomValues[0] % 100 < 30;
}

/**
 * Draw N cards from a shuffled deck.
 */
export function drawCards(count: number, deck: TarotCard[] = FULL_DECK): DrawnCard[] {
  const shuffled = shuffle(deck);
  return shuffled.slice(0, count).map((card) => ({
    card,
    reversed: isReversed(),
  }));
}

/**
 * Single card draw — quick guidance.
 */
export function drawSingleCard(): TarotSpread {
  const cards = drawCards(1);
  cards[0].position = "Guidance";

  return {
    name: "Single Card",
    nameThai: "ไพ่ใบเดียว",
    cards,
    spreadType: "single",
  };
}

/**
 * Three-card spread — Past, Present, Future.
 */
export function drawThreeCardSpread(): TarotSpread {
  const cards = drawCards(3);
  const positions = ["Past", "Present", "Future"];
  cards.forEach((c, i) => {
    c.position = positions[i];
  });

  return {
    name: "Three Card Spread",
    nameThai: "ไพ่สามใบ (อดีต-ปัจจุบัน-อนาคต)",
    cards,
    spreadType: "three-card",
  };
}

/**
 * Celtic Cross spread — 10 cards for in-depth reading.
 */
export function drawCelticCross(): TarotSpread {
  const cards = drawCards(10);
  const positions = [
    "Present Situation",
    "Challenge / Crossing",
    "Foundation / Root",
    "Recent Past",
    "Crown / Best Outcome",
    "Near Future",
    "Self / Attitude",
    "Environment / Others",
    "Hopes and Fears",
    "Final Outcome",
  ];
  cards.forEach((c, i) => {
    c.position = positions[i];
  });

  return {
    name: "Celtic Cross",
    nameThai: "กากบาทเซลติก (10 ใบ)",
    cards,
    spreadType: "celtic-cross",
  };
}

/**
 * Format a drawn card into a readable string for the AI.
 */
export function formatDrawnCard(drawn: DrawnCard): string {
  const { card, reversed, position } = drawn;
  const direction = reversed ? "Reversed" : "Upright";
  const meaning = reversed ? card.meaningReversed : card.meaningUpright;
  const meaningThai = reversed ? card.meaningReversedThai : card.meaningUprightThai;

  let result = "";
  if (position) result += `**${position}**: `;
  result += `${card.name} (${card.nameThai}) — ${direction}\n`;
  result += `Meaning: ${meaning}\n`;
  result += `ความหมาย: ${meaningThai}\n`;
  result += `Keywords: ${card.keywords.join(", ")}`;

  return result;
}

/**
 * Format an entire spread for the AI to interpret.
 */
export function formatSpread(spread: TarotSpread): string {
  const header = `Tarot Spread: ${spread.name} (${spread.nameThai})\n${"=".repeat(50)}\n\n`;
  const cardTexts = spread.cards.map(formatDrawnCard).join("\n\n");
  return header + cardTexts;
}
