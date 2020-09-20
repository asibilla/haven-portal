import { string } from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';

import { styles } from '../../constants';
import { addNew, userRow, usersHeaderRow } from '../../constants/styles/manageUsers';

import { getOrgs, getProperties } from '../../helpers/ajax';
import AppContext from '../../helpers/context';

import { Button, DropdownMenu, DropdownOption } from '../components';
import AddBuyerForm from '../components/AddBuyerForm';
import Spinner from '../components/Spinner';

const ManageProperties = ({ url }) => {
  const { authData, properties, orgs, setProperties, setOrgs } = useContext(AppContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isNewBuyerView, setIsNewBuyerView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dateFormatter = new Intl.DateTimeFormat('en-US');

  
  const fetchOrgs = async () => {
    try {
      const { idData: { jwtToken = '' } = {} } = authData;
      const { data, error } = await getOrgs({ authToken: jwtToken });
      if (error || !data || !data.Items) {
        throw error || new Error('No org data found.');
      }
      setOrgs(data.Items);

    }
    catch(err) {
      setErrorMsg(`Something went wrong: ${err.message}`);
    }
  };

  const selectOrg = (e) => {
    setSelectedOrg(e.target.value);
    if (e.target.value) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  };

  const fetchProperties = async () => {
    setButtonDisabled(true);
    setProperties([]);
    setLoading(true);

    try {
      const { idData: { jwtToken = '' } = {} } = authData;
      const { data, error } = await getProperties({ authToken: jwtToken, orgId: selectedOrg });
      if (error || !data || !data.Items) {
        throw error || new Error('No org data found.');
      }
      setProperties(data.Items);
      setLoading(false);
    }
    catch(err) {
      setErrorMsg(`Something went wrong: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (orgs.length) {
        setLoading(false);
      } else {
        try {
          await fetchOrgs();
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      }
    })();
  }, [url]);

  const toggleNewPropertyView = (show = true) => {
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
    return <AddBuyerForm onCancel={toggleNewPropertyView(false)} refresh={getProperties} orgs={orgs} />;
  }

  return (
    <div>
      <h3>Manage Properties</h3>
      <div className={styles.messageContainer}>
        {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}
        {successMsg && <p className={styles.successText}>{successMsg}</p>}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className={addNew}>
            <a href="#add-new-user" onClick={toggleNewPropertyView()}>
              + Add New Property
            </a>
          </div>

          { orgs.length && (
            <>
            <DropdownMenu id="org" label="Select an Org" onChange={selectOrg} value={selectedOrg}>
              <DropdownOption text="" value="" />
              {orgs &&
                orgs.map((o) => (
                  <Fragment key={o.OrgId}>
                    <DropdownOption text={o.Name} value={o.OrgId} />
                  </Fragment>
                ))}
            </DropdownMenu>
            <Button disabled={buttonDisabled} onClick={fetchProperties} text="Get Properties" type="button" />
            </>
          )}

          { properties.length > 0 && (
            <>
              <div className={usersHeaderRow}>
                <div className="username">Lot</div>
                <div className="email">Name</div>
                <div>Phase</div>
                <div>Close of Escrow</div>
              </div>

              {properties.map((property) => (
                <div className={userRow} key={property.EmailAddress}>
                  <div className="username cell">
                    <div className="mobile-label">Lot:</div>
                    <div className="value">{property.Lot}</div>
                  </div>
                  <div className="email cell">
                    <div className="mobile-label">Name:</div>
                    <div className="value">{property.Name}</div>
                  </div>
                  <div className="cell">
                    <div className="mobile-label">Phase:</div>
                    <div className="value">{property.Phase}</div>
                  </div>
                  <div className="cell">
                    <div className="mobile-label">Close of Escrow:</div>
                    <div className="value">
                      {dateFormatter.format(new Date(property.CloseOfEscrow || Date.now()))}
                    </div>
                  </div>
                  <div className="manage cell">
                    <a href="#manage">Manage</a>
                    &nbsp;|&nbsp;
                    <a href="#delete" onClick={createDeleteUserFn(property.username)}>
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
  url: '',
};

ManageProperties.propTypes = {
  url: string,
};

export default ManageProperties;
