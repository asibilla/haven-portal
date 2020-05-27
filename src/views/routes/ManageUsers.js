import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { styles } from '../../constants';
import { addNew, userRow, usersHeaderRow } from '../../constants/styles/manageUsers';
import { deleteUser, getGroupsForUsers, getUsers } from '../../helpers/cognito';
import AppContext from '../../helpers/context';

import AddUserForm from '../components/AddUserForm';
import Spinner from '../components/Spinner';

const ManageUsers = ({ url }) => {
  const { authData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isNewUserView, setIsNewUserView] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshUsers = async () => {
    setUsers([]);
    try {
      const cognitoUsers = await getUsers({ authData });
      const usersWithGroups = await getGroupsForUsers({ authData, users: cognitoUsers });
      setUsers(usersWithGroups);
    } catch (e) {
      setErrorMsg(`Something went wrong: ${e.message}`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await refreshUsers();
        setLoading(false);
      } catch (e) {
        setErrorMsg(`Something went wrong: ${e.message}`);
        setLoading(false);
      }
    })();
  }, [url]);

  const toggleNewUserView = (show = true) => {
    return (e) => {
      e.preventDefault();
      setIsNewUserView(show);
    };
  };

  const createDeleteUserFn = (username) => {
    return async (e) => {
      e.preventDefault();
      if (
        window.confirm(
          'Are you sure you want to delete this user? This operation cannot be undone.'
        )
      ) {
        try {
          setLoading(true);
          await deleteUser({ authData, username });
          await refreshUsers();
          setSuccessMsg('User successfully deleted!');
          setLoading(false);
        } catch (err) {
          setErrorMsg(`User could not be deleted: ${err.message}`);
        }
      }
    };
  };

  if (isNewUserView) {
    return <AddUserForm onCancel={toggleNewUserView(false)} refresh={refreshUsers} />;
  }

  return (
    <div>
      <h3>Manage Users</h3>
      <div className={styles.messageContainer}>
        {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}
        {successMsg && <p className={styles.successText}>{successMsg}</p>}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className={addNew}>
            <a href="#add-new-user" onClick={toggleNewUserView()}>
              + Add New User
            </a>
          </div>
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
              <div className="manage">
                {`Manage${' | '}`}
                <a href="#delete" onClick={createDeleteUserFn(user.username)}>
                  Delete
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
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
