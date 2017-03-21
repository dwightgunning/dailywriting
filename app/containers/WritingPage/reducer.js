/*
 *
 * WritingPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION,
  CHANGE_WORDS,
} from './constants';

const initialState = fromJS({
  count: 0,
  words: '',
  startTime: '',
  milestoneCount: 5,
  milestoneTime: ''
});

function writingPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_WORDS:
      let wordCount = action.words.length == 0 ? 0 : action.words.replace(/(\r\n|\n|\r)/g, " ").replace(/(\s\s+)/g, " ").trim().split(" ").length;

      if (!state.get('startTime')) {
        state = state.set('startTime', new Date().toUTCString());
      }

      if (!state.get('milestoneTime') && wordCount >=  state.get('milestoneCount')) {
        state = state.set('milestoneTime', new Date().toUTCString());
      }

      return state
        .set('words', action.words)
        .set('count', wordCount);

    default:
      return state;
  }
}

export default writingPageReducer;
