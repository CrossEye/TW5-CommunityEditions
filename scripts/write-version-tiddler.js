/*
 * Write the package version into a tiddler so it is visible inside the
 * recipes edition (transclude `$:/community/recipes/version`).  Wired
 * as the `prestart` and `prebuild` npm scripts so both the Node dev
 * wiki and the release HTML build pick up the current version on every
 * run.
 */

"use strict";

var fs = require("fs");
var path = require("path");

var pkg = require(path.join("..", "package.json"));

var TARGET = path.join(
	"editions", "recipes", "wiki", "tiddlers",
	"$__community_recipes_version.tid"
);

var CONTENT = "title: $:/community/recipes/version\n" +
	"type: text/vnd.tiddlywiki\n" +
	"\n" +
	pkg.version + "\n";

fs.writeFileSync(TARGET, CONTENT);
console.log("Wrote " + TARGET + " (version " + pkg.version + ")");
