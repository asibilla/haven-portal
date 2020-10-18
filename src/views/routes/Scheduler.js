import { string } from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { css } from 'react-emotion';

import { styles } from '../../constants';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';

import AppContext from '../../helpers/context';
import { scanDB } from '../../helpers/db';

import { Button, DropdownMenu, DropdownOption } from '../components';

const pageWrapper = css`
  margin: 44px 0;
`;

const Scheduler = ({ url }) => {
  const { authData } = useContext(AppContext);
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedBuyerId, setSelectedBuyerId] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  // const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buyerData = await scanDB({
          authData,
          tableName: 'buyers',
        });

        setBuyers(buyerData.Items.filter((buyer) => buyer.propertyId));

        const propertyData = await scanDB({
          authData,
          tableName: 'properties',
        });
        setProperties(propertyData.Items);
      } catch (e) {
        setSubmitError(`Something went wrong: ${e.message}`);
      }
    };
    fetchData();
  }, [url]);

  const getSelectedProperty = (b) => {
    return properties.find((property) => property.id === b.propertyId);
  };

  const selectBuyer = (e) => {
    const buyer = buyers.find((b) => b.id === e.target.value);
    setSelectedBuyerId(e.target.value);
    setSelectedBuyer(buyer);
    setSelectedProperty(getSelectedProperty(buyer));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonIsDisabled(true);
    setSubmitSuccess('Under Construction');
  };

  console.log('selected property', selectedProperty);
  console.log('selected buyer', selectedBuyer);

  return (
    <div className={pageWrapper}>
      <h3>Scheduler</h3>

      {buyers.length > 0 && (
        <DropdownMenu
          id="selectedBuyerId"
          label="Select a Buyer"
          onChange={selectBuyer}
          value={selectedBuyerId}
        >
          <DropdownOption text="" value="" />
          {buyers.map((b) => (
            <Fragment key={b.id}>
              <DropdownOption text={`${b.firstName} ${b.lastName}`} value={b.id} />
            </Fragment>
          ))}
        </DropdownMenu>
      )}

      {submitError && <div className={styles.errorText}>{submitError}</div>}
      {submitSuccess && <div className={styles.successText}>{submitSuccess}</div>}

      {selectedBuyer && (
        <form className={formContainer} onSubmit={handleSubmit}>
          <div className={formSection}>
            {selectedProperty && (
              <div>
                <p>Property Info</p>
                <p>{`Name: ${selectedProperty.propertyName}`}</p>
              </div>
            )}
          </div>
          <div className={formSection}>
            {!selectedBuyer.spinDate ? (
              <p>A Spin Date has not been assigned. Please assign a date in the buyers section.</p>
            ) : (
              <div>
                <div className={buttonContainer}>
                  <Button disabled={buttonIsDisabled} text="Submit" type="submit" />
                </div>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

Scheduler.defaultProps = {
  url: '',
};

Scheduler.propTypes = {
  url: string,
};

export default Scheduler;
