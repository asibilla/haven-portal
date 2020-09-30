import { func, string } from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { css } from 'react-emotion';

import AppContext from '../../helpers/context';
import { scanDB } from '../../helpers/db';

import { Button, DropdownMenu, DropdownOption } from '.';

const buttonContainer = css`
  margin-bottom: 20px;
`;

const OrgFilter = ({ selectedOrg, setErrorMsg, setLoading, setSelectedOrg, url }) => {
  const { authData, orgs, setOrgs } = useContext(AppContext);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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

  const filterProperties = async () => {};

  const selectOrg = (e) => {
    setSelectedOrg(e.target.value);
    if (e.target.value) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

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

  return (
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
    </div>
  );
};

OrgFilter.defaultProps = {
  url: '',
};

OrgFilter.propTypes = {
  selectedOrg: string,
  setErrorMsg: func.isRequired,
  setLoading: func.isRequired,
  setSelectedOrg: func.isRequired,
  url: string,
};

export default OrgFilter;
