/**
 * Master scraper that saves web content to local JSON files.
 *
 * Fetches a URL with cheerio, extracts text content from CSS selectors,
 * chunks into ~1500 character segments, and saves to data/scraped/.
 *
 * Usage: import { scrapeToJson } from "./scrape-to-json"
 */

import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import * as cheerio from "cheerio";

const CHUNK_SIZE = 1500;
const MIN_CHUNK_SIZE = 80;
const USER_AGENT = "Mozilla/5.0 (compatible; TaThipBot/1.0)";

const CONTENT_SELECTORS = [
  ".entry-content",
  ".post-content",
  "article",
  ".content",
  "main",
  "#content",
  ".mw-parser-output",
  ".post-body",
  ".blog-content",
  ".date-posts",
  ".MsoNormal",
  "body",
];

export interface ScrapedChunk {
  title: string;
  content: string;
  source: string;
  system: string;
  url: string;
}

function chunkText(text: string): string[] {
  // First try splitting by double newlines (paragraphs)
  const paragraphs = text.split(/\n\n+/);

  // If no paragraph breaks or only one big block, split by sentences
  const segments =
    paragraphs.length <= 1 || (paragraphs.length === 1 && paragraphs[0].length > CHUNK_SIZE)
      ? splitBySentences(text)
      : paragraphs;

  const chunks: string[] = [];
  let current = "";

  for (const segment of segments) {
    const trimmed = segment.trim();
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

function splitBySentences(text: string): string[] {
  // Split on Thai and English sentence boundaries
  // Thai uses spaces between clauses; also split on common Thai sentence-enders
  const sentences = text.split(/(?<=[.!?。\n])\s+|(?<=\s{2,})/);

  // If sentences are still too big, force-split at CHUNK_SIZE boundaries on word breaks
  const result: string[] = [];
  for (const sentence of sentences) {
    if (sentence.length <= CHUNK_SIZE) {
      result.push(sentence);
    } else {
      // Force split long sentences at space boundaries
      let remaining = sentence;
      while (remaining.length > CHUNK_SIZE) {
        let splitAt = remaining.lastIndexOf(" ", CHUNK_SIZE);
        if (splitAt === -1) splitAt = CHUNK_SIZE;
        result.push(remaining.slice(0, splitAt));
        remaining = remaining.slice(splitAt).trim();
      }
      if (remaining) result.push(remaining);
    }
  }
  return result;
}

function cleanText(text: string): string {
  return text
    .replace(/[ \t]+/g, " ")          // collapse horizontal whitespace only
    .replace(/\n\s*\n\s*\n+/g, "\n\n") // normalize multiple blank lines to double
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}

export async function scrapeToJson(options: {
  url: string;
  sourceName: string;
  title: string;
  system: string;
  selector?: string;
}): Promise<ScrapedChunk[]> {
  const { url, sourceName, title, system, selector } = options;
  const outputDir = join(process.cwd(), "data", "scraped");

  mkdirSync(outputDir, { recursive: true });

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove non-content elements
  $("script, style, nav, footer, header, .sidebar, .widget, .comment, .ads, .advertisement, .nav, .menu, .breadcrumb").remove();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let contentEl: cheerio.Cheerio<any> | null = null;

  if (selector) {
    contentEl = $(selector);
    if (!contentEl.length) {
      console.warn(`  Selector "${selector}" not found, trying fallbacks...`);
      contentEl = null;
    }
  }

  if (!contentEl) {
    for (const sel of CONTENT_SELECTORS) {
      const el = $(sel);
      if (el.length && el.text().trim().length > 200) {
        contentEl = el;
        break;
      }
    }
  }

  if (!contentEl || !contentEl.length) {
    throw new Error(`No content found at ${url}`);
  }

  const rawText = contentEl.text();
  const cleaned = cleanText(rawText);
  const chunks = chunkText(cleaned);

  const result: ScrapedChunk[] = chunks.map((content, i) => ({
    title: `${title} - Part ${i + 1}`,
    content,
    source: sourceName,
    system,
    url,
  }));

  const outputPath = join(outputDir, `${sourceName}.json`);
  writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");

  return result;
}
