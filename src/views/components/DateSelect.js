import { bool, func, string } from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { styles } from '../../constants';
import { toDate } from '../../helpers/dateFormatter';

const DateSelect = ({
  error,
  disabled,
  instructions,
  labelText,
  maxDate,
  minDate,
  onChange,
  placeholder,
  startDate,
}) => {
  return (
    <label htmlFor={placeholder}>
      {labelText && <div className={styles.label}>{labelText}</div>}
      {instructions && <div className={styles.fieldInstructions}>{instructions}</div>}
      <DatePicker
        disabled={disabled}
        maxDate={maxDate ? toDate(maxDate) : ''}
        minDate={minDate ? toDate(minDate) : ''}
        onChange={onChange}
        placeholderText="Select a Date"
        selected={startDate ? toDate(startDate) : ''}
      />
      <div className={styles.inputError}>{error && `${error}`}</div>
    </label>
  );
};

DateSelect.defaultProps = {
  disabled: false,
  error: '',
  instructions: '',
  labelText: '',
  maxDate: '',
  minDate: new Date().toString(),
  placeholder: '',
  startDate: new Date().toString(),
};

DateSelect.propTypes = {
  disabled: bool,
  error: string,
  instructions: string,
  labelText: string,
  maxDate: string,
  minDate: string,
  onChange: func.isRequired,
  placeholder: string,
  startDate: string,
};

export default DateSelect;
