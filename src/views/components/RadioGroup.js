import { arrayOf, bool, func, node, string } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

export const RadioInput = ({ checked, className, label, name, onChange, value }) => {
  return (
    <div className={cx(styles.radioContainer, className)}>
      <label className={styles.radioLabel} htmlFor={value}>
        <input
          checked={checked}
          id={value}
          name={name}
          onChange={onChange}
          type="radio"
          value={value}
        />
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

RadioInput.defaultProps = {
  checked: false,
  className: '',
  label: '',
};

RadioInput.propTypes = {
  checked: bool,
  className: string,
  label: string,
  name: string.isRequired,
  onChange: func.isRequired,
  value: string.isRequired,
};

const RadioGroup = ({ children, className, error, label }) => {
  return (
    <div className={cx(styles.radioGroup, className)}>
      <div className={styles.label}>{label}</div>
      <div>{children}</div>
      <div className={styles.inputError}>{error && `${error}`}</div>
    </div>
  );
};

RadioGroup.defaultProps = {
  className: '',
  error: '',
  label: '',
};

RadioGroup.propTypes = {
  className: string,
  children: arrayOf(node).isRequired,
  error: string,
  label: string,
};

export default RadioGroup;
