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
  padding: 0 15px;
  width: calc(50% - 35px);
`;
