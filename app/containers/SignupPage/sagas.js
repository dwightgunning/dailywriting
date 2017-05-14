import {  call, cancel, put, select, take, takeLatest } from 'redux-saga/effects';
import { SIGNUP_REQUEST, } from './constants';
import {
    LOGOUT,
    REQUEST_ERROR,
    SENDING_REQUEST
  } from 'containers/App/constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  makeSelectEmail,
  makeSelectPassword }
from './selectors';
import request from 'utils/request';

// Individual exports for testing
export function* signup() {
  // We send an action that tells Redux we're sending a request
  yield put({type: SENDING_REQUEST, sending: true});

  // We then try to register or log in the user, depending on the request
  try {
    // Select username from store
    const username = yield select(makeSelectEmail());
    const password = yield select(makeSelectPassword());

    const requestURL = 'http://localhost:3000/api/signup';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    }

    yield call(request, requestURL, options);

    browserHistory.push('/thanks');
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
 * Signup saga
 */
function * signupFlow() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(SIGNUP_REQUEST, signup);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  signupFlow,
];
