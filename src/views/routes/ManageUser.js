import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { styles } from '../../constants';
import { addNew } from '../../constants/styles/manageUsers';
import { getUserWithGroups } from '../../helpers/cognito';
import AppContext from '../../helpers/context';
import { selectUser } from '../../selectors';

import Button from '../components/Button';
import Spinner from '../components/Spinner';

const ManageUser = ({ url }) => {
  const { id } = useParams();
  const history = useHistory();
  const { authData, users } = useContext(AppContext);
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

  const handleSubmit = () => {
    setSuccessMsg('User successfully updated!');
  };

  const goBack = () => {
    history.push('/admin/manage-users');
  };

  return (
    <div>
      <h3>Manage Users</h3>
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
          <div>{`Username: ${user.username}`}</div>
          <div>
            <Button className={styles.buttonSecondary} onClick={goBack} text="Cancel" />
            <Button onClick={handleSubmit} text="Save" />
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
