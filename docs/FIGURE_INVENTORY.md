# Chapter 1 Figure Inventory · v0.1.1

All ten figures are independently authored. Existing lesson and tutor JSON, and notebook/models.js remain byte-identical to the verified pilot. figures/catalog.json is the machine-readable inventory with exact insertion anchor, parameters, source, assumptions, limits and all three observation-caption fields. figures/renderer.js and figures/styles.css own rendering. No reference screenshots are embedded.

| Lesson | Figure | Title | Classification | Input / model source |
|---|---|---|---|---|
| 1.1 | 1.1A | Core와 Cladding의 단면 | Conceptual | Original SVG |
| 1.1 | 1.1B | Guided Field와 Evanescent Tail | Analytical | Existing Analytical model |
| 1.2 | 1.2A | Fundamental Mode와 Higher-order Mode | Analytical | Existing Analytical model |
| 1.2 | 1.2B | 2D Scalar Transverse Mode Profile | Numerical | Scalar FD Dataset |
| 1.3 | 1.3A | Core의 Wavevector를 성분으로 읽기 | Analytical | Existing Analytical model |
| 1.3 | 1.3B | 같은 조건으로 보는 Phase와 Guided Wavelength | Analytical | Existing Analytical model |
| 1.4 | 1.4A | 같은 조건에서 Geometry를 비교하기 | Numerical | Scalar FD Dataset |
| 1.4 | 1.4B | Slab Width와 n_eff·Mode Count | Analytical | Existing Analytical model |
| 1.5 | 1.5A | Bend Radius와 Radiation을 구별해 보기 | Conceptual | Original SVG |
| 1.5 | 1.5B | 가정한 Bend Loss와 Footprint의 Trade-off | Illustrative | Synthetic Bend + Ledger |

## Validation by model
- Conceptual 1.1A / 1.5A: own geometry diagrams, labels and coordinates visually reviewed. No Field or Radiation magnitude is computed. Bend centerline Radius uses a common scale; stroke width and dashed arrows are qualitative.
- Analytical 1.1B / 1.2A / 1.3A: original slabTE/slabField with explicit d, λ and n. TE1 is absent at 220nm; at 500nm it is an actual eigenmode. Ey and squared Ey are separately normalized/labeled. Core k triangle and cladding q are distinct.
- Analytical 1.3B: original phase() shares n_eff/L with Notebook. Fixed spatial window is distinguished from accumulated Phase. Units and real assumed n_eff are explicit.
- Numerical 1.2B / 1.4A: scripts/precompute_scalar_modes.py and notebook/data/scalar-modes.json. W=220/500/800nm, H=220nm, λ=1550nm, n=3.48/1.444. 5nm scalar FD data; grid/domain, independent homogeneous-box, residual/symmetry and image/data checks. Not a Full-vector Maxwell, TE/TM or device-calibrated result.
- Analytical 1.4B: original Slab TE only, y infinite, all supported branches and count. Current Notebook Width is indicated. Numerical finite-height scalar results are a separate model.
- Illustrative 1.5B: original synthetic bendTable and original analytical designLedger. Four discrete candidates, no fitted/interpolated loss curve or device-design recommendation.

## Figure conventions
Coordinates in µm unless stated nm. Slab profiles: Ey/max|Ey| (−1..1) or |Ey|²/max|Ey|² (0..1); independent peak normalization does not equalize launched Power. 2D scalar map: |u|²/max|u|², common linear 0..1, or 10log10 thereof with −40dB floor. Same RGB scale across all cases and themes. Color Bar quantity and endpoints are visible. Core boundary and labels remain SVG; PNG pixels encode the exact committed relative samples. Node-centered pixels are aligned to physical SVG coordinates and clipped at the display boundary.

All figures have number/title/classification, What You See / What to Notice / Physics Meaning captions, expandable model conditions and keyboard/mobile zoom. Current-reading figure is highlighted without forced navigation. Mobile zoom supports horizontal panning and a sticky close control. None of these actions gates lesson progress.
