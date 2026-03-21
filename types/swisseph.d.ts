/**
 * Type declarations for the swisseph npm package.
 * Only covers the subset of the API used in this project.
 */
declare module "swisseph" {
  // Calendar type
  export const SE_GREG_CAL: number;
  export const SE_JUL_CAL: number;

  // Planet body constants
  export const SE_SUN: number;
  export const SE_MOON: number;
  export const SE_MERCURY: number;
  export const SE_VENUS: number;
  export const SE_MARS: number;
  export const SE_JUPITER: number;
  export const SE_SATURN: number;
  export const SE_MEAN_NODE: number;
  export const SE_TRUE_NODE: number;

  // Calculation flags
  export const SEFLG_SIDEREAL: number;
  export const SEFLG_SPEED: number;
  export const SEFLG_MOSEPH: number;

  // Ayanamsa modes
  export const SE_SIDM_LAHIRI: number;
  export const SE_SIDM_FAGAN_BRADLEY: number;
  export const SE_SIDM_RAMAN: number;

  // Ascendant/houses
  export const SE_ASC: number;
  export const SE_MC: number;

  interface CalcResult {
    longitude: number;
    latitude: number;
    distance: number;
    longitudeSpeed: number;
    latitudeSpeed: number;
    distanceSpeed: number;
    rflag: number;
    error?: string;
  }

  interface HousesResult {
    house: number[];
    ascendant: number;
    mc: number;
    armc: number;
    vertex: number;
    equatorialAscendant: number;
    kochCoAscendant: number;
    munkaseyCoAscendant: number;
    munkaseyPolarAscendant: number;
  }

  export function swe_set_sid_mode(
    sidMode: number,
    t0: number,
    ayanT0: number
  ): void;

  export function swe_julday(
    year: number,
    month: number,
    day: number,
    hour: number,
    calType: number
  ): number;

  export function swe_calc_ut(
    julianDay: number,
    planet: number,
    flags: number
  ): CalcResult;

  export function swe_houses(
    julianDay: number,
    lat: number,
    lng: number,
    houseSystem: string
  ): HousesResult;

  export function swe_houses_ex(
    julianDay: number,
    flags: number,
    lat: number,
    lng: number,
    houseSystem: string
  ): HousesResult;

  export function swe_get_ayanamsa_ut(julianDay: number): number;

  export function swe_set_ephe_path(path: string): void;

  export function swe_close(): void;

  export function swe_version(): string;

  export function swe_revjul(
    julianDay: number,
    calType: number
  ): { year: number; month: number; day: number; hour: number };
}
