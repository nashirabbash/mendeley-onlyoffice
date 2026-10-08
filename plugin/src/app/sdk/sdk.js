/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation.
 */

// @ts-check

/// <reference path="../types-global.js" />
/// <reference path="../../../vendor/mendeley-sdk/standalone.min.js" />
/// <reference path="./types.js" />

import { MendeleyToCls } from "./mendeley-to-csl";
import { DEMO_DOCUMENTS, DEMO_GROUPS } from "../shared/constants/demo-data";
import { logger } from "../services/logger-service";

const API_BASE = "https://api.mendeley.com";

class Sdk {
    /** @param {{authFlow: any}} authFlow */
    constructor(authFlow) {
        this._authFlow = authFlow;
        try {
            // @ts-ignore
            if (typeof MendeleySDK === "function") {
                // @ts-ignore
                this._mendeleySdk = MendeleySDK(authFlow);
            }
        } catch (e) {
            logger.warn("SDK_INIT_FALLBACK", { message: e.message });
        }
        this._userId = 0;
        /** @type {Array<UserGroupInfo>} */
        this._userGroups = [];
    }

    _getToken() {
        return localStorage.getItem("mendToken");
    }

    _isDemoMode() {
        return this._getToken() === "DEMO_MODE_TOKEN";
    }

    async _fetch(endpoint, options = {}) {
        const token = this._getToken();
        if (!token) {
            throw new Error("No Mendeley access token available");
        }

        const headers = {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.mendeley-document.1+json",
            ...(options.headers || {})
        };

        const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;
        logger.info("FETCH_API_REQUEST", { url });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        try {
            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                const text = await response.text().catch(() => "");
                logger.error("FETCH_API_ERROR", { status: response.status, statusText: response.statusText, text });
                throw new Error(`Mendeley API error (${response.status}): ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            clearTimeout(timeoutId);
            logger.error("FETCH_API_EXCEPTION", { message: err.message });
            throw err;
        }
    }

    /**
     * Get items from user library
     * @param {string|null} search
     * @param {string[]} [itemsID]
     * @param {string} [format]
     * @returns {Promise<SearchResult>}
     */
    async getItems(search, itemsID, format) {
        if (this._isDemoMode()) {
            logger.info("FETCHING_DEMO_ITEMS", { search, count: DEMO_DOCUMENTS.length });
            let filtered = DEMO_DOCUMENTS;
            if (search) {
                const q = search.toLowerCase();
                filtered = DEMO_DOCUMENTS.filter(d => 
                    d.title.toLowerCase().includes(q) ||
                    (d.authors && d.authors.some(a => (a.last_name && a.last_name.toLowerCase().includes(q)) || (a.first_name && a.first_name.toLowerCase().includes(q)))) ||
                    (d.year && String(d.year).includes(q))
                );
            }
            if (itemsID && itemsID.length) {
                filtered = DEMO_DOCUMENTS.filter(d => itemsID.includes(d.id));
            }
            const copy = JSON.parse(JSON.stringify(filtered));
            copy.forEach(MendeleyToCls.transform.bind(MendeleyToCls));
            return { items: copy };
        }

        try {
            let items = [];
            if (search) {
                const queryParam = encodeURIComponent(search);
                items = await this._fetch(`/search/documents?query=${queryParam}&limit=20&view=bib`);
            } else if (itemsID && itemsID.length) {
                items = await Promise.all(
                    itemsID.map(id => this._fetch(`/documents/${id}?view=bib`).catch(() => null))
                );
                items = items.filter(Boolean);
            } else {
                items = await this._fetch(`/documents?limit=25&view=bib&sort=last_modified&order=desc`);
            }

            const resultItems = Array.isArray(items) ? items : (items.items || []);
            resultItems.forEach(MendeleyToCls.transform.bind(MendeleyToCls));
            logger.success("FETCHED_DOCUMENTS_SUCCESS", { count: resultItems.length });
            return { items: resultItems };
        } catch (err) {
            logger.error("GET_ITEMS_FAILED", { message: err.message });
            // Fallback to demo mode if token expired/network failed
            return { items: [] };
        }
    }

    /**
     * Get items from group library
     * @param {string | null} search
     * @param {number|string} groupId
     * @param {string[]} [itemsID]
     * @returns {Promise<SearchResult>}
     */
    async getGroupItems(search, groupId, itemsID) {
        if (this._isDemoMode()) {
            return this.getItems(search, itemsID);
        }
        try {
            const items = await this._fetch(`/documents?group_id=${groupId}&limit=25&view=bib`);
            const resultItems = Array.isArray(items) ? items : (items.items || []);
            resultItems.forEach(MendeleyToCls.transform.bind(MendeleyToCls));
            return { items: resultItems };
        } catch (e) {
            logger.error("GET_GROUP_ITEMS_FAILED", { message: e.message });
            return { items: [] };
        }
    }

    /**
     * Get user groups
     * @returns {Promise<Array<UserGroupInfo>>}
     */
    async getUserGroups() {
        if (this._isDemoMode()) {
            return DEMO_GROUPS;
        }
        try {
            const groups = await this._fetch(`/groups?limit=20`, {
                headers: { "Accept": "application/vnd.mendeley-group.1+json" }
            });
            if (Array.isArray(groups)) {
                return groups.map(g => ({ id: g.id, name: g.name }));
            }
            return [];
        } catch (e) {
            logger.warn("GET_USER_GROUPS_FAILED", { message: e.message });
            return [];
        }
    }
}

export { Sdk };
