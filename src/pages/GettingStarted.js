import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Material ui imports
import MobileStepper from 'material-ui/MobileStepper';
import { Grid, Typography, Button } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';

import { AddCompany, SelectSubscriptionPlan, AddCardDetails } from '../pages';

import { clearSubscriptionSuccess } from '../actions';

// Image imports
import successIcon from '../assets/icons/success.svg';

const GettingStartedContainer = styled.div`
  min-height: calc(100vh - 120px);
  align-items: center;
  display: flex;
`;

const ContinueButton = styled(Button)`
  margin: auto;
  display: block !important;
  margin-top: 21px;
  width: 184px;
  text-align: center;
`;

const SuccessIcon = styled.img`
  width: 157px;
  margin: auto;
  display: block;
  margin-top: 24px;
`;

class GettingStarted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0
    };

    this.changeCurrentStep = this.changeCurrentStep.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currentStep } = this.state;
    const { subscriptionSuccess } = nextProps;

    if (currentStep !== 3 && subscriptionSuccess) {
      this.setState({
        currentStep: 3
      });
    }
  }

  changeCurrentStep(newStep) {
    this.setState({
      currentStep: newStep
    });
  }

  render() {
    const { currentStep } = this.state;

    return (
      <GettingStartedContainer>
        <Grid container justify="center" align="center">
          <Grid item sm={12} md={8}>
            <Card>
              <CardContent>
                {currentStep === 0 && <AddCompany changeCurrentStep={this.changeCurrentStep} />}

                {currentStep === 1 && (
                  <SelectSubscriptionPlan changeCurrentStep={this.changeCurrentStep} />
                )}

                {currentStep === 2 && <AddCardDetails changeCurrentStep={this.changeCurrentStep} />}

                {currentStep === 3 && (
                  <div>
                    <Typography type="headline" component="h1" align="center">
                      Success!
                    </Typography>
                    <Typography type="body1" align="center">
                      Your company is now on EyeSnap.
                    </Typography>

                    <SuccessIcon src={successIcon} alt="Success icon" />

                    <ContinueButton
                      raised
                      color="primary"
                      component={Link}
                      to="/"
                      onClick={() => {
                        this.props.clearSubscriptionSuccess();
                      }}
                    >
                      Continue
                    </ContinueButton>
                  </div>
                )}
              </CardContent>

              <MobileStepper
                type="dots"
                steps={4}
                position="static"
                activeStep={currentStep}
                nextButton={<div />}
                backButton={<div />}
              />
            </Card>
          </Grid>
        </Grid>
      </GettingStartedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { subscriptionSuccess } = state.billing;

  return {
    subscriptionSuccess
  };
};

export default connect(mapStateToProps, {
  clearSubscriptionSuccess
})(GettingStarted);
