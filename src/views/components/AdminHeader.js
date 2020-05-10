import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import {
  navLink,
  navList,
  navItemsWrapper,
  navWrapper,
  siteHeader,
} from '../../constants/styles/header';
import SignOutButton from './SignOutButton';

const AdminHeader = () => {
  const match = useRouteMatch();

  return (
    <header className={siteHeader}>
      <div className={navWrapper}>
        <div>
          <img src="/images/haven-logo.jpg" alt="Haven Development Logo" />
        </div>

        <div className={navItemsWrapper}>
          <nav>
            <ul className={navList}>
              <li>
                <NavLink activeClassName="active" className={navLink} exact to={`${match.url}`}>
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" className={navLink} to={`${match.url}/manage-options`}>
                  Manage Options
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" className={navLink} to="/manage-users">
                  Manage Users
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="signout">
          <SignOutButton />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
