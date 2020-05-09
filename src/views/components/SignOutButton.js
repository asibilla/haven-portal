import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { navLink } from '../../constants/styles/header';
import { getUser, signOut } from '../../helpers/auth';
import AppContext from '../../helpers/context';

const SignOutButton = () => {
  const { authData, clearAuthData } = useContext(AppContext);
  const history = useHistory();

  const user = getUser(authData);
  const onClick = (e) => {
    e.preventDefault();
    const isSignedOut = signOut(user);
    if (isSignedOut) {
      clearAuthData();
      history.push(routes.userSignIn);
    }
  };

  return (
    <a className={navLink} href="/" onClick={onClick}>
      Sign Out
    </a>
  );
};

export default SignOutButton;
