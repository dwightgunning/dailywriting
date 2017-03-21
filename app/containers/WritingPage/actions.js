/*
 *
 * WritingPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_WORDS,
} from './constants';

function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

function changeWords(words) {
  return {
    type: CHANGE_WORDS,
    words,
  }
}

export {
  defaultAction,
  changeWords,
}
