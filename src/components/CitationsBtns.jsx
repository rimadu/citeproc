import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCitation, deleteCitation } from '../actions/citations';
import citationsData from '../utils/citations-data';

const findCitation = (list, id) => list.some(item => item.id === id);

class CitationsBtns extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    this.props.deleteCitation(this.props.citeproc, id, this.props.citations);
  }

  add(id) {
    this.props.addCitation(this.props.citeproc, citationsData[id]);
  }

  render() {
    return Object.values(citationsData).map(cit => {
      const doesCitationExists = findCitation(
        this.props.citations,
        cit.citationID,
      );
      const onClick = doesCitationExists ? this.delete : this.add;
      return (
        <button
          style={{ marginRight: '10px' }}
          key={cit.citationID}
          onClick={() => onClick(cit.citationID)}
        >
          {doesCitationExists ? `Delete ${cit.citationID}` : cit.citationID}
        </button>
      );
    });
  }
}

const mapStateToProps = state => ({
  citeproc: state.citeproc,
  citations: state.citations,
});

const mapDispatchToProps = {
  addCitation,
  deleteCitation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CitationsBtns);
