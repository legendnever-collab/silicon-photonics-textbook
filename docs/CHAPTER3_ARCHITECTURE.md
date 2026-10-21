# Chapter 3 · Optical I/O · E0

Baseline main: 61d570cdb22bf693ce1fb8b2502865295d55d56c. User explicitly selected original textbook order on 2026-10-21. Chapter 3 maps to original Chapter 5 Optical I/O (pp.162–214), not active modulators. PN/Active moves to a future chapter after this passive I/O foundation.

Five connected A–F lessons: 3.1 Coupling challenge / normalized overlap → 3.2 Grating coupler / phase matching → 3.3 Edge coupler / inverse taper / alignment → 3.4 Polarization / Jones projections → 3.5 I/O engineering ledger and review. Read theory before predictions, calculations and observations. Preserve substantial Korean prose, English terms, worked examples, offline Tutor with misconception feedback. No scores, missions, rewards or forced gates.

- Preserve textbook/chapter-01/02, their Tutor files, notebook/models.js/ch2-models.js, existing Figure catalogs/data and dist/chapter-01.html plus v0.2.0 HTML bytes.
- Extend shared app by Chapter descriptors and Ch3 Notebook dispatch only. Add notebook/ch3-models.js, notebook/ch3-notebook.js, figures/ch3-renderer.js/ch3-catalog.json. Reuse Figure registration and zoom. No duplicate calculations in renderer.
- New integrated build script scripts/build-chapter3.mjs, output dist/silicon-photonics-textbook-v0.3.0.html. Keep previous build script/info/artifacts. Include all source bytes in source hash. Ch2 regression test evolves to verify current build/source parity plus preserved old HTML hash.
- Storage key sipt-textbook-v3; read-only fallback v2 then Ch1. Keep schema v1 fields and sanitize all numeric inputs per Chapter. Old HTML must not overwrite Ch3 progress. Current app imports valid Ch1/Ch2 backups; older apps are not promised to import Ch3 backups.
- E0 baseline/mapping/contract; E1 Lessons 3.1–3.2; E2 Lessons 3.3–3.4; E3 exercise, browser/source/save regressions, release docs, Draft PR. Each checkpoint has a commit and standalone HTML. Stop at RC; no main merge, no active/next chapter implementation.
