/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation.
 */

// @ts-check

class Loader {
    #container;

    /**
     * @param {string} containerId
     * @param {string} text
     */
    constructor(containerId, text) {
        const temp = document.getElementById(containerId);
        this.#container = temp;

        if (this.#container) {
            this.#createDOM(text);
        }
    }

    /**
     * @param {string} text
     */
    #createDOM(text) {
        if (!this.#container) return;
        this.#container.classList.add("loader-container");
        const svgNS = "http://www.w3.org/2000/svg";
        const image = document.createElementNS(svgNS, "svg");
        image.classList.add("loader-image");
        image.setAttribute("viewBox", "0 0 20 20");
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "10");
        circle.setAttribute("cy", "10");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "currentColor");
        circle.setAttribute("stroke-width", "1.5");
        circle.setAttribute("r", "7.25");
        circle.setAttribute("stroke-dasharray", "160%, 40%");
        image.appendChild(circle);
        this.#container.appendChild(image);
        const title = document.createElement("div");
        title.classList.add("loader-title");
        title.classList.add("i18n");
        title.innerText = text;
        this.#container.appendChild(title);
    }

    show() {
        this.#container?.classList.remove("hidden");
    }

    hide() {
        this.#container?.classList.add("hidden");
    }

    static show() {
        const loader = document.getElementById("loader");
        loader?.classList.remove("hidden");
    }

    static hide() {
        const loader = document.getElementById("loader");
        loader?.classList.add("hidden");
    }
}

export { Loader };
