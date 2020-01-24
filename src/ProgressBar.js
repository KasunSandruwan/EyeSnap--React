import React from 'react';
import { LinearProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';

const ProgressBar = ({ loading }) => {
  if (loading) {
    return <LinearProgress />;
  }
  return null;
};

const mapStateToProps = (state) => {
  const { loading } = state.core;

  return {
    loading
  };
};

export default connect(mapStateToProps)(ProgressBar);
