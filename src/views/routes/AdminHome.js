import { string } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { routes } from '../../constants';
import { getJwt, isAdmin } from '../../helpers/auth';
import AppContext from '../../helpers/context';
import { AdminHeader, ContentWrapper, NavWrapper, PageWrapper } from '../components';

import ManageOrgs from './ManageOrgs';
import ManageBuyers from './ManageBuyers';
import ManageContractors from './ManageContractors';
import ManageProperties from './ManageProperties';
import AdminOverview from './AdminOverview';
import ManageUser from './ManageUser';
import ManageUsers from './ManageUsers';
import Scheduler from './Scheduler';

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
      <PageWrapper>
        <NavWrapper>
          <AdminHeader />
        </NavWrapper>
        <ContentWrapper>
          <Switch>
            <Route exact path={match.path} component={AdminOverview} />
            <Route path={`${match.path}${routes.manageOrgs}`} component={ManageOrgs} />
            <Route path={`${match.path}${routes.manageBuyers}`} component={ManageBuyers} />
            <Route path={`${match.path}${routes.manageProperties}`} component={ManageProperties} />
            <Route path={`${match.path}${routes.scheduler}`} component={Scheduler} />
            <Route
              path={`${match.path}${routes.manageContractors}`}
              component={ManageContractors}
            />
            <Route path={`${match.path}${routes.manageUser}`} component={ManageUser} />
            <Route path={`${match.path}${routes.manageUsers}`} component={ManageUsers} />
          </Switch>
        </ContentWrapper>
      </PageWrapper>
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
