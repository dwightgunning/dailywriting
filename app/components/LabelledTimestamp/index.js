/**
*
* LabelledTimestamp
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function LabelledTimestamp(props) {
  return (
    <div>
      {props.label}: {props.timestamp}
    </div>
  );
}

LabelledTimestamp.propTypes = {
  label: React.PropTypes.string,
  timestamp: React.PropTypes.string
};

export default LabelledTimestamp;
