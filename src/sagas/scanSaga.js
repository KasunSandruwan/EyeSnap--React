import { put, call, takeEvery } from 'redux-saga/effects';
import { deleteScanAPI, editScanAPI } from '../API/scanAPI';

import { DELETE_SCAN, LOADING_START, LOADING_END, EDIT_SCAN } from '../actions/types';

function* editScan(action) {
  yield put({ type: LOADING_START });

  try {
    yield call(editScanAPI, action.payload.scan);

    yield put({ type: LOADING_END });

    action.payload.callback();
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

function* deleteScan(action) {
  yield put({ type: LOADING_START });

  try {
    yield call(deleteScanAPI, action.payload.shortID);

    yield put({ type: LOADING_END });

    action.payload.callback();
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

function* userSaga() {
  yield takeEvery(DELETE_SCAN, deleteScan);
  yield takeEvery(EDIT_SCAN, editScan);
}

export default userSaga;
