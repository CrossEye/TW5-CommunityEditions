Edition Criteria
================

An edition:

  - **must serve a useful and relatively common purpose.**  The test is whether
    a stranger would immediately recognize the need ("oh, I've wanted that").
    Someone's wiki exploring entomological appearances in 20th century
    literature may be fascinating, but is not going to be reused by very many
    people.

  - **should have a clear, narrow scope** and resist feature creep.  It is
    better to do one thing well and keep a "futures" list than to grow into a
    sprawling tool.

  - **should work out of the box** without the user needing to configure
    anything before it is useful — good defaults, sensible structure, ready to
    populate.

  - **should be self-documenting from within.**  A tiddler (or small set)
    explaining the conventions used, what the key tiddlers do, and how to extend
    or customize.

  - **should ship with illustrative sample content.**  Enough to show what a
    real, populated version looks like, without being so specific that users
    feel they must delete everything before starting.  Ideally, this is just
    a JSON bundle that can be added to an empty version, so that there are two
    artifacts delivered: a complete empty edition and the JSON sample content.

  - **should have a complexity ceiling.**  A motivated new user should be able
    to understand the whole edition in a single sitting — roughly 1,000 words of
    explanation should suffice.

  - **should make common customizations easy.**  Theming via the palette;
    user-facing text in a small set of well-named tiddlers rather than scattered
    hardcoded strings; sensible structure for adding fields or tags.  It should
    remain localization-friendly:  No hardcoded UI strings or colors; structure
    clean enough that someone could translate without surgery.

  - **should showcase idiomatic TiddlyWiki.**  While it is primarily functional,
    it should also be educational — demonstrating patterns a new user could
    learn from and adapt.

  - **should be maintainable.**  Prefer core TW mechanisms and established
    community plugins over custom wikitext, so fewer things break when TW itself
    updates.

  - **should follow TW namespace conventions.**  Edition-specific tiddlers under
    a logical prefix (e.g. `$:/community/recipes/`); palette colors instead of
    hardcoded CSS values.

  - **should prefer modern TW techniques and tools, but should not go out of its
    way to promote them.**  For instance, choose `<% if %>` over a `<$list>` or
    `<$reveal>` used for the same purpose.

  - **should be deployment-agnostic** where practical: single-file HTML
    for simplicity, but nothing that would break in a Node.js or server
    deployment.
