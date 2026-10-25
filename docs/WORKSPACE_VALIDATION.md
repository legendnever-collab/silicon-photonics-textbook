# U1 · Validation / QA

2026-10-25 Asia/Seoul. Runtime/HTML source commit: `437e9d3d3738fc88099ad00e4d53e73d3585ee70`. Finalization includes a CI runner path correction and review evidence; it does not change the runtime HTML. Exact final HEAD and hosted conclusions are recorded in PR13 body/checks, avoiding self-referential hashes.

## Executed results

| Execution | Artifact / scope | Result |
|---|---|---|
| Node Physics/Content/retained assertions | Current source |264PASS /0FAIL |
| Independent Python | Chapter12 numerical teaching model |11955comparisons PASS |
| U1 acceptance Browser | Exact v0.12.1 HTML below |117PASS /0FAIL |
| Original Chapter12 Browser assertions | New v0.12.1 integrated79 HTML |67PASS /0FAIL |
| Original Chapter1–12 Browser assertions | Each original archived HTML;13suites |612PASS /0FAIL |
| Preservation |397original tracked source/font/test/release/checkpoint files |SHA256 unchanged |
| Curriculum / persistence |Full TEXTBOOK payload vs v0.12.0 |byte-derived data equal;79Lessons /12Chapters; original v12save/fallback policy |
| Build |Two consecutive builds |byte-identical |
| New runtime font strings |Original seven embedded fonts |40required Hangul /0missing |
| Runtime / Console / HTTP / SVG bounds |Acceptance and integrated/archived reports |0errors / no external requests |

These executions are separate:117new acceptance scenarios,67old assertions retargeted to new HTML,612old assertions on archived releases. No historical count is passed off as a newly executed total. Browser scenarios are not individual assertion counts and do not establish learning efficacy. Local Browser:Chromium153.0.8010.0; hosted Browser is separately recorded in CI logs.

Viewports:1440×900,1366×768,390×844,320×740 × Light/Dark. Additional expanded portrait→844×390landscape→portrait checks include closing while landscape and correct desktop/inline remount. Pointer and Keyboard(Home/End/Arrow/Shift+Arrow) resize enforce usable graph and controls. Original controls/plot DOM identities, focus and independent scroll are checked after bottom-most input interaction. The117scenarios include same-state modal open/close/Escape/inner Properties/Figure Zoom, numeric Apply/Close, multi-mode/Field/Dispersion, Tx/Rx/Pattern, Shot/Thermal, σ0/σ1 and opening KPI, explicit Frozen/current/stale, Report downloads, Theme and direct original-model graphic/readout parity.

Chapter12's old67scenarios navigate all79Lessons, check A–F/Tutors/Prediction/Reflection, live model values, original Figure bounds/zoom/pan, actual Report and Backup/Restore downloads, future-schema rejection and read-only prior save migration. All old test sources remain byte-identical. `scripts/workspace-regressions.mjs` creates transient copies and changes only browser/output/target routing; SHA256 of each original test is in suite-routing.json.

## Artifact / provenance

- HTML:`dist/silicon-photonics-textbook-v0.12.1.html`
- SHA256:`566537810b9ad8a0d52317c942d0ef7f1e2ac26a15000a82eb1be109d98f41b8`
- UI sourceHash:`b61beb32f98ba8bf847b00177abd82e2fc540b7b4f1be7ca7a41791d121b365b`
- Original v0.12.0 HTML remains:`3fd513bdfb35af4854b7e3d9d300d330c75dd87b7804c5ce28bbb14bb08e54db`.
- Existing Physics Report/sourceManifest/version0.12.0 intentionally retain original model provenance. UI provenance is separate in WORKSPACE_BUILD and workspace-build-info.json. No copied physics formula or extra model evaluation is used for pinned KPI.

## Failures found and handling

- Acceptance geometry exposed an expanded-grid specificity error; corrected CSS and reran the full matrix.
- Mobile close initially left the expand button hidden because layout returned before toolbar visibility reset; corrected before the inline branch and reran all viewports.
- Added breakpoint-aware placement when closing after rotation; tested both landscape close and portrait return.
- New tests initially assumed increasing Tested Bits must change the first8UI waveform. Corrected this new test to the declared periodic-pattern physics: evidence count changes; histogram can change, while the first8UI may be identical. No historical assertion was changed.
- New Report comparison initially compared the full in-memory waveform against the established compact Report pack. Corrected it to compare all packed fields plus exact computed point/segment metadata. No Report/model implementation was changed. An assertion diff caused a local memory kill during this investigation; later normalized comparison and complete matrices passed.
- Intermediate hosted Chapter8 run40162609770 at e35576b failed in unchanged archived Chapter3 save/restore `waitForFunction`, tests/ch3-browser.mjs14:942. Chapter8's67scenarios passed. Identical archived source passed locally; later runtime437e9d3's nine historical workflows, including Chapter8, passed. Retain the first failure as timing/environment evidence; no arbitrary sleep/assertion weakening.
- Runtime437e9d3's Workspace run40163039268 passed build/Node/reference/preservation and all117acceptance scenarios, then failed to resolve `undefined/playwright` from a regression copy in `/tmp`. This was an execution-harness defect, not a Physics/UI failure. Transient copies now live under `tests/` so Node resolves the repository-installed Playwright on hosted CI. The complete67-scenario local integrated run without CODEX_PRIMARY_RUNTIME_NODE_MODULES passed through the corrected route; exact-final-head hosted execution is resolved in PR13.

## Visual review / practical limits

Representative Desktop/Mobile × Light/Dark, desktop expanded,320px numeric editor and844px landscape images are in artifacts/v0.12.1/review/. The original live SVG is moved into a presentation frame; Rx/Tx/full display changes do not acquire evidence. Labels retain a minimum rendered scale; narrow graphs can require horizontal/vertical pan rather than reducing type below readability. Full source plots/captions/readout remain accessible and Figure Zoom is preserved.

Numeric Properties footer and experiment Close stay reachable in the viewport matrix. This is Viewport Emulation, not physical Android. Real Android software keyboard/IME, system Back, touch-drag feel and browser chrome behavior remain user-review items. Keyboard validation here means hardware-style browser key events and focus/Escape, not an actual phone IME. No measured learning improvement is claimed.

User review guide:docs/WORKSPACE_LEARNING_REVIEW.md. Pilot only1.4/12.2/12.5. No U2–U4, pop-out, Chapter13 or main merge.
