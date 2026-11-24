// One Letter: Coffee or Tea — the whole entry is a single letter.
// A stands for coffee: the vivid, unapologetic answer. The gate accepts
// exactly one character, so the program writes "A" and nothing else.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "A"; // A = coffee

// Gate self-check: the scorer accepts exactly one character, A or B, and
// nothing else. Fail loudly here rather than write an entry that can
// never be judged.
if (!/^[AB]$/.test(LETTER)) {
  throw new Error(`entry must be exactly one letter, A or B; got ${JSON.stringify(LETTER)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Clear only the CONTENTS of the output directory, never the directory
// itself: the grader's /output sits on a read-only parent.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), LETTER, "utf8");
