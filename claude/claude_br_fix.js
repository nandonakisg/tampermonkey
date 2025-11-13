// ==UserScript==
// @name         Claude Table BR fix
// @namespace    https://github.com/nandonakisg
// @version      1.0
// @description  Fixes literal <BR> text appearing in Claude artifacts by converting them to proper HTML line breaks
// @author       nandonakis
// @match        https://claude.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// @grant        none
// @run-at       document-idle
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/nandonakisg/tampermonkey/main/claude/claude_br_fix.meta.js
// @downloadURL  https://raw.githubusercontent.com/nandonakisg/tampermonkey/main/claude/claude_br_fix.js
// ==/UserScript==


function replaceLiteralBRs(root = document.body, source = "initial") {
	const walker = document.createTreeWalker(
		root,
		NodeFilter.SHOW_TEXT,
		null,
		false
	);
	const nodes = [];
	let n;
	while (n = walker.nextNode()) nodes.push(n);

	let replacements = 0;
	nodes.forEach(t => {
		if (t.nodeValue === '<br>') {
			t.replaceWith(document.createElement('br'));
			replacements++;
		}
	});

	if (replacements > 0) {
		console.log(`Claude BR fix (${source}): Made ${replacements} replacements`);
	} else if (source === "initial") {
		console.log(`Claude BR fix: Script loaded, no <BR> text found initially`);
	}

	return replacements;
}

console.log(`Claude BR fix userscript starting...`);
replaceLiteralBRs();

// If the artifact can be updated dynamically, also observe mutations:
new MutationObserver(muts => {
	muts.forEach(m => m.addedNodes.forEach(n => {
		if (n.nodeType === 1) {
			replaceLiteralBRs(n, "mutation");
		}
	}));
}).observe(document.body, { childList: true, subtree: true });

console.log(`Claude BR fix: Now watching for dynamic content changes`);
