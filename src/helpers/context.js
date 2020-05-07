import { noop } from 'lodash';
import { createContext } from 'react';

export const defaultContext = {
  addAuthData: noop,
  authData: {},
  clearAuthData: noop,
};

export default createContext(defaultContext);
