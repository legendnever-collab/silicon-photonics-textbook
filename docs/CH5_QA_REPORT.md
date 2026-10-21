# Chapter 5 v0.5.0 Release Candidate QA

Date: 2026-10-22 KST. Baseline main: 0b0f3ab8410d46147f310d93c0a5a9ce587f404e (merged PR4). Branch: feature/ch5-detectors. No main merge; no Chapter6.

## Delivered experience
7 Korean narrative Lessons 5.1–5.7, English technical terms, existing A–F textbook structure. Every lesson includes original worked examples, offline Tutor with 1 correct and 2 misconception-specific choices, why/simple/math/notebook explanations, prediction and reflection. 13 numbered original SVG figures: 9 Conceptual + 4 Analytical. Each includes assumptions, units, source/access boundary, see/notice/meaning/limits. Existing app architecture and Chapter1–4 prose/tutors/models/figures remain byte-identical.

Official Cambridge contents confirm source section/page mapping. Full Chapter7 text and original figures/problems/code were not accessed or reproduced. Supporting primary sources and educational rearrangement/supplement reasons are recorded in CH5_TEXTBOOK_SOURCE_MAPPING.md.

## Executed checks
| Verification | Observed result |
|---|---|
| Node Unit/Content/Physics/Parity | **99 PASS, 0 FAIL** (79 existing +20 new) |
| New detector physics groups | 7 PASS: SI limits, R/I, RC −3dB, transit scale, PIN noise variance, absorption/QE, mean APD gain/domain rejection |
| Independent numeric check | Python Decimal exact SI constants; 45-digit context; CH5_PHYSICS_VALIDATION.json |
| Chapter5 + integrated browser | **49 scenarios PASS**; Chromium153.0.8010.0; 0 page JS errors, 0 external runtime HTTP requests |
| Desktop | 1440×900 and1366×768, both Light/Dark |
| Mobile emulation | 390×844 and320×740, both Light/Dark; no physical smartphone test |
| Navigation | All29 Chapter1–5 lessons, A–F and notebook readouts in every viewport/theme |
| Tutor | All3 answers and all4 supplemental explanations per Chapter5 lesson |
| Figure | All13 render; zoom/Escape; calculated same-state readouts; 0 SVG text out-of-bounds |
| Notebook | QE0 boundary, absorption state agreement, length-only preserves specified RC/transit; M>1 suppresses PIN noise claims |
| Persistence | Reload preserves notes/read record/theme/parameters; real JSON download, valid restore, invalid backup rejection |
| v4 migration | Fresh v4 record retains Ch1/4 notes, answers, extras, predictions, completion, settings/theme; original v4 key byte-identical after Chapter5 changes |
| Original browser suites | Chapter1 15 + Figure17 + Chapter2 15 + Chapter3 15 + Chapter4 8 = **70 PASS**; 0 runtime errors |
| Existing releases | Prior tracked source/model/figure/lesson/tutor and HTML hashes match captured baseline |
| Repeated build | byte-identical v0.5.0; sha256sum verification PASS |
| Font coverage | 583 Hangul codepoints in integrated sources covered by prior embedded font +40 supplemental glyphs; no runtime font fetch |
| Visual inspection | Desktop and Mobile Light/Dark screenshots; fixed Ge title/carrier overlap and mobile long-text wrapping |

Reports: artifacts/v0.5.0/browser-results.json and regression/*.json. Original suites were run on their preserved standalone releases; final integrated v0.5.0 additionally navigates every prior lesson and checks its Notebook in all8 viewport/theme combinations. This distinction avoids claiming every historical migration test ran against the new namespace.

## Release integrity
- HTML: dist/silicon-photonics-textbook-v0.5.0.html
- SHA256: `128f4bbca0423ccb316ff88082c387447511d4330f7be95be9996fdaba7eb8e0`
- Retained v0.4.0 SHA256: `d35dccadca62d9d5f36d3afd92101bdd2fde18d4addbb1bdb4826e46b05a3fee`
- Embedded source manifest and independent recomputation: dist/ch5-build-info.json; dist/CH5_SHA256SUMS.txt. No network runtime dependency.
- New CI: .github/workflows/ch5-validation.yml, including deterministic build, all Node tests, Chapter5 matrix and original browser suites. Remote CI status is reported separately after the final checkpoint is pushed; this report records executed local results, not an unobserved remote PASS.

## Known physics and platform boundaries
Fixed η curve is not Ge spectral response. α_eff is an assumed effective guided-power absorption coefficient. Carrier distance, velocity, C and R are independent inputs. RC pole is not total Device bandwidth or Data Rate. Shot noise is unity-gain Poisson with independently specified equivalent electrical B and excludes thermal/amplifier/1/f noise. APD supports mean photo-current gain only; no excess noise, breakdown, operating bias, gain-bandwidth/SNR. Bandgap/context and fabrication/cross-section diagrams are conceptual, not PDK/process recipes. No new full-wave/FDTD/TCAD or actual Ge optical generation map, TIA/DSP/BER/receiver model.

Mobile tests are Browser emulation. Local file storage varies by Browser/path; export from old release and import into new when storage origins differ. Source/HTML work remains committed on the feature branch for user learning review. main merge requires explicit user approval.
