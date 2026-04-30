/*
 * Convert a language manifest JSON into a drag-and-drop translation pack.
 *
 * Input:  scripts/language-<locale>.json — flat key:string map plus
 *         optional underscore-prefixed sections:
 *         - `_meta`: free-text translator notes (skipped)
 *         - `_tiddlers`: array of complete tiddler objects to ship
 *           alongside the lingo overrides.  Use for things that can't
 *           be lingo-overridden cleanly — e.g. category-tag captions
 *           where TW core reads the literal `caption` field.
 *
 * Output: editions/recipes/samples/<locale>/lang.json — JSON array of
 *         tiddler objects, ready to drop onto an empty Tidbits wiki to
 *         localise the UI.
 *
 * Usage: node scripts/build-language-pack.js <locale>
 */

"use strict";

var fs = require("fs");
var path = require("path");

var locale = process.argv[2];
if(!locale) {
	console.error("Usage: node scripts/build-language-pack.js <locale>");
	process.exit(1);
}

var INPUT = path.join("scripts", "language-" + locale + ".json");
var OUT_DIR = path.join("editions", "recipes", "samples", locale);
var OUTPUT = path.join(OUT_DIR, "lang.json");
var TITLE_PREFIX = "$:/community/recipes/language/";

var manifest = JSON.parse(fs.readFileSync(INPUT, "utf8"));
var tiddlers = [];

Object.keys(manifest).forEach(function(key) {
	if(key.indexOf("_") === 0) {
		if(key === "_tiddlers" && Array.isArray(manifest[key])) {
			manifest[key].forEach(function(t) { tiddlers.push(t); });
		}
		return;
	}
	tiddlers.push({
		title: TITLE_PREFIX + key,
		type: "text/vnd.tiddlywiki",
		text: manifest[key]
	});
});

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(tiddlers, null, 2) + "\n");
console.log("Wrote " + OUTPUT + " (" + tiddlers.length + " tiddlers)");
