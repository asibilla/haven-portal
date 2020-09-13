import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { styles } from '../../constants';
import { addNew, userRow, usersHeaderRow } from '../../constants/styles/manageUsers';

import { getConsumers, getOrgs } from '../../helpers/ajax';
import AppContext from '../../helpers/context';

import AddBuyerForm from '../components/AddBuyerForm';
import Spinner from '../components/Spinner';

const ManageBuyers = ({ url }) => {
  const { authData, buyers, orgs, setBuyers, setOrgs } = useContext(AppContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isNewBuyerView, setIsNewBuyerView] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshBuyers = async () => {
    setBuyers([]);
    const { idData: { jwtToken = '' } = {} } = authData;
    const promises = [getConsumers({ authToken: jwtToken }), getOrgs({ authToken: jwtToken })];

    return Promise.all(promises)
      .then((responses) => {
        responses.forEach(async (response, index) => {
          const { data, error } = response;
          if (error || !data || !data.Items) {
            throw error;
          } else if (index === 0) {
            setBuyers(data.Items);
          } else {
            setOrgs(data.Items);
          }
        });
      })
      .catch((err) => {
        setErrorMsg(`Something went wrong: ${err.message}`);
      });
  };

  useEffect(() => {
    (async () => {
      if (buyers.length && orgs.length) {
        setLoading(false);
      } else {
        try {
          await refreshBuyers();
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
      setIsNewBuyerView(show);
    };
  };

  const createDeleteUserFn = (username) => {
    return async () => {
      setSuccessMsg(username);
    };
  };

  if (isNewBuyerView) {
    return <AddBuyerForm onCancel={toggleNewUserView(false)} refresh={refreshBuyers} orgs={orgs} />;
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

          {buyers.map((buyer) => (
            <div className={userRow} key={buyer.EmailAddress}>
              <div className="username cell">
                <div className="mobile-label">Name:</div>
                <div className="value">{`${buyer.FirstName} ${buyer.LastName}`}</div>
              </div>
              <div className="email cell">
                <div className="mobile-label">Email:</div>
                <div className="value">{buyer.EmailAddress}</div>
              </div>
              <div className="cell">
                <div className="mobile-label">Status:</div>
                <div className="value">placeholder for status</div>
              </div>
              <div className="cell">
                <div className="mobile-label">Invite Sent Date:</div>
                <div className="value">
                  {buyer.InviteSentDate ? `${buyer.InviteSentDate}` : 'unknown'}
                </div>
              </div>
              <div className="manage cell">
                <a href="#manage">Manage</a>
                &nbsp;|&nbsp;
                <a href="#delete" onClick={createDeleteUserFn(buyer.username)}>
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
