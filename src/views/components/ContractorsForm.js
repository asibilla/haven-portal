import { isEmpty, noop } from 'lodash';
import { func, shape, string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { css } from 'react-emotion';
import { v4 } from 'uuid';

import { styles } from '../../constants';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';
import { buyerPropType } from '../../constants/propTypeObjects';

import { DBQueryItem, putItem, updateItem } from '../../helpers/db';
import AppContext from '../../helpers/context';
import { ValidationItem, validateItems } from '../../helpers/formValidation';

import { Button, CheckboxInput, RadioGroup, RadioInput, TextInput } from '.';

const radioMargin = css`
  margin-top: 16px;
`;

const AddBuyerForm = ({ refreshData, selectedItem, showEditView, updateSuccessMessage, url }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [contractorCategory, setContractorCategory] = useState('subcontractor');
  const [tradeCategory, setTradeCategory] = useState('');
  const [subtrade, setSubtrade] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [businessState, setBusinessState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [biddingList, setBiddingList] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [contractType, setContractType] = useState('regular-agreement');

  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState('');

  const { authData } = useContext(AppContext);

  const updateFormState = () => {
    if (selectedItem) {
      setFirstName(selectedItem.firstName);
      setLastName(selectedItem.lastName);
      setJobTitle(selectedItem.jobTitle);
      setEmail(selectedItem.email);
      setContractorCategory(selectedItem.contractorCategory);
      setTradeCategory(selectedItem.tradeCategory);
      setSubtrade(selectedItem.subtrade);
      setLicenseNumber(selectedItem.licenseNumber);
      setCompanyName(selectedItem.companyName);
      setStreetAddress(selectedItem.streetAddress);
      setCity(selectedItem.city);
      setBusinessState(selectedItem.businessState);
      setZip(selectedItem.zip);
      setPhone(selectedItem.phone);
      setBiddingList(selectedItem.biddingList);
      setInsurance(selectedItem.insurance);
      setContractType(selectedItem.contractType);
    }
  };

  const clearState = () => {
    setFirstName('');
    setLastName('');
    setJobTitle('');
    setEmail('');
    setContractorCategory('subcontractor');
    setTradeCategory('');
    setSubtrade('');
    setLicenseNumber('');
    setCompanyName('');
    setStreetAddress('');
    setCity('');
    setBusinessState('');
    setZip('');
    setPhone('');
    setBiddingList(false);
    setInsurance(false);
    setContractType('regular-agreement');
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

    const id = selectedItem ? selectedItem.id : v4();

    if (selectedItem) {
      const queryItems = [
        new DBQueryItem({ id: ':z', key: 'biddingList', value: biddingList }),
        new DBQueryItem({ id: ':a', key: 'city', value: city }),
        new DBQueryItem({ id: ':b', key: 'companyName', value: companyName }),
        new DBQueryItem({ id: ':c', key: 'contractorCategory', value: contractorCategory }),
        new DBQueryItem({ id: ':d', key: 'contractType', value: contractType }),
        new DBQueryItem({ id: ':e', key: 'email', value: email }),
        new DBQueryItem({ id: ':f', key: 'firstName', value: firstName }),
        new DBQueryItem({ id: ':g', key: 'insurance', value: insurance }),
        new DBQueryItem({ id: ':h', key: 'jobTitle', value: jobTitle }),
        new DBQueryItem({ id: ':i', key: 'lastName', value: lastName }),
        new DBQueryItem({ id: ':j', key: 'licenseNumber', value: licenseNumber }),
        new DBQueryItem({ id: ':k', key: 'phone', value: phone }),
        new DBQueryItem({ id: ':l', key: 'businessState', value: businessState }),
        new DBQueryItem({ id: ':m', key: 'streetAddress', value: streetAddress }),
        new DBQueryItem({ id: ':n', key: 'subtrade', value: subtrade }),
        new DBQueryItem({ id: ':o', key: 'tradeCategory', value: tradeCategory }),
        new DBQueryItem({ id: ':p', key: 'zip', value: zip }),
      ];

      const keyItems = {
        id,
      };

      try {
        await updateItem({ authData, items: queryItems, keyItems, tableName: 'contractors' });
        updateSuccessMessage('Contractor successfully updated!');
        await refreshData();
        showEditView(false)();
      } catch (err) {
        setSubmitError(`An error occured: ${err.message}`);
        setButtonIsDisabled(false);
      }
    } else {
      const item = {
        biddingList,
        city,
        companyName,
        contractorCategory,
        contractType,
        email,
        firstName,
        id,
        insurance,
        jobTitle,
        lastName,
        licenseNumber,
        phone,
        businessState,
        streetAddress,
        subtrade,
        tradeCategory,
        zip,
      };

      try {
        await putItem({ authData, item, tableName: 'contractors' });
        setSubmitSuccess('Your contractor has been added!');
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
      <h3>Add New Contractor</h3>
      <form className={formContainer} onSubmit={handleSubmit}>
        <div className={formSection}>
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
          <TextInput labelText="Job Title" onChange={setValue(setJobTitle)} value={jobTitle} />
          <TextInput
            error={validationErrors.email}
            labelText="Email Address"
            onChange={setValue(setEmail)}
            value={email}
          />

          <RadioGroup label="Category:" value={contractorCategory}>
            <RadioInput
              checked={contractorCategory === 'subcontractor'}
              label="Subcontractor"
              name="contractor-category"
              onChange={setValue(setContractorCategory)}
              value="subcontractor"
            />
            <RadioInput
              checked={contractorCategory === 'consultant'}
              label="Consultant"
              name="contractor-category"
              onChange={setValue(setContractorCategory)}
              value="consultant"
            />
            <RadioInput
              checked={contractorCategory === 'business-professional'}
              label="Business Professional"
              name="contractor-category"
              onChange={setValue(setContractorCategory)}
              value="business-professional"
            />
          </RadioGroup>

          <TextInput
            labelText="Trade Category"
            onChange={setValue(setTradeCategory)}
            value={tradeCategory}
          />
          <TextInput labelText="Sub Trade" onChange={setValue(setSubtrade)} value={subtrade} />
        </div>

        <div className={formSection}>
          <TextInput
            labelText="Company Name"
            onChange={setValue(setCompanyName)}
            value={companyName}
          />
          <TextInput
            labelText="Street Address"
            onChange={setValue(setStreetAddress)}
            value={streetAddress}
          />
          <TextInput labelText="City" onChange={setValue(setCity)} value={city} />
          <TextInput
            labelText="State"
            onChange={setValue(setBusinessState)}
            value={businessState}
          />
          <TextInput labelText="Zip" onChange={setValue(setZip)} value={zip} />
          <TextInput labelText="Phone" onChange={setValue(setPhone)} value={phone} />
          <TextInput
            labelText="License Number"
            onChange={setValue(setLicenseNumber)}
            value={licenseNumber}
          />
          <CheckboxInput
            checked={biddingList}
            label="Bidding List?"
            onChange={noop}
            onClick={setCheckboxValue(setBiddingList)}
            value="biddingList"
          />
          <CheckboxInput
            checked={insurance}
            label="Insurance?"
            onChange={noop}
            onClick={setCheckboxValue(setInsurance)}
            value="insurance"
          />
          <RadioGroup className={radioMargin} label="Contract Type:" value={contractType}>
            <RadioInput
              checked={contractType === 'regular-agreement'}
              label="Regular Agreement"
              name="contract-type"
              onChange={setValue(setContractType)}
              value="regular-agreement"
            />
            <RadioInput
              checked={contractType === 'trade-specific'}
              label="Trade Specific"
              name="contract-type"
              onChange={setValue(setContractType)}
              value="trade-specific"
            />
          </RadioGroup>

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
