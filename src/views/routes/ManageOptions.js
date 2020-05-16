import React, { useState } from 'react';

import { formContainer, formSection } from '../../constants/styles/manageOptions';
import withTabset from '../hocs/withTabset';

import { DropdownMenu, DropdownOption, RadioGroup, RadioInput } from '../components';

const ManageOptionsComponent = () => {
  const [optionType, setOptionType] = useState('finish');
  const [level, setLevel] = useState('base');
  // state will be active tab, db data
  // scan db once edit tab is activated (start on add)
  // after updating, from edit, redirect to add and refresh.

  const setValue = (setState) => {
    return (e) => {
      setState(e.target.value);
    };
  };

  return (
    <div>
      <form className={formContainer}>
        <div className={formSection}>
          <RadioGroup label="Option Type:" onChange={setOptionType} value={optionType}>
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

          <DropdownMenu id="level" label="Level:" onChange={setValue(setLevel)} value={level}>
            <DropdownOption value="base" text="Base" />
            <DropdownOption value="level1" text="Level 1" />
            <DropdownOption value="level2" text="Level 2" />
            <DropdownOption value="level3" text="Level 3" />
            <DropdownOption value="level4" text="Level 4" />
            <DropdownOption value="level5" text="Level 5" />
          </DropdownMenu>
        </div>
        <div className={formSection}>More from elements</div>
      </form>
    </div>
  );
};

export default withTabset({ WrappedComponent: ManageOptionsComponent, tableName: 'options' });
