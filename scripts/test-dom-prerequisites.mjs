// Fast test for SettingsPage DOM requirements
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

const html = fs.readFileSync("plugin/index.html", "utf8");
const dom = new JSDOM(html);
const doc = dom.window.document;

const requiredElements = [
    "saveSettingsBtn",
    "cancelBtn",
    "styleSelectList",
    "styleSelectedListOther",
    "notesStyle",
    "footNotes",
    "endNotes",
    "cslFileInput",
    "styleLangList",
    "searchField",
    "insertLinkBtn",
    "cancelSelectBtn",
    "moreMenuBtn",
    "moreDropdown",
    "libraryGroupSelect"
];

const missing = [];
for (const id of requiredElements) {
    if (!doc.getElementById(id)) {
        missing.push(id);
    }
}

console.log("Missing DOM elements in plugin/index.html:", missing);
if (missing.length > 0) {
    console.error("❌ FAILED: SettingsPage or index.js will throw fatal error!");
    process.exit(1);
} else {
    console.log("✔ PASSED: All essential DOM elements present.");
}
