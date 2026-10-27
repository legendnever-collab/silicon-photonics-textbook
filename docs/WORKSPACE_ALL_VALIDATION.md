# All-Chapter Workspace v0.12.2 validation

The U1 interaction pattern now covers all 79 existing lessons in Chapters 1–12: pinned live graphics and renderer-derived results, independently scrolling controls, bounded keyboard/pointer resize, and expansion/return using the same notebook instance. Chapter 8's linked Schematic/Layout SVGs retain their actual selection handlers. Chapter-specific View/Mode selectors, original detail panels and evidence actions remain available.

## Release identity

- Runtime source checkpoint: `26408dfca5871a137e9361e3f330e51f62f9bafc`.
- HTML: `dist/silicon-photonics-textbook-v0.12.2.html`.
- HTML SHA256: `123a669cb5bac4acc8a2e8f6bd76d737c0dad3aed393946930053109ffcdd2a6`.
- UI sourceHash: `5864c64ccef9dc8042ee324072f3533d0564fe44c9d27c344b45fe91821054d7`.
- Final commit and exact-head hosted CI: [Draft PR #13](https://github.com/legendnever-collab/silicon-photonics-textbook/pull/13). The PR records these after this commit is created, avoiding a self-referential commit hash.

## Verification and evidence

`npm test`: 264 passes. `python3 tests/ch12-independent-validation.py`: 11,955 independent numerical comparisons pass. Preservation checks confirm all 766 prior protected tracked files, the full TEXTBOOK payload and the frozen v0.12.1 artifact are unchanged. Original U1 preservation separately checks 397 protected files. Font audit finds all 40 required Hangul characters in the existing seven embedded fonts. Repeated builds reproduce the exact HTML hash above.

The browser matrix exercises every lesson at 1440×900, 1366×768, 390×844 and 320×740, in Light and Dark: 632 scenarios. It changes the last available parameter, checks live plot/KPI geometry, control identity/focus and screen position, independent scrolling, minimum/maximum resize, same-state expansion/return, Escape focus and reading/control scroll restoration. Additional scenarios compare all 79 original/new computed readouts, settings and SVG paths after equivalent input, and walk through chapter-specific selectors, linked port selection, numeric editing, Figure Zoom, Reports and Current/Frozen evidence. These total 634 unique scenarios. The original Chapter 12 integrated suite retains its 67 assertions and targets the new release through an adapter.

Raw results are in `artifacts/v0.12.2/desktop`, `mobile` and `integrated`; `all-validation-summary.json` validates report hashes and combines the successful matrix. Representative chapter screenshots are under `review`. Hosted workflow artifacts provide independent runs. Historical archived results remain historical and are not relabeled as fresh local coverage.

## Findings resolved

- Control updates can change lower text height. Preserve the focused control's screen coordinate; raw controls scrollTop may compensate for reflow.
- Chapter 8 has two original live SVGs in lessons 8.3, 8.4 and 8.7. Frame each separately and retain linked events.
- Mobile 5.7 background scroll anchoring moved the reading page during modal edits. Disable background anchoring while the notebook is expanded.
- Reading observers could switch a physical View during expansion. Pause that observer while expanded.
- An earlier desktop test read a hidden Chapter 10 JSON `pre` using `innerText`, producing empty text. Use `textContent` and retain the same JSON/status assertion. The application and Physics did not change for this correction.
- Earlier archived CI had Chapter 2 reload/Chapter 3 restore timing failures. Inspect any final-head failures before a bounded failed-job retry; preserve original assertions and report retries in the PR.

## Limits and review gate

These are browser viewport emulations, not tests on a physical Android device. Keyboard/IME, system Back, touch feel and measured learning benefit remain user Play Review items. Narrow plots retain readable scaling and may need internal pan; the original Figure Zoom remains available. Existing Physics provenance remains version 0.12.0; WORKSPACE_BUILD separately identifies the UI release. No new curriculum/U2/U3 or Chapter 13 is included. Draft PR remains open; main merge requires an explicit user instruction.
