import { noop } from 'lodash';
import { func, shape, string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { styles } from '../../constants';
import { optionPropType } from '../../constants/propTypeObjects';
import { buttonContainer, formContainer, formSection } from '../../constants/styles/manageOptions';
import AppContext from '../../helpers/context';
import { DBQueryItem, putItem, updateItem } from '../../helpers/db';
import { deleteImage, uploadImage } from '../../helpers/s3';

import {
  Button,
  CheckboxGroup,
  CheckboxInput,
  DropdownMenu,
  DropdownOption,
  ImageUpload,
  RadioGroup,
  RadioInput,
  TextArea,
  TextInput,
} from '.';

const lineBreakRegEx = /\r?\n|\r/;

const textAreaToArray = (text) => text.split(lineBreakRegEx);

const OptionsForm = ({ refreshData, selectedItem, showEditView, updateSuccessMessage, url }) => {
  const { authData } = useContext(AppContext);

  const [optionType, setOptionType] = useState('finish');
  const [productName, setName] = useState('');
  const [productLevel, setLevel] = useState('base');
  const [productLocation, setLocation] = useState([]);
  const [sellPrice, setSellPrice] = useState('');
  const [contractorPrice, setContractorPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [extendedDescription, setExtendedDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [materials, setMaterials] = useState('');
  const [imageKey, setImageKey] = useState('');

  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      setOptionType(selectedItem.optionType);
      setName(selectedItem.productName);
      setLevel(selectedItem.productLevel);
      setLocation(selectedItem.productLocation);
      setSellPrice((selectedItem.sellPrice || 0).toString());
      setContractorPrice((selectedItem.contractorPrice || 0).toString());
      setProductDescription(selectedItem.productDescription);
      setExtendedDescription(selectedItem.extendedDescription);
      setFeatures(selectedItem.features.join('\n'));
      setMaterials(selectedItem.materials.join('\n'));
      setImageKey(selectedItem.imageKey);
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

  const getIsChecked = (value) => {
    return productLocation.indexOf(value) > -1;
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files.length) {
      try {
        const data = await uploadImage({ authData, file: e.target.files[0] });
        if (!data.Location) {
          throw new Error('Could not upload image to s3');
        }
        setImageKey(data.Key);
      } catch (err) {
        setImageError('Something went wrong: ', err.message);
      }
    } else {
      setImageError('Something went wrong while uploading your image.');
    }
  };

  const handleImageDelete = async () => {
    try {
      await deleteImage({ authData, key: imageKey });
      setImageKey('');
    } catch (err) {
      setImageError('An error occured while removing image', err.message);
    }
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
    setImageKey('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonIsDisabled(true);

    // Add validation

    const id = selectedItem ? selectedItem.id : v4();

    if (selectedItem) {
      const queryItems = [
        new DBQueryItem({ id: ':a', key: 'contractorPrice', value: Number(contractorPrice) }),
        new DBQueryItem({ id: ':b', key: 'extendedDescription', value: extendedDescription }),
        new DBQueryItem({ id: ':c', key: 'features', value: textAreaToArray(features) }),
        new DBQueryItem({ id: ':d', key: 'productLevel', value: productLevel }),
        new DBQueryItem({ id: ':e', key: 'productLocation', value: productLocation }),
        new DBQueryItem({ id: ':f', key: 'productName', value: productName }),
        new DBQueryItem({ id: ':g', key: 'productDescription', value: productDescription }),
        new DBQueryItem({ id: ':h', key: 'sellPrice', value: Number(sellPrice) }),
        new DBQueryItem({ id: ':i', key: 'materials', value: textAreaToArray(materials) }),
        new DBQueryItem({ id: ':j', key: 'imageKey', value: imageKey }),
      ];

      const keyItems = {
        id,
        optionType,
      };

      try {
        await updateItem({ authData, items: queryItems, keyItems, tableName: 'options' });
        updateSuccessMessage('Option successfully updated!');
        await refreshData();
        showEditView(false)();
      } catch (err) {
        setSubmitError(`An error occured: `, err.message);
      }
    } else {
      const item = {
        contractorPrice: Number(contractorPrice),
        extendedDescription,
        features: textAreaToArray(features),
        id,
        imageKey,
        productLevel,
        productLocation,
        productName,
        materials: textAreaToArray(materials),
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
    }
  };

  return (
    <div className="form-container">
      <h3>{selectedItem ? 'Edit Option' : 'Add a New Option'}</h3>
      <form className={formContainer} onSubmit={handleSubmit}>
        <div className={formSection}>
          <RadioGroup label="Option Type:" value={optionType}>
            <RadioInput
              checked={optionType === 'finish'}
              label="Finish"
              name="option-type"
              onChange={setValue(setOptionType)}
              value="finish"
            />
            <RadioInput
              checked={optionType === 'structural'}
              label="Structural"
              name="option-type"
              onChange={setValue(setOptionType)}
              value="structural"
            />
          </RadioGroup>

          <TextInput labelText="Name:" onChange={setValue(setName)} value={productName} />

          <DropdownMenu
            id="productLevel"
            label="Level:"
            onChange={setValue(setLevel)}
            value={productLevel}
          >
            <DropdownOption text="Base" value="base" />
            <DropdownOption text="Level 1" value="level1" />
            <DropdownOption text="Level 2" value="level2" />
            <DropdownOption text="Level 3" value="level3" />
            <DropdownOption text="Level 4" value="level4" />
            <DropdownOption text="Level 5" value="level5" />
          </DropdownMenu>

          <CheckboxGroup label="Location:">
            <CheckboxInput
              checked={getIsChecked('bar')}
              label="Bar"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
              value="bar"
            />
            <CheckboxInput
              checked={getIsChecked('bath1')}
              label="Bath 1"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
              value="bath1"
            />
            <CheckboxInput
              checked={getIsChecked('bath2')}
              label="Bath 2"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
              value="bath2"
            />
            <CheckboxInput
              checked={getIsChecked('bath3')}
              label="Bath 3"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
              value="bath3"
            />
            <CheckboxInput
              checked={getIsChecked('bath4')}
              label="Bath 4"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
              value="bath4"
            />
            <CheckboxInput
              checked={getIsChecked('bath5')}
              label="Bath 5"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
              value="bath5"
            />
            <CheckboxInput
              checked={getIsChecked('kitchen')}
              label="Kitchen"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
              value="kitchen"
            />
            <CheckboxInput
              checked={getIsChecked('laundry')}
              label="Laundry"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
              value="laundry"
            />
            <CheckboxInput
              checked={getIsChecked('powder')}
              label="Poweder"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
              value="powder"
            />
            <CheckboxInput
              checked={getIsChecked('recroom')}
              label="Rec Room"
              onChange={noop}
              onClick={setCheckboxValues(productLocation, setLocation)}
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
          <ImageUpload
            id="option-image"
            error={imageError}
            image={imageKey}
            onChange={handleImageUpload}
            removeImage={handleImageDelete}
          />

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

OptionsForm.defaultProps = {
  selectedItem: null,
  showEditView: noop,
  updateSuccessMessage: noop,
  url: '',
};

OptionsForm.propTypes = {
  refreshData: func.isRequired,
  selectedItem: shape(optionPropType),
  showEditView: func,
  updateSuccessMessage: func,
  url: string,
};

export default OptionsForm;
