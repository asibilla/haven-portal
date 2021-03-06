import { string } from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { css } from 'react-emotion';

import { styles } from '../../constants';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';

import formatDate, { daysInMs, calculateMaxDate } from '../../helpers/dateFormatter';
import AppContext from '../../helpers/context';
import { scanDB } from '../../helpers/db';

import { Button, DateSelect, DropdownMenu, DropdownOption } from '../components';

const pageWrapper = css`
  margin: 44px 0;
`;

const datePickerWrapper = css`
  margin-bottom: 44px;
`;

const Scheduler = ({ url }) => {
  const { authData } = useContext(AppContext);
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedBuyerId, setSelectedBuyerId] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [cutoff1, setCutoff1] = useState('');
  const [cutoff2, setCutoff2] = useState('');
  const [cutoff3, setCutoff3] = useState('');

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

  const createDatepickerOnChange = (setState) => (e) => {
    setState(formatDate(e));
  };

  const getCuttoffMax = (days) => {
    return formatDate(
      calculateMaxDate({
        days: daysInMs(days),
        startDate: selectedProperty.houseStartDate,
      })
    );
  };

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
              <>
                <div className="mb">
                  <p className="bold">Scheduling Info</p>
                  <p>{`House Start Date: ${selectedProperty.houseStartDate}`}</p>
                  <p>
                    {`Spin Date: ${formatDate(
                      calculateMaxDate({
                        days: daysInMs(1),
                        startDate: selectedProperty.houseStartDate,
                      })
                    )}`}
                  </p>
                  <p>
                    {`Pour Foundation: ${formatDate(
                      calculateMaxDate({
                        days: daysInMs(23),
                        startDate: selectedProperty.houseStartDate,
                      })
                    )}`}
                  </p>
                </div>
                <div>
                  <p className="bold">Property Info</p>
                  <p>{`Name: ${selectedProperty.propertyName}`}</p>
                  <p>{`Lot: ${selectedProperty.lot}`}</p>
                  <p>{`Model: ${selectedProperty.model}`}</p>
                  <p>{`Phase: ${selectedProperty.phase}`}</p>
                  <p>{`Tract: ${selectedProperty.tract}`}</p>
                  <p>{`Close of Escrow: ${formatDate(selectedProperty.closeOfEscrow)}`}</p>
                </div>
              </>
            )}
          </div>
          <div className={formSection}>
            {!selectedProperty.houseStartDate ? (
              <p>
                A House Start Date has not been assigned to this property. Please assign a date in
                the Properties section.
              </p>
            ) : (
              <div>
                <DateSelect
                  className={datePickerWrapper}
                  labelText={`Cutoff 1 (${getCuttoffMax(44)}):`}
                  maxDate={getCuttoffMax(44)}
                  minDate={selectedProperty.houseStartDate}
                  onChange={createDatepickerOnChange(setCutoff1)}
                  placeholder="Schedule a date for first cutoff"
                  startDate={cutoff1}
                />
                <DateSelect
                  className={datePickerWrapper}
                  disabled={!cutoff1}
                  labelText={`Cutoff 2 (${getCuttoffMax(95)}):`}
                  maxDate={getCuttoffMax(95)}
                  minDate={cutoff1}
                  onChange={createDatepickerOnChange(setCutoff2)}
                  placeholder="Schedule a date for second cutoff"
                  startDate={cutoff2}
                />
                <DateSelect
                  className={datePickerWrapper}
                  disabled={!cutoff1 || !cutoff2}
                  labelText={`Cutoff 3 (${getCuttoffMax(187)})`}
                  maxDate={getCuttoffMax(187)}
                  minDate={cutoff2}
                  onChange={createDatepickerOnChange(setCutoff3)}
                  placeholder="Schedule a date for final cutoff"
                  startDate={cutoff3}
                />
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
