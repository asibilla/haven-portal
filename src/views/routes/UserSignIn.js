import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { completePasswordChallenge, getJwt, isAdmin, signIn } from '../../helpers/auth';
import AppContext from '../../helpers/context';
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

  const createUpdateFormValueFn = (updateState) => {
    return (e) => updateState(e.target.value);
  };

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

  if (shouldShowPasswordChallenge) {
    return (
      <div>
        <h1>Please select a new password</h1>
        <p>Passwords must include:</p>
        <ul>
          <li>At least 8 characters</li>
          <li>At least 1 lowercase character</li>
          <li>At least 1 uppercase character</li>
          <li>At least 1 number</li>
          <li>At least 1 special character (e.g. @,!,$,-)</li>
        </ul>
        <form onSubmit={handlePasswordChallengeSubmit}>
          {formError && <span>{formError}</span>}
          <TextInput
            onChange={createUpdateFormValueFn(setNewPassword)}
            placeholder="password"
            type="password"
            value={newPassword}
          />
          <TextInput
            onChange={createUpdateFormValueFn(setConfirmPassword)}
            placeholder="confirm password"
            type="password"
            value={confirmPassword}
          />
          <Button text="submit" type="submit" />
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {formError && <span>{formError}</span>}
        <TextInput
          onChange={createUpdateFormValueFn(setUserName)}
          placeholder="username"
          value={userName}
        />
        <TextInput
          onChange={createUpdateFormValueFn(setPassword)}
          placeholder="password"
          type="password"
          value={password}
        />
        <Button text="submit" type="submit" />
      </form>
    </div>
  );
};

export default UserSignin;
