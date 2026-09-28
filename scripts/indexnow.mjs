#!/usr/bin/env node
// Ping IndexNow (Bing, Yandex, Seznam, ...) with the pages that changed
// between two commits. Run by deploy-content.yml right after a production
// deploy, with the previously deployed commit as BASE:
//   node scripts/indexnow.mjs <base-sha> [head-sha] [--dry-run]
// Only published content pages are sent. The key is the 32-hex .txt file in
// public/ (it has to be public anyway, so no secret is needed).
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync } from "node:fs";

const HOST = "morebookedconsults.com";
const args = process.argv.slice(2).filter((a) => a !== "--dry-run");
const dryRun = process.argv.includes("--dry-run");
const [base, head = "HEAD"] = args;

const git = (...a) => execFileSync("git", a, { encoding: "utf8" }).trim();

if (!base) {
  console.log("indexnow: no previous deploy commit, skipping");
  process.exit(0);
}
try {
  execFileSync("git", ["cat-file", "-e", `${base}^{commit}`], { stdio: "ignore" });
} catch {
  console.log(`indexnow: ${base} not in history, skipping`);
  process.exit(0);
}

const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("indexnow: no key file in public/");
const key = keyFile.replace(/\.txt$/, "");

const changed = git("diff", "--name-only", "--diff-filter=AMR", `${base}..${head}`, "--", "content/")
  .split("\n")
  .filter((f) => /^content\/(blog|money)\/[^/]+\.mdx$/.test(f));

const urls = new Set();
for (const file of changed) {
  if (!existsSync(file)) continue;
  const front = readFileSync(file, "utf8").split(/^---$/m)[1] ?? "";
  if (!/^status:\s*["']?published["']?\s*$/m.test(front)) continue;
  const slug = file.split("/").pop().replace(/\.mdx$/, "");
  if (file.startsWith("content/blog/")) {
    urls.add(`https://${HOST}/blog/${slug}/`);
    urls.add(`https://${HOST}/blog/`);
  } else {
    urls.add(`https://${HOST}/${slug}/`);
  }
}

if (urls.size === 0) {
  console.log("indexnow: no published pages changed");
  process.exit(0);
}

const urlList = [...urls];
console.log(`indexnow: ${urlList.length} URL(s)\n  ${urlList.join("\n  ")}`);
if (dryRun) process.exit(0);

// IndexNow takes up to 10,000 URLs per request; we never get close.
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
console.log(`indexnow: HTTP ${res.status} (200/202 = accepted) ${await res.text()}`);
if (res.status !== 200 && res.status !== 202) process.exitCode = 1;
