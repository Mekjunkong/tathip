/**
 * Scrapes all Priority 1 knowledge sources to local JSON files.
 *
 * Downloads content from Thai astrology, numerology, and nakshatra sites,
 * chunks the text, and saves to data/scraped/{source-name}.json.
 *
 * Usage: npx tsx scripts/scrape-all-sources.ts
 */

import { scrapeToJson } from "./scrape-to-json";

interface SourceConfig {
  url: string;
  sourceName: string;
  title: string;
  system: string;
  selector?: string;
}

const SOURCES: SourceConfig[] = [
  // Thai Astrology Interpretation
  {
    url: "https://palachote.com/content/content5.html",
    sourceName: "palachote-planets-1",
    title: "Planet Meanings Part 1",
    system: "thai",
  },
  {
    url: "https://palachote.com/content/content6.html",
    sourceName: "palachote-planets-2",
    title: "Planet Meanings Part 2",
    system: "thai",
  },
  {
    url: "https://www.baankhunyai.com/16046120/%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%A0%E0%B8%9E%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%99%E0%B8%8A%E0%B8%B0%E0%B8%95%E0%B8%B2%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%A5%E0%B8%B0%E0%B8%A0%E0%B8%9E",
    sourceName: "baankhunyai-houses",
    title: "House Meanings",
    system: "thai",
  },
  {
    url: "https://www.baankhunyai.com/16046130/%E0%B8%A0%E0%B8%9E%E0%B8%95%E0%B8%B0%E0%B8%99%E0%B8%B9",
    sourceName: "baankhunyai-tanu",
    title: "House Tanu",
    system: "thai",
  },
  {
    url: "https://www.baankhunyai.com/16053042/%E0%B8%A3%E0%B8%B2%E0%B8%AB%E0%B8%B9%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3",
    sourceName: "baankhunyai-rahu",
    title: "Rahu Meaning",
    system: "thai",
  },
  {
    url: "https://www.baankhunyai.com/17177805/%E0%B8%94%E0%B8%B2%E0%B8%A7%E0%B8%84%E0%B8%B9%E0%B9%88",
    sourceName: "baankhunyai-planet-pairs",
    title: "Planet Pairs",
    system: "thai",
  },
  {
    url: "https://wanghora.wordpress.com/2-%E0%B9%80%E0%B8%81%E0%B8%A3%E0%B9%87%E0%B8%94%E0%B8%94%E0%B8%B2%E0%B8%A7%E0%B8%84%E0%B8%B9%E0%B9%88/",
    sourceName: "wanghora-planet-pairs",
    title: "Planetary Pairs (ดาวคู่)",
    system: "thai",
  },
  // Numerology
  {
    url: "https://www.sinsae.com/%E0%B9%80%E0%B8%A5%E0%B8%82%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C/",
    sourceName: "sinsae-numerology",
    title: "Thai Numerology System",
    system: "numerology",
  },
  // Nakshatras
  {
    url: "https://mariamgoodstudy.blogspot.com/2021/03/27.html",
    sourceName: "mariamgoodstudy-nakshatras",
    title: "27 Nakshatras",
    system: "thai",
  },
  // Auspicious Timing
  {
    url: "https://horoscope.trueid.net/detail/28bQgvRvML5q",
    sourceName: "trueid-auspicious-timing",
    title: "9 Types of Rueksa",
    system: "thai",
  },
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("=".repeat(60));
  console.log("  TaThip Knowledge Scraper - Priority 1 Sources");
  console.log("=".repeat(60));
  console.log(`\nScraping ${SOURCES.length} sources...\n`);

  const results: { source: string; chunks: number; status: string }[] = [];

  for (let i = 0; i < SOURCES.length; i++) {
    const source = SOURCES[i];
    console.log(`[${i + 1}/${SOURCES.length}] Scraping ${source.sourceName}...`);
    console.log(`  URL: ${source.url}`);

    try {
      const chunks = await scrapeToJson(source);
      console.log(`  OK: ${chunks.length} chunks saved to data/scraped/${source.sourceName}.json\n`);
      results.push({ source: source.sourceName, chunks: chunks.length, status: "OK" });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`  FAILED: ${message}\n`);
      results.push({ source: source.sourceName, chunks: 0, status: `FAILED: ${message}` });
    }

    // Be respectful: 1-second delay between requests
    if (i < SOURCES.length - 1) {
      await sleep(1000);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("  SCRAPING SUMMARY");
  console.log("=".repeat(60));
  console.log("");

  const totalChunks = results.reduce((sum, r) => sum + r.chunks, 0);
  const succeeded = results.filter((r) => r.status === "OK").length;

  for (const r of results) {
    const icon = r.status === "OK" ? "OK" : "FAIL";
    console.log(`  [${icon}] ${r.source}: ${r.chunks} chunks`);
  }

  console.log("");
  console.log(`  Total: ${succeeded}/${SOURCES.length} sources, ${totalChunks} chunks`);
  console.log("=".repeat(60) + "\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
