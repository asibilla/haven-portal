import { arrayOf, func, shape } from 'prop-types';
import React, { useState } from 'react';

import { styles } from '../../constants';
import { userRow, usersHeaderRow } from '../../constants/styles/manageUsers';
import { propertyPropType } from '../../constants/propTypeObjects';

import { formatDate } from '../../helpers';

import OrgFilter from './OrgFilter';
import Spinner from './Spinner';

const ManageProperties = ({ deleteItem, properties, setEditIsActive, setSelectedItem }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState('');

  const createManageFn = (property) => () => {
    setSelectedItem(property);
    setEditIsActive(true);
  };

  const createDeleteUserFn = (property) => {
    return async () => {
      setLoading(true);
      await setSelectedItem(property);
      await deleteItem();
      setLoading(false);
    };
  };

  return (
    <div>
      <h3>Manage Properties</h3>
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
          {properties.length > 0 && (
            <>
              <div className={usersHeaderRow}>
                <div className="username">Lot</div>
                <div className="email">Name</div>
                <div>Phase</div>
                <div>Close of Escrow</div>
              </div>

              {properties.map((property) => (
                <div className={userRow} key={property.id}>
                  <div className="username cell">
                    <div className="mobile-label">Lot:</div>
                    <div className="value">{property.lot}</div>
                  </div>
                  <div className="email cell">
                    <div className="mobile-label">Name:</div>
                    <div className="value">{property.propertyName}</div>
                  </div>
                  <div className="cell">
                    <div className="mobile-label">Phase:</div>
                    <div className="value">{property.phase}</div>
                  </div>
                  <div className="cell">
                    <div className="mobile-label">Close of Escrow:</div>
                    <div className="value">
                      {formatDate(new Date(property.closeOfEscrow || Date.now()))}
                    </div>
                  </div>
                  <div className="manage cell">
                    <a href="#manage" onClick={createManageFn(property)}>
                      Manage
                    </a>
                    &nbsp;|&nbsp;
                    <a href="#delete" onClick={createDeleteUserFn(property)}>
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
  properties: [],
};

ManageProperties.propTypes = {
  deleteItem: func.isRequired,
  properties: arrayOf(shape(propertyPropType)),
  setEditIsActive: func.isRequired,
  setSelectedItem: func.isRequired,
};

export default ManageProperties;
