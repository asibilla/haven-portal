import { css, cx } from 'react-emotion';

import { black, flexRow, lightGrey, unstyledList } from './global';

export const navItemsWrapper = cx(
  'nav-items',
  css`
    flex-grow: 1;
  `
);

export const navLink = css`
  color: ${black};
  font-weight: 600;
  margin: 0 24px;
  text-decoration: none;
  &.active {
    color: ${lightGrey};
  }
  &:hover {
    color: ${lightGrey};
  }
  &:visited:not(.active) {
    color: ${black};
  }
`;

export const navList = cx(
  flexRow,
  unstyledList,
  css`
    justify-content: flex-start;
    height: 94px;
    li {
      cursor: pointer;
    }
  `
);

export const navWrapper = cx(
  'navigation',
  flexRow,
  css`
    padding: 15px 45px;
  `
);

export const siteHeader = css`
  width: 100%;
`;
