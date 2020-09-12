import { noop } from 'lodash';
import { createContext } from 'react';

export const defaultContext = {
  addAuthData: noop,
  authData: {},
  buyers: [],
  clearAuthData: noop,
  orgs: [],
  setBuyers: noop,
  setOrgs: noop,
  setUsernameForReset: noop,
  setUsers: noop,
  usernameForReset: '',
  users: [],
};

export default createContext(defaultContext);
