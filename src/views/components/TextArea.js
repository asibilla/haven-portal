import { func, string, number } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

const TextInput = ({ className, instructions, labelText, onChange, placeholder, rows, value }) => {
  return (
    <label htmlFor={placeholder}>
      {labelText && <div className={styles.label}>{labelText}</div>}
      {instructions && <div className="instruct">{instructions}</div>}
      <textarea
        id={placeholder}
        className={cx(styles.textInput, className)}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
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
  rows: 6,
  value: '',
};

TextInput.propTypes = {
  className: string,
  instructions: string,
  labelText: string,
  onChange: func.isRequired,
  placeholder: string,
  rows: number,
  value: string,
};

export default TextInput;
