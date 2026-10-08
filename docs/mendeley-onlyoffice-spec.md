# SPEC-1: Mendeley Reference Plugin for ONLYOFFICE Desktop Editors

## Problem Statement

ONLYOFFICE Desktop Editors users currently lack native Mendeley Reference Manager integration. In Microsoft Word, researchers and academic writers rely heavily on Mendeley Cite to search their personal reference libraries, insert in-text citations, edit citation locators (page, chapter, suffix/prefix), and generate bibliographies formatted according to CSL standards (such as APA, IEEE, Nature, Harvard). In ONLYOFFICE Desktop Editors, the official plugin was disabled via an environment check and broken OAuth redirects, preventing desktop users from accessing Mendeley citations and forcing manual reference formatting or cross-editor migrations.

## Solution

A fully functional, reverse-engineered Mendeley Reference Manager plugin for ONLYOFFICE Desktop Editors. The plugin integrates directly into the ONLYOFFICE ribbon toolbar and sidebar. It supports seamless user authentication (direct access token entry and browser authorization flow), queries Mendeley Cloud APIs, formats citations via CSL/citeproc engine, writes Microsoft Word-compatible content controls (`MENDELEY_CITATION_v3_...` and `MENDELEY_BIBLIOGRAPHY`), supports citation editing through context menu dialogs, and manages bibliography generation and style switching.

## User Stories

1. As a researcher, I want to open the Mendeley plugin directly from the ONLYOFFICE ribbon toolbar, so that I can access my citation library without leaving my document editor.
2. As an academic author, I want to connect my Mendeley account using an OAuth Bearer token, so that the plugin can securely fetch references from my personal Mendeley library.
3. As a user, I want the plugin to operate reliably on ONLYOFFICE Desktop Editors without triggering desktop environment lockouts or blank screens.
4. As a researcher, I want to search my Mendeley library by author name, title keywords, or publication year, so that I can quickly find relevant citations.
5. As a writer, I want to filter references by folders or collections, so that I can organize citations by manuscript or project.
6. As a student, I want to select multiple references simultaneously, so that I can insert grouped citations into my paragraph.
7. As an academic author, I want inserted citations to be formatted as structured content controls compatible with MS Word Mendeley Cite, so that co-authors using Microsoft Word can edit the same references seamlessly.
8. As a researcher, I want to select from standard CSL citation styles (e.g., APA 7th, IEEE, Chicago, Nature, Vancouver, Harvard), so that my citations adhere to journal submission guidelines.
9. As an author, I want to upload custom CSL style files, so that I can satisfy specialized publisher citation requirements.
10. As a writer, I want to click "Insert Bibliography", so that an automatic bibliography section is inserted at my cursor position reflecting all cited sources.
11. As an editor, I want to right-click on any existing citation and choose "Edit Citation", so that I can add page locators, prefixes, suffixes, or omit the author's name.
12. As a researcher, I want to change the document citation style and refresh, so that all citations and the bibliography in the document update automatically.
13. As a student, I want an "Unlink Citations" option, so that I can convert all citation fields to plain static text before final submission or sharing.
14. As an offline user or test user, I want a fallback demonstration library mode, so that I can verify citation rendering even when internet connectivity is intermittent.
15. As a developer/maintainer, I want all plugin state transitions and API events logged in structured JSON format, so that errors and diagnostics are easily observable.

## Implementation Decisions

### Modular Architecture
- State management and business logic are separated into focused modules (Authentication, Search/Library, Citation Engine, Document API Adapter, UI Components, and Structured Logger).
- The state management layer handles active library references, selected items, current CSL style, authorization token state, and document content control metadata.

### Desktop-First Authentication Strategy
- The plugin provides a direct token entry field alongside a helper button that launches Mendeley OAuth in the default system browser.
- Tokens and expiration timestamps are persisted in local storage with automatic validity checking before API dispatches.

### Word-Compatible Citation Standard
- In-text citations are wrapped in document content controls with tag format `MENDELEY_CITATION_v3_<base64_csl_payload>`, matching the serialization format of modern Microsoft Word Mendeley Cite.
- Bibliographies are identified by the standard `MENDELEY_BIBLIOGRAPHY` control tag.
- Legacy Mendeley Desktop document fields (`ADDIN CSL_CITATION`) are detected and upgraded to the modern content control format upon user confirmation.

### Local Dependency Bundling
- Core runtime scripts (`citeproc`, `mendeley-sdk`, `plugins-ui`) and stylesheets are bundled locally within the plugin package, eliminating external CDN requirements and guaranteeing offline desktop execution.

### Structured JSON Observability
- All events (authentication, query dispatch, citation insertion, CSL compilation, error handling) emit structured JSON logs to facilitate diagnosis.

## Testing Decisions

### Seams for Testing
Testing will occur at the **Document API & Citation Formatter Integration Seam**:
1. **Citation Serialization & Formatting Seam**: Validate that input reference metadata processed through the CSL formatter produces exact CSL-JSON objects and matching rendered strings for both author-date (APA) and numeric (IEEE) styles.
2. **Document Content Control Seam**: Validate that `Api.GetDocument()` interactions create, read, update, and delete `MENDELEY_CITATION_v3_...` and `MENDELEY_BIBLIOGRAPHY` content controls without corrupting adjacent document text.
3. **Authentication & Token Storage Seam**: Validate token parsing, expiration checking, and header generation for Mendeley API calls.

## Out of Scope
- Direct local SQLite database reading from deprecated legacy Mendeley Desktop desktop binaries (the plugin targets Mendeley Cloud API and Mendeley Reference Manager standard).
- Two-way real-time multi-user collaborative simultaneous citation locking (handled natively by ONLYOFFICE Document Server when deployed on server).

## Further Notes
- The plugin is packaged as a `.plugin` ZIP archive and directory compatible with ONLYOFFICE Desktop Editors Flatpak and native installations.
