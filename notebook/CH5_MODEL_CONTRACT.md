# Chapter 5 physics model contract — D0

All inputs are independent educational assumptions, not PDK, fabricated or measured performance. Deterministic, finite-domain functions reject invalid values.

## Reference planes and units
λ[nm]→m ×1e−9; P[µW]→W ×1e−6; C[fF]→F ×1e−15; B[GHz]→Hz ×1e9; W[µm]→m ×1e−6; α[cm⁻¹] L[µm]→ α L ×1e−4 dimensionless.
h=6.62607015e−34 J s, c=299792458 m/s, q=1.602176634e−19 C (exact SI).
Photon energy E=hc/λ [J], E/q [eV]; incident photon flux Φ=P/E [s⁻¹].
Unity gain R=η q λ/(hc) [A/W], η in [0,1], η=0→R=0, η=1→unity-gain limit; linear λ for a fixed assumed η, NOT a material spectrum. Primary current magnitude Iprimary=R P [A]; dark current magnitude is separate, no signed diode-I convention implied. No saturation model.
5.1 uses η_ext relative to optical power at the waveguide entrance before an explicitly defined detector coupling region; already includes coupling, absorption, collection. Internal QE here means collected pairs per absorbed photon and includes collection/recombination; not silently interchangeable with external QE. 5.5–5.7 factorized mode instead derives η_ext=η_coupling η_abs η_collection exactly once, with absorption defined relative to power in the modeled absorbing guided section. No double counting between independent η_ext and factorized mode.

## Time response
τ_RC=R_eq Ctotal [s]; f_RC=1/(2π τ_RC) [Hz]; |H(f)|=1/sqrt(1+(f/f_RC)^2) for a first-order lumped RC. At f_RC amplitude=1/sqrt(2), power=1/2, −3.0103 dB. R_eq>0 explicit small-signal equivalent, Ctotal>0 junction+parasitic+load. Transit scale τtr=W/v_drift only, W≥0 and v>0 assumed constant. No numerical transit bandwidth and no RC/transit bandwidth combination; RC bandwidth is not a data rate.

## Noise
PIN/unity-gain only: i_rms=sqrt(2q(Iprimary+Idark)B) [A], B independent equivalent electrical noise bandwidth [Hz], not automatically f_RC. Also show dark-only sqrt(2q Idark B); contributions add in variance. Uncorrelated Poisson, one-sided PSD and ideal current measurement; excludes thermal, amplifier, 1/f, correlated avalanche noise, filtering beyond provided equivalent B. Dark-current DC offset is not its rms noise. No full receiver SNR/BER.

## Absorption and geometry
ηabs=−expm1(−α_eff L ×1e−4) in [0,1]; P(z)/P(0)=exp(−α_eff z ×1e−4). α is an assumed effective modal POWER absorption coefficient, not bulk Ge k, field amplitude attenuation or a calibrated spectrum. Zero α or L→zero absorption; monotonic and saturating. Optical propagation length is independent of carrier transit distance. Capacitance and transit distance are independent measured/assumed inputs; no fabricated length→bandwidth law is invented.

## APD
M≥1, multiplied mean photo current=M Iprimary. Do not multiply dark current without distinguishing bulk/surface mechanisms. No quantitative APD noise/excess factor, bias, breakdown, gain-bandwidth product or SNR calculation. PIN shot-noise formula is not used at M>1.

## Conceptual figures
Cross sections and collection paths are not to scale, not full-wave fields. Material energy comparison uses 300K approximate Si indirect gap 1.12eV, Ge indirect ~0.66eV and direct ~0.80eV for context only; cannot infer absorption spectrum or device efficiency from gaps. No fabricated optical generation map, no new EM/FDTD/TCAD solver.

## Verification
Independent numeric examples, SI conversions, zero limits, wavelength/QE scaling, RC −3dB, shot variances, Beer–Lambert endpoints, APD M=1/current scaling, invalid-domain rejection and Figure/Notebook shared-state agreement. Reproducible build sources + SHA256 and v4 read-only migration checked separately.
