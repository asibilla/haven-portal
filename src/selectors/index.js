import { find } from 'lodash';

export const selectUser = ({ username, users }) => {
  return find(users, (user) => user.username === username) || null;
};
