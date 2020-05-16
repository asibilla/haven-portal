import { css, cx } from 'react-emotion';
import { desktop, flexRow } from './global';

export const formContainer = cx(
  css`
    ${desktop} {
      ${flexRow}
      align-items: flex-start;
    }
  `
);

export const formSection = css`
  padding: 0 15px;
  width: 50%;
`;
