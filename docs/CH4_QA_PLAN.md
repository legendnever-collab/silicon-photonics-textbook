# Chapter 4 v0.4.0 · release verification policy
Source baseline: Chapter 3 merged main accb134a59e1cc7f40bbfa9c6a6fcd0068267023.
Chapter 4 is a **draft educational release**. No actual user learning review, full vector field solver, TCAD, PDK calibration, manufactured sample, traveling-wave RF or electrothermal FEM. Bulk empirical coefficients assume 1550nm and are not a complete fabricated PN device model.
Current checkpoint contains 7 A–F lessons, 14 Figure metadata entries, new analytical models and a new offline build script. Existing Chapter 1–3 standalone HTML files must stay byte-identical.

Automated test commands:
- `npm test`: all content, model, regression, figure checks.
- `npm run build`: generates dist/silicon-photonics-textbook-v0.4.0.html and SHA manifest.
- `npm run test:ch4:browser`: optional Playwright with an installed Chromium.
- CI workflow runs reproducible Node tests/build; browser is a separate validation and must never be claimed PASS without execution.
Font: v0.4 builder initially reuses v0.3 Korean subset. Incomplete glyph coverage should be checked before release; system font fallback may apply.
User review: First study 4.1/4.2, then 4.3, and finally 4.4–4.7. Check didactic reading quality, correct assumptions and degree of interaction. Merge is prohibited until explicit approval.
