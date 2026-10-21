# Chapter 4 Source Mapping — Modulators (2026-10-21)
Primary reference: L. Chrostowski & M. Hochberg, *Silicon Photonics Design: From Devices to Systems* (Cambridge University Press, 2015). Official table of contents: https://assets.cambridge.org/97811070/85459/toc/9781107085459_toc.pdf
App Chapter 4 maps to original Chapter 6, "Modulators", pp. 217–258. Public contents checked; full paid chapter text and original figures were **not** read or reproduced. Concepts and examples are original. Do not claim figure- or equation-by-equation fidelity.

| Original section | Page | App lesson | Coverage and limits |
|---|---:|---|---|
| 6.1 Plasma dispersion effect | 217 | 4.1 | Free carriers and changes of phase index and absorption; sign and wavelength assumptions, no uncalibrated Soref-coefficient device fit |
| 6.1.1 Silicon carrier density dependence | 217 | 4.1 | Electron/hole distinction, illustrative Δn/Δα assumptions; advanced material extraction reserved |
| 6.2 pn-Junction phase shifter | 218 | 4.2 | Junction geometry, overlap of carrier change and optical Mode |
| 6.2.1 pn-Junction carrier distribution | 218 | 4.2 | Depletion, reverse bias; ideal abrupt 1D junction only, no TCAD claim |
| 6.2.2 Optical phase response | 221 | 4.2 | Δn_eff, Δφ, VπL, insertion-loss tradeoff |
| 6.2.3 Small-signal response | 223 | 4.2 | First-order RC response vs distributed RF/EO effects; no 200G claim |
| 6.2.4 Numerical TCAD modelling | 224 | 4.2 | Why Poisson/transport simulations are needed; qualitative workflow and deferred future validated TCAD |
| 6.3 Micro-ring modulators | 226 | 4.4 | Resonance and transfer, ring detuning, extinction and photon lifetime |
| 6.3.1 Ring tuneability | 227 | 4.4 | Small-signal resonance shift, Δλ/λ ≈ Δn_eff/n_g, declared ng |
| 6.3.2 Small-signal modulation response | 228 | 4.4 | Optical photon lifetime vs electrical RC bandwidth, simplified model limits |
| 6.3.3 Ring modulator design | 231 | 4.4 | Coupling, loss, tuning range and operating point; no foundry predictions |
| 6.4 Forward-biased PIN junction | 232 | 4.5 | Carrier injection, loss/speed difference to depletion |
| 6.4.1 Variable optical attenuator | 232 | 4.5 | ΔαL and exponential transmission; injected-carrier lifetimes deferred |
| 6.5 Active tuning | 234 | 4.6 | Separate electrical/thermal actuation |
| 6.5.1 PIN phase shifter | 235 | 4.6 | Injection phase response vs reverse PN depletion |
| 6.5.2 Thermal phase shifter | 236 | 4.6 | dn_eff/dT, Δφ, power and time constant |
| 6.6 Thermo-optic switch | 240 | 4.7 | Heater-driven MZI switching, thermal response |
| 6.7 Problems | 241 | 4.7 | Original worked exercises, no copied source questions |
| 6.8 Code listings | 242 | 4.7 / Notebook | Independent reproducible JS educational models rather than copied listings |
| References | 257 | reference appendix | Link sources and fidelity limitations |

**One deliberate educational insertion:** Lesson 4.3 joins the original 6.2 PN Phase Shifter to Chapter 2's MZI and explains voltage → effective index → phase → output power. It is explicitly supplementary, not a new original textbook section.
**Original order preserved:** 4.1 Plasma Dispersion → 4.2 PN Junction → 4.3 MZI connection → 4.4 Ring → 4.5 Forward-biased PIN/VOA → 4.6 Active Tuning → 4.7 Thermo-optic Switch/Problems.
**Deferred:** rigorous carrier-dependent Si optical constants; calibrated TCAD and optical overlap; traveling-wave electrode S-parameters; complex/dispersive ring electro-optic frequency response; electrothermal FEM, PDK corner/yield, manufacturing and 200G system. Each lesson must distinguish these from implemented approximations.
