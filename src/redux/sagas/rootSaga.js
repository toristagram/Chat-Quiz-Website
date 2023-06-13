import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataError } from '../actions';

function* fetchDataSaga(action) {
  try {
    const data = yield call();
    yield put(fetchDataSuccess(data)); 
  } catch (error) {
    yield put(fetchDataError(error)); 
  }
}

function* exampleSaga() {
  yield takeEvery('FETCH_DATA_REQUEST', fetchDataSaga);
}

export default exampleSaga;