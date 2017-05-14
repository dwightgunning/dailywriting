/*
 *
 * WritingPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_WORDS,
  UPDATE_ENTRY
} from './constants';

function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

function changeWords(words) {
  return {
    type: CHANGE_WORDS,
    words
  };
}

function updateEntry(words) {
  return {
    type: UPDATE_ENTRY,
    words
  };
}

export {
  defaultAction,
  changeWords,
};
