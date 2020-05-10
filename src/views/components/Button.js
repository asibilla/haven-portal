import { noop } from 'lodash';
import { func, string } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

const Button = ({ className, onClick, text, type }) => {
  return (
    <button className={cx(styles.button, className)} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  onClick: noop,
  type: 'button',
};

Button.propTypes = {
  className: string,
  onClick: func,
  text: string.isRequired,
  type: string,
};

export default Button;
