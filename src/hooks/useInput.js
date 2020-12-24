import { useState } from 'react';

const useInput = (initialValue, callback) => {
  const [value, setValue] = useState(initialValue);
  return {
    inputProps: {
      onChange: (event) => {
        const eventVal = event.target.value;
        setValue(eventVal);
        if (callback) {
          callback(eventVal);
        }
      },
      value,
    },
    reset: () => setValue(''),
    setValue,
    value,
  };
};

export default useInput;
