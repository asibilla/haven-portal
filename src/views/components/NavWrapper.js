import { arrayOf, node, oneOfType } from 'prop-types';
import React, { useState } from 'react';
import { cx } from 'react-emotion';

import {
  navContainer,
  navList,
  navItemsWrapper,
  navTriggerMobile,
  navWrapper,
  overlay,
  siteHeader,
} from '../../constants/styles/header';
import SignOutButton from './SignOutButton';

const NavWrapper = ({ children }) => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNav = () => setNavIsOpen(!navIsOpen);

  return (
    <header className={siteHeader}>
      <div className={cx(overlay, navIsOpen ? 'active' : '')} onClick={toggleNav} />
      <div className={navWrapper}>
        <img src="/images/haven-logo.jpg" alt="Haven Development Logo" />
        <div
          className={navTriggerMobile}
          onClick={toggleNav}
          onKeyPress={toggleNav}
          role="button"
          tabIndex="0"
        >
          <div />
          <div />
          <div />
        </div>
        <div className={cx(navItemsWrapper, navIsOpen ? 'open' : '')}>
          <nav className={navContainer}>
            <ul className={navList} onClick={toggleNav} onKeyPress={toggleNav}>
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
