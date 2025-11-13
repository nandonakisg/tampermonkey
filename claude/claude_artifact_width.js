// ==UserScript==
// @name         Claude Artifact Width Fix
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Override Tailwind's max-w-3xl class to remove width restrictions
// @author       nandonakis
// @match       https://claude.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';
	
	// Create style element
	const style = document.createElement('style');
	style.textContent = `
		/* Override Tailwind max-w-3xl class */
		.max-w-3xl {
			max-width: none !important;
		}
	`;
	
	// Add style to document - wait for head to exist
	if (document.head) {
		document.head.appendChild(style);
	} else {
		// At document-start, head might not exist yet - observe until it does
		const observer = new MutationObserver(() => {
			if (document.head) {
				document.head.appendChild(style);
				observer.disconnect();
			}
		});
		observer.observe(document.documentElement, { childList: true });
	}
})();