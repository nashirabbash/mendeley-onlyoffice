### Resolution for Package Archive Integrity (Commit `d2244b0`)

1. **Repacked `mendeley.plugin`**:
   - Re-archived the distribution bundle containing all configuration files, HTML entrypoints, compiled bundles (`dist/`), localized runtime vendors (`vendor/`), locale/style definitions (`resources/`), and translations (`translations/`).
   - Archive size restored to **1.97 MB (2,064,132 bytes)**.

2. **Automated Archive Assertion Added (`scripts/verify-plugin.js`)**:
   - Added `[CHECK 6]` to programmatically assert that `mendeley.plugin` exists and exceeds minimum complete package size threshold (≥ 1 MB), preventing future truncated commits.

**Execution Verification:**
```text
=== RUNNING MENDELEY PLUGIN INTEGRITY TESTS ===
Plugin test target: /home/myarchlinux/.var/app/org.onlyoffice.desktopeditors/data/onlyoffice/desktopeditors/sdkjs-plugins/{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}
✔ [CHECK 1] config.json GUID is correct: asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}
✔ [CHECK 2] All local vendor libraries are bundled and present (offline-safe)
✔ [CHECK 3] bundle.modern.js is built without desktop lockout
✔ [CHECK 4] MS Word Mendeley Cite tag generated: MENDELEY_CITATION_v3_eyJjaXRhdGlvbklEIjoiQ0lU...
✔ [CHECK 5] Offline demo dataset contains 4 references and 2 folders
✔ [CHECK 6] mendeley.plugin release archive intact: 1.97 MB

ALL 6 INTEGRATION CHECKS PASSED SUCCESSFULLY!
```
