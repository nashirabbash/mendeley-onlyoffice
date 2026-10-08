/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation.
 */

// @ts-check

/// <reference path="./types-global.js" />

import { Sdk } from "./sdk";
import { Router } from "./router";
import { LoginPage } from "./pages/login";
import { SettingsPage } from "./pages/settings";
import { translate, CitationService, logger } from "./services";
import { SelectCitationsComponent } from "./shared/ui/select-citation";
import { Button, Loader } from "./shared/components";
import "../components.css";
import "../styles.css";

(function () {
    const displayNoneClass = "hidden";

    /** @type {Router} */
    let router;
    /** @type {Sdk} */
    let sdk;
    /** @type {SettingsPage} */
    let settings;
    /** @type {CitationService} */
    let citationService;
    /** @type {LoginPage} */
    let loginPage;
    /** @type {SelectCitationsComponent} */
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
                router.openMain();
                loadInitialData();
            });
    };

    function loadInitialData() {
        const libLoader = document.getElementById("libLoader");
        if (libLoader) libLoader.classList.remove("hidden");

        // Load user groups
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
        }).catch(e => console.warn(e));

        // Initialize settings
        settings.init().catch(e => console.warn(e));

        // Load reference documents
        sdk.getItems(null).then(res => {
            selectCitation.clearLibrary();
            selectCitation.displaySearchItems(res, null, null);
        }).catch(e => {
            console.error("Load library error:", e);
        }).finally(() => {
            if (libLoader) libLoader.classList.add("hidden");
        });
    }

    function addEventListeners() {
        // Selection change listener
        selectCitation.subscribe((count, selectedItems) => {
            if (insertLinkBtn) {
                // @ts-ignore
                insertLinkBtn.disabled = count === 0;
            }
        });

        // Search listener
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
                        selectCitation.displaySearchItems(res, null, null);
                    }).catch(err => {
                        console.error("Search error:", err);
                    }).finally(() => {
                        if (libLoader) libLoader.classList.add("hidden");
                    });
                }, 300);
            });
        }

        // Library Group change listener
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
                    selectCitation.displaySearchItems(res, null, null);
                }).finally(() => {
                    if (libLoader) libLoader.classList.add("hidden");
                });
            });
        }

        // Top More Menu Dropdown
        if (moreMenuBtn && moreDropdown) {
            moreMenuBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                moreDropdown.classList.toggle("hidden");
            });

            document.addEventListener("click", () => {
                moreDropdown.classList.add("hidden");
            });
        }

        // Menu: Insert Bibliography
        document.getElementById("menuInsertBib")?.addEventListener("click", () => {
            moreDropdown?.classList.add("hidden");
            citationService.insertBibliography();
        });

        // Menu: Refresh References
        document.getElementById("menuRefresh")?.addEventListener("click", () => {
            moreDropdown?.classList.add("hidden");
            citationService.updateCslItems(true);
            loadInitialData();
        });

        // Menu: Citation Style Settings
        document.getElementById("menuSettings")?.addEventListener("click", () => {
            moreDropdown?.classList.add("hidden");
            settings.show();
        });

        document.getElementById("settingsBackBtn")?.addEventListener("click", () => {
            router.openMain();
        });

        // Menu: Unlink Citations
        document.getElementById("menuUnlink")?.addEventListener("click", () => {
            moreDropdown?.classList.add("hidden");
            citationService.saveAsText();
        });

        // Bottom Dock: Insert Citation Button
        if (insertLinkBtn) {
            insertLinkBtn.addEventListener("click", () => {
                const selectedItems = selectCitation.getSelectedItems();
                if (Object.keys(selectedItems).length === 0) return;

                citationService.insertSelectedCitations(selectedItems).then(() => {
                    selectCitation.clearSelection();
                }).catch(err => {
                    console.error("Insert citation error:", err);
                });
            });
        }

        // Bottom Dock: Cancel Button
        if (cancelSelectBtn) {
            cancelSelectBtn.addEventListener("click", () => {
                selectCitation.clearSelection();
            });
        }

        // Inline Quick Insert Custom Event (from arrow-down format menu)
        window.addEventListener("mendeley:quickInsert", (e) => {
            // @ts-ignore
            const { item, format } = e.detail || {};
            if (!item) return;

            const singleSelection = { [item.id]: item };
            
            // Apply formatting override if narrative
            if (format === "narrative") {
                item["suppress-author"] = false;
            }

            citationService.insertSelectedCitations(singleSelection).catch(err => {
                console.error("Quick insert citation error:", err);
            });
        });
    }

    // Context menu and editor command handlers
    window.Asc.plugin.button = function (id) {
        this.executeCommand("close", "");
    };

})();
