import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { styles } from '../../constants';
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

const OptionsForm = ({ url }) => {
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

  useEffect(() => {
    // Set form fields for edit
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation

    const dbQuery = {
      TableName: 'options',
      Item: {
        contractorPrice: Number(contractorPrice),
        extendedDescription,
        features: textAreaToArray(features),
        id: v4(),
        level,
        location,
        name,
        optionType,
        productDescription,
        sellPrice: Number(sellPrice),
      },
    };

    try {
      await putItem({ authData, query: dbQuery });
      // add success message and refresh data.
    } catch (err) {
      setSubmitError(`An error occured: `, err.message);
    }
  };

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
            labelText="Sell Price:"
            onChange={setValue(setSellPrice)}
            placeholder="0"
            value={sellPrice}
          />

          <TextInput
            labelText="Contractor Price:"
            onChange={setValue(setContractorPrice)}
            placeholder="0"
            value={contractorPrice}
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
          />

          <TextArea labelText="Features" onChange={setValue(setFeatures)} value={features} />

          <TextArea labelText="Materials" onChange={setValue(setMaterials)} value={materials} />

          <div className={buttonContainer}>
            <Button text="Submit" type="submit" />
          </div>
          {submitError && <div className={styles.errorText}>{submitError}</div>}
        </div>
      </form>
    </div>
  );
};

OptionsForm.defaultProps = {
  url: '',
};

OptionsForm.propTypes = {
  url: string,
};

export default OptionsForm;
