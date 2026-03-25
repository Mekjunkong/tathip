"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { useChatStore } from "@/stores/chat-store";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Reading {
  id: string;
  session_id: string;
  systems_used: string[];
  summary: string | null;
  language: string;
  created_at: string;
}

const SYSTEM_LABELS: Record<string, { th: string; en: string; icon: string }> = {
  thai_astrology: { th: "โหราศาสตร์ไทย", en: "Thai Astrology", icon: "🌟" },
  tarot: { th: "ไพ่ทาโรต์", en: "Tarot", icon: "🃏" },
  numerology: { th: "เลขศาสตร์", en: "Numerology", icon: "🔢" },
  bazi: { th: "บาจื่อ", en: "BaZi", icon: "🏛️" },
  fengshui: { th: "ฮวงจุ้ย", en: "Feng Shui", icon: "🧭" },
};

export function HistoryView() {
  const language = useChatStore((s) => s.language);
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const router = useRouter();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    async function fetchReadings() {
      const supabase = createClient();
      const { data } = await supabase
        .from("readings")
        .select("id, session_id, systems_used, summary, language, created_at")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50);

      setReadings(data ?? []);
      setFetching(false);
    }

    fetchReadings();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-3xl py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-violet-200">
            {language === "th" ? "ประวัติการดูดวง" : "Reading History"}
          </h1>
          <Link href="/chat">
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            >
              {language === "th" ? "ดูดวงใหม่" : "New Reading"}
            </Button>
          </Link>
        </div>

        {fetching ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border/30 animate-pulse">
                <CardContent className="py-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : readings.length === 0 ? (
          <Card className="border-violet-500/20">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                {language === "th"
                  ? "ยังไม่มีประวัติการดูดวง"
                  : "No readings yet"}
              </p>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600">
                  {language === "th" ? "เริ่มดูดวง" : "Start Reading"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {readings.map((r) => (
              <Card
                key={r.id}
                className="border-border/30 hover:border-violet-500/30 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {(r.systems_used ?? []).map((sys) => {
                        const label = SYSTEM_LABELS[sys];
                        return (
                          <Badge
                            key={sys}
                            variant="secondary"
                            className="text-xs bg-violet-500/15 text-violet-300"
                          >
                            {label?.icon ?? "✨"}{" "}
                            {label?.[language] ?? sys}
                          </Badge>
                        );
                      })}
                    </div>
                    <time className="text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString(
                        language === "th" ? "th-TH" : "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </time>
                  </div>
                </CardHeader>
                {r.summary && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {r.summary}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
