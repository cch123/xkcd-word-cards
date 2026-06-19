# xkcd word cards

Black-and-white xkcd-like English vocabulary cards generated from `data/llm_enrichment.jsonl`.

## Contents

- `data/llm_enrichment.jsonl` - 4026 enriched word entries.
- `cards/` - generated PNG cards currently ready to review.
- `prompts/` - archived GPT image prompt JSONL shards.
- `jobs/` - runnable prompt JSONL shards used by the generation scripts.
- `manifest.json` - full card manifest and current completion status.
- `progress/status.md` - human-readable progress notes.
- `scripts/` - planning, Codex CLI generation, and PNG verification scripts.

## Card Requirements

Each card should follow the approved reference layout:

- portrait 1024x1536 PNG, white paper, black ink only;
- thick rounded outer border and handwritten xkcd-like line art;
- large word header with POS, CEFR, pronunciation/IPA, and Chinese meanings;
- middle `comic clue` area plus `meaning` and `roots` side panel;
- bottom study rows for synonyms, antonyms, roots, phrase, example 1, example 2, and usage;
- fixed left icon column: star, X, sprout, speech bubble, circled 1, circled 2, lightbulb;
- every example row must include its own right-side boxed mini doodle.

## Commands

```bash
npm run check
npm run run:codex:dry
npm run run:codex -- --start 21 --limit 5
npm run verify
```

`npm run verify` is strict: it exits non-zero until all 4026 cards exist and pass PNG checks.
