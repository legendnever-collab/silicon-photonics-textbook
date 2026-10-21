# Chapter 5 architecture — D0

Baseline main 0b0f3ab8410d46147f310d93c0a5a9ce587f404e; PR4 merged, latest existing Chapter4 Actions success. Local baseline: 79/79 Node tests, rebuilt v0.4.0 SHA d35dccadca62d9d5f36d3afd92101bdd2fde18d4addbb1bdb4826e46b05a3fee. Existing tracked lesson/tutor/model/figure/dist hashes captured in CH5_BASELINE_HASHES.json.

Reuse src/app.js A–F renderer, reading column, Offline Tutor, figures mount/refresh, notebook shell/sliders and sessions. Add textbook/chapter-05/5.1–5.7.json, tutor/chapter-05, notebook/ch5-models.js and ch5-notebook.js, figures/ch5-catalog.json and ch5-renderer.js. Existing Chapter1–4 content/figures/models stay byte-identical. Small new dispatches/source links in shared app only. No new framework or runtime network.

Objectives follow Chapter7: photon→charge; η→R; transit vs RC; material integration; architecture; geometry/contacts/load; optical and transport domains; integrated interpretation.

## Figure inventory plan
5.1A Conceptual carrier collection / 5.1B Analytical R(λ)
5.2A Conceptual transit vs circuit / 5.2B Analytical RC response
5.3A Conceptual Ge-on-Si cross section / 5.3B Conceptual fabrication steps
5.4A Conceptual three structures / 5.4B Conceptual avalanche multiplication
5.5A Analytical absorption vs length / 5.5B Conceptual orientation/geometry trade-offs
5.6A Conceptual generation→collection / 5.6B Conceptual solver domains
5.7A Analytical performance ledger (13 figures total).
Every figure has number, title, class, source, assumptions, see/notice/meaning/limits. Computed values and figures consume same state/model functions.

## Persistence/navigation
Keep payload version=1 and add new namespace sipt-textbook-v5 with read-only v4/v3/v2/ch1 fallback. validate() preserves every known prior lesson, note, answer, position, completion, theme, settings; sanitizes Chapter5 separately. v4 key is never overwritten. Backup/restore remains same JSON, supports both old and new lessons. Migration is browser tested with seeded v4. Add chapter5 nav to same app.

## Checkpoints and release
D0 docs+baseline. D1 5.1–5.2 models/tutor/figures/first offline checkpoint. D2 5.3–5.4 fabrication/architectures. D3 5.5–5.6 geometry/modelling. D4 5.7 review and QA: all Node tests, prior browser regressions, new 4 viewport ×2 themes offline browser coverage, backup/restore, deterministic build, source manifest, font coverage and screenshots. Every stage committed, pushes without force; Draft PR and stop for learner review. Preserve old offline files. dist/silicon-photonics-textbook-v0.5.0.html is standalone. No main merge; no Chapter6.
