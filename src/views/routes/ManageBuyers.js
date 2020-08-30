import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../../constants';
import { addNew, userRow, usersHeaderRow } from '../../constants/styles/manageUsers';

import AddBuyerForm from '../components/AddBuyerForm';
import Spinner from '../components/Spinner';

const ManageBuyers = ({ url }) => {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isNewUserView, setIsNewUserView] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshUsers = async () => {
    setUsers([]);
    try {
      console.log('refreshing users');
    } catch (e) {
      setErrorMsg(`Something went wrong: ${e.message}`);
    }
  };

  useEffect(() => {
    (async () => {
      if (users.length) {
        setLoading(false);
      } else {
        try {
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
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
    return async () => {
      setSuccessMsg(username);
    };
  };

  if (isNewUserView) {
    return <AddBuyerForm onCancel={toggleNewUserView(false)} refresh={refreshUsers} />;
  }

  return (
    <div>
      <h3>Manage Buyers</h3>
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
              + Add New Buyer
            </a>
          </div>
          <div className={usersHeaderRow}>
            <div className="username">Name</div>
            <div className="email">Email</div>
            <div>Status</div>
            <div>Invite Sent Date</div>
          </div>

          {users.map((user) => (
            <div className={userRow} key={user.username}>
              <div className="username cell">
                <div className="mobile-label">Username:</div>
                <div className="value">{user.username}</div>
              </div>
              <div className="email cell">
                <div className="mobile-label">Email:</div>
                <div className="value">{user.email}</div>
              </div>
              <div className="cell">
                <div className="mobile-label">User Group:</div>
                <div className="value">{user.groups.length ? `${user.groups[0]}` : 'none'}</div>
              </div>
              <div className="cell">
                <div className="mobile-label">Enabled Status:</div>
                <div className="value">{user.enabledStatus}</div>
              </div>
              <div className="manage cell">
                <Link to={`/admin/manage-user/${user.username}`}>Manage</Link>
                &nbsp;|&nbsp;
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

ManageBuyers.defaultProps = {
  url: '',
};

ManageBuyers.propTypes = {
  url: string,
};

export default ManageBuyers;
