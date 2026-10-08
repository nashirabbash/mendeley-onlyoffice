/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation.
 */

// @ts-check

/**
 * @typedef {import('../router').Router} Router
 */

import { InputField, Button, Message, Loader } from "../shared/components";
import { translate } from "../services";
import { logger } from "../services/logger-service";
import { AuthModalManager } from "../services/auth-modal-manager";

class LoginPage {
    /**
     * @param {Router} router
     */
    constructor(router) {
        this._router = router;
        this._onAuthorized = function () {};
        this._onOpen = function () {};
    }

    init() {
        const self = this;
        logger.info("LOGIN_INIT", { message: "Initializing Mendeley Login Page" });
        this._bindDirectDOMEvents();

        const triggers = {
            /** @param {function(): void} callbackFn */
            onOpen: function (callbackFn) {
                self._onOpen = callbackFn;
                return triggers;
            },
            /** @param {function(): void} callbackFn */
            onAuthorized: function (callbackFn) {
                self._onAuthorized = callbackFn;
                return triggers;
            },
        };

        const existingToken = this._getToken();
        if (existingToken) {
            logger.info("LOGIN_CACHED_TOKEN_FOUND", { hasToken: true });
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

    _bindDirectDOMEvents() {
        const self = this;

        const btnBrowser = document.getElementById("getBrowserTokenBtn");
        if (btnBrowser) {
            btnBrowser.onclick = function (e) {
                e.preventDefault();
                self._openInAppModalAuth();
            };
        }

        const btnDemo = document.getElementById("demoModeBtn");
        if (btnDemo) {
            btnDemo.onclick = function (e) {
                e.preventDefault();
                self._startDemoMode();
            };
        }

        const btnConnect = document.getElementById("connectTokenBtn");
        const tokenInput = document.getElementById("tokenField");
        if (btnConnect && tokenInput) {
            btnConnect.onclick = function (e) {
                e.preventDefault();
                // @ts-ignore
                const raw = tokenInput.value || "";
                self._applyManualToken(raw);
            };
        }

        const logout = document.getElementById("logoutLink");
        if (logout) {
            logout.onclick = function (e) {
                e.preventDefault();
                localStorage.removeItem("mendToken");
                localStorage.removeItem("mendTokenExpiresAt");
                self._show();
            };
        }
    }

    _startDemoMode() {
        logger.info("START_DEMO_MODE", {});
        this._saveToken("DEMO_MODE_TOKEN");
        this._hide();
        this._onAuthorized();
    }

    _openInAppModalAuth() {
        const self = this;
        logger.info("OPENING_MODAL_AUTH", {});
        
        AuthModalManager.openModalAuth((token) => {
            logger.success("AUTH_SUCCESS", {});
            self._saveToken(token);
            self._hide();
            self._onAuthorized();
        }, (err) => {
            logger.error("AUTH_ERROR", { err });
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
    }

    _hide() {
        Loader.hide();
        this._router.openMain();
    }

    _show() {
        Loader.hide();
        this._router.openLogin();
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
