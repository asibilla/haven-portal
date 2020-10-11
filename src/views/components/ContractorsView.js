import { arrayOf, func, shape } from 'prop-types';
import React, { useState } from 'react';

import { userRow, usersHeaderRow } from '../../constants/styles/manageUsers';
import { buyerPropType } from '../../constants/propTypeObjects';
import Spinner from './Spinner';

const ContractorsView = ({ deleteItem, contractors, setEditIsActive, setSelectedItem }) => {
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h3>Manage Contractors</h3>
      <div>
        {!!contractors.length && (
          <>
            <div className={usersHeaderRow}>
              <div className="username">Name</div>
              <div className="email">Email</div>
              <div>Phone</div>
              <div>Invite Sent Date</div>
            </div>

            {contractors.map((contractor) => (
              <div className={userRow} key={contractor.email}>
                <div className="username cell">
                  <div className="mobile-label">Name:</div>
                  <div className="value">{`${contractor.firstName} ${contractor.lastName}`}</div>
                </div>
                <div className="email cell">
                  <div className="mobile-label">Email:</div>
                  <div className="value">{contractor.email}</div>
                </div>
                <div className="cell">
                  <div className="mobile-label">Phone:</div>
                  <div className="value">{contractor.phone}</div>
                </div>
                <div className="cell">
                  <div className="mobile-label">Company Name: </div>
                  <div className="value">{contractor.companyName}</div>
                </div>
                <div className="manage cell">
                  <a href="#manage" onClick={createManageFn(contractor)}>
                    Manage
                  </a>
                  &nbsp;|&nbsp;
                  <a href="#delete" onClick={createDeleteBuyerFn(contractor)}>
                    Delete
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

ContractorsView.defaultProps = {
  contractors: [],
};

ContractorsView.propTypes = {
  deleteItem: func.isRequired,
  contractors: arrayOf(shape(buyerPropType)),
  setEditIsActive: func.isRequired,
  setSelectedItem: func.isRequired,
};

export default ContractorsView;
