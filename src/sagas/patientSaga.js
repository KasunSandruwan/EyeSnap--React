import { put, call, takeEvery } from 'redux-saga/effects';
import { addPatientAPI, editPatientAPI, deletePatientAPI } from '../API/patientAPI';

import {
  ADD_PATIENT,
  LOADING_START,
  LOADING_END,
  EDIT_PATIENT,
  DELETE_PATIENT
} from '../actions/types';

function* addPatient(action) {
  yield put({ type: LOADING_START });

  try {
    yield call(addPatientAPI, action.payload.patient);

    yield put({ type: LOADING_END });

    action.payload.history.push('/patients');
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

function* editPatient(action) {
  yield put({ type: LOADING_START });

  try {
    yield call(editPatientAPI, action.payload.patient);

    yield put({ type: LOADING_END });

    action.payload.history.push('/patients');
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

function* deletePatient(action) {
  yield put({ type: LOADING_START });

  try {
    yield call(deletePatientAPI, action.payload.slug);

    yield put({ type: LOADING_END });

    action.payload.callback();
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

function* userSaga() {
  yield takeEvery(ADD_PATIENT, addPatient);
  yield takeEvery(EDIT_PATIENT, editPatient);
  yield takeEvery(DELETE_PATIENT, deletePatient);
}

export default userSaga;
