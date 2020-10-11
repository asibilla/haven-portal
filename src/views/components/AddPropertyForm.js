import { isEmpty, noop } from 'lodash';
import { func, shape, string } from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { styles } from '../../constants';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';
import { optionPropType } from '../../constants/propTypeObjects';

import AppContext from '../../helpers/context';
import { DBQueryItem, putItem, updateItem } from '../../helpers/db';
import { ValidationItem, validateItems } from '../../helpers/formValidation';

import { Button, DropdownMenu, DropdownOption, TextInput } from '.';

const AddPropertyForm = ({
  refreshData,
  selectedItem,
  showEditView,
  updateSuccessMessage,
  url,
}) => {
  const [org, setOrg] = useState('');
  const [propertyName, setName] = useState('');
  const [model, setModel] = useState('');
  const [tract, setTract] = useState('');
  const [phase, setPhase] = useState('');
  const [lot, setLot] = useState('');
  const [closeOfEscrow, setCloseOfEscrow] = useState('');

  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState('');

  const { authData, orgs } = useContext(AppContext);

  useEffect(() => {
    if (selectedItem) {
      setOrg(selectedItem.org);
      setName(selectedItem.propertyName);
      setModel(selectedItem.model);
      setTract(selectedItem.tract);
      setPhase(selectedItem.phase);
      setLot(selectedItem.lot);
      setCloseOfEscrow(selectedItem.closeOfEscrow);
    }
  }, [url]);

  const setValue = (setState) => {
    return (e) => {
      setState(e.target.value);
    };
  };

  const clearState = () => {
    setOrg('');
    setName('');
    setModel('');
  };

  const handleSubmit = async (e) => {
    setButtonIsDisabled(true);
    setValidationErrors({});
    e.preventDefault();

    const validationObj = [
      new ValidationItem({
        displayName: 'Name',
        fieldName: 'propertyName',
        isRequiredString: true,
        value: propertyName,
      }),
      new ValidationItem({
        displayName: 'Lot',
        fieldName: 'lot',
        isRequiredString: true,
        value: lot,
      }),
      new ValidationItem({
        displayName: 'Org',
        fieldName: 'org',
        isRequiredString: true,
        value: org,
      }),
    ];

    const errors = validateItems({ items: validationObj });

    if (!isEmpty(errors)) {
      setValidationErrors(errors);
      setButtonIsDisabled(false);
      return;
    }

    const id = selectedItem ? selectedItem.id : v4();

    if (selectedItem) {
      const queryItems = [
        new DBQueryItem({ id: ':a', key: 'org', value: org }),
        new DBQueryItem({ id: ':b', key: 'propertyName', value: propertyName }),
        new DBQueryItem({ id: ':d', key: 'model', value: model }),
        new DBQueryItem({ id: ':e', key: 'tract', value: tract }),
        new DBQueryItem({ id: ':f', key: 'phase', value: phase }),
        new DBQueryItem({ id: ':g', key: 'lot', value: lot }),
        new DBQueryItem({ id: ':j', key: 'closeOfEscrow', value: closeOfEscrow }),
      ];

      const keyItems = {
        id,
      };

      try {
        await updateItem({ authData, items: queryItems, keyItems, tableName: 'properties' });
        updateSuccessMessage('Option successfully updated!');
        await refreshData();
        showEditView(false)();
      } catch (err) {
        setSubmitError(`An error occured: ${err.message}`);
        setButtonIsDisabled(false);
      }
    } else {
      const item = {
        id,
        closeOfEscrow,
        lot,
        model,
        org,
        phase,
        propertyName,
        tract,
      };

      try {
        await putItem({ authData, item, tableName: 'properties' });
        setSubmitSuccess('Your property has been added!');
        clearState();
        refreshData();
      } catch (err) {
        setSubmitError(`An error occured: ${err.message}`);
      }
      setButtonIsDisabled(false);
    }
  };

  return (
    <div>
      <h3>{selectedItem ? 'Edit Property' : 'Add a New Property'}</h3>
      <form className={formContainer} onSubmit={handleSubmit}>
        <div className={formSection}>
          <DropdownMenu
            error={validationErrors.org}
            id="org"
            label="Org"
            onChange={setValue(setOrg)}
            value={org}
          >
            <DropdownOption text="" value="" />
            {orgs &&
              orgs.map((o) => (
                <Fragment key={o.id}>
                  <DropdownOption text={o.orgName} value={o.id} />
                </Fragment>
              ))}
          </DropdownMenu>
          <TextInput
            error={validationErrors.propertyName}
            labelText="Name"
            onChange={setValue(setName)}
            value={propertyName}
          />
          <TextInput labelText="Model" onChange={setValue(setModel)} value={model} />
          <TextInput labelText="Tract" onChange={setValue(setTract)} value={tract} />
        </div>

        <div className={formSection}>
          <TextInput labelText="Phase" onChange={setValue(setPhase)} value={phase} />
          <TextInput
            error={validationErrors.lot}
            labelText="Lot"
            onChange={setValue(setLot)}
            value={lot}
          />
          <TextInput
            labelText="Close of Escrow"
            onChange={setValue(setCloseOfEscrow)}
            value={closeOfEscrow}
          />

          <div className={buttonContainer}>
            {selectedItem && (
              <Button
                className={styles.buttonSecondary}
                disabled={buttonIsDisabled}
                onClick={showEditView(false)}
                text="Cancel"
              />
            )}
            <Button disabled={buttonIsDisabled} text="Submit" type="submit" />
          </div>
          {submitError && <div className={styles.errorText}>{submitError}</div>}
          {submitSuccess && <div className={styles.successText}>{submitSuccess}</div>}
        </div>
      </form>
    </div>
  );
};

AddPropertyForm.defaultProps = {
  selectedItem: null,
  showEditView: noop,
  updateSuccessMessage: noop,
  url: '',
};

AddPropertyForm.propTypes = {
  refreshData: func.isRequired,
  selectedItem: shape(optionPropType),
  showEditView: func,
  updateSuccessMessage: func,
  url: string,
};

export default AddPropertyForm;