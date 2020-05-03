import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { isAuthenticated } from './helpers/auth';
import { ViewWrapper } from './views/components';

const App = ({ url }) => {
  useEffect(() => {
      isAuthenticated();
  }, [url]);

  return (
    <div>
      <BrowserRouter>
        <ViewWrapper />
      </BrowserRouter>
    </div>
  );
};

export default App;
