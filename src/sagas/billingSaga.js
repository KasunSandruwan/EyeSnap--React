import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchAllSubscriptionPlans } from '../API/billingAPI';
import { createCompanyAPI } from '../API/companyAPI';

import {
  LOADING_START,
  LOADING_END,
  FETCHING_SUBSCRIPTION_PLANS,
  FETCHING_SUBSCRIPTION_PLANS_SUCCESS,
  FETCHING_SUBSCRIPTION_PLANS_FAIL,
  COMPLETING_SUBSCRIPTION,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_FAIL
} from '../actions/types';

// Fetch subscription plans
function* fetchSubscriptionPlans() {
  yield put({ type: LOADING_START });

  try {
    const data = yield call(fetchAllSubscriptionPlans);

    yield put({
      type: FETCHING_SUBSCRIPTION_PLANS_SUCCESS,
      payload: {
        subscriptionPlans: data.data
      }
    });
    yield put({ type: LOADING_END });
  } catch (error) {
    yield put({ type: FETCHING_SUBSCRIPTION_PLANS_FAIL });
    yield put({ type: LOADING_END });
  }
}

// Complete subscription and create company
function* completeSubscription(action) {
  yield put({ type: LOADING_START });

  try {
    const userCompaniesData = yield call(createCompanyAPI, action.payload);

    yield put({
      type: SUBSCRIPTION_SUCCESS,
      payload: {
        userCompanies: userCompaniesData.data
      }
    });
    yield put({ type: LOADING_END });
  } catch (error) {
    yield put({ type: SUBSCRIPTION_FAIL });
    yield put({ type: LOADING_END });
  }
}

function* billingSaga() {
  yield takeEvery(FETCHING_SUBSCRIPTION_PLANS, fetchSubscriptionPlans);
  yield takeEvery(COMPLETING_SUBSCRIPTION, completeSubscription);
}

export default billingSaga;
