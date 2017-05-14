import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import messages from './messages';
import LoginForm from 'components/LoginForm';
import { makeSelectEmail, makeSelectPassword, selectLoginPageDomain } from './selectors';
import { changeEmail, changePassword } from './actions';
import { login } from 'containers/AuthProvider/actions';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="LoginPage"
          meta={[
            { name: 'description', content: 'Description of LoginPage' },
          ]}
        />
        <h1><FormattedMessage {...messages.header} /></h1>
        <LoginForm
          onSubmit={this.props.onSubmit}
          onEmailChange={this.props.onEmailChange}
          onPasswordChange={this.props.onPasswordChange}
          email={this.props.email}
          password={this.props.password}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword()
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    onSubmit: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(login({email: makeSelectEmail, password: makeSelectPassword}));
    },
    onEmailChange: (evt) => {
      dispatch(changeEmail(evt.target.value));
    },
    onPasswordChange: (evt) => {
      dispatch(changePassword(evt.target.value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
