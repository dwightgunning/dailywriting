/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  EMAIL_CHANGE,
  PASSWORD_CHANGE
} from './constants';
import {
  AUTHENTICATED
} from '../AuthProvider/constants';

const initialState = fromJS({
  email: '',
  password: '',
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case EMAIL_CHANGE:
      return state.set('email', action.email);
    case PASSWORD_CHANGE:
      return state.set('password', action.password);
    case AUTHENTICATED:
      return initialState;
    default:
      return state;
  }
}

export default loginPageReducer;
