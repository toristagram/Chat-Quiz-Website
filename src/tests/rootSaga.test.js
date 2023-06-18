import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataError } from '../redux/actions';
import exampleSaga, { fetchDataSaga } from '../redux/sagas/rootSaga/exampleSaga';

describe('fetchDataSaga', () => {
  it('should handle successful data fetch', () => {
    const action = { type: 'FETCH_DATA_REQUEST' };
    const data = { id: 1, name: 'Example' };
    const generator = fetchDataSaga(action);
    
    expect(generator.next().value).toEqual(call());
    expect(generator.next(data).value).toEqual(put(fetchDataSuccess(data)));
    expect(generator.next().done).toBe(true);
  });
  
  it('should handle data fetch error', () => {
    const action = { type: 'FETCH_DATA_REQUEST' };
    const error = 'Something went wrong';
    const generator = fetchDataSaga(action);
    
    expect(generator.next().value).toEqual(call());
    expect(generator.throw(error).value).toEqual(put(fetchDataError(error)));
    expect(generator.next().done).toBe(true);
  });
});

describe('exampleSaga', () => {
  it('should listen for FETCH_DATA_REQUEST action', () => {
    const generator = exampleSaga();
    
    expect(generator.next().value).toEqual(takeEvery('FETCH_DATA_REQUEST', fetchDataSaga));
    expect(generator.next().done).toBe(true);
  });
});