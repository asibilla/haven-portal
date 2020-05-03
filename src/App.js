import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { isAuthenticated } from './helpers/auth';
import AppContext from './helpers/context';
import { ViewWrapper } from './views/components';

const App = ({ url }) => {
    const [ authData, updateAuthData ] = useState({});

  useEffect(() => {
    (async () => {
        const auth = await isAuthenticated();
        updateAuthData(auth);
      })()
  }, [url]);

  return (
    <AppContext.Provider value={{ authData }}>
      <BrowserRouter>
        <ViewWrapper />
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
