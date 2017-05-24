import React from 'react';
import { FormattedMessage } from 'react-intl';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

import messages from './messages';

// class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
function Header({ authenticatedUser }) {
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
}

Header.propTypes = {
  authenticatedUser: React.PropTypes.object,
};

export default Header;
