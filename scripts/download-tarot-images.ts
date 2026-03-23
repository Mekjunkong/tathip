/**
 * Download public domain Rider-Waite-Smith tarot card images
 * from Wikimedia Commons to public/tarot/
 *
 * Run: npx tsx scripts/download-tarot-images.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const OUT_DIR = join(process.cwd(), "public", "tarot");

// Wikimedia Commons filenames for the classic Rider-Waite-Smith deck
// These are public domain (published 1909, artist Pamela Colman Smith)
const WIKIMEDIA_BASE = "https://upload.wikimedia.org/wikipedia/commons";

interface CardImage {
  id: string;
  path: string; // Wikimedia path after base
}

const MAJOR_ARCANA: CardImage[] = [
  { id: "major-0",  path: "/9/90/RWS_Tarot_00_Fool.jpg" },
  { id: "major-1",  path: "/d/de/RWS_Tarot_01_Magician.jpg" },
  { id: "major-2",  path: "/8/88/RWS_Tarot_02_High_Priestess.jpg" },
  { id: "major-3",  path: "/d/d2/RWS_Tarot_03_Empress.jpg" },
  { id: "major-4",  path: "/c/c3/RWS_Tarot_04_Emperor.jpg" },
  { id: "major-5",  path: "/8/8d/RWS_Tarot_05_Hierophant.jpg" },
  { id: "major-6",  path: "/d/db/RWS_Tarot_06_Lovers.jpg" },
  { id: "major-7",  path: "/9/9b/RWS_Tarot_07_Chariot.jpg" },
  { id: "major-8",  path: "/f/f5/RWS_Tarot_08_Strength.jpg" },
  { id: "major-9",  path: "/4/4d/RWS_Tarot_09_Hermit.jpg" },
  { id: "major-10", path: "/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
  { id: "major-11", path: "/e/e0/RWS_Tarot_11_Justice.jpg" },
  { id: "major-12", path: "/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
  { id: "major-13", path: "/d/d7/RWS_Tarot_13_Death.jpg" },
  { id: "major-14", path: "/f/f8/RWS_Tarot_14_Temperance.jpg" },
  { id: "major-15", path: "/5/55/RWS_Tarot_15_Devil.jpg" },
  { id: "major-16", path: "/5/53/RWS_Tarot_16_Tower.jpg" },
  { id: "major-17", path: "/d/d2/RWS_Tarot_17_Star.jpg" },
  { id: "major-18", path: "/7/7f/RWS_Tarot_18_Moon.jpg" },
  { id: "major-19", path: "/1/17/RWS_Tarot_19_Sun.jpg" },
  { id: "major-20", path: "/d/dd/RWS_Tarot_20_Judgement.jpg" },
  { id: "major-21", path: "/f/ff/RWS_Tarot_21_World.jpg" },
];

// Minor arcana — Wands
const WANDS: CardImage[] = Array.from({ length: 14 }, (_, i) => ({
  id: `wands-${i + 1}`,
  path: `/wands${String(i + 1).padStart(2, "0")}.jpg`,
}));

// Minor arcana — Cups
const CUPS: CardImage[] = Array.from({ length: 14 }, (_, i) => ({
  id: `cups-${i + 1}`,
  path: `/cups${String(i + 1).padStart(2, "0")}.jpg`,
}));

// Minor arcana — Swords
const SWORDS: CardImage[] = Array.from({ length: 14 }, (_, i) => ({
  id: `swords-${i + 1}`,
  path: `/swords${String(i + 1).padStart(2, "0")}.jpg`,
}));

// Minor arcana — Pentacles
const PENTACLES: CardImage[] = Array.from({ length: 14 }, (_, i) => ({
  id: `pentacles-${i + 1}`,
  path: `/pentacles${String(i + 1).padStart(2, "0")}.jpg`,
}));

// Minor arcana Wikimedia paths (RWS)
const MINOR_WIKI: Record<string, string[]> = {
  wands: [
    "/1/11/Wands01.jpg", "/0/0f/Wands02.jpg", "/f/ff/Wands03.jpg", "/0/0d/Wands04.jpg",
    "/9/9d/Wands05.jpg", "/3/3b/Wands06.jpg", "/e/e4/Wands07.jpg", "/6/6a/Wands08.jpg",
    "/4/4d/Wands09.jpg", "/0/0b/Wands10.jpg", "/6/6a/Wands11.jpg", "/1/16/Wands12.jpg",
    "/0/0d/Wands13.jpg", "/c/ce/Wands14.jpg",
  ],
  cups: [
    "/3/36/Cups01.jpg", "/f/f8/Cups02.jpg", "/7/7a/Cups03.jpg", "/3/35/Cups04.jpg",
    "/d/d7/Cups05.jpg", "/1/17/Cups06.jpg", "/a/ae/Cups07.jpg", "/6/60/Cups08.jpg",
    "/2/24/Cups09.jpg", "/8/84/Cups10.jpg", "/a/ad/Cups11.jpg", "/f/fa/Cups12.jpg",
    "/6/6a/Cups13.jpg", "/0/04/Cups14.jpg",
  ],
  swords: [
    "/1/1a/Swords01.jpg", "/9/9e/Swords02.jpg", "/0/02/Swords03.jpg", "/b/bf/Swords04.jpg",
    "/6/61/Swords05.jpg", "/2/29/Swords06.jpg", "/3/34/Swords07.jpg", "/a/a7/Swords08.jpg",
    "/2/2f/Swords09.jpg", "/d/d4/Swords10.jpg", "/4/4c/Swords11.jpg", "/d/d4/Swords12.jpg",
    "/6/60/Swords13.jpg", "/3/33/Swords14.jpg",
  ],
  pentacles: [
    "/f/fd/Pents01.jpg", "/9/9f/Pents02.jpg", "/4/42/Pents03.jpg", "/3/35/Pents04.jpg",
    "/9/96/Pents05.jpg", "/a/a6/Pents06.jpg", "/6/6a/Pents07.jpg", "/4/49/Pents08.jpg",
    "/f/f0/Pents09.jpg", "/4/42/Pents10.jpg", "/e/ec/Pents11.jpg", "/d/d5/Pents12.jpg",
    "/8/88/Pents13.jpg", "/1/1c/Pents14.jpg",
  ],
};

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "TaThip/1.0 (fortune-telling-app; contact@tathip.com)",
      },
    });
    if (!res.ok) {
      console.log(`  ✗ ${res.status} — ${url}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(filepath, buffer);
    return true;
  } catch (err) {
    console.log(`  ✗ Error — ${url}: ${err}`);
    return false;
  }
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  let downloaded = 0;
  let failed = 0;

  // Major Arcana
  console.log("Downloading Major Arcana (22 cards)...");
  for (const card of MAJOR_ARCANA) {
    const outPath = join(OUT_DIR, `${card.id}.jpg`);
    if (existsSync(outPath)) {
      console.log(`  ✓ ${card.id} (exists)`);
      downloaded++;
      continue;
    }
    const url = `${WIKIMEDIA_BASE}${card.path}`;
    console.log(`  ↓ ${card.id}...`);
    const ok = await downloadImage(url, outPath);
    if (ok) {
      downloaded++;
      console.log(`  ✓ ${card.id}`);
    } else {
      failed++;
    }
    // Polite delay
    await new Promise((r) => setTimeout(r, 300));
  }

  // Minor Arcana
  for (const suit of ["wands", "cups", "swords", "pentacles"] as const) {
    console.log(`\nDownloading ${suit} (14 cards)...`);
    const paths = MINOR_WIKI[suit];
    for (let i = 0; i < 14; i++) {
      const id = `${suit}-${i + 1}`;
      const outPath = join(OUT_DIR, `${id}.jpg`);
      if (existsSync(outPath)) {
        console.log(`  ✓ ${id} (exists)`);
        downloaded++;
        continue;
      }
      const url = `${WIKIMEDIA_BASE}${paths[i]}`;
      console.log(`  ↓ ${id}...`);
      const ok = await downloadImage(url, outPath);
      if (ok) {
        downloaded++;
        console.log(`  ✓ ${id}`);
      } else {
        failed++;
      }
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  console.log(`\n✅ Done: ${downloaded} downloaded, ${failed} failed`);
}

main();
