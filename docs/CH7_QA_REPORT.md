# Chapter 7 QA Report — v0.7.0 Review Candidate

2026-10-22 KST. Draft PR7. Validated runtime commit `eb14c1b365b0fa5e8843cb1e6516c78adbfdb0e8`. Baseline main `31324f6355a33f2ae8333ab0073627d2776e93aa`. Subsequent release-seal edits are documentation only; source and HTML hashes below remain unchanged. Latest branch-head CI is linked from PR7.

## Observed remote validation

Full workflow PASS: https://github.com/legendnever-collab/silicon-photonics-textbook/actions/runs/39773408698

| Gate | Observed result |
|---|---|
| Node unit/content/physics/manifest/preservation | 140 PASS, 0 FAIL |
| Independent Python/numpy comparison | 110 comparisons PASS; max error3.552713678800501e−15, tolerance2e−12 |
| New Chapter7/integrated Chromium scenarios | 67 PASS; 0 runtime/console errors, 0 external requests, 0 SVG text-bound violations |
| Retained Chapter1–6 independent browser suites | 177 scenarios PASS on archived HTML |
| Deterministic build / SHA / prior release | Repeated bytes identical; CH7 and retained CH6 SHA checks PASS |
| Review artifact upload | PASS; HTML,manifest,SHA,docs and screenshots uploaded by workflow |

Historical breakdown: Chapter1/browser+figure32; Chapter2 15; Chapter3 15; Chapter4 8; Chapter5 49; Chapter6 58 =177. New67 plus historical177 =244 browser scenarios. The new v0.7.0 suite also navigates all43lessons and their notebooks in every viewport/theme. Historical independent results are not represented as all old assertions rerun against v0.7.0.

## Browser and visual scope

Chromium on Linux;1440×900,1366×768,390×844,320×740,each Light/Dark. Mobile is viewport emulation,not a physical smartphone. Actual final-run8MZIscreenshots plus320darkguidedzoom were inspected. Circuit paths are continuous and contrasted in both themes; narrow port lists wrap without document overflow; spectrum caption fits the SVG. Small-screen diagrams provide direct notebook/figure zoom and horizontal pan in the magnified dialog. No screenshot-only claim: controls,axes/text bounds,focus/scroll/DOM stability and numerical parity are independently asserted.

All7newlessons,11classifiedfigures,allTutorchoices/explanations/predictions,MZI/fit/ring/measurement/guidedinteractions,zero power/undefined phase,notebookzoom/Escape/focusreturn,continuouskeyboardslider,actualJSONdownload/restore,malformed/futurebackuprejection,andread-onlyv6/v5/v4migration PASS. Previous keys/notes/settings remain preserved.

A navigation-test race was corrected by awaiting two animation frames before focus assertions in CH6/CH7 go() helpers. No assertion was removed. Archived source/model/HTML bytes were not changed. Scoped320px wrapping and a long SVG caption were fixed in source,then rebuilt and rerun. Details in CH7_CHECKPOINT_LOG.md.

## Integrity

HTML: `dist/silicon-photonics-textbook-v0.7.0.html`.
SHA256: `ae7f102a2ae514d02dc4b39584334df3adac63c4fc9a8c6dc417f982d2050803`.
Source hash: `598e63463af24ef62723c591f5a3958b8bd2f04e5e2a8a7efb51d293d169a645`.
Checkpoint: `checkpoints/ch7/D4-circuit-review.html`,same HTML SHA.
233priorfiles byte-preserved; explicit documentary/package/test-helper changes excluded from that preservation manifest. Prior Chapter1–6 lessons,tutors,models,figures,fonts and standalone releases remain unchanged. Hangul audit351required,0missing with retained embedded fonts.

## Physics and learning limits

Single coherent TE mode; static optical response; ideal matched couplers; independent phase/loss and source power; local spectral dispersion. Ring/GC/detector reuse prior validated functions. Fit and cutback are synthetic analytical data. Full textbook body/equations/figures/listings were not accessed or reproduced. No FDTD,measured/PDK calibration,PN voltage-to-index prediction,EO dynamics,BER,broadband causality or fabricated performance claim. Source electrical/thermal model and detectordark/noise are outside this circuit ledger.

No outstanding runtime defect observed within the tested domains. User learning effectiveness/play review remains pending. Keep Draft; no main merge before explicit user approval. Chapter8 not started.
