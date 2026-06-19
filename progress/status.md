# Generation Status

Updated: 2026-06-20

- Source entries: 4026
- Generated PNG cards ready in this upload: 384
- Remaining cards: 3642
- Current model target: `gpt-image-2`
- Image size: `1024x1536`
- Prompt shards: 9
- First missing card: `cards/0213-collateral.png`

## In-Flight Subagent Batches

Started: 2026-06-19

- `0021-0030`: completed by subagent `019edff7-6120-71c1-9f78-efb303bc3c7d`
- `0031-0040`: completed by subagent `019edff7-b378-7472-9c68-c4c40bd0d50c`
- `0041-0050`: completed by subagent `019edff8-0aed-7da1-b160-c4e73e8f1803`
- `0051-0060`: completed by subagent `019edff9-0968-7c32-b461-2a9983a94635`
- `0061-0070`: completed by subagent `019ee026-546b-78f0-b4ff-3df1d6525f0c`
- `0071-0080`: completed by subagent `019ee026-54dc-7c51-87fe-db67f1ef3255`
- `0081-0090`: completed by subagent `019edff7-b378-7472-9c68-c4c40bd0d50c`
- `0091-0100`: completed by subagent `019edff8-0aed-7da1-b160-c4e73e8f1803`
- `0101-0110`: completed by subagent `019edff9-0968-7c32-b461-2a9983a94635`
- `0111-0120`: completed by subagent `019ee026-546b-78f0-b4ff-3df1d6525f0c`
- `0121-0130`: completed by subagent `019ee026-54dc-7c51-87fe-db67f1ef3255`
- `0131-0140`: completed by subagent `019edff7-b378-7472-9c68-c4c40bd0d50c`
- `0141-0150`: completed by subagent `019ee026-546b-78f0-b4ff-3df1d6525f0c`
- `0151-0160`: completed by subagent `019edff8-0aed-7da1-b160-c4e73e8f1803`
- `0161-0170`: completed by subagent `019ee026-54dc-7c51-87fe-db67f1ef3255`; `0165-handicapped.png` has a noted layout issue because the saved candidate omitted the phrase row
- `0171-0180`: completed by subagent `019edff7-6120-71c1-9f78-efb303bc3c7d`
- `0181-0190`: completed by subagent `019edff9-0968-7c32-b461-2a9983a94635`
- `0191-0200`: completed by subagent `019edff7-b378-7472-9c68-c4c40bd0d50c`
- `0201-0210`: completed by subagent `019edff8-0aed-7da1-b160-c4e73e8f1803`
- `0211-0220`: completed except `0213-collateral.png` by subagent `019ee026-54dc-7c51-87fe-db67f1ef3255`; `0213` hard-failed because image generation rejected the exact prompt before producing an artifact
- `0221-0230`: completed by subagent `019ee026-546b-78f0-b4ff-3df1d6525f0c`
- `0231-0240`: completed by subagent `019edff7-b378-7472-9c68-c4c40bd0d50c`
- `0241-0250`: failed in subagent `019edff9-0968-7c32-b461-2a9983a94635`; built-in image generation returned unrelated non-card/cross-task images, so no bad PNGs were saved
- `0251-0260`: completed by subagent `019edff7-6120-71c1-9f78-efb303bc3c7d`
- `0261-0270`: failed in subagent `019edff9-0968-7c32-b461-2a9983a94635`; built-in image generation returned unrelated cross-task/non-card outputs, so no bad PNGs were saved
- `0271-0280`: completed; `0275-0277` and `0278-0279` were recovered by fresh workers after earlier hard failures
- `0281-0290`: completed by fresh subagent `019ee145-559e-7de1-acdd-63f1f88e57bb` after a prior failed worker returned unrelated non-card/wrong-title outputs

## Paused Subagents

- `019edff9-0968-7c32-b461-2a9983a94635`: paused for now after repeated cross-task/non-card imagegen outputs on `0241-0250` and `0261-0270`.
- `019edff8-0aed-7da1-b160-c4e73e8f1803`: paused for now after cross-task/non-card outputs on `0281-0290`.
- `019ee026-54dc-7c51-87fe-db67f1ef3255`: paused for now after cross-task/non-card outputs on `0275-0279`.

## Current And Queued Batches

- `0241-0250`: completed by subagent `019ee026-546b-78f0-b4ff-3df1d6525f0c` after prior hard failure in another worker
- `0261-0270`: completed by fresh subagent `019ee145-5403-7f13-8873-e3b13e7f032e`
- `0281-0290`: reassigned to fresh subagent `019ee145-559e-7de1-acdd-63f1f88e57bb`
- `0291-0300`: completed by subagent `019edff7-6120-71c1-9f78-efb303bc3c7d`
- `0301-0310`: completed by subagent `019edff7-b378-7472-9c68-c4c40bd0d50c`
- `0311-0320`: assigned to subagent `019ee026-546b-78f0-b4ff-3df1d6525f0c`
- `0321-0330`: completed by subagent `019ee145-5403-7f13-8873-e3b13e7f032e`; `0325-plagiarise.png` was regenerated once because the first saved candidate had obvious cross-word example text
- `0331-0340`: completed by subagent `019edff7-6120-71c1-9f78-efb303bc3c7d`; minor text drift/OCR artifacts are noted below and are not regeneration blockers
- `0341-0350`: completed by subagent `019ee145-559e-7de1-acdd-63f1f88e57bb`
- `0351-0360`: completed by subagent `019edff7-b378-7472-9c68-c4c40bd0d50c`
- `0278-0279` plus corrected `0361-0368`: completed by fresh subagent `019ee19f-7e58-7371-8e39-7ae25d6afc22`
- `0369-0378`: assigned to subagent `019ee145-5403-7f13-8873-e3b13e7f032e`
- `0379-0388`: completed by subagent `019ee19f-7e58-7371-8e39-7ae25d6afc22`
- `0389-0398`: assigned to subagent `019ee145-559e-7de1-acdd-63f1f88e57bb`
- `0399-0408`: assigned to subagent `019edff7-6120-71c1-9f78-efb303bc3c7d`
- `0409-0418`: assigned to subagent `019ee19f-7e58-7371-8e39-7ae25d6afc22`

## Quality Notes

- `0103-enslavement.png` was detected as a wrong cross-copy of `0111-impoverished.png` during parallel generation. The source JSON and prompt are correct; the bad file came from copying the wrong generated output while multiple subagents were active.
- `0017-ceremonial.png` was also detected as a wrong cross-copy of `0002-secluded.png`; it has since been overwritten and visually verified with the correct `ceremonial` title.
- All active subagents were instructed to copy only the exact output from their own image-generation call and visually verify that the large top title matches the target filename word before marking a card done.
- `0103-enslavement.png` is assigned back to subagent `019edff9-0968-7c32-b461-2a9983a94635` for overwrite/regeneration.
- `0103-enslavement.png` has been overwritten and visually verified with the correct `enslavement` title.
- `0102-timidly.png` was also corrected during the `0101-0110` title audit.
- `scripts/verify-gpt-image-cards.mjs` now reports duplicate PNG hashes as a quality failure.
- Subagents were additionally instructed not to run any git commands. Main-agent validation, commits, and pushes should be handled centrally.
- User instruction update: do not repeatedly regenerate images for layout-only issues. Regenerate only for hard failures: invalid/tiny/wrong-dimension PNG, wrong title/word mismatch, cross-copy, duplicate hash, blank image, or non-card output. Layout/OCR imperfections should be recorded as quality notes instead.
- `0165-handicapped.png` correction was cancelled as a layout-only retry unless a worker had already produced a replacement before the cancellation.
- `0165-handicapped.png` latest saved replacement passes hard checks and title-match, but still lacks the phrase row. This remains a quality note, not a regeneration blocker.
- `0145-spacious.png` may omit the phrase row; `0146-baleful.png` has a minor OCR typo in a phrase. These are quality notes, not regeneration blockers.
- `0199-certify.png` has a usage-row handwriting/text artifact. This is a quality note, not a regeneration blocker.
- `0175-refinement.png` is missing the phrase row; `0178-defile.png` has minor handwriting/text fidelity imperfections. These are quality notes, not regeneration blockers.
- `0229-reiterate.png` appears to omit the separate phrase row. This is a quality note, not a regeneration blocker.
- `0212-cognition.png`, `0216-emulate.png`, `0217-autocratic.png`, and `0218-counterproductive.png` have minor text drift noted by the worker. These are quality notes, not regeneration blockers.
- `0206-skew.png` has an example-row OCR/text error. This is a quality note, not a regeneration blocker.
- `0254-notoriety.png` appears to omit the phrase row. This is a quality note, not a regeneration blocker.
- `0240-flee.png` has a comic-clue text artifact. This is a quality note, not a regeneration blocker.
- `0243-verbatim.png` appears to omit the phrase row; `0244-disruptive.png` has a shifted/wrong phrase-row icon; `0247-caustic.png` has minor lower-row OCR/text errors. These are quality notes, not regeneration blockers.
- `0269-drill.png` is missing the phrase row. This is a quality note, not a regeneration blocker.
- `0301-elucidate.png`, `0302-colourable.png`, `0304-implausible.png`, and `0305-plausibility.png` have minor comic-clue/text artifacts. These are quality notes, not regeneration blockers.
- `0353-dizzy.png` and `0354-giddy.png` have minor Chinese text drift; `0355-autoimmune.png` has example-2 English text drift; `0357-oddly.png` has an incorrect-looking IPA line; `0358-douche.png` uses more anatomical/medical visual detail than ideal; `0359-redden.png` has minor Chinese text drift. These passed hard checks and are quality notes, not regeneration blockers.
- `0334-taunt.png` has minor handwritten text/OCR imperfections; `0336-victimise.png` has phrase/example text drift; `0337-extravagance.png` has usage-row text drift; `0340-retrenchment.png` has right-roots-panel text drift. These passed hard checks and remain quality notes, not regeneration blockers.
- `0341-0350` passed hard checks and title-match verification. Minor generated text/roots/IPA drift is visible on some cards, especially `0342-entice.png`, `0346-astound.png`, and `0349-aggressiveness.png`; these are quality notes, not regeneration blockers.
- `0325-plagiarise.png` replacement passes hard checks after the first candidate was rejected for obvious cross-word example contamination; the saved replacement still has minor Chinese handwriting/OCR drift, which is a quality note, not a regeneration blocker.
- `0362-intermix.png` has minor handwriting/OCR drift in the synonyms label, but the title, examples, and card layout pass hard checks.
- `0365-afflicting.png`, `0366-shorten.png`, and `0367-credibility.png` have minor text/IPA/OCR drift in lower rows. These are quality notes, not regeneration blockers.
- `0278-0279` plus corrected `0361-0368` were validated as 1024x1536 PNGs with unique hashes; `npm run verify` still exits nonzero because unrelated cards remain missing.
- `0379-archetype.png`, `0380-nutritional.png`, `0384-obsessional.png`, `0386-revegetate.png`, `0387-organ.png`, and `0388-nasty.png` have minor handwriting/OCR drift in small labels or lower-row text. These are quality notes, not regeneration blockers.
- `0379-0388` were validated as 1024x1536 PNGs with unique hashes; `npm run verify` still exits nonzero because unrelated cards remain missing.

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
