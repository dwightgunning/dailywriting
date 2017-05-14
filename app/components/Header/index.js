/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
function Header({authenticatedUser}) {
  // render() {
    return (
      <div>
        <NavBar>
          {!authenticatedUser &&
            <HeaderLink to="/login">
              <FormattedMessage {...messages.login} />
            </HeaderLink>
          }
          {authenticatedUser &&
            <HeaderLink to="/logout">
              <FormattedMessage {...messages.logout} />
            </HeaderLink>
          }
        </NavBar>
      </div>
    );
  // }
}

Header.propTypes = {
  authenticatedUser: React.PropTypes.object,
};

export default Header;
