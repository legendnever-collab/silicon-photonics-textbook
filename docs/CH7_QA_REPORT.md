# Chapter 7 QA Report

2026-10-22 KST. Draft PR7. Baseline main31324f6355a33f2ae8333ab0073627d2776e93aa. Chapter1–6 preserved; Chapter8 not started.

Local gates observed:
- Baseline118Node tests PASS after exact recovery of prior releases.
- Current140Node tests PASS: prior118plus CH7 physics/content/manifest/migration sanitizer and234file preservation check.
- Independent Python110comparisons PASS, max error3.552713678800501e−15 at tolerance2e−12: numpySVD,coherent path sum,500termringrecurrence,cutbackLS,exactSIreadout.
- Repeated deterministic build and independent source/HTML hash verified. Final SHA in dist/CH7_SHA256SUMS.txt and ch7-build-info.json.
- Embedded font audit351required Hangul,0missing using unchanged existing fonts; docs/CH7_FONT_AUDIT.json.

Remote status: D0–D3 published as four commits, HEAD6bc2ea91d1b8baa2d7eac70c10a63978350caec3. First CI39771297263 observed Node/independent/build/SHA PASS; Browser dependencies and browser gates still pending at this report revision. Local Chromium download was truncated/blocked; no local browser success claimed. Later D4 code/doc revisions require their own final-head CI before completion.

Authored browser matrix:67new/integrated scenarios across1440×900,1366×768,390×844,320×740 inLight/Dark; all43lessons/notebooks,all7newlessonTutorchoices/explanations/predictions,continuoussliderDOM/focus/scroll,threecoreinteractions/guidedreadout,Figureparity/zoom/Escape,actualJSONdownload/restore,malformed/futurebackuprejection,andread-onlyv6/v5/v4migration. Existing independent Chapter1–6 suites remain unchanged. SVG bounds/network/runtime checks and screenshots are produced by CI. Screenshot generation alone is not visual approval; actual inspection remains pending until returned evidence is reviewed.

Known model limits: singlecoherentTEmode,staticopticalresponse,idealmatching/independentphase-loss,localdispersion;syntheticfitandcutback;noFDTD/fulltextreproduction/PDKcalibration/EOdynamics/BER/broadbandcausality. Mobile is emulation,not physical phone. Source electrical power/heat and detectordark/noise excluded. All original sections mapped including FDTD/extraction/passivity as appropriately bounded teaching substitutes.

User play review remains pending. Keep Draft; do not merge main before explicit approval.
