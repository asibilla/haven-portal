import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import { navLink } from '../../constants/styles/header';

const AdminHeader = () => {
  const match = useRouteMatch();

  return (
    <>
      <li>
        <NavLink activeClassName="active" className={navLink} exact to={`${match.url}`}>
          Overview
        </NavLink>
      </li>
      {/* <li>
        <NavLink activeClassName="active" className={navLink} to={`${match.url}/manage-orgs`}>
          Orgs
        </NavLink>
      </li> */}
      <li>
        <NavLink activeClassName="active" className={navLink} to={`${match.url}/manage-buyers`}>
          Buyers
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" className={navLink} to={`${match.url}/manage-properties`}>
          Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName="active"
          className={navLink}
          to={`${match.url}/manage-contractors`}
        >
          Contractors
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" className={navLink} to={`${match.url}/scheduler`}>
          Scheduler
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" className={navLink} to={`${match.url}/manage-users`}>
          Portal Users
        </NavLink>
      </li>
    </>
  );
};

export default AdminHeader;
