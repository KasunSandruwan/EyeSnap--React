import { ADD_PATIENT, EDIT_PATIENT, DELETE_PATIENT } from '../actions/types';

export const addPatient = ({ patient, history }) => ({
  type: ADD_PATIENT,
  payload: {
    patient,
    history
  }
});

export const editPatient = ({ patient, history }) => ({
  type: EDIT_PATIENT,
  payload: {
    patient,
    history
  }
});

export const deletePatient = ({ slug, callback }) => ({
  type: DELETE_PATIENT,
  payload: {
    slug,
    callback
  }
});
