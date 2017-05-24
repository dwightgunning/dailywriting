import {
  CLEAR_ERROR,
  REQUEST_ERROR,
  SENDING_REQUEST,
} from './constants';

export function clearError() {
  return { type: CLEAR_ERROR };
}

export function requestError(error) {
  return { type: REQUEST_ERROR, error };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}
