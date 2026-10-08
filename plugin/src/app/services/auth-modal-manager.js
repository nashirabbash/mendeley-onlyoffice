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
        window.OAuthCallback = function (token, state) {
            if (token) {
                localStorage.setItem("mendToken", token);
                localStorage.setItem("mendTokenExpiresAt", String(Date.now() + (30 * 24 * 60 * 60 * 1000)));
                if (typeof onSuccess === "function") onSuccess(token);
            }
        };

        window.OAuthError = function (err) {
            if (typeof onError === "function") onError(err);
        };

        // Spawn in-app dialog using window.open in CEF webview
        const modalWnd = window.open(authUrl, "MendeleyLoginModal", "width=550,height=700,menubar=no,toolbar=no,location=no,status=no");

        // Polling interval to auto-detect token redirection in storage or URL
        const timer = setInterval(() => {
            const token = localStorage.getItem("mendToken");
            if (token && token !== "DEMO_MODE_TOKEN") {
                clearInterval(timer);
                try { if (modalWnd && !modalWnd.closed) modalWnd.close(); } catch (e) {}
                if (typeof onSuccess === "function") onSuccess(token);
            }
            if (!modalWnd || modalWnd.closed) {
                clearInterval(timer);
            }
        }, 500);
    }
}

export { AuthModalManager, REGISTERED_APP_ID, REGISTERED_REDIRECT_URI };
