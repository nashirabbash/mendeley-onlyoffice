/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation.
 */

// @ts-check

import { Router } from "./router";
import { LoginPage } from "./pages/login";
import { SettingsPage } from "./pages/settings";
import { Sdk } from "./sdk/sdk";
import { CitationService } from "./services/citation-service";
import { SelectCitationsComponent } from "./shared/ui/select-citation";
import { Button, Loader } from "./shared/components";
import "../components.css";
import "../styles.css";

(function () {
    const displayNoneClass = "hidden";
    let router;
    let loginPage;
    let settings;
    let sdk;
    let citationService;
    let selectCitation;

    let searchInput;
    let insertLinkBtn;
    let cancelSelectBtn;
    let moreMenuBtn;
    let moreDropdown;
    let libraryGroupSelect;

    function initElements() {
        searchInput = document.getElementById("searchField");
        insertLinkBtn = document.getElementById("insertLinkBtn");
        cancelSelectBtn = document.getElementById("cancelSelectBtn");
        moreMenuBtn = document.getElementById("moreMenuBtn");
        moreDropdown = document.getElementById("moreDropdown");
        libraryGroupSelect = document.getElementById("libraryGroupSelect");

        selectCitation = new SelectCitationsComponent(displayNoneClass);
    }

    // Direct synchronous screen switcher
    window.showMainView = function () {
        const loginState = document.getElementById("loginState");
        const mainState = document.getElementById("mainState");
        if (loginState) loginState.classList.add("hidden");
        if (mainState) mainState.classList.remove("hidden");
        Loader.hide();
        loadInitialData();
    };

    window.Asc.plugin.init = function () {
        initElements();

        router = new Router();
        loginPage = new LoginPage(router);

        sdk = new Sdk({
            authFlow: loginPage.getAuthFlow()
        });
        settings = new SettingsPage(router, displayNoneClass);
        citationService = new CitationService(
            settings.getLocalesManager(),
            settings.getStyleManager()
        );

        addEventListeners();

        loginPage
            .init()
            .onOpen(function () {
                Loader.hide();
            })
            .onAuthorized(function () {
                Loader.hide();
                window.showMainView();
            });
    };

    function loadInitialData() {
        const libLoader = document.getElementById("libLoader");
        if (libLoader) libLoader.classList.remove("hidden");

        // Load user groups safely
        if (sdk && typeof sdk.getUserGroups === "function") {
            sdk.getUserGroups().then(groups => {
                if (libraryGroupSelect && groups && groups.length) {
                    libraryGroupSelect.innerHTML = '<option value="all">All References</option>';
                    groups.forEach(g => {
                        const opt = document.createElement("option");
                        opt.value = g.id;
                        opt.innerText = g.name;
                        libraryGroupSelect.appendChild(opt);
                    });
                }
            }).catch(e => console.warn("Load groups warning:", e));
        }

        // Initialize settings safely
        if (settings && typeof settings.init === "function") {
            settings.init().catch(e => console.warn("Settings init warning:", e));
        }

        // Load reference documents
        if (sdk && typeof sdk.getItems === "function") {
            sdk.getItems(null).then(res => {
                if (selectCitation) {
                    selectCitation.clearLibrary();
                    selectCitation.displaySearchItems(res, null, null);
                }
            }).catch(e => {
                console.error("Load library error:", e);
            }).finally(() => {
                if (libLoader) libLoader.classList.add("hidden");
            });
        } else {
            if (libLoader) libLoader.classList.add("hidden");
        }
    }

    function addEventListeners() {
        if (!selectCitation) return;

        // Selection change listener
        selectCitation.subscribe((count, selectedItems) => {
            if (insertLinkBtn) {
                // @ts-ignore
                insertLinkBtn.disabled = count === 0;
            }
        });

        // Insert citation button
        if (insertLinkBtn) {
            insertLinkBtn.addEventListener("click", () => {
                const selected = selectCitation.getSelectedItems();
                if (selected && selected.length) {
                    citationService.insertCitation(selected);
                }
            });
        }

        // Cancel selection button
        if (cancelSelectBtn) {
            cancelSelectBtn.addEventListener("click", () => {
                selectCitation.clearSelected();
            });
        }

        // Search input
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener("input", (e) => {
                clearTimeout(searchTimeout);
                // @ts-ignore
                const query = e.target?.value || "";
                searchTimeout = setTimeout(() => {
                    const libLoader = document.getElementById("libLoader");
                    if (libLoader) libLoader.classList.remove("hidden");

                    const groupId = libraryGroupSelect ? libraryGroupSelect.value : "all";
                    const promise = groupId && groupId !== "all" ? sdk.getGroupItems(query, groupId) : sdk.getItems(query);
                    promise.then(res => {
                        selectCitation.clearLibrary();
                        selectCitation.displaySearchItems(res, null, query);
                    }).catch(e => {
                        console.error("Search error:", e);
                    }).finally(() => {
                        if (libLoader) libLoader.classList.add("hidden");
                    });
                }, 300);
            });
        }

        // Library group dropdown change
        if (libraryGroupSelect) {
            libraryGroupSelect.addEventListener("change", (e) => {
                // @ts-ignore
                const groupId = e.target?.value;
                const query = searchInput ? searchInput.value : "";
                const libLoader = document.getElementById("libLoader");
                if (libLoader) libLoader.classList.remove("hidden");

                const promise = groupId && groupId !== "all" ? sdk.getGroupItems(query, groupId) : sdk.getItems(query);
                promise.then(res => {
                    selectCitation.clearLibrary();
                    selectCitation.displaySearchItems(res, null, query);
                }).catch(e => {
                    console.error("Group change error:", e);
                }).finally(() => {
                    if (libLoader) libLoader.classList.add("hidden");
                });
            });
        }

        // More dropdown toggle
        if (moreMenuBtn && moreDropdown) {
            moreMenuBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                moreDropdown.classList.toggle("hidden");
            });

            document.addEventListener("click", () => {
                moreDropdown.classList.add("hidden");
            });
        }

        // Insert Bibliography from menu
        const menuInsertBib = document.getElementById("menuInsertBib");
        if (menuInsertBib) {
            menuInsertBib.addEventListener("click", () => {
                if (moreDropdown) moreDropdown.classList.add("hidden");
                citationService.insertBibliography();
            });
        }

        // Refresh references from menu
        const menuRefresh = document.getElementById("menuRefresh");
        if (menuRefresh) {
            menuRefresh.addEventListener("click", () => {
                if (moreDropdown) moreDropdown.classList.add("hidden");
                citationService.refreshCitations();
            });
        }

        // Settings from menu
        const menuSettings = document.getElementById("menuSettings");
        if (menuSettings) {
            menuSettings.addEventListener("click", () => {
                if (moreDropdown) moreDropdown.classList.add("hidden");
                if (router) router.openSettings();
            });
        }

        // Settings back button
        const settingsBackBtn = document.getElementById("settingsBackBtn");
        if (settingsBackBtn) {
            settingsBackBtn.addEventListener("click", () => {
                if (router) router.openMain();
            });
        }

        // Unlink citations
        const menuUnlink = document.getElementById("menuUnlink");
        if (menuUnlink) {
            menuUnlink.addEventListener("click", () => {
                if (moreDropdown) moreDropdown.classList.add("hidden");
                citationService.saveAsText();
            });
        }
    }
})();
