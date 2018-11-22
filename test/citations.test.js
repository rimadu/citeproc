import {
  insertCitationCluster,
  removeCitationCluster,
} from '../src/utils/citations';
import citations from '../src/utils/citations-data';
import getEngine from './get-engine';

describe('Citations', () => {
  let citeproc;
  beforeEach(() => {
    citeproc = getEngine('actaNaturae');
  });
  test('inserts citation and returns changed citation (in this case same)', () => {
    const changedCitations = insertCitationCluster(
      citeproc,
      citations.cit3,
      0,
    )[1];
    expect(changedCitations).toMatchObject([[0, '[1]', 'cit3']]);
    expect(changedCitations[0][2]).toBe(citations.cit3.citationID);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(1);
  });

  // STYLE acta-naturae
  test('inserts multiple citations and returns changed citations', () => {
    const citeproc = getEngine('actaNaturae');
    // [inserted] => [inserted]
    const changedCitations1 = insertCitationCluster(
      citeproc,
      citations.cit1,
      0,
    )[1];
    expect(changedCitations1).toMatchObject([[0, '[1,2, p.123]', 'cit1']]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(1);

    // [inserted, cit1] => [inserted, cit1]
    const changedCitations2 = insertCitationCluster(
      citeproc,
      citations.cit2,
      0,
    )[1];
    expect(changedCitations2).toMatchObject([
      [0, '[See 1, chap.12 (arguing that X is Y)]', 'cit2'],
      [1, '[1, p.123,2]', 'cit1'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(2);

    // [cit2, cit1, inserted] => [inserted]
    const changedCitations3 = insertCitationCluster(
      citeproc,
      citations.cit5,
      2,
    )[1];
    expect(changedCitations3).toMatchObject([[2, '[2,3]', 'cit5']]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(3);

    // [cit2, inserted, cit1, cit5] => [inserted, cit1, cit5]
    const changedCitations4 = insertCitationCluster(
      citeproc,
      citations.cit3,
      1,
    )[1];
    expect(changedCitations4).toMatchObject([
      [1, '[2]', 'cit3'],
      [2, '[1, p.123,3]', 'cit1'],
      [3, '[3,4]', 'cit5'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(4);
  });

  // STYLE apa
  test('inserts multiple citations and returns changed citations', () => {
    const citeproc = getEngine('apa');
    // [inserted] => [inserted]
    const changedCitations1 = insertCitationCluster(
      citeproc,
      citations.cit1,
      0,
    )[1];
    expect(changedCitations1).toMatchObject([
      [0, '(Knuth, 1998; Sprowl, 1975, p. 123)', 'cit1'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(1);

    // [inserted, cit1] => [inserted, cit1]
    const changedCitations2 = insertCitationCluster(
      citeproc,
      citations.cit2,
      0,
    )[1];
    expect(changedCitations2).toMatchObject([
      [0, '(See Sprowl, 1975, Chapter 12 (arguing that X is Y))', 'cit2'],
      [1, '(Knuth, 1998; Sprowl, 1975, p. 123)', 'cit1'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(2);

    // [cit2, cit1, inserted] => [inserted]
    const changedCitations3 = insertCitationCluster(
      citeproc,
      citations.cit5,
      2,
    )[1];
    expect(changedCitations3).toMatchObject([
      [2, '(Jarvis, 2008; Knuth, 1998)', 'cit5'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(3);

    // [cit2, inserted, cit1, cit5] => [inserted, cit1, cit5]
    const changedCitations4 = insertCitationCluster(
      citeproc,
      citations.cit3,
      1,
    )[1];
    expect(changedCitations4).toMatchObject([[1, '(Friedl, 2006)', 'cit3']]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(4);
  });

  test('deletes first citation', () => {
    insertCitationCluster(citeproc, citations.cit1, 0);
    insertCitationCluster(citeproc, citations.cit2, 0);
    const changedCitations = removeCitationCluster(citeproc, 'cit1', [
      {
        id: 'cit1',
        meta: citations.cit1,
      },
      {
        id: 'cit2',
        meta: citations.cit2,
      },
    ])[1];
    expect(changedCitations).toMatchObject([
      [0, '[See 1, chap.12 (arguing that X is Y)]', 'cit2'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(1);
  });
});
