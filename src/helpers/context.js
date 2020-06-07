import { noop } from 'lodash';
import { createContext } from 'react';

export const defaultContext = {
  addAuthData: noop,
  authData: {},
  clearAuthData: noop,
  setUsernameForReset: noop,
  setUsers: noop,
  usernameForReset: '',
  users: [],
};

export default createContext(defaultContext);
