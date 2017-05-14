// Ref: https://github.com/redux-saga/redux-saga/issues/14

let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage');
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage;
}

import { all, call, cancel, put, race, select, take, takeLatest } from 'redux-saga/effects'
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
    LOGIN_REQUEST,
    LOGIN,
    LOGOUT
  } from './constants';
import {
    REQUEST_ERROR,
    SENDING_REQUEST
  } from 'containers/App/constants';
import {
  authenticated,
  deauthenticated
} from './actions';
import request from 'utils/request';

/**
 * Effect to authorize user with backend
 */
export function * authServiceLogin(data) {
  // We send an action that tells Redux we're sending a request
  yield put({type: SENDING_REQUEST, sending: true});

  // We then try to register or log in the user, depending on the request
  try {
    const username = yield select(data.email());
    const password = yield select(data.password());

    const requestURL = 'http://localhost:3000/api/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    }

    // TODO: Figure out how to check for valid/invalid response objects
    return yield call(request, requestURL, options);
  } catch (error) {

    // If we get an error we send Redux the appropiate action and return
    yield put({type: REQUEST_ERROR, error: error.message})

    return false
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({type: SENDING_REQUEST, sending: false})
  }
}

/**
 * Effect to de-authorize user with backend
 */
function* authServiceLogout(authenticatedUser) {
  // We send an action that tells Redux we're sending a request
  yield put({type: SENDING_REQUEST, sending: true});

  // We then try to register or log in the user, depending on the request
  try {
    const requestURL = 'http://localhost:3000/api/logout';
    const options = {
      method: 'POST',
    }

    // TODO: Figure out how to check for valid/invalid response objects
    return yield call(request, requestURL, options);
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield put({type: REQUEST_ERROR, error: error.message});

    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({type: SENDING_REQUEST, sending: false})
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
  const {authenticatedUser} = yield race({
    authenticatedUser: call(authServiceLogin, credentials),
    logout : take(LOGOUT)
  })
  // server responded (with Success) before user logged out
  if(authenticatedUser && authenticatedUser.email) {
    yield call(setAuthenticatedUser, authenticatedUser); // save to local storage
    yield put(authenticated(authenticatedUser));

    // Pushing default next route to to history to trigger react-router
    browserHistory.push('/write');

    return authenticatedUser;
  }
  // user logged out before server response OR server responded first but with error
  else {
    yield call(logoutEffect, authenticatedUser ? error : 'User logged out');
    return null;
  }
}

function* loginFlowSaga() {
  let authenticatedUser = yield call(getAuthenticatedUser); // retreive from local storage

  if (authenticatedUser) {
    yield put(authenticated(authenticatedUser));
  }

  while(true) {
    if(!authenticatedUser) {
      let {credentials} = yield take(LOGIN);
      authenticatedUser = yield call(authorize, credentials);
    }

    // authorization failed, wait the next login
    if(!authenticatedUser)
        continue;

    while(authenticatedUser) {
      yield take(LOGOUT);
      authenticatedUser = null;
      yield call(logoutEffect);
    }
  }
}

function* logoutEffect(error) {
  console.log("Logout effect...");
  let authenticatedUser = yield call(getAuthenticatedUser); // retreive from local storage
  yield call(authServiceLogout, authenticatedUser);
  yield call(removeAuthenticatedUser);
  yield put(deauthenticated());
}

function* logoutFlowSaga() {
  while(true) {
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
