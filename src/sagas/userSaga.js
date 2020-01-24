import { put, call, takeEvery } from 'redux-saga/effects';
import {
  getUserCompaniesAPI,
  removeUserFromCompanyAPI,
  approveJoinRequestAPI,
  rejectJoinRequestAPI
} from '../API/userAPI';

import {
  LOADING_START,
  LOADING_END,
  GETTING_USER_COMPANIES,
  GETTING_USER_COMPANIES_SUCCESS,
  GETTING_USER_COMPANIES_FAIL,
  REMOVE_USER_FROM_COMPANY,
  REMOVING_USER_FROM_COMPANY_SUCCESS,
  REMOVING_USER_FROM_COMPANY_FAIL,
  APPROVE_JOIN_REQUEST,
  REJECT_JOIN_REQUEST
} from '../actions/types';

function* getUserCompanies() {
  yield put({ type: LOADING_START });

  try {
    const data = yield call(getUserCompaniesAPI);

    yield put({
      type: GETTING_USER_COMPANIES_SUCCESS,
      payload: {
        userCompanies: data.data
      }
    });
    yield put({ type: LOADING_END });
  } catch (error) {
    yield put({ type: GETTING_USER_COMPANIES_FAIL });
    yield put({ type: LOADING_END });
  }
}

function* approveJoinRequest(action) {
  yield put({ type: LOADING_START });
  const { callback, shortID, companyJoinRequestID } = action.payload;

  try {
    yield call(approveJoinRequestAPI, { shortID, companyJoinRequestID });

    callback();
    yield put({ type: LOADING_END });
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

function* rejectJoinRequest(action) {
  yield put({ type: LOADING_START });
  const { callback, companyJoinRequestID } = action.payload;

  try {
    yield call(rejectJoinRequestAPI, { companyJoinRequestID });

    callback();
    yield put({ type: LOADING_END });
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

function* removeUserFromCompany(action) {
  yield put({ type: LOADING_START });
  const { callback, userShortID, companyShortID } = action.payload;

  try {
    yield call(removeUserFromCompanyAPI, { userShortID, companyShortID });

    yield put({
      type: REMOVING_USER_FROM_COMPANY_SUCCESS
    });

    callback();
    yield put({ type: LOADING_END });
  } catch (error) {
    yield put({ type: REMOVING_USER_FROM_COMPANY_FAIL });
    yield put({ type: LOADING_END });
  }
}

function* userSaga() {
  yield takeEvery(GETTING_USER_COMPANIES, getUserCompanies);
  yield takeEvery(REMOVE_USER_FROM_COMPANY, removeUserFromCompany);
  yield takeEvery(APPROVE_JOIN_REQUEST, approveJoinRequest);
  yield takeEvery(REJECT_JOIN_REQUEST, rejectJoinRequest);
}

export default userSaga;
