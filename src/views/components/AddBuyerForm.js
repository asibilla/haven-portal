import { isEmpty, noop } from 'lodash';
import { func, shape } from 'prop-types';
import React, { Fragment, useContext, useState } from 'react';

import { styles } from '../../constants';
import { addNew } from '../../constants/styles/manageUsers';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';
import { buyerPropType } from '../../constants/propTypeObjects';

import { addConsumer } from '../../helpers/ajax';
import AppContext from '../../helpers/context';
import { ValidationItem, validateItems } from '../../helpers/formValidation';

import {
  Button,
  CheckboxInput,
  DropdownMenu,
  DropdownOption,
  TextArea,
  TextInput,
} from '.';

const AddBuyerForm = ({ refreshData, selectedItem, showEditView, updateSuccessMessage }) => {
  const [org, setOrg] = useState('');
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

  const clearState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
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

    try {
      const { idData: { jwtToken = '' } = {} } = authData;
      /**
       * TODO: add PropertyId
       */
      const requestBody = {
        OrgId: org,
        PropertyId: null,
        Salutation: salutation,
        FirstName: firstName,
        LastName: lastName,
        Suffix: suffix,
        EmailAddress: email,
        EmailOptIn: false,
        SendInvite: sendInvite,
      };

      const { error } = await addConsumer({ authToken: jwtToken, body: requestBody });
      if (error) {
        throw error;
      }

      refresh();
      setButtonIsDisabled(false);
      setSubmitSuccess('User successfully created!');
      clearState();
    } catch (err) {
      setSubmitError(`Something went wrong: ${err}`);
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
          <CheckboxInput
            checked={sendInvite}
            label="Send Invite?"
            onChange={noop}
            onClick={setCheckboxValue(setSendInvite)}
            value="sendInvite"
          />
          <CheckboxInput
            checked={demoConsumer}
            label="Demo Consumer?"
            onChange={noop}
            onClick={setCheckboxValue(setDemoConsumer)}
            value="demoConsumer"
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
};

export default AddBuyerForm;
