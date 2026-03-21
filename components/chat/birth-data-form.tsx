"use client";

/**
 * Birth data collection form with improved UX.
 *
 * Features:
 * - Place autocomplete dropdown with Thai cities
 * - Visual mystical card styling
 * - Smooth animations
 * - Better input styling
 */

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";

/** City database with coordinates */
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

function resolveCoords(place: string): { lat: number; lng: number } {
  const lower = place.toLowerCase().trim();
  const city = CITIES.find(
    (c) =>
      c.name.toLowerCase() === lower ||
      c.nameThai === place.trim()
  );
  return city
    ? { lat: city.lat, lng: city.lng }
    : { lat: 13.7563, lng: 100.5018 }; // default Bangkok
}

export function BirthDataForm() {
  const setBirthData = useChatStore((s) => s.setBirthData);
  const language = useChatStore((s) => s.language);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("Bangkok");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState(CITIES);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter cities based on input
  useEffect(() => {
    const query = place.toLowerCase().trim();
    if (!query) {
      setFilteredCities(CITIES);
      return;
    }
    setFilteredCities(
      CITIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.nameThai.includes(place.trim())
      )
    );
  }, [place]);

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
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
    if (!date || !time) return;

    const coords = resolveCoords(place);
    setBirthData({
      date,
      time,
      place: place || "Bangkok",
      lat: coords.lat,
      lng: coords.lng,
    });
  }

  return (
    <Card className="w-full max-w-md glass-card border-purple-500/20 shadow-2xl shadow-purple-900/20 animate-fade-in-up">
      <CardHeader className="text-center pb-4">
        <div className="relative inline-block mx-auto mb-3">
          <div className="text-5xl animate-float">&#128302;</div>
          <div
            className="absolute inset-0 animate-glow-pulse"
            style={{
              background:
                "radial-gradient(circle, oklch(0.6 0.2 280 / 0.3), transparent 60%)",
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
          {/* Date Input */}
          <div className="space-y-2">
            <Label
              htmlFor="birth-date"
              className="text-sm font-medium text-foreground/80"
            >
              {t(language, "birthDate")}
            </Label>
            <Input
              id="birth-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="bg-background/30 border-border/40 focus:border-purple-500/50 focus:ring-purple-500/30 transition-all"
            />
          </div>

          {/* Time Input */}
          <div className="space-y-2">
            <Label
              htmlFor="birth-time"
              className="text-sm font-medium text-foreground/80"
            >
              {t(language, "birthTime")}
            </Label>
            <Input
              id="birth-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="bg-background/30 border-border/40 focus:border-purple-500/50 focus:ring-purple-500/30 transition-all"
            />
            <p className="text-xs text-muted-foreground/60">
              {t(language, "birthTimeHint")}
            </p>
          </div>

          {/* Place Input with Autocomplete */}
          <div className="space-y-2 relative" ref={suggestionsRef}>
            <Label
              htmlFor="birth-place"
              className="text-sm font-medium text-foreground/80"
            >
              {t(language, "birthPlace")}
            </Label>
            <Input
              id="birth-place"
              type="text"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Bangkok"
              autoComplete="off"
              className="bg-background/30 border-border/40 focus:border-purple-500/50 focus:ring-purple-500/30 transition-all"
            />

            {/* Autocomplete dropdown */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-5 text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/20 transition-all hover:shadow-purple-900/40 hover:scale-[1.01] cursor-pointer"
            disabled={!date || !time}
          >
            {t(language, "beginReading")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
