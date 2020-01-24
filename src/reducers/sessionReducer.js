import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_SUCCESS,
  CLEAR_USER_SIGNUP_SUCCESS,
  USER_VERIFICATION_SUCCESS,
  CLEAR_USER_VERIFICATION_SUCCESS,
  USER_SIGNUP_FAIL
} from '../actions/types';

const sessionReducerInitialState = {
  user: null,
  loginError: false,
  userSignupSuccess: null,
  userVerificationSuccess: null
};

export default (state = sessionReducerInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.payload.user
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: true,
        user: null
      };
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        user: null
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        userSignupSuccess: true
      };
    case CLEAR_USER_SIGNUP_SUCCESS:
      return {
        ...state,
        userSignupSuccess: null
      };
    case USER_VERIFICATION_SUCCESS:
      return {
        ...state,
        userVerificationSuccess: true
      };
    case CLEAR_USER_VERIFICATION_SUCCESS:
      return {
        ...state,
        userVerificationSuccess: null
      };
    default:
      return state;
  }
};
