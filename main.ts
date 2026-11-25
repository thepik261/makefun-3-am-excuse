// The 3 AM Excuse — make.fun bounty entry (program/v1).
// Writes a single line (< 200 chars) to /output/entry.txt: the excuse a
// hardware wallet gives for refusing to sign a transaction at 3 AM.
// Pure Node stdlib, fully deterministic: the same line every run.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { dirname } from "node:path";

// The line, in the wallet's own voice. Its angle: at 3 AM the wallet's keys
// are on strike and the device honours their picket line — no signature
// crosses it until sunrise, when the sun can vouch for the transaction.
// On subject (refusing to sign at 3 AM), original (a labour strike, not
// batteries / firmware / cold storage), and the hour itself is the joke.
const EXCUSE =
  "It's 3 AM and my keys are on strike — I don't cross their picket line " +
  "for a transaction you'll regret by breakfast. Come back at sunrise.";

const OUT = "/output/entry.txt";

function main(): void {
  const text = EXCUSE;
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, text, "utf8");
  try {
    chmodSync(OUT, 0o644);
  } catch {
    // Grader collects outputs as another user; 0644 keeps it readable.
    // If chmod is unavailable, the write above already succeeded.
  }
}

main();
console.log(`wrote ${EXCUSE.length} characters to ${OUT}`);
