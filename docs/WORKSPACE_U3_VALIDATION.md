# U3 Pilot · v0.12.4 validation

The user authorized the next checkpoint after U2 Pilot. This release stacks on PR14 head `1f742b10cba8f1964b29139ffb58b471e63f97a3`; main remains `4c59804424700ac8fc2680feb3820e6f438612d4`. Source checkpoint `0c7f2dd855826bfe9eeeed866e78468c28d7bb27`. Both PRs remain unmerged. Final head/hosted CI results are recorded in the PR after creation, without self-referential commit metadata.

## Exact artifact

- Standalone: `dist/silicon-photonics-textbook-v0.12.4.html`
- HTML SHA256: `40b2329ef02d05f33670caa17b8e6d56f5647e4bd5c007959bf12c0f5734530f`
- UI sourceHash: `2a7ed43c481404b714a5811f01ffd731fd794504fe3bb419444b265b8e92749b`
- Git blob: `19bcd52eefcbb1ad8be88c1661417cd2bef8dc7c`
- Original Physics report version/source provenance and learning save schema remain unchanged.

## Validation evidence

`artifacts/v0.12.4/validation-summary.json` checks all reports against the exact release HTML hash and rejects stale, missing, failed or partial scenarios.

| Suite | Scenarios | Evidence |
| --- | ---: | --- |
| U3 Pilot | 31 | `u3/browser-results.json` |
| Original U2 assertions on U3 HTML | 31 | `u2/browser-results.json` |
| Original all79 UI/parity on U3 HTML | 634 | `all/desktop-results.json`, `all/mobile-results.json` |
| Original integrated Chapter12 on U3 HTML | 67 | `integrated/ch12-browser/browser-results.json` |
| Total browser | 763 | 0 runtime/console/network errors |
| Original Node/representation tests | 269 | No original assertion edits |
| Independent numerical comparisons | 11,955 | Existing independent Chapter12 oracle |
| Prior protected files | 838 | All hashes unchanged; README/package metadata excluded |
| New Hangul coverage | 88 required / 0 missing | Original embedded fonts unchanged |

U3 matrix: three pilots ×1440×900/1366×768/390×844/320×740/844×390 ×Light/Dark, plus corrupt UI-pref isolation. Tests verify actual input node identity, no duplicates, same nodes across notebook View rendering, original Prediction selection and all three notes, prepared feedback, pinned geometry while writing, no page overflow, model/Frozen/seed preservation, theme/expansion/return/reload, no cross-lesson leakage, optional collapsed revisit prompt and original actual JSON export/import. UI visits are separate from original learning records.

U2 comparison tests retain their original assertions. The all79 suite retains 632 viewport/theme scenarios, direct original/new model and graphic parity for all79 lessons, and a component walkthrough. Integrated67 covers all Chapter12 tutors, notes, predictions, numeric Properties, Frozen, reports, actual backup/restore, invalid imports and historical migrations. Wrappers change only target HTML/build-info/output/browser routing; source assertions are protected by the baseline manifest.

Build is deterministic; all sourceManifest entries and full TEXTBOOK data match. Frozen v0.12.0–v0.12.3 releases remain byte-identical. All physics, Renderer and original application source files remain unchanged. UI code derives only the new HTML from frozen v0.12.3. Production execution needs no network, dependency install or backend.

Six review screenshots show the three pilots at Desktop Light and Mobile Dark, with themes explicitly selected. Automated screenshots named by initial theme may show the later theme toggled by observation-preservation tests; the separate `review/` set fixes that ambiguity.

## Limits and review

U2 and U3 remain three-lesson pilots; U1 covers all79. Physical Android IME/Touch/system Back and measured learning improvement remain unverified. Narrow plots retain existing internal pan. Recall is a user-opened repetition of the original prediction question, with no answer grading, score, gate, notification or extra note store. UI visit flags are not backed up; the original notes/Prediction/Frozen are. The existing result connection button displays prepared Lesson feedback, not a numerical evaluation of the learner's answer.

The dedicated PR workflow runs U3/Physics plus U2, all79 and integrated regression jobs on the final head. Local evidence above and hosted CI are separate; final hosted outcomes are linked in the PR. User Play Review and explicit approval remain required before main merge. See `WORKSPACE_U3_LEARNING_REVIEW.md` for the practical walkthrough.
