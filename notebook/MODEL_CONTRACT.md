# Physics model contract

## Coordinate system and fidelity
Every quantitative result names a model. Slab: x transverse finite full-width d=2a, y invariant/infinite, z propagation. Ey-only TE field. Strip diagram: x Width, y Height, chip plane x–z, z propagation. Strip Quasi-TE means predominantly Ex; the Slab's TE label must not be transferred without checking coordinates.

## Symmetric dielectric Slab
At fixed λ0, real n1>n2>0, equal μ, lossless isotropic media:

E''y + [k0²n²(x) − β²]Ey = 0.

Inside |x|≤a: Ey = cos(hx) for even modes, sin(hx) for odd modes. Outside: match edge amplitude and decay exp[−q(|x|−a)] with odd parity as needed. h²=n1²k0²−β²; q²=β²−n2²k0². Continuity of Ey and dEy/dx gives u tan u=w (even), −u cot u=w (odd), u=ha, w=qa, V²=u²+w². Equivalent monotone equation: u=mπ/2+atan2(w,u). Solve in (mπ/2,min[V,(m+1)π/2]) with 80 Bisection steps. Mode exists only when V>mπ/2; implementation tolerance 1e−10 in V. β=√(n2²k0²+q²). Units inside functions: nm inputs, µm spatial coordinates, β/h/q in rad/µm or 1/µm.

For TE, Sz=β|Ey|²/(2ωμ), so Core Power Fraction equals the unweighted |Ey|² integral ratio. Exact internal integral: a[1±sin(2u)/(2u)], plus for even and minus for odd. Exact total outside integral: edgeAmplitude²/q. Profiles independently normalized to max|Ey|=1 do not imply equal launched Power. Display windows truncate the drawing, but Gamma integrates the infinite tails analytically. Count includes TE family only, not TM or radiation continuum. Solver results are exact to numerical root tolerance for this ideal model, not validated manufacturing data or 2D Strip simulation.

## Phase
λUm=λNm/1000; β=2πneff/λUm; φ=βLUm; λg=λUm/neff. Real fixed neff is an explicitly assumed input. Phase modulo 2π is separate from accumulated Phase. The cosine sketch is fixed to the first 3.1 µm; it does not stretch with L. Group Velocity and Dispersion are excluded.

## Loss ledger
Synthetic b(R) [dB/90°]: (2µm,.4), (5µm,.08), (10µm,.02), (20µm,.005). Author-selected exercise inputs; no measurement, PDK calibration, interpolation or extrapolation. n_eff/Geometry models do not determine b(R). α=3dB/cm, straight path=2mm, N=4 quarter-circle Bends. Length[cm]=2/10+NπR/(2×10000). Propagation=αLength, extra Bend=Nb(R), Total=sum, transmission=10^(−Total/10). Corner footprint R² is a centerline bounding square, not device/chip area. Width, spacing, reflection, interference, transitions, thermal/process tolerances are excluded. Compare defined constraints only; no real-world radius recommendation.

## Analytical vs numerical vs conceptual
Analytical: Snell angle, Phase and dB ledger; analytical Slab model whose transcendental roots are found numerically. Independent finite-difference eigenvalue convergence checks can validate the implementation within the same idealized Slab model. They do not turn the Strip illustration or synthetic Bend table into validated device results. Conceptual: ray paths, Strip geometry, polarization arrows.

## v0.1.1 · 2D Scalar Figure model
Numerical Figure 1.2B / 1.4A uses an independently authored scalar finite-difference calculation. (∂x²+∂y²+k0²n²)u=β²u with real nSi=3.48, nSiO2=1.444, λ0=1550nm, H=220nm, W=220/500/800nm. Fundamental scalar u00 only; no TE/TM or Quasi-TE claim. u is a scalar unknown, not a measured electric-field component. This high-index-contrast approximation omits vector/interface coupling, longitudinal fields and polarization; converging its numerical discretization does not validate actual Strip neff.

Five-point cell-centered Laplacian on x,y=±1µm, homogeneous Dirichlet at boundary faces enforced by odd ghost cells. Subcell Core area fractions average n² within each cell; this makes coarse-grid geometry explicit and is not a vector interface treatment. Sparse symmetric shift-invert eigenproblem, shift (nCore*k0)²+1 above the material bound, eigsh tolerance 1e-10, deterministic all-ones start. Grid comparison 20→10→5nm; domain comparison ±1.0→±1.3→±1.6µm at 10nm. Tests also compare the Laplacian against an independent homogeneous-box discrete/continuum eigenvalue. Per-case residual, symmetry, grid/domain deltas and scalar Core overlap appear in docs/SCALAR_2D_VALIDATION.json. Core overlap is ∫core|u|²/∫all|u|², not a vector Power Confinement Factor.

5nm solutions are sampled by bilinear interpolation onto a common 101×101 display grid over ±1µm, squared and independently peak-normalized. Color PNGs use those same committed samples; their y-axis is explicitly flipped for image coordinates. The Figure's axes and Core boundary are vector SVG. Common linear scale: |u|²/max|u|² = 0–1. Optional logarithmic display: 10log10(relative squared scalar field), clipped to −40–0dB. This is equivalent to 20log10 of relative scalar amplitude but not a measured Optical Power/Loss. Independent peak normalization is not equal launched Power. No interpolation/extrapolation of neff between geometry cases; users choose one of three computed cases.

The analytical Slab Figure 1.4B is a separate model with y invariant/infinite. Its TE mode counts must not be transferred to these finite-height scalar profiles. Original analytical functions, coefficients and synthetic Bend table remain unchanged.
