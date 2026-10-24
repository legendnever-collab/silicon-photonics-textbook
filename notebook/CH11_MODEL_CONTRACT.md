# Chapter 11 Model Contract — SIPT-WDM-1

Independent four-carrier static teaching fixture. No foundry/measured data, high-speed EO response, modulation sidebands, time-domain eye, BER, receiver qualification, thermal/noise solver or hardware control. Original Chapter13 topology/order verified from official contents; full paid chapter/figures/data not accessed or copied. Technical architecture descriptions are supported qualitatively by inventor disclosure US9941990B2 and OFC2014 Th4G.6 published abstract. All numerical parameters, prose, examples, SVG and code are independently declared.

## Existing model reuse
Unmodified Chapter7 `CircuitPhysics.ring` calls Chapter2 complex all-pass feedback. Chapter3 `IOPhysics.gaussian` / `jones`, Chapter9 `FabricationPhysics.gratingPower`, and Chapter5 `DetectorPhysics.current` are called directly. No earlier source, model, figure, font, release or archived assertion is changed. New lossless add-drop Mux composes Chapter7 complex arithmetic; it is distinct from the lossy all-pass modulator.

## Four frequency channels and static data
N=4. f0=c/1550nm=193414.489032258 GHz. f_k=f0+(k−1.5)spacingGHz, k=0…3; spacing50…200GHz. lambda_nm=c[m/s]/f_GHz (the numerical powers of ten cancel). Exact lambda values are calculated, not linearly approximated. At100GHz spacing:1551.203014590/1550.400797480/1549.599409688/1548.798849928nm. Fixed N; a gross4×25Gb/s arithmetic example does not assert supported baud/data rate.

Four independent binary labels b0…b3, pattern0…15; display b4…b1 with human channel numbering1…4. All16patterns are enumerated. Bit0 modulator resonance=carrier+commonDrift+fixedMismatchPattern+tune. Bit1 adds positive driveGHz0…50. Frequency FSR200…1600GHz is constant, identical for all modulator/filter rings; theta=2pi(f−fres)/FSR. Finite-domain frequency-periodic model, no wavelength dispersion or PN voltage calibration. A common-bus comb/pre-multiplexed input is assumed ready at its source plane. Mod-Mux uses separate branch carriers. No upstream combining loss, laser electrical power or comb generation is modelled.

## All-pass modulator / new passive add filter
Modulator t=a=.98, power coupling K=1−t²=.0396, round-trip power dB=−20log10(.98). T=|(t−a exp(−i theta))/(1−at exp(−i theta))|² using prior feedback. T(0)=0 ideal critical coupling, T(15GHz;FSR800)=.8946289629684452. Rejected all-pass power is not passed through an invented output. No fake finite ER at exact zero; null means a finite ER is not defined under the declared ideal example, not detector range qualification.

Symmetric Mux couplers: power K=.05… .5, t=sqrt(1−K), internal round-trip amplitude a=1. With z=exp(−i theta), through field=(t−tz)/(1−t²z); add/drop field=−K exp(−i theta/2)/(1−t²z). Through and Drop powers sum1. At resonance Drop1,Through0. Identical reciprocal add and drop power used; propagation is a feed-forward power graph. Other injected wavelengths are distinct, reflected/backward/re-injected paths are ignored. No multimode/inter-ring coherent interference. This lossless multiplexer assumption is not a real-device loss prediction.

## Path order and power reference planes
Each source emits0…5mW per carrier. Both ports share identical coupling eta=Chapter9 Gaussian grating envelope(peak.6,FWHM40nm,lambda0=1550nm)×Chapter3 equal Gaussian spatial overlap(radius2um,common waist,dx±3um,dy0,no tilt)×Jones linear cos²projection(0…80deg). Both port factors apply once. No axial defocus, vector field or asymmetric port drift. Fixed measured data are not used.

Common-bus carrier k: source×etaIn×product_j T_mod,j(f_k,b_j)×10^(−4 segmentLossDb/10). It visits all four active rings and four equal segments.

Mod-Mux carrier k: source×etaIn×T_mod,k×D_mux,k×product_{j>k} T_mux,j×10^(−(4−k)segmentLossDb/10). It visits its own active modulator then own add filter, followed only by later passive bus filters. Four branches inject in fixed order1…4; earlier carriers traverse more filters/segments. SegmentLoss0…1dB includes assigned static propagation/routing attenuation and is not derived from layout dimensions.

Above is pre-tap bus power. A single common output tap tau0… .1 removes Pmonitor=tau Pbus before output coupling. Output=(1−tau)Pbus etaOut. Monitor current=sum_k etaQE q lambda_k/(hc) Pmonitor,k, etaQE=.8,gain1; power mW→W explicitly. Long-time-average carrier power/current sum; beats/photodetector mixing not resolved. An aggregate monitor cannot uniquely identify every channel. Source=input rejection+network removed+monitor+output rejection+output. Network-removed power includes passive filter routing to unused ports; it is not all local heat. No component heating is inferred.

At dx1um relative to matched dx0, pair transmission factor=exp(−.5). At polar45deg, pair factor=.25. Source0 leads all output/current/OMA/opening0; normalized transfer fractions can still describe the passive response per unit input.

## Data interaction and comparison
Cross-mod matrix row k / column j=max over8 other-bit contexts |F_k(b_j=1)−F_k(b_j=0)|, F=Pout,k/Psource,k calculated as transfer independent of Source Power. Units fraction, UI percent of that carrier input; not percent of total WDM power and not receiver spectral leakage. Diagonal represents own modulation, off-diagonal data dependence. Mod-Mux off-diagonal is algebraically0 in this one-way separated-active-path fixture. Thermal/electrical/reflection coupling could break that assumption in real systems.

For each own bit, enumerate8other-bit combinations. StaticOpening=min(P|ownBit1)−max(P|ownBit0). Negative values are retained. High/Low labels denote bit labels and can reverse under detuning. This is not a time-domain eye. NominalOMA uses other bits1 and own bit toggle; it can hide other-bit dependence. Example FSR300/spacing100: CH1 andCH4 alias; Common-bus CH1 nominalOMA~.28215mW but worst opening~0. Mod-Mux CH1 also~0 due to a later passive add filter removing the aliased wavelength, while its cross-modulation remains0. No universal architecture ranking or validated BER/throughput is claimed.

## Drift and finite model probing
Drift±30GHz applies to both layers. Mismatch amplitude0…20GHz multiplies fixed pattern[-1,−1/3,+1/3,+1] for modulator, half that for mux. Mux layer offset±40GHz is separate; per-channel mod/mux tune±40GHz. No probability distribution, temperature coefficient or tuning energy.

Tune Selected Mod scans81values−40…40GHz in1GHz steps, minimizing selected own Bit0 through. Tune Selected Mux scans the same grid maximizing selected own add Drop. It uses an ideal noiseless, nonloading, channel-resolved model probe, not the aggregate output monitor, an actual tap, sensor measurement or closed-loop thermal stabilization. It does not promise the globally best static opening and reports its bounded command. Source0 holds the action. At channel3,drift15,mismatch6,muxOffset4: mod optimum−17GHz,mux−20GHz. Values outside trim range leave residual detuning.

## Saved evidence / persistence
Save Comparison freezes all physical parameters into bounded numeric snap_ fields and evaluates both architectures/all16patterns. Physical edits and scenarios preserve old values with Stale status; explicit Save replaces them. Architecture, display channel, view and display pattern do not stale the snapshot because the comparison includes both architectures/allpatterns. Current/old settings remain separate in JSON Study Report schema1, with scope flags. No fabricated timestamp or hardware provenance. Learning Backup additionally covers notes/tutor/completion. New state key sipt-textbook-v11; read-only fallback v10…v2/ch1. Previous storage keys and prior records remain unchanged.
