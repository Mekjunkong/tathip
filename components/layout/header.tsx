"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const language = useChatStore((s) => s.language);
  const setLanguage = useChatStore((s) => s.setLanguage);
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setUser = useAuthStore((s) => s.setUser);
  const setProfile = useAuthStore((s) => s.setProfile);
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push("/");
    router.refresh();
  }

  const initials = (profile?.display_name ?? user?.email ?? "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-lg tracking-widest bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            TATHIP
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/chat">
            <Button variant="ghost" size="sm">
              {t(language, "chat")}
            </Button>
          </Link>
          <Link href="/tarot">
            <Button variant="ghost" size="sm">
              {t(language, "tarot")}
            </Button>
          </Link>
          <Link href="/horoscope">
            <Button variant="ghost" size="sm">
              {language === "th" ? "ดวงรายวัน" : "Horoscope"}
            </Button>
          </Link>

          <button
            type="button"
            onClick={() => setLanguage(language === "th" ? "en" : "th")}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border/50"
          >
            {language === "th" ? "EN" : "TH"}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              {profile && profile.credits > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-violet-500/20 text-violet-300 cursor-pointer"
                  onClick={() => router.push("/pricing")}
                >
                  {profile.credits}{" "}
                  {language === "th" ? "เครดิต" : "credits"}
                </Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full h-8 w-8 inline-flex items-center justify-center hover:bg-accent transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-violet-600/30 text-violet-300 text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    {t(language, "profile")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/history")}>
                    {language === "th" ? "ประวัติดูดวง" : "History"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/pricing")}>
                    {language === "th" ? "ซื้อเครดิต" : "Buy Credits"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    {t(language, "signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
              >
                {t(language, "signIn")}
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
