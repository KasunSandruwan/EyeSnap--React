import axios from 'axios';
import { API_BASE_URL } from '../config';
import { firebaseGetIDToken } from '../lib/firebase';
import showNotifications from '../lib/showNotifications';

export const deleteScanAPI = async (shortID) => {
  const idToken = await firebaseGetIDToken();

  try {
    await axios({
      method: 'DELETE',
      url: `${API_BASE_URL}scans`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      },
      data: {
        shortID
      }
    });

    showNotifications({ message: 'Scan successfully removed!' });
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};

export const editScanAPI = async (scan) => {
  const idToken = await firebaseGetIDToken();

  try {
    const scanData = await axios({
      method: 'PUT',
      url: `${API_BASE_URL}scans`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      },
      data: {
        scan
      }
    });

    showNotifications({ message: 'Scan successfully updated!' });

    return scanData;
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};
