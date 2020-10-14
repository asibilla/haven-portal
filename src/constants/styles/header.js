import { css, cx } from 'react-emotion';

import { black, large, lightGrey, unstyledList } from './global';

export const navItemsWrapper = cx(
  'nav-items',
  css`
    padding-top: 36px;
    text-align: left;
  `
);

export const navLink = css`
  color: ${black};
  font-size: 16px;
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
  ${large} {
    font-size: 14px;
  }
`;

export const navList = cx(
  unstyledList,
  css`
    padding: 0 0 0 12px;
    li {
      cursor: pointer;
      height: 30px;
      line-height: 30px;

      &.signout {
        margin-top: 16px;
      }
    }
  `
);

export const navWrapper = cx(
  'navigation',
  css`
    box-sizing: border-box;
    padding: 16px 44px;
    img {
      max-width: 100%;
    }
  `
);

export const siteHeader = css`
  width: 350px;
`;
