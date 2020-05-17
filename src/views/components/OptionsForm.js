import { func, shape, string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { styles } from '../../constants';
import { optionPropType } from '../../constants/propTypeObjects';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';
import AppContext from '../../helpers/context';
import { putItem } from '../../helpers/db';

import {
  Button,
  CheckboxGroup,
  CheckboxInput,
  DropdownMenu,
  DropdownOption,
  RadioGroup,
  RadioInput,
  TextArea,
  TextInput,
} from '.';

const lineBreakRegEx = /\r?\n|\r/;

const textAreaToArray = (text) => text.split(lineBreakRegEx);

const OptionsForm = ({ refreshData, selectedItem, showEditView, url }) => {
  const { authData } = useContext(AppContext);

  const [optionType, setOptionType] = useState('finish');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('base');
  const [location, setLocation] = useState([]);
  const [sellPrice, setSellPrice] = useState('');
  const [contractorPrice, setContractorPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [extendedDescription, setExtendedDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [materials, setMaterials] = useState('');

  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setOptionType(selectedItem.optionType);
      setName(selectedItem.name);
      setLevel(selectedItem.level);
      setSellPrice(selectedItem.sellPrice);
      setContractorPrice(selectedItem.contractorPrice);
      setProductDescription(selectedItem.productDescription);
      setExtendedDescription(selectedItem.extendedDescription);
      setFeatures(selectedItem.features.join('\n'));
      setMaterials(selectedItem.materials.join('\n'));
    }
  }, [url]);

  const setValue = (setState) => {
    return (e) => {
      setState(e.target.value);
    };
  };

  const setCheckboxValues = (state, setState) => {
    return (e) => {
      let newState = [...state];
      if (e.target.checked) {
        newState.push(e.target.value);
      } else {
        newState = newState.filter((value) => value !== e.target.value);
      }
      setState(newState);
    };
  };

  const clearState = () => {
    setOptionType('finish');
    setName('');
    setLevel('base');
    setLocation([]);
    setSellPrice('');
    setContractorPrice('');
    setProductDescription('');
    setExtendedDescription('');
    setFeatures('');
    setMaterials('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonIsDisabled(true);

    // Add validation

    const id = selectedItem ? selectedItem.id : v4();
    const item = {
      contractorPrice: Number(contractorPrice),
      extendedDescription,
      features: textAreaToArray(features),
      id,
      level,
      location,
      name,
      optionType,
      productDescription,
      sellPrice: Number(sellPrice),
    };

    try {
      await putItem({ authData, item, tableName: 'options' });
      setSubmitSuccess('Your option has been added!');
      clearState();
      refreshData();
    } catch (err) {
      setSubmitError(`An error occured: `, err.message);
    }
    setButtonIsDisabled(false);
  };

  const handleCancel = () => showEditView(false);

  return (
    <div className="form-container">
      <h3>Add a New Option</h3>
      <form className={formContainer} onSubmit={handleSubmit}>
        <div className={formSection}>
          <RadioGroup label="Option Type:" value={optionType}>
            <RadioInput
              label="Finish"
              name="option-type"
              onChange={setValue(setOptionType)}
              value="finish"
            />
            <RadioInput
              label="Structural"
              name="option-type"
              onChange={setValue(setOptionType)}
              value="structural"
            />
          </RadioGroup>

          <TextInput labelText="Name:" onChange={setValue(setName)} value={name} />

          <DropdownMenu id="level" label="Level:" onChange={setValue(setLevel)} value={level}>
            <DropdownOption text="Base" value="base" />
            <DropdownOption text="Level 1" value="level1" />
            <DropdownOption text="Level 2" value="level2" />
            <DropdownOption text="Level 3" value="level3" />
            <DropdownOption text="Level 4" value="level4" />
            <DropdownOption text="Level 5" value="level5" />
          </DropdownMenu>

          <CheckboxGroup label="Location:">
            <CheckboxInput
              label="Bar"
              onClick={setCheckboxValues(location, setLocation)}
              value="bar"
            />
            <CheckboxInput
              label="Bath 1"
              onClick={setCheckboxValues(location, setLocation)}
              value="bath1"
            />
            <CheckboxInput
              label="Bath 2"
              onClick={setCheckboxValues(location, setLocation)}
              value="bath2"
            />
            <CheckboxInput
              label="Bath 3"
              onClick={setCheckboxValues(location, setLocation)}
              value="bath3"
            />
            <CheckboxInput
              label="Bath 4"
              onClick={setCheckboxValues(location, setLocation)}
              value="bath4"
            />
            <CheckboxInput
              label="Bath 5"
              onClick={setCheckboxValues(location, setLocation)}
              value="bath5"
            />
            <CheckboxInput
              label="Kitchen"
              onClick={setCheckboxValues(location, setLocation)}
              value="kitchen"
            />
            <CheckboxInput
              label="Laundry"
              onClick={setCheckboxValues(location, setLocation)}
              value="laundry"
            />
            <CheckboxInput
              label="Poweder"
              onClick={setCheckboxValues(location, setLocation)}
              value="powder"
            />
            <CheckboxInput
              label="Rec Room"
              onClick={setCheckboxValues(location, setLocation)}
              value="recroom"
            />
          </CheckboxGroup>

          <TextInput
            instructions="Numbers and decimals only."
            labelText="Sell Price:"
            onChange={setValue(setSellPrice)}
            placeholder="0"
            value={sellPrice}
          />

          <TextInput
            instructions="Numbers and decimals only."
            labelText="Contractor Price:"
            onChange={setValue(setContractorPrice)}
            placeholder="0"
            value={contractorPrice}
            refreshData
          />

          <TextArea
            labelText="Product Description"
            onChange={setValue(setProductDescription)}
            value={productDescription}
          />
        </div>
        <div className={formSection}>
          <TextArea
            labelText="Extended Description"
            onChange={setValue(setExtendedDescription)}
            value={extendedDescription}
            refreshData
          />

          <TextArea
            instructions="Seperate each feature with a line break. Do not include bullet points."
            labelText="Features"
            onChange={setValue(setFeatures)}
            value={features}
          />

          <TextArea
            instructions="Seperate each material with a line break. Do not include bullet points."
            labelText="Materials"
            onChange={setValue(setMaterials)}
            value={materials}
          />

          <div className={buttonContainer}>
            {selectedItem && (
              <Button
                className={styles.buttonSecondary}
                disabled={buttonIsDisabled}
                onClick={handleCancel}
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

OptionsForm.defaultProps = {
  selectedItem: null,
  url: '',
};

OptionsForm.propTypes = {
  refreshData: func.isRequired,
  selectedItem: shape(optionPropType),
  showEditView: func.isRequired,
  url: string,
};

export default OptionsForm;
