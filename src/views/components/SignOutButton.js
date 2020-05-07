import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { getUser, signOut } from '../../helpers/auth';
import AppContext from '../../helpers/context';
import Button from './Button';

const SignOutButton = () => {
  const { authData, clearAuthData } = useContext(AppContext);
  const history = useHistory();

  const user = getUser(authData);
  const onClick = () => {
    const isSignedOut = signOut(user);
    if (isSignedOut) {
      clearAuthData();
      history.push(routes.userSignIn);
    }
  };

  return <Button onClick={onClick} text="Sign Out" />;
};

export default SignOutButton;
