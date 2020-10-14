import { arrayOf, node, oneOfType } from 'prop-types';
import React from 'react';

import { navList, navItemsWrapper, navWrapper, siteHeader } from '../../constants/styles/header';
import SignOutButton from './SignOutButton';

const NavWrapper = ({ children }) => {
  return (
    <header className={siteHeader}>
      <div className={navWrapper}>
        <img src="/images/haven-logo.jpg" alt="Haven Development Logo" />
        <div className={navItemsWrapper}>
          <nav>
            <ul className={navList}>
              {children}
              <li className="signout">
                <SignOutButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

NavWrapper.propTypes = {
  children: oneOfType([node, arrayOf(node)]).isRequired,
};

export default NavWrapper;
