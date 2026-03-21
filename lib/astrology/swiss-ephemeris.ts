/**
 * Astronomical calculation wrapper for Thai sidereal astrology.
 *
 * Uses astronomy-engine (pure JavaScript) for planetary positions.
 * Converts tropical longitudes to sidereal using Lahiri ayanamsa.
 * Drop-in replacement for the previous swisseph native addon.
 */

import {
  Body,
  EclipticLongitude,
  SunPosition,
  EclipticGeoMoon,
  SiderealTime,
  MakeTime,
  e_tilt,
} from "astronomy-engine";

import type { Planet } from "@/types/astrology";

/** J2000.0 epoch as a JavaScript Date */
const J2000 = new Date("2000-01-01T12:00:00Z");

/**
 * Map planet names to astronomy-engine Body enum.
 * Rahu (mean lunar node) is calculated separately.
 */
const PLANET_BODIES: Record<Exclude<Planet, "ketu" | "rahu">, Body> = {
  sun: Body.Sun,
  moon: Body.Moon,
  mercury: Body.Mercury,
  venus: Body.Venus,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
};

/**
 * Calculate Lahiri ayanamsa for a given date.
 *
 * The Lahiri ayanamsa is the angular difference between the tropical
 * and sidereal zodiacs. It increases by about 50.3" per year.
 *
 * Reference epoch: ayanamsa = 23.853333 degrees on Jan 1, 2000 (23d 51' 12")
 * Annual precession rate: ~50.2888" per year = 0.01396913 degrees/year
 */
function lahiriAyanamsa(date: Date): number {
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const yearsSinceJ2000 = (date.getTime() - J2000.getTime()) / msPerYear;

  // Lahiri ayanamsa at J2000.0: 23d 51' 12" = 23.853333...
  // Annual precession: 50.2888" = 0.01396911 degrees
  return 23.853333 + yearsSinceJ2000 * 0.01396911;
}

/**
 * Convert tropical longitude to sidereal (Lahiri).
 */
function toSidereal(tropicalLongitude: number, date: Date): number {
  const ayanamsa = lahiriAyanamsa(date);
  return ((tropicalLongitude - ayanamsa) % 360 + 360) % 360;
}

/**
 * Calculate the Mean Lunar Node (Rahu) longitude.
 *
 * Mean node formula from Meeus "Astronomical Algorithms":
 * Omega = 125.0446 - 0.0529539 * D (in degrees)
 * where D = days from J2000.0 TT
 *
 * This gives the TROPICAL mean node; we then convert to sidereal.
 */
function meanLunarNode(date: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSinceJ2000 = (date.getTime() - J2000.getTime()) / msPerDay;

  // Mean longitude of the ascending node (Omega)
  // Using Meeus formula with additional terms for accuracy
  const T = daysSinceJ2000 / 36525; // Julian centuries from J2000
  let omega =
    125.04452 -
    1934.136261 * T +
    0.0020708 * T * T +
    (T * T * T) / 450000;

  omega = ((omega % 360) + 360) % 360;
  return omega;
}

/**
 * Get the tropical ecliptic longitude of a planet.
 *
 * astronomy-engine's EclipticLongitude works for Mercury-Pluto.
 * Sun and Moon need special handling.
 */
function getTropicalLongitude(
  planet: Exclude<Planet, "ketu">,
  date: Date
): number {
  if (planet === "rahu") {
    return meanLunarNode(date);
  }

  if (planet === "sun") {
    const sunPos = SunPosition(date);
    return sunPos.elon;
  }

  if (planet === "moon") {
    const moonPos = EclipticGeoMoon(date);
    return moonPos.lon;
  }

  const body = PLANET_BODIES[planet];
  return EclipticLongitude(body, date);
}

/**
 * Estimate a planet's ecliptic longitude speed (degrees/day).
 *
 * Computed via finite difference with a 1-hour step.
 * Used to detect retrograde motion (negative speed).
 */
function getLongitudeSpeed(
  planet: Exclude<Planet, "ketu">,
  date: Date
): number {
  const dt = 1 / 24; // 1 hour in days
  const msPerDay = 24 * 60 * 60 * 1000;

  const dateBefore = new Date(date.getTime() - dt * msPerDay);
  const dateAfter = new Date(date.getTime() + dt * msPerDay);

  const lonBefore = getTropicalLongitude(planet, dateBefore);
  const lonAfter = getTropicalLongitude(planet, dateAfter);

  // Handle wrap-around at 0/360
  let diff = lonAfter - lonBefore;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;

  // Speed in degrees per day (step was 2 * dt = 2 hours)
  return diff / (2 * dt);
}

// ---------- Public API (same signatures as old swisseph wrapper) ----------

/**
 * Initialize sidereal mode. No-op for astronomy-engine (ayanamsa applied inline).
 */
export function initSiderealMode(): void {
  // No initialization needed; ayanamsa is applied during calculation.
}

/**
 * Convert a date and time to Julian Day in Universal Time.
 *
 * Kept for API compatibility; internally we use JS Date objects.
 */
export function toJulianDay(
  year: number,
  month: number,
  day: number,
  hourUT: number
): number {
  // Standard Julian Day formula
  const hr = Math.floor(hourUT);
  const min = Math.floor((hourUT - hr) * 60);
  const sec = ((hourUT - hr) * 60 - min) * 60;

  const date = new Date(Date.UTC(year, month - 1, day, hr, min, sec));
  // Julian Day = Unix timestamp / 86400 + 2440587.5
  return date.getTime() / 86400000 + 2440587.5;
}

/**
 * Convert Julian Day back to a JS Date (UTC).
 */
function julianDayToDate(jd: number): Date {
  const ms = (jd - 2440587.5) * 86400000;
  return new Date(ms);
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
  const date = julianDayToDate(julianDay);

  const tropicalLon = getTropicalLongitude(planet, date);
  const siderealLon = toSidereal(tropicalLon, date);
  const speed = getLongitudeSpeed(planet, date);

  return {
    longitude: siderealLon,
    longitudeSpeed: speed,
  };
}

export interface HousesCalcResult {
  ascendant: number;
  cusps: number[];
}

/**
 * Calculate sidereal ascendant and house cusps (Whole Sign system).
 *
 * Ascendant calculation:
 * 1. Get Local Sidereal Time (LST) from Greenwich Sidereal Time + longitude
 * 2. Calculate RAMC (Right Ascension of the Midheaven) = LST * 15
 * 3. Calculate ascendant from RAMC, obliquity, and latitude
 * 4. Convert tropical ascendant to sidereal
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
  const date = julianDayToDate(julianDay);
  const time = MakeTime(date);

  // Greenwich Mean Sidereal Time in hours
  const gmst = SiderealTime(date);

  // Local Sidereal Time (hours)
  const lst = ((gmst + lng / 15) % 24 + 24) % 24;

  // RAMC in degrees
  const ramc = lst * 15;

  // Obliquity of the ecliptic
  const tiltInfo = e_tilt(time);
  const obliquity = tiltInfo.mobl; // mean obliquity in degrees

  // Convert to radians for trig
  const DEG2RAD = Math.PI / 180;
  const RAD2DEG = 180 / Math.PI;

  const ramcRad = ramc * DEG2RAD;
  const oblRad = obliquity * DEG2RAD;
  const latRad = lat * DEG2RAD;

  // Ascendant formula (standard astrological formula):
  // ASC = atan2(cos(RAMC), -(sin(RAMC) * cos(obl) + tan(lat) * sin(obl)))
  const y = Math.cos(ramcRad);
  const x = -(
    Math.sin(ramcRad) * Math.cos(oblRad) +
    Math.tan(latRad) * Math.sin(oblRad)
  );

  let ascendant = Math.atan2(y, x) * RAD2DEG;
  ascendant = ((ascendant % 360) + 360) % 360;

  // Convert to sidereal
  const siderealAsc = toSidereal(ascendant, date);

  // Whole Sign houses: each cusp starts at the beginning of its sign
  const ascSignIndex = Math.floor(siderealAsc / 30);
  const cusps: number[] = [];
  for (let i = 0; i < 12; i++) {
    cusps.push(((ascSignIndex + i) % 12) * 30);
  }

  return {
    ascendant: siderealAsc,
    cusps,
  };
}

/**
 * Get the current Lahiri ayanamsa value for a given Julian Day.
 */
export function getAyanamsa(julianDay: number): number {
  const date = julianDayToDate(julianDay);
  return lahiriAyanamsa(date);
}
