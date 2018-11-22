import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBibliography } from '../actions/citations';

class BibliographyBtn extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.getBibliography(this.props.citeproc);
  }
  render() {
    return <button onClick={this.onClick}>Add Bibliography</button>;
  }
}

const mapStateToProps = state => ({
  citeproc: state.citeproc,
});

const mapDispatchToProps = { getBibliography };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BibliographyBtn);
