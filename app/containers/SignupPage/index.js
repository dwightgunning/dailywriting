import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import SignupForm from 'components/SignupForm';
import { makeSelectSignupPage, makeSelectEmail, makeSelectPassword } from './selectors';
import messages from './messages';
import { changeEmail, changePassword, signupRequest } from './actions';

export class SignupPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <Helmet
          title="SignupPage"
          meta={[
            { name: 'description', content: 'Description of SignupPage' },
          ]}
        />
        <h1><FormattedMessage {...messages.header} /></h1>
        <SignupForm
          onSubmit={this.props.onSignupFormSubmit}
          onEmailChange={this.props.onEmailChange}
          onPasswordChange={this.props.onPasswordChange}
          errors={{ email: 'Invalid' }}
          user={this.props.user}
        />
      </div>
    );
  }
}

SignupPage.propTypes = {
  onEmailChange: React.PropTypes.func,
  onPasswordChange: React.PropTypes.func,
  onSignupFormSubmit: React.PropTypes.func,
  user: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  SignupPage: makeSelectSignupPage(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    onEmailChange: (evt) => dispatch(changeEmail(evt.target.value)),
    onPasswordChange: (evt) => dispatch(changePassword(evt.target.value)),
    onSignupFormSubmit: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(signupRequest());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
