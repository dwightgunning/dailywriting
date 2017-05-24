/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import messages from './messages';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
        <CardText>Need an account? <Link to={'/signup'}>Create one</Link>.</CardText>
      </Card>
    );
  }
}
