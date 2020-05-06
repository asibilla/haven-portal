import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { getJwt, isAdmin, signIn } from '../../helpers/auth';
import AppContext from '../../helpers/context';
import { Button, TextInput } from '../components';

const UserSignin = () => {
  const [ userName, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ formError, setFormError ] = useState('');
  const [ shouldShowPasswordChallenge, showPasswordChallenge ] = useState(false);

  const history = useHistory();
  const { addAuthData, authData } = useContext(AppContext);

  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);


  const onError = (msg) => {
    setFormError(msg);
  };

  const onLogin = (newAuthData) => {
    setFormError('');
    addAuthData(newAuthData);
    const redirectRoute = isAdmin(newAuthData) ? routes.adminHome : routes.userHome;
    history.push(redirectRoute);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ authData, onError, onLogin, password, userName });
  };


  if (getJwt(authData)) {
    if (isAdmin(authData)) {
      return <Redirect to={routes.adminHome} />
    }
    return <Redirect to={routes.userHome} />
  }

  return (
    <div>
      <h1>
        User Sign In Page
      </h1>
      <form onSubmit={handleSubmit}>
        { formError && (
          <span>{formError}</span>
        )}
        <TextInput 
          onChange={updateUserName}
          placeholder="username"
          value={userName}
        />
        <TextInput 
          onChange={updatePassword}
          placeholder="password"
          type="password"
          value={password}
        />
        <Button 
          text="submit"
          type="submit"
        />
      </form>
    </div>
  );
};

export default UserSignin;
