import toDate from 'validator/lib/toDate';
import isEmpty from 'validator/lib/isEmpty';

const presenceCheck = ({ data, key }) => {
  const validationOutput = {};

  if (Object.prototype.hasOwnProperty.call(data, key)) {
    validationOutput[`${key}Valid`] = !isEmpty(data[key]);
  }

  return validationOutput;
};

const validatePasswordConfirmation = ({ data, password }) => {
  const validationOutput = {};

  if (Object.prototype.hasOwnProperty.call(data, 'passwordConfirmation')) {
    if (data.passwordConfirmation === password) {
      validationOutput.passwordConfirmationValid = true;
    } else {
      validationOutput.passwordConfirmationValid = false;
    }
  }

  return validationOutput;
};

const validatePassword = (data) => {
  const validationOutput = {};

  if (Object.prototype.hasOwnProperty.call(data, 'password')) {
    if (data.password === '' || data.password.length < 10) {
      validationOutput.passwordValid = false;
    } else {
      validationOutput.passwordValid = true;
    }
  }

  return validationOutput;
};

const validateEmail = (data) => {
  const validationOutput = {};

  if (Object.prototype.hasOwnProperty.call(data, 'email')) {
    const emailRegEx = /\S+@\S+\.\S+/;
    if (!emailRegEx.test(data.email)) {
      validationOutput.emailValid = false;
    } else {
      validationOutput.emailValid = true;
    }
  }

  return validationOutput;
};

const validateDate = ({ data, key }) => {
  const validationOutput = {};

  if (Object.prototype.hasOwnProperty.call(data, key)) {
    validationOutput[`${key}Valid`] = Boolean(toDate(data[key]));
  }

  return validationOutput;
};

// Validation forms

export const validateLoginForm = (data) => {
  let validationOutput = {};

  const passwordValidationOutput = validatePassword(data, validationOutput);
  validationOutput = Object.assign(validationOutput, passwordValidationOutput);

  const emailValidationOutput = validateEmail(data, validationOutput);
  validationOutput = Object.assign(validationOutput, emailValidationOutput);

  return validationOutput;
};

export const validateSignupForm = ({ data, password }) => {
  let validationOutput = {};

  const firstNameValidationOutput = presenceCheck({ data, key: 'firstName' });
  validationOutput = Object.assign(validationOutput, firstNameValidationOutput);

  const lastNameValidationOutput = presenceCheck({ data, key: 'lastName' });
  validationOutput = Object.assign(validationOutput, lastNameValidationOutput);

  const passwordValidationOutput = validatePassword(data);
  validationOutput = Object.assign(validationOutput, passwordValidationOutput);

  const passwordConfirmationValidationOutput = validatePasswordConfirmation({ data, password });
  validationOutput = Object.assign(validationOutput, passwordConfirmationValidationOutput);

  const emailValidationOutput = validateEmail(data);
  validationOutput = Object.assign(validationOutput, emailValidationOutput);

  return validationOutput;
};

export const validateAddCompanyForm = ({ data }) => {
  let validationOutput = {};

  const nameValidationOutput = presenceCheck({ data, key: 'name' });
  validationOutput = Object.assign(validationOutput, nameValidationOutput);

  const streetValidationOutput = presenceCheck({ data, key: 'street' });
  validationOutput = Object.assign(validationOutput, streetValidationOutput);

  const cityValidationOutput = presenceCheck({ data, key: 'city' });
  validationOutput = Object.assign(validationOutput, cityValidationOutput);

  const stateValidationOutput = presenceCheck({ data, key: 'state' });
  validationOutput = Object.assign(validationOutput, stateValidationOutput);

  const countryValidationOutput = presenceCheck({ data, key: 'country' });
  validationOutput = Object.assign(validationOutput, countryValidationOutput);

  const telephoneValidationOutput = presenceCheck({ data, key: 'telephone' });
  validationOutput = Object.assign(validationOutput, telephoneValidationOutput);

  return validationOutput;
};

export const validateAddPatientForm = ({ data }) => {
  let validationOutput = {};

  const patientIDValidationOutput = presenceCheck({ data, key: 'patientID' });

  const dobValidationOutput = validateDate({ data, key: 'dob' });

  const firstNameValidationOutput = presenceCheck({ data, key: 'firstName' });

  const lastNameValidationOutput = presenceCheck({ data, key: 'lastName' });

  validationOutput = Object.assign(
    patientIDValidationOutput,
    dobValidationOutput,
    firstNameValidationOutput,
    lastNameValidationOutput
  );

  return validationOutput;
};

export const validateResetPasswordForm = ({ data, password }) => {
  let validationOutput = {};

  const passwordValidationOutput = validatePassword(data);
  validationOutput = Object.assign(validationOutput, passwordValidationOutput);

  const passwordConfirmationValidationOutput = validatePasswordConfirmation({ data, password });
  validationOutput = Object.assign(validationOutput, passwordConfirmationValidationOutput);

  return validationOutput;
};
