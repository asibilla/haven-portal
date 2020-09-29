import { arrayOf, func, shape, string } from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { css } from 'react-emotion';

import { styles } from '../../constants';
import { userRow, usersHeaderRow } from '../../constants/styles/manageUsers';
import { propertyPropType } from '../../constants/propTypeObjects';

import AppContext from '../../helpers/context';
import { scanDB } from '../../helpers/db';

import { Button, DropdownMenu, DropdownOption } from '.';
import Spinner from './Spinner';

const buttonContainer = css`
  margin-bottom: 20px;
`;

const ManageProperties = ({ deleteItem, properties, setEditIsActive, setSelectedItem, url }) => {
  const { authData, orgs, setOrgs } = useContext(AppContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dateFormatter = new Intl.DateTimeFormat('en-US');

  const fetchOrgs = async () => {
    try {
      const data = await scanDB({
        authData,
        tableName: 'orgs',
      });
      setOrgs(data.Items);
    } catch (e) {
      setErrorMsg(`An error occured: ${e.message}`);
    }
  };

  const selectOrg = (e) => {
    setSelectedOrg(e.target.value);
    if (e.target.value) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const filterProperties = async () => {};

  useEffect(() => {
    (async () => {
      try {
        await fetchOrgs();
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [url]);

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
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {orgs.length && (
            <>
              <DropdownMenu id="org" label="Filter By Org" onChange={selectOrg} value={selectedOrg}>
                <DropdownOption text="" value="" />
                {orgs &&
                  orgs.map((o) => (
                    <Fragment key={o.id}>
                      <DropdownOption text={o.orgName} value={o.id} />
                    </Fragment>
                  ))}
              </DropdownMenu>
              <div className={buttonContainer}>
                <Button
                  disabled={buttonDisabled}
                  onClick={filterProperties}
                  text="Filter"
                  type="button"
                />
              </div>
            </>
          )}

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
                      {dateFormatter.format(new Date(property.closeOfEscrow || Date.now()))}
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
  url: '',
};

ManageProperties.propTypes = {
  deleteItem: func.isRequired,
  properties: arrayOf(shape(propertyPropType)),
  setEditIsActive: func.isRequired,
  setSelectedItem: func.isRequired,
  url: string,
};

export default ManageProperties;
