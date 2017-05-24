import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from 'components/Header';
import { makeSelectAuthenticatedUser } from '../AuthProvider/selectors';

export class HeaderContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Header authenticatedUser={this.props.authenticatedUser} />
    );
  }
}

HeaderContainer.propTypes = {
  authenticatedUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authenticatedUser: makeSelectAuthenticatedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
