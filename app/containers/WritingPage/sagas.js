import { take, call, cancel, put, select, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
    REQUEST_ERROR,
    SENDING_REQUEST,
  } from 'constants';
import request from 'utils/request';
import { UPDATE_ENTRY } from './constants';
import { makeSelectWords } from './selectors';

/**
 * Effect to handle updating the entry
 */
export function* updateEntry() {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });

  try {
    // Select words from store
    const words = yield select(makeSelectWords());
    const requestURL = 'http://localhost:3000/api/words';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ words }),
    };
    yield call(request, requestURL, options);
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: REQUEST_ERROR, error: error.message });
    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
  return true;
}

/**
 * Log in saga
 */
function* updateEntryFlow() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(UPDATE_ENTRY, updateEntry);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  updateEntryFlow,
];
