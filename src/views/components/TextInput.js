import { func, string } from 'prop-types';
import React from 'react';

const TextInput = ({ onChange, placeholder, type, value }) => {
  return (
    <label htmlFor={placeholder}>
      <input
        id={placeholder}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
};

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
  value: '',
};

TextInput.propTypes = {
  onChange: func.isRequired,
  placeholder: string,
  type: string,
  value: string,
};

export default TextInput;
