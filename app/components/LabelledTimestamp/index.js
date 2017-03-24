/**
*
* LabelledTimestamp
*
*/

import React from 'react';

function LabelledTimestamp(props) {
  return (
    <div>
      {props.label}: {props.timestamp}
    </div>
  );
}

LabelledTimestamp.propTypes = {
  label: React.PropTypes.string,
  timestamp: React.PropTypes.string,
};

export default LabelledTimestamp;
