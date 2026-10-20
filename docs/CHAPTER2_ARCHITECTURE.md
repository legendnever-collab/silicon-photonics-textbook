# Chapter 2 · D0 Architecture

Baseline: 32910d500ba66ed9ceccf48373ec796c8e28e44a. main a40bb926b5e4adab9aad09a67a11765feef979cc. PR #1 open/unmerged. No Actions workflow runs returned. Baseline npm test: 21 PASS; browser executable discovery pending. Clean checkout from verified remote branch; no prior local edits discarded.

- Stacked branch feature/ch2-passive-interference; base feature/ch1-textbook-pilot. main/PR1 remain unchanged.
- Preserve textbook/chapter-01, tutor/1.*, notebook/models.js, existing Figure catalog/renderer and dist/chapter-01.html bytes.
- Reuse src/app.js via minimal dispatch to Ch2 Notebook; extend existing Figure renderer through a registered renderer API. Same A–F text, worked examples, offline tutor and notebook containers.
- Lessons textbook/chapter-02/2.1–2.5.json, tutor/chapter-02. 2.5 contains Ring→Bragg→Circuit. No new game mechanisms.
- Build existing Chapter 1 with its established build script; separate integrated builder embeds same sources plus Ch2 modules. No external runtime dependencies.
- New storage key sipt-textbook-v2 (schema version 1 extended lesson IDs), read-only fallback migration from sipt-ch1-v1. Original key untouched. Ch1-only backups import into integrated app. Schema version and per-lesson numeric/string settings sanitized; Ch2 backup explicitly retains all lessons. Cross-Chapter navigation in existing nav shell.
- D0 HTML is preserved Ch1 baseline, D1 adds 2.1–2.2, D2 adds 2.3–2.4, D3 adds 2.5 and release validation. Each stage has commit and self-contained HTML.
- Source mapping at repository root TEXTBOOK_SOURCE_MAPPING.md is prerequisite and authoritative curriculum contract.
