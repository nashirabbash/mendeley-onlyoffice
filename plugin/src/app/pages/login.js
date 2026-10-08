/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation.
 */

// @ts-check

import { Loader } from "../shared/components";
import { logger } from "../services/logger-service";
import { AuthModalManager } from "../services/auth-modal-manager";

class LoginPage {
    /**
     * @param {any} router
     */
    constructor(router) {
        this._router = router;
        this._onAuthorized = function () {};
        this._onOpen = function () {};
    }

    init() {
        const self = this;
        logger.info("LOGIN_PAGE_INIT", {});

        // Attach globally available handlers
        // @ts-ignore
        window.onSignInClick = function () {
            logger.info("CLICK_SIGN_IN", {});
            self._openInAppModalAuth();
        };

        // @ts-ignore
        window.onDemoModeClick = function () {
            logger.info("CLICK_DEMO_MODE", {});
            self._startDemoMode();
        };

        // @ts-ignore
        window.onConnectTokenClick = function () {
            const input = /** @type {HTMLInputElement} */ (document.getElementById("tokenField"));
            if (input && input.value) {
                self._applyManualToken(input.value);
            }
        };

        // Also bind listeners directly to DOM elements
        this._bindDOM();

        const triggers = {
            onOpen: function (cb) {
                self._onOpen = cb;
                return triggers;
            },
            onAuthorized: function (cb) {
                self._onAuthorized = cb;
                return triggers;
            },
        };

        const existingToken = this._getToken();
        if (existingToken) {
            logger.info("CACHED_TOKEN_FOUND", {});
            self._hide();
            setTimeout(() => self._onAuthorized(), 0);
            return triggers;
        }

        self._show();
        setTimeout(() => {
            Loader.hide();
            self._onOpen();
        }, 0);

        return triggers;
    }

    _bindDOM() {
        const self = this;
        const btnDemo = document.getElementById("demoModeBtn");
        if (btnDemo) {
            btnDemo.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                self._startDemoMode();
            };
        }

        const btnConnect = document.getElementById("connectTokenBtn");
        const tokenInput = document.getElementById("tokenField");
        if (btnConnect && tokenInput) {
            btnConnect.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                // @ts-ignore
                self._applyManualToken(tokenInput.value);
            };
        }
    }

    _startDemoMode() {
        logger.info("STARTING_DEMO_MODE", {});
        this._saveToken("DEMO_MODE_TOKEN");
        this._hide();
        this._onAuthorized();
        // Fallback direct view switcher
        if (typeof window.showMainView === "function") {
            window.showMainView();
        }
    }

    _openInAppModalAuth() {
        const self = this;
        logger.info("OPENING_AUTH_FLOW", {});
        AuthModalManager.openModalAuth((token) => {
            self._saveToken(token);
            self._hide();
            self._onAuthorized();
            if (typeof window.showMainView === "function") {
                window.showMainView();
            }
        }, (err) => {
            console.error("Auth error:", err);
        });
    }

    _applyManualToken(raw) {
        if (!raw || !raw.trim()) return;
        let cleanToken = raw.trim();
        if (cleanToken.startsWith("Bearer ")) cleanToken = cleanToken.slice(7).trim();
        if (cleanToken.includes("access_token=")) {
            const match = cleanToken.match(/access_token=([^&]+)/);
            if (match && match[1]) cleanToken = match[1];
        }

        this._saveToken(cleanToken);
        this._hide();
        this._onAuthorized();
        if (typeof window.showMainView === "function") {
            window.showMainView();
        }
    }

    _hide() {
        Loader.hide();
        if (this._router && typeof this._router.openMain === "function") {
            this._router.openMain();
        }
    }

    _show() {
        Loader.hide();
        if (this._router && typeof this._router.openLogin === "function") {
            this._router.openLogin();
        }
    }

    _getToken() {
        const token = localStorage.getItem("mendToken");
        const timestamp = localStorage.getItem("mendTokenExpiresAt");
        if (!token || !timestamp || Date.now() > Number(timestamp)) {
            return null;
        }
        return token;
    }

    _saveToken(token) {
        localStorage.setItem("mendToken", token);
        localStorage.setItem("mendTokenExpiresAt", String(Date.now() + (30 * 24 * 60 * 60 * 1000)));
    }

    getAuthFlow() {
        const self = this;
        return {
            authenticate: () => this._show(),
            getToken: () => self._getToken(),
            refreshToken: () => false,
        };
    }
}

export { LoginPage };
