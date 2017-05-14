import { createSelector } from 'reselect';

/**
 * Direct selector to the authenticatedUser state domain
 */
const selectAuth = (state) => state.get('auth');
const selectAuthenticatedUser = (authState) => authState.get('authenticatedUser');
/**
 * Select the language locale
 */

const makeSelectAuthenticatedUser = () => createSelector(
  selectAuth,
  selectAuthenticatedUser
);

export {
  selectAuth,
  makeSelectAuthenticatedUser,
};
