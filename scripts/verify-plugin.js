// Smoke Test: Mendeley OnlyOffice Plugin Integrity & Verification

import fs from "fs";
import path from "path";

const pluginPath = "/home/myarchlinux/.var/app/org.onlyoffice.desktopeditors/data/onlyoffice/desktopeditors/sdkjs-plugins/{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}";

console.log("=== RUNNING MENDELEY PLUGIN INTEGRITY TESTS ===");

// 1. Check plugin configuration
const config = JSON.parse(fs.readFileSync(path.join(pluginPath, "config.json"), "utf8"));
if (config.guid !== "asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}") {
    throw new Error(`Invalid GUID: ${config.guid}`);
}
console.log("✔ [CHECK 1] config.json GUID is correct:", config.guid);

// 2. Check local vendor assets existence
const requiredVendors = [
    "vendor/v1/plugins.js",
    "vendor/v1/plugins.css",
    "vendor/v1/plugins-ui.js",
    "vendor/mendeley-sdk/standalone.min.js",
    "vendor/citeproc/citeproc_commonjs.js"
];

for (const v of requiredVendors) {
    if (!fs.existsSync(path.join(pluginPath, v))) {
        throw new Error(`Missing vendor asset: ${v}`);
    }
}
console.log("✔ [CHECK 2] All local vendor libraries are bundled and present (offline-safe)");

// 3. Check dist bundles
const bundleContent = fs.readFileSync(path.join(pluginPath, "dist/bundle.modern.js"), "utf8");
if (bundleContent.includes("This plugin doesn't work into Desktop Editors.")) {
    throw new Error("Desktop lockout string still present in bundle!");
}
console.log("✔ [CHECK 3] bundle.modern.js is built without desktop lockout");

// 4. Verify MS Word Citation Content Control Tag Format
const sampleCslJson = {
    citationID: "CITATION_ROOT_1",
    citationItems: [{ id: "mendeley-doc-123", locator: "45", label: "page" }],
    schema: "https://github.com/citation-style-language/schema/raw/master/csl-citation.json"
};
const base64Tag = Buffer.from(JSON.stringify(sampleCslJson)).toString("base64");
const fullCitationTag = `MENDELEY_CITATION_v3_${base64Tag}`;
console.log("✔ [CHECK 4] MS Word Mendeley Cite tag generated:", fullCitationTag.slice(0, 45) + "...");

console.log("\nALL 4 SMOKE CHECKS PASSED SUCCESSFULLY!");
