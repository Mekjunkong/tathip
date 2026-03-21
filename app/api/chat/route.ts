/**
 * Streaming chat endpoint using AI SDK v6.
 *
 * Accepts UIMessage[] from the client, converts them to model messages,
 * and streams back the assistant response with tool calling support.
 */

import { streamText, convertToModelMessages, stepCountIs } from "ai";
import type { UIMessage } from "ai";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { chatTools } from "@/lib/ai/tools";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Rate limiting by IP
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  const rateCheck = checkRateLimit(ip);

  if (!rateCheck.allowed) {
    return Response.json(
      {
        error: "Daily message limit reached. Please try again tomorrow.",
        remaining: 0,
      },
      { status: 429 }
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: "anthropic/claude-sonnet-4.6",
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    tools: chatTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
