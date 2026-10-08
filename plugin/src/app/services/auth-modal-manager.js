/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation.
 */

// @ts-check

const REGISTERED_APP_ID = "26014";
const REGISTERED_REDIRECT_URI = "https://onlyoffice.github.io/sdkjs-plugins/content/mendeley/oauth.html";

class AuthModalManager {
    static openModalAuth(onSuccess, onError) {
        const stateHash = Date.now().toString();
        const authUrl = `https://api.mendeley.com/oauth/authorize?client_id=${REGISTERED_APP_ID}&redirect_uri=${encodeURIComponent(REGISTERED_REDIRECT_URI)}&response_type=token&scope=all&state=${stateHash}`;

        // Global callback attached to window for internal/popup message reception
        // @ts-ignore
        window.OAuthCallback = function (token, state) {
            if (token) {
                localStorage.setItem("mendToken", token);
                localStorage.setItem("mendTokenExpiresAt", String(Date.now() + (30 * 24 * 60 * 60 * 1000)));
                if (typeof onSuccess === "function") onSuccess(token);
            }
        };

        // Try ONLYOFFICE executeMethod OpenUrl first
        try {
            if (window.Asc && window.Asc.plugin && typeof window.Asc.plugin.executeMethod === "function") {
                window.Asc.plugin.executeMethod("OpenUrl", [authUrl]);
            }
        } catch (e) {
            console.warn("Asc.plugin.executeMethod OpenUrl failed:", e);
        }

        // Try direct window.open
        try {
            window.open(authUrl, "_blank");
        } catch (e) {
            console.warn("window.open failed:", e);
        }

        // Fallback: create dynamic anchor link with target="_blank" and click it
        try {
            const a = document.createElement("a");
            a.href = authUrl;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            console.warn("anchor click failed:", e);
        }

        // Active storage watcher for token from OAuth redirect page
        let checksCount = 0;
        const timer = setInterval(() => {
            checksCount++;
            const token = localStorage.getItem("mendToken");
            if (token && token !== "DEMO_MODE_TOKEN") {
                clearInterval(timer);
                if (typeof onSuccess === "function") onSuccess(token);
                return;
            }

            if (checksCount > 180) {
                clearInterval(timer);
            }
        }, 1000);
    }
}

export { AuthModalManager, REGISTERED_APP_ID, REGISTERED_REDIRECT_URI };
