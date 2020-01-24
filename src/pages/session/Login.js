import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Material ui imports
import { Button, TextField } from 'material-ui';

// Action imports
import { userLogin } from '../../actions';

import { validateLoginForm } from '../helpers/validationHelpers';

// Custom styles
import { SessionCardContent, SessionCardActions, SessionButtonContainer } from './shared/styles';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validations: {
        emailValid: true,
        passwordValid: true
      }
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState({ key, value }) {
    const { validations } = this.state;

    const newState = {};
    newState[key] = value;

    const newValidations = validateLoginForm(newState);
    newState.validations = {
      ...validations,
      ...newValidations
    };

    this.setState(newState);
  }

  render() {
    const { email, password } = this.state;
    const { emailValid, passwordValid } = this.state.validations;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();

          this.props.userLogin({
            email,
            password
          });
        }}
      >
        <SessionCardContent>
          <TextField
            error={!emailValid}
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
            error={!passwordValid}
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
        </SessionCardContent>

        <SessionCardActions>
          <Button dense className="login-buttons" component={Link} to="/signup">
            New to EyeSnap?
          </Button>
          <Button dense className="login-buttons" component={Link} to="/forgotpassword">
            Forgot Password?
          </Button>
          <SessionButtonContainer>
            <Button
              color="primary"
              raised
              type="submit"
              className="login-buttons main-login-button"
            >
              Login
            </Button>
          </SessionButtonContainer>
        </SessionCardActions>
      </form>
    );
  }
}

export default connect(null, {
  userLogin
})(Login);
