import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { isAuthenticated } from './helpers/auth';
import AppContext from './helpers/context';
import { ViewWrapper } from './views/components';

const App = ({ url }) => {
  const [authData, updateAuthData] = useState({});
  const [authVerified, setAuthVerified] = useState(false);

  // For storing username on password reset requests
  const [usernameForReset, setUsernameForReset] = useState('');

  useEffect(() => {
    (async () => {
      const auth = await isAuthenticated();
      updateAuthData(auth);
      setAuthVerified(true);
    })();
  }, [url]);

  const addAuthData = (data) => {
    const newAuthData = {
      ...authData,
      ...data,
    };

    updateAuthData(newAuthData);
  };

  const clearAuthData = () => updateAuthData({});

  return (
    <AppContext.Provider
      value={{
        addAuthData,
        authData,
        clearAuthData,
        setUsernameForReset,
        usernameForReset,
      }}
    >
      <BrowserRouter>{authVerified && <ViewWrapper />}</BrowserRouter>
    </AppContext.Provider>
  );
};

App.defaultProps = {
  url: '',
};

App.propTypes = {
  url: string,
};

export default App;
