import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../../constants';
import { AdminSignIn, UserSignIn } from '../routes';

const ViewWrapper = () => {
  return (
    <Switch>
      <Route exact path={routes.userSignIn} component={UserSignIn} />
      <Route path={routes.adminSignIn} component={AdminSignIn} />
    </Switch>
  );
};

export default ViewWrapper;
