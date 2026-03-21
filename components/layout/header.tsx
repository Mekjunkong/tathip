"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";

export function Header() {
  const language = useChatStore((s) => s.language);
  const setLanguage = useChatStore((s) => s.setLanguage);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg tracking-widest bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-cinzel), serif" }}>
            TATHIP
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/chat">
            <Button variant="ghost" size="sm">
              {t(language, "chat")}
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setLanguage(language === "th" ? "en" : "th")}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border/50"
          >
            {language === "th" ? "EN" : "TH"}
          </button>
        </nav>
      </div>
    </header>
  );
}
