import { all } from 'redux-saga/effects';

import sessionSaga from './sessionSaga';
import billingSaga from './billingSaga';
import userSaga from './userSaga';
import patientSaga from './patientSaga';
import scanSaga from './scanSaga';

export default function* RootSaga() {
  yield all([sessionSaga(), billingSaga(), userSaga(), patientSaga(), scanSaga()]);
}
