import { arrayOf, func, node, string } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

export const CheckboxInput = ({ className, label, onClick, value }) => {
  return (
    <div className={cx(styles.radioContainer, className)}>
      <label className={styles.radioLabel} htmlFor={value}>
        <input id={value} key={value} onClick={onClick} type="checkbox" value={value} />
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

CheckboxInput.defaultProps = {
  className: '',
  label: '',
};

CheckboxInput.propTypes = {
  className: string,
  label: string,
  onClick: func.isRequired,
  value: string.isRequired,
};

const CheckboxGroup = ({ children, className, label }) => {
  return (
    <div className={cx(styles.radioGroup, className)}>
      <div className={styles.label}>{label}</div>
      <div>{children}</div>
    </div>
  );
};

CheckboxGroup.defaultProps = {
  className: '',
  label: '',
};

CheckboxGroup.propTypes = {
  className: string,
  children: arrayOf(node).isRequired,
  label: string,
};

export default CheckboxGroup;
