import { arrayOf, func, shape } from 'prop-types';
import React, { useState } from 'react';

import { userRow, usersHeaderRow } from '../../constants/styles/manageUsers';
import { orgPropType } from '../../constants/propTypeObjects';

import Spinner from './Spinner';

const ManageProperties = ({ deleteItem, orgs, setEditIsActive, setSelectedItem }) => {
  const [loading, setLoading] = useState(false);

  const createManageFn = (org) => () => {
    setSelectedItem(org);
    setEditIsActive(true);
  };

  const createDeleteUserFn = (org) => {
    return async () => {
      setLoading(true);
      await setSelectedItem(org);
      await deleteItem();
      setLoading(false);
    };
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {orgs.length > 0 && (
            <>
              <div className={usersHeaderRow}>
                <div className="three-quarters">Name</div>
              </div>

              {orgs.map((org) => (
                <div className={userRow} key={org.id}>
                  <div className="three-quarters cell">
                    <div className="mobile-label">Name:</div>
                    <div className="value">{org.orgName}</div>
                  </div>

                  <div className="manage cell one-quarter">
                    <a href="#manage" onClick={createManageFn(org)}>
                      Manage
                    </a>
                    &nbsp;|&nbsp;
                    <a href="#delete" onClick={createDeleteUserFn(org)}>
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

ManageProperties.defaultProps = {
  orgs: [],
};

ManageProperties.propTypes = {
  deleteItem: func.isRequired,
  orgs: arrayOf(shape(orgPropType)),
  setEditIsActive: func.isRequired,
  setSelectedItem: func.isRequired,
};

export default ManageProperties;
