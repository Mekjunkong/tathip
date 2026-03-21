"use client";

/**
 * AstrologyWheel — Interactive SVG natal chart wheel.
 *
 * Renders a full Thai sidereal birth chart with:
 * - Outer ring: zodiac signs with symbols and Thai names
 * - Middle ring: house divisions (Whole Sign)
 * - Inner circle: planetary positions with symbols
 * - ASC / MC / DSC axis lines
 * - Planet tooltip on hover
 */

import { useState, useMemo } from "react";
import type { BirthChart, PlanetPosition } from "@/types/astrology";
import { ZODIAC_SIGNS } from "@/types/astrology";
import {
  ZODIAC_SYMBOLS,
  PLANET_SYMBOLS,
  PLANET_COLORS,
  formatDMS,
} from "@/lib/astrology/thai-calendar";

interface AstrologyWheelProps {
  chart: BirthChart;
  size?: number;
}

const DEG2RAD = Math.PI / 180;

/** Convert ecliptic longitude to SVG angle.
 *  0° Aries is at the 9 o'clock position (left = ASC).
 *  Planets move counter-clockwise in the zodiac.
 */
function lonToAngle(longitude: number, ascendant: number): number {
  // Rotate so ASC is at the left (180° in SVG = 9 o'clock)
  const angle = 180 - (longitude - ascendant);
  return ((angle % 360) + 360) % 360;
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = angleDeg * DEG2RAD;
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  };
}

/** Build SVG arc path between two angles */
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToXY(cx, cy, r, startAngle);
  const end = polarToXY(cx, cy, r, endAngle);
  const largeArc = ((endAngle - startAngle + 360) % 360) > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

/** Zodiac sign colors — alternating fire/earth/air/water */
const SIGN_COLORS = [
  "#FF6B6B40", // Aries — fire
  "#8B735540", // Taurus — earth
  "#90EE9040", // Gemini — air
  "#6BB5FF40", // Cancer — water
  "#FF6B6B40", // Leo — fire
  "#8B735540", // Virgo — earth
  "#90EE9040", // Libra — air
  "#6BB5FF40", // Scorpio — water
  "#FF6B6B40", // Sagittarius — fire
  "#8B735540", // Capricorn — earth
  "#90EE9040", // Aquarius — air
  "#6BB5FF40", // Pisces — water
];

const SIGN_BORDER_COLORS = [
  "#FF6B6B80",
  "#8B735580",
  "#90EE9080",
  "#6BB5FF80",
  "#FF6B6B80",
  "#8B735580",
  "#90EE9080",
  "#6BB5FF80",
  "#FF6B6B80",
  "#8B735580",
  "#90EE9080",
  "#6BB5FF80",
];

export function AstrologyWheel({ chart, size = 480 }: AstrologyWheelProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetPosition | null>(null);

  const cx = size / 2;
  const cy = size / 2;

  // Radii
  const rOuter = size * 0.47;      // outer edge of zodiac ring
  const rZodiac = size * 0.38;     // inner edge of zodiac ring / outer of house ring
  const rHouse = size * 0.30;      // inner edge of house ring
  const rPlanet = size * 0.22;     // planet placement radius
  const rCenter = size * 0.10;     // center circle

  const ascendant = chart.ascendant;

  // Pre-compute planet positions
  const planetPositions = useMemo(() => {
    return chart.planets.map((p) => {
      const angle = lonToAngle(p.longitude, ascendant);
      const pos = polarToXY(cx, cy, rPlanet, angle);
      return { ...p, angle, svgX: pos.x, svgY: pos.y };
    });
  }, [chart.planets, ascendant, cx, cy, rPlanet]);

  // ASC angle is always at 180° (left side)
  const ascAngle = 180;
  const mcAngle = lonToAngle(ascendant + 90, ascendant); // MC is 90° from ASC

  return (
    <div className="relative inline-block">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        style={{ background: "transparent" }}
      >
        {/* ── Background circle ── */}
        <circle cx={cx} cy={cy} r={rOuter + 4} fill="#0a0a1a" stroke="#3b3b6b" strokeWidth="1.5" />

        {/* ── Zodiac sign sectors (outer ring) ── */}
        {Array.from({ length: 12 }).map((_, i) => {
          const signIndex = (chart.ascendantSign + i) % 12;
          // Each sign = 30°, starting from ASC at 180°
          const startAngle = 180 - i * 30;
          const endAngle = startAngle - 30;
          const midAngle = startAngle - 15;

          // Sector fill
          const sectorPath = [
            `M ${cx} ${cy}`,
            `L ${polarToXY(cx, cy, rOuter, startAngle).x} ${polarToXY(cx, cy, rOuter, startAngle).y}`,
            arcPath(cx, cy, rOuter, startAngle, endAngle).replace("M", "").split("A")[0],
            `A ${rOuter} ${rOuter} 0 0 1 ${polarToXY(cx, cy, rOuter, endAngle).x} ${polarToXY(cx, cy, rOuter, endAngle).y}`,
            `L ${cx} ${cy}`,
          ].join(" ");

          // Better: use arc between two radii
          const outerStart = polarToXY(cx, cy, rOuter, startAngle);
          const outerEnd = polarToXY(cx, cy, rOuter, endAngle);
          const innerStart = polarToXY(cx, cy, rZodiac, startAngle);
          const innerEnd = polarToXY(cx, cy, rZodiac, endAngle);

          const sectorD = [
            `M ${innerStart.x} ${innerStart.y}`,
            `L ${outerStart.x} ${outerStart.y}`,
            `A ${rOuter} ${rOuter} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
            `L ${innerEnd.x} ${innerEnd.y}`,
            `A ${rZodiac} ${rZodiac} 0 0 0 ${innerStart.x} ${innerStart.y}`,
            "Z",
          ].join(" ");

          // Symbol position
          const symPos = polarToXY(cx, cy, (rOuter + rZodiac) / 2, midAngle);
          const sign = ZODIAC_SIGNS[signIndex];

          return (
            <g key={i}>
              <path d={sectorD} fill={SIGN_COLORS[signIndex]} stroke={SIGN_BORDER_COLORS[signIndex]} strokeWidth="0.5" />
              {/* Zodiac symbol */}
              <text
                x={symPos.x}
                y={symPos.y - 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size * 0.038}
                fill={SIGN_BORDER_COLORS[signIndex].replace("80", "FF")}
                style={{ fontFamily: "serif" }}
              >
                {ZODIAC_SYMBOLS[signIndex]}
              </text>
              {/* Thai sign name */}
              <text
                x={symPos.x}
                y={symPos.y + size * 0.022}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size * 0.022}
                fill="#ffffff60"
                style={{ fontFamily: "sans-serif" }}
              >
                {sign.th}
              </text>
            </g>
          );
        })}

        {/* ── Zodiac inner circle border ── */}
        <circle cx={cx} cy={cy} r={rZodiac} fill="none" stroke="#3b3b6b" strokeWidth="1" />

        {/* ── House division lines ── */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = 180 - i * 30;
          const inner = polarToXY(cx, cy, rCenter, angle);
          const outer = polarToXY(cx, cy, rZodiac, angle);
          const isCardinal = i % 3 === 0;
          return (
            <line
              key={i}
              x1={inner.x} y1={inner.y}
              x2={outer.x} y2={outer.y}
              stroke={isCardinal ? "#6b6bab" : "#3b3b6b"}
              strokeWidth={isCardinal ? 1.5 : 0.7}
            />
          );
        })}

        {/* ── House numbers in middle ring ── */}
        {Array.from({ length: 12 }).map((_, i) => {
          const midAngle = 180 - i * 30 - 15;
          const pos = polarToXY(cx, cy, (rZodiac + rHouse) / 2, midAngle);
          return (
            <text
              key={i}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size * 0.025}
              fill="#8888bb"
              fontWeight="500"
            >
              {i + 1}
            </text>
          );
        })}

        {/* ── Inner circle border ── */}
        <circle cx={cx} cy={cy} r={rHouse} fill="#0d0d22" stroke="#3b3b6b" strokeWidth="1" />

        {/* ── ASC / DSC axis ── */}
        {(() => {
          const ascLeft = polarToXY(cx, cy, rHouse, 180);
          const dscRight = polarToXY(cx, cy, rHouse, 0);
          return (
            <line
              x1={ascLeft.x} y1={ascLeft.y}
              x2={dscRight.x} y2={dscRight.y}
              stroke="#7b7bdb" strokeWidth="1.5" strokeDasharray="4 2"
            />
          );
        })()}

        {/* ── MC / IC axis ── */}
        {(() => {
          const mc = polarToXY(cx, cy, rHouse, mcAngle);
          const ic = polarToXY(cx, cy, rHouse, (mcAngle + 180) % 360);
          return (
            <line
              x1={mc.x} y1={mc.y}
              x2={ic.x} y2={ic.y}
              stroke="#7b7bdb" strokeWidth="1" strokeDasharray="2 3"
            />
          );
        })()}

        {/* ── ASC / DSC / MC labels ── */}
        {[
          { label: "ASC", angle: 180, offset: -12 },
          { label: "DSC", angle: 0, offset: 12 },
          { label: "MC", angle: mcAngle, offset: -10 },
        ].map(({ label, angle, offset }) => {
          const pos = polarToXY(cx, cy, rHouse + 14, angle);
          return (
            <text
              key={label}
              x={pos.x + offset}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size * 0.025}
              fill="#aaaadd"
              fontWeight="bold"
            >
              {label}
            </text>
          );
        })}

        {/* ── Planet symbols ── */}
        {planetPositions.map((p) => {
          const symbol = PLANET_SYMBOLS[p.planet] || "?";
          const color = PLANET_COLORS[p.planet] || "#ffffff";
          const isHovered = hoveredPlanet?.planet === p.planet;

          // Line from planet to house ring
          const houseEdge = polarToXY(cx, cy, rHouse - 4, p.angle);

          return (
            <g
              key={p.planet}
              onMouseEnter={() => setHoveredPlanet(p)}
              onMouseLeave={() => setHoveredPlanet(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Connector line */}
              <line
                x1={p.svgX} y1={p.svgY}
                x2={houseEdge.x} y2={houseEdge.y}
                stroke={color}
                strokeWidth="0.5"
                opacity="0.4"
              />

              {/* Planet glow circle */}
              <circle
                cx={p.svgX}
                cy={p.svgY}
                r={isHovered ? size * 0.038 : size * 0.030}
                fill={color + "20"}
                stroke={color}
                strokeWidth={isHovered ? 1.5 : 1}
              />

              {/* Planet symbol */}
              <text
                x={p.svgX}
                y={p.svgY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size * 0.032}
                fill={color}
                style={{ fontFamily: "serif", userSelect: "none" }}
              >
                {symbol}
              </text>

              {/* Retrograde indicator */}
              {p.retrograde && (
                <text
                  x={p.svgX + size * 0.022}
                  y={p.svgY - size * 0.018}
                  textAnchor="middle"
                  fontSize={size * 0.018}
                  fill={color}
                  opacity="0.8"
                >
                  ℞
                </text>
              )}
            </g>
          );
        })}

        {/* ── Center circle ── */}
        <circle cx={cx} cy={cy} r={rCenter} fill="#0a0a1a" stroke="#5b5b9b" strokeWidth="1.5" />
        <text
          x={cx} y={cy - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.022}
          fill="#8888cc"
          style={{ fontFamily: "serif" }}
        >
          ☉
        </text>
        <text
          x={cx} y={cy + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.016}
          fill="#6666aa"
        >
          TATHIP
        </text>

        {/* ── Hover tooltip ── */}
        {hoveredPlanet && (() => {
          const p = planetPositions.find(pp => pp.planet === hoveredPlanet.planet)!;
          const tooltipX = p.svgX > cx ? p.svgX - size * 0.22 : p.svgX + size * 0.04;
          const tooltipY = Math.max(20, Math.min(p.svgY - 30, size - 80));
          const color = PLANET_COLORS[p.planet] || "#ffffff";
          const symbol = PLANET_SYMBOLS[p.planet] || "?";
          const signName = ZODIAC_SIGNS[p.sign]?.th || p.signNameThai;

          return (
            <g>
              <rect
                x={tooltipX}
                y={tooltipY}
                width={size * 0.22}
                height={70}
                rx="6"
                fill="#1a1a3a"
                stroke={color}
                strokeWidth="1"
                opacity="0.95"
              />
              <text x={tooltipX + 8} y={tooltipY + 18} fontSize={size * 0.028} fill={color} style={{ fontFamily: "serif" }}>
                {symbol}
              </text>
              <text x={tooltipX + 26} y={tooltipY + 18} fontSize={size * 0.026} fill={color} fontWeight="bold">
                {p.planet === "rahu" ? "ราหู" :
                 p.planet === "ketu" ? "เกตุ" :
                 p.planet === "sun" ? "อาทิตย์" :
                 p.planet === "moon" ? "จันทร์" :
                 p.planet === "mars" ? "อังคาร" :
                 p.planet === "mercury" ? "พุธ" :
                 p.planet === "jupiter" ? "พฤหัสบดี" :
                 p.planet === "venus" ? "ศุกร์" :
                 p.planet === "saturn" ? "เสาร์" : p.planet}
                {p.retrograde ? " ℞" : ""}
              </text>
              <text x={tooltipX + 8} y={tooltipY + 36} fontSize={size * 0.022} fill="#aaaadd">
                ราศี{signName}
              </text>
              <text x={tooltipX + 8} y={tooltipY + 52} fontSize={size * 0.020} fill="#8888bb">
                {formatDMS(p.degree)} | เรือน {p.house}
              </text>
              <text x={tooltipX + 8} y={tooltipY + 64} fontSize={size * 0.018} fill="#6666aa">
                ลองจิจูด {p.longitude.toFixed(2)}°
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
