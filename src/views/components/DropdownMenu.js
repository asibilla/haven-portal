import { arrayOf, func, node, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';

export const DropdownOption = ({ text, value }) => {
  return <option value={value}>{text}</option>;
};

DropdownOption.propTypes = {
  text: string.isRequired,
  value: oneOfType([string, number]).isRequired,
};

const DropdownMenu = ({
  id,
  children,
  className,
  error,
  label,
  labelClassName,
  onChange,
  value,
}) => {
  return (
    <div>
      {label && (
        <div className={cx(styles.label, labelClassName)}>
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className={cx(styles.selectInput, className)}>
        <select id={id} onChange={onChange} value={value}>
          {children}
        </select>
      </div>
      <div className={styles.inputError}>{error && `${error}`}</div>
    </div>
  );
};

DropdownMenu.defaultProps = {
  className: '',
  error: '',
  label: '',
  labelClassName: '',
  value: '',
};

DropdownMenu.propTypes = {
  id: string.isRequired,
  className: string,
  children: oneOfType([node, arrayOf(node)]).isRequired,
  error: string,
  label: string,
  labelClassName: string,
  onChange: func.isRequired,
  value: string,
};

export default DropdownMenu;
