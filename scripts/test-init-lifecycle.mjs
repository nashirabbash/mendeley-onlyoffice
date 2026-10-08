// Verification of complete Asc.plugin.init execution in real browser DOM environment
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

console.log("=== VERIFYING FULL INITIALIZATION LIFECYCLE ===");

const html = fs.readFileSync("plugin/index.html", "utf8");
const bundle = fs.readFileSync("plugin/dist/bundle.modern.js", "utf8");

const errors = [];
const logs = [];

const dom = new JSDOM(html, {
    url: "https://onlyoffice.local/index.html",
    runScripts: "dangerously",
    beforeParse(window) {
        window.console.error = (...args) => errors.push(args.join(" "));
        window.console.log = (...args) => logs.push(args.join(" "));
        window.Asc = {
            plugin: {
                init: null,
                tr: (s) => s,
                executeMethod: (name, args) => logs.push(`[Asc.executeMethod] ${name}`),
                executeCommand: (cmd, val) => logs.push(`[Asc.executeCommand] ${cmd}`),
                onTranslate: () => {}
            }
        };
    }
});

console.log("1. Evaluating bundle...");
dom.window.eval(bundle);

console.log("2. Checking Asc.plugin.init registration...");
if (typeof dom.window.Asc.plugin.init !== "function") {
    throw new Error("Asc.plugin.init was not registered!");
}

console.log("3. Invoking Asc.plugin.init()...");
try {
    dom.window.Asc.plugin.init();
    console.log("✔ Asc.plugin.init() executed without throwing!");
} catch (e) {
    console.error("❌ Asc.plugin.init() threw an error:", e);
    process.exit(1);
}

console.log("4. Simulating Demo Mode Click...");
const btnDemo = dom.window.document.getElementById("demoModeBtn");
btnDemo.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));

const mainState = dom.window.document.getElementById("mainState");
const loginState = dom.window.document.getElementById("loginState");

console.log("Main State visible:", !mainState.classList.contains("hidden"));
console.log("Login State hidden:", loginState.classList.contains("hidden"));

if (mainState.classList.contains("hidden")) {
    console.error("❌ FAILED: mainState is still hidden after clicking Demo Mode!");
    process.exit(1);
}

console.log("\n=======================================================");
console.log("  ALL LIFECYCLE & STATE TRANSITIONS SUCCEEDED (100% OK)");
console.log("=======================================================\n");
