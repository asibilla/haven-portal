import { createContext } from 'react';

export const defaultContext = {
  authToken: '',
};

export default createContext(defaultContext);
