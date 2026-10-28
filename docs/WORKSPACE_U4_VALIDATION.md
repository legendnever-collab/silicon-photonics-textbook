# U4 all79 · v0.12.5 validation

User authorized continuation of the saved Workspace plan after U3 Pilot. Main was verified at `4c59804424700ac8fc2680feb3820e6f438612d4`. PR14 and15 remain Draft/open; this release stacks on PR15 head `cabae4dd7db286e77c062121b68f1d73c94baee6`. Initial source checkpoint `ca23d8b321547a4d370344c01c45124a77023673`. Final head/hosted CI results resolve in the PR to avoid self-referential commit metadata. No main merge is part of this checkpoint.

## Exact artifact

- Standalone: `dist/silicon-photonics-textbook-v0.12.5.html`.
- HTML SHA256: `20d45f4962e918f151aac6ef32a872a8815459c36ae87cbbad5442d82650bfe1`.
- UI sourceHash: `5f4072335d4f8ea8a84ad8446b2e824893b861281fe3bc441521de563957d4a6`.
- Git blob: `53ef6a956e2f48b552f5a6451458c4f579fcba8a`.
- All870 protected previous files unchanged; README/package metadata excluded. Full TEXTBOOK equality, original Physics/Renderer/application sources, notes/save schema and archived releases retained.
- Original Physics report version/source provenance stays unchanged; UI provenance is separate.

## Validation evidence

`artifacts/v0.12.5/validation-summary.json` rejects missing, failed, partial or stale-hash reports. All evidence must refer to the exact HTML above.

| Suite | Browser scenarios |
| --- | ---: |
| New all79 guidance/comparison/learning matrix | 326 |
| Original U2 Pilot on final HTML | 31 |
| U3 Pilot on final HTML, one rollout availability expectation adapted | 31 |
| Original all79 UI/parity on final HTML | 634 |
| Original integrated Chapter12 on final HTML | 67 |
| Total | 1089 |

New326 =79 lessons ×1440×900/320×740 ×Light/Dark (316), four12-chapter writing/comparison walkthroughs at390×844/844×390 ×Light/Dark, plus six scope/state/representation scenarios. Each main scenario verifies original live/model readout and SVG parity, actual primary controls, stable input node/focus/screen position, UI or native reference capture, immutable baseline, same original Prediction/notes nodes, prepared feedback, save/reload, optional recall, graph geometry, unique inert comparison IDs and no page overflow.

Special cases: Ring/Bragg/Circuit and Threshold/L–I/MZI/Passivity model changes withhold incompatible deltas; original hidden control groups survive relocation. Chapter10 electrical UI reference and native Sweep scope remain separate. Original Capture HOLD cannot be bypassed. Numeric display deltas reject unit/context mismatches, ambiguous duplicate labels, different status text and null/withheld. Actual original learning JSON export/import retains multi-chapter notes, Prediction and native Frozen. Corrupt UI preferences cannot damage learning records.

The634 all79 suite retains its original assertions and includes632 viewport/theme scenarios, direct original/new result and SVG parity across all79 lessons, and a chapter component walkthrough. Integrated67 includes original tutors, notes, Prediction, reports, Properties, Frozen, actual backup/import, invalid import rejection and historical migrations. U2 assertions are unchanged. U3 adapts only the prior assertion that a nonpilot lacks the learning panel: all79 now have that panel as authorized. Every other U3 assertion remains unchanged; the original source file is preserved byte-for-byte.

Original Node269 and independent11,955 numerical comparisons pass. No new physics model or oracle was introduced. New text needs206 Hangul glyphs; original embedded fonts cover all206 with0 missing. Deterministic rebuild/source-manifest checks pass. Production HTML needs no network or backend.

## Fixes found during validation

Ambiguous repeated result labels cannot be matched safely, so such numeric deltas are withheld; the original full readouts still display. Nonnumeric status text stays part of the matching context. All deltas use original rounded display values, not invented calculation precision.

The unchanged all79 regression caught a2px mobile page scroll during a Chapter10 edit. Trace showed the old Chapter8–12 focus-restoration function scrolling the page rather than the split control pane. The derived HTML now restores the actual `.ws-controls` pane in expanded/desktop Workspace, with the original inline fallback retained. No assertion tolerance was changed. A separate focused check passed eight Chapter10/11/12 cases at390px Light/Dark; final aggregate evidence is rerun on the corrected artifact. Earlier candidate reports are not release evidence.

## Review and limits

Nine review screenshots explicitly select actual Light/Dark themes and cover phase, ring comparison, threshold controls, layout rules, independent electrical UI reference, native Sweep comparison, WDM learning, Dynamic decisions/learning and landscape writing. Their metadata records the exact HTML hash.

The three original U2 pilots keep common Auto/Fixed overlays. The other76 lessons use original Renderer graphics/readouts with independent original axes, labels and normalization; they are not claimed to share a scale. Different model/view contexts withhold deltas. Chapter10 electrical/structural views use separate UI References; Sweep/Budget reuses native acquisition and its capture keys. Chapter11 shares current Architecture/Channel/Pattern within the original both-architecture/all16-state physical Frozen scope. Chapter12 shares current View over original Physical/Evidence Frozen. UI references/visit flags are not in learning backup; original notes/Prediction/native Frozen are.

Physical Android IME/Touch/system Back and measured learning gains remain unverified. Narrow plots retain internal pan. Recall is optional; no new score/gate/notification/answer store. The result-connection button uses prepared Lesson text, not individual answer grading. Draft PR and explicit user review precede main merge; PR14→15 dependencies must be handled before retargeting this PR. See `WORKSPACE_U4_LEARNING_REVIEW.md` and `WORKSPACE_U4_CATALOG.md`.
