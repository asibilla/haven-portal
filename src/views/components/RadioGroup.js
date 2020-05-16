import { arrayOf, func, node, string } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

export const RadioInput = ({ className, label, name, onChange, value }) => {
  return (
    <div className={cx(className)}>
      <label className={styles.radioLabel} htmlFor={value}>
        <input id={value} name={name} onChange={onChange} type="radio" value={value} />
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

RadioInput.defaultProps = {
  className: '',
  label: '',
};

RadioInput.propTypes = {
  className: string,
  label: string,
  name: string.isRequired,
  onChange: func.isRequired,
  value: string.isRequired,
};

const RadioGroup = ({ children, className, label }) => {
  return (
    <div className={cx(styles.radioGroup, className)}>
      <div className={styles.label}>{label}</div>
      <div>{children}</div>
    </div>
  );
};

RadioGroup.defaultProps = {
  className: '',
  label: '',
};

RadioGroup.propTypes = {
  className: string,
  children: arrayOf(node).isRequired,
  label: string,
};

export default RadioGroup;
