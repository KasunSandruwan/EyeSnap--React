import React from 'react';
import { connect } from 'react-redux';

const Home = ({ userCompanies }) => (
  <div>
    <h1>Home</h1>
    <ul>{userCompanies.map(company => <li key={company._id}>{company.name}</li>)}</ul>
  </div>
);

const mapStateToProps = (state) => {
  const { userCompanies } = state.user;

  return {
    userCompanies
  };
};

export default connect(mapStateToProps)(Home);
