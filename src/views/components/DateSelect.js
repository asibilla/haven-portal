import { func, string } from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { styles } from '../../constants';

const DateSelect = ({ error, instructions, labelText, onChange, placeholder, startDate }) => {
  return (
    <label htmlFor={placeholder}>
      {labelText && <div className={styles.label}>{labelText}</div>}
      {instructions && <div className={styles.fieldInstructions}>{instructions}</div>}
      <DatePicker onChange={onChange} selected={new Date(startDate)} />
      <div className={styles.inputError}>{error && `${error}`}</div>
    </label>
  );
};

DateSelect.defaultProps = {
  error: '',
  instructions: '',
  labelText: '',
  placeholder: '',
  startDate: new Date().toString(),
};

DateSelect.propTypes = {
  error: string,
  instructions: string,
  labelText: string,
  onChange: func.isRequired,
  placeholder: string,
  startDate: string,
};

export default DateSelect;
