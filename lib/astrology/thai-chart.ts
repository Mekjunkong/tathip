/**
 * Thai birth chart calculator.
 *
 * Calculates a complete Thai sidereal birth chart using Swiss Ephemeris.
 * Uses Lahiri ayanamsa, Whole Sign house system, and 9 Thai planets
 * (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu).
 */

import type {
  BirthChart,
  HouseData,
  Planet,
  PlanetPosition,
} from "@/types/astrology";
import { ZODIAC_SIGNS } from "@/types/astrology";
import {
  initSiderealMode,
  toJulianDay,
  calcPlanet,
  calcHouses,
} from "./swiss-ephemeris";

/** Planets calculated via Swiss Ephemeris (Ketu is derived from Rahu) */
const CALCULATED_PLANETS: Exclude<Planet, "ketu">[] = [
  "sun",
  "moon",
  "mars",
  "mercury",
  "jupiter",
  "venus",
  "saturn",
  "rahu",
];

/**
 * Get the zodiac sign index (0-11) from a sidereal longitude.
 */
function getSignIndex(longitude: number): number {
  return Math.floor(((longitude % 360) + 360) % 360 / 30);
}

/**
 * Get the degree within the sign (0-29.99) from a sidereal longitude.
 */
function getDegreeInSign(longitude: number): number {
  return ((longitude % 360) + 360) % 360 % 30;
}

/**
 * Normalize a longitude to 0-360 range.
 */
function normalizeLongitude(longitude: number): number {
  return ((longitude % 360) + 360) % 360;
}

/**
 * Calculate which house a planet occupies in a Whole Sign system.
 *
 * In Whole Sign houses, the ascendant sign is house 1, the next sign is house 2, etc.
 *
 * @param planetSignIndex - The sign index (0-11) the planet is in
 * @param ascendantSignIndex - The sign index (0-11) of the ascendant
 * @returns House number 1-12
 */
function getWholeSignHouse(
  planetSignIndex: number,
  ascendantSignIndex: number
): number {
  return ((planetSignIndex - ascendantSignIndex + 12) % 12) + 1;
}

/**
 * Build a PlanetPosition object from raw calculation data.
 */
function buildPlanetPosition(
  planet: Planet,
  longitude: number,
  speed: number,
  ascendantSignIndex: number
): PlanetPosition {
  const normalizedLong = normalizeLongitude(longitude);
  const signIndex = getSignIndex(normalizedLong);
  const sign = ZODIAC_SIGNS[signIndex];

  return {
    planet,
    longitude: Math.round(normalizedLong * 10000) / 10000,
    sign: signIndex,
    signName: sign.en,
    signNameThai: sign.th,
    degree: Math.round(getDegreeInSign(normalizedLong) * 10000) / 10000,
    house: getWholeSignHouse(signIndex, ascendantSignIndex),
    retrograde: speed < 0,
  };
}

/**
 * Calculate a complete Thai sidereal birth chart.
 *
 * @param birthDate - ISO date string "YYYY-MM-DD"
 * @param birthTime - Time string "HH:MM" (24-hour local time)
 * @param lat - Birth place latitude
 * @param lng - Birth place longitude
 * @param timezone - UTC offset in hours (e.g. 7 for Bangkok)
 * @returns Complete BirthChart object
 */
export function calculateThaiChart(
  birthDate: string,
  birthTime: string,
  lat: number,
  lng: number,
  timezone: number = 7
): BirthChart {
  // Initialize sidereal mode (Lahiri ayanamsa)
  initSiderealMode();

  // Parse date and time
  const [year, month, day] = birthDate.split("-").map(Number);
  const [hour, minute] = birthTime.split(":").map(Number);

  // Convert local time to Universal Time
  const localDecimalHour = hour + minute / 60;
  const utDecimalHour = localDecimalHour - timezone;

  // Handle day rollover when converting to UT
  let utYear = year;
  let utMonth = month;
  let utDay = day;

  if (utDecimalHour < 0) {
    // Previous day in UT
    const date = new Date(year, month - 1, day - 1);
    utYear = date.getFullYear();
    utMonth = date.getMonth() + 1;
    utDay = date.getDate();
  } else if (utDecimalHour >= 24) {
    // Next day in UT
    const date = new Date(year, month - 1, day + 1);
    utYear = date.getFullYear();
    utMonth = date.getMonth() + 1;
    utDay = date.getDate();
  }

  const adjustedUtHour = ((utDecimalHour % 24) + 24) % 24;

  // Calculate Julian Day
  const julianDay = toJulianDay(utYear, utMonth, utDay, adjustedUtHour);

  // Calculate sidereal houses (Whole Sign)
  const housesResult = calcHouses(julianDay, lat, lng);
  const ascendant = normalizeLongitude(housesResult.ascendant);
  const ascendantSignIndex = getSignIndex(ascendant);
  const ascSign = ZODIAC_SIGNS[ascendantSignIndex];

  // Calculate all planet positions
  const planets: PlanetPosition[] = [];

  for (const planet of CALCULATED_PLANETS) {
    const result = calcPlanet(julianDay, planet);
    planets.push(
      buildPlanetPosition(planet, result.longitude, result.longitudeSpeed, ascendantSignIndex)
    );
  }

  // Ketu is always 180 degrees from Rahu
  const rahuPosition = planets.find((p) => p.planet === "rahu")!;
  const ketuLongitude = normalizeLongitude(rahuPosition.longitude + 180);
  // Rahu and Ketu are always retrograde in mean node calculation
  planets.push(
    buildPlanetPosition("ketu", ketuLongitude, -1, ascendantSignIndex)
  );

  // Build house data (Whole Sign: each house = one sign starting from ascendant sign)
  const houses: HouseData[] = [];
  for (let i = 0; i < 12; i++) {
    const houseSignIndex = (ascendantSignIndex + i) % 12;
    const hSign = ZODIAC_SIGNS[houseSignIndex];

    houses.push({
      house: i + 1,
      sign: houseSignIndex,
      signName: hSign.en,
      signNameThai: hSign.th,
      degree: houseSignIndex * 30,
    });
  }

  // Format timezone string
  const tzSign = timezone >= 0 ? "+" : "-";
  const tzAbs = Math.abs(timezone);
  const tzHours = Math.floor(tzAbs);
  const tzMinutes = Math.round((tzAbs - tzHours) * 60);
  const timezoneStr = `UTC${tzSign}${String(tzHours).padStart(2, "0")}:${String(tzMinutes).padStart(2, "0")}`;

  return {
    ascendant: Math.round(ascendant * 10000) / 10000,
    ascendantSign: ascendantSignIndex,
    ascendantSignName: ascSign.en,
    ascendantSignNameThai: ascSign.th,
    planets,
    houses,
    birthData: {
      date: birthDate,
      time: birthTime,
      place: "",
      lat,
      lng,
      timezone: timezoneStr,
    },
    system: "thai",
  };
}
