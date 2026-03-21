"use client";

/**
 * Chat page — the main AI reading experience.
 *
 * Shows a birth data form initially. Once submitted, switches to
 * the streaming chat interface with the TaThip AI astrologer.
 */

import { Header } from "@/components/layout/header";
import { BirthDataForm } from "@/components/chat/birth-data-form";
import { ChatInterface } from "@/components/chat/chat-interface";
import { useChatStore } from "@/stores/chat-store";

export default function ChatPage() {
  const birthData = useChatStore((s) => s.birthData);
  const showBirthForm = useChatStore((s) => s.showBirthForm);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {showBirthForm && !birthData ? (
        <main className="flex-1 flex items-center justify-center px-4">
          <BirthDataForm />
        </main>
      ) : birthData ? (
        <main className="flex-1 overflow-hidden">
          <ChatInterface birthData={birthData} />
        </main>
      ) : null}
    </div>
  );
}
