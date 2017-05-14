
import {
  loginAction,
} from '../actions';
import {
  LOGIN_ACTION,
} from '../constants';

describe('LoginPage actions', () => {
  describe('Login Action', () => {
    it('has a type of LOGIN_ACTION', () => {
      const expected = {
        type: LOGIN_ACTION,
      };
      expect(loginAction()).toEqual(expected);
    });
  });
});
