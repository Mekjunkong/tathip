"use client";

/**
 * Birth data collection form.
 *
 * Collects date, time, and place of birth from the user.
 * On submit, stores the data in the chat Zustand store.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";

/** Default coordinates for well-known Thai cities. */
const PLACE_COORDS: Record<string, { lat: number; lng: number }> = {
  bangkok: { lat: 13.7563, lng: 100.5018 },
  "chiang mai": { lat: 18.7883, lng: 98.9853 },
  phuket: { lat: 7.8804, lng: 98.3923 },
  "khon kaen": { lat: 16.4322, lng: 102.8236 },
  pattaya: { lat: 12.9236, lng: 100.8825 },
};

function resolveCoords(place: string): { lat: number; lng: number } {
  const key = place.toLowerCase().trim();
  return PLACE_COORDS[key] ?? PLACE_COORDS["bangkok"];
}

export function BirthDataForm() {
  const setBirthData = useChatStore((s) => s.setBirthData);
  const language = useChatStore((s) => s.language);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("Bangkok");

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
    <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border-border/50">
      <CardHeader className="text-center">
        <div className="text-4xl mb-2">&#128302;</div>
        <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          {t(language, "birthData")}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {t(language, "birthDataSubtext")}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birth-date">{t(language, "birthDate")}</Label>
            <Input
              id="birth-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth-time">{t(language, "birthTime")}</Label>
            <Input
              id="birth-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth-place">{t(language, "birthPlace")}</Label>
            <Input
              id="birth-place"
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Bangkok"
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              {t(language, "supportedPlaces")}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!date || !time}
          >
            {t(language, "beginReading")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
