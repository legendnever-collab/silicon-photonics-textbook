# Workspace checkpoint log

- U0: main/branch/PR/local recovery completed. Main 45db327 matches instructions, no prior U1 work. Original source/release hashes recorded. Additive derivative build selected; no Physics/Content edits. Next: U1-A live partition and first browser checks.
- U1-A: first standalone built locally. Desktop1366×768 and mobile320×740 probe rendered actual live plots with separate controls; screenshot review exposed oversize source SVG, so added UI-only live SVG framing (Rx/Tx/full) and minimum readable label scale. Node264/264 PASS. Browser CDN download unavailable in this environment; npm-packaged Chromium provides local headless validation. Source checkpoint excludes large generated HTML until final artifact, avoiding repeated transfer.
