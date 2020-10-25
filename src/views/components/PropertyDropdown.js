import { func, string } from 'prop-types';
import React, { Fragment, useContext, useEffect } from 'react';

import AppContext from '../../helpers/context';
import { scanDB } from '../../helpers/db';

import { DropdownMenu, DropdownOption } from '.';

const PropertyDropdown = ({
  selectedOrg,
  selectedProperty,
  setErrorMsg,
  setLoading,
  setSelectedProperty,
  url,
}) => {
  const { authData, properties, setProperties } = useContext(AppContext);

  const fetchProperties = async () => {
    try {
      const data = await scanDB({
        authData,
        tableName: 'properties',
      });
      setProperties(data.Items);
    } catch (e) {
      setErrorMsg(`An error occured: ${e.message}`);
    }
  };

  const filterProperties = (ps) => {
    return ps.filter((property) => {
      return property.org === selectedOrg;
    });
  };

  const selectProperty = (e) => {
    setSelectedProperty(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchProperties();
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [url]);

  const filteredProperties = filterProperties(properties);

  return (
    <div>
      {properties.length > 0 && (
        <>
          <DropdownMenu
            id="property"
            label="Property"
            onChange={selectProperty}
            value={selectedProperty}
          >
            <DropdownOption text="" value="" />
            {properties &&
              filteredProperties.map((p) => (
                <Fragment key={p.id}>
                  <DropdownOption text={p.propertyName} value={p.id} />
                </Fragment>
              ))}
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

PropertyDropdown.defaultProps = {
  selectedOrg: '',
  selectedProperty: '',
  url: '',
};

PropertyDropdown.propTypes = {
  selectedOrg: string,
  selectedProperty: string,
  setErrorMsg: func.isRequired,
  setLoading: func.isRequired,
  setSelectedProperty: func.isRequired,
  url: string,
};

export default PropertyDropdown;
