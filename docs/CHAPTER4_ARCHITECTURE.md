# Chapter 4 Architecture — textbook-first Modulators
## Baseline and policy
Repository main at start: `accb134a59e1cc7f40bbfa9c6a6fcd0068267023` (merged Chapter 3). New `feature/ch4-modulators` branch; never modify v0.3.0 build or Chapter 1–3 validated content. User approval required before main merge; do not start Chapter 5.
Continuity: A–F substantive Korean paragraphs with English technical terms; original worked examples; misconception-sensitive offline Tutor; prediction → calculation → figure → interpretation; no points, missions or forced gates.

## Proposed lessons
- 4.1 Plasma Dispersion: electron/hole density and index/loss, assumptions.
- 4.2 PN Junction Phase Shifter: depletion width, carrier/optical overlap, Δn_eff and φ, VπL, RC and TCAD limitations.
- 4.3 MZI from Voltage to Light: derived complex interference, two complementary outputs and transfer.
- 4.4 Micro-ring Modulators: detuning of all-pass resonance, critical coupling and bandwidth limits.
- 4.5 Forward-biased PIN / VOA: injected carriers, loss, exponential transmission and speed.
- 4.6 Active Tuning: injection versus thermal tuning, power-to-temperature linear model.
- 4.7 Thermo-optic Switch: switching transfer, 1st-order thermal response and synthesis.

## Fidelity hierarchy
1. Existing Chapter 1–3 models unchanged, reused as references only.
2. Transparent validated analytical teaching approximations for Phase/Power/RC/Thermal/Ring; user-visible assumptions and units.
3. Doping/carrier-profile cross-section labeled **Conceptual** unless a reproducible Poisson/TCAD solution is actually implemented.
4. No arbitrary geometry→`VπL`/bandwidth/Extinction Ratio regression; never claim PDK, measurement, full-wave, 200G, or TCAD.

## UI and integration
Reuse existing chapter navigation, local backup/restore, Tutor, SVG Figure catalog and right Notebook. Add chapter-04 lesson/tutor data, `notebook/ch4-models.js`, `ch4-notebook.js`, `figures/ch4-renderer.js`, `ch4-catalog.json`; retain old standalone files. Migration: new `sipt-textbook-v4` reads v3/v2/Ch1 without writing to old keys. Include a reproducible Offline HTML in build.
Figure plan: 4.1 carrier → Δn/Δα; 4.2 PN cross section & depletion / Δφ & RC; 4.3 MZI transfer; 4.4 resonance detuning & static transfer; 4.5 injection / attenuation; 4.6 thermo-optic tuning & thermal time; 4.7 switch states, response. Captions What You See / What to Notice / Physics Meaning, clear model classes.

## Checkpoints
M0 Recover main & map original textbook; architecture/model contract; commit.
M1 Lessons 4.1–4.3 and reproducible physics, Tutor, illustrations; independently runnable checkpoint and regression.
M2 Lessons 4.4–4.6; analytical limitations and model tests; checkpoint.
M3 Lesson 4.7, integrated offline v0.4.0, save migration, responsive browser tests, preservation hashes, QA and draft PR. Stop for user study review.

## Definition of done
Student can explain voltage/bias/carriers→Δn_eff/Δα→Phase/Power; PN depletion vs PIN injection; MZM vs MRM; static vs dynamic bandwidth; thermal vs electrical control. Keep Chapter 1–3 byte-identical and ensure complete regression.
