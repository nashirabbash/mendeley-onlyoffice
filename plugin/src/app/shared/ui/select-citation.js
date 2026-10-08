/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation.
 */

// @ts-check

/**
 * @typedef {import('./types').SelectCitationsComponentItem} SelectCitationsComponentItem
 */

class SelectCitationsComponent {
    /**
     * @param {string} displayNoneClass
     * @param {Function} [onLoadMore]
     * @param {Function} [shouldLoadMore]
     */
    constructor(displayNoneClass, onLoadMore, shouldLoadMore) {
        this.displayNoneClass = displayNoneClass;
        this.onLoadMore = onLoadMore;
        this.shouldLoadMore = shouldLoadMore;
        this.docsHolder = document.getElementById("docsHolder");
        this.selectedHolder = document.getElementById("selectedHolder");
        this.selectedWrapper = document.getElementById("selectedWrapper");
        this.selectedInfo = document.getElementById("selectedInfo");
        this.selectedCount = document.getElementById("selectedCount");
        this.cancelSelectBtn = document.getElementById("cancelSelectBtn");

        /** @type {Object<string, SelectCitationsComponentItem>} */
        this.items = {};
        /** @type {Object<string, boolean>} */
        this.selected = {};
        /** @type {Array<Function>} */
        this.subscribers = [];

        this._initEvents();
    }

    _initEvents() {
        const self = this;
        if (this.cancelSelectBtn) {
            this.cancelSelectBtn.onclick = () => {
                self.clearSelection();
            };
        }
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

    _notify() {
        const count = Object.keys(this.selected).length;
        this._updateSelectedTray();
        this.subscribers.forEach(fn => fn(count, this.getSelectedItems()));
    }

    count() {
        return Object.keys(this.selected).length;
    }

    getSelectedItems() {
        const res = {};
        for (const id of Object.keys(this.selected)) {
            if (this.items[id]) res[id] = this.items[id];
        }
        return res;
    }

    clearSelection() {
        this.selected = {};
        if (this.docsHolder) {
            const checkboxes = this.docsHolder.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach((/** @type {HTMLInputElement} */ cb) => cb.checked = false);
        }
        this._notify();
    }

    clearLibrary() {
        this.items = {};
        if (this.docsHolder) this.docsHolder.innerHTML = "";
    }

    _updateSelectedTray() {
        if (!this.selectedHolder || !this.selectedWrapper) return;
        const selectedIds = Object.keys(this.selected);
        this.selectedHolder.innerHTML = "";

        if (selectedIds.length === 0) {
            this.selectedWrapper.classList.add("hidden");
            if (this.selectedInfo) this.selectedInfo.classList.add("hidden");
            return;
        }

        this.selectedWrapper.classList.remove("hidden");
        if (this.selectedInfo) this.selectedInfo.classList.remove("hidden");
        if (this.selectedCount) this.selectedCount.innerText = `${selectedIds.length} selected`;

        selectedIds.forEach(id => {
            const item = this.items[id];
            if (!item) return;

            const chip = document.createElement("div");
            chip.className = "citation-chip";
            
            const firstAuthor = item.authors && item.authors[0] ? (item.authors[0].last_name || item.authors[0].first_name || "Author") : "Author";
            const yearStr = item.year ? String(item.year) : "n.d.";
            
            chip.innerHTML = `
                <span class="chip-text">${firstAuthor}, ${yearStr}</span>
                <span class="chip-remove" title="Remove">×</span>
            `;

            chip.querySelector(".chip-remove")?.addEventListener("click", () => {
                delete this.selected[id];
                const cb = document.getElementById(`cb-${id}`);
                if (cb && cb instanceof HTMLInputElement) cb.checked = false;
                this._notify();
            });

            this.selectedHolder.appendChild(chip);
        });
    }

    displaySearchItems(res, err, lastSearch) {
        if (!this.docsHolder) return 0;
        const nothingFound = document.getElementById("nothingFound");

        if (err || !res || !res.items || res.items.length === 0) {
            if (nothingFound) nothingFound.classList.remove("hidden");
            return 0;
        }

        if (nothingFound) nothingFound.classList.add("hidden");

        res.items.forEach(item => {
            this.items[item.id] = item;
            const row = document.createElement("div");
            row.className = "ref-item-card";

            const firstAuthor = item.authors && item.authors.length ? 
                item.authors.map(a => `${a.last_name || ""} ${a.first_name ? a.first_name.charAt(0) + "." : ""}`).join(", ") : "Unknown Author";
            const year = item.year || "";
            const title = item.title || "Untitled Document";
            const source = item.source || item.publisher || "";

            row.innerHTML = `
                <div class="ref-item-header">
                    <input type="checkbox" id="cb-${item.id}" class="ref-checkbox" ${this.selected[item.id] ? "checked" : ""} />
                    <div class="ref-meta">
                        <div class="ref-title">${title}</div>
                        <div class="ref-authors">${firstAuthor} ${year ? `(${year})` : ""}</div>
                        ${source ? `<div class="ref-source">${source}</div>` : ""}
                    </div>
                </div>
                <div class="ref-quick-insert">
                    <button class="quick-insert-btn" id="btn-quick-${item.id}">
                        <span>insert citation</span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0L5 6L10 0H0Z"/></svg>
                    </button>
                    <div class="quick-insert-menu hidden" id="menu-quick-${item.id}">
                        <div class="menu-option" data-format="narrative">author (year)</div>
                        <div class="menu-option" data-format="naked">author year</div>
                        <div class="menu-option" data-format="parenthetical">(author year)</div>
                    </div>
                </div>
            `;

            const checkbox = row.querySelector(`#cb-${item.id}`);
            checkbox?.addEventListener("change", (e) => {
                // @ts-ignore
                if (e.target?.checked) {
                    this.selected[item.id] = true;
                } else {
                    delete this.selected[item.id];
                }
                this._notify();
            });

            const quickBtn = row.querySelector(`#btn-quick-${item.id}`);
            const quickMenu = row.querySelector(`#menu-quick-${item.id}`);

            quickBtn?.addEventListener("click", (e) => {
                e.stopPropagation();
                document.querySelectorAll(".quick-insert-menu").forEach(m => {
                    if (m !== quickMenu) m.classList.add("hidden");
                });
                quickMenu?.classList.toggle("hidden");
            });

            quickMenu?.querySelectorAll(".menu-option").forEach(opt => {
                opt.addEventListener("click", (e) => {
                    e.stopPropagation();
                    quickMenu.classList.add("hidden");
                    const format = opt.getAttribute("data-format") || "parenthetical";
                    window.dispatchEvent(new CustomEvent("mendeley:quickInsert", {
                        detail: { item, format }
                    }));
                });
            });

            this.docsHolder.appendChild(row);
        });

        return res.items.length;
    }

    removeItems(ids) {
        ids.forEach(id => {
            delete this.selected[id];
        });
        this._notify();
    }
}

export { SelectCitationsComponent };
