import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// Material ui imports
import { Button, TextField } from 'material-ui';

// Action imports
import { userLogin, userResetPassword } from '../../../actions';

import { validateResetPasswordForm } from '../../helpers/validationHelpers';

import showNotifications from '../../../lib/showNotifications';

// Custom styles
import { SessionCardContent, SessionCardActions, SessionButtonContainer } from '../shared/styles';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirmation: '',
      validations: {
        passwordValid: null,
        passwordConfirmationValid: null
      }
    };

    this.updateState = this.updateState.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  updateState({ key, value }) {
    const { validations, password } = this.state;

    const newState = {};
    newState[key] = value;

    const newValidations = validateResetPasswordForm({ data: newState, password });
    newState.validations = {
      ...validations,
      ...newValidations
    };

    this.setState(newState);
  }

  resetPassword(event) {
    event.preventDefault();

    const { password, validations } = this.state;
    const { passwordValid, passwordConfirmationValid } = validations;
    const { oobCode, history } = this.props;

    if (!passwordValid) {
      showNotifications({
        type: 'error',
        message: 'The password you entered is invalid! It should be at least 10 charachters long!'
      });
    } else if (!passwordConfirmationValid) {
      showNotifications({
        type: 'error',
        message: 'Your password and the password confirmation does not match!'
      });
    } else {
      this.props.userResetPassword({ password, oobCode, history });
    }
  }

  render() {
    const { password, passwordConfirmation } = this.state;
    const { passwordValid, passwordConfirmationValid } = this.state.validations;

    return (
      <form onSubmit={this.resetPassword}>
        <SessionCardContent>
          <TextField
            error={passwordValid !== null && !passwordValid}
            id="password"
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => {
              this.updateState({
                key: 'password',
                value: event.target.value
              });
            }}
          />

          <br />
          <br />

          <TextField
            error={passwordConfirmationValid !== null && !passwordConfirmationValid}
            id="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            fullWidth
            value={passwordConfirmation}
            onChange={(event) => {
              this.updateState({
                key: 'passwordConfirmation',
                value: event.target.value
              });
            }}
          />
        </SessionCardContent>

        <SessionCardActions>
          <Button dense className="login-buttons" component={Link} to="/login">
            Know Your Password?
          </Button>
          <SessionButtonContainer>
            <Button
              color="primary"
              raised
              type="submit"
              className="login-buttons main-login-button"
            >
              Reset Password
            </Button>
          </SessionButtonContainer>
        </SessionCardActions>
      </form>
    );
  }
}

export default withRouter(
  connect(null, {
    userLogin,
    userResetPassword
  })(ResetPassword)
);
