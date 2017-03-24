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
  milestoneTime: '',
});

function writingPageReducer(state = initialState, action) {
  if (action.type === DEFAULT_ACTION) {
    return state;
  } else if (action.type === CHANGE_WORDS) {
    const words = action.words;
    const count = calculateWordCount(action.words);
    let startTime = state.get('startTime');
    let milestoneTime = state.get('milestoneTime');

    if (!startTime) {
      startTime = new Date().toUTCString();
    }

    if (!milestoneTime && count >= state.get('milestoneCount')) {
      milestoneTime = new Date().toUTCString();
    }

    return state.merge({
      words,
      startTime,
      milestoneTime,
      count,
    });
  }

  return state;
}

function calculateWordCount(words) {
  let wordCount = 0;

  if (words.length > 0) {
    wordCount = words.replace(/(\r\n|\n|\r)/g, ' ').replace(/(\s\s+)/g, ' ').trim().split(' ').length;
  }

  return wordCount;
}

export default writingPageReducer;
