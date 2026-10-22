# CH6 model contract — D0

Original educational, quasi-static scalar models. All parameters independently assumed, no device calibration. Numbers finite; out-of-domain inputs throw RangeError; UI restore clamps recognized numeric settings and ignores other fields. SI h,c,q exact.

## threshold({materialGainCm, confinement, internalLossCm, r1, r2, lengthUm})
Power gain/loss cm⁻¹→m⁻¹ ×100; L µm→m ×1e−6. Domains g,α∈[0,1e5] cm⁻¹, Γ∈[0,1], 0<R1,R2≤1, L∈[0.01,1e6]µm. modalGain=Γg. Mirror αm=−(lnR1+lnR2)/(2L), modal threshold=αi+αm. Log round-trip margin=lnR1+lnR2+2(Γg−αi)L, dimensionless; unity is zero log margin. Return cm⁻¹ and m⁻¹ explicitly, no exp overflow. Material threshold null at Γ=0. No photon count or lasing output prediction. Assumes uniform FP at a resonant frequency; phase condition is separately necessary and not solved. R=1 eliminates mirror loss but also output coupling at that mirror. Not an exact external-cavity/DFB/DBR model.

## li({currentMa, thresholdMa, etaD, lambdaNm})
I,Ith∈[0,1000]mA; ηd∈[0,1]; λ∈[300,5000]nm. Pout[W]=ηd hc/(q λ) max(I−Ith,0), I converted to A. slope [W/A] numerically same as mW/mA. Specified single output port; ηd is differential quantum efficiency at that port. Ith is independent, NEVER derived from gain margin. Below-threshold spontaneous output, saturation, thermal rollover and time response excluded. ηd is not WPE.

## ledger({sourceMw,wpe,lossDb}) and dbm(mW)
Psource∈[0,10000]mW is total optical output at defined source boundary, single-output assumption. 0<WPE≤1; IL∈[0,100]dB. ηc=10^(−IL/10). PPIC=Psourceηc; Pelec=Psource/WPE; Qsource=Pelec−Psource; Puntransmitted=Psource−PPIC. Every output in mW. Qsource is at source, excludes driver/TEC. Puntransmitted is reflected/radiated/absorbed elsewhere; never added to Qsource. Energy residual Pelec−Qsource−PPIC−Puntransmitted=0. dbm(0) returns null, displayed −∞ / 출력 없음. No forced connection from L–I: voltage and port accounting would be needed.

## structure(index)
Discrete conceptual choices 0 External,1 Co-packaged pre-made,2 External cavity,3 Etched-pit embedded,4 Hybrid bonded,5 Monolithic III–V,6 Monolithic Ge. Return explicit gain/cavity/Si/output labels. No performance score, yield, overlap integral or spectrum. Hybrid section illustrates spatial overlap conceptually, not a calculated mode field. Raman supplement optical pump is external energy, never free electrical efficiency.

## Persistence and build
Existing record version1 and all Ch1–5 bytes retained. New key sipt-textbook-v6 reads v5/v4/v3/v2/ch1 fallbacks without modifying them. CH6 build applies checked additive hooks to legacy app in-memory; original src/app.js and archived build manifests remain byte-identical. Production no dependencies, all fonts embedded.
