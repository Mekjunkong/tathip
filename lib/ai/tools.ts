/**
 * AI SDK v6 tool definitions for the TaThip chatbot.
 *
 * Two tools:
 * - calculate_birth_chart: computes a Thai sidereal birth chart
 * - lookup_knowledge: queries the RAG knowledge base for astrological texts
 */

import { tool } from "ai";
import { z } from "zod";
import { calculateThaiChart } from "@/lib/astrology/thai-chart";
import { queryKnowledge } from "@/lib/ai/rag";
import type { PlanetPosition } from "@/types/astrology";
import { PLANET_NAMES } from "@/types/astrology";
import {
  drawSingleCard,
  drawThreeCardSpread,
  drawCelticCross,
  formatSpread,
} from "@/lib/tarot/deck";
import {
  calculateFullProfile,
  analyzeThaiNumber,
} from "@/lib/numerology/calculator";
import { calculateBaZi, formatBaZiChart } from "@/lib/astrology/bazi";
import { calculateFengShui } from "@/lib/fengshui/calculator";

/**
 * Format a planet position into a human-readable summary line.
 */
function formatPlanet(p: PlanetPosition): string {
  const name = PLANET_NAMES[p.planet];
  const retro = p.retrograde ? " (retrograde)" : "";
  return `${name.en} (${name.th}): ${p.signName} (${p.signNameThai}) ${p.degree.toFixed(1)}° — House ${p.house}${retro}`;
}

export const chatTools = {
  calculate_birth_chart: tool({
    description:
      "Calculate a Thai sidereal birth chart using Swiss Ephemeris. Returns ascendant, planet positions with signs and houses, and retrograde status. Use this whenever the user provides their birth data.",
    inputSchema: z.object({
      birthDate: z
        .string()
        .describe("Birth date in YYYY-MM-DD format"),
      birthTime: z
        .string()
        .describe("Birth time in HH:mm format (24-hour)"),
      lat: z.number().describe("Birth place latitude"),
      lng: z.number().describe("Birth place longitude"),
      timezone: z
        .number()
        .default(7)
        .describe("UTC offset in hours (default 7 for Bangkok)"),
    }),
    execute: async (input) => {
      try {
        const chart = calculateThaiChart(
          input.birthDate,
          input.birthTime,
          input.lat,
          input.lng,
          input.timezone
        );

        const planetSummaries = chart.planets.map(formatPlanet);

        return {
          success: true,
          ascendant: {
            sign: chart.ascendantSignName,
            signThai: chart.ascendantSignNameThai,
            degree: chart.ascendant.toFixed(1),
          },
          planets: planetSummaries,
          houses: chart.houses.map((h) => ({
            house: h.house,
            sign: `${h.signName} (${h.signNameThai})`,
          })),
          birthData: chart.birthData,
        };
      } catch (error) {
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to calculate birth chart",
        };
      }
    },
  }),

  draw_tarot: tool({
    description:
      "Draw tarot cards for a reading. Supports single card, three-card (Past/Present/Future), or Celtic Cross (10 cards) spreads. Use this when the user asks for a tarot reading.",
    inputSchema: z.object({
      spreadType: z
        .enum(["single", "three-card", "celtic-cross"])
        .describe("Type of spread: 'single' for quick guidance, 'three-card' for past/present/future, 'celtic-cross' for in-depth reading"),
    }),
    execute: async (input) => {
      try {
        let spread;
        switch (input.spreadType) {
          case "single":
            spread = drawSingleCard();
            break;
          case "three-card":
            spread = drawThreeCardSpread();
            break;
          case "celtic-cross":
            spread = drawCelticCross();
            break;
        }

        return {
          success: true,
          spreadType: spread.spreadType,
          spreadName: spread.name,
          spreadNameThai: spread.nameThai,
          reading: formatSpread(spread),
          cards: spread.cards.map((c) => ({
            name: c.card.name,
            nameThai: c.card.nameThai,
            position: c.position,
            reversed: c.reversed,
            meaning: c.reversed ? c.card.meaningReversed : c.card.meaningUpright,
            meaningThai: c.reversed ? c.card.meaningReversedThai : c.card.meaningUprightThai,
            keywords: c.card.keywords,
            arcana: c.card.arcana,
            suit: c.card.suit,
          })),
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to draw tarot cards",
        };
      }
    },
  }),

  calculate_numerology: tool({
    description:
      "Calculate numerology numbers from a person's name and birthdate (Life Path, Expression, Soul Urge), or analyze a phone number/license plate using Thai numerology (เลขศาสตร์). Use this when the user asks about numerology, lucky numbers, or number meanings.",
    inputSchema: z.object({
      type: z
        .enum(["full-profile", "thai-number"])
        .describe("'full-profile' for name+birthdate analysis, 'thai-number' for phone/license plate analysis"),
      fullName: z
        .string()
        .optional()
        .describe("Full name in English (for full-profile type)"),
      birthDate: z
        .string()
        .optional()
        .describe("Birth date in YYYY-MM-DD format (for full-profile type)"),
      numberToAnalyze: z
        .string()
        .optional()
        .describe("Phone number or license plate to analyze (for thai-number type)"),
    }),
    execute: async (input) => {
      try {
        if (input.type === "full-profile") {
          if (!input.fullName || !input.birthDate) {
            return {
              success: false,
              error: "Full name and birth date are required for a full numerology profile",
            };
          }
          const profile = calculateFullProfile(input.fullName, input.birthDate);
          return {
            success: true,
            type: "full-profile",
            lifePath: profile.lifePath,
            expression: profile.expression,
            soulUrge: profile.soulUrge,
            compatibility: profile.compatibility,
          };
        } else {
          if (!input.numberToAnalyze) {
            return {
              success: false,
              error: "A number (phone or license plate) is required for Thai number analysis",
            };
          }
          const result = analyzeThaiNumber(input.numberToAnalyze);
          return {
            success: true,
            type: "thai-number",
            ...result,
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to calculate numerology",
        };
      }
    },
  }),

  calculate_bazi: tool({
    description:
      "Calculate a Chinese BaZi (Four Pillars of Destiny / 八字) chart from birth date and time. Returns Year, Month, Day, Hour pillars with Heavenly Stems and Earthly Branches, Five Elements balance analysis, Chinese zodiac, and Day Master. Use this when the user asks about Chinese astrology, BaZi, Four Pillars, or their Chinese zodiac.",
    inputSchema: z.object({
      birthDate: z
        .string()
        .describe("Birth date in YYYY-MM-DD format"),
      birthTime: z
        .string()
        .describe("Birth time in HH:mm format (24-hour)"),
    }),
    execute: async (input) => {
      try {
        const chart = calculateBaZi(input.birthDate, input.birthTime);
        return {
          success: true,
          formattedChart: formatBaZiChart(chart),
          chineseZodiac: chart.chineseZodiac,
          chineseZodiacThai: chart.chineseZodiacThai,
          dayMaster: `${chart.dayMaster.en} (${chart.dayMaster.zh}) — ${chart.dayMaster.yin_yang} ${chart.dayMaster.element}`,
          dominantElement: chart.dominantElement,
          weakestElement: chart.weakestElement,
          elementBalance: chart.elementBalance,
          summary: chart.summary,
          summaryThai: chart.summaryThai,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to calculate BaZi chart",
        };
      }
    },
  }),

  calculate_fengshui: tool({
    description:
      "Calculate Feng Shui Kua number and directional analysis based on birth year and gender. Returns auspicious and inauspicious directions for home/office layout, sleeping direction, desk facing direction, and more. Use this when the user asks about Feng Shui, room arrangement, lucky directions, or home/office energy.",
    inputSchema: z.object({
      birthYear: z.number().describe("Birth year (e.g., 1990)"),
      gender: z
        .enum(["male", "female"])
        .describe("Gender for Kua number calculation"),
    }),
    execute: async (input) => {
      try {
        const result = calculateFengShui(input.birthYear, input.gender);
        return {
          success: true,
          kuaNumber: result.kuaNumber,
          group: `${result.group} (${result.groupThai})`,
          element: `${result.element} (${result.elementThai})`,
          bestDirection: `${result.bestDirection.direction} (${result.bestDirection.directionThai}) — ${result.bestDirection.star}: ${result.bestDirection.meaning}`,
          worstDirection: `${result.worstDirection.direction} (${result.worstDirection.directionThai}) — ${result.worstDirection.star}: ${result.worstDirection.meaning}`,
          auspiciousDirections: result.directions
            .filter((d) => d.type === "auspicious")
            .map((d) => `${d.direction} (${d.directionThai}) — ${d.star} (${d.starThai}): ${d.meaning} / ${d.meaningThai}`),
          inauspiciousDirections: result.directions
            .filter((d) => d.type === "inauspicious")
            .map((d) => `${d.direction} (${d.directionThai}) — ${d.star} (${d.starThai}): ${d.meaning} / ${d.meaningThai}`),
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to calculate Feng Shui",
        };
      }
    },
  }),

  lookup_knowledge: tool({
    description:
      "Search the astrological knowledge base for traditional interpretations, meanings, and guidance. Use this to ground your readings in authentic Thai/Vedic astrological texts. Query with specific topics like 'Sun in Aries meaning' or 'Jupiter in 7th house'.",
    inputSchema: z.object({
      query: z
        .string()
        .describe(
          "Search query describing the astrological topic to look up"
        ),
      system: z
        .string()
        .optional()
        .describe(
          "Filter by astrological system: 'thai', 'western', or 'vedic'"
        ),
    }),
    execute: async (input) => {
      try {
        const results = await queryKnowledge(input.query, {
          system: input.system,
          matchCount: 3,
          threshold: 0.65,
        });

        if (results.length === 0) {
          return {
            success: true,
            results: [],
            message: "No matching knowledge found for this query.",
          };
        }

        return {
          success: true,
          results: results.map((r) => ({
            content: r.content,
            source: r.source,
            system: r.system,
            relevance: r.similarity.toFixed(2),
          })),
        };
      } catch (error) {
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to query knowledge base",
        };
      }
    },
  }),
};
