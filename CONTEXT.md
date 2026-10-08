# Context: Mendeley Reference Plugin for ONLYOFFICE Desktop

This document defines the ubiquitous language and domain model for the Mendeley Reference integration within ONLYOFFICE Desktop Editors.

## Glossary

### Authentication & Sessions
- **Loopback Auth Receiver**: A lightweight transient local HTTP listener (e.g. `http://localhost:PORT/callback`) executed by the desktop environment to capture OAuth redirection tokens from the system browser automatically without manual user clipboard interaction.
- **In-App Modal Window**: A modal dialog spawned inside the ONLYOFFICE Chromium CEF container (`ShowWindow`) to execute OAuth web flows without escaping to external system browsers.
- **Bearer Token**: A temporary credential string issued by Mendeley OAuth used to authenticate all subsequent Mendeley Cloud API calls (`Authorization: Bearer <TOKEN>`).
- **Mendeley Library**: The collection of reference documents, metadata, authors, and user folders stored in Mendeley Cloud.

### Document & Formatting
- **Citation Control**: A structured document Content Control containing CSL-JSON metadata and tagged with `MENDELEY_CITATION_v3_<base64>`.
- **Bibliography Control**: A document Content Control tagged with `MENDELEY_BIBLIOGRAPHY` that dynamically compiles all cited references in the document.
- **CSL Engine**: The Citation Style Language formatting engine (`citeproc-js`) used to render bibliography and in-text citation strings.
