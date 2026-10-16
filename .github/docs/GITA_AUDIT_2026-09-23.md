# Bhagavad Gita reader audit — 2026-09-23

> Historical snapshot of the reader state on 2026-09-23. For the current source choices and behavior, see [the 2026-09-29 audit](GITA_AUDIT_2026-09-29.md).

## Repair scope

The shared reader and all 18 chapter shells were updated on branch `fix/gita-all-verses-20260923`.

- The Vedic Scriptures loader remains pinned to commit `43dfc8db815d01e15a347ea294b089334cf2aa17` in the repository that contains that commit: `vedicscriptures/bhagavad-gita`.
- Grouped Mukundananda records still render their exact source translation on the first verse in each source range.
- The 61 later cards that belong to grouped Mukundananda records now use the pinned per-verse Gambirananda English record instead of rendering an empty translation area.
- Word-for-word panels remain present on every card. The existing eight explicit grouped word-meaning slices are retained, with a source-backed grouped-record fallback if a future source range is not recognized.
- Every shell points to the cache-busted shared reader build `20260923-gita-all-verses-1`.

## Source checks

| Layer | Result |
| --- | ---: |
| Expected visible verses | 701 |
| Vedic Scriptures JSON files checked | 701/701 |
| Sanskrit fields non-empty | 701/701 |
| Transliteration fields non-empty | 701/701 |
| Gambirananda English fields non-empty | 701/701 |
| Common word-meaning records after range splitting | 701/701 |
| Chapter shells updated | 18/18 |

Pinned supporting sources remain the Gītā frontend common/author data at commit `27d92fe5e3decde8bda747a1bfbb3ff4d6f67aeb` and the Vasuki Śrīdhara source at commit `3405cca553363ae77edf0c7e58ff1908b5d27d29`.

## Verification status

- Source and structural checks: PASS.
- JavaScript change review: PASS; the new reader path and fallback branches are present.
- Live GitHub Pages desktop/mobile visual check: NOT TESTED in this environment because browser access was blocked by the host security policy.

Status: source/runtime repair complete; deployment and live visual verification remain dependent on GitHub Pages rebuilding after merge.
