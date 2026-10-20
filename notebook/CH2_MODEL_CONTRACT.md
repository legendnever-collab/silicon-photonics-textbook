# Chapter 2 Model Contract

All fields are power-normalized modal amplitudes: |a|² = power [mW] for explicit Pin, or unit input power. Never raw V/m across unlike impedances.

1. Splitter: P1=Pin*r*η, P2=Pin*(1−r)*η, η=10^(−excess_dB/10); amplitudes positive square roots for a stated forward split. Not a reciprocal lossless 3-port scattering matrix; Y antisymmetric reverse input needs radiation/reflection channels.
2. DC: U=[[cosκL,i sinκL],[i sinκL,cosκL]], suppressed common phase, e^(−iωt). κ [rad/µm], L [µm]. Δβ=0 default. General Pcross=κ²/q² sin²(qL), q²=κ²+(Δβ/2)². κ is independent assumed parameter, no geometry fitting.
3. Phase: λnm/1000→µm; φj=2π neff,j Lj/λµm. Δφ=φupper−φlower, β rad/µm. No attenuation from phase alone.
4. MZI/circuit: first coupler U(r), second U(r)†, where U(r)=[[√r,i√(1−r)],[i√(1−r),√r]]. Propagation diag(gupper e^iφupper,glower e^iφlower), gj=10^(−αLj/(20×10000)), α dB/cm, L µm. Port1 bright at Δφ=0 for r=1/2, Port2 dark. At balance T1=cos²(Δφ/2), T2=sin²(Δφ/2). The conjugate output convention corresponds to a rephased/reoriented ideal coupler; do not mix with identical-U naming. Sum output powers equals arm-delivered power; deficit is propagation loss. ER from phase sweep, infinite only for exactly balanced ideal arms; no fabricated performance claim.
5. All-pass Ring: H=(t−a exp(iθ))/(1−ta exp(iθ)); t real self-coupling amplitude, a round-trip amplitude survival, θ round-trip phase rad. Critical coupling t=a<1. a=1 lossless gives |H|²=1 (except singular isolated uncoupled resonance handled as H=1). Notebook sweeps θ, not fictitious wavelength dispersion. FSRλ≈λ²/(ng*2πR), local approximation with explicit independent ng, R [µm]. Not phase index substituted as group index.
6. Uniform Bragg: δ=β−π/Λ, κg [1/µm], Lg [µm]. Constant real κ, lossless forward/backward envelopes. s²=κ²−δ², R=κ²|sinh(sL)/s|² / |cosh(sL)−iδ sinh(sL)/s|², T=1/denominator². Use analytic s→0 limit and imaginary-s trigonometric continuation. On resonance R=tanh²(κL), T=sech²(κL). No geometry or lithography prediction.
7. MMI/Y geometry and mode sketches: Conceptual only. DC plot is Analytical port-envelope power, not a computed 2D EM map. Phasor Figure is exact normalized complex-field arithmetic.

Verification: conservation + independent field matrix multiplication, boundary/limiting conditions, units, periodicity, loss accounting, critical coupling, Bragg exact limits and off-resonance continuation, shared Figure/Notebook output. Existing Ch1 tests and source-byte regression remain mandatory. No FDTD/FEM/fabrication claim.
