"use client";

import { Header } from "@/components/layout/header";
import { Starfield } from "@/components/ui/starfield";
import { TarotCircle } from "@/components/tarot/tarot-circle";
import { useChatStore } from "@/stores/chat-store";

export default function TarotPage() {
  const language = useChatStore((s) => s.language);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Starfield />
      <Header />
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <TarotCircle language={language} />
      </main>
    </div>
  );
}
