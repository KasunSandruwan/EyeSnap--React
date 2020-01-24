import { GETTING_USER_COMPANIES_SUCCESS, SUBSCRIPTION_SUCCESS } from '../actions/types';

const sessionReducerInitialState = {
  userCompanies: null,
  userCompany: null
};

export default (state = sessionReducerInitialState, action) => {
  switch (action.type) {
    case GETTING_USER_COMPANIES_SUCCESS:
      return {
        ...state,
        userCompanies: action.payload.userCompanies,
        userCompany: action.payload.userCompanies[0]
      };
    case SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        userCompanies: action.payload.userCompanies,
        userCompany: action.payload.userCompanies[0]
      };

    default:
      return state;
  }
};
