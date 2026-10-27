# U2 Pilot v0.12.3 validation

Base main: 4c59804424700ac8fc2680feb3820e6f438612d4. Source checkpoint: 299f835755bc2932393e001cdcf2100fcb7534b7. Final head and hosted CI are recorded in the Draft PR, avoiding a self-referential commit.

HTML SHA256: `0c71675a1e945e4d65e31c73ab4e9ee22e8d45b2171a3fd4649c2b799c39c30d`. UI sourceHash: `048445bc714f25c455e048ed676eb2e50b462d0ef2ad78b4cac1bc9069adab08`. Archived v0.12.2 and all 804 prior protected files remain byte-identical; complete TEXTBOOK data is unchanged (79 lessons). Only README/package metadata changes outside new files.

## Coverage

- 269 Node tests (264 original +5 comparison invariants): PASS.
- 11,955 independent numerical comparisons against preserved original models: PASS.
- 126 required Hangul characters /0 missing in existing seven embedded fonts.
- Deterministic build and preservation checks: PASS.
- U2:31 scenarios, all three Pilots at1440×900,1366×768,390×844,320×740,844×390 ×Light/Dark, plus corrupt UI preference isolation. Actual baseline capture, primary/original control node identity and focus/position, formula/change signaling, original-model result deltas, Auto/Fixed, mode cutoff, unsupported views, seeded Histogram/Eye samples, Properties, Report download, Frozen retention, same-state resize/theme/expand/return and reload persistence.
- Original all79 U1 matrix/parity:634 scenarios, including632 lesson/viewport/theme cases and79-lesson original/new settings/readout/SVG parity plus component walkthrough.
- Original Chapter12 integrated suite:67 scenarios, including actual learning backup/restore and historical migration. Original assertions stay byte-identical; the adapter only changes release/build-info/output/browser routing.
- Final aggregation checks exact HTML hash, successful counts and zero runtime/console/network errors in all three reports (732 browser scenarios). `scripts/collect-workspace-u2-results.mjs` writes the summary and splits the full all-lesson report into desktop/mobile JSON without dropping scenarios. CI artifacts retain the raw full report. Earlier candidate reports are not presented as final-hash evidence.

## Findings and corrections

A narrow controls pane changed slider position when20.000GHz→3.000GHz removed a label wrap. Primary labels/values now have stable separate rows, retaining the same live controls and focus. A new test initially used exact equality for8000ps despite an IEEE-7541ulp difference; it now uses a1e-9ps tolerance. Original assertions were not changed. Unsaved original lesson settings can be absent until validation on reload fills an empty object; the new isolation test compares these equivalent empty states.

Eye comparison explicitly separates original deterministic traces from up to128 actual seeded decision samples per condition, with square/reference and circle/current markers. Histogram rebins original samples on shared Current bins; Fixed axes report excluded samples and clipped plotted points. UI-only changes never capture physical evidence; Chapter12 capture remains the original explicit Frozen action.

## Limits

Physical Android keyboard/IME, system Back and touch feel remain user review items. Narrow plots can require internal pan. Ch1 reference/UI preferences are separate local UI storage and are not part of learning backup; Ch12 Frozen uses original backup/report storage. Different Views retain original graphics where overlay is not meaningful. No learning-gain, hardware BER, full-vector strip solver or new physical model claim. U3/full79U2 rollout/pop-out/new Chapter and main merge await separate user instructions.
