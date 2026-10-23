# Chapter 9 Model Contract — SIPT-FAB-1

Independent deterministic teaching assumptions. No foundry calibration, measured wafer dataset, lithography/etch solver, process distribution or yield prediction. All original chapters and releases remain byte-identical. Chapter8 is an unmerged dependency; no main merge is authorized by Chapter9 development.

## Coordinates and geometry
Nominal shallow-etched rib: width500nm / silicon thickness220nm / etch depth70nm; residual slab150nm. Geometry is not a solved strip mode. Signed positive etch means deeper removal. A/B normalized die positions x=∓d/2; d∈[0,1] has no calibrated physical length. Width offset: bias + 2edge + gradient*x + local, with localA/B=∓m/2. Edge is symmetric outward offset per side. Ring centerline and circumference remain fixed, even with width bias. A separate 100×100nm corner coupon uses rounding0–40nm, with no connection to optics. Its radius is not the ring centerline radius.

Controls: common width±8nm; each edge±2nm; common thickness±4nm; common etch±5nm; gradient±4nm per normalized x; local B−A mismatch±4nm; period±8nm; separation0–1. Thus actual device width deviation is within±16nm, thickness±4nm, etch±5nm. The fixed corner box has width±10nm/thickness±4nm/etch±5nm and is independent of current slider state. Sanitization retains only known finite numeric settings and clamps these intervals; view/preset are bounded integers.

## Ring: fixed mode order and linear dispersion
λ0=1550nm, n0=2.4, ng0=4.2, m=100, L=mλ0/n0=64583.33333333334nm (R=L/(2π)=10.278756741351575µm).
Δn=.0008Δw+.002Δt−.0005Δe (geometry nm; coefficients nm⁻¹). Declared dispersion: n(λ,p)=n0+Δn+(n0−ng0)(λ−λ0)/λ0. Differentiating nL=mλ at fixed L gives first-order δλ=λ0δn/ng0. Solving the declared linear model gives exactly λ_m=λ0(ng0+Δn)/ng0. Perturbed ng=ng0+Δn, not a second independent control. Approximate FSR=λ_m²/(ngL); plots contain multiple orders and mark only m100. A closest-dip algorithm is not used.

Through power T=|[t−a exp(iφ)]/[1−at exp(iφ)]|², φ=2πnL/λ. a=t=.98 are field coefficients, critical coupling. Stable real form uses z=2at(1−cosφ), numerator=(a−t)²+z, denominator=(1−at)²+z. Input normalized to1. Geometry-dependent coupling/loss, scattering/backreflection, thermal changes, polarization, full-vector modes and fabrication-induced centerline deformation are not modeled. Spectral plot1535–1565nm is a declared illustrative linear-dispersion range.

## Grating: frozen effective index and assumed envelope
PeriodΛ0=630nm, cladding1, fixed output angleθ10deg. Nominal nB=1550/630+sinθ. ΔnB=.0005Δw+.0015Δt−.001Δe. Wavelength dispersion of nB ignored. Phase matching λp=Λ(nB−sinθ) gives λp=(630+δΛ)(1550/630+ΔnB), retaining the product cross term. It is not the ring index or group index.

Assumed Gaussian power efficiency η=.6 exp[−4ln2((λ−λp)/40nm)²]. Power FWHM40nm, peak.6 are fixed teaching assumptions. η(λp±20nm)=.3. No radiation/reflectivity/directionality/fiber-overlap calculation, full-wave prediction or measured efficiency. Plot1500–1600nm. Period affects only grating; rounding affects only its coupon geometry.

## Corners, field and covariance
Corner table: nominal plus all eight unweighted combinations W±10/T±4/E±5nm, period offset0. Monotonic linear ring shift achieves ±6.82738095238nm bounds at W+T+E− / W−T−E+. This is a statement about the declared box/model, not a guarantee for nonlinear device metrics. No PASS count or probability/yield inference.

Deterministic5×5 normalized die field: common+gradient*x, explicitly excludes local offsets. A/B positions can overlap; solid/dashed rings of different sizes remain distinguishable. Local offsets persist at d0; no distance-dependent local covariance function or real metrology map. Separate analytical example C+LA/C+LB, independent components, σC3nm σL1nm gives VarA/B10nm², Cov9nm², ρ.9, VarB−A2nm². Not estimated from sliders or samples. Zero total variance gives undefined correlation, serialized null.

## Persistence and exports
New localStorage key sipt-textbook-v9; fallback v8…v2/ch1 read-only. Previous state is validated using original validators plus Chapter9 finite clamps. JSON Fabrication Study Report schema1 includes state, device geometry, ring/grating scalars, fixed corner table, separate covariance example and scope flags synthetic=true, measuredData=false, yieldPrediction=false. Learning backup/restore retains notes, choices, predictions and completion separately. Report is not measurement data or manufacturing approval.
