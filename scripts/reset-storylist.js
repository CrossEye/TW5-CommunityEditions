/*
 * Reset $:/StoryList in the recipes edition before a release build.
 *
 * The TW node.js filesystem adaptor auto-saves StoryList during dev
 * whenever tiddlers are opened or closed, which would leak the
 * developer's tab state into the release artifact.  Wired as the
 * `prebuild` npm script.
 */

"use strict";

var fs = require("fs");
var path = require("path");

var TARGET = path.join(
	"editions", "recipes", "wiki", "tiddlers", "$__StoryList.tid"
);

var EMPTY = "title: $:/StoryList\ntype: text/vnd.tiddlywiki\n";

fs.writeFileSync(TARGET, EMPTY);
console.log("Reset " + TARGET);
