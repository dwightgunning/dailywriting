import { createSelector } from 'reselect';

/**
 * Direct selector to the LoginPage state domain
 */
const selectLoginPageDomain = () => (state) => {
  return state.get('loginPage');
}

/**
 * Other specific selectors
 */

const makeSelectEmail = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('email')
)

const makeSelectPassword = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('password')
)

/**
 * Default selector used by LoginForm2Container
 */
const makeSelectLoginForm2Container = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.toJS()
);

export default selectLoginPageDomain;
export {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectLoginForm2Container,
  selectLoginPageDomain
}
