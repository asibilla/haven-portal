// import { isEmpty, noop } from 'lodash';
// import { func, shape, string } from 'prop-types';
import React from 'react';

// import { styles } from '../../constants';
// import { optionPropType } from '../../constants/propTypeObjects';
import { buttonContainer } from '../../constants/styles/manageOptions';

import useInput from '../../hooks/useInput';

import { Button, TextArea } from '.';

const OptionsUpload = () => {
  const { inputProps, value } = useInput('');
  const buttonIsDisabled = !value;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-container">
      <h3>Upload JSON Data to Options DB</h3>
      <form onSubmit={handleSubmit}>
        <TextArea labelText="Paste JSON Data Here" {...inputProps} />

        <div className={buttonContainer}>
          <Button disabled={buttonIsDisabled} text="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default OptionsUpload;
