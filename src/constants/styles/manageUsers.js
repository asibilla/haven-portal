import { css, cx } from 'react-emotion';

import { flexRow, greyBackground } from './global';

const userRowCell = css`
  padding: 5px 15px;
  width: 15%;

  &.manage {
    text-align: right;
  }

  &.email {
    width: 40%;
  }
`;

export const addNew = css`
  margin-bottom: 15px;
`;

export const userRow = cx(
  flexRow,
  css`
    align-items: flex-start;
    justify-content: flex-start;
    &:nth-child(even) {
      background-color: ${greyBackground};
    }

    div {
      ${userRowCell}
    }
  `
);

export const usersHeaderRow = cx(
  flexRow,
  css`
    align-items: flex-start;
    font-weight: 600;
    justify-content: flex-start;

    div {
      ${userRowCell}
    }
  `
);

export const addNewWrapper = css`
  max-width: 375px;
  padding: 30px;
  width: 100%;
`;
