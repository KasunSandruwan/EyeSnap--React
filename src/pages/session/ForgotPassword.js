import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Material ui imports
import { Button, TextField } from 'material-ui';

// Action imports
import { userForgotPassword } from '../../actions';

import { validateLoginForm } from '../helpers/validationHelpers';

// Custom styles
import { SessionCardContent, SessionCardActions, SessionButtonContainer } from './shared/styles';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validations: {
        emailValid: true
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
    const { email } = this.state;
    const { emailValid } = this.state.validations;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();

          this.props.userForgotPassword({
            email
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
          />
        </SessionCardContent>

        <SessionCardActions>
          <Button dense className="login-buttons" component={Link} to="/signup">
            New to EyeSnap?
          </Button>
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

export default connect(null, {
  userForgotPassword
})(ForgotPassword);
