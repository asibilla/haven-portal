import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { styles } from '../../constants';
import { addNew, userData } from '../../constants/styles/manageUsers';
import {
  disableUser,
  enableUser,
  getUserWithGroups,
  resetUserPassword,
} from '../../helpers/cognito';
import AppContext from '../../helpers/context';
import { selectUser } from '../../selectors';

import Spinner from '../components/Spinner';

const ManageUser = ({ url }) => {
  const { id } = useParams();
  const history = useHistory();
  const { authData, setUsers, users } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const refreshUser = async () => {
    try {
      const cognitoUser = await getUserWithGroups({ authData, username: id });
      setUser(cognitoUser);
    } catch (err) {
      setErrorMsg(`Something went wrong: ${err.message}`);
    }
  };

  useEffect(() => {
    (async () => {
      const storedUser = selectUser({ username: id, users });
      if (storedUser) {
        setUser(storedUser);
        setLoading(false);
      } else {
        await refreshUser();
        setLoading(false);
      }
    })();
  }, [url]);

  const goBack = () => {
    history.push('/admin/manage-users');
  };

  const handleDisableUser = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg(null);
    setLoading(true);
    try {
      await disableUser({ authData, username: user.username });
      await refreshUser();
      setUsers([]);
      setSuccessMsg(
        'User successfully disabled! This user will not have access to the app until re-enabled.'
      );
      setLoading(false);
    } catch (err) {
      setErrorMsg(`User could not be disabled: ${err.message}`);
      setLoading(false);
    }
  };

  const handleEnableUser = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg(null);
    setLoading(true);
    try {
      await enableUser({ authData, username: user.username });
      await refreshUser();
      setUsers([]);
      setSuccessMsg('User successfully enabled! This user now has access to the app.');
      setLoading(false);
    } catch (err) {
      setErrorMsg(`User could not be enabled: ${err.message}`);
      setLoading(false);
    }
  };

  const handleResetUserPassword = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg(null);
    setLoading(true);
    try {
      await resetUserPassword({ authData, username: user.username });
      setUsers([]);
      setSuccessMsg('User password reset! User will be prompted to enter new password at login.');
      setLoading(false);
    } catch (err) {
      setErrorMsg(`User could not be enabled: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Manage User</h3>
      <div className={styles.messageContainer}>
        {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}
        {successMsg && <p className={styles.successText}>{successMsg}</p>}
      </div>
      <div className={addNew}>
        <a href="#manage-users" onClick={goBack}>
          {'<< Back'}
        </a>
      </div>
      {loading || !user ? (
        <Spinner />
      ) : (
        <div>
          <div className={userData}>
            <div className="label">Username:</div>
            <div className="value">{user.username}</div>
          </div>

          <div className={userData}>
            <div className="label">Email:</div>
            <div className="value">{user.email}</div>
          </div>

          {user.groups && user.groups.length && (
            <div className={userData}>
              <div className="label">User Group:</div>
              <div className="value">{user.groups[0]}</div>
            </div>
          )}

          <div className={userData}>
            <div className="label">Created:</div>
            <div className="value">{user.created}</div>
          </div>

          <div className={userData}>
            <div className="label">Last Modified:</div>
            <div className="value">{user.modified}</div>
          </div>

          <div className={userData}>
            <div className="label">Enabled Status:</div>
            <div className="value">{user.enabledStatus}</div>
          </div>

          <div className={userData}>
            <div className="label">Status:</div>
            <div className="value">{user.status}</div>
          </div>

          <div className={userData}>
            <div className="label">Actions:</div>
            <div className="value">
              <div className="action">
                {user.isEnabled ? (
                  <a href="#disable-user" onClick={handleDisableUser}>
                    Disable User
                  </a>
                ) : (
                  <a href="#enable-user" onClick={handleEnableUser}>
                    Enable User
                  </a>
                )}
              </div>
              <div className="action">
                <a href="#reset-user-password" onClick={handleResetUserPassword}>
                  Reset User Password
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ManageUser.defaultProps = {
  url: '',
};

ManageUser.propTypes = {
  url: string,
};

export default ManageUser;
