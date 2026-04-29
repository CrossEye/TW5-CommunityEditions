/*
 * Publish recipe-edition build artifacts into docs/ for GitHub Pages.
 *
 * docs/ is served at the root of the GH Pages site.  Layout for the recipe
 * edition is fixed by the URL convention:
 *
 *   docs/recipes/empty/index.html   <- tidbits_empty.html
 *   docs/recipes/full/index.html    <- tidbits.html
 *   docs/recipes/samples/<name>.json
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

function copySamples() {
	var dst = path.join(DOCS_RECIPES, "samples");
	ensureDir(dst);
	var files = fs.readdirSync(SAMPLES_DIR).filter(function(f) {
		return f.endsWith(".json");
	}).sort();
	files.forEach(function(f) {
		copyFile(path.join(SAMPLES_DIR, f), path.join(dst, f));
	});
}

console.log("Publishing to " + DOCS_RECIPES);
COPIES.forEach(function(c) { copyFile(c.from, c.to); });
copySamples();
console.log("Done");
