import { func, string } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

const TextInput = ({ className, instructions, labelText, onChange, placeholder, type, value }) => {
  return (
    <label htmlFor={placeholder}>
      {labelText && <div className={styles.label}>{labelText}</div>}
      {instructions && <div className={styles.fieldInstructions}>{instructions}</div>}
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
  instructions: '',
  labelText: '',
  placeholder: '',
  type: 'text',
  value: '',
};

TextInput.propTypes = {
  className: string,
  instructions: string,
  labelText: string,
  onChange: func.isRequired,
  placeholder: string,
  type: string,
  value: string,
};

export default TextInput;
