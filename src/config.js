// App
export const API_BASE_URL = 'http://localhost:8000/';
// export const API_BASE_URL = 'https://stagingapi.eyesnap.cloud/';
export const QUERY_API_BASE_URL = 'http://localhost:8080/';
// export const QUERY_API_BASE_URL = 'https://stagingqueryapi.eyesnap.cloud/';

export const ITEMS_PER_PAGE = 20;

// Firebase
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyD8g8tJiJkScbJddhoxi0k0tYgD6Tj4oho',
  authDomain: 'eyesnap-dev.firebaseapp.com',
  databaseURL: 'https://eyesnap-dev.firebaseio.com',
  projectId: 'eyesnap-dev',
  storageBucket: 'eyesnap-dev.appspot.com',
  messagingSenderId: '683145811322'
};
export const FIREBASE_LOGIN_ERROR_CODES = [
  'auth/invalid-email',
  'auth/user-disabled',
  'auth/user-not-found',
  'auth/wrong-password'
];

// Stripe
export const STRIPE_API_KEY = 'pk_test_pXVB1AWRTn6enHVjwDXVHoGb';
