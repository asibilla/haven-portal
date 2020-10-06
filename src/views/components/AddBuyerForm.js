import { isEmpty, noop } from 'lodash';
import { func, shape, string } from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { css } from 'react-emotion';
import { v4 } from 'uuid';

import { styles } from '../../constants';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';
import { buyerPropType } from '../../constants/propTypeObjects';

import { addConsumer } from '../../helpers/ajax';
import { DBQueryItem, putItem, updateItem } from '../../helpers/db';
import AppContext from '../../helpers/context';
import { ValidationItem, validateItems } from '../../helpers/formValidation';

import { Button, CheckboxInput, DropdownMenu, DropdownOption, TextArea, TextInput } from '.';
import PropertyDropdown from './PropertyDropdown';

const sendInviteLink = css`
  margin-top: 12px;
`;
const lineBreakRegEx = /\r?\n|\r/;
const textAreaToArray = (text) => text.split(lineBreakRegEx);

const AddBuyerForm = ({ refreshData, selectedItem, showEditView, updateSuccessMessage, url }) => {
  const [org, setOrg] = useState('');
  const [propertyId, setProperty] = useState('');
  const [salutation, setSalutation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [email, setEmail] = useState('');
  const [salesValue, setSalesValue] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [actionedBy, setActionedBy] = useState('');
  const [sendInvite, setSendInvite] = useState(false);
  const [demoConsumer, setDemoConsumer] = useState(false);

  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState('');

  const { authData, orgs } = useContext(AppContext);

  const updateFormState = () => {
    if (selectedItem) {
      setOrg(selectedItem.orgId);
      setProperty(selectedItem.propertyId);
      setSalutation(selectedItem.salutation);
      setFirstName(selectedItem.firstName);
      setLastName(selectedItem.lastName);
      setSuffix(selectedItem.suffix);
      setEmail(selectedItem.email);
      setSalesValue(selectedItem.salesValue);
      setInvoiceNumber(selectedItem.invoiceNumber);
      setNotes(selectedItem.notes.join('\n'));
      setActionedBy(selectedItem.actionedBy);
      setDemoConsumer(selectedItem.demoConsumer);
    }
  };

  const clearState = () => {
    setOrg('');
    setProperty('');
    setSalesValue('');
    setFirstName('');
    setLastName('');
    setSuffix('');
    setEmail('');
    setSalesValue('');
    setInvoiceNumber('');
    setNotes('');
    setActionedBy('');
    setDemoConsumer(false);
    setSendInvite(false);
  };

  useEffect(() => {
    updateFormState();
  }, [url]);

  const setValue = (setState) => {
    return (e) => {
      setState(e.target.value);
    };
  };

  const setCheckboxValue = (setState) => {
    return (e) => {
      setState(e.target.checked);
    };
  };

  const handleSubmit = async (e) => {
    setButtonIsDisabled(true);
    setValidationErrors({});
    setSubmitError(null);
    e.preventDefault();

    const validationObj = [
      new ValidationItem({
        displayName: 'First Name',
        fieldName: 'firstName',
        isRequiredString: true,
        value: firstName,
      }),
      new ValidationItem({
        displayName: 'Last Name',
        fieldName: 'lastName',
        isRequiredString: true,
        value: lastName,
      }),
      new ValidationItem({
        displayName: 'Email',
        fieldName: 'email',
        isRequiredString: true,
        value: email,
      }),
    ];

    const errors = validateItems({ items: validationObj });

    if (!isEmpty(errors)) {
      setValidationErrors(errors);
      setButtonIsDisabled(false);
      return;
    }

    let id = selectedItem ? selectedItem.id : v4();

    if (selectedItem) {
      const queryItems = [
        new DBQueryItem({ id: ':a', key: 'orgId', value: org }),
        new DBQueryItem({ id: ':b', key: 'salutation', value: salutation }),
        new DBQueryItem({ id: ':c', key: 'firstName', value: firstName }),
        new DBQueryItem({ id: ':d', key: 'lastName', value: lastName }),
        new DBQueryItem({ id: ':e', key: 'suffix', value: suffix }),
        new DBQueryItem({ id: ':f', key: 'email', value: email }),
        new DBQueryItem({ id: ':g', key: 'salesValue', value: salesValue }),
        new DBQueryItem({ id: ':h', key: 'invoiceNumber', value: invoiceNumber }),
        new DBQueryItem({ id: ':i', key: 'notes', value: textAreaToArray(notes) }),
        new DBQueryItem({ id: ':j', key: 'actionedBy', value: actionedBy }),
        new DBQueryItem({ id: ':k', key: 'demoConsumer', value: demoConsumer }),
        new DBQueryItem({ id: ':l', key: 'propertyId', value: propertyId }),
      ];

      const keyItems = {
        id,
      };

      try {
        await updateItem({ authData, items: queryItems, keyItems, tableName: 'buyers' });
        updateSuccessMessage('Buyer successfully updated!');
        await refreshData();
        showEditView(false)();
      } catch (err) {
        setSubmitError(`An error occured: ${err.message}`);
      }
    } else {
      // Add user to bridgeway's system.
      try {
        const { idData: { jwtToken = '' } = {} } = authData;
        /**
         * TODO: add PropertyId
         */
        const requestBody = {
          OrgId: null,
          PropertyId: null,
          Salutation: salutation,
          FirstName: firstName,
          LastName: lastName,
          Suffix: suffix,
          EmailAddress: email,
          EmailOptIn: false,
          SendInvite: sendInvite,
        };

        const { data, error } = await addConsumer({ authToken: jwtToken, body: requestBody });
        if (error) {
          throw error;
        }
        id = data ? data.toString() : id;
      } catch (err) {
        setSubmitError(`Could not add user to bridgeway system: ${err.message}`);
        setButtonIsDisabled(false);
        return;
      }

      const item = {
        actionedBy,
        demoConsumer,
        email,
        firstName,
        id,
        inviteSentData: sendInvite ? new Date().toString() : null,
        invoiceNumber,
        lastName,
        orgId: org,
        notes: textAreaToArray(notes),
        propertyId,
        salesValue,
        salutation,
        suffix,
      };

      try {
        await putItem({ authData, item, tableName: 'buyers' });
        setSubmitSuccess('Your buyer has been added!');
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
      <h3>Add New Buyer</h3>
      <form className={formContainer} onSubmit={handleSubmit}>
        <div className={formSection}>
          <DropdownMenu id="org" label="Org" onChange={setValue(setOrg)} value={org}>
            <DropdownOption text="" value="" />
            {orgs &&
              orgs.map((o) => (
                <Fragment key={o.id}>
                  <DropdownOption text={o.orgName} value={o.id} />
                </Fragment>
              ))}
          </DropdownMenu>
          <PropertyDropdown
            selectedOrg={org}
            selectedProperty={propertyId}
            setErrorMsg={setSubmitError}
            setLoading={buttonIsDisabled}
            setSelectedProperty={setProperty}
          />
          <TextInput labelText="Salutation" onChange={setValue(setSalutation)} value={salutation} />
          <TextInput
            error={validationErrors.firstName}
            labelText="First Name"
            onChange={setValue(setFirstName)}
            value={firstName}
            Suffix
          />
          <TextInput
            error={validationErrors.lastName}
            labelText="Last Name"
            onChange={setValue(setLastName)}
            value={lastName}
          />
          <TextInput labelText="Suffix" onChange={setValue(setSuffix)} value={suffix} />
          <TextInput
            error={validationErrors.email}
            labelText="Email Address"
            onChange={setValue(setEmail)}
            value={email}
          />
          <TextInput
            labelText="Sales Value"
            onChange={setValue(setSalesValue)}
            value={salesValue}
          />
          <TextInput
            labelText="Invoice Number"
            onChange={setValue(setInvoiceNumber)}
            value={invoiceNumber}
          />
        </div>

        <div className={formSection}>
          <TextArea labelText="Notes" onChange={setValue(setNotes)} value={notes} />
          <TextInput
            labelText="Actioned By"
            onChange={setValue(setActionedBy)}
            value={actionedBy}
          />
          {!selectedItem && (
            <CheckboxInput
              checked={sendInvite}
              label="Send Invite?"
              onChange={noop}
              onClick={setCheckboxValue(setSendInvite)}
              value="sendInvite"
            />
          )}
          <CheckboxInput
            checked={demoConsumer}
            label="Demo Consumer?"
            onChange={noop}
            onClick={setCheckboxValue(setDemoConsumer)}
            value="demoConsumer"
          />

          {!!selectedItem && (
            <div className={sendInviteLink}>
              <a href="#/send-invite">Send Another Invite</a>
            </div>
          )}

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

AddBuyerForm.defaultProps = {
  selectedItem: null,
  showEditView: noop,
  updateSuccessMessage: noop,
  url: '',
};

AddBuyerForm.propTypes = {
  refreshData: func.isRequired,
  selectedItem: shape(buyerPropType),
  showEditView: func,
  updateSuccessMessage: func,
  url: string,
};

export default AddBuyerForm;
