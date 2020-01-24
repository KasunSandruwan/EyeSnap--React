import React, { Component } from 'react';
import { TextField, Typography, Grid, Button } from 'material-ui';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CountrySelect from '../../sharedComponents/CountrySelect';

import { validateAddCompanyForm } from '../helpers/validationHelpers';
import showNotifications from '../../lib/showNotifications';

// Action imports
import { addCompany } from '../../actions';

const ActionButtons = styled(Grid)`
  margin-top: 12px;
  margin-bottom: 9px;
`;

class AddCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      street: '',
      city: '',
      state: '',
      countryCode: 'AU',
      telephone: '',
      web: '',
      validations: {
        nameValid: null,
        streetValid: null,
        cityValid: null,
        stateValid: null,
        countryCodeValid: true,
        telephoneValid: null
      }
    };

    this.updateState = this.updateState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  updateState({ key, value }) {
    const { validations } = this.state;

    const newState = {};
    newState[key] = value;

    const newValidations = validateAddCompanyForm({ data: newState });

    newState.validations = {
      ...validations,
      ...newValidations
    };

    this.setState(newState);
  }

  submitForm(event) {
    event.preventDefault();

    const { name, street, city, state, countryCode, telephone, web, validations } = this.state;

    const company = {
      name,
      street,
      city,
      state,
      countryCode,
      telephone,
      web
    };

    const validationValues = Object.values(validations);
    let validationsPassed = true;

    validationValues.forEach((value) => {
      if (value !== true) {
        validationsPassed = false;
      }
    });

    if (validationsPassed) {
      this.props.addCompany(company);
      this.props.changeCurrentStep(1);
    } else {
      showNotifications({
        type: 'error',
        message: 'Please make sure your form does not have any errors!'
      });
    }
  }

  render() {
    const { name, street, city, state, countryCode, telephone, web, validations } = this.state;
    const {
      nameValid,
      streetValid,
      cityValid,
      stateValid,
      countryCodeValid,
      telephoneValid
    } = validations;

    return (
      <div>
        <Typography type="body1">Let&apos;s get started...</Typography>
        <Typography type="headline" component="h2">
          Step1: Add your Company
        </Typography>

        <br />

        <form onSubmit={this.submitForm}>
          <Grid container spacing={16} align="center" justify="center">
            <Grid item xs={12} sm={12}>
              <TextField
                required
                error={nameValid !== null && !nameValid}
                value={name}
                id="name"
                label="Company name"
                type="text"
                fullWidth
                onChange={(event) => {
                  this.updateState({
                    key: 'name',
                    value: event.target.value
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={streetValid !== null && !streetValid}
                value={street}
                id="street"
                label="Street name"
                type="text"
                fullWidth
                onChange={(event) => {
                  this.updateState({
                    key: 'street',
                    value: event.target.value
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={cityValid !== null && !cityValid}
                value={city}
                id="city"
                label="City"
                type="text"
                fullWidth
                onChange={(event) => {
                  this.updateState({
                    key: 'city',
                    value: event.target.value
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={stateValid !== null && !stateValid}
                value={state}
                id="state"
                label="State"
                type="text"
                fullWidth
                onChange={(event) => {
                  this.updateState({
                    key: 'state',
                    value: event.target.value
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CountrySelect
                required
                error={countryCodeValid !== null && !countryCodeValid}
                value={countryCode}
                onChange={(event) => {
                  this.updateState({
                    key: 'countryCode',
                    value: event.target.value
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={telephoneValid !== null && !telephoneValid}
                value={telephone}
                id="telephone"
                label="Telephone"
                type="text"
                fullWidth
                onChange={(event) => {
                  this.updateState({
                    key: 'telephone',
                    value: event.target.value
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={web}
                id="web"
                label="Website"
                type="text"
                fullWidth
                onChange={(event) => {
                  this.updateState({
                    key: 'web',
                    value: event.target.value
                  });
                }}
              />
            </Grid>

            <ActionButtons item>
              <Button raised color="primary" type="submit">
                Submit
              </Button>
            </ActionButtons>
          </Grid>
        </form>
      </div>
    );
  }
}

export default connect(null, {
  addCompany
})(AddCompany);
