^(0_0)^

`yarn`

`yarn start`

## Investigation of citeproc

## Bibliography and Citations

Citeproc documentation

https://citeproc-js.readthedocs.io/en/latest/running.html

https://github.com/Juris-M/citeproc-js/blob/5ab40eb0eb66a61cfdea46b863f41e173ea343e6/manual/citeproc-doc.rst

## Build citeproc engine

`new CSL.Engine(sys, style, lang, forceLang);`

**sys** (required) - object with two methods retrieveLocale and retrieveItem

**style** (required) - CSL style as serialized XML or as JavaScript object

**lang** (optional, default en) - funny fact retrieveLocale in sys is required

**forceLang** (optional) - When set to a non-nil value, force the use of the locale set in the lang argument, overriding any language set in the default-locale attribute on the style node.
source code https://github.com/Juris-M/citeproc-js/blob/master/src/build.js

**How to update style without re-build?**
Style setup is in Engine build, there is no separate method to update style

`updateItems(documentIds, flag)`

Before citations or a bibliography can be generated, an ordered list of reference items must ordinarily be loaded into the processor using the updateItems() command.
This command takes a list of item IDs as its sole argument, and will reconcile the internal state of the processor to the provided list of items, making any necessary insertions and deletions.

The sequence in which items are listed in the argument to updateItems() will ordinarily be reflected in the ordering of bibliographies only if the style installed in the processor does not impose its own sort order.

To suppress sorting updateItems(ids, true)

**Docs not completely right here** - if you start from building citations, updateItems is done in processCitationCluster or rebuildProcessorState

**How to add new documents?**
Documents should be global

## Citations

`makeCitationCluster(citationItems)`

citations are not saved in registry, no sort. It assigns right footnote to the citation, bibliography will be created from all documents updateItems(arrayOfDocumentsIDs)

`processCitationCluster(citation, preCitations, postCitations)`

It takes three arguments: a citation object, a list of [citationID, noteIndex] pairs representing existing citations that precede the target citation, and a similar list of pairs for citations coming after the target. Citations are maintained in registry. List can be accessed from citeproc.registry.citatioreg.citationByIndex.

Returns data object and list of changed citations. Data object consist of bibchange (boolean) and citation_errors (array)

**Never got bibchange true??!!**

In code on itemsUpdate return_data is maintained in registry but never assigned in processCitationCluster, it sets bibchange by default as false and never updates. Bibliography needs to be rebuild every time a citation is changed or we need to maintain local state.

It can be accessed citeproc.registry.return_data but in this case I always get TRUE!! Even if it’s not TRUE.

`appendCitationCluster(citation)`

Appends new citation to the end, returns a list of changed citations, means always last one. Doesn’t say if bibliography needs update (can’t say :))).

`rebuildProcessorState(citations)`

Rebuilds the processor from scratch, based on a cached list of citation objects. In a dynamic application, once the internal state of processor is established, citations should be edited with individual invocations of processCitationCluster().

Returns a list of citations `[[ citationID, noteIndex, citationText ], [ citationID, noteIndex, citationText ]]`

## Bibliography

`makeBibliography(filterArgs)`

Shows bibliography

If there are no citations, shows all items added to updateItems

Otherwise adjusts to citations

items can be filtered **makeBibliography(filterArgs)** - select, include, exclude, quash

Matches against the content of name and date variables are not possible

Extra items in bibliography > **uncitedItems** (same as updatedItems).
These items can be cited as well just when you remove citation they are not removed.

**How to update citations when one reference removed?** Rebuild?

## Other

`citeproc.setOutputFormat(format);` - html (default), rtf, text

## Graph

https://plot.ly/~uhura/19/#/plot
