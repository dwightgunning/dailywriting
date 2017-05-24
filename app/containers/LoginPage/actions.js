import {
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
} from './constants';

export function changeEmail(email) {
  return { type: EMAIL_CHANGE, email };
}

export function changePassword(password) {
  return { type: PASSWORD_CHANGE, password };
}
