/**
 * Streaming chat endpoint using AI SDK v6.
 *
 * Accepts UIMessage[] from the client, converts them to model messages,
 * and streams back the assistant response with tool calling support.
 *
 * Rate limiting:
 * - Anonymous: 3 free/day (IP-based)
 * - Authenticated free: 5 free/day (DB-backed)
 * - Authenticated with credits: unlimited (1 credit/message)
 */

import { streamText, convertToModelMessages, stepCountIs } from "ai";
import type { UIMessage } from "ai";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { chatTools } from "@/lib/ai/tools";
import { checkAnonLimit, checkAuthCredit } from "@/lib/credits";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  // Check auth
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Rate limit / credit check
  let creditCheck;
  if (user) {
    creditCheck = await checkAuthCredit(user.id);
  } else {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    creditCheck = checkAnonLimit(ip);
  }

  if (!creditCheck.allowed) {
    return Response.json(
      {
        error: creditCheck.isAuthenticated
          ? "Daily limit reached. Purchase credits for unlimited readings."
          : "Daily message limit reached. Sign up for more free readings.",
        remaining: 0,
        isAuthenticated: creditCheck.isAuthenticated,
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
