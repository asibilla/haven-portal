import { css, cx } from 'react-emotion';

import { black, darkGrey, flexRow, white } from './global';

export const content = css`
  border: 1px solid ${darkGrey};
  padding: 20px;
`;

export const tab = css`
  background-color: ${darkGrey};
  border: 1px solid ${darkGrey};
  cursor: pointer;
  color: ${white};
  margin-right: 4px;
  padding: 8px 15px;
  position: relative;
  text-align: center;
  top: 1px;
  width: 100px;
  z-index: 5;

  &:first-child {
    margin-left: 10px;
  }

  &.active {
    background-color: ${white};
    border-bottom: 1px solid ${white};
    color: ${black};
    cursor: auto;
    font-weight: 600;
  }
`;

export const tabset = cx(
  'tabset',
  flexRow,
  css`
    justify-content: flex-start;
    position: relative;
  `
);
