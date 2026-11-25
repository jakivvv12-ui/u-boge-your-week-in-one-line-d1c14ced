// u-boge-your-week-in-one-line-d1c14ced — "Your Week in One Line"
// Writes one fresh, sharp line summing up the week to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Pure Node, no dependencies, no network, fully deterministic.

const fs = require("node:fs");
const path = require("node:path");

// The line is 83 characters / 83 bytes (pure ASCII) — inside the 1-100
// character limit, with room to spare; shorter also helps the byte tie-break.
const LINE = "My week: I fixed three bugs, created four more, and blamed the Wi-Fi for all seven.";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  if (LINE.length < 1 || LINE.length > 100) {
    throw new Error("entry must be 1-100 characters, got " + LINE.length);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, LINE, "utf8");
  // Round-trip validation guard: read back what we just wrote.
  const back = fs.readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip mismatch");
  }
  if (back.length < 1 || back.length > 100 || back.trim().length === 0) {
    throw new Error("round-trip validation failed");
  }
}

main();
