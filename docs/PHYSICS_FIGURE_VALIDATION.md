# Physics Figure Validation · v0.1.1

## Preserved analytical baseline
The SHA256 of every original textbook/tutor JSON and notebook/models.js matches docs/FIGURE_BASELINE.json from commit 21c3e2d4a2696332c492fd1bc6768270b67a465b. Existing critical-angle, slab eigenvalue, field, phase and bend ledger equations/coefficients are unchanged. TE0/TE1 parity, existence/cutoff, boundary continuity, exponential Tail, normalization, E versus E², β=k0neff, kCore²=β²+h², and cladding q²=β²−(nClad k0)² are tested. Notebook-driven Figures use those same functions.

## Numerical scalar method
The independently authored script discretizes (∂x²+∂y²+k0²n²)u=β²u. Real lossless isotropic Si/SiO2, n=3.48/1.444, λ0=1550nm, H=220nm, W=220/500/800nm. Five-point cell-centered grid with area-averaged n² in interface cells, homogeneous Dirichlet boundary faces, odd ghost cells. Sparse symmetric shift-invert eigenvalue solve selects the scalar fundamental, with deterministic starting vector and tolerance 1e-10.

Grid study: 20→10→5nm on x,y=±1µm. Domain study: ±1.0→±1.3→±1.6µm at 10nm. Coarse subcell averaging can make grid changes nonmonotonic; the observed final step is reported directly rather than claiming an exact continuum neff. It is a convergence indicator, not a rigorous error bound.

| W [nm] | Computed scalar neff, 5nm | Δneff, 10→5nm | Δneff, domain 1.3→1.6µm | max relative eigen residual |
|---|---|---|---|---|
| 220 | 2.168147427 | 1.379e-03 | 8.839e-08 | 6.678e-13 |
| 500 | 2.617240109 | 9.530e-04 | 9.647e-10 | 4.472e-13 |
| 800 | 2.740325478 | 8.388e-04 | 1.386e-09 | 4.098e-13 |

The worst final grid change is 0.0013792. Last domain change is at most 8.83901e-08. Independent homogeneous-box verification compares both exact discrete and continuum eigenvalues; exact discrete discrepancy 3.788e-13, continuum β² discrepancy 2.818e-04 µm⁻². Symmetry, eigen-residual, material-index bounds and localization are checked per case. See SCALAR_2D_VALIDATION.json for all raw grids/domains. These are numerical checks of the stated scalar equation.

## Display validation
5nm solutions are bilinearly sampled onto 101×101 grid over ±1µm and independently peak-normalized. tests/validate_scalar_images.py reconstructs both common linear and dB color maps from each dataset and verifies all six PNGs pixel-for-pixel, including y orientation. Relative squared-field values are within 0–1 and symmetric. dB display is 10log10 of the same relative quantity, clipped to −40..0dB. Neither display is calibrated Optical Power or Loss. Core edges remain at physical W/H in SVG; image pixel centers align with sample coordinates.

## Limits that remain
Scalar u is not a measured/full-vector electric-field component. High-index-contrast Silicon has omitted vector/interface/polarization effects; numerical convergence does not establish actual Strip neff or TE/TM accuracy. This release does not calculate higher-order 2D mode counts, actual 2D electric-field components, material dispersion/absorption, bend radiation rates, real platform losses, fabrication tolerances or Group Velocity. The scalar neff is never substituted into the separately assumed Phase Calculator or the original Slab mode count.

Bend Figure 1.5A is Conceptual, and 1.5B uses unchanged synthetic educational b(R) inputs. There is no new Bend EM Solver, no measured/PDK data, no interpolated Radius recommendation and no claim of reduced real-world optical loss.

## Reproduce
Use Python 3 + numpy/scipy/Pillow; production build does not need Python:

```sh
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 python3 scripts/precompute_scalar_modes.py
python3 tests/validate_scalar_images.py
npm run build
npm test
```

Data/script hashes are stored in SCALAR_2D_VALIDATION.json. Raw floating-point residuals may differ slightly across numerical-library builds; the scientific checks and bounds are explicit. No API/solver license/network is required at runtime.
