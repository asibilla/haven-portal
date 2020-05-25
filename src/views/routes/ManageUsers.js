import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { styles } from '../../constants';
import { addNew, userRow, usersHeaderRow } from '../../constants/styles/manageUsers';
import { getGroupsForUsers, getUsers } from '../../helpers/cognito';
import AppContext from '../../helpers/context';

const ManageUsers = ({ url }) => {
  const { authData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const cognitoUsers = await getUsers({ authData });
        const usersWithGroups = await getGroupsForUsers({ authData, users: cognitoUsers });
        setUsers(usersWithGroups);
      } catch (e) {
        setErrorMsg(`Something went wrong: ${e.message}`);
      }
    })();
  }, [url]);

  return (
    <div>
      <h3>Manage Users</h3>
      <div className={styles.inputError}>{errorMsg && `${errorMsg}`}</div>
      <div>
        <div className={addNew}>+ Add New User</div>
        <div className={usersHeaderRow}>
          <div className="username">Username</div>
          <div className="email">Email Address</div>
          <div>Created</div>
          <div>User Group</div>
        </div>

        {users.map((user) => (
          <div className={userRow} key={user.username}>
            <div className="username">{user.username}</div>
            <div className="email">{user.email}</div>
            <div>{user.created}</div>
            <div>{user.groups.length ? `${user.groups[0]}` : 'none'}</div>
            <div className="manage">Manage | Delete</div>
          </div>
        ))}
      </div>
    </div>
  );
};

ManageUsers.defaultProps = {
  url: '',
};

ManageUsers.propTypes = {
  url: string,
};

export default ManageUsers;
