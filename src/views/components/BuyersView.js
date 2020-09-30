import { arrayOf, func, shape } from 'prop-types';
import React, { useState } from 'react';

import { styles } from '../../constants';
import { userRow, usersHeaderRow } from '../../constants/styles/manageUsers';
import { orgPropType } from '../../constants/propTypeObjects';

import OrgFilter from './OrgFilter';
import Spinner from './Spinner';

const BuyersView = ({ deleteItem, buyers, setEditIsActive, setSelectedItem }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState('');

  const createManageFn = (org) => () => {
    setSelectedItem(org);
    setEditIsActive(true);
  };

  const createDeleteBuyerFn = (org) => {
    return async () => {
      setLoading(true);
      await setSelectedItem(org);
      await deleteItem();
      setLoading(false);
    };
  };

  return (
    <div>
      <h3>Manage Buyers</h3>
      <div className={styles.messageContainer}>
        {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}
      </div>
      <OrgFilter
        selectedOrg={selectedOrg}
        setErrorMsg={setErrorMsg}
        setLoading={setLoading}
        setSelectedOrg={setSelectedOrg}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {!!buyers.length && (
            <>
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
                    <a href="#manage" onClick={createManageFn(buyer)}>
                      Manage
                    </a>
                    &nbsp;|&nbsp;
                    <a href="#delete" onClick={createDeleteBuyerFn(buyer)}>
                      Delete
                    </a>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

BuyersView.defaultProps = {
  buyers: [],
};

BuyersView.propTypes = {
  deleteItem: func.isRequired,
  buyers: arrayOf(shape(orgPropType)),
  setEditIsActive: func.isRequired,
  setSelectedItem: func.isRequired,
};

export default BuyersView;
