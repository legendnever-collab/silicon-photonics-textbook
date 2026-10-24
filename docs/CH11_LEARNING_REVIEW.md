# Chapter 11 learning review

Open dist/silicon-photonics-textbook-v0.11.0.html offline. Select Chapter11. Existing65lessons remain; total72lessons.

1.11.1 WDM Grid:100GHz spacing gives exact λ1551.2030/1550.4008/1549.5994/1548.7988nm. Frequency increases as wavelength decreases. Source1mW/carrier means4mW total;4×25Gb/s is an arithmetic example, not validated bandwidth.
2.11.2 Ring Spectrum: a=t=.98, Bit0 on resonance gives ideal0;15GHz resonance shift atFSR800 gives normalizedThrough.894628963. Drive0 gives no modulation. FSR300 and spacing100 cause CH1/CH4 repeated-resonance alias.
3.11.3 Common-bus: choose FSR Alias. CH1 allbits1 is bright(~.28215mW); toggle b4 to0 and CH1 falls~0. RowCH1/columnMod4 is off-diagonal data dependence. Nominal OMA can conceal near-zero worst static opening.
4.11.4 Mod-Mux: same Alias scenario; off-diagonal0 yet CH1~0 because a later passive add filter strips it. CH4 stays bright. FilterOffset25 affects Mod-Mux power while Common-bus has no mux layer. Explain why zero cross-mod is not zero penalty.
5.11.5 Drift/Mismatch: selectCH3 and MuxOffset4. Tune Selected Mod finds−17GHz, Mux−20GHz over81noiseless samples. SourceOff holds tuning. Drift−20 can give a negative static opening; values are retained rather than clamped.
6.11.6 Budget: Tap0→10% reduces output to.9of its previous value and increases monitor current. Polar45deg gives.25pair factor; dx1um gives exp(−.5). Follow each stage/reference plane; removed routing power is not all heat. Aggregate monitor is not channel-resolved identification.
7.11.7 Save Comparison→physical edit→Stale→scenario edit→old snapshot unchanged→Save→JSON Report. Architecture/view/channel/pattern edits inspect the same exhaustive comparison and do not stale it. Compare current/frozen tables and scope. Learning Backup restores notes/tutor/completion/snapshots separately.

Check Desktop/Mobile zoom, numeric Properties footer, Light/Dark and Save/Resume. This is static synthetic learning, not measured hardware/BER/thermal qualification. Learning usefulness and completeness still require user review. No main merge or next chapter without explicit instruction.
