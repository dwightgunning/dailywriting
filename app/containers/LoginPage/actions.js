/*
 *
 * LoginPage actions
 *
 */

import {
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  SUBMIT_LOGIN,
  LOGIN_REQUEST,
} from './constants';
import {
  REQUEST_ERROR,
  SENDING_REQUEST
} from 'constants';

export function changeEmail(email) {
  return {type: EMAIL_CHANGE, email};
}

export function changePassword(password) {
  return {type: PASSWORD_CHANGE, password};
}
