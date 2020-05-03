import React, { useState } from 'react';

import { TextInput } from '../components';

const UserSignin = () => {
  const [ userName, setUserName ] = useState('');
  const [ password, setPassword ] = useState('');

  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  return (
    <div>
      <h1>
        User Sign In Page
      </h1>
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
    </div>
  );
};

export default UserSignin;
