import { css, cx } from 'react-emotion';

import { black, large, lightGrey, mobile, unstyledList } from './global';

export const navContainer = css`
  ${mobile} {
    max-height: 100%;
    overflow-y: scroll;
  }
`;

export const navItemsWrapper = cx(
  'nav-items',
  css`
    padding-top: 36px;
    text-align: left;
    z-index: 999;

    ${mobile} {
      background: #fff;
      border-left: 1px solid #ccc;
      height: calc(100vh - 90px);
      overflow: hidden;
      padding: 16px 0 0 28px;
      position: absolute;
      right: 0;
      top: 91px;
      transform: translate3d(325px, 0, 0);
      transition-timing-function: ease-in;
      transition-duration: 0.3s;
      width: 325px;

      &.open {
        transform: translate3d(0, 0, 0);
      }
    }
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

export const navTriggerMobile = css`
  cursor: pointer;
  display: none;
  height: 90px;
  padding: 28px 16px;
  position: fixed;
  right: 0;
  top: 0;
  width: 80px;

  div {
    background: #000;
    border-radius: 4px;
    height: 8px;
    margin-bottom: 5px;
    width: 100%;
  }

  ${mobile} {
    display: block;
  }
`;

export const navWrapper = cx(
  'navigation',
  css`
    box-sizing: border-box;
    padding: 16px 44px;
    img {
      max-width: 100%;
    }
    ${mobile} {
      img {
        height: 55px;
      }
    }
  `
);

export const siteHeader = css`
  position: relative;
  width: 350px;

  ${mobile} {
    background: #fff;
    border-bottom: 1px solid #ccc;
    height: 90px;
    position: fixed;
    width: 100%;
    z-index: 999;
  }
`;

export const overlay = css`
  background-color: rgba(255, 255, 255, 0.8);
  display: none;
  height: calc(100vh - 91px);
  left: 0;
  position: fixed;
  top: 91px;
  width: 100%;
  z-index: 998;

  ${mobile} {
    &.active {
      display: block;
    }
  }
`;
