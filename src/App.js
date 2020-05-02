import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ViewWrapper } from './views/components';

const App = () => {
  return (
    <div>
        <BrowserRouter>
            <ViewWrapper />
        </BrowserRouter>
    </div>
  );
};

export default App;
