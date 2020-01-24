import {
  FETCHING_SUBSCRIPTION_PLANS,
  SELECT_SUBSCTIPTION_PLAN,
  COMPLETING_SUBSCRIPTION,
  CLEAR_SUBSCRIPTION_SUCCESS
} from '../actions/types';

export const fetchSubscriptionPlans = () => ({
  type: FETCHING_SUBSCRIPTION_PLANS
});

export const selectSubscriptionPlan = stripeSubscriptionID => ({
  type: SELECT_SUBSCTIPTION_PLAN,
  payload: { stripeSubscriptionID }
});

export const completeSubscription = ({
  token,
  stripeSubscriptionID,
  company
}) => ({
  type: COMPLETING_SUBSCRIPTION,
  payload: {
    token,
    stripeSubscriptionID,
    company
  }
});

export const clearSubscriptionSuccess = () => ({
  type: CLEAR_SUBSCRIPTION_SUCCESS
});
