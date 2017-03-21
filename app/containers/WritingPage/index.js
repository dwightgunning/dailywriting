/*
 *
 * WritingPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {injectIntl, intlShape, defineMessages, FormattedMessage} from 'react-intl';
import { createStructuredSelector } from 'reselect';

import WordCount from 'components/WordCount';
import LabelledTimestamp from 'components/LabelledTimestamp';
import { changeWords } from './actions';
import { makeSelectWritingPage, makeSelectWords, makeSelectWordCount, makeSelectStartTime, makeSelectMilestoneTime } from './selectors';
import Textarea from './Textarea';
import messages from './messages';

export class WritingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {formatMessage} = this.props.intl;

    let startTime = null;
    if (this.props.startTime) {
      startTime =
        <LabelledTimestamp
          id="startTime"
          label={formatMessage(messages.startTimeLabel)}
          timestamp={this.props.startTime} />
    }
    let milestoneTime = null;
    if (this.props.milestoneTime) {
      milestoneTime =
        <LabelledTimestamp
          id="milestoneTime"
          label={formatMessage(messages.milestoneTimeLabel)}
          timestamp={this.props.milestoneTime} />
    }

    return (
      <div>
        <Helmet
          title="WritingPage"
          meta={[
            { name: 'description', content: 'Description of WritingPage' },
          ]}
        />
        <div>
          <FormattedMessage {...messages.header} />
        </div>
        <div>
          <Textarea
            id="words"
            value={this.props.words}
            onChange={this.props.onChangeWords} />
        </div>
        <WordCount count={this.props.wordCount} />
        {startTime}
        {milestoneTime}
      </div>
    );
  }
}

WritingPage.propTypes = {
  intl: intlShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  words: React.PropTypes.string,
  wordCount: React.PropTypes.number,
  onChangeWords: React.PropTypes.func,
  startTime: React.PropTypes.string,
  milestoneTime: React.PropTypes.string
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeWords: (evt) => dispatch(changeWords(evt.target.value)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  words: makeSelectWords(),
  wordCount: makeSelectWordCount(),
  startTime: makeSelectStartTime(),
  milestoneTime: makeSelectMilestoneTime(),
  WritingPage: makeSelectWritingPage()
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WritingPage));