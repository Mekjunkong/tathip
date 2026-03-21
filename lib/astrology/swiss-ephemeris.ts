/**
 * Swiss Ephemeris wrapper for Thai sidereal astrology calculations.
 *
 * Uses the swisseph native Node.js addon for astronomical precision.
 * Configured with Lahiri ayanamsa and sidereal zodiac (same as Vedic/Thai).
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const swisseph = require("swisseph") as typeof import("swisseph");

import type { Planet } from "@/types/astrology";

/** Swiss Ephemeris planet body constants */
const PLANET_BODIES: Record<Exclude<Planet, "ketu">, number> = {
  sun: swisseph.SE_SUN,
  moon: swisseph.SE_MOON,
  mercury: swisseph.SE_MERCURY,
  venus: swisseph.SE_VENUS,
  mars: swisseph.SE_MARS,
  jupiter: swisseph.SE_JUPITER,
  saturn: swisseph.SE_SATURN,
  rahu: swisseph.SE_MEAN_NODE,
};

/** Calculation flags: sidereal zodiac + speed (for retrograde detection) */
const CALC_FLAGS = swisseph.SEFLG_SIDEREAL | swisseph.SEFLG_SPEED;

/**
 * Initialize Swiss Ephemeris for Thai/Vedic sidereal calculations.
 * Must be called before any calculations.
 */
export function initSiderealMode(): void {
  swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0);
}

/**
 * Convert a date and time to Julian Day in Universal Time.
 *
 * @param year - Full year (e.g. 1990)
 * @param month - Month 1-12
 * @param day - Day 1-31
 * @param hour - Hour in UT (0-23, fractional)
 */
export function toJulianDay(
  year: number,
  month: number,
  day: number,
  hourUT: number
): number {
  return swisseph.swe_julday(year, month, day, hourUT, swisseph.SE_GREG_CAL);
}

export interface PlanetCalcResult {
  longitude: number;
  longitudeSpeed: number;
}

/**
 * Calculate a single planet's sidereal longitude.
 *
 * @param julianDay - Julian Day in UT
 * @param planet - Planet identifier (excluding "ketu" which is derived)
 * @returns Sidereal longitude and speed
 */
export function calcPlanet(
  julianDay: number,
  planet: Exclude<Planet, "ketu">
): PlanetCalcResult {
  const body = PLANET_BODIES[planet];
  const result = swisseph.swe_calc_ut(julianDay, body, CALC_FLAGS);

  if (result.error) {
    throw new Error(
      `Swiss Ephemeris calculation error for ${planet}: ${result.error}`
    );
  }

  return {
    longitude: result.longitude,
    longitudeSpeed: result.longitudeSpeed,
  };
}

export interface HousesCalcResult {
  ascendant: number;
  cusps: number[];
}

/**
 * Calculate sidereal house cusps using Whole Sign house system.
 *
 * @param julianDay - Julian Day in UT
 * @param lat - Geographic latitude
 * @param lng - Geographic longitude
 * @returns Sidereal ascendant and house cusps
 */
export function calcHouses(
  julianDay: number,
  lat: number,
  lng: number
): HousesCalcResult {
  const result = swisseph.swe_houses_ex(
    julianDay,
    CALC_FLAGS,
    lat,
    lng,
    "W" // Whole Sign house system
  );

  return {
    ascendant: result.ascendant,
    cusps: result.house,
  };
}

/**
 * Get the current Lahiri ayanamsa value for a given Julian Day.
 */
export function getAyanamsa(julianDay: number): number {
  return swisseph.swe_get_ayanamsa_ut(julianDay);
}
