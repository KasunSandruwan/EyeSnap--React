import { put, call, takeEvery } from 'redux-saga/effects';
import {
  firebaseAuth,
  firebaseLogout,
  firebaseForgotPassword,
  firebaseResetPassword
} from '../lib/firebase';
import { createUserAPI, getUserAPI, verifyUserAPI } from '../API/userAPI';

import {
  LOADING_START,
  LOADING_END,
  USER_LOGGING_IN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGGING_OUT,
  USER_LOGOUT,
  USER_FORGOT_PASSWORD,
  USER_SIGNING_UP,
  USER_SIGNUP_SUCCESS,
  VERIFYING_USER,
  USER_VERIFICATION_SUCCESS,
  USER_VERIFICATION_FAIL,
  USER_RESET_PASSWORD,
  USER_SIGNUP_FAIL
} from '../actions/types';

// User login
function* userLogin(action) {
  yield put({ type: LOADING_START });

  try {
    // Call firebase and authenticate the user
    yield call(firebaseAuth, action.payload);

    // Get user profile from the server
    const user = yield call(getUserAPI);

    yield put({ type: USER_LOGIN_SUCCESS, payload: { user } });
    yield put({ type: LOADING_END });
  } catch (error) {
    firebaseLogout(true);

    yield put({ type: USER_LOGIN_FAIL });
    yield put({ type: LOADING_END });
  }
}

// User forgotpassword
function* userForgotPassword(action) {
  yield put({ type: LOADING_START });

  try {
    yield call(firebaseForgotPassword, action.payload);

    yield put({ type: LOADING_END });
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

// User reset password
function* userResetPassword(action) {
  yield put({ type: LOADING_START });

  try {
    yield call(firebaseResetPassword, action.payload);

    yield put({ type: LOADING_END });
    action.payload.history.push('/login');
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

// User logout
function* userLogout() {
  yield put({ type: LOADING_START });

  try {
    yield call(firebaseLogout);

    yield put({ type: USER_LOGOUT });
  } catch (error) {
    yield put({ type: LOADING_END });
  }
}

// User signup
function* userSignup(action) {
  yield put({ type: LOADING_START });

  try {
    yield call(createUserAPI, action.payload);

    yield put({ type: LOADING_END });
    yield put({ type: USER_SIGNUP_SUCCESS });
  } catch (error) {
    yield put({ type: USER_SIGNUP_FAIL });
    yield put({ type: LOADING_END });
  }
}

// Verify user email
function* verifyUser(action) {
  try {
    yield call(verifyUserAPI, action.payload);

    yield put({ type: USER_VERIFICATION_SUCCESS });
  } catch (error) {
    yield put({ type: USER_VERIFICATION_FAIL });
  }
}

function* sessionSaga() {
  yield takeEvery(USER_LOGGING_IN, userLogin);
  yield takeEvery(USER_FORGOT_PASSWORD, userForgotPassword);
  yield takeEvery(USER_LOGGING_OUT, userLogout);
  yield takeEvery(USER_SIGNING_UP, userSignup);
  yield takeEvery(VERIFYING_USER, verifyUser);
  yield takeEvery(USER_RESET_PASSWORD, userResetPassword);
}

export default sessionSaga;
