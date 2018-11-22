import { createBibliography } from '../src/utils/bibliography';
import { insertCitationCluster } from '../src/utils/citations';
import citations from '../src/utils/citations-data';
import getEngine from './get-engine';

describe('Bibliography', () => {
  let citeproc;
  beforeEach(() => {
    citeproc = getEngine();
  });
  test('returns bibliography in default html format', () => {
    insertCitationCluster(citeproc, citations.cit3, 0);
    const bibliography = createBibliography(citeproc);
    expect(bibliography[1][0]).toContain('div');
  });

  test('returns bibliography in rtf format', () => {
    citeproc.setOutputFormat('rtf');
    insertCitationCluster(citeproc, citations.cit3, 0);
    const bibliography = createBibliography(citeproc);
    expect(bibliography[1][0]).toContain(
      '1. \\tab Friedl J.E.F. 3rd ed. Mastering Regular Expressions. // O\\uc0\\u8217{}Reilly Media. 2006. 544 p.\r\n',
    );
  });

  test('bibliography in text format', () => {
    citeproc.setOutputFormat('text');
    insertCitationCluster(citeproc, citations.cit3, 0);
    const bibliography = createBibliography(citeproc);

    expect(bibliography[1][0]).toContain(
      '1. Friedl J.E.F. 3rd ed. Mastering Regular Expressions. // O’Reilly Media. 2006. 544 p.\n',
    );
  });

  test('inserts citations and returns bibliography with 2 items', () => {
    // citation with 2 references
    insertCitationCluster(citeproc, citations.cit1, 0);
    // citation with 1 reference, same as above
    insertCitationCluster(citeproc, citations.cit2, 1);
    const bibliography = createBibliography(citeproc);

    expect(bibliography[1]).toHaveLength(2);
  });

  test('inserts citations and returns bibliography with 3 items', () => {
    // citation with 2 references
    insertCitationCluster(citeproc, citations.cit1, 0);
    // citation with 1 reference, not same as above
    insertCitationCluster(citeproc, citations.cit3, 1);
    const bibliography = createBibliography(citeproc);

    expect(bibliography[1]).toHaveLength(3);
  });
});
