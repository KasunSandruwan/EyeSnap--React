import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { Button } from 'material-ui';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Action imports
import { completeSubscription } from '../../../actions';

import showNotifications from '../../../lib/showNotifications';

const Form = styled.form`
  text-align: center;
  width: 85%;
  margin: auto;
  margin-top: 24px;
  margin-bottom: 21px;
`;

const ConfirmOrderButton = styled(Button)`
  margin: auto;
  display: block;
  margin-top: 20px;
`;

class CardDetailsForm extends Component {
  constructor(props) {
    super(props);

    this.submitCardDetails = this.submitCardDetails.bind(this);
  }

  submitCardDetails(event) {
    event.preventDefault();

    const { user, stripeSubscriptionID, company } = this.props;

    this.props.stripe
      .createToken({ type: 'card', name: `${user.firstName} ${user.lastName}` })
      .then(({ token }) => {
        if (token) {
          this.props.completeSubscription({
            token,
            stripeSubscriptionID,
            company
          });
        } else {
          showNotifications({
            type: 'error',
            message: 'Please make sure your form does not have any errors!'
          });
        }
      });
  }

  render() {
    return (
      <Form onSubmit={this.submitCardDetails}>
        <CardElement style={{ base: { fontSize: '18px' } }} />

        <br />
        <br />

        <ConfirmOrderButton type="submit" dense raised color="primary">
          Confirm
        </ConfirmOrderButton>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.session;
  const { stripeSubscriptionID } = state.billing;
  const { company } = state.company;

  return {
    user,
    stripeSubscriptionID,
    company
  };
};

export default injectStripe(
  connect(mapStateToProps, {
    completeSubscription
  })(CardDetailsForm)
);
