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

import { InputField, Button, Message } from "../shared/components";
import { translate } from "../services";
import { logger } from "../services/logger-service";

// Canonical Public Client ID for OnlyOffice Mendeley Integration
const DEFAULT_CLIENT_ID = "XPbozfRNSyo72orH";
const DEFAULT_REDIRECT_URI = "https://onlyoffice.github.io/sdkjs-plugins/content/mendeley/oauth.html";

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

        this._getBrowserTokenBtn = new Button("getBrowserTokenBtn", {
            variant: "primary",
        });

        this._demoModeBtn = new Button("demoModeBtn", {
            variant: "secondary",
        });

        this._appIdField = new InputField("appIdField", {
            autocomplete: "on",
        });

        this._loginBtn = new Button("loginBtn", {
            variant: "secondary",
        });

        this._loginMessage = new Message("loginMessage", {
            type: "error",
        });

        this._logoutLink = document.getElementById("logoutLink");
        if (!this._logoutLink) {
            throw new Error("logoutLink not found");
        }

        this._loginStateHash = "";
        this._mendAppId = "";

        this._onAuthorized = function () {};
        this._onOpen = function () {};
    }

    init() {
        const self = this;
        logger.info("LOGIN_INIT", { message: "Initializing Mendeley Login Page" });
        this._addEventListeners();

        this._mendAppId = localStorage.getItem("mendAppId") || DEFAULT_CLIENT_ID;
        this._appIdField.setValue(this._mendAppId);

        const triggers = {
            /**
             * @param {function(): void} callbackFn
             */
            onOpen: function (callbackFn) {
                self._onOpen = callbackFn;
                return triggers;
            },
            /**
             * @param {function(): void} callbackFn
             */
            onAuthorized: function (callbackFn) {
                self._onAuthorized = callbackFn;
                return triggers;
            },
        };

        const existingToken = this._getToken();
        if (existingToken) {
            logger.info("LOGIN_CACHED_TOKEN_FOUND", { hasToken: true, isDemo: existingToken === "DEMO_MODE_TOKEN" });
            self._hide();
            Promise.resolve().then(() => {
                self._onAuthorized();
            });
            return triggers;
        }

        self._show();
        Promise.resolve().then(() => {
            self._onOpen();
        });

        return triggers;
    }

    /**
     * @param {string} answer
     * @param {string} [state]
     */
    onAuthCallback(answer, state) {
        if (!state) {
            logger.warn("AUTH_CALLBACK_ERROR", { answer });
            this._loginMessage.show(translate(answer));
            return false;
        }
        if (state != this._loginStateHash) {
            logger.error("CSRF_STATE_MISMATCH", { expected: this._loginStateHash, received: state });
            this._loginMessage.show(
                translate("State validation failed. Possible CSRF attack."),
            );
            return false;
        }
        this._saveToken(answer);
        logger.success("AUTH_CALLBACK_SUCCESS", { message: "Successfully authorized via callback" });
        this._onAuthorized();
        this._hideLoader();
        this._hide();
        return true;
    }

    getAuthFlow() {
        const self = this;
        return {
            authenticate: () => {
                this._show();
                this._authenticate();
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

        this._getBrowserTokenBtn.subscribe(function (event) {
            if (event.type === "button:click") {
                self._openBrowserAuth();
            }
        });

        this._demoModeBtn.subscribe(function (event) {
            if (event.type === "button:click") {
                self._startDemoMode();
            }
        });

        this._loginBtn.subscribe(function (event) {
            if (event.type === "button:click") {
                self._authenticate();
            }
        });

        this._logoutLink.onclick = function () {
            logger.info("USER_LOGOUT", { message: "User cleared Mendeley token" });
            localStorage.removeItem("mendToken");
            localStorage.removeItem("mendTokenExpiresAt");
            self._show();
            return true;
        };
    }

    _startDemoMode() {
        logger.info("START_DEMO_MODE", { message: "Activating offline demonstration library mode" });
        this._saveToken("DEMO_MODE_TOKEN");
        this._hide();
        this._onAuthorized();
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

    _openBrowserAuth() {
        const appId = this._appIdField.getValue().trim() || DEFAULT_CLIENT_ID;
        this._mendAppId = appId;
        localStorage.setItem("mendAppId", appId);

        this._loginStateHash = new Date().getTime().toString();
        const link =
            "https://api.mendeley.com/oauth/authorize?client_id=" +
            this._mendAppId +
            "&redirect_uri=" +
            encodeURIComponent(DEFAULT_REDIRECT_URI) +
            "&response_type=token&scope=all&state=" +
            this._loginStateHash;

        logger.info("OPENING_BROWSER_AUTH", { link, appId: this._mendAppId });
        
        // Open OAuth in default browser window
        const wnd = window.open(link, "_blank", "width=600,height=750");
        
        // Focus token input for pasting when redirected
        const tokenInput = document.getElementById("tokenField");
        if (tokenInput) {
            tokenInput.focus();
        }
    }

    _authenticate() {
        var appid = this._appIdField.getValue().trim();
        if (!appid) {
            this._loginMessage.show(translate("AppId is empty"));
            return;
        }
        this._mendAppId = appid;
        localStorage.setItem("mendAppId", appid);
        this._openBrowserAuth();
    }

    _hide() {
        this._router.openMain();
        this._logoutLink.classList.remove("hidden");
    }

    _show() {
        this._router.openLogin();
        this._logoutLink.classList.add("hidden");
    }

    _showLoader() {
        this._connectTokenBtn.disable();
        this._tokenField.disable();
    }

    _hideLoader() {
        this._connectTokenBtn.enable();
        this._tokenField.enable();
    }

    /** @returns {string | null} */
    _getToken() {
        const token = localStorage.getItem("mendToken");
        const timestamp = localStorage.getItem("mendTokenExpiresAt");
        if (!token || !timestamp || Date.now() > Number(timestamp)) {
            return null;
        }
        return token;
    }

    /** @param {string} token */
    _saveToken(token) {
        localStorage.setItem("mendToken", token);
        localStorage.setItem("mendTokenExpiresAt", String(Date.now() + (30 * 24 * 60 * 60 * 1000)));
    }
}

export { LoginPage };
