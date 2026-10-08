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

class Sdk {
    /** @param {{authFlow: any}} authFlow */
    constructor(authFlow) {
        this._authFlow = authFlow;
        try {
            // @ts-ignore
            this._mendeleySdk = MendeleySDK(authFlow);
        } catch (e) {
            logger.warn("SDK_INIT_FALLBACK", { message: "MendeleySDK standalone not available, fallback to mock mode" });
        }
        this._userId = 0;
        /** @type {Array<UserGroupInfo>} */
        this._userGroups = [];
    }

    _isDemoMode() {
        return localStorage.getItem("mendToken") === "DEMO_MODE_TOKEN";
    }

    /**
     * Get items from user library
     * @param {string|null} search
     * @param {string[]} [itemsID]
     * @param {string} [format]
     * @returns {Promise<SearchResult>}
     */
    getItems(search, itemsID, format) {
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
            return Promise.resolve({ items: copy });
        }

        let promise = Promise.resolve({ items: [] });

        if (search) {
            promise = this._mendeleySdk.documents.search({
                query: search,
                limit: 20,
                view: "bib",
            });
        } else if (itemsID && itemsID.length) {
            // Fallback for document retrieval by IDs
            promise = Promise.all(
                itemsID.map(id => this._mendeleySdk.documents.get(id, { view: "bib" }).catch(() => null))
            ).then(items => ({ items: items.filter(Boolean) }));
        } else {
            promise = this._mendeleySdk.documents.list({
                limit: 16,
                view: "bib",
                sort: "last_modified",
                order: "desc"
            });
        }
        return promise.then((response) => {
            if (response && response.items) {
                response.items.forEach(MendeleyToCls.transform.bind(MendeleyToCls));
            }
            return response;
        });
    }

    /**
     * Get items from group library
     * @param {string | null} search
     * @param {number|string} groupId
     * @param {string[]} [itemsID]
     * @returns {Promise<SearchResult>}
     */
    getGroupItems(search, groupId, itemsID) {
        if (this._isDemoMode()) {
            return this.getItems(search, itemsID);
        }
        return this._mendeleySdk.documents.list({
            group_id: String(groupId),
            limit: 20,
            view: "bib"
        }).then(response => {
            if (response && response.items) {
                response.items.forEach(MendeleyToCls.transform.bind(MendeleyToCls));
            }
            return response;
        });
    }

    /**
     * Get user groups
     * @returns {Promise<Array<UserGroupInfo>>}
     */
    getUserGroups() {
        if (this._isDemoMode()) {
            return Promise.resolve(DEMO_GROUPS);
        }
        return this._mendeleySdk.folders.list({
            limit: 6
        }).then((response) => {
            if (response && response.items && response.items.length) {
                return response.items;
            }
            return [];
        });
    }
}

export { Sdk };
