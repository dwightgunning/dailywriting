/*
 *
 * AuthProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  AUTHENTICATED,
  DEAUTHENTICATED
} from './constants';

const initialState = fromJS({
  authenticatedUser: null,
});

function authProviderReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return state.set('authenticatedUser', action.authenticatedUser);
    case DEAUTHENTICATED:
      return state.set('authenticatedUser', null);
    default:
      return state;
  }
}

export default authProviderReducer;
