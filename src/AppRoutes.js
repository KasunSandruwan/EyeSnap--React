import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

// Pages
import {
  Home,
  Login,
  ForgotPassword,
  Signup,
  AuthFunctions,
  GettingStarted,
  AddPatient,
  Patients,
  EditPatient,
  Scans,
  Users
} from './pages';

// Container imports
import MainAppContainer from './MainAppContainer';
import SessionContainer from './SessionContainer';

const AppRoutes = ({ user, location }) => {
  if (user) {
    return (
      <MainAppContainer location={location}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/gettingstarted" component={GettingStarted} />

          {/* Patient routes */}
          <Route path="/patients/add" component={AddPatient} />
          <Route path="/patients/:slug/edit" component={EditPatient} />
          <Route path="/patients" component={Patients} />

          {/* Scan routes */}
          <Route path="/scans" component={Scans} />

          {/* User routes */}
          <Route path="/users" component={Users} />

          <Redirect to="/" from="/login" push />
          <Redirect to="/" from="/forgotpassword" push />
        </Switch>
      </MainAppContainer>
    );
  }
  return (
    <div>
      <SessionContainer location={location}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/authfunctions" component={AuthFunctions} />
          <Redirect to="/login" push />
        </Switch>
      </SessionContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.session;

  return {
    user
  };
};

export default withRouter(connect(mapStateToProps)(AppRoutes));
