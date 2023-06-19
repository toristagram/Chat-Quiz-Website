import { fetchDataSuccess, fetchDataError, handleChangeScore } from '../redux/actions';

describe('fetchDataSuccess', () => {
  it('should create an action with the FETCH_DATA_SUCCESS type and payload', () => {
    const data = { id: 1, name: 'Example' };
    const action = fetchDataSuccess(data);
    
    expect(action).toEqual({
      type: 'FETCH_DATA_SUCCESS',
      payload: data,
    });
  });
});

describe('fetchDataError', () => {
  it('should create an action with the FETCH_DATA_ERROR type and payload', () => {
    const error = 'Something went wrong';
    const action = fetchDataError(error);
    
    expect(action).toEqual({
      type: 'FETCH_DATA_ERROR',
      payload: error,
    });
  });
});

describe('handleChangeScore', () => {
  it('should create an action to change the score', () => {
    const score = 42;
    const expectedAction = {
      type: 'CHANGE_SCORE',
      payload: score,
    };
    const action = handleChangeScore(score);
    expect(action).toEqual(expectedAction);
  });
});