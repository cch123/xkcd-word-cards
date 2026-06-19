# GPT Image Vocabulary Cards

Generated batch setup for the approved xkcd-like black-and-white hand-drawn vocabulary-card style.

- Source: `data/llm_enrichment.jsonl`
- Source entries: 4026
- Selected entries: 4026
- Pending image jobs: 4006
- Existing images skipped: 20
- Model: `gpt-image-2`
- Size: `1024x1536`
- Quality: `medium`
- Output directory: `cards/`
- Runnable prompt shards: `jobs/prompts-*.jsonl`
- Archived prompt shards: `prompts/prompts-*.jsonl`

Preferred subscription-backed run path:

```bash
npm run run:codex -- --start 21 --limit 5
```

Rebuild the prompt plan after partial completion to skip existing PNGs and create prompts only for missing cards:

```bash
npm run plan
```

Verify completion:

```bash
npm run verify
```

`npm run verify` is intentionally strict and exits non-zero while cards are still missing.
