import React from 'react';
import styled from 'styled-components';

// Material imports
import { Grid } from 'material-ui';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

const ActionButtons = styled(Grid)`
  margin-top: 12px;
  margin-bottom: 9px;
`;

const PaientForm = ({
  patientIDValid,
  patientID,
  dobValid,
  dob,
  firstNameValid,
  firstName,
  lastNameValid,
  lastName,
  gender,
  updateState,
  actionButtonText
}) => (
  <div>
    <Grid container spacing={16}>
      <Grid item xs={12} sm={6}>
        <TextField
          error={patientIDValid !== null && !patientIDValid}
          value={patientID}
          onChange={(event) => {
            updateState({
              key: 'patientID',
              value: event.target.value
            });
          }}
          required
          id="patient-id"
          label="Patient ID"
          type="text"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={dobValid !== null && !dobValid}
          value={dob}
          onChange={(event) => {
            updateState({
              key: 'dob',
              value: event.target.value
            });
          }}
          InputLabelProps={{
            shrink: true
          }}
          required
          id="dob"
          label="Date of Birth"
          type="date"
          fullWidth
        />
      </Grid>
    </Grid>

    <Grid container spacing={16}>
      <Grid item xs={12} sm={6}>
        <TextField
          error={firstNameValid !== null && !firstNameValid}
          value={firstName}
          onChange={(event) => {
            updateState({
              key: 'firstName',
              value: event.target.value
            });
          }}
          required
          id="first-name"
          label="First Name"
          type="text"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={lastNameValid !== null && !lastNameValid}
          value={lastName}
          onChange={(event) => {
            updateState({
              key: 'lastName',
              value: event.target.value
            });
          }}
          required
          id="last-name"
          label="Last Name"
          type="text"
          fullWidth
        />
      </Grid>
    </Grid>

    <br />
    <br />

    <Grid container spacing={16}>
      <Grid item xs={12} sm={12}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            value={gender}
            onChange={(event, value) => {
              updateState({
                key: 'gender',
                value
              });
            }}
            aria-label="gender"
            name="gender"
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>

    <Grid container spacing={16} align="center" justify="center">
      <ActionButtons item>
        <Button raised color="primary" type="submit">
          {actionButtonText}
        </Button>
      </ActionButtons>
    </Grid>
  </div>
);

export default PaientForm;
