/*
 * Generate the default English language tiddlers under
 * editions/recipes/wiki/tiddlers/ from a single source-of-truth JSON.
 *
 * The JSON manifest lives at scripts/language-en-US.json and maps
 * lingo keys to English text.  Each entry produces a tiddler titled
 * $:/community/recipes/language/<key> with the text as body.
 *
 * The same manifest is the seed for translation packs — translators
 * copy it and replace the values, then ship the result as a JSON
 * tiddler array (see scripts/build-language-pack.js).
 *
 * Wired into the prebuild npm script so source tree stays in sync
 * with the manifest.
 */

"use strict";

var fs = require("fs");
var path = require("path");

var MANIFEST = path.join("scripts", "language-en-US.json");
var TIDDLERS_DIR = path.join("editions", "recipes", "wiki", "tiddlers");
var TITLE_PREFIX = "$:/community/recipes/language/";
var FILE_PREFIX = "$__community_recipes_language_";

function keyToFilename(key) {
	// Match the filesystem adapter's convention: replace `/` and `:` with `_`.
	return FILE_PREFIX + key.replace(/[\/:]/g, "_") + ".tid";
}

var manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
var keys = Object.keys(manifest);

// Track files we wrote, so we can clean stale ones.
var written = {};

keys.forEach(function(key) {
	var title = TITLE_PREFIX + key;
	var filename = keyToFilename(key);
	var content = "title: " + title + "\ntype: text/vnd.tiddlywiki\n\n" + manifest[key] + "\n";
	fs.writeFileSync(path.join(TIDDLERS_DIR, filename), content);
	written[filename] = true;
});

// Remove stale language tiddlers (manifest is the source of truth).
var existing = fs.readdirSync(TIDDLERS_DIR).filter(function(f) {
	return f.startsWith(FILE_PREFIX);
});
existing.forEach(function(f) {
	if(!written[f]) {
		fs.unlinkSync(path.join(TIDDLERS_DIR, f));
		console.log("removed stale " + f);
	}
});

console.log("Wrote " + keys.length + " language tiddlers from " + MANIFEST);
