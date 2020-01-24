import { DELETE_SCAN, EDIT_SCAN } from '../actions/types';

export const deleteScan = ({ shortID, callback }) => ({
  type: DELETE_SCAN,
  payload: {
    shortID,
    callback
  }
});

export const editScan = ({ scan, callback }) => ({
  type: EDIT_SCAN,
  payload: {
    scan,
    callback
  }
});
