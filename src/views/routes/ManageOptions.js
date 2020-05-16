import React, { useState } from 'react';

import { formSection } from '../../constants/styles/manageOptions';
import withTabset from '../hocs/withTabset';

import { DropdownMenu, DropdownOption } from '../components';

const ManageOptionsComponent = () => {
  const [optionType, setOptionType] = useState('finish');
  const [level, setLevel] = useState('base');
  // state will be active tab, db data
  // scan db once edit tab is activated (start on add)
  // after updating, from edit, redirect to add and refresh.
  return (
    <div>
      <form>
        <div className={formSection}>
          <DropdownMenu
            id="option-type"
            label="Option Type:"
            onChange={setOptionType}
            value={optionType}
          >
            <DropdownOption value="finish" text="Finish" />
            <DropdownOption value="structural" text="Structural" />
          </DropdownMenu>

          <DropdownMenu id="level" label="Level:" onChange={setLevel} value={level}>
            <DropdownOption value="finish" text="Finish" />
            <DropdownOption value="structural" text="Structural" />
          </DropdownMenu>
        </div>
        <div className={formSection}>More from elements</div>
      </form>
    </div>
  );
};

export default withTabset({ WrappedComponent: ManageOptionsComponent, tableName: 'options' });
