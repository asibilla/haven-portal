import { isEmpty } from 'lodash';
import React, { useContext, useState } from 'react';
import { cx } from 'react-emotion';
import { Link } from 'react-router-dom';

import { routes, styles } from '../../constants';
import { forgotPasswordWrapper, listStyle } from '../../constants/styles/signin';
import { confirmForgotPassword } from '../../helpers/cognito';
import AppContext from '../../helpers/context';
import { createUpdateFormValueFn } from '../../helpers/formHelpers';
import { ValidationItem, validateItems } from '../../helpers/formValidation';
import { Button, TextInput } from '../components';

const ConfirmForgotPassword = () => {
  const { setUsernameForReset, usernameForReset } = useContext(AppContext);
  const [confirmationCode, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);

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
      await confirmForgotPassword({ confirmationCode, password, username: usernameForReset });
      setHasSucceeded(true);
      setUsernameForReset('');
    } catch (err) {
      setErrorMsg(`Something went wrong: ${err.message}`);
      setButtonIsDisabled(false);
    }
  };

  return (
    <div className={forgotPasswordWrapper}>
      <h3 className={styles.textAlignLeft}>Reset Password</h3>
      {!hasSucceeded ? (
        <>
          <p>
            Check your email. If the username you entered was valid, a confirmation code was sent to
            the email address associated with your account.
          </p>
          <p>Do not close or refresh this window until you&apos;ve submitted the form.</p>
          <form onSubmit={handleSubmit}>
            <TextInput
              error={validationErrors.confirmationCode}
              labelText="Confirmation Code"
              onChange={createUpdateFormValueFn(setUsername)}
              value={confirmationCode}
            />
            <p className={styles.textAlignLeft}>Passwords must include:</p>
            <ul className={listStyle}>
              <li>At least 8 characters</li>
              <li>At least 1 lowercase character</li>
              <li>At least 1 uppercase character</li>
              <li>At least 1 number</li>
              <li>At least 1 special character (e.g. @,!,$,-)</li>
            </ul>
            <TextInput
              error={validationErrors.password}
              labelText="New Password"
              onChange={createUpdateFormValueFn(setPassword)}
              type="password"
              value={password}
            />
            <TextInput
              error={validationErrors.confirmPassword}
              labelText="Verify New Password"
              onChange={createUpdateFormValueFn(setConfirmPassword)}
              type="password"
              value={confirmPassword}
            />
            <div className={styles.textAlignLeft}>
              <Button disabled={buttonIsDisabled} text="submit" type="submit" />
            </div>
          </form>
          <p className={styles.messageContainer}>
            {errorMsg && <span className={styles.errorText}>{errorMsg}</span>}
          </p>
        </>
      ) : (
        <>
          <p className={cx(styles.successText, styles.textAlignLeft, styles.noPadding)}>
            You password has been reset!
          </p>
          <p>
            Please
            <Link to={routes.userSignIn}>{' SIGN IN '}</Link>
            to continue.
          </p>
        </>
      )}
    </div>
  );
};

export default ConfirmForgotPassword;
