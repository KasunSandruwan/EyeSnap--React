import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';

// Material imports
import Card, { CardContent } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

import { validateAddPatientForm } from '../helpers/validationHelpers';
import showNotifications from '../../lib/showNotifications';

// Import actions
import { editPatient } from '../../actions';

// Shared components
import PatientForm from './shared/PatientForm';
import { BackButton, TitleWithButton } from '../shared/styles';

const LoadingContainer = styled(Paper)`
  text-align: center;
  padding: 21px;
`;

const PatientQuery = gql`
  query Patient($slug: String!) {
    patient(slug: $slug) {
      slug
      patientID
      dob
      firstName
      lastName
      gender
    }
  }
`;

class EditPatient extends Component {
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
      },
      dataLoaded: false
    };

    this.updateState = this.updateState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { patient } = nextProps;
    const { dataLoaded } = this.state;

    if (patient && !dataLoaded) {
      this.setState({
        patientID: patient.patientID,
        dob: patient.dob,
        firstName: patient.firstName,
        lastName: patient.lastName,
        gender: patient.gender,
        validations: {
          patientIDValid: true,
          dobValid: true,
          firstNameValid: true,
          lastNameValid: true
        },
        dataLoaded: true
      });
    }
  }

  submitForm(event) {
    event.preventDefault();

    const { history, patient: patientData } = this.props;
    const { patientID, dob, firstName, lastName, gender, validations } = this.state;

    const patient = {
      slug: patientData.slug,
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
      this.props.editPatient({ patient, history });
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
    const { loading, error, patient } = this.props;

    if (loading || error || !patient) {
      return (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      );
    }

    return (
      <div>
        <Card>
          <CardContent>
            <BackButton aria-label="Back" component={Link} to="/patients">
              <ArrowBackIcon />
            </BackButton>
            <TitleWithButton type="headline" component="h2">
              Update Patient
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
                actionButtonText="Update Patient"
              />
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const EditPatientWithGraphQL = graphql(PatientQuery, {
  options({ match }) {
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        slug: match.params.slug
      }
    };
  },
  props({ data: { loading, patient } }) {
    return {
      loading,
      patient
    };
  }
})(EditPatient);

export default withRouter(connect(null, { editPatient })(EditPatientWithGraphQL));
