import React, { useContext, useState } from 'react';

import { signIn } from '../../helpers/auth';
import AppContext from '../../helpers/context';
import { Button, TextInput } from '../components';

const UserSignin = () => {
  const [ userName, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');


  /**
   * TODO NEXT: if accessToken, redirect based on user group.
   * if no access, pass userpool to signin so we don't have to recreate. 
   */
  const { authData } = useContext(AppContext);
  console.log('auth data', authData);

  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ password, userName });
  };

  return (
    <div>
      <h1>
        User Sign In Page
      </h1>
      <form onSubmit={handleSubmit}>
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
