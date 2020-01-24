import {
  FETCHING_SUBSCRIPTION_PLANS_SUCCESS,
  SELECT_SUBSCTIPTION_PLAN,
  SUBSCRIPTION_SUCCESS,
  CLEAR_SUBSCRIPTION_SUCCESS
} from '../actions/types';

const billingReducerInitialState = {
  subscriptionPlans: null,
  stripeSubscriptionID: null,
  subscriptionSuccess: null
};

export default (state = billingReducerInitialState, action) => {
  switch (action.type) {
    case FETCHING_SUBSCRIPTION_PLANS_SUCCESS:
      return {
        ...state,
        subscriptionPlans: action.payload.subscriptionPlans
      };
    case SELECT_SUBSCTIPTION_PLAN:
      return {
        ...state,
        stripeSubscriptionID: action.payload.stripeSubscriptionID
      };
    case SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        stripeSubscriptionID: null,
        subscriptionSuccess: true
      };
    case CLEAR_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionSuccess: null
      };

    default:
      return state;
  }
};
