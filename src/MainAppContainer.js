import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Sidebar from './MainAppContainer/Sidebar';
import UserMenu from './MainAppContainer/UserMenu';

import { getUserCompanies } from './actions';

import { GettingStarted } from './pages';

const MainContainer = styled.div`
  margin-left: 276px;
  padding: 31px;

  @media (max-width: 992px) {
    margin-left: 0;
  }
`;

const InnerContainer = styled.div`
  margin: 0 10px;
  margin-top: 54px;
`;

class MainAppContainer extends Component {
  componentDidMount() {
    setTimeout(this.props.getUserCompanies, 500);
  }

  render() {
    const { children, location, userCompanies } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        pathname: location.pathname
      })
    );

    if (userCompanies) {
      if (userCompanies.length === 0) {
        return <GettingStarted />;
      }
      return (
        <div>
          <Sidebar />

          <MainContainer>
            <UserMenu />

            <InnerContainer>{childrenWithProps}</InnerContainer>
          </MainContainer>
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = (state) => {
  const { userCompanies } = state.user;
  const { user } = state.session;

  return {
    userCompanies,
    user
  };
};

export default connect(mapStateToProps, {
  getUserCompanies
})(MainAppContainer);
