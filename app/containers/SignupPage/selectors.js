import { createSelector } from 'reselect';

/**
 * Direct selector to the signupPage state domain
 */
const selectSignupPageDomain = () => (state) => state.get('signupPage');

/**
 * Other specific selectors
 */

const makeSelectEmail = () => createSelector(
  selectSignupPageDomain(),
  (signupState) => signupState.get('email')
);

const makeSelectPassword = () => createSelector(
  selectSignupPageDomain(),
  (signupState) => signupState.get('password')
);

/**
 * Default selector used by SignupPage
 */

const makeSelectSignupPage = () => createSelector(
  selectSignupPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSignupPage;
export {
  makeSelectSignupPage,
  makeSelectEmail,
  makeSelectPassword,
  selectSignupPageDomain,
};
