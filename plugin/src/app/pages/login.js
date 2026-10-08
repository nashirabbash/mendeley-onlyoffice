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

        this._tokenField = new InputField("tokenField", {
            autofocus: true,
            autocomplete: "off",
        });

        this._connectTokenBtn = new Button("connectTokenBtn", {
            variant: "primary",
        });

        this._getBrowserTokenBtn = document.getElementById("getBrowserTokenBtn");
        this._demoModeBtn = document.getElementById("demoModeBtn");

        this._loginMessage = new Message("loginMessage", {
            type: "error",
        });

        this._logoutLink = document.getElementById("logoutLink");
        this._onAuthorized = function () {};
        this._onOpen = function () {};
    }

    init() {
        const self = this;
        logger.info("LOGIN_INIT", { message: "Initializing Mendeley Login Page" });
        this._addEventListeners();

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

    onAuthCallback(answer, state) {
        this._saveToken(answer);
        this._onAuthorized();
        this._hide();
        return true;
    }

    getAuthFlow() {
        const self = this;
        return {
            authenticate: () => {
                this._show();
            },
            getToken: function () {
                return self._getToken();
            },
            refreshToken: function () {
                return false;
            },
        };
    }

    _addEventListeners() {
        const self = this;

        this._tokenField.subscribe(function (event) {
            if (event.type === "inputfield:submit") {
                self._applyManualToken();
            }
        });

        this._connectTokenBtn.subscribe(function (event) {
            if (event.type === "button:click") {
                self._applyManualToken();
            }
        });

        if (this._getBrowserTokenBtn) {
            this._getBrowserTokenBtn.onclick = function (e) {
                e.preventDefault();
                self._openInAppModalAuth();
            };
        }

        if (this._demoModeBtn) {
            this._demoModeBtn.onclick = function (e) {
                e.preventDefault();
                self._startDemoMode();
            };
        }

        if (this._logoutLink) {
            this._logoutLink.onclick = function () {
                logger.info("USER_LOGOUT", {});
                localStorage.removeItem("mendToken");
                localStorage.removeItem("mendTokenExpiresAt");
                Loader.hide();
                self._show();
                return true;
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
            self._loginMessage.show(translate("Authentication failed or cancelled"));
        });
    }

    _applyManualToken() {
        const rawToken = this._tokenField.getValue().trim();
        if (!rawToken) {
            this._loginMessage.show(translate("Please paste an Access Token"));
            return;
        }
        let cleanToken = rawToken;
        if (cleanToken.startsWith("Bearer ")) {
            cleanToken = cleanToken.slice(7).trim();
        }
        if (cleanToken.includes("access_token=")) {
            const match = cleanToken.match(/access_token=([^&]+)/);
            if (match && match[1]) {
                cleanToken = match[1];
            }
        }

        logger.info("MANUAL_TOKEN_SUBMITTED", { tokenLength: cleanToken.length });
        this._saveToken(cleanToken);
        this._hide();
        this._onAuthorized();
    }

    _hide() {
        Loader.hide();
        this._router.openMain();
        if (this._logoutLink) this._logoutLink.classList.remove("hidden");
    }

    _show() {
        Loader.hide();
        this._router.openLogin();
        if (this._logoutLink) this._logoutLink.classList.add("hidden");
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
}

export { LoginPage };
