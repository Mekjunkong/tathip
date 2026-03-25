"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore, type Profile } from "@/stores/auth-store";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const language = useChatStore((s) => s.language);
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const loading = useAuthStore((s) => s.loading);

  const [form, setForm] = useState({
    display_name: "",
    birth_date: "",
    birth_time: "",
    birth_place: "",
    gender: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (profile) {
      setForm({
        display_name: profile.display_name ?? "",
        birth_date: profile.birth_date ?? "",
        birth_time: profile.birth_time ?? "",
        birth_place: profile.birth_place ?? "",
        gender: profile.gender ?? "",
      });
    }
  }, [profile]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update({
        display_name: form.display_name || null,
        birth_date: form.birth_date || null,
        birth_time: form.birth_time || null,
        birth_place: form.birth_place || null,
        gender: form.gender || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile(data as Profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

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
      <main className="flex-1 container max-w-2xl py-8 px-4 space-y-6">
        {/* Credits Card */}
        <Card className="border-violet-500/20 bg-gradient-to-br from-violet-950/30 to-indigo-950/30">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <p className="text-sm text-muted-foreground">
                {language === "th" ? "เครดิตคงเหลือ" : "Credits Remaining"}
              </p>
              <p className="text-3xl font-bold text-violet-300">
                {profile?.credits ?? 0}
              </p>
            </div>
            <Button
              onClick={() => router.push("/pricing")}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            >
              {language === "th" ? "ซื้อเครดิต" : "Buy Credits"}
            </Button>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="border-violet-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t(language, "profile")}
              {saved && (
                <Badge variant="secondary" className="text-green-400">
                  {language === "th" ? "บันทึกแล้ว" : "Saved"}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>{t(language, "displayName")}</Label>
                <Input
                  value={form.display_name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, display_name: e.target.value }))
                  }
                  placeholder="John Smith"
                />
              </div>

              <Separator />

              <p className="text-sm font-medium text-violet-300">
                {t(language, "birthData")}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t(language, "birthDate")}</Label>
                  <Input
                    type="date"
                    value={form.birth_date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, birth_date: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t(language, "birthTime")}</Label>
                  <Input
                    type="time"
                    value={form.birth_time}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, birth_time: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t(language, "birthPlace")}</Label>
                <Input
                  value={form.birth_place}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, birth_place: e.target.value }))
                  }
                  placeholder="Bangkok"
                />
                <p className="text-xs text-muted-foreground">
                  {t(language, "supportedPlaces")}
                </p>
              </div>

              <div className="space-y-2">
                <Label>{t(language, "gender")}</Label>
                <select
                  value={form.gender}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, gender: e.target.value }))
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">—</option>
                  <option value="male">
                    {language === "th" ? "ชาย" : "Male"}
                  </option>
                  <option value="female">
                    {language === "th" ? "หญิง" : "Female"}
                  </option>
                  <option value="other">
                    {language === "th" ? "อื่นๆ" : "Other"}
                  </option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
              >
                {saving ? t(language, "saving") : t(language, "save")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="border-border/50">
          <CardContent className="py-4 text-sm text-muted-foreground">
            <p>
              {language === "th" ? "อีเมล" : "Email"}: {user.email}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
