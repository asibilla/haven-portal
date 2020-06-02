import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../../constants';
import { AdminHome, ConfirmForgotPassword, ForgotPassword, UserHome, UserSignIn } from '../routes';

const ViewWrapper = () => {
  return (
    <Switch>
      <Route exact path={routes.userSignIn} component={UserSignIn} />
      <Route path={routes.adminHome} component={AdminHome} />
      <Route path={routes.userHome} component={UserHome} />
      <Route path={routes.forgotPassword} component={ForgotPassword} />
      <Route path={routes.confirmForgotPassword} component={ConfirmForgotPassword} />
    </Switch>
  );
};

export default ViewWrapper;
