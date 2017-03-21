import { createSelector } from 'reselect';

/**
 * Direct selector to the writingPage state domain
 */
const selectWritingPageDomain = () => (state) => state.get('writingPage');

/**
 * Other specific selectors
 */

const makeSelectWords = () => createSelector(
  selectWritingPageDomain(),
  (writingState) => writingState.get('words')
);

const makeSelectWordCount = () => createSelector(
  selectWritingPageDomain(),
  (writingState) => writingState.get('count')
);

const makeSelectStartTime = () => createSelector(
  selectWritingPageDomain(),
  (writingState) => writingState.get('startTime')
);

const makeSelectMilestoneTime = () => createSelector(
  selectWritingPageDomain(),
  (writingState) => writingState.get('milestoneTime')
);

/**
 * Default selector used by WritingPage
 */

const makeSelectWritingPage = () => createSelector(
  selectWritingPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectWritingPage;
export {
  makeSelectWords,
  selectWritingPageDomain,
  makeSelectWordCount,
  makeSelectStartTime,
  makeSelectMilestoneTime,
  makeSelectWritingPage
};
