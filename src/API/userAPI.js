import axios from 'axios';
import { API_BASE_URL } from '../config';
import { firebaseGetIDToken } from '../lib/firebase';
import showNotifications from '../lib/showNotifications';

export const getUserCompaniesAPI = async () => {
  const idToken = await firebaseGetIDToken();

  try {
    const userCompanyData = await axios({
      method: 'GET',
      url: `${API_BASE_URL}usercompany`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      }
    });

    return userCompanyData;
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};

export const resendVerificationEmail = async (uid) => {
  try {
    await axios({
      method: 'PUT',
      url: `${API_BASE_URL}users/resendverificationemail`,
      data: {
        uid
      }
    });
  } catch (error) {
    throw error;
  }
};

export const verifyUserAPI = async ({ oobCode }) => {
  try {
    await axios({
      method: 'PUT',
      url: `${API_BASE_URL}users/verify`,
      data: {
        verificationCode: oobCode
      }
    });

    showNotifications({ message: 'Your account is now verified! Please login.' });
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};

export const createUserAPI = async ({ user }) => {
  try {
    await axios({
      method: 'POST',
      url: `${API_BASE_URL}signup`,
      data: {
        user
      }
    });

    showNotifications({
      message: `Welcome to EyeSnap! Please check your inbox for the
      verification email.`
    });
  } catch (error) {
    if (
      error.response &&
      error.response.data.code &&
      error.response.data.code === 'email-already-exists'
    ) {
      showNotifications({
        type: 'error',
        message: 'Sorry we already have an account with that email!'
      });
    } else {
      showNotifications({
        type: 'error',
        message: 'Something went wrong! Please try again.'
      });
    }

    throw error;
  }
};

export const getUserAPI = async () => {
  try {
    const idToken = await firebaseGetIDToken();

    const userData = await axios({
      method: 'GET',
      url: `${API_BASE_URL}users`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      }
    });

    return userData.data.userProfile;
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};

export const removeUserFromCompanyAPI = async ({ userShortID, companyShortID }) => {
  try {
    const idToken = await firebaseGetIDToken();

    await axios({
      method: 'DELETE',
      url: `${API_BASE_URL}usercompanies`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      },
      data: {
        userShortID,
        companyShortID
      }
    });

    showNotifications({ message: 'User successfully removed from the company!' });
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};

export const approveJoinRequestAPI = async ({ shortID, companyJoinRequestID }) => {
  try {
    const idToken = await firebaseGetIDToken();

    await axios({
      method: 'PUT',
      url: `${API_BASE_URL}usercompanyjoinrequests`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      },
      data: {
        shortID,
        companyJoinRequestID
      }
    });

    showNotifications({ message: 'User successfully approved!' });
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};

export const rejectJoinRequestAPI = async ({ companyJoinRequestID }) => {
  try {
    const idToken = await firebaseGetIDToken();

    await axios({
      method: 'DELETE',
      url: `${API_BASE_URL}usercompanyjoinrequests`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      },
      data: {
        companyJoinRequestID
      }
    });

    showNotifications({ message: 'User successfully rejected!' });
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};
