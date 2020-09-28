import { isEmpty, noop } from 'lodash';
import { func, shape, string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { styles } from '../../constants';
import { optionPropType } from '../../constants/propTypeObjects';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';

import AppContext from '../../helpers/context';
import { DBQueryItem, putItem, updateItem } from '../../helpers/db';
import { ValidationItem, validateItems } from '../../helpers/formValidation';

import { Button, TextInput } from '.';

const OrgForm = ({ refreshData, selectedItem, showEditView, updateSuccessMessage, url }) => {
  const { authData } = useContext(AppContext);

  const [orgName, setOrgName] = useState('');

  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (selectedItem) {
      setOrgName(selectedItem.orgName);
    }
  }, [url]);

  const setValue = (setState) => {
    return (e) => {
      setState(e.target.value);
    };
  };

  const clearState = () => {
    setOrgName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonIsDisabled(true);
    setValidationErrors({});

    const validationObj = [
      new ValidationItem({
        displayName: 'Name',
        fieldName: 'orgName',
        isRequiredString: true,
        value: orgName,
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
      const queryItems = [new DBQueryItem({ id: ':a', key: 'orgName', value: orgName })];

      const keyItems = {
        id,
      };

      try {
        await updateItem({ authData, items: queryItems, keyItems, tableName: 'orgs' });
        updateSuccessMessage('Option successfully updated!');
        await refreshData();
        showEditView(false)();
      } catch (err) {
        setSubmitError(`An error occured: ${err.message}`);
      }
    } else {
      const item = {
        id,
        orgName,
      };

      try {
        await putItem({ authData, item, tableName: 'orgs' });
        setSubmitSuccess('Your org has been added!');
        await refreshData();
        clearState();
      } catch (err) {
        setSubmitError(`An error occured: ${err.message}`);
      }
      setButtonIsDisabled(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{selectedItem ? 'Edit Org' : 'Add a New Org'}</h3>
      <form className={formContainer} onSubmit={handleSubmit}>
        <div className={formSection}>
          <TextInput
            error={validationErrors.orgName}
            labelText="Org Name:"
            onChange={setValue(setOrgName)}
            value={orgName}
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
        <div className={formSection} />
      </form>
    </div>
  );
};

OrgForm.defaultProps = {
  selectedItem: null,
  showEditView: noop,
  updateSuccessMessage: noop,
  url: '',
};

OrgForm.propTypes = {
  refreshData: func.isRequired,
  selectedItem: shape(optionPropType),
  showEditView: func,
  updateSuccessMessage: func,
  url: string,
};

export default OrgForm;
