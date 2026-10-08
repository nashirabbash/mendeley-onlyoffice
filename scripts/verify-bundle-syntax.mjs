// Diagnostic Loop to trace ES module execution and global window.Asc.plugin.init binding
import fs from "fs";
import path from "path";

console.log("=== CHECKING BUNDLE SYNTAX AND INITIALIZATION EXPORTS ===");

const TARGET_DIR = path.join(
    process.env.HOME || "",
    ".var/app/org.onlyoffice.desktopeditors/data/onlyoffice/desktopeditors/sdkjs-plugins/{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}"
);

const modernBundle = fs.readFileSync(path.join(TARGET_DIR, "dist/bundle.modern.js"), "utf8");
const es5Bundle = fs.readFileSync(path.join(TARGET_DIR, "dist/bundle.es5.js"), "utf8");

console.log("Modern Bundle Size:", (modernBundle.length / 1024).toFixed(1), "KB");
console.log("ES5 Bundle Size:", (es5Bundle.length / 1024).toFixed(1), "KB");

// Check if Asc.plugin.init is defined inside modern bundle
const hasAscInit = modernBundle.includes("Asc.plugin.init") || es5Bundle.includes("Asc.plugin.init");
console.log("Has Asc.plugin.init string in bundles:", hasAscInit);

// Check if elements exist in index.html
const indexHtml = fs.readFileSync(path.join(TARGET_DIR, "index.html"), "utf8");
const hasGetBrowserBtn = indexHtml.includes('id="getBrowserTokenBtn"');
const hasDemoBtn = indexHtml.includes('id="demoModeBtn"');

console.log("index.html contains getBrowserTokenBtn:", hasGetBrowserBtn);
console.log("index.html contains demoModeBtn:", hasDemoBtn);

if (!hasAscInit || !hasGetBrowserBtn || !hasDemoBtn) {
    console.error("❌ FAILING: Missing essential IDs or Init definitions!");
    process.exit(1);
} else {
    console.log("✔ Static presence verified.");
}
