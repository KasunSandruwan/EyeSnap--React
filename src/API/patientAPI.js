import axios from 'axios';
import { API_BASE_URL } from '../config';
import { firebaseGetIDToken } from '../lib/firebase';
import showNotifications from '../lib/showNotifications';

export const addPatientAPI = async (patient) => {
  const idToken = await firebaseGetIDToken();

  try {
    const patientData = await axios({
      method: 'POST',
      url: `${API_BASE_URL}patients`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      },
      data: {
        patient
      }
    });

    showNotifications({ message: 'Patient successfully added!' });

    return patientData;
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};

export const editPatientAPI = async (patient) => {
  const idToken = await firebaseGetIDToken();

  try {
    const patientData = await axios({
      method: 'PUT',
      url: `${API_BASE_URL}patients`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      },
      data: {
        patient
      }
    });

    showNotifications({ message: 'Patient successfully updated!' });

    return patientData;
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};

export const deletePatientAPI = async (slug) => {
  const idToken = await firebaseGetIDToken();

  try {
    await axios({
      method: 'DELETE',
      url: `${API_BASE_URL}patients`,
      headers: {
        Authorization: `ApiKey ${idToken}`
      },
      data: {
        slug
      }
    });

    showNotifications({ message: 'Patient successfully removed!' });
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw error;
  }
};
