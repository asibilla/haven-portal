import { func, string } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

const TextInput = ({ className, labelText, onChange, placeholder, type, value }) => {
  return (
    <label htmlFor={placeholder}>
      {labelText && `${labelText}`}
      <input
        id={placeholder}
        className={cx(styles.textInput, className)}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
};

TextInput.defaultProps = {
  className: '',
  labelText: '',
  placeholder: '',
  type: 'text',
  value: '',
};

TextInput.propTypes = {
  className: string,
  labelText: string,
  onChange: func.isRequired,
  placeholder: string,
  type: string,
  value: string,
};

export default TextInput;
