# Execution Plan: Custom Mendeley UI Layout & In-App Authentication

## Context
User provided wireframe mockups for the Mendeley Reference ONLYOFFICE plugin:
1. **Header Toolbar**:
   - Left: Reference / Group Reference collection dropdown selector.
   - Right: "More" dropdown button containing:
     - "Insert bibliography"
     - "Refresh reference"
     - "Logout / Account"
2. **Search Bar**:
   - Filter references by author, title, year.
3. **Reference List Item**:
   - Checkbox for multi-select.
   - Reference title/author/year metadata display.
   - Per-item inline quick action: "insert citation [arrow down]" with popup choices:
     - `author (year)` (narrative in-text citation, e.g. "Martin (2008)")
     - `author year` (e.g. "Martin 2008")
     - `(author year)` (parenthetical citation, e.g. "(Martin, 2008)")
4. **Bottom Dock Bar**:
   - Selected citation chips: `[ Name year + X button ]` with remove pill.
   - Dual action buttons: `[ Insert citation ]` (primary) and `[ Cancel ]` (clears selection).
5. **In-App Authentication (Decision 1A)**:
   - Login opens directly via in-app modal / internal frame. Token auto-captured upon redirect, modal closes itself, and reference list populates with skeleton loading.

## Approach & File Changes
- `plugin/index.html`: Restructure sidebar DOM to match the 4-part wireframe layout exactly.
- `plugin/src/app/shared/ui/`: Implement the per-item format dropdown, bottom chip tray, and top "More" menu.
- `plugin/src/styles.css`: Add styles for wireframe elements (chips, format dropdowns, clean border radius, shadow cards).
- `plugin/src/app/pages/login.js`: Wire in-app modal launcher with automatic callback listener.
- `plugin/src/app/services/citation-service.js`: Implement narrative `author (year)` vs parenthetical `(author year)` formatting transforms.

## Verification
- Bundle build with `bun run build:all`.
- Validate layout elements with DOM tests.
- Deploy to Flatpak ONLYOFFICE and verify visual parity with Image #1, #2, #3.
