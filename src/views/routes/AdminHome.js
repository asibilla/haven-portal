import { string } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { getJwt, isAdmin } from '../../helpers/auth';
import { scanDB } from '../../helpers/db';
import AppContext from '../../helpers/context';
import { SignOutButton } from '../components';

const AdminHome = ({ url }) => {
  const { authData } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!getJwt(authData)) {
        history.push(routes.userSignIn);
      }
      if (!isAdmin(authData)) {
        history.push(routes.userSignIn);
      }
      scanDB(authData);
    })();
  }, [url]);

  return (
    <div>
      <h1>Admin Home Page</h1>
      <SignOutButton />
    </div>
  );
};

AdminHome.defaultProps = {
  url: '',
};

AdminHome.propTypes = {
  url: string,
};

export default AdminHome;
