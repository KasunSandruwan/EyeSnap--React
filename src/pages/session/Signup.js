import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// Material ui imports
import { Button, TextField } from 'material-ui';

// Action imports
import { userSignup, clearUserSignupSuccess } from '../../actions';

import showNotifications from '../../lib/showNotifications';
import { validateSignupForm } from '../helpers/validationHelpers';

// Custom styles
import { SessionCardContent, SessionCardActions, SessionButtonContainer } from './shared/styles';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      validations: {
        emailValid: null,
        passwordValid: null,
        passwordConfirmationValid: null,
        firstNameValid: null,
        lastNameValid: null
      }
    };

    this.updateState = this.updateState.bind(this);
    this.validateAndSignupUser = this.validateAndSignupUser.bind(this);
  }

  updateState({ key, value }) {
    const { validations, password } = this.state;

    const newState = {};
    newState[key] = value;

    const newValidations = validateSignupForm({ data: newState, password });

    newState.validations = {
      ...validations,
      ...newValidations
    };

    this.setState(newState);
  }

  validateAndSignupUser() {
    const { email, password, passwordConfirmation, firstName, lastName } = this.state;
    const {
      emailValid,
      passwordValid,
      passwordConfirmationValid,
      firstNameValid,
      lastNameValid
    } = this.state.validations;

    if (
      emailValid &&
      passwordValid &&
      passwordConfirmationValid &&
      firstNameValid &&
      lastNameValid
    ) {
      this.props.userSignup({
        email,
        password,
        passwordConfirmation,
        firstName,
        lastName
      });
    } else {
      showNotifications({
        type: 'error',
        message: 'Please make sure your form does not have any errors!'
      });
    }
  }

  render() {
    const { email, password, passwordConfirmation, firstName, lastName } = this.state;

    const {
      emailValid,
      passwordValid,
      passwordConfirmationValid,
      firstNameValid,
      lastNameValid
    } = this.state.validations;

    const { userSignupSuccess } = this.props;

    if (!userSignupSuccess) {
      return (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            this.validateAndSignupUser();
          }}
        >
          <SessionCardContent>
            <TextField
              error={firstNameValid !== null && !firstNameValid}
              id="firstName"
              label="First name"
              type="text"
              fullWidth
              value={firstName}
              onChange={(event) => {
                this.updateState({
                  key: 'firstName',
                  value: event.target.value
                });
              }}
              helperText={
                firstNameValid !== null && !firstNameValid && 'Please fill the first name!'
              }
            />

            <br />
            <br />

            <TextField
              error={lastNameValid !== null && !lastNameValid}
              id="lastName"
              label="Last name"
              type="text"
              fullWidth
              value={lastName}
              onChange={(event) => {
                this.updateState({
                  key: 'lastName',
                  value: event.target.value
                });
              }}
              helperText={lastNameValid !== null && !lastNameValid && 'Please fill the last name!'}
            />

            <br />
            <br />

            <TextField
              error={emailValid !== null && !emailValid}
              id="email"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(event) => {
                this.updateState({
                  key: 'email',
                  value: event.target.value
                });
              }}
              helperText={emailValid !== null && !emailValid && 'Please add a valid email!'}
            />

            <br />
            <br />

            <TextField
              error={passwordValid !== null && !passwordValid}
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(event) => {
                this.updateState({
                  key: 'password',
                  value: event.target.value
                });
              }}
              helperText={
                passwordValid !== null &&
                !passwordValid &&
                'Please make sure your password is at least 10 charachters long!'
              }
            />

            <br />
            <br />

            <TextField
              error={passwordConfirmationValid !== null && !passwordConfirmationValid}
              id="passwordConfirmation"
              label="Password confirmation"
              type="password"
              fullWidth
              value={passwordConfirmation}
              onChange={(event) => {
                this.updateState({
                  key: 'passwordConfirmation',
                  value: event.target.value
                });
              }}
              helperText={
                passwordConfirmationValid !== null &&
                !passwordConfirmationValid &&
                'Please make sure the confirm password match your password!'
              }
            />
          </SessionCardContent>

          <SessionCardActions>
            <Button dense className="login-buttons" component={Link} to="/login">
              Already a user?
            </Button>
            <SessionButtonContainer>
              <Button
                color="primary"
                raised
                type="submit"
                className="login-buttons main-login-button"
              >
                Signup
              </Button>
            </SessionButtonContainer>
          </SessionCardActions>
        </form>
      );
    }

    this.props.clearUserSignupSuccess();

    return <Redirect to="/login" />;
  }
}

const mapStateToProps = (state) => {
  const { userSignupSuccess } = state.session;

  return {
    userSignupSuccess
  };
};

export default connect(mapStateToProps, {
  userSignup,
  clearUserSignupSuccess
})(Signup);
