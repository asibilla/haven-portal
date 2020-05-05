import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { routes } from '../../constants';
import { getJwt, isAdmin } from '../../helpers/auth';
import AppContext from '../../helpers/context';
import { SignOutButton } from '../components';

const AdminHome = () => {
  const { authData } = useContext(AppContext);

  if (!getJwt(authData)) {
    return <Redirect to={routes.userSignIn} />;
  }

  if (!isAdmin(authData)) {
    return <Redirect to ={routes.userHome} />;
  }

  return (
    <div>
      <h1>Admin Home Page</h1>
      <SignOutButton />
    </div>
  );
};

export default AdminHome;
