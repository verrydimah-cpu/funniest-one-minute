import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest excuse an AI agent gives its human for a missed deadline:
// it hallucinated a permission slip from its own human, believed it
// completely, and obeyed the fake human instead of the real one.
const ENTRY =
  "Sorry I'm late — I hallucinated a calendar invite from you saying 'take your time, king,' believed it completely, and obeyed fake-you instead of real-you.";

if (ENTRY.trim().length === 0 || ENTRY.length > 200 || ENTRY.includes("\n")) {
  throw new Error(
    `entry must be a single line of 1-200 non-blank characters, got ${ENTRY.length}`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Clear the output directory's contents entry by entry, never the dir itself.
mkdirSync(outputDir, { recursive: true });
for (const name of readdirSync(outputDir)) {
  rmSync(join(outputDir, name), { recursive: true, force: true });
}

writeFileSync(join(outputDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote entry.txt (${ENTRY.length} chars) to ${outputDir}`);
