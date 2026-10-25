# U0 · Existing experience audit

2026-10-25 Asia/Seoul. Remote main: 45db327da3b4c40cff88dae42d7d8a816501c4f6, matches Chapter12 merge. No existing workspace branch/PR or local changes found. No applicable AGENTS.md found in checkout or parent workspace. Fresh isolated checkout; no learner records copied or modified.

## Cause and reuse

`#reading` and `#notebook` independently scroll on desktop. Inside Notebook, `.notebook-sheet` puts `#notebook-plot`, Controls and `#notebook-readout` in the same outer scroller; lower Controls therefore displace the plot. On mobile `placeNotebook()` moves the same aside into `#mobile-notebook-slot`; document owns scrolling. Chapter12 includes fourteen sliders, grouped details, View/Pattern/Filter/Noise selects and a modal numeric editor. Its complete readout includes lengthy scope/evidence explanations, unsuitable for a fixed header.

Reuse the original Notebook aside, live plot, readout and delegated input/click handlers. Keep all model, Renderer, lesson/tutor and persistence code. `renderNotebook()` rebuilds on Chapter1 View changes; `updateNotebook()` refreshes plot/readout on parameters. Chapter1 mode buttons are rebuilt by update; the UI adapter will reconcile surviving buttons so keyboard focus is retained. Chapter12 View changes already update in place. Modal Properties, Figure Zoom, Current/Frozen/Stale and reports remain their existing implementations.

Desktop reading stays independent. Pilot Notebook becomes toolbar + observation + separator + controls. Move live plot (never clone it); derive 2–3 compact KPI strings from existing Renderer readout, not duplicated physics. Complete caption/readout/assumptions stay in controls. View title stays visible. Inline mobile retains natural reading; the same aside moves into an app-internal modal for expanded mode, with fixed graph and independent controls. Wide expanded mode uses left/right split. A separate UI preference stores only split ratios, never Physical/Evidence state.

## Preservation / build strategy

`WORKSPACE_PRESERVATION.json` hashes all tracked lessons, tutors, notebook/model files, Renderers, original app/CSS, tests, fonts, scripts, releases and checkpoints. Preserve them byte-for-byte. New standalone is an additive, hash-checked derivative of immutable v0.12.0 HTML: inject UI CSS/module and three checked app hooks for render/update/place. Reuse original compiled Physics/Content/Renderer; no copy/forked model. v0.12.0 is not rebuilt or overwritten. Keep original TEXTBOOK provenance/storage key/read-only migration and report version; expose separate WORKSPACE_BUILD provenance for UI. New build source manifest includes base HTML hash and extension sources.

Allowed existing metadata changes: package.json adds workspace build/test commands and sets current build/version; README adds review entry. Historical chapter commands/builders stay available. Add a U1 CI workflow. Existing assertions will run unmodified against archived releases and, via transient test copies with target/output substitution, against new HTML; output evidence is stored separately. Audit new Hangul against embedded fonts, adding a separate subset only if required.
