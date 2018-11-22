import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Dropdown from './Dropdown';
import CitationsBtns from './CitationsBtns';
import BibliographyBtn from './BibliographyBtn';

class Preview extends Component {
  render() {
    return (
      <Fragment>
        <Dropdown />
        <h3>Citations</h3>
        <CitationsBtns />
        {this.props.citations.map(cit => (
          <div
            key={cit.id}
            dangerouslySetInnerHTML={{
              __html: cit.text,
            }}
          />
        ))}

        <h3>Bibliography</h3>
        <BibliographyBtn />
        <div dangerouslySetInnerHTML={{ __html: this.props.bibliography }} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bibliography: (state && state.bibliography) || [],
  citations: (state && state.citations) || [],
});

export default connect(mapStateToProps)(Preview);
