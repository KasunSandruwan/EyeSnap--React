import {
  USER_LOGGING_IN,
  USER_LOGGING_OUT,
  USER_FORGOT_PASSWORD,
  USER_SIGNING_UP,
  CLEAR_USER_SIGNUP_SUCCESS,
  VERIFYING_USER,
  CLEAR_USER_VERIFICATION_SUCCESS,
  USER_RESET_PASSWORD
} from '../actions/types';

export const userLogin = ({ email, password }) => ({
  type: USER_LOGGING_IN,
  payload: {
    email,
    password
  }
});

export const userForgotPassword = ({ email }) => ({
  type: USER_FORGOT_PASSWORD,
  payload: {
    email
  }
});

export const userResetPassword = ({ password, oobCode, history }) => ({
  type: USER_RESET_PASSWORD,
  payload: {
    password,
    oobCode,
    history
  }
});

export const userLogout = () => ({
  type: USER_LOGGING_OUT
});

export const userSignup = user => ({
  type: USER_SIGNING_UP,
  payload: {
    user
  }
});

export const clearUserSignupSuccess = () => ({
  type: CLEAR_USER_SIGNUP_SUCCESS
});

export const clearUserVerificationSuccess = () => ({
  type: CLEAR_USER_VERIFICATION_SUCCESS
});

export const verifyUser = oobCode => ({
  type: VERIFYING_USER,
  payload: {
    oobCode
  }
});
