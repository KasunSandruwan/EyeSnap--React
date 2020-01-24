import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { Typography } from 'material-ui';

import CardDetailsForm from './AddCardDetails/CardDetailsForm';

import { STRIPE_API_KEY } from '../../config';

const AddCardDetails = () => (
  <div>
    <Typography type="body1">Let&apos;s get started...</Typography>
    <Typography type="headline" component="h2">
      Step3: Add your Card Details
    </Typography>

    <br />
    <br />

    <StripeProvider apiKey={STRIPE_API_KEY}>
      <Elements>
        <CardDetailsForm />
      </Elements>
    </StripeProvider>
  </div>
);

export default AddCardDetails;
