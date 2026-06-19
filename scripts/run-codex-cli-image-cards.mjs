import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const options = parseArgs(process.argv.slice(2));
const outRoot = path.resolve(options.out ?? path.join(rootDir, "word-cards", "gpt-image-style"));
const cardsDir = path.join(outRoot, "cards");
const logsDir = path.join(outRoot, "codex-cli-logs");
const manifest = JSON.parse(await readFile(path.join(outRoot, "manifest.json"), "utf8"));
const jobsByOut = await readPromptJobs(path.join(outRoot, "jobs"));

await mkdir(cardsDir, { recursive: true });
await mkdir(logsDir, { recursive: true });

const runnable = [];
for (const card of manifest.cards) {
  if (card.index < options.start) continue;
  if (options.limit && runnable.length >= options.limit) break;
  const absOut = path.join(outRoot, card.file);
  if (!options.includeExisting && (await fileExists(absOut))) continue;
  const filename = path.basename(card.file);
  const job = jobsByOut.get(filename);
  if (!job) {
    throw new Error(`No prompt job found for ${filename}`);
  }
  runnable.push({ card, job, absOut, jobId: path.basename(filename, ".png") });
}

console.log(`Codex CLI image jobs selected: ${runnable.length}`);
console.log(`Output root: ${path.relative(rootDir, outRoot) || "."}`);
console.log(`Concurrency: ${options.concurrency}`);
if (options.dryRun) {
  for (const item of runnable.slice(0, 10)) {
    console.log(`${item.jobId} -> ${path.relative(rootDir, item.absOut)}`);
  }
  process.exit(0);
}

let cursor = 0;
let failed = 0;
let completed = 0;

const workers = Array.from({ length: options.concurrency }, async () => {
  while (cursor < runnable.length) {
    const item = runnable[cursor++];
    const ok = await runOne(item);
    if (ok) completed += 1;
    else failed += 1;
  }
});

await Promise.all(workers);
console.log(`Codex CLI image jobs completed: ${completed}`);
console.log(`Codex CLI image jobs failed: ${failed}`);
if (failed > 0) process.exitCode = 1;

async function runOne({ card, job, absOut, jobId }) {
  const responsePath = path.join(logsDir, `${jobId}.txt`);
  const promptPath = path.join(logsDir, `${jobId}.prompt.txt`);
  const prompt = buildCodexPrompt({ card, job, absOut });
  await writeFile(promptPath, prompt, "utf8");

  const args = [
    "--ask-for-approval",
    "never",
    "--sandbox",
    "workspace-write",
    "exec",
    "--skip-git-repo-check",
    "--cd",
    rootDir,
    "--output-last-message",
    responsePath,
    prompt
  ];

  console.error(`[${jobId}] starting`);
  const started = Date.now();
  const result = await runCommand("codex", args, {
    timeoutMs: options.timeoutMs,
    logPath: path.join(logsDir, `${jobId}.exec.log`)
  });
  const elapsed = ((Date.now() - started) / 1000).toFixed(1);

  if (result.code !== 0) {
    console.error(`[${jobId}] codex failed with exit ${result.code} after ${elapsed}s`);
    return false;
  }
  if (!(await fileExists(absOut))) {
    console.error(`[${jobId}] codex finished but did not create ${absOut}`);
    return false;
  }
  console.error(`[${jobId}] completed in ${elapsed}s`);
  return true;
}

function buildCodexPrompt({ card, job, absOut }) {
  return `Generate exactly one vocabulary-card PNG using Codex's subscription-backed built-in image generation capability.

Hard requirements:
- Use image generation, not SVG, HTML, Canvas, hand-coded drawing, or the OpenAI API.
- Save the final PNG to this exact path: ${absOut}
- Create parent directories if needed.
- Do not overwrite unrelated files.
- If image generation is unavailable in this Codex CLI environment, do not create substitutes. Reply exactly IMAGE_GENERATION_UNAVAILABLE.

Target card:
- Source index: ${card.index}
- Word: ${card.word}
- Output: ${absOut}

Use this approved xkcd-like black-and-white handwritten vocabulary-card prompt:

${job.prompt}

After generation, verify that ${absOut} exists. Your final response should be either SAVED ${absOut} or IMAGE_GENERATION_UNAVAILABLE.`;
}

async function readPromptJobs(jobsDir) {
  const map = new Map();
  for (let index = 1; index <= 99; index += 1) {
    const file = path.join(jobsDir, `prompts-${String(index).padStart(2, "0")}.jsonl`);
    if (!(await fileExists(file))) continue;
    const lines = (await readFile(file, "utf8")).split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const job = JSON.parse(line);
      map.set(job.out, job);
    }
  }
  return map;
}

function runCommand(command, args, { timeoutMs, logPath }) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"]
    });
    const chunks = [];
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
    }, timeoutMs);
    child.stdout.on("data", (chunk) => chunks.push(chunk));
    child.stderr.on("data", (chunk) => chunks.push(chunk));
    child.on("close", async (code, signal) => {
      clearTimeout(timer);
      const output = Buffer.concat(chunks).toString("utf8");
      await writeFile(logPath, output, "utf8");
      resolve({ code: timedOut ? 124 : code ?? 1, signal, output });
    });
  });
}

function parseArgs(argv) {
  const parsed = {
    out: null,
    start: 1,
    limit: null,
    includeExisting: false,
    concurrency: 1,
    timeoutMs: 15 * 60 * 1000,
    dryRun: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      parsed.out = requireValue(argv, ++index, arg);
    } else if (arg === "--start") {
      parsed.start = parsePositiveInt(requireValue(argv, ++index, arg), arg);
    } else if (arg === "--limit") {
      parsed.limit = parsePositiveInt(requireValue(argv, ++index, arg), arg);
    } else if (arg === "--include-existing") {
      parsed.includeExisting = true;
    } else if (arg === "--concurrency") {
      parsed.concurrency = parsePositiveInt(requireValue(argv, ++index, arg), arg);
    } else if (arg === "--timeout-ms") {
      parsed.timeoutMs = parsePositiveInt(requireValue(argv, ++index, arg), arg);
    } else if (arg === "--dry-run") {
      parsed.dryRun = true;
    } else if (arg === "--help" || arg === "-h") {
      console.log(`Usage:
  node scripts/run-codex-cli-image-cards.mjs [--start 1] [--limit 10] [--concurrency 1] [--dry-run]`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

async function fileExists(file) {
  try {
    await stat(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function parsePositiveInt(value, flag) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${flag} must be a positive integer`);
  }
  return parsed;
}

function requireValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value`);
  }
  return value;
}
