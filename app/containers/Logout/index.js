/*
 *
 * Logout
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { logout } from '../AuthProvider/actions';

export class Logout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.dispatch(logout());
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Logout);
