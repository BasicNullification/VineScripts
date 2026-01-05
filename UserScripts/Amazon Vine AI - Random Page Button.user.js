// ==UserScript==
// @name         Amazon Vine AI - Random Page Button
// @namespace    https://github.com/BasicNullification/VineScripts
// @version      1.0.1
// @description  Adds a floating button to randomly navigate to a Vine AI page
// @author       BasicNullification
// @match        https://www.amazon.com/vine/vine-items?queue=encore*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @homepageURL  https://github.com/BasicNullification/VineScripts
// @supportURL   https://github.com/BasicNullification/VineScripts/issues/new?labels=Userscript,Vine%20Random%20Page%20Button
// @updateURL    https://raw.githubusercontent.com/BasicNullification/VineScripts/main/UserScripts/_meta/Amazon%20Vine%20AI%20-%20Random%20Page%20Button.meta.js
// @downloadURL  https://raw.githubusercontent.com/BasicNullification/VineScripts/main/UserScripts/Amazon%20Vine%20AI%20-%20Random%20Page%20Button.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function getMaxPageNumber() {
        const anchorTags = document.querySelectorAll('a[href*="queue=encore"][href*="page="]');
        let maxPage = 1;

        anchorTags.forEach(anchor => {
            const match = anchor.href.match(/page=(\d+)/);
            if (match) {
                const num = parseInt(match[1], 10);
                if (!isNaN(num) && num > maxPage) {
                    maxPage = num;
                }
            }
        });

        return maxPage;
    }

    function createFloatingButton() {
        const btn = document.createElement('button');
        btn.textContent = '🎲 Random Page';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.zIndex = 9999;
        btn.style.padding = '10px 15px';
        btn.style.backgroundColor = '#ff9900';
        btn.style.color = 'black';
        btn.style.border = '1px solid #333';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '14px';
        btn.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.2)';
        btn.addEventListener('click', () => {
            const maxPage = getMaxPageNumber();
            const randomPage = Math.floor(Math.random() * maxPage) + 1;
            window.location.href = `https://www.amazon.com/vine/vine-items?queue=encore&page=${randomPage}`;
        });

        document.body.appendChild(btn);
    }

    window.addEventListener('load', () => {
        createFloatingButton();
    });
})();
