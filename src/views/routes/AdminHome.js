import { string } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { routes, styles } from '../../constants';
import { getJwt, isAdmin } from '../../helpers/auth';
import AppContext from '../../helpers/context';
import { AdminHeader } from '../components';
import AdminOverview from './AdminOverview';
import ManageOptions from './ManageOptions';

const AdminHome = ({ url }) => {
  const { authData } = useContext(AppContext);
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    (async () => {
      if (!getJwt(authData)) {
        history.push(routes.userSignIn);
      }
      if (!isAdmin(authData)) {
        history.push(routes.userSignIn);
      }
    })();
  }, [url]);

  return (
    <div className="admin-view">
      <AdminHeader />
      <div className={styles.contentSection}>
        <Switch>
          <Route exact path={match.path} component={AdminOverview} />
          <Route path={`${match.path}${routes.manageOptions}`} component={ManageOptions} />
        </Switch>
      </div>
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
