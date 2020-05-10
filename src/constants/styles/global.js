import { css } from 'react-emotion';

/**
 *
 * Breakpoints
 *
 */
export const xxLargeBreakpoint = 1480;
export const xLargeBreakpoint = 1200;
export const largeBreakpoint = 1024;
export const mediumBreakpoint = 768;

export const xxLarge = `@media only screen and (min-width: ${xxLargeBreakpoint}px)`;
export const xLarge = `@media only screen and (min-width: ${xLargeBreakpoint}px) and (max-width: ${
  xxLargeBreakpoint - 1
}px)`;
export const large = `@media only screen and (min-width: ${largeBreakpoint}px) and (max-width: ${
  xLargeBreakpoint - 1
}px)`;
export const medium = `@media only screen and (min-width: ${mediumBreakpoint}px) and (max-width: ${
  largeBreakpoint - 1
}px)`;
export const small = `@media only screen and (max-width: ${mediumBreakpoint - 1}px)`;
export const desktop = `@media only screen and (min-width: ${largeBreakpoint}px)`;
export const mobile = `@media only screen and (max-width: ${largeBreakpoint - 1}px)`;

/**
 *
 * Colors
 *
 */
export const black = '#000';
export const darkGrey = '#5B5C5E';
export const lightGrey = '#a3a3a3';
export const redError = '#b22222';
export const white = '#fff';

/**
 *
 * Styles
 *
 */
export const button = css`
  background-color: ${black};
  border: 1px solid ${black};
  border-radius: 18px;
  color: ${white};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  min-width: 125px;
  padding: 12px 15px;
`;

export const errorText = css`
  color: ${redError};
  margin-bottom: 8px;
`;

export const flexRow = css`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
`;

export const contentSection = css`
  padding: 0 45px;
`;

export const positonRelative = css`
  position: relative;
`;

export const scalableImage = css`
  max-width: 100%;
  width: 100%;
`;

export const textAlignLeft = css`
  text-align: left;
`;

export const textInput = css`
  border: solid 1px ${darkGrey};
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 8px 15px;
  width: 100%;
`;

export const unstyledList = css`
  list-style: none;
`;
