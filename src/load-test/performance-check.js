import citeproc from 'citeproc';
import axios from 'axios';

import { createBibliography } from '../utils/bibliography';
import {
  insertCitationCluster,
  appendCitation,
  makeCitationCluster,
  rebuildProcessorState,
  removeCitationCluster,
} from '../utils/citations';

import { generateDocuments, generateCitations } from './generate-data';
import { list } from 'postcss';

let documents = {};
let citations = {};

const getSys = locales => ({
  retrieveLocale: lang => locales[lang],
  retrieveItem: id => documents[id],
});

const loadLocale = lang => {
  return axios.get(`../locales/${lang}.xml`).then(res => res.data);
};

const loadStyle = styleName => {
  return axios
    .get(`http://www.zotero.org/styles/${styleName}`)
    .then(res => res.data);
};

export async function getEngine(styleName) {
  const locales = {};
  const locale = await loadLocale('en-US');
  locales['en-US'] = locale;
  const style = await loadStyle(styleName);

  return new citeproc.Engine(getSys(locales), style);
}

const getPerformanceData = (cb, cbTimed) => {
  const num = 10;
  const times = [];
  for (let i = 1; i <= num; i++) {
    const numberOfDocs = i * 100;
    documents = generateDocuments(numberOfDocs);
    citations = Object.values(generateCitations(Object.values(documents)));
    if (cb) cb(documents, citations);
    const t0 = performance.now();
    cbTimed(documents, citations);
    const t1 = performance.now();
    times.push([numberOfDocs, t1 - t0]);
  }

  return times;
};

export const test = () =>
  getEngine('acta-naturae').then(citeproc => {
    const times = getPerformanceData(
      // not included in performance test
      (documents, citations) => {
        // rebuildProcessorState(citeproc, citations);
      },

      // included in performance test
      (documents, citations) => {
        // removeCitationCluster(citeproc, citations[1].citationID);
        // rebuildProcessorState(citeproc, citations);
        // createBibliography(citeproc);
      },
    );
    console.log('times', JSON.stringify(times));
  });
