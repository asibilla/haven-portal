import { isEmpty } from 'lodash';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { routes, styles } from '../../constants';
import { forgotPasswordWrapper } from '../../constants/styles/signin';
import { forgotPassword } from '../../helpers/cognito';
import AppContext from '../../helpers/context';
import { createUpdateFormValueFn } from '../../helpers/formHelpers';
import { ValidationItem, validateItems } from '../../helpers/formValidation';
import { Button, TextInput } from '../components';

const ForgotPassword = () => {
  const history = useHistory();
  const { setUsernameForReset } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonIsDisabled(true);
    setValidationErrors({});

    const validationObj = [
      new ValidationItem({
        displayName: 'Username',
        fieldName: 'username',
        isRequiredString: true,
        value: username,
      }),
    ];

    const errors = validateItems({ items: validationObj });

    if (!isEmpty(errors)) {
      setValidationErrors(errors);
      setButtonIsDisabled(false);
      return;
    }

    try {
      await forgotPassword({ username });
      setButtonIsDisabled(false);
      setUsernameForReset(username);
      history.push(routes.confirmForgotPassword);
    } catch (err) {
      setErrorMsg(`Something went wrong: ${err.message}`);
      setButtonIsDisabled(false);
    }
  };

  return (
    <div className={forgotPasswordWrapper}>
      <h3 className={styles.textAlignLeft}>Reset Password</h3>
      <p className={styles.textAlignLeft}>Please enter your username</p>
      <form onSubmit={handleSubmit}>
        <TextInput
          error={validationErrors.username}
          onChange={createUpdateFormValueFn(setUsername)}
          placeholder="Username"
          value={username}
        />
        <Button disabled={buttonIsDisabled} text="submit" type="submit" />
      </form>
      <p className={styles.messageContainer}>
        {errorMsg && <span className={styles.errorText}>{errorMsg}</span>}
      </p>
    </div>
  );
};

export default ForgotPassword;
