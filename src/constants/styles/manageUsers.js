import { css, cx } from 'react-emotion';

import { desktop, flexRow, greyBackground, mobile } from './global';

export const addNew = css`
  margin-bottom: 15px;
`;

export const addNewWrapper = css`
  max-width: 375px;
  padding: 30px;
  width: 100%;
`;

export const userData = css`
  ${flexRow}
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 8px;

  .label {
    font-weight: 600;
    width: 130px;
  }

  .action {
    margin-bottom: 8px;
  }
`;

const userRowCell = css`
  padding: 5px 15px;

  &.half {
    width: 50%;
  }

  &.three-quarters {
    width: 75%;
  }

  &.one-quarter {
    width: 25%;
  }

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
      font-weight: 600;
      width: 120px;
    }
  }
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
