import citeproc from 'citeproc';
import documents from '../src/utils/documents-data';
import actaNaturae from './actaNaturae';
import apa from './apa';
import locale from './locale';

const styles = {
  apa,
  actaNaturae,
};

const getSys = docs => ({
  retrieveLocale: () => locale,
  retrieveItem: id => docs[id],
});

export default function(style = 'actaNaturae') {
  return new citeproc.Engine(getSys(documents), styles[style]);
}
