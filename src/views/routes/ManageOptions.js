import { bool, func, shape } from 'prop-types';
import React from 'react';

import OptionsForm from '../components/OptionsForm';
import OptionsView from '../components/OptionsView';
import { optionPropType } from '../../constants/propTypeObjects';
import withTabset from '../hocs/withTabset';

const ManageOptionsComponent = ({
  addNewIsActive,
  editIsActive,
  refreshData,
  selectedItem,
  showEditView,
  updateSuccessMessage,
}) => {
  return (
    <div>
      {addNewIsActive && <OptionsForm refreshData={refreshData} />}
      {!addNewIsActive && !editIsActive && selectedItem && (
        <OptionsView selectedItem={selectedItem} />
      )}
      {editIsActive && !addNewIsActive && selectedItem && (
        <OptionsForm
          selectedItem={selectedItem}
          refreshData={refreshData}
          showEditView={showEditView}
          updateSuccessMessage={updateSuccessMessage}
        />
      )}
    </div>
  );
};

ManageOptionsComponent.defaultProps = {
  addNewIsActive: false,
  editIsActive: false,
  selectedItem: null,
};

ManageOptionsComponent.propTypes = {
  addNewIsActive: bool,
  editIsActive: bool,
  refreshData: func.isRequired,
  selectedItem: shape(optionPropType),
  showEditView: func.isRequired,
  updateSuccessMessage: func.isRequired,
};

export default withTabset({
  displayKey: 'productName',
  primaryKey: 'id',
  tableName: 'options',
  WrappedComponent: ManageOptionsComponent,
});
