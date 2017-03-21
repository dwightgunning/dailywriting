/**
*
* WordCount
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function WordCount(props) {
  return (
    <div>
      <FormattedMessage {...messages.header} />: { props.count }
    </div>
  );
}

WordCount.propTypes = {
  count: React.PropTypes.number
};

export default WordCount;
