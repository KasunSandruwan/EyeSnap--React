import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// Material imports
import Card, { CardContent } from 'material-ui/Card';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

import { validateAddPatientForm } from '../helpers/validationHelpers';
import showNotifications from '../../lib/showNotifications';

// Import actions
import { addPatient } from '../../actions';

// Shared components
import PatientForm from './shared/PatientForm';
import { BackButton, TitleWithButton } from '../shared/styles';

class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientID: '',
      dob: '',
      firstName: '',
      lastName: '',
      gender: 'male',
      validations: {
        patientIDValid: null,
        dobValid: null,
        firstNameValid: null,
        lastNameValid: null
      }
    };

    this.updateState = this.updateState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();

    const { history } = this.props;
    const { patientID, dob, firstName, lastName, gender, validations } = this.state;

    const patient = {
      patientID,
      dob,
      firstName,
      lastName,
      gender,
      validations
    };

    const validationValues = Object.values(validations);
    let validationsPassed = true;

    validationValues.forEach((value) => {
      if (value !== true) {
        validationsPassed = false;
      }
    });

    if (validationsPassed) {
      this.props.addPatient({ patient, history });
    } else {
      showNotifications({
        type: 'error',
        message: 'Please make sure your form does not have any errors!'
      });
    }
  }

  updateState({ key, value }) {
    const { validations } = this.state;

    const newState = {};
    newState[key] = value;

    const newValidations = validateAddPatientForm({ data: newState });

    newState.validations = {
      ...validations,
      ...newValidations
    };

    this.setState(newState);
  }

  render() {
    const { patientID, dob, firstName, lastName, gender, validations } = this.state;
    const { patientIDValid, dobValid, firstNameValid, lastNameValid } = validations;

    return (
      <div>
        <Card>
          <CardContent>
            <BackButton aria-label="Back" component={Link} to="/patients">
              <ArrowBackIcon />
            </BackButton>
            <TitleWithButton type="headline" component="h2">
              Add New Patient
            </TitleWithButton>
            <br />
            <form onSubmit={this.submitForm}>
              <PatientForm
                patientIDValid={patientIDValid}
                patientID={patientID}
                dobValid={dobValid}
                dob={dob}
                firstNameValid={firstNameValid}
                firstName={firstName}
                lastNameValid={lastNameValid}
                lastName={lastName}
                gender={gender}
                updateState={this.updateState}
                actionButtonText="Create New Patient"
              />
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withRouter(connect(null, { addPatient })(AddPatient));
