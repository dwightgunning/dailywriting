/*
 *
 * SignupPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_USERNAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  SIGNUP_REQUEST,
  SUBMIT_SIGNUP
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

// export function submitSignupForm() {
//   return {
//     type: SUBMIT_SIGNUP,
//   };
// }

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 */
export function signupRequest(data) {
  return {
    type: SIGNUP_REQUEST, data
  };
}
