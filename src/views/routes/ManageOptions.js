import { bool, shape } from 'prop-types';
import React from 'react';

import OptionsForm from '../components/OptionsForm';
import OptionsView from '../components/OptionsView';
import { optionPropType } from '../../constants/propTypeObjects';
import withTabset from '../hocs/withTabset';

const ManageOptionsComponent = ({ addNewIsActive, selectedItem }) => {
  return (
    <div>
      {addNewIsActive && <OptionsForm />}
      {!addNewIsActive && selectedItem && <OptionsView selectedItem={selectedItem} />}
    </div>
  );
};

ManageOptionsComponent.defaultProps = {
  addNewIsActive: false,
  selectedItem: null,
};

ManageOptionsComponent.propTypes = {
  addNewIsActive: bool,
  selectedItem: shape(optionPropType),
};

export default withTabset({
  displayKey: 'name',
  tableName: 'options',
  WrappedComponent: ManageOptionsComponent,
});
