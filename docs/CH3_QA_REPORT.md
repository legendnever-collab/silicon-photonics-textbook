# Chapter 3 Optical I/O · v0.3.0 Release Candidate QA

2026-10-21 KST. User selected original textbook sequence. Baseline main 61d570cdb22bf693ce1fb8b2502865295d55d56c. PR #3 Draft, base main. No main merge and no active/next chapter implementation.

## Learning coverage

| Lesson | Implemented learning | Figures |
|---|---|---|
| 3.1 | Coupling challenge, Core vs Mode/MFD, normalized complex overlap, Scalar vs Vector/Fresnel limits | 3.1A/B |
| 3.2 | Grating performance definitions, signed phase matching, finite uniform array factor, BOX/Focusing/Layout/2D–3D/measurement workflow | 3.2A/B |
| 3.3 | Inverse taper/overlay/local modes/EME, independent Gaussian size/offset/tilt, relative vs absolute tolerance | 3.3A/B |
| 3.4 | Jones states/relative phase, orthogonal projections, TE/TM coordinate assumptions, PDL and diversity, unpolarized limitations | 3.4A/B/C |
| 3.5 | Independent I/O assumptions, residual vs total IL, sequential Power Ledger, unit conversions and engineering reflection | 3.5A/B |

All five lessons retain A–F textbook prose, explanation of variables, original worked examples, three distinct Tutor responses with two misconceptions, easy/math/notebook follow-ups, prediction/reflection and self-recorded completion. Original section/page mapping and every conceptual/quantitative deferral are in TEXTBOOK_SOURCE_MAPPING.md. Full paid original chapter text was not acquired; sentence-level fidelity and original experiments are not claimed.

## Physics validation

10 new physics tests PASS. Independent separable 2D complex Simpson quadrature verifies size/offset/tilt overlap rather than copying the closed form. Gaussian normalization, symmetry, bounds, radius/MFD and relative 1dB distance are checked. Grating matching/inverse angle/sign, no propagating first order and finite-sum versus sine-quotient limits are checked. Jones complex component projection is cross-checked with Stokes form and orthogonal channel conservation; linear/circular/relative-phase cases and PDL zero limits are covered. Ledger sequential losses sum with Pout to Pin, mm/cm conversions match additive dB, and residual channels are not silently double counted.

Exact orthogonal Jones UI states suppress only numerical roundoff powers below 1e-30; this is not a physical extinction-floor model. Interface factors and assumed Mode radii are independent inputs; no arbitrary Geometry→Efficiency/Taper-Loss curve is added.

## Automated and browser results

- `npm test`: **59 PASS** (existing 41, Ch3 physics 10, Ch3 content/preservation 8).
- Existing Chapter1 browser scenarios on current integrated HTML: **32 PASS**.
- Existing Chapter2 browser scenarios on current integrated HTML: **15 PASS**.
- New Chapter3 browser scenarios: **15 PASS**. Total **62 PASS**.
- Viewports 1440×900 / 1366×768 / 390×844 / 320×740, each Light/Dark; mobile emulation, offline contexts.
- Runtime errors 0, console errors 0, runtime HTTP(S) requests 0.
- Notebook/Figure shared state, slider keyboard focus, every new Figure Zoom/Escape/focus return, malformed backup rejection, imported parameter bounds/integer count, read-only v2 migration, v3 resume and all-chapter notes in backup/restore verified.
- Chapter1/2 source/model/catalog/data/standalone bytes checked against docs/CH3_BASELINE_HASHES.json. Original HTML hashes retained.
- Same source produces the same v0.3.0 HTML SHA256; embedded source hash and exact scripts are checked by the integrated build regression. dist/CH3_CHECKPOINT_SHA256SUMS.txt includes E0–E3 snapshots; dist/CH3_SHA256SUMS.txt is the current build hash.
- Font coverage: all 543 Korean syllables used by current HTML/JS/JSON/CSS sources exist in the committed Ch3 subset; missing 0. Previous font assets untouched.

Browser evidence: artifacts/v0.3.0/browser-results.json, ch1-regression/, ch2-regression/. Chrome Headless Shell 131.0.6778.204. The current environment's default downloadable browser was unavailable, so an independently downloaded compatible headless browser was used. This does not imply other engines/physical devices were tested. No GitHub Actions workflow is configured, so no CI-run result is claimed.

## Visual and model scope

11 classified Figures: **7 Analytical + 4 Conceptual**. Maps/curves/captions/units/current markers and mobile zoom inspected; Desktop Gaussian/Jones views manually reviewed. Full list: CH3_FIGURE_INVENTORY.md. Grating sketch is Conceptual; numeric matched period and relative array curve use separate declared analytical calculations. The array factor is not absolute efficiency or a calibrated spectrum. No actual Vector/FDTD/FEM/EME/fabrication/measurement was run. Taper, BOX, focusing and diversity are qualitative, with explicit follow-up learning locations.

Ch1/2 HTML remains usable independently. V3 uses a separate key so opening older HTML cannot overwrite Ch3 progress. Older apps are not promised to import v3 backups containing unknown lessons. Actual storage persistence across separate file:// origins depends on Browser policy; Backup/Restore provides explicit transfer.

## User review and stop

Review the reading pace, distinction between mathematical overlap and total device efficiency, Grating sign convention, edge lateral/tilt trade-off, Jones relative phase and the residual-loss ledger. Screenshots and E0–E3 HTML are preserved. Statistical yield, Return Loss and actual package/device ranking remain outside the analytical ledger. Actual educational effectiveness, screen readers/WCAG and physical mobile devices were not validated.

Stop at the Chapter 3 Release Candidate. User learning review and explicit new merge approval are required before main merge. No active or next chapter code added.


## Release stabilization review · R0–R3 · 2026-10-21 KST

Recovery baseline: 83d363d19bf803874e66142fedc7ed72f4c6a17f. Main remained 61d570cdb22bf693ce1fb8b2502865295d55d56c. Fresh clone had no local edits. Existing source rebuilt to the original E3 HTML SHA256 before any patch. R1–R2 source checkpoint: 594b9381a6545698d083a0af4dab6803efa47a43. The final release commit includes this report and the tested exact source hash below.

R0: Existing contracts, mapping, QA, learning review, figure inventory, reports and screenshots were inspected. Original 59 unit/content tests and 62 integrated browser scenarios passed again. E0–E3 and Chapter 1/2 standalone hashes verified.

R1: Official Cambridge contents PDF was reopened and original Chapter 5 sections/subtopics/pages rechecked against TEXTBOOK_SOURCE_MAPPING.md. All five lessons preserve the original challenge→grating→edge→polarization→problems/code sequence, with declared scaffolding and advanced deferrals. Full paid chapter body was not available. A–F prose, worked examples, Tutor misconceptions, prediction and reflection remain intact. The mapping did not need rewriting.

R2: Existing independent Gaussian complex quadrature, normalization, grating finite-sum/sign/nonpropagating-order checks, Jones/Stokes and orthogonal conservation checks, and sequential loss/units/accounting checks were rerun. No calculation defect was found in notebook/ch3-models.js. One explanatory error was corrected: cos²(psi-alpha) applies to chi=0 deg in the chosen parameterization; chi=+/-180 deg gives cos²(psi+alpha). The existing linear-state test now checks both branches over multiple input/analyzer angles. Required mW↔dBm explanation was missing, so Lesson 3.5 now gives both conversions and worked values; the existing ledger readout also reports dBm and handles zero power as −∞. The model, assumptions, input controls and factorization are unchanged.

R3: A serif Korean fallback square in the Lesson 3.4 term label was found during visual review and replaced by English “Assumptions”. No shared Chapter 1/2 styles were changed. Final build passed 59 unit/content tests, Chapter 1 browser 15 plus figure browser 17, Chapter 2 browser 15, and Chapter 3 browser 15: 62 browser scenarios total. Runtime errors, console errors and runtime HTTP(S) requests were zero. Viewports and themes match the original matrix above. Backup/restore, old-key read-only migration, notes, parameters, tutor, reading position, keyboard focus and figure zoom were exercised in the existing suites. Final browser reports and six changed-area desktop/mobile captures are in artifacts/v0.3.0/release-review/. Original screenshots/reports were preserved. Chrome Headless Shell 131.0.6778.204 and Playwright 1.62.1 were reused; physical devices and other engines remain untested. The two source patches do not introduce a full-wave solver, new framework, new curriculum or new figure.

Current standalone HTML SHA256: `0f55380c219f31ec57b90288f529d8be32eea3d0fbedba5374d83c8e6602a8ad`.
Embedded sourceHash: `81ca57d79da92d08a2eb4add2f7822706c624b9d2390ed415919e07f1ea1db3d`.
The final build was repeated with identical bytes; exact embedded sources are checked by the existing integrated build test. CH3_CHECKPOINT_SHA256SUMS.txt tracks the updated current HTML separately from the preserved original E3 snapshot. All previous checkpoint and Chapter 1/2 hashes still pass. The current font still covers all 543 used Korean syllables (0 missing); original font assets are unchanged.

GitHub has no configured Actions workflow/run, so local tests are not described as CI. PR #3 remains Draft and technically ready for user learning review. Main merge awaits explicit user approval. Review core concepts with CH3_LEARNING_REVIEW.md, particularly overlap vs total coupling, grating phase factor vs efficiency, mode conversion vs alignment, relative phase/Malus conditions, and residual loss vs total IL/dBm. All previously declared physical and educational limitations remain applicable. Stop here; Chapter 4 was not started.
