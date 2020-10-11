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
  const [users, setUsers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const auth = await isAuthenticated();
        updateAuthData(auth);
        setAuthVerified(true);
      } catch (err) {
        updateAuthData({});
      }
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
        buyers,
        clearAuthData,
        orgs,
        properties,
        setBuyers,
        setOrgs,
        setProperties,
        setUsernameForReset,
        setUsers,
        usernameForReset,
        users,
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
