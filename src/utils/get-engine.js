import citeproc from 'citeproc';
import axios from 'axios';

const getSys = (docs, locales) => ({
  retrieveLocale: lang => locales[lang],
  retrieveItem: id => docs[id],
});

const loadLocale = lang => {
  return axios.get(`../locales/${lang}.xml`).then(res => res.data);
};

const loadStyle = styleName => {
  return axios
    .get(`http://www.zotero.org/styles/${styleName}`)
    .then(res => res.data);
};

export async function getEngine(docs = {}, styleName) {
  const locales = {};
  const locale = await loadLocale('en-US');
  locales['en-US'] = locale;
  const style = await loadStyle(styleName);

  return new citeproc.Engine(getSys(docs, locales), style);
}
