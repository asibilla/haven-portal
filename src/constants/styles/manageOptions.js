import { css, cx } from 'react-emotion';
import { flexRow, large } from './global';

export const formSection = cx(
  css`
    ${large} {
      ${flexRow}
    }
  `
);
