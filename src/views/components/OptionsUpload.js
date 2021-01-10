import { map, pickBy } from 'lodash';
import { func } from 'prop-types';
import React, { useState } from 'react';

import { styles } from '../../constants';
// import { optionPropType } from '../../constants/propTypeObjects';
import { buttonContainer } from '../../constants/styles/manageOptions';

import useInput from '../../hooks/useInput';

import { Button, TextArea } from '.';

const OptionsUpload = ({ refreshData }) => {
  const { inputProps, reset, value } = useInput('');
  const [processing, setProcessing] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const buttonIsDisabled = !value || processing;

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const rawJson = JSON.parse(value);

      // reset();
      // refreshData();
      setSubmitSuccess('Your data has been uploaded!');
    } catch (e) {
      setSubmitError(`An error occured while uploading: ${e.message}`);
    }
    setProcessing(false);
  };

  return (
    <div className="form-container">
      <h3>Upload JSON Data to Options DB</h3>
      <form onSubmit={handleSubmit}>
        <TextArea labelText="Paste JSON Data Here" {...inputProps} />

        <div className={buttonContainer}>
          <Button disabled={buttonIsDisabled} text="Submit" type="submit" />
        </div>
        <div>
          {submitError && <div className={styles.errorText}>{submitError}</div>}
          {submitSuccess && <div className={styles.successText}>{submitSuccess}</div>}
        </div>
      </form>
    </div>
  );
};

OptionsUpload.propTypes = {
  refreshData: func.isRequired,
};

export default OptionsUpload;
