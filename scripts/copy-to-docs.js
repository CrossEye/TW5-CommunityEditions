/*
 * Publish recipe-edition build artifacts into docs/ for GitHub Pages.
 *
 * docs/ is served at the root of the GH Pages site.  Layout for the recipe
 * edition is fixed by the URL convention:
 *
 *   docs/recipes/empty/index.html        <- tidbits_empty.html
 *   docs/recipes/full/index.html         <- tidbits.html
 *   docs/recipes/samples/<locale>/*.json <- mirror of editions/recipes/samples/
 *
 * This script copies the latest build artifacts into that layout.  Static
 * landing pages (docs/index.html, docs/recipes/index.html, etc.) are
 * authored by hand and not touched here.
 */

"use strict";

var fs = require("fs");
var path = require("path");

var OUTPUT_DIR = path.join("editions", "recipes", "wiki", "output");
var SAMPLES_DIR = path.join("editions", "recipes", "samples");
var DOCS_RECIPES = path.join("docs", "recipes");

var COPIES = [
	{ from: path.join(OUTPUT_DIR, "tidbits_empty.html"), to: path.join(DOCS_RECIPES, "empty", "index.html") },
	{ from: path.join(OUTPUT_DIR, "tidbits.html"), to: path.join(DOCS_RECIPES, "full", "index.html") }
];

function ensureDir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}

function copyFile(from, to) {
	ensureDir(path.dirname(to));
	fs.copyFileSync(from, to);
	console.log("  " + from + " -> " + to);
}

function copyTree(src, dst) {
	ensureDir(dst);
	var entries = fs.readdirSync(src, { withFileTypes: true }).sort(function(a, b) {
		return a.name.localeCompare(b.name);
	});
	entries.forEach(function(e) {
		var s = path.join(src, e.name);
		var d = path.join(dst, e.name);
		if(e.isDirectory()) {
			copyTree(s, d);
		} else if(e.isFile() && e.name.endsWith(".json")) {
			copyFile(s, d);
		}
	});
}

console.log("Publishing to " + DOCS_RECIPES);
COPIES.forEach(function(c) { copyFile(c.from, c.to); });
copyTree(SAMPLES_DIR, path.join(DOCS_RECIPES, "samples"));
console.log("Done");
