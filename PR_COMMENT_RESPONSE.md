### Resolution for Code Review Feedback (PR #1)

All items from the code review report have been addressed and pushed to `feat/mendeley-desktop-plugin`:

1. **Spec Requirement — Offline Demonstration Library Mode (Story 14)**:
   - Added `DEMO_DOCUMENTS` and `DEMO_GROUPS` fixture in `plugin/src/app/shared/constants/demo-data.js` containing benchmark citations (Clean Code, Design Patterns, Deep Learning, Attention Is All You Need).
   - Added `"Try Offline Demo Mode"` button in `login.js` and `index.html`.
   - Updated `Sdk` in `plugin/src/app/sdk/sdk.js` to seamlessly serve search queries and folder lookups from the demo dataset when activated without network credentials.

2. **Test Portability (`scripts/verify-plugin.js`)**:
   - Replaced hardcoded absolute path with portable path resolution: prefers local `./plugin` directory and falls back to user Flatpak environment dynamically (`process.env.HOME`).
   - Added automated verification for demo dataset integrity.

3. **Structured Observability & Standards**:
   - `LoggerService` (`plugin/src/app/services/logger-service.js`) outputs structured JSON logs for all lifecycle, auth, and citation events.
   - Built fresh distribution bundles (`dist/bundle.modern.js`, `dist/bundle.es5.js`, `dist/styles.css`).
   - Synchronized installed Flatpak plugin and updated `mendeley.plugin` distribution package.

**Verification Results:**
```text
=== RUNNING MENDELEY PLUGIN INTEGRITY TESTS ===
✔ [CHECK 1] config.json GUID is correct: asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}
✔ [CHECK 2] All local vendor libraries are bundled and present (offline-safe)
✔ [CHECK 3] bundle.modern.js is built without desktop lockout
✔ [CHECK 4] MS Word Mendeley Cite tag generated: MENDELEY_CITATION_v3_eyJjaXRhdGlvbklEIjoiQ0lU...
✔ [CHECK 5] Offline demo dataset contains 4 references and 2 folders

ALL 5 INTEGRATION CHECKS PASSED SUCCESSFULLY!
```
