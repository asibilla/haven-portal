import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { styles } from '../../constants';
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
        {users.map((user) => (
          <div key={user.username}>
            <div>{user.username}</div>
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
