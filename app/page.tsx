"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chat-store";
import { t } from "@/lib/i18n";

export default function HomePage() {
  const language = useChatStore((s) => s.language);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="text-6xl" role="img" aria-label="Crystal ball">
          &#128302;
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
          {t(language, "siteName")}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t(language, "tagline")}
        </p>
        <p className="text-muted-foreground">
          {t(language, "aiDescription")}
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/chat">
            <Button size="lg" className="text-lg px-8">
              {t(language, "startReading")}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
