import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../../constants';
import { AdminHome, UserHome, UserSignIn } from '../routes';

const ViewWrapper = () => {
  return (
    <Switch>
      <Route exact path={routes.userSignIn} component={UserSignIn} />
      <Route path={routes.adminHome} component={AdminHome} />
      <Route path={routes.userHome} component={UserHome} />
    </Switch>
  );
};

export default ViewWrapper;
