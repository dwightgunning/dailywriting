import { call, put, race, select, take } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { REQUEST_ERROR, SENDING_REQUEST } from 'containers/App/constants';
import request from 'utils/request';
import { authenticated, deauthenticated } from './actions';
import { LOGIN, LOGOUT } from './constants';

let localStorage;
// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  localStorage = require('localStorage');
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage;
}

// Ref: https://github.com/redux-saga/redux-saga/issues/14

/**
 * Effect to authorize user with backend
 */
export function* authServiceLogin(data) {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // We then try to register or log in the user, depending on the request
  try {
    const email = yield select(data.email());
    const password = yield select(data.password());
    const requestURL = 'http://localhost:3000/api/login';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };
    // TODO: Figure out how to check for valid/invalid response objects
    return yield call(request, requestURL, options);
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: REQUEST_ERROR, error: error.message });
    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

/**
 * Effect to de-authorize user with backend
 */
function* authServiceLogout() {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });
  // We then try to register or log in the user, depending on the request
  try {
    const requestURL = 'http://localhost:3000/api/logout';
    const options = { method: 'POST' };
    // TODO: Figure out how to check for valid/invalid response objects
    return yield call(request, requestURL, options);
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: REQUEST_ERROR, error: error.message });
    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

// Side effects Services
function getAuthenticatedUser() {
  return JSON.parse(localStorage.getItem('authenticatedUser'));
}

function setAuthenticatedUser(authenticatedUser) {
  localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
}

function removeAuthenticatedUser() {
  localStorage.removeItem('authenticatedUser');
}

function* authorize(credentials) {
  let { authenticatedUser } = yield race({
    authenticatedUser: call(authServiceLogin, credentials),
    logout: take(LOGOUT),
  });
  // server responded (with Success) before user logged out
  if (authenticatedUser && authenticatedUser.email) {
    yield call(setAuthenticatedUser, authenticatedUser); // save to local storage
    yield put(authenticated(authenticatedUser));
    // Pushing default next route to to history to trigger react-router
    browserHistory.push('/write');
  } else {
    // user logged out before server response OR server responded first but with error
    yield call(logoutEffect, 'Error while logging in.');
    // TODO: This should probably yield an error
    authenticatedUser = null;
  }
  return authenticatedUser;
}

function* loginFlowSaga() {
  let authenticatedUser = yield call(getAuthenticatedUser); // retreive from local storage
  if (authenticatedUser) {
    yield put(authenticated(authenticatedUser));
  }

  while (true) { // eslint-disable-line no-constant-condition
    if (!authenticatedUser) {
      const { credentials } = yield take(LOGIN);
      authenticatedUser = yield call(authorize, credentials);
    }
    // authorization failed, wait the next login
    if (!authenticatedUser) {
      continue; // eslint-disable-line no-continue
    }
    while (authenticatedUser) {
      yield take(LOGOUT);
      yield call(logoutEffect);
    }
  }
}

function* logoutEffect() {
  // retreive from local storage
  const authenticatedUser = yield call(getAuthenticatedUser);
  yield call(authServiceLogout, authenticatedUser);
  yield call(removeAuthenticatedUser);
  yield put(deauthenticated());
}

function* logoutFlowSaga() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(LOGOUT);
    yield call(logoutEffect);
    browserHistory.push('/');
  }
}

// All sagas to be loaded
export {
  loginFlowSaga,
  logoutFlowSaga,
};
