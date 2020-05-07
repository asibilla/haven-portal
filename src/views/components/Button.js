import { noop } from 'lodash';
import { func, string } from 'prop-types';
import React from 'react';

const Button = ({ onClick, text, type }) => {
  return (
    <button onClick={onClick} type={type}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  onClick: noop,
  type: 'button',
};

Button.propTypes = {
  onClick: func,
  text: string.isRequired,
  type: string,
};

export default Button;
