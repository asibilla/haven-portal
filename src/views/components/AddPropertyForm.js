import { isEmpty } from 'lodash';
import { arrayOf, func, shape } from 'prop-types';
import React, { Fragment, useContext, useState } from 'react';

import { styles } from '../../constants';
import { addNew } from '../../constants/styles/manageUsers';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';

import { addProperty } from '../../helpers/ajax';
import AppContext from '../../helpers/context';
import { ValidationItem, validateItems } from '../../helpers/formValidation';

import { Button, DropdownMenu, DropdownOption, Spinner, TextInput } from '.';

const AddBuyerForm = ({ onCancel, orgs, refresh }) => {
  const [org, setOrg] = useState('');
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [tract, setTract] = useState('');
  const [phase, setPhase] = useState('');
  const [lot, setLot] = useState('');
  const [closeOfEscrow, setCloseOfEscrow] = useState('');

  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { authData } = useContext(AppContext);

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
    setLoading(true);
    setValidationErrors({});
    setFormError(null);
    e.preventDefault();

    const validationObj = [
      new ValidationItem({
        displayName: 'Name',
        fieldName: 'name',
        isRequiredString: true,
        value: name,
      }),
      new ValidationItem({
        displayName: 'Lot',
        fieldName: 'lot',
        isRequiredString: true,
        value: lot,
      }),
    ];

    const errors = validateItems({ items: validationObj });

    if (!isEmpty(errors)) {
      setValidationErrors(errors);
      setButtonIsDisabled(false);
      setLoading(false);
      return;
    }

    try {
      const { idData: { jwtToken = '' } = {} } = authData;
      const requestBody = {
        Name: name,
      };

      const { error } = await addProperty({ authToken: jwtToken, body: requestBody });
      if (error) {
        throw error;
      }

      refresh();
      clearState();
      setSuccessMsg('Property was successfully added!');
      setButtonIsDisabled(false);
    } catch (err) {
      setFormError(`Something went wrong: ${err}`);
      setButtonIsDisabled(false);
    }

    setLoading(false);
  };

  return (
    <div>
      <h3>Add New Property</h3>
      <div className={styles.messageContainer}>
        {formError && <p className={styles.errorText}>{formError}</p>}
        {successMsg && <p className={styles.successText}>{successMsg}</p>}
      </div>
      <div className={addNew}>
        <a href="#manage-properties" onClick={onCancel}>
          {'<< Back'}
        </a>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <form className={formContainer} onSubmit={handleSubmit}>
          <div className={formSection}>
            <DropdownMenu id="org" label="Org" onChange={setValue(setOrg)} value={org}>
              <DropdownOption text="" value="" />
              {orgs &&
                orgs.map((o) => (
                  <Fragment key={o.OrgId}>
                    <DropdownOption text={o.Name} value={o.OrgId} />
                  </Fragment>
                ))}
            </DropdownMenu>
            <TextInput
              error={validationErrors.name}
              labelText="Name"
              onChange={setValue(setName)}
              value={name}
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
              <Button className={styles.buttonSecondary} onClick={onCancel} text="Cancel" />
              <Button disabled={buttonIsDisabled} text="Submit" type="submit" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

AddBuyerForm.defaultProps = {
  orgs: null,
};

AddBuyerForm.propTypes = {
  onCancel: func.isRequired,
  orgs: arrayOf(shape({})),
  refresh: func.isRequired,
};

export default AddBuyerForm;
