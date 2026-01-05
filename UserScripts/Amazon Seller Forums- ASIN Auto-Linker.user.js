// ==UserScript==
// @name         Amazon Seller Forums: ASIN Auto-Linker
// @namespace    https://github.com/BasicNullification/
// @author       BasicNullification
// @version      1.2.0
// @description  Turns B0XXXXXXXX-style ASINs in forum posts into direct Amazon links.
// @match        https://sellercentral.amazon.com/seller-forums/discussions/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sellercentral.amazon.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const ASIN_REGEX = /\b(B0\w{8})\b/g;

    // Convert any text node that contains ASINs into one with linked elements
    function convertASINsInTextNode(node) {
        if (node.nodeType !== Node.TEXT_NODE) return;
        const text = node.textContent;
        if (!ASIN_REGEX.test(text)) return;

        const parent = node.parentNode;
        const frag = document.createDocumentFragment();
        let lastIndex = 0;

        ASIN_REGEX.lastIndex = 0;
        let match;
        while ((match = ASIN_REGEX.exec(text)) !== null) {
            const asin = match[1];
            if (match.index > lastIndex) {
                frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
            }

            const link = document.createElement("a");
            link.href = `https://www.amazon.com/dp/${asin}`;
            link.textContent = asin;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.style.color = "#007185";
            link.style.textDecoration = "underline";

            frag.appendChild(link);
            lastIndex = match.index + asin.length;
        }

        if (lastIndex < text.length) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        parent.replaceChild(frag, node);
    }

    function scanArticleContent() {
        const articles = document.querySelectorAll("article");
        articles.forEach(article => {
            const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                if (!node.parentNode.closest("a")) {
                    convertASINsInTextNode(node);
                }
            }
        });
    }

    function debounce(fn, delay) {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(fn, delay);
        };
    }

    // Observe DOM for dynamic post loads
    const debouncedScan = debounce(scanArticleContent, 300);
    const observer = new MutationObserver(debouncedScan);
    observer.observe(document.body, { childList: true, subtree: true });

    // Wait for DOMContentLoaded before first scan
    if (document.readyState === "complete" || document.readyState === "interactive") {
        scanArticleContent();
    } else {
        document.addEventListener("DOMContentLoaded", scanArticleContent);
    }
})();
