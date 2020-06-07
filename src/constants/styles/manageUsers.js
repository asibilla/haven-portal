import { css, cx } from 'react-emotion';

import { desktop, flexRow, greyBackground, mobile } from './global';

const userRowCell = css`
  padding: 5px 15px;

  ${desktop} {
    width: 15%;

    &.manage {
      text-align: right;
    }

    &.email {
      width: 40%;
    }

    .mobile-label {
      display: none;
    }
  }

  ${mobile} {
    ${flexRow}
    align-items: flex-start;
    justify-content: flex-start;

    .mobile-label {
      width: 120px;
    }
  }
`;

export const addNew = css`
  margin-bottom: 15px;
`;

export const userRow = cx(
  'user-row',
  css`
    ${desktop} {
      ${flexRow}
    }
    align-items: flex-start;
    justify-content: flex-start;
    &:nth-child(even) {
      background-color: ${greyBackground};
    }

    .cell {
      ${userRowCell}
    }

    ${mobile} {
      padding-bottom: 15px;
      padding-top: 15px;
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

    ${mobile} {
      display: none;
    }
  `
);

export const addNewWrapper = css`
  max-width: 375px;
  padding: 30px;
  width: 100%;
`;
