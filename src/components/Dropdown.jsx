import React, { Component } from 'react';
import { connect } from 'react-redux';

import documents from '../utils/documents-data';
import { getBibliography, initCiteprocEngine } from '../actions/citations';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCiteprocReady: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isCiteprocReady && this.props.citeproc) {
      this.props.getBibliography(this.props.citeproc);
      this.setState({ isCiteprocReady: false });
    }
  }

  componentDidMount() {
    this.props.initCiteprocEngine(documents, 'acta-naturae');
  }

  onChange(ev) {
    const style = ev.target.value;
    this.props.initCiteprocEngine(documents, style);
    this.setState({ isCiteprocReady: true });
  }

  render() {
    return (
      <select onChange={this.onChange}>
        <option value="acta-naturae">acta-naturae</option>
        <option value="american-physics-society">
          american-physics-society
        </option>
        <option value="biotechniques">biotechniques</option>
        <option value="elsevier-harvard">elsevier-harvard</option>
      </select>
    );
  }
}

const mapStateToProps = state => ({
  citeproc: state.citeproc,
});

const mapDispatchToProps = {
  getBibliography,
  initCiteprocEngine,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dropdown);
