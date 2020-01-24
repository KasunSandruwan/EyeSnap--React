import React from 'react';

import VerifyUser from './AuthFunctions/VerifyUser';
import ResetPassword from './AuthFunctions/ResetPassword';

const AuthFunctions = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const mode = params.get('mode');
  const oobCode = params.get('oobCode');

  if (mode === 'verifyEmail') {
    return <VerifyUser oobCode={oobCode} />;
  } else if (mode === 'resetPassword') {
    return <ResetPassword oobCode={oobCode} />;
  }

  return <div />;
};

export default AuthFunctions;
