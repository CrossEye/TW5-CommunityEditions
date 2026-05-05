TiddlyWiki Community Editions
=============================

A growing collection of [TiddlyWiki][tw] editions tuned for
specific everyday uses.  Each edition is a single-file HTML wiki
that works out of the box, ships with sample content as a
separate JSON collection, documents itself from within, and stays
maintainable on top of core TiddlyWiki plus a small set of
community plugins.

The longer-term plan — drawn from [TiddlyTalk discussion][t1] —
includes a dedicated editions site, an editions-management tool
that tracks plugin compatibility across versions, and a steadily
growing catalog of editions covering common domains.  This repo
is the starting point.

The properties we want every community edition to have are
distilled into a working list of [edition criteria][ec] — proposed
guidelines, open to revision.


Editions
--------


### Tidbits — recipe edition (v1.0.0) ###

A TiddlyWiki for storing, browsing, and cooking from your own
recipes.  Three reading views (primary, ingredients/steps split,
step-by-step), a browse-by-category dashboard, and a cooking mode
tuned for kitchen use.  Recipes carry tags, photos, and freely
extensible metadata fields.  Tier 1 localization, with an example
French language pack.

  - **Try the empty edition**:
    <https://crosseye.github.io/TW5-CommunityEditions/recipes/empty/>
  - **Try the populated edition** (32 recipes with photos):
    <https://crosseye.github.io/TW5-CommunityEditions/recipes/full/>
  - **Sample collections**:
    <https://crosseye.github.io/TW5-CommunityEditions/recipes/samples/>
  - **Source**: [editions/recipes/][rs]


Building
--------

    npm install
    npm start              # dev server at http://localhost:8080
    npm run build          # produces docs/recipes/{empty,full}/index.html


URL stability
-------------

The sample-collection URLs above are intended as stable simple-fetch
endpoints for external tooling — Tiddlyhost templates, future
editions-management tooling, and similar consumers.  If a URL
relocates, an equivalent simple-fetch endpoint will be preserved.


  [ec]: Philosophy/EditionCriteria.md
  [rs]: editions/recipes/
  [t1]: https://talk.tiddlywiki.org/t/8593
  [tw]: https://tiddlywiki.com/
