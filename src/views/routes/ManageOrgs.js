import { arrayOf, bool, func, shape } from 'prop-types';
import React from 'react';

import OrgForm from '../components/OrgForm';
import OrgView from '../components/OrgView';
import { orgPropType } from '../../constants/propTypeObjects';
import withTabset from '../hocs/withTabset';

const ManageOrgsComponent = ({
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
      {addNewIsActive && <OrgForm refreshData={refreshData} />}
      {!addNewIsActive && !editIsActive && (
        <OrgView
          deleteItem={deleteItem}
          orgs={dataItems}
          setEditIsActive={setEditIsActive}
          setSelectedItem={setSelectedItem}
        />
      )}
      {editIsActive && !addNewIsActive && selectedItem && (
        <OrgForm
          selectedItem={selectedItem}
          refreshData={refreshData}
          showEditView={showEditView}
          updateSuccessMessage={updateSuccessMessage}
        />
      )}
    </div>
  );
};

ManageOrgsComponent.defaultProps = {
  addNewIsActive: false,
  dataItems: false,
  editIsActive: false,
  selectedItem: null,
};

ManageOrgsComponent.propTypes = {
  addNewIsActive: bool,
  dataItems: arrayOf(shape(orgPropType)),
  deleteItem: func.isRequired,
  editIsActive: bool,
  refreshData: func.isRequired,
  selectedItem: shape(orgPropType),
  setEditIsActive: func.isRequired,
  setSelectedItem: func.isRequired,
  showEditView: func.isRequired,
  updateSuccessMessage: func.isRequired,
};

export default withTabset({
  primaryKey: 'id',
  tableName: 'orgs',
  WrappedComponent: ManageOrgsComponent,
});
