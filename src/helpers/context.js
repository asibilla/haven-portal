import { createContext } from 'react';

export const defaultContext = {
  authData: {},
};

export default createContext(defaultContext);
