import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataError } from '../actions';
import API from '../api'; 

function* fetchDataSaga(action) {
  try {
    const data = yield call(API.fetchData);
    yield put(fetchDataSuccess(data)); 
  } catch (error) {
    yield put(fetchDataError(error)); 
  }
}

function* exampleSaga() {
  yield takeEvery('FETCH_DATA_REQUEST', fetchDataSaga);
}

export default exampleSaga;