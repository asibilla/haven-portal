import { noop } from 'lodash';
import { bool, func, string } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

const Button = ({ className, disabled, onClick, text, type }) => {
  return (
    <button
      className={cx(styles.button, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  disabled: false,
  onClick: noop,
  type: 'button',
};

Button.propTypes = {
  className: string,
  disabled: bool,
  onClick: func,
  text: string.isRequired,
  type: string,
};

export default Button;
