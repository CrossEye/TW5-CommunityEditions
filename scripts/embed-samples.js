/*
 * Produce tidbits.html by embedding sample tiddlers into tidbits_empty.html.
 *
 * The sample JSON files in editions/recipes/samples/ are each a JSON array
 * of tiddler objects.  We append them to the empty wiki's
 * tiddlywiki-tiddler-store script element (also a JSON array) and write
 * the result to tidbits.html.  Side-stepping a second TiddlyWiki build
 * avoids the filesystem-syncer save-back of every loaded sample.
 */

"use strict";

var fs = require("fs");
var path = require("path");

var OUTPUT_DIR = path.join("editions", "recipes", "wiki", "output");
var SAMPLES_DIR = path.join("editions", "recipes", "samples");

var EMPTY_PATH = path.join(OUTPUT_DIR, "tidbits_empty.html");
var FULL_PATH = path.join(OUTPUT_DIR, "tidbits.html");

var STORE_OPEN = '<script class="tiddlywiki-tiddler-store" type="application/json">';
var STORE_CLOSE = "</script>";

function loadSamples() {
	var files = fs.readdirSync(SAMPLES_DIR).filter(function(f) {
		return f.endsWith(".json");
	}).sort();
	var all = [];
	files.forEach(function(f) {
		var raw = fs.readFileSync(path.join(SAMPLES_DIR, f), "utf8");
		var arr = JSON.parse(raw);
		if(!Array.isArray(arr)) {
			throw new Error("Sample file is not a JSON array: " + f);
		}
		all = all.concat(arr);
		console.log("  + " + f + " (" + arr.length + " tiddlers)");
	});
	return all;
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
	var rebuilt = JSON.stringify(merged);
	return html.slice(0, contentStart) + rebuilt + html.slice(closeIdx);
}

console.log("Loading samples from " + SAMPLES_DIR);
var samples = loadSamples();
console.log("Loaded " + samples.length + " sample tiddlers total");

console.log("Reading " + EMPTY_PATH);
var html = fs.readFileSync(EMPTY_PATH, "utf8");

var out = injectSamples(html, samples);
fs.writeFileSync(FULL_PATH, out);
console.log("Wrote " + FULL_PATH + " (" + out.length + " bytes)");
