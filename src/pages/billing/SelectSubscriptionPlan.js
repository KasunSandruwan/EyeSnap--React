import React, { Component } from 'react';
import { Typography, Button } from 'material-ui';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Action imports
import { fetchSubscriptionPlans, selectSubscriptionPlan } from '../../actions';

const FeaturesList = styled.ul`
  line-height: 38px;
  margin-bottom: 2px;
`;

const SubscriptionActions = styled(CardActions)`
  background-color: #fafafa;
`;

const SubscriptionButton = styled(Button)`
  margin: auto !important;
`;

const SubscriptionTitle = styled(CardContent)`
  margin-bottom: -16px;
  background-color: #fafafa;
`;

class SelectSubscriptionPlan extends Component {
  constructor(props) {
    super(props);

    this.subscriptionPlans = this.subscriptionPlans.bind(this);
    this.selectSubscriptionPlan = this.selectSubscriptionPlan.bind(this);
  }

  componentDidMount() {
    this.props.fetchSubscriptionPlans();
  }

  selectSubscriptionPlan(stripeSubscriptionID) {
    this.props.selectSubscriptionPlan(stripeSubscriptionID);
    this.props.changeCurrentStep(2);
  }

  subscriptionPlans() {
    const { subscriptionPlans } = this.props;

    if (subscriptionPlans) {
      return subscriptionPlans.map(subscriptionPlan => (
        <Grid item xs={12} md={4} key={subscriptionPlan._id}>
          <Card>
            <SubscriptionTitle>
              <div>
                <Typography type="title" component="h1">
                  {subscriptionPlan.name}
                </Typography>
                <Typography type="body1">Best to get started...</Typography>
              </div>
            </SubscriptionTitle>

            <CardContent>
              <FeaturesList>
                <li>{subscriptionPlan.scans} Scans</li>
                <li>{subscriptionPlan.users} Users</li>
                <li>
                  <strong>Only ${subscriptionPlan.price} per month</strong>
                </li>
              </FeaturesList>
            </CardContent>
            <SubscriptionActions>
              <SubscriptionButton
                type="submit"
                dense
                raised
                color="primary"
                onClick={() => {
                  this.selectSubscriptionPlan(subscriptionPlan.stripeSubscriptionID);
                }}
              >
                Try Now
              </SubscriptionButton>
            </SubscriptionActions>
          </Card>
        </Grid>
      ));
    }
    return <div />;
  }

  render() {
    return (
      <div>
        <Typography type="body1">Let&apos;s get started...</Typography>
        <Typography type="headline" component="h2">
          Step2: Select a Suitable Subscription Plan
        </Typography>

        <br />
        <br />

        <Grid container>{this.subscriptionPlans()}</Grid>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { subscriptionPlans } = state.billing;

  return {
    subscriptionPlans
  };
};

export default connect(mapStateToProps, {
  fetchSubscriptionPlans,
  selectSubscriptionPlan
})(SelectSubscriptionPlan);
