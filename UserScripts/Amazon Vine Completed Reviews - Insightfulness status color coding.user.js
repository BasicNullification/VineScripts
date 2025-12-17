// ==UserScript==
// @name         Amazon Vine Completed Reviews - Insightfulness status color coding
// @namespace    https://github.com/BasicNullification/VineScripts
// @version      1.0.0
// @description  Adds background colors to the 'Review status' column on Vine completed reviews.
// @author       BasicNullification
// @match        https://www.amazon.com/vine/vine-reviews?review-type=completed
// @match        https://www.amazon.com/vine/vine-reviews?page=*&review-type=completed
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @downloadURL  https://raw.githubusercontent.com/BasicNullification/VineScripts/main/UserScripts/Amazon%20Vine%20Completed%20Reviews%20-%20Insightfulness%20status%20color%20coding.user.js
// @updateURL    https://raw.githubusercontent.com/BasicNullification/VineScripts/main/UserScripts/Amazon%20Vine%20Completed%20Reviews%20-%20Insightfulness%20status%20color%20coding.user.js
// @homepageURL  https://github.com/BasicNullification/VineScripts
// @grant        none
// ==/UserScript==

(() => {
  "use strict";

  const CELL_SELECTOR = "table.a-normal.vvp-reviews-table > tbody > tr.vvp-reviews-table--row > td.vvp-reviews-table--text-col:nth-child(5)";
  const MARK_ATTR = "data-vvp-rating-colored";

  // Dark-ish, readable tones.. but can be changed to whatever works best
  const ratingToBg = {
    Excellent: "#0b4f1a", // dark green
    Good: "#8a6d00",      // dark yellow
    Fair: "#d97a00",      // orange
    Poor: "#b00020"       // red
  };

  function applyColors(root = document) {
    const cells = root.querySelectorAll(`${CELL_SELECTOR}:not([${MARK_ATTR}])`);
    for (const cell of cells) {
      const rating = (cell.textContent || "").trim();

      const bg = ratingToBg[rating];
      if (bg) {
        cell.style.backgroundColor = bg;
        cell.style.color = "#fff";
        cell.style.fontWeight = "600";
        cell.style.borderRadius = "6px";
        cell.style.padding = "6px 8px";
      }

      cell.setAttribute(MARK_ATTR, "1");
    }
  }

  // Initial pass
  applyColors();

  /*
  // Doesn't appear that the MO is necessary during initial testing, but keeping here in case we need to use it
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.addedNodes && m.addedNodes.length) {
        applyColors(document);
        break;
      }
    }
  });

  mo.observe(document.documentElement, { childList: true, subtree: true });
  */

})();
