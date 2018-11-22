import { createBibliography } from '../utils/bibliography';
import { appendCitation, removeCitationCluster } from '../utils/citations';
import { getEngine } from '../utils/get-engine';

export const GET_BIB = 'GET_BIB';
export const GET_CIT = 'GET_CIT';
export const APPEND_CIT = 'APPEND_CIT';
export const GET_ENGINE = 'GET_ENGINE';
export const ENGINE_READY = 'ENGINE_READY';
export const DELETE_CIT = 'DELETE_CIT';

export const initCiteprocEngine = (documents, styleName) => ({
  type: GET_ENGINE,
  payload: function(dispatch) {
    getEngine(documents, styleName).then(citeproc => {
      /**
       * Before citations or a bibliography can be generated,
       * an ordered list of reference items must ordinarily be
       * loaded into the processor using the updateItems() command.
       * This command takes a list of item IDs as its sole argument,
       * and will reconcile the internal state of the processor to the provided list of items,
       * making any necessary insertions and deletions,
       * and making any necessary adjustments to internal registers related to disambiguation and so forth.
       *
       * The sequence in which items are listed in the argument to updateItems()
       * will ordinarily be reflected in the ordering of bibliographies only
       * if the style installed in the processor does not impose its own sort order.
       * To suppress sorting updateItems(ids, true)
       */
      citeproc.updateItems(Object.keys(documents));
      dispatch({
        type: ENGINE_READY,
        payload: citeproc,
      });
    });
  },
});

export const getBibliography = citeproc => {
  return {
    type: GET_BIB,
    payload: function() {
      return createBibliography(citeproc);
    },
  };
};

// appends citation to the end
export const addCitation = (citeproc, citation) => ({
  type: APPEND_CIT,
  payload: function() {
    return appendCitation(citeproc, citation);
  },
  meta: citation,
});

// deletes citation by id
export const deleteCitation = (citeproc, id, citations) => ({
  type: DELETE_CIT,
  payload: () => ({
    changed: removeCitationCluster(citeproc, id, citations),
    removedId: id,
  }),
});
