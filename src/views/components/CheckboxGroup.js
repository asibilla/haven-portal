import { noop } from 'lodash';
import { arrayOf, bool, func, node, string } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

export const CheckboxInput = ({ className, checked, label, onChange, onClick, value }) => {
  return (
    <div className={cx(styles.radioContainer, className)}>
      <label className={styles.radioLabel} htmlFor={value}>
        <input
          checked={checked}
          id={value}
          onChange={onChange}
          onClick={onClick}
          type="checkbox"
          value={value}
        />
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

CheckboxInput.defaultProps = {
  className: '',
  checked: false,
  label: '',
  onChange: noop,
};

CheckboxInput.propTypes = {
  checked: bool,
  className: string,
  label: string,
  onChange: func,
  onClick: func.isRequired,
  value: string.isRequired,
};

const CheckboxGroup = ({ children, className, error, label }) => {
  return (
    <div className={cx(styles.radioGroup, className)}>
      <div className={styles.label}>{label}</div>
      <div>{children}</div>
      <div className={styles.inputError}>{error && `${error}`}</div>
    </div>
  );
};

CheckboxGroup.defaultProps = {
  className: '',
  error: '',
  label: '',
};

CheckboxGroup.propTypes = {
  className: string,
  children: arrayOf(node).isRequired,
  error: string,
  label: string,
};

export default CheckboxGroup;
