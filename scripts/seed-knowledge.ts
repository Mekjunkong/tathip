/**
 * Master seed script.
 *
 * Runs all knowledge ingestion scripts in sequence:
 * 1. Wikisource (Thai astrology textbook)
 * 2. PDF (user-provided astrology book)
 *
 * Usage: npx tsx scripts/seed-knowledge.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { execSync } from "child_process";
import { existsSync } from "fs";

const PDF_PATH =
  "/Users/pasuthunjunkong/Downloads/โหราศาสตร์ภาคนักษัตร์ฤกษ์ อ.เทพย์ สาริกบุตร (แมว 1).pdf";

function run(label: string, command: string) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  ${label}`);
  console.log(`${"=".repeat(60)}\n`);

  try {
    execSync(command, { stdio: "inherit", env: process.env });
  } catch {
    console.error(`\nFailed: ${label}`);
    console.error("Continuing with next script...\n");
  }
}

async function main() {
  // Step 1: Wikisource ingestion
  run("Ingesting Thai Wikisource", "npx tsx scripts/ingest-wikisource.ts");

  // Step 2: PDF ingestion (only if file exists)
  if (existsSync(PDF_PATH)) {
    run(
      "Ingesting PDF: โหราศาสตร์ภาคนักษัตร์ฤกษ์",
      `npx tsx scripts/ingest-pdf.ts "${PDF_PATH}" "โหราศาสตร์ภาคนักษัตร์ฤกษ์ อ.เทพย์ สาริกบุตร" "thai"`
    );
  } else {
    console.log(`\nSkipping PDF ingestion: file not found at ${PDF_PATH}`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("  Knowledge seeding complete!");
  console.log("=".repeat(60) + "\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
