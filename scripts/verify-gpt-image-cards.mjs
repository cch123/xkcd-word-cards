import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const options = parseArgs(process.argv.slice(2));
const outRoot = path.resolve(options.out ?? path.join(rootDir, "word-cards", "gpt-image-style"));
const manifestPath = path.join(outRoot, "manifest.json");

const expectedWidth = 1024;
const expectedHeight = 1536;
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const planned = new Map(manifest.cards.map((card) => [card.file, card]));
const cardsDir = path.join(outRoot, "cards");
const actualFiles = await listPngFiles(cardsDir);
const actualRelFiles = new Set(actualFiles.map((file) => path.posix.join("cards", path.basename(file))));

const missing = [];
const invalid = [];
let valid = 0;

for (const card of manifest.cards) {
  const file = path.join(outRoot, card.file);
  if (!actualRelFiles.has(card.file)) {
    missing.push(card.file);
    continue;
  }

  try {
    const info = await inspectPng(file);
    if (info.width !== expectedWidth || info.height !== expectedHeight) {
      invalid.push({
        file: card.file,
        reason: `expected ${expectedWidth}x${expectedHeight}, got ${info.width}x${info.height}`
      });
      continue;
    }
    if (info.bytes < 25_000) {
      invalid.push({ file: card.file, reason: `suspiciously small PNG: ${info.bytes} bytes` });
      continue;
    }
    valid += 1;
  } catch (error) {
    invalid.push({ file: card.file, reason: error.message });
  }
}

const extra = [...actualRelFiles].filter((file) => !planned.has(file));
const summary = {
  expected: manifest.cards.length,
  valid,
  missing: missing.length,
  invalid: invalid.length,
  extra: extra.length
};

console.log(JSON.stringify(summary, null, 2));

if (missing.length) {
  console.log(`First missing: ${missing.slice(0, 10).join(", ")}`);
}
if (invalid.length) {
  console.log(`First invalid: ${invalid.slice(0, 10).map((item) => `${item.file} (${item.reason})`).join(", ")}`);
}
if (extra.length) {
  console.log(`First extra: ${extra.slice(0, 10).join(", ")}`);
}

if (summary.valid !== summary.expected || summary.missing || summary.invalid || summary.extra) {
  process.exitCode = 1;
}

async function listPngFiles(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".png"))
      .map((entry) => path.join(dir, entry.name));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function inspectPng(file) {
  const [buffer, fileStat] = await Promise.all([readFile(file), stat(file)]);
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    throw new Error("not a PNG");
  }
  if (buffer.length < 24) {
    throw new Error("truncated PNG header");
  }
  return {
    bytes: fileStat.size,
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--out") {
      parsed.out = requireValue(args, index, arg);
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function requireValue(args, index, flag) {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value`);
  }
  return value;
}
