
import { fromJS } from 'immutable';
import writingPageReducer from '../reducer';

describe('writingPageReducer', () => {
  it('returns the initial state', () => {
    expect(writingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
