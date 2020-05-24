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
export const greenSuccess = '#008000';
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

  &:disabled {
    background-color: ${lightGrey};
    border: 1px solid ${lightGrey};
  }
`;

export const buttonSecondary = css`
  background-color: ${white};
  border: 1px solid ${black};
  border-radius: 18px;
  color: ${black};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  min-width: 125px;
  padding: 12px 15px;

  &:disabled {
    background-color: ${lightGrey};
    border: 1px solid ${lightGrey};
  }
`;

export const contentSection = css`
  padding: 0 45px;
`;

export const errorText = css`
  color: ${redError};
  margin-bottom: 8px;
`;

export const fieldInstructions = css`
  font-size: 12px;
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

export const imageUpload = css`
  ${flexRow}
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;

  .label {
    margin-right: 10px;
  }

  input {
    margin-top: 20px;
  }
`;

export const imageUploadDelete = css`
  ${flexRow}
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;

  .thumbnail {
    margin-right: 10px;
    width: 140px;

    img {
      max-width: 100%;
    }
  }

  .delete {
    cursor: pointer;
  }
`;

export const inputError = css`
  ${errorText}
  margin-bottom: 15px;
  margin-top: 3px;
  min-height: 16px;
`;

export const label = css`
  font-weight: 600;
  margin-bottom: 5px;
`;

export const messageContainer = css`
  min-height: 32px;
`;

export const positonRelative = css`
  position: relative;
`;

export const radioContainer = css`
  margin-bottom: 4px;
`;

export const radioGroup = css`
  margin-bottom: 3px;
`;

export const radioLabel = css`
  cursor: pointer;
  span {
    position: relative;
    top: -2px;
  }
`;

export const scalableImage = css`
  max-width: 100%;
  width: 100%;
`;

export const selectInput = css`
  border: 1px solid ${darkGrey};
  border-radius: 5px;
  display: block;
  margin-bottom: 3px;
  max-width: 400px;
  min-width: 180px;
  position: relative;
  z-index: 10;

  select {
    appearance: none;
    background: transparent;
    border: none;
    border-radius: 0;
    display: block;
    font-size: 14px;
    margin: 0;
    outline: none;
    padding: 10px 55px 10px 10px;
    width: 100%;
  }

  &:before,
  &:after {
    content: '';
    border: 1px solid transparent;
    display: block;
    height: 0;
    pointer-events: none;
    position: absolute;
    right: 16px;
    width: 0;
  }

  &:before {
    border-bottom-color: ${darkGrey};
    border-width: 0 6.5px 8px 6.5px;
    bottom: 55%;
  }

  &:after {
    border-top-color: ${darkGrey};
    border-width: 8px 6.5px 0 6.5px;
    top: 55%;
  }
`;

export const successText = css`
  color: ${greenSuccess};
  padding: 8px;
  text-align: center;
`;

export const textAlignLeft = css`
  text-align: left;
`;

export const textInput = css`
  border: solid 1px ${darkGrey};
  border-radius: 5px;
  padding: 8px 10px;
  width: 100%;
`;

export const unstyledList = css`
  list-style: none;
`;
