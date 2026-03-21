"use client";

/**
 * Main chat interface using AI SDK v6 useChat hook.
 *
 * Renders a streaming conversation with the TaThip AI astrologer.
 * Automatically sends the user's birth data as the first message.
 */

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useChatStore } from "@/stores/chat-store";
import type { BirthData } from "@/stores/chat-store";
import { t } from "@/lib/i18n";
import type { UIMessage } from "ai";

interface ChatInterfaceProps {
  birthData: BirthData;
}

function createInitialMessages(birthData: BirthData): UIMessage[] {
  return [
    {
      id: "birth-data-msg",
      role: "user",
      parts: [
        {
          type: "text",
          text: `My birth details:\n- Date: ${birthData.date}\n- Time: ${birthData.time}\n- Place: ${birthData.place} (lat: ${birthData.lat}, lng: ${birthData.lng})\n\nPlease calculate my Thai birth chart and give me a reading.`,
        },
      ],
    },
  ];
}

export function ChatInterface({ birthData }: ChatInterfaceProps) {
  const language = useChatStore((s) => s.language);
  const initialMessages = createInitialMessages(birthData);

  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasSentInitial = useRef(false);

  // Send the initial birth data message automatically on mount
  useEffect(() => {
    if (hasSentInitial.current) return;
    hasSentInitial.current = true;
    sendMessage({
      text: `My birth details:\n- Date: ${birthData.date}\n- Time: ${birthData.time}\n- Place: ${birthData.place} (lat: ${birthData.lat}, lng: ${birthData.lng})\n\nPlease calculate my Thai birth chart and give me a reading.`,
    });
  }, [birthData, sendMessage]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const isLoading = status === "streaming" || status === "submitted";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    sendMessage({ text: trimmed });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <ScrollArea className="flex-1 px-4 py-4" ref={scrollRef}>
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-1 text-muted-foreground pl-2">
              <span className="animate-pulse">&#9679;</span>
              <span className="animate-pulse [animation-delay:200ms]">&#9679;</span>
              <span className="animate-pulse [animation-delay:400ms]">&#9679;</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-border/40 bg-background/80 backdrop-blur-xl p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex gap-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t(language, "askPlaceholder")}
            rows={1}
            className="flex-1 resize-none rounded-lg border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          />
          <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
            {t(language, "send")}
          </Button>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <Card
        className={`max-w-[85%] px-4 py-3 ${
          isUser
            ? "bg-purple-600/20 border-purple-500/30"
            : "bg-card/60 border-border/50"
        }`}
      >
        {message.parts?.map((part, i) => {
          if (part.type === "text") {
            return (
              <div
                key={i}
                className="prose prose-invert prose-sm max-w-none break-words"
              >
                {part.text}
              </div>
            );
          }
          return null;
        })}
      </Card>
    </div>
  );
}
