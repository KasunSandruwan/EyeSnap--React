import { ADD_COMPANY, SUBSCRIPTION_SUCCESS } from '../actions/types';

const companyReducerInitialState = {
  company: null
};

export default (state = companyReducerInitialState, action) => {
  switch (action.type) {
    case ADD_COMPANY:
      return {
        ...state,
        company: action.payload.company
      };
    case SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        company: null
      };

    default:
      return state;
  }
};
