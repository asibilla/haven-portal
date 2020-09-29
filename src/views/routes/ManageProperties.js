import { arrayOf, bool, func, shape } from 'prop-types';
import React from 'react';

import AddPropertyForm from '../components/AddPropertyForm';
import PropertiesView from '../components/PropertiesView';
import { propertyPropType } from '../../constants/propTypeObjects';
import withTabset from '../hocs/withTabset';

const ManagePropertiesComponent = ({
  addNewIsActive,
  dataItems,
  deleteItem,
  editIsActive,
  refreshData,
  selectedItem,
  setEditIsActive,
  setSelectedItem,
  showEditView,
  updateSuccessMessage,
}) => {
  return (
    <div>
      {addNewIsActive && <AddPropertyForm refreshData={refreshData} />}
      {!addNewIsActive && !editIsActive && (
        <PropertiesView
          deleteItem={deleteItem}
          properties={dataItems}
          setEditIsActive={setEditIsActive}
          setSelectedItem={setSelectedItem}
        />
      )}
      {editIsActive && !addNewIsActive && selectedItem && (
        <AddPropertyForm
          selectedItem={selectedItem}
          refreshData={refreshData}
          showEditView={showEditView}
          updateSuccessMessage={updateSuccessMessage}
        />
      )}
    </div>
  );
};

ManagePropertiesComponent.defaultProps = {
  addNewIsActive: false,
  dataItems: false,
  editIsActive: false,
  selectedItem: null,
};

ManagePropertiesComponent.propTypes = {
  addNewIsActive: bool,
  dataItems: arrayOf(shape(propertyPropType)),
  deleteItem: func.isRequired,
  editIsActive: bool,
  refreshData: func.isRequired,
  selectedItem: shape(propertyPropType),
  setEditIsActive: func.isRequired,
  setSelectedItem: func.isRequired,
  showEditView: func.isRequired,
  updateSuccessMessage: func.isRequired,
};

export default withTabset({
  primaryKey: 'id',
  tableName: 'properties',
  WrappedComponent: ManagePropertiesComponent,
});
