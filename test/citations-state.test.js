import {
  insertCitationCluster,
  removeCitationCluster,
  rebuildProcessorState,
} from '../src/utils/citations';
import citations from '../src/utils/citations-data';
import getEngine from './get-engine';

describe('Citations', () => {
  let citeproc;
  let citationsState;
  let citationsList;

  beforeEach(() => {
    citeproc = getEngine('actaNaturae');
    citationsState = [
      {
        id: 'cit1',
        meta: citations.cit1,
      },
      {
        id: 'cit2',
        meta: citations.cit2,
      },
      {
        id: 'cit3',
        meta: citations.cit3,
      },
      {
        id: 'cit4',
        meta: citations.cit4,
      },
      {
        id: 'cit5',
        meta: citations.cit5,
      },
    ];
    citationsList = citationsState.map(cit => cit.meta);
  });

  test('inserts all citations from state', () => {
    const citations = rebuildProcessorState(citeproc, citationsList);
    expect(citations).toMatchObject([
      ['cit1', 0, '[1,2, p.123]'],
      ['cit2', 2, '[See 2, chap.12 (arguing that X is Y)]'],
      ['cit3', 0, '[3]'],
      ['cit4', 0, '[3]'],
      ['cit5', 0, '[1,4]'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(5);
  });

  test('removes first citation', () => {
    rebuildProcessorState(citeproc, citationsList);
    const changed = removeCitationCluster(citeproc, 'cit1', citationsState)[1];
    expect(changed).toMatchObject([
      [0, '[See 1, chap.12 (arguing that X is Y)]', 'cit2'],
      [1, '[2]', 'cit3'],
      [2, '[2]', 'cit4'],
      [3, '[3,4]', 'cit5'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(4);
  });

  test('removes second citation from list', () => {
    rebuildProcessorState(citeproc, citationsList);
    const changed = removeCitationCluster(citeproc, 'cit2', citationsState)[1];
    expect(changed).toMatchObject([[1, '[3]', 'cit3']]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(4);
  });

  test('removes third and forth citation', () => {
    rebuildProcessorState(citeproc, citationsList);
    removeCitationCluster(citeproc, 'cit3', citationsState);
    citationsState = citationsState.filter(cit => cit.id !== 'cit3');
    const changed = removeCitationCluster(citeproc, 'cit4', citationsState)[1];
    expect(changed).toMatchObject([
      [0, '[1,2, p.123]', 'cit1'],
      [1, '[See 2, chap.12 (arguing that X is Y)]', 'cit2'],
      [2, '[1,3]', 'cit5'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(3);
  });

  test('removes last citation from list', () => {
    rebuildProcessorState(citeproc, citationsList);
    const changed = removeCitationCluster(citeproc, 'cit5', citationsState)[1];
    expect(changed).toMatchObject([
      [0, '[1,2, p.123]', 'cit1'],
      [1, '[See 2, chap.12 (arguing that X is Y)]', 'cit2'],
      [2, '[3]', 'cit3'],
      [3, '[3]', 'cit4'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(4);
  });

  test('removes first citation from two citations', () => {
    const citationsState = [
      {
        id: 'cit1',
        meta: citations.cit1,
      },
      {
        id: 'cit2',
        meta: citations.cit2,
      },
    ];
    const citationsList = citationsState.map(cit => cit.meta);
    rebuildProcessorState(citeproc, citationsList);
    const changed = removeCitationCluster(citeproc, 'cit1', citationsState)[1];
    expect(changed).toMatchObject([
      [0, '[See 1, chap.12 (arguing that X is Y)]', 'cit2'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(1);
  });

  test('removes last citation from two citations', () => {
    const citationsState = [
      {
        id: 'cit1',
        meta: citations.cit1,
      },
      {
        id: 'cit2',
        meta: citations.cit2,
      },
    ];
    const citationsList = citationsState.map(cit => cit.meta);
    rebuildProcessorState(citeproc, citationsList);
    const changed = removeCitationCluster(citeproc, 'cit2', citationsState)[1];

    expect(changed).toMatchObject([[0, '[1,2, p.123]', 'cit1']]);

    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(1);
  });

  test('removes last citation from list of one', () => {
    const citationsState = [
      {
        id: 'cit1',
        meta: citations.cit1,
      },
    ];
    const citationsList = citationsState.map(cit => cit.meta);
    rebuildProcessorState(citeproc, citationsList);
    const changed = removeCitationCluster(citeproc, 'cit1', citationsState)[1];

    expect(changed).toMatchObject([]);
    //BUG - lib doesnt remove last citation from registry
    // expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(0);
  });

  test('removes and adds citations, example 1', () => {
    rebuildProcessorState(citeproc, citationsList);

    //remove first citation from state
    let changed = removeCitationCluster(citeproc, 'cit1', citationsState)[1];
    expect(changed).toMatchObject([
      [0, '[See 1, chap.12 (arguing that X is Y)]', 'cit2'],
      [1, '[2]', 'cit3'],
      [2, '[2]', 'cit4'],
      [3, '[3,4]', 'cit5'],
    ]);
    const citation = citationsState[0].meta;
    citationsState = citationsState.filter(cit => cit.id !== 'cit1');

    //insert removed citation at index 2
    changed = insertCitationCluster(citeproc, citation, 2)[1];
    expect(changed).toMatchObject([[2, '[1, p.123,3]', 'cit1']]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(5);

    changed = removeCitationCluster(citeproc, 'cit5', citationsState)[1];
    expect(changed).toMatchObject([
      [0, '[See 1, chap.12 (arguing that X is Y)]', 'cit2'],
      [1, '[2]', 'cit3'],
      [2, '[2]', 'cit4'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(3);
  });

  test('removes and adds citations, example 2', () => {
    citationsState = [
      {
        id: 'cit2',
        meta: citations.cit2,
      },
      {
        id: 'cit1',
        meta: citations.cit1,
      },
      {
        id: 'cit3',
        meta: citations.cit3,
      },
      {
        id: 'cit4',
        meta: citations.cit4,
      },
      {
        id: 'cit5',
        meta: citations.cit5,
      },
    ];
    citationsList = citationsState.map(cit => cit.meta);
    const allCitations = rebuildProcessorState(citeproc, citationsList);

    expect(allCitations).toMatchObject([
      ['cit2', 0, '[See 1, chap.12 (arguing that X is Y)]'],
      ['cit1', 0, '[1, p.123,2]'],
      ['cit3', 0, '[3]'],
      ['cit4', 0, '[3]'],
      ['cit5', 0, '[2,4]'],
    ]);

    let changed = removeCitationCluster(citeproc, 'cit2', citationsState)[1];
    expect(changed).toMatchObject([
      [0, '[1,2, p.123]', 'cit1'],
      [3, '[1,4]', 'cit5'],
    ]);
    expect(citeproc.registry.citationreg.citationByIndex).toHaveLength(4);
  });
});
