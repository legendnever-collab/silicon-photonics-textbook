# Chapter 1 Figure & Physics Upgrade · v0.1.1 QA

## Status
F0–F3 complete, ready for user learning review. PR #1 remains open; main is not merged. Chapter 2 and Full-vector Solver development are not started. Original baseline source is 21c3e2d4a2696332c492fd1bc6768270b67a465b. Original textbook/tutor/model source hashes remain identical. C1–C4 and F0–F3 HTML snapshots are preserved.

## What changed
10 numbered inline textbook Figures with three-part observation captions, model classification, input conditions and limits. Core/Cladding and Bend geometry are Conceptual. Existing analytical Slab/Phase models drive Mode/Tail/vector/Phase/width/count Figures. A new bounded precomputed 2D Scalar dataset supplies transverse maps and width comparison. The original synthetic Bend ledger supplies the Illustrative trade-off graph. No curriculum or original Lesson/Tutor rewrite, game rewards, free AI chat, backend or external API.

## Executed checks
- Node Content/Physics/Build/Figure tests: 21 PASS.
- Original Browser regression: 15 scenarios PASS.
- New Figure Browser suite: 17 scenarios PASS.
- Desktop 1440×900 and 1366×768; Mobile emulation 390×844 and 320×740, each Light/Dark. Chromium 133.0.6943.0.
- All 10 Figures: insertion, captions, model details, zoom/Escape/focus restoration, page overflow and text size checks.
- Figure interactions: actual TE1 cutoff, Signed/Field², scalar case/linear/dB, live Phase, analytical Slab count separate from scalar Geometry, Bend ledger linkage, preserved session restoration.
- Mobile zoom has horizontal panning and a non-wrapping sticky close control. Reading highlights the nearby figure without forcing page changes.
- Runtime Errors: 0; Console Errors: 0; runtime HTTP(S) requests: 0.
- Numerical Scalar grid/domain/box/residual/symmetry checks and all six encoded-map pixel checks PASS. See PHYSICS_FIGURE_VALIDATION.md and SCALAR_2D_VALIDATION.json.
- Source HTML has embedded Script/CSS/Font/data/PNG; offline Browser was used with network disabled. Two consecutive builds have identical SHA256.

Browser evidence is in artifacts/v0.1.1/browser-results.json and figure-browser-results.json. Screenshots in the same folder show 1440/1366 Desktop, 390/320 Mobile, dark theme, mode zoom and bend comparison. They were visually inspected for label/caption layout, Korean font rendering, contrast, clipping and zoom usability. Original screenshots/reports remain available. Historical Pilot QA is copied as PILOT_v0.1.0_QA_REPORT.md.

## Model accuracy
All original equations and coefficients are reused. New Numerical means a real scalar FD eigenproblem was solved, not a Full-vector or measured Device result. The largest observed 10→5nm scalar neff change is ~0.00138; the last Domain change is <9e-8. This is not a guaranteed physical-accuracy bound. The high-contrast approximation, scalar quantity/normalization, fixed boundaries and limited computed cases are explicit. Bend radiation geometry is qualitative and Bend loss inputs remain synthetic.

## Release identity
- Version: v0.1.1.
- Offline path: dist/chapter-01.html (download and open in Browser).
- HTML SHA256: `35d44b6e612e16633d819aaba2a1b0372d5c96e1b16ffeb1553cb89320f17da1`.
- Content source hash: `ef2af09ad24b7193a96a459e42c80334d40495a8ac8c09f9bd61998f34d7af7f`.
- Production build: Node ≥20, npm run build, no npm production dependencies.
- Test commands: npm test; npm run test:browser (Playwright/Chromium required).

## Not established by these tests
Actual hardware Mobile/iOS/Android, other Browser engines, full Screen Reader/WCAG compliance, physical measurements, device design accuracy, learning time or educational effectiveness. The 30–45 minute Pilot target has not been remeasured after Figures. User review must decide whether the Figure density helps understanding and preserves the textbook experience. Follow LEARNING_REVIEW.md and FIGURE_LEARNING_REVIEW.md. Do not merge main or start Chapter 2 until explicitly authorized.
