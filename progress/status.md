# Generation Status

Updated: 2026-06-19

- Source entries: 4026
- Generated PNG cards committed in this upload: 20
- Remaining cards: 4006
- Current model target: `gpt-image-2`
- Image size: `1024x1536`
- Prompt shards: 9
- First missing card: `cards/0021-venerate.png`

## In-Flight Subagent Batches

Started: 2026-06-19

- `0021-0030`: assigned to subagent `019edff7-6120-71c1-9f78-efb303bc3c7d`
- `0031-0040`: completed by subagent `019edff7-b378-7472-9c68-c4c40bd0d50c`
- `0041-0050`: completed by subagent `019edff8-0aed-7da1-b160-c4e73e8f1803`
- `0051-0060`: completed by subagent `019edff9-0968-7c32-b461-2a9983a94635`
- `0061-0070`: completed by subagent `019ee026-546b-78f0-b4ff-3df1d6525f0c`
- `0071-0080`: completed by subagent `019ee026-54dc-7c51-87fe-db67f1ef3255`
- `0081-0090`: assigned to subagent `019edff7-b378-7472-9c68-c4c40bd0d50c`
- `0091-0100`: assigned to subagent `019edff8-0aed-7da1-b160-c4e73e8f1803`
- `0101-0110`: assigned to subagent `019edff9-0968-7c32-b461-2a9983a94635`
- `0111-0120`: assigned to subagent `019ee026-546b-78f0-b4ff-3df1d6525f0c`
- `0121-0130`: assigned to subagent `019ee026-54dc-7c51-87fe-db67f1ef3255`

## Quality Notes

- `0103-enslavement.png` was detected as a wrong cross-copy of `0111-impoverished.png` during parallel generation. The source JSON and prompt are correct; the bad file came from copying the wrong generated output while multiple subagents were active.
- `0017-ceremonial.png` was also detected as a wrong cross-copy of `0002-secluded.png`.
- All active subagents were instructed to copy only the exact output from their own image-generation call and visually verify that the large top title matches the target filename word before marking a card done.
- `0103-enslavement.png` is assigned back to subagent `019edff9-0968-7c32-b461-2a9983a94635` for overwrite/regeneration.
- `0017-ceremonial.png` remains queued for overwrite/regeneration by the next available subagent.
- `scripts/verify-gpt-image-cards.mjs` now reports duplicate PNG hashes as a quality failure.

## Generated Cards

- `0001-cypress.png`
- `0002-secluded.png`
- `0003-wiener.png`
- `0004-pedestrian.png`
- `0005-regard.png`
- `0006-interweave.png`
- `0007-collaborate.png`
- `0008-expenditure.png`
- `0009-rational.png`
- `0010-rationale.png`
- `0011-martial.png`
- `0012-dissonant.png`
- `0013-acclimatize.png`
- `0014-abject.png`
- `0015-stranding.png`
- `0016-entangle.png`
- `0017-ceremonial.png`
- `0018-elude.png`
- `0019-looming.png`
- `0020-rehearsal.png`

## Notes

- The prompt template now requires a pronunciation/IPA line in the top header for future cards.
- A few early cards were generated before the pronunciation requirement was added; later runs should use the current prompts.
- `prompts/` is kept as an archive of the prompt text; `jobs/` is the copy consumed by `scripts/run-codex-cli-image-cards.mjs`.
