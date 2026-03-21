/**
 * Ingest local JSON files to Supabase pgvector.
 *
 * Reads all JSON files from data/scraped/, generates embeddings with
 * text-embedding-3-small, and inserts into the Supabase documents table.
 *
 * Usage: npx tsx scripts/ingest-json-to-supabase.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

const RATE_LIMIT_MS = 200;
const SCRAPED_DIR = join(process.cwd(), "data", "scraped");

interface ScrapedChunk {
  title: string;
  content: string;
  source: string;
  system: string;
  url: string;
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

  // Find all JSON files in the scraped directory
  const files = readdirSync(SCRAPED_DIR).filter((f) => f.endsWith(".json") && f !== ".gitkeep");

  if (files.length === 0) {
    console.error("No JSON files found in data/scraped/. Run 'npm run scrape' first.");
    process.exit(1);
  }

  console.log("=".repeat(60));
  console.log("  Ingesting scraped JSON to Supabase");
  console.log("=".repeat(60));
  console.log(`\nFound ${files.length} JSON files\n`);

  let totalInserted = 0;
  let totalChunks = 0;

  for (const file of files) {
    const filePath = join(SCRAPED_DIR, file);
    const chunks: ScrapedChunk[] = JSON.parse(readFileSync(filePath, "utf-8"));

    console.log(`Processing ${file} (${chunks.length} chunks)...`);
    totalChunks += chunks.length;

    let fileInserted = 0;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      console.log(`  [${i + 1}/${chunks.length}] Embedding (${chunk.content.length} chars)...`);

      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: chunk.content,
      });

      const { error } = await supabase.from("documents").insert({
        title: chunk.title,
        content: chunk.content,
        system: chunk.system,
        source: chunk.source,
        embedding,
      });

      if (error) {
        console.error(`  Failed to insert chunk ${i + 1}:`, error.message);
      } else {
        fileInserted++;
      }

      if (i < chunks.length - 1) {
        await sleep(RATE_LIMIT_MS);
      }
    }

    totalInserted += fileInserted;
    console.log(`  Inserted ${fileInserted}/${chunks.length} chunks from ${file}\n`);
  }

  console.log("=".repeat(60));
  console.log(`  Done! Inserted ${totalInserted}/${totalChunks} chunks from ${files.length} files.`);
  console.log("=".repeat(60) + "\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
