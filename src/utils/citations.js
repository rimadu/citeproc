export function insertCitationCluster(citeprocEngine, citation, indexBefore) {
  const citationByIndex = citeprocEngine.registry.citationreg.citationByIndex;
  const citationsPre = [];
  const citationsPost = [];

  for (let i = 0; i < citationByIndex.length; i++) {
    if (indexBefore > i) {
      citationsPre.push([citationByIndex[i].citationID, 0]);
    } else {
      citationsPost.push([citationByIndex[i].citationID, 0]);
    }
  }

  /**
   * Inserts citation in registry and returns all changed citations and if bibliography needs update
   *
   * It takes three arguments: a citation object, a list of [citationID, noteIndex]
   * pairs representing existing citations that precede the target citation,
   * and a similar list of pairs for citations coming after the target.
   * Citations are maintained in registry.
   * List can be accessed from citeproc.registry.citatioreg.ciataionByIndex.
   *
   * citation
   * {
   *  citationID: 'cit2',
   *  citationItems: [{
   *    id: 'Item-3'
   *  }],
   *  properties: {
   *    noteIndex: 0,
   *  }
   * }
   * citation fields can be found https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html
   * check sections Citations and Cite-Items
   * Structure of a Zotero citation https://github.com/Juris-M/citeproc-js/blob/master/attic/CITATIONS.txt
   *
   * @param {object} citation
   * @param {[[citationID, noteIndex]]} citationsPre - an array [citationID, noteIndex] pairs preceding the target citation
   * @param {[[citationID, noteIndex]]} citationsPost
   * @returns
   *  [
   *     {
   *       bibchange: false, - indicates whether the document bibliography is in need of refreshing (never got true??)
   *       citation_errors: [{
   *         citationID: "citationID",
   *         index: 4,
   *         noteIndex: 3,
   *         itemID: "itemID",
   *         citationItem_pos: 0,
   *         error_code: CSL.ERROR_NO_RENDERED_FORM (=1)
   *      }],
   *     },
   *     // changes after insertion
   *     [
   *        [ citationIndex, citationText, citationID ],
   *        [ 1, "(Richard Snoakes 1950)", 'cit1 ]
   *     ]
   *  ]
   */
  return citeprocEngine.processCitationCluster(
    citation,
    citationsPre,
    citationsPost,
  );
}

// Not getting correct changes
export function removeCitationCluster(citeproc, citationID, citations) {
  const citationByIndex = citations; // citeproc.registry.citationreg.citationByIndex;
  const citationsPrePost = [];
  let citationsPre = [];
  let citationsPost = [];
  let citation;
  let index;

  if (citationByIndex.length === 1) {
    citeproc.rebuildProcessorState([]);
    citeproc.updateItems([]);
    return [{}, []];
  }

  for (let i = 0; i < citationByIndex.length; i++) {
    if (citationByIndex[i].id === citationID) index = i;
    if (index + 1 === i) citation = { ...citationByIndex[i].meta };

    if (!index && index !== 0) {
      citationsPre.push([citationByIndex[i].id, 0]);
    } else if (i > index + 1) {
      citationsPost.push([citationByIndex[i].id, 0]);
    }
  }

  if (citationByIndex[citationByIndex.length - 1].id === citationID) {
    citation = citationByIndex[citationByIndex.length - 2].meta;
    citationsPre.pop();
  }

  return citeproc.processCitationCluster(citation, citationsPre, citationsPost);
}

export function appendCitation(citeproc, citation) {
  /**
   * @param {object} citation
   * @returns {array} changed citations [[ citationIndex, citationText, citationID ]]
   * its appending to the end so always changed just one last citation
   */
  return citeproc.appendCitationCluster(citation);
}

export function makeCitationCluster(citeproc, citations) {
  /**
   * Should have already updated items `updateItems`
   * It asigns automaticaly a right footnote number to the citation
   * @param {array} citations - list of citationItems
   * @returns {string} - for eg. [1, p.123,2, p.123]
   */
  return citeproc.makeCitationCluster(citations);
}

export function rebuildProcessorState(citeproc, citations) {
  if (citations.length) {
    /**
     * Rebuilds the processor from scratch, based on a list of citation
     * objects. In a dynamic application, once the internal state of processor
     * is established, citations should edited with individual invocations
     * of processCitationCluster().
     *
     * citations is a list of citation objects in document order.
     * mode is one of "html", "text" or "rtf".
     * uncitedItemIDs is a list of itemIDs or a JS object with itemIDs as keys.
     * Returns a list of [citationID,noteIndex,string] triples in document order.
     * Set citation.properties.noteIndex to 0 for in-text citations.
     * It is not necessary to run updateItems() before this function.
     * @param {array} citations
     * @returns [[ citationID, citationIndex, citationText ], [ citationID, citationIndex, citationText ]]
     */
    return citeproc.rebuildProcessorState(citations);
  }
  citeproc.updateItems([]);
  console.log(
    'citationByIndex should be empty :(',
    citeproc.registry.citationreg.citationByIndex,
  );

  return [];
}
