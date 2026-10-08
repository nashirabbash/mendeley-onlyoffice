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

        // Open in browser
        try {
            window.open(authUrl, "_blank");
        } catch (e) {
            console.error("Window open error:", e);
        }

        // Active clipboard & storage watcher
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
