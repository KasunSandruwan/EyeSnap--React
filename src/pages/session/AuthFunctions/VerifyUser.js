import React, { Component } from 'react';
import { CircularProgress } from 'material-ui/Progress';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Action imports
import { verifyUser, clearUserVerificationSuccess } from '../../../actions';

const VerifyUserContainer = styled.div`
  text-align: center;
  padding-top: 25px;
  padding-bottom: 6px;
`;

class VerifyUser extends Component {
  componentDidMount() {
    const { oobCode } = this.props;

    this.props.verifyUser(oobCode);
  }

  render() {
    const { userVerificationSuccess } = this.props;

    if (!userVerificationSuccess) {
      return (
        <VerifyUserContainer>
          <CircularProgress />
          <p>Please wait...</p>
        </VerifyUserContainer>
      );
    }
    this.props.clearUserVerificationSuccess();

    return <Redirect to="/login" />;
  }
}

const mapStateToProps = (state) => {
  const { userVerificationSuccess } = state.session;

  return {
    userVerificationSuccess
  };
};

export default connect(mapStateToProps, {
  verifyUser,
  clearUserVerificationSuccess
})(VerifyUser);
