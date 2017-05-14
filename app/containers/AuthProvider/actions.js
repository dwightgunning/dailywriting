/*
 *
 * AuthProvider actions
 *
 */

import {
  AUTHENTICATED,
  DEAUTHENTICATED,
  LOGIN_REQUEST,
  LOGOUT,
  LOGIN
} from './constants';

export function authenticating() {
  return {
    type: AUTHENTICATING
  };
}

export function authenticated(authenticatedUser) {
  return {
    type: AUTHENTICATED,
    authenticatedUser: authenticatedUser
  };
}

export function deauthenticated() {
  return {
    type: DEAUTHENTICATED
  };
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 */
export function login(credentials) {
  return {type: LOGIN, credentials}
}

export function logout(error) {
  return {
    type: LOGOUT,
    error: error
  };
}
