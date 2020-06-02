import React, { useContext, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { routes, styles } from '../../constants';
import {
  forgotPasswordLink,
  inputMargin,
  listStyle,
  logoWrapper,
  wrapper,
} from '../../constants/styles/signin';
import { completePasswordChallenge, getJwt, isAdmin, signIn } from '../../helpers/auth';
import AppContext from '../../helpers/context';
import { createUpdateFormValueFn } from '../../helpers/formHelpers';
import { Button, TextInput } from '../components';

/**
 * TODO: Disable submit button while api is being called.
 * Add Forgot Password feature.
 */

const UserSignin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [shouldShowPasswordChallenge, showPasswordChallenge] = useState(false);

  const history = useHistory();
  const { addAuthData, authData } = useContext(AppContext);

  const onError = (msg) => {
    setFormError(msg);
  };

  const onLogin = (newAuthData) => {
    setFormError('');
    addAuthData(newAuthData);
    const redirectRoute = isAdmin(newAuthData) ? routes.adminHome : routes.userHome;
    history.push(redirectRoute);
  };

  const onNewPasswordRequired = ({ user }) => {
    addAuthData({ user });
    showPasswordChallenge(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ authData, onError, onLogin, onNewPasswordRequired, password, userName });
  };

  const handlePasswordChallengeSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      onError('Passwords must match.');
    } else {
      completePasswordChallenge({ authData, onError, onLogin, password: newPassword });
    }
  };

  if (getJwt(authData)) {
    if (isAdmin(authData)) {
      return <Redirect to={routes.adminHome} />;
    }
    return <Redirect to={routes.userHome} />;
  }

  return (
    <div className={wrapper}>
      <div className={logoWrapper}>
        <img alt="Haven Development Logo" src="/images/haven-logo.jpg" />
      </div>
      {!shouldShowPasswordChallenge ? (
        <>
          <h3>LOG IN</h3>
          <form onSubmit={handleSubmit}>
            {formError && <p className={styles.errorText}>{formError}</p>}
            <TextInput
              className={inputMargin}
              onChange={createUpdateFormValueFn(setUserName)}
              placeholder="Username"
              value={userName}
            />
            <TextInput
              className={inputMargin}
              onChange={createUpdateFormValueFn(setPassword)}
              placeholder="Password"
              type="password"
              value={password}
            />
            <div className={forgotPasswordLink}>
              <Link to={routes.forgotPassword}>Forgot Password</Link>
            </div>
            <Button text="submit" type="submit" />
          </form>
        </>
      ) : (
        <>
          <h4>Please select a new password</h4>
          <p className={styles.textAlignLeft}>Passwords must include:</p>
          <ul className={listStyle}>
            <li>At least 8 characters</li>
            <li>At least 1 lowercase character</li>
            <li>At least 1 uppercase character</li>
            <li>At least 1 number</li>
            <li>At least 1 special character (e.g. @,!,$,-)</li>
          </ul>
          <form onSubmit={handlePasswordChallengeSubmit}>
            {formError && <p className={styles.errorText}>{formError}</p>}
            <TextInput
              className={inputMargin}
              onChange={createUpdateFormValueFn(setNewPassword)}
              placeholder="Password"
              type="password"
              value={newPassword}
            />
            <TextInput
              onChange={createUpdateFormValueFn(setConfirmPassword)}
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
            />
            <Button text="Submit" type="submit" />
          </form>
        </>
      )}
    </div>
  );
};

export default UserSignin;
