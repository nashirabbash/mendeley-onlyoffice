# Perubahan: Mendeley Reference Plugin untuk ONLYOFFICE Desktop Editors

Tanggal: 2026-10-08

## Ringkasan Perubahan
1. **Reverse-engineering Plugin Mendeley**:
   - Mengekstrak dan memodifikasi plugin resmi Mendeley ONLYOFFICE (`asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}`).
   - Menghapus pengecekan `isLocal` dan pesan pemblokiran `This plugin doesn't work into Desktop Editors.` sehingga plugin aktif penuh di ONLYOFFICE Desktop Editors.

2. **Otentikasi Desktop Terintegrasi**:
   - Menambahkan input langsung Access Token / Bearer Token pada antarmuka login.
   - Menyediakan tombol pembuka otorisasi OAuth di browser eksternal.
   - Token disimpan secara aman pada `localStorage` dengan penanganan masa berlaku.

3. **Independensi Asset Offline & Local Bundling**:
   - Memindahkan semua dependensi runtime eksternal (`plugins.js`, `plugins.css`, `plugins-ui.js`, `mendeley-sdk`, `citeproc`) ke direktori lokal `vendor/v1/` dan `vendor/`.
   - Plugin tidak lagi bergantung pada koneksi CDN saat runtime desktop.

4. **Kompatibilitas Penuh Microsoft Word (Mendeley Cite)**:
   - Menggunakan format Content Control `MENDELEY_CITATION_v3_<base64>` dan `MENDELEY_BIBLIOGRAPHY`.
   - Mendukung CSL formatting (APA, IEEE, Harvard, Nature, Chicago, Vancouver, dll.), edit sitasi via context menu, dan unlink citations.

5. **Observability & Logging Terstruktur**:
   - Menambahkan `LoggerService` berformat JSON (`plugin/src/app/services/logger-service.js`).

6. **Packaging & Deployment**:
   - Mengompilasi bundle modern dan ES5 via Vite / Bun.
   - Menginstal plugin ke direktori Flatpak: `~/.var/app/org.onlyoffice.desktopeditors/data/onlyoffice/desktopeditors/sdkjs-plugins/{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}/`.
   - Menghasilkan file arsip siap pakai `mendeley.plugin`.
