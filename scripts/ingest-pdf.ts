/**
 * PDF ingestion script.
 *
 * Extracts text from a PDF file, chunks it, generates embeddings,
 * and inserts into Supabase.
 *
 * Usage: npx tsx scripts/ingest-pdf.ts <path-to-pdf> [title] [system]
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { readFileSync } from "fs";
import { basename } from "path";
import { createClient } from "@supabase/supabase-js";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { PDFParse } from "pdf-parse";

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
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: npx tsx scripts/ingest-pdf.ts <path-to-pdf> [title] [system]");
    process.exit(1);
  }

  const pdfPath = args[0];
  const title = args[1] ?? basename(pdfPath, ".pdf");
  const system = args[2] ?? "thai";

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

  console.log(`Reading PDF: ${pdfPath}`);
  const buffer = readFileSync(pdfPath);

  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  const textResult = await parser.getText();
  const text = textResult.text;
  const pageCount = textResult.pages.length;

  console.log(`Extracted ${text.length} characters from ${pageCount} pages`);

  if (!text.trim()) {
    console.warn(
      "Warning: No text extracted. The PDF may be scanned/image-based. " +
        "Consider using OCR (e.g., Tesseract) to extract text first."
    );
    await parser.destroy();
    process.exit(0);
  }

  const chunks = chunkText(text);
  console.log(`Split into ${chunks.length} chunks`);

  if (chunks.length === 0) {
    console.warn("No valid chunks after filtering. All chunks may be too short.");
    await parser.destroy();
    process.exit(0);
  }

  let inserted = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkTitle = `${title} - ส่วนที่ ${i + 1}`;

    console.log(`[${i + 1}/${chunks.length}] Embedding chunk (${chunk.length} chars)...`);

    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: chunk,
    });

    const { error } = await supabase.from("documents").insert({
      title: chunkTitle,
      content: chunk,
      system,
      source: `PDF: ${basename(pdfPath)}`,
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

  await parser.destroy();
  console.log(`\nDone! Inserted ${inserted}/${chunks.length} chunks.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
