import { isEmpty } from 'lodash';
import React, { useState } from 'react';
// import { Link, Redirect, useHistory } from 'react-router-dom';

import { styles } from '../../constants';
import { forgotPasswordWrapper } from '../../constants/styles/signin';
import { forgotPassword } from '../../helpers/cognito';
import { createUpdateFormValueFn } from '../../helpers/formHelpers';
import { ValidationItem, validateItems } from '../../helpers/formValidation';
import { Button, TextInput } from '../components';

const ConfirmForgotPassword = () => {
  const [confirmationCode, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonIsDisabled(true);
    setValidationErrors({});

    const validationObj = [
      new ValidationItem({
        displayName: 'Confirmation Code',
        fieldName: 'confirmationCode',
        isRequiredString: true,
        value: confirmationCode,
      }),
      new ValidationItem({
        displayName: 'Password',
        fieldName: 'password',
        isRequiredString: true,
        value: password,
      }),
    ];

    const errors = validateItems({ items: validationObj });

    if (!isEmpty(errors)) {
      setValidationErrors(errors);
      setButtonIsDisabled(false);
      return;
    }

    if (password !== confirmPassword) {
      setValidationErrors({
        confirmPassword: 'Passwords do not match',
      });
      setButtonIsDisabled(false);
      return;
    }

    try {
      await forgotPassword({ confirmationCode });
    } catch (err) {
      setErrorMsg(`Something went wrong: ${err.message}`);
    }
  };

  return (
    <div className={forgotPasswordWrapper}>
      <h3 className={styles.textAlignLeft}>Reset Password</h3>
      <p>
        Check your email. If the username you entered was valid, a confirmation code was sent to the
        email address associated with your account.
      </p>
      <form onSubmit={handleSubmit}>
        <TextInput
          error={validationErrors.confirmationCode}
          labelText="Confirmation Code"
          onChange={createUpdateFormValueFn(setUsername)}
          value={confirmationCode}
        />
        <TextInput
          error={validationErrors.password}
          labelText="New Password"
          onChange={createUpdateFormValueFn(setPassword)}
          value={password}
        />
        <TextInput
          error={validationErrors.confirmPassword}
          labelText="Verify New Password"
          onChange={createUpdateFormValueFn(setConfirmPassword)}
          value={confirmPassword}
        />
        <div className={styles.textAlignLeft}>
          <Button disabled={buttonIsDisabled} text="submit" type="submit" />
        </div>
      </form>
      <p className={styles.messageContainer}>
        {errorMsg && <span className={styles.errorText}>{errorMsg}</span>}
      </p>
    </div>
  );
};

export default ConfirmForgotPassword;
