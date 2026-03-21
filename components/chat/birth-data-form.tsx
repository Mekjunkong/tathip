"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";

const CITIES = [
  { name: "Bangkok", nameThai: "กรุงเทพฯ", lat: 13.7563, lng: 100.5018 },
  { name: "Chiang Mai", nameThai: "เชียงใหม่", lat: 18.7883, lng: 98.9853 },
  { name: "Chiang Rai", nameThai: "เชียงราย", lat: 19.9105, lng: 99.8406 },
  { name: "Phuket", nameThai: "ภูเก็ต", lat: 7.8804, lng: 98.3923 },
  { name: "Khon Kaen", nameThai: "ขอนแก่น", lat: 16.4322, lng: 102.8236 },
  { name: "Pattaya", nameThai: "พัทยา", lat: 12.9236, lng: 100.8825 },
  { name: "Hat Yai", nameThai: "หาดใหญ่", lat: 7.0044, lng: 100.4747 },
  { name: "Nakhon Ratchasima", nameThai: "นครราชสีมา", lat: 14.9799, lng: 102.0978 },
  { name: "Udon Thani", nameThai: "อุดรธานี", lat: 17.4156, lng: 102.7872 },
  { name: "Surat Thani", nameThai: "สุราษฎร์ธานี", lat: 9.1382, lng: 99.3217 },
  { name: "Nonthaburi", nameThai: "นนทบุรี", lat: 13.8591, lng: 100.5217 },
  { name: "Ubon Ratchathani", nameThai: "อุบลราชธานี", lat: 15.2448, lng: 104.8473 },
];

const MONTHS_TH = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(month: number, year: number): number {
  if (!month || !year) return 31;
  return new Date(year, month, 0).getDate();
}

function resolveCoords(place: string): { lat: number; lng: number } {
  const lower = place.toLowerCase().trim();
  const city = CITIES.find(
    (c) => c.name.toLowerCase() === lower || c.nameThai === place.trim()
  );
  return city ? { lat: city.lat, lng: city.lng } : { lat: 13.7563, lng: 100.5018 };
}

const selectClass =
  "w-full rounded-md bg-background/30 border border-border/40 px-3 py-2 text-sm text-foreground focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 focus:outline-none transition-all appearance-none cursor-pointer";

export function BirthDataForm() {
  const setBirthData = useChatStore((s) => s.setBirthData);
  const language = useChatStore((s) => s.language);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [place, setPlace] = useState("Bangkok");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState(CITIES);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const months = language === "th" ? MONTHS_TH : MONTHS_EN;
  const maxDays = getDaysInMonth(Number(month), Number(year));

  useEffect(() => {
    if (Number(day) > maxDays) setDay(String(maxDays));
  }, [month, year, day, maxDays]);

  useEffect(() => {
    const query = place.toLowerCase().trim();
    if (!query) { setFilteredCities(CITIES); return; }
    setFilteredCities(
      CITIES.filter(
        (c) => c.name.toLowerCase().includes(query) || c.nameThai.includes(place.trim())
      )
    );
  }, [place]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectCity(city: (typeof CITIES)[number]) {
    setPlace(language === "th" ? city.nameThai : city.name);
    setShowSuggestions(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!day || !month || !year) return;

    const dateStr = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const timeStr = hour && minute ? `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}` : "12:00";
    const coords = resolveCoords(place);

    setBirthData({
      date: dateStr,
      time: timeStr,
      place: place || "Bangkok",
      lat: coords.lat,
      lng: coords.lng,
    });
  }

  const isValid = day && month && year;

  return (
    <Card className="w-full max-w-md glass-card border-purple-500/20 shadow-2xl shadow-purple-900/20 animate-fade-in-up">
      <CardHeader className="text-center pb-4">
        <div className="relative inline-block mx-auto mb-3">
          <div className="text-5xl animate-float">&#128302;</div>
          <div
            className="absolute inset-0 animate-glow-pulse"
            style={{
              background: "radial-gradient(circle, oklch(0.6 0.2 280 / 0.3), transparent 60%)",
              filter: "blur(15px)",
            }}
          />
        </div>
        <CardTitle className="text-xl text-mystical">
          {t(language, "birthData")}
        </CardTitle>
        <p className="text-sm text-muted-foreground/80 mt-1">
          {t(language, "birthDataSubtext")}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Birth Date - Dropdowns */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground/80">
              {t(language, "birthDate")}
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {/* Day */}
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className={selectClass}
                required
              >
                <option value="" disabled>
                  {language === "th" ? "วัน" : "Day"}
                </option>
                {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={String(d)}>
                    {d}
                  </option>
                ))}
              </select>

              {/* Month */}
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={selectClass}
                required
              >
                <option value="" disabled>
                  {language === "th" ? "เดือน" : "Month"}
                </option>
                {months.map((m, i) => (
                  <option key={i} value={String(i + 1)}>
                    {m}
                  </option>
                ))}
              </select>

              {/* Year */}
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={selectClass}
                required
              >
                <option value="" disabled>
                  {language === "th" ? "ปี" : "Year"}
                </option>
                {Array.from({ length: 100 }, (_, i) => currentYear - i).map((y) => (
                  <option key={y} value={String(y)}>
                    {language === "th" ? y + 543 : y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Birth Time - Dropdowns */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground/80">
              {t(language, "birthTime")}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {/* Hour */}
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className={selectClass}
              >
                <option value="">
                  {language === "th" ? "ชั่วโมง" : "Hour"}
                </option>
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <option key={h} value={String(h)}>
                    {String(h).padStart(2, "0")}
                  </option>
                ))}
              </select>

              {/* Minute */}
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className={selectClass}
              >
                <option value="">
                  {language === "th" ? "นาที" : "Min"}
                </option>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                  <option key={m} value={String(m)}>
                    {String(m).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-muted-foreground/60">
              {t(language, "birthTimeHint")}
            </p>
          </div>

          {/* Place Input with Autocomplete */}
          <div className="space-y-2 relative" ref={suggestionsRef}>
            <Label className="text-sm font-medium text-foreground/80">
              {t(language, "birthPlace")}
            </Label>
            <Input
              type="text"
              value={place}
              onChange={(e) => { setPlace(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Bangkok"
              autoComplete="off"
              className="bg-background/30 border-border/40 focus:border-purple-500/50 focus:ring-purple-500/30 transition-all"
            />
            {showSuggestions && filteredCities.length > 0 && (
              <div className="absolute z-50 w-full mt-1 glass-card rounded-lg border border-border/40 shadow-xl max-h-48 overflow-y-auto animate-fade-in">
                {filteredCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => selectCity(city)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-purple-500/10 transition-colors flex justify-between items-center"
                  >
                    <span>{language === "th" ? city.nameThai : city.name}</span>
                    <span className="text-xs text-muted-foreground/50">
                      {language === "th" ? city.name : city.nameThai}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full py-5 text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/20 transition-all hover:shadow-purple-900/40 hover:scale-[1.01] cursor-pointer"
            disabled={!isValid}
          >
            {t(language, "beginReading")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
