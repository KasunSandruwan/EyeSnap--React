import axios from 'axios';
import { API_BASE_URL } from '../config';
import { firebaseGetIDToken } from '../lib/firebase';
import showNotifications from '../lib/showNotifications';

export const createCompanyAPI = async (data) => {
  const idToken = await firebaseGetIDToken();

  try {
    const userCompaniesData = await axios({
      method: 'POST',
      url: `${API_BASE_URL}companies`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      },
      data: {
        ...data
      }
    });

    showNotifications({ message: 'Company successfully added!' });
    return userCompaniesData;
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};
