"use client";

/**
 * Main chat interface using AI SDK v6 useChat hook.
 *
 * Renders a streaming conversation with the TaThip AI fortune teller.
 * Automatically sends the user's birth data as the first message.
 * Features: markdown rendering, fade-in animations, typing indicator.
 */

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/chat-store";
import type { BirthData } from "@/stores/chat-store";
import { t } from "@/lib/i18n";
import type { UIMessage } from "ai";
import { Send } from "lucide-react";

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

  const { messages, sendMessage, status, error } = useChat({
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
      <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
        <div className="max-w-2xl mx-auto space-y-5">
          {messages.map((message, index) => (
            <MessageBubble key={message.id} message={message} index={index} />
          ))}

          {/* Typing indicator */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-sm">
                &#128302;
              </div>
              <div className="glass-card rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-typing-dot" />
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-typing-dot delay-200" />
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-typing-dot delay-400" />
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex justify-center animate-fade-in">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl px-5 py-3 text-center max-w-sm">
                <p className="text-sm font-medium text-destructive mb-1">
                  {t(language, "errorTitle")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(language, "errorMessage")}
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-border/30 bg-background/60 backdrop-blur-xl p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex items-end gap-3"
        >
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t(language, "askPlaceholder")}
              rows={1}
              className="w-full resize-none rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm px-4 py-3 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 focus-visible:border-purple-500/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="h-11 w-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/20 transition-all hover:shadow-purple-900/40 disabled:opacity-40 flex-shrink-0 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

/**
 * Renders simple markdown-like text: **bold**, *italic*, bullet lists, headings.
 */
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-5 space-y-1 my-2">
          {listItems.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Bullet list items
    if (line.match(/^[\-\*]\s+/)) {
      listItems.push(line.replace(/^[\-\*]\s+/, ""));
      continue;
    }

    flushList();

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={i} className="font-semibold text-purple-300 mt-3 mb-1">
          {formatInline(line.slice(4))}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h3 key={i} className="font-bold text-purple-200 mt-4 mb-1 text-base">
          {formatInline(line.slice(3))}
        </h3>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="leading-relaxed">
          {formatInline(line)}
        </p>
      );
    }
  }

  flushList();

  return <>{elements}</>;
}

/**
 * Format inline markdown: **bold**, *italic*
 */
function formatInline(text: string): React.ReactNode {
  // Split on bold and italic patterns
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-purple-300">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-purple-200/80">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

function MessageBubble({ message, index }: { message: UIMessage; index: number }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 animate-fade-in-up ${isUser ? "flex-row-reverse" : ""}`}
      style={{
        animationDelay: `${Math.min(index * 50, 300)}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-sm shadow-lg shadow-purple-900/20">
          &#128302;
        </div>
      )}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0 text-sm">
          &#128100;
        </div>
      )}

      {/* Message content */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-purple-600/20 border border-purple-500/25 rounded-tr-sm"
            : "glass-card rounded-tl-sm"
        }`}
      >
        {message.parts?.map((part, i) => {
          if (part.type === "text") {
            return (
              <div
                key={i}
                className="prose-chat text-sm text-foreground/90 break-words"
              >
                {isUser ? part.text : renderMarkdown(part.text)}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
