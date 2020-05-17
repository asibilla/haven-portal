import { bool, func, shape } from 'prop-types';
import React from 'react';

import OptionsForm from '../components/OptionsForm';
import OptionsView from '../components/OptionsView';
import { optionPropType } from '../../constants/propTypeObjects';
import withTabset from '../hocs/withTabset';

const ManageOptionsComponent = ({ addNewIsActive, refreshData, selectedItem }) => {
  return (
    <div>
      {addNewIsActive && <OptionsForm refreshData={refreshData} />}
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
  refreshData: func.isRequired,
  selectedItem: shape(optionPropType),
};

export default withTabset({
  displayKey: 'name',
  tableName: 'options',
  WrappedComponent: ManageOptionsComponent,
});
