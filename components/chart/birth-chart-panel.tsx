"use client";

/**
 * BirthChartPanel — Full birth chart display panel.
 *
 * Shows after the AI reading completes. Contains:
 * - Left: Astrology wheel SVG
 * - Right: Thai/Gregorian date info, planet table, house info
 * - Bottom tabs: Thai calendar, Vedic info, Chinese calendar
 */

import { useState, useEffect } from "react";
import type { BirthChart } from "@/types/astrology";
import { PLANET_NAMES, ZODIAC_SIGNS } from "@/types/astrology";
import { AstrologyWheel } from "./astrology-wheel";
import {
  toThaiDate,
  toThaiLunar,
  PLANET_SYMBOLS,
  PLANET_COLORS,
  ZODIAC_SYMBOLS,
  formatDMS,
} from "@/lib/astrology/thai-calendar";
import type { BirthData } from "@/stores/chat-store";

interface BirthChartPanelProps {
  birthData: BirthData;
  language?: "th" | "en";
}

type TabKey = "thai" | "vedic" | "planets" | "houses";

export function BirthChartPanel({ birthData, language = "th" }: BirthChartPanelProps) {
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("thai");

  useEffect(() => {
    async function fetchChart() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/calculate/birth-chart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            birthDate: birthData.date,
            birthTime: birthData.time || "12:00",
            lat: birthData.lat,
            lng: birthData.lng,
            timezone: 7,
          }),
        });
        if (!res.ok) throw new Error("Failed to calculate chart");
        const data: BirthChart = await res.json();
        setChart(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchChart();
  }, [birthData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-12 text-violet-300/60">
        <div className="w-5 h-5 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
        <span className="text-sm">{language === "th" ? "กำลังคำนวณดวงชะตา..." : "Calculating birth chart..."}</span>
      </div>
    );
  }

  if (error || !chart) {
    return (
      <div className="text-center py-8 text-red-400/70 text-sm">
        {language === "th" ? "ไม่สามารถคำนวณดวงชะตาได้" : "Failed to calculate chart"}
      </div>
    );
  }

  // Parse birth date for Thai calendar
  const [year, month, day] = birthData.date.split("-").map(Number);
  const [hour, minute] = (birthData.time || "12:00").split(":").map(Number);
  const birthDateObj = new Date(Date.UTC(year, month - 1, day, hour - 7, minute));
  const thaiDate = toThaiDate(birthDateObj, 7);
  const thaiLunar = toThaiLunar(birthDateObj);

  const ascSign = ZODIAC_SIGNS[chart.ascendantSign];
  const ascSymbol = ZODIAC_SYMBOLS[chart.ascendantSign];

  const tabs: { key: TabKey; label: string }[] = [
    { key: "thai", label: language === "th" ? "สุริยคติ" : "Solar Cal." },
    { key: "vedic", label: language === "th" ? "จันทรคติ" : "Lunar Cal." },
    { key: "planets", label: language === "th" ? "ดาวเคราะห์" : "Planets" },
    { key: "houses", label: language === "th" ? "เรือน" : "Houses" },
  ];

  return (
    <div className="w-full rounded-2xl border border-violet-500/15 bg-[#0a0a1a]/90 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-violet-500/10 bg-violet-500/5 flex items-center gap-2">
        <span className="text-violet-400 text-lg">🔮</span>
        <div>
          <h3 className="text-sm font-semibold text-violet-200">
            {language === "th" ? "แผนภูมิดาวเคราะห์" : "Natal Chart"}
          </h3>
          <p className="text-xs text-violet-400/50">
            {birthData.place} · {birthData.date} {birthData.time}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-violet-400/60 bg-violet-500/10 px-2 py-1 rounded-full">
          <span>{ascSymbol}</span>
          <span>ASC {language === "th" ? ascSign.th : ascSign.en}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-0">
        {/* Left: Wheel */}
        <div className="flex items-center justify-center p-4 lg:p-6 lg:border-r border-violet-500/10">
          <AstrologyWheel chart={chart} size={340} />
        </div>

        {/* Right: Info panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex border-b border-violet-500/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-violet-300 border-b-2 border-violet-400 bg-violet-500/5"
                    : "text-violet-400/40 hover:text-violet-400/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 p-4 overflow-y-auto max-h-[340px] scrollbar-thin">

            {/* ── Thai Solar Calendar ── */}
            {activeTab === "thai" && (
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-violet-400/40 uppercase tracking-wider mb-1">สุริยคติ</p>
                  <p className="text-base font-semibold text-orange-300">
                    {thaiDate.thaiDateString}
                  </p>
                  <p className="text-xs text-violet-300/60 mt-0.5">
                    {language === "th"
                      ? `ค.ศ.${thaiDate.gregorianYear}, ม.ศ.${thaiDate.gregorianYear - 638}, ม.ส.${thaiLunar.julaSakarat}`
                      : `CE ${thaiDate.gregorianYear}`}
                  </p>
                </div>

                <div className="border-t border-violet-500/10 pt-3">
                  <p className="text-[10px] text-violet-400/40 uppercase tracking-wider mb-1">จันทรคติไทย</p>
                  <p className="text-sm font-medium text-violet-200">
                    {thaiLunar.lunarDateString}
                  </p>
                </div>

                <div className="border-t border-violet-500/10 pt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-violet-400/40 mb-0.5">ลัคนา (ASC)</p>
                    <p className="text-violet-200 font-medium">
                      {ascSymbol} ราศี{ascSign.th} {formatDMS(chart.ascendant % 30)}
                    </p>
                  </div>
                  <div>
                    <p className="text-violet-400/40 mb-0.5">อายนัมศะ (Lahiri)</p>
                    <p className="text-violet-200 font-medium">
                      {chart.planets.length > 0
                        ? `~23° 51'`
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-violet-400/40 mb-0.5">ระบบบ้าน</p>
                    <p className="text-violet-200 font-medium">Whole Sign</p>
                  </div>
                  <div>
                    <p className="text-violet-400/40 mb-0.5">พิกัด</p>
                    <p className="text-violet-200 font-medium">
                      {birthData.lat.toFixed(2)}°N, {birthData.lng.toFixed(2)}°E
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Lunar Calendar ── */}
            {activeTab === "vedic" && (
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-violet-400/40 uppercase tracking-wider mb-1">จันทรคติไทย</p>
                  <p className="text-base font-semibold text-violet-200">
                    {thaiLunar.lunarDateString}
                  </p>
                </div>

                <div className="border-t border-violet-500/10 pt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-violet-400/40 mb-0.5">เดือนจันทรคติ</p>
                    <p className="text-violet-200">เดือน{thaiLunar.lunarMonthName}</p>
                  </div>
                  <div>
                    <p className="text-violet-400/40 mb-0.5">ข้างขึ้น/ข้างแรม</p>
                    <p className="text-violet-200">
                      {thaiLunar.phaseDesc} {thaiLunar.lunarDay} ค่ำ
                    </p>
                  </div>
                  <div>
                    <p className="text-violet-400/40 mb-0.5">ปีนักษัตร</p>
                    <p className="text-violet-200">{thaiLunar.thaiYearName}</p>
                  </div>
                  <div>
                    <p className="text-violet-400/40 mb-0.5">จุลศักราช</p>
                    <p className="text-violet-200">{thaiLunar.julaSakarat}</p>
                  </div>
                </div>

                <div className="border-t border-violet-500/10 pt-3">
                  <p className="text-[10px] text-violet-400/40 uppercase tracking-wider mb-2">ดาวจันทร์</p>
                  {(() => {
                    const moon = chart.planets.find((p) => p.planet === "moon");
                    if (!moon) return null;
                    const moonSign = ZODIAC_SIGNS[moon.sign];
                    return (
                      <div className="text-xs text-violet-200 space-y-1">
                        <p>ราศี{moonSign.th} {formatDMS(moon.degree)}</p>
                        <p className="text-violet-400/50">เรือน {moon.house} · {moon.retrograde ? "ถอยหลัง" : "เดินหน้า"}</p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* ── Planet Table ── */}
            {activeTab === "planets" && (
              <div className="space-y-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-violet-400/40 border-b border-violet-500/10">
                      <th className="text-left py-1.5 font-medium">ดาว</th>
                      <th className="text-left py-1.5 font-medium">ราศี</th>
                      <th className="text-right py-1.5 font-medium">องศา</th>
                      <th className="text-right py-1.5 font-medium">เรือน</th>
                      <th className="text-right py-1.5 font-medium">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chart.planets.map((p) => {
                      const color = PLANET_COLORS[p.planet] || "#ffffff";
                      const symbol = PLANET_SYMBOLS[p.planet] || "?";
                      const sign = ZODIAC_SIGNS[p.sign];
                      const nameTh = PLANET_NAMES[p.planet]?.th || p.planet;
                      return (
                        <tr key={p.planet} className="border-b border-violet-500/5 hover:bg-violet-500/5 transition-colors">
                          <td className="py-1.5 flex items-center gap-1.5">
                            <span style={{ color }} className="text-base">{symbol}</span>
                            <span className="text-violet-200">{nameTh}</span>
                          </td>
                          <td className="py-1.5 text-violet-300/70">
                            {ZODIAC_SYMBOLS[p.sign]} {sign.th}
                          </td>
                          <td className="py-1.5 text-right text-violet-300/70">
                            {p.degree.toFixed(1)}°
                          </td>
                          <td className="py-1.5 text-right text-violet-300/70">
                            {p.house}
                          </td>
                          <td className="py-1.5 text-right">
                            {p.retrograde ? (
                              <span className="text-orange-400/70 text-[10px]">℞ ถอย</span>
                            ) : (
                              <span className="text-green-400/50 text-[10px]">→ ตรง</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── Houses ── */}
            {activeTab === "houses" && (
              <div className="space-y-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-violet-400/40 border-b border-violet-500/10">
                      <th className="text-left py-1.5 font-medium">เรือน</th>
                      <th className="text-left py-1.5 font-medium">ราศี</th>
                      <th className="text-left py-1.5 font-medium">ดาวในเรือน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chart.houses.map((h) => {
                      const sign = ZODIAC_SIGNS[h.sign];
                      const planetsInHouse = chart.planets.filter((p) => p.house === h.house);
                      return (
                        <tr key={h.house} className="border-b border-violet-500/5 hover:bg-violet-500/5 transition-colors">
                          <td className="py-1.5 text-violet-200 font-medium">
                            เรือน {h.house}
                          </td>
                          <td className="py-1.5 text-violet-300/70">
                            {ZODIAC_SYMBOLS[h.sign]} {sign.th}
                          </td>
                          <td className="py-1.5">
                            {planetsInHouse.length > 0 ? (
                              <div className="flex gap-1 flex-wrap">
                                {planetsInHouse.map((p) => (
                                  <span
                                    key={p.planet}
                                    style={{ color: PLANET_COLORS[p.planet] }}
                                    className="text-sm"
                                    title={PLANET_NAMES[p.planet]?.th}
                                  >
                                    {PLANET_SYMBOLS[p.planet]}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-violet-400/30">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
