import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import { ApolloProvider } from 'react-apollo';

// Material UI imports
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, red } from 'material-ui/colors';

// Redux imports
import reducers, { apolloClient } from './reducers';
import rootSaga from './sagas';

// Other imports
import ProgressBar from './ProgressBar';
import AppRoutes from './AppRoutes';

// Prepare the redux store
const sagaMiddleWare = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(sagaMiddleWare), autoRehydrate())
);
/* eslint-enable */

sagaMiddleWare.run(rootSaga);

// Main color theme
const theme = createMuiTheme({
  palette: {
    primary: {
      ...blue,
      500: '#4D87EE'
    },
    secondary: blue,
    error: red
  }
});

class App extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    const { rehydrated } = this.state;

    if (!rehydrated) {
      return <div />;
    }
    return (
      <ApolloProvider store={store} client={apolloClient}>
        <Router>
          <div className="App">
            <ProgressBar />

            <MuiThemeProvider theme={theme}>
              <div>
                <div id="container">
                  <AppRoutes />
                </div>
              </div>
            </MuiThemeProvider>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
