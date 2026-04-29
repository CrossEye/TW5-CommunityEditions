/*
 * Produce tidbits.html by embedding the default sample collection into
 * tidbits_empty.html.
 *
 * The default sample (DEFAULT_SAMPLE) is one JSON array of tiddler objects,
 * appended to the empty wiki's tiddlywiki-tiddler-store script element.
 * Other sample collections in editions/recipes/samples/ remain available as
 * downloadable alternates (published via copy-to-docs.js) but are not
 * embedded.  Side-stepping a second TiddlyWiki build avoids the
 * filesystem-syncer save-back of every loaded sample.
 */

"use strict";

var fs = require("fs");
var path = require("path");

var OUTPUT_DIR = path.join("editions", "recipes", "wiki", "output");
var SAMPLES_DIR = path.join("editions", "recipes", "samples");
var DEFAULT_SAMPLE = "32-recipes-us.json";

var EMPTY_PATH = path.join(OUTPUT_DIR, "tidbits_empty.html");
var FULL_PATH = path.join(OUTPUT_DIR, "tidbits.html");
var SAMPLE_PATH = path.join(SAMPLES_DIR, DEFAULT_SAMPLE);

var STORE_OPEN = '<script class="tiddlywiki-tiddler-store" type="application/json">';
var STORE_CLOSE = "</script>";

function loadSamples() {
	var raw = fs.readFileSync(SAMPLE_PATH, "utf8");
	var arr = JSON.parse(raw);
	if(!Array.isArray(arr)) {
		throw new Error("Sample file is not a JSON array: " + SAMPLE_PATH);
	}
	console.log("  + " + DEFAULT_SAMPLE + " (" + arr.length + " tiddlers)");
	return arr;
}

function injectSamples(html, samples) {
	var openIdx = html.indexOf(STORE_OPEN);
	if(openIdx < 0) {
		throw new Error("Could not find tiddler-store script tag in " + EMPTY_PATH);
	}
	var contentStart = openIdx + STORE_OPEN.length;
	var closeIdx = html.indexOf(STORE_CLOSE, contentStart);
	if(closeIdx < 0) {
		throw new Error("Could not find closing </script> for tiddler store");
	}
	var existingJson = html.slice(contentStart, closeIdx);
	var existing = JSON.parse(existingJson);
	if(!Array.isArray(existing)) {
		throw new Error("Tiddler store is not a JSON array");
	}
	var merged = existing.concat(samples);
	// Escape `</` as `<\/` to keep `</script>` inside tiddler text from
	// terminating the enclosing <script> tag.  Matches TW's own offline
	// save encoding; default JSON.stringify does not escape forward slashes.
	var rebuilt = JSON.stringify(merged).replace(/<\//g, "<\\/");
	return html.slice(0, contentStart) + rebuilt + html.slice(closeIdx);
}

console.log("Loading default sample from " + SAMPLE_PATH);
var samples = loadSamples();

console.log("Reading " + EMPTY_PATH);
var html = fs.readFileSync(EMPTY_PATH, "utf8");

var out = injectSamples(html, samples);
fs.writeFileSync(FULL_PATH, out);
console.log("Wrote " + FULL_PATH + " (" + out.length + " bytes)");
