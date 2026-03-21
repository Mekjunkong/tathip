/**
 * RAG (Retrieval-Augmented Generation) query function.
 *
 * Generates an embedding for the query string and searches the
 * pgvector-backed `documents` table via the `match_documents` RPC.
 */

import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface KnowledgeResult {
  id: string;
  title: string;
  content: string;
  system: string;
  source: string;
  similarity: number;
}

export async function queryKnowledge(
  query: string,
  options: {
    system?: string;
    matchCount?: number;
    threshold?: number;
  } = {}
): Promise<KnowledgeResult[]> {
  const { system, matchCount = 5, threshold = 0.7 } = options;

  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: query,
  });

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: threshold,
    match_count: matchCount,
    filter_system: system ?? null,
  });

  if (error) {
    console.error("RAG query error:", error);
    return [];
  }

  return data as KnowledgeResult[];
}
