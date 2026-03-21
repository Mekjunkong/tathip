/**
 * Wikisource ingestion script.
 *
 * Scrapes the Thai Wikisource page for คัมภีร์โหราศาสตร์ไทยมาตรฐาน,
 * chunks the text, generates embeddings, and inserts into Supabase.
 *
 * Usage: npx tsx scripts/ingest-wikisource.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import * as cheerio from "cheerio";

const WIKI_URL =
  "https://th.wikisource.org/wiki/%E0%B8%84%E0%B8%B1%E0%B8%A1%E0%B8%A0%E0%B8%B5%E0%B8%A3%E0%B9%8C%E0%B9%82%E0%B8%AB%E0%B8%A3%E0%B8%B2%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%A1%E0%B8%B2%E0%B8%95%E0%B8%A3%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B9%E0%B8%A3%E0%B8%93%E0%B9%8C";

const CHUNK_SIZE = 2000;
const MIN_CHUNK_SIZE = 100;
const RATE_LIMIT_MS = 200;

function chunkText(text: string): string[] {
  const paragraphs = text.split(/\n\n+/);
  const chunks: string[] = [];
  let current = "";

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;

    if (current.length + trimmed.length + 2 > CHUNK_SIZE && current.length > 0) {
      chunks.push(current.trim());
      current = trimmed;
    } else {
      current += (current ? "\n\n" : "") + trimmed;
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks.filter((c) => c.length >= MIN_CHUNK_SIZE);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }
  if (!openaiKey) {
    console.error("Missing OPENAI_API_KEY");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Fetching Wikisource page...");
  const response = await fetch(WIKI_URL);
  if (!response.ok) {
    console.error(`Failed to fetch page: ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Extract text from the main content area
  const contentEl = $(".mw-parser-output");
  if (!contentEl.length) {
    console.error("Could not find .mw-parser-output element");
    process.exit(1);
  }

  // Remove navigation, edit links, and other non-content elements
  contentEl.find(".mw-editsection, .navbox, .catlinks, .toc, style, script").remove();

  const rawText = contentEl.text();
  const chunks = chunkText(rawText);

  console.log(`Extracted ${rawText.length} characters, split into ${chunks.length} chunks`);

  if (chunks.length === 0) {
    console.error("No valid chunks extracted");
    process.exit(1);
  }

  let inserted = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const title = `คัมภีร์โหราศาสตร์ไทยมาตรฐาน - ส่วนที่ ${i + 1}`;

    console.log(`[${i + 1}/${chunks.length}] Embedding chunk (${chunk.length} chars)...`);

    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: chunk,
    });

    const { error } = await supabase.from("documents").insert({
      title,
      content: chunk,
      system: "thai",
      source: "Thai Wikisource",
      embedding,
    });

    if (error) {
      console.error(`Failed to insert chunk ${i + 1}:`, error.message);
    } else {
      inserted++;
    }

    if (i < chunks.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  console.log(`\nDone! Inserted ${inserted}/${chunks.length} chunks.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
