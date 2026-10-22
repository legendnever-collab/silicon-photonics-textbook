# Chapter 7 Model Contract

Time convention exp(+iωt); forward H=10^(−IL/20)exp(−iφ). Single coherent propagating TE mode per port; amplitudes sqrt(W), power W, dimensionless S. b=Sa. Reference plane immediately at block boundary. Lossless plane shift changes phase only; count propagation once.

Coupler U=[[t,iκ],[iκ,t]], t=√(1−K), κ=√K. Ports ordered [L_upper,L_lower,R_upper,R_lower]. Full reflectionless reciprocal S=[[0,Uᵀ],[U,0]]. Forward U diagonal is through transmission, not full-port reflection. Both MZI couplers point left-to-right: M=U D U; reverse propagation uses transpose, never arbitrary conjugation. Upper arm D=10^(−IL/20)exp(−iδ), lower=1. At K=.5 δ=0 upper output dark; δ=π exchanges outputs.

Spectral δ=δ0+ng ΔL/c (ω−ω0), λ0=1550 nm, ng=4, ΔL=100 µm by default, local 1545–1555 nm only. Common phase omitted consistently. n_eff is not substituted for n_g.

Small 2×2 σ_max: exact Hermitian Gram eigenvalues using trace and hypot(diagonal difference,2|off-diagonal|). Full S has same singular values as U repeated. Pointwise scaling S/max(1,σ) ensures sampled contractivity only, not causality or realizable fabrication. Synthetic fit samples are analytic, never FDTD/measured.

Ring: reuse PassivePhysics.ring(−θ,t,a) to convert legacy exp(+iθ) to exp(−iθ). K=0 returns through 1 explicitly. Singular closed-loop storage at t=a=1 is decoupled, not clamped. a=10^(−roundtrip_dB/20). Independent roundtrip phase and loss, no bias/EO dynamics.

GC: η=η_peak F_norm, F_norm from existing normalized Chapter3 array-factor model; no absolute efficiency inferred. Two identical matched GCs, zero reflection, assigned phase zero. Waveguide length cm and power loss dB/cm. Synthetic length sweep IL=−20log10η_peak+αL at λ0; intercept is the sum of both GC losses, cannot separate asymmetric GCs. No FP ripple or inferred phase.

Guided circuit: boundary source power in mW → sqrt(W) → input GC → MZI → output GC on both ports → detector on upper output. DetectorPhysics.current(lambdaNm,eta,powerUw) reused without duplicating QE or coupling. Source heat outside this passive-network ledger. Report both output powers, input/output coupling rejection and arm loss. Zero power dBm and zero-amplitude phase undefined. Reject NaN/out-of-domain parameters with RangeError.

Function domains are explicit in ch7-models.js. Rendering uses notebook sanitization, pure physics rejects invalid inputs. Reuse map: Chapter2 ring; Chapter3 GC normalized spectrum; Chapter5 current; Chapter6 boundary source (same specified power, no electrical model coupling). New: complex arithmetic, coupler port matrix, coherent MZI, exact 2×2 spectral norm, synthetic polynomial fit and cutback regression. All are teaching models, not calibrated devices.
