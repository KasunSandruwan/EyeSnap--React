import {
  GETTING_USER_COMPANIES,
  REMOVE_USER_FROM_COMPANY,
  APPROVE_JOIN_REQUEST,
  REJECT_JOIN_REQUEST
} from './types';

export const getUserCompanies = () => ({
  type: GETTING_USER_COMPANIES
});

export const removeUserFromCompany = payload => ({
  type: REMOVE_USER_FROM_COMPANY,
  payload
});

export const approveJoinRequest = payload => ({
  type: APPROVE_JOIN_REQUEST,
  payload
});

export const rejectJoinRequest = payload => ({
  type: REJECT_JOIN_REQUEST,
  payload
});
