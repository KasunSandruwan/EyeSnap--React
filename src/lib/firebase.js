import firebase from 'firebase';

import { FIREBASE_CONFIG, FIREBASE_LOGIN_ERROR_CODES } from '../config';

import showNotifications from './showNotifications';

import { resendVerificationEmail } from '../API/userAPI';

firebase.initializeApp(FIREBASE_CONFIG);

const firebaseAuth = async ({ email, password }) => {
  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);

    if (user.emailVerified) {
      showNotifications({ message: 'Welcome to EyeSnap!' });
      return user;
    }

    showNotifications({
      type: 'error',
      message: `Please verify your email first! Do you want us to send the
      verification email again?`,
      actionButtonText: 'Yes Please',
      action: async () => {
        try {
          await resendVerificationEmail(user.uid);

          showNotifications({
            message: `We re-sent your verification email!
              Please check your inbox.`
          });
        } catch (error) {
          showNotifications({
            type: 'error',
            message: 'Something went wrong! Please try again.'
          });
        }

        firebase.auth().signOut();
      },
      onClosing: () => {
        firebase.auth().signOut();
      }
    });

    throw new Error('login/email_not_verified');
  } catch (error) {
    if (error && FIREBASE_LOGIN_ERROR_CODES.includes(error.code)) {
      showNotifications({
        type: 'error',
        message: 'You have entered an invalid email or password. Please try again.'
      });
    } else if (error && !error.message === 'login/email_not_verified') {
      showNotifications({
        type: 'error',
        message: 'Something went wrong! Please try again.'
      });
    }

    throw new Error('error');
  }
};

const firebaseForgotPassword = async ({ email }) => {
  const showSuccessNotification = () => {
    showNotifications({
      message: 'If your email is registered with EyeSnap, you will receive an email in a moment.'
    });
  };

  try {
    await firebase.auth().sendPasswordResetEmail(email);

    showSuccessNotification();
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      showSuccessNotification();
    } else if (error.code === 'auth/invalid-email') {
      showNotifications({
        type: 'error',
        message: 'You have entered an invalid email. Please try again.'
      });
    } else {
      showNotifications({
        type: 'error',
        message: 'Something went wrong! Please try again.'
      });
    }

    throw new Error('error');
  }
};

const firebaseLogout = async (silent) => {
  try {
    await firebase.auth().signOut();

    if (!silent) {
      showNotifications({ message: 'See you soon!' });
    }
  } catch (error) {
    if (!silent) {
      showNotifications({
        type: 'error',
        message: 'Something went wrong! Please try again.'
      });
    }

    throw new Error('error');
  }
};

const sendVerificationEmail = async ({ user }) => {
  const { email, password } = user;

  try {
    const firebaseUser = await firebase.auth().signInWithEmailAndPassword(email, password);

    await firebaseUser.sendEmailVerification();

    await firebase.auth().signOut();

    showNotifications({
      message: `Welcome to EyeSnap! Please check your inbox for the
        verification email.`
    });
  } catch (error) {
    throw error;
  }
};

const fireabseVerifyUser = async ({ oobCode }) => {
  await firebase
    .auth()
    .applyActionCode(oobCode)
    .then(() => {
      showNotifications({ message: 'Your account is now verified! Please login.' });
    })
    .catch(() => {
      showNotifications({
        type: 'error',
        message: 'Something went wrong! Please try again.'
      });

      throw new Error('error');
    });
};

const firebaseResetPassword = async ({ oobCode, password }) => {
  await firebase
    .auth()
    .confirmPasswordReset(oobCode, password)
    .then(() => {
      showNotifications({ message: 'Your password has been updated!' });
    })
    .catch(() => {
      showNotifications({
        type: 'error',
        message: 'Something went wrong! Please try again.'
      });

      throw new Error('error');
    });
};

const firebaseGetIDToken = async () => {
  try {
    const currentUser = await firebase.auth().currentUser;

    if (currentUser) {
      const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
      return idToken;
    }

    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw new Error('error');
  } catch (error) {
    showNotifications({
      type: 'error',
      message: 'Something went wrong! Please try again.'
    });

    throw new Error('error');
  }
};

const firebaseOnAuthStateChanged = async (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback();
    } else {
      showNotifications({
        type: 'error',
        message: 'Something went wrong! Please try again.'
      });

      throw new Error('error');
    }
  });
};

export {
  firebase,
  firebaseAuth,
  firebaseLogout,
  firebaseForgotPassword,
  sendVerificationEmail,
  fireabseVerifyUser,
  firebaseGetIDToken,
  firebaseOnAuthStateChanged,
  firebaseResetPassword
};
export default firebase;
