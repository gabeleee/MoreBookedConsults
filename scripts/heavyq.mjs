// Runs a CPU-heavy dev command (next dev, eslint, tsc) through the machine-wide slot queue
// (~/ao-content-pipeline/bin/heavyq) so parallel AO writers don't all compile at once.
// Anywhere the queue isn't installed (Vercel, CI, a fresh laptop) it just runs the command.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const q = process.env.HEAVYQ_BIN || join(homedir(), "ao-content-pipeline/bin/heavyq");
const queued = !process.env.VERCEL && !process.env.CI && existsSync(q);
const [cmd, ...rest] = queued ? [q, ...args] : args[0] === "--pool" ? args.slice(2) : args;
const child = spawn(cmd, rest, { stdio: "inherit" });
for (const s of ["SIGINT", "SIGTERM", "SIGHUP"]) process.on(s, () => child.kill(s));
child.on("exit", (code, sig) => process.exit(code ?? (sig ? 1 : 0)));
