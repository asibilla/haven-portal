import { css, cx } from 'react-emotion';
import { desktop, flexRow } from './global';

export const buttonContainer = css`
  padding-top: 15px;
  text-align: right;
`;

export const formContainer = cx(
  'manage-options-form',
  css`
    ${desktop} {
      ${flexRow}
      align-items: flex-start;
      justify-content: center;
    }
  `
);

export const formSection = css`
  ${desktop} {
    padding: 0 15px;
    width: calc(50% - 35px);
  }
`;

export const optionsViewContainer = css`
  padding-top: 20px;
  ${desktop} {
    ${flexRow}
    align-items: flex-start;
    justify-content: flex-start;

    .section {
      padding: 0 15px;
      width: calc(50% - 35px);
    }
  }
  .group {
    ${flexRow}
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 15px;
  }
  .title {
    font-weight: 600;
    margin-right: 5px;
  }
`;
