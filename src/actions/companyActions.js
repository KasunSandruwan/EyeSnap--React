import {
  ADD_COMPANY
} from '../actions/types';

export const addCompany = company => ({
  type: ADD_COMPANY,
  payload: {
    company
  }
});
