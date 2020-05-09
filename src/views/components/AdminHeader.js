import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

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
          <img src="images/haven-logo.jpg" alt="Haven Development Logo" />
        </div>

        <div className={navItemsWrapper}>
          <nav>
            <ul className={navList}>
              <li>
                <Link className={navLink} to="/admin">
                  Overview
                </Link>
              </li>
              <li>
                <Link className={navLink} to={`${match.url}/manage-options`}>
                  Manage Options
                </Link>
              </li>
              <li>
                <Link className={navLink} to="/admin">
                  Manage Users
                </Link>
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
