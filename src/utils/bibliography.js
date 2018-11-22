/**
 * more https://citeproc-js.readthedocs.io/en/latest/running.html
 * section makeBibliography
 * @returns
 * [
 *     {
 *        maxoffset: 0,
 *        entryspacing: 0,
 *        linespacing: 0,
 *        hangingindent: false,
 *        second-field-align: false,
 *        bibstart: "<div class=\"csl-bib-body\">\n",
 *        bibend: "</div>",
 *        bibliography_errors: [{
 *          index: 2,
 *          itemID: "ITEM-2",
 *          error_code: CSL.ERROR_NO_RENDERED_FORM // 1
 *        }],
 *        entry_ids: [\"Item-1\", \"Item-2\"]
 *     },
 *      // can be in html, text or rtf
 *     [
 *        "<div class=\"csl-entry\">Book A</div>",
 *        "<div class=\"csl-entry\">Book C</div>"
 *     ]
 *  ]
 */
export function createBibliography(citeprocEngine) {
  return citeprocEngine.makeBibliography();
}

/**
 * The processor might fail to produce meaningful rendered output in three situations:
 * - When makeBibliography() is run, and the configured style contains no bibliography node;
 * - When makeBibliography() is run, and no variable other than citation-number produces output for an individual entry; or
 * - When a citation command is used, but no element rendered for a particular cite produces any output.
 *
 * https://github.com/Juris-M/citeproc-js/blob/5ab40eb0eb66a61cfdea46b863f41e173ea343e6/manual/citeproc-doc.rst#handling-items-with-no-rendered-form
 */
