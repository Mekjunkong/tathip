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
