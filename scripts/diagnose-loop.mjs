// Diagnostic Feedback Loop: Native ONLYOFFICE Event Flow & JS Runtime Execution
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

console.log("=== PHASE 1: FEEDBACK LOOP EXECUTION ===");

const TARGET_DIR = path.join(
    process.env.HOME || "",
    ".var/app/org.onlyoffice.desktopeditors/data/onlyoffice/desktopeditors/sdkjs-plugins/{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}"
);

const html = fs.readFileSync(path.join(TARGET_DIR, "index.html"), "utf8");
const bundle = fs.readFileSync(path.join(TARGET_DIR, "dist/bundle.modern.js"), "utf8");

const errors = [];
const logs = [];

const dom = new JSDOM(html, {
    url: "file://" + path.join(TARGET_DIR, "index.html"),
    runScripts: "dangerously",
    beforeParse(window) {
        window.console.error = (...args) => errors.push(args.join(" "));
        window.console.log = (...args) => logs.push(args.join(" "));
        window.Asc = {
            plugin: {
                init: null,
                executeMethod: (name, args) => logs.push(`[Asc.executeMethod] ${name}`),
                executeCommand: (cmd, val) => logs.push(`[Asc.executeCommand] ${cmd}`),
                onTranslate: () => {}
            }
        };
    }
});

console.log("Simulating script injection...");
try {
    dom.window.eval(bundle);
} catch (e) {
    errors.push("Bundle eval failed: " + e.message);
}

// Check if Asc.plugin.init was defined
if (typeof dom.window.Asc.plugin.init === "function") {
    console.log("✔ window.Asc.plugin.init registered properly.");
    try {
        dom.window.Asc.plugin.init();
    } catch (e) {
        errors.push("Asc.plugin.init() thrown error: " + e.message + "\n" + e.stack);
    }
} else {
    errors.push("❌ window.Asc.plugin.init was NOT registered by bundle!");
}

console.log("\nCaptured Errors (count:", errors.length, "):");
errors.forEach(err => console.log("  🔴", err));

console.log("\nCaptured Logs:");
logs.forEach(l => console.log("  ℹ", l));

// Test clicking buttons
const btnSignIn = dom.window.document.getElementById("getBrowserTokenBtn");
const btnDemo = dom.window.document.getElementById("demoModeBtn");

console.log("\nTesting DOM button event handlers:");
console.log("  btnSignIn.onclick:", typeof btnSignIn?.onclick);
console.log("  btnDemo.onclick:", typeof btnDemo?.onclick);

if (errors.length > 0) {
    console.log("\n❌ REPRODUCED FAILURE MODE (RED)");
    process.exit(1);
} else {
    console.log("\n✔ FEEDBACK LOOP EXECUTED (GREEN)");
}
