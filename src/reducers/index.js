import { combineReducers } from 'redux';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

import sessionReducer from './sessionReducer';
import companyReducer from './companyReducer';
import coreReducer from './coreReducer';
import billingReducer from './billingReducer';
import userReducer from './userReducer';

import { firebase, firebaseGetIDToken } from '../lib/firebase';

import { USER_LOGOUT } from '../actions/types';

import { QUERY_API_BASE_URL } from '../config';

const networkInterface = createNetworkInterface({
  uri: `${QUERY_API_BASE_URL}graphql`
});

networkInterface.use([
  {
    applyMiddleware: async (req, next) => {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      await firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const token = await firebaseGetIDToken();

          req.options.headers.authorization = token ? `ApiKey ${token}` : null;
          next();
        }
      });
    }
  }
]);

export const apolloClient = new ApolloClient({
  networkInterface
});

const appReducer = combineReducers({
  session: sessionReducer,
  company: companyReducer,
  core: coreReducer,
  billing: billingReducer,
  user: userReducer,
  apollo: apolloClient.reducer()
});

export default (state, action) => {
  if (action.type === USER_LOGOUT) {
    return appReducer(undefined, action);
  }

  // eslint-disable-next-line consistent-return
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      return appReducer(undefined, action);
    }
  });

  return appReducer(state, action);
};
