import { arrayOf, bool, func, shape } from 'prop-types';
import React from 'react';

import ContractorsForm from '../components/ContractorsForm';
import ContractorsView from '../components/ContractorsView';
import { buyerPropType } from '../../constants/propTypeObjects';
import withTabset from '../hocs/withTabset';

const ManageContractorsComponent = ({
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
      {addNewIsActive && <ContractorsForm refreshData={refreshData} />}
      {!addNewIsActive && !editIsActive && (
        <ContractorsView
          deleteItem={deleteItem}
          contractors={dataItems}
          setEditIsActive={setEditIsActive}
          setSelectedItem={setSelectedItem}
        />
      )}
      {editIsActive && !addNewIsActive && selectedItem && (
        <ContractorsForm
          selectedItem={selectedItem}
          refreshData={refreshData}
          showEditView={showEditView}
          updateSuccessMessage={updateSuccessMessage}
        />
      )}
    </div>
  );
};

ManageContractorsComponent.defaultProps = {
  addNewIsActive: false,
  dataItems: [],
  editIsActive: false,
  selectedItem: null,
};

ManageContractorsComponent.propTypes = {
  addNewIsActive: bool,
  dataItems: arrayOf(shape(buyerPropType)),
  deleteItem: func.isRequired,
  editIsActive: bool,
  refreshData: func.isRequired,
  selectedItem: shape(buyerPropType),
  setEditIsActive: func.isRequired,
  setSelectedItem: func.isRequired,
  showEditView: func.isRequired,
  updateSuccessMessage: func.isRequired,
};

export default withTabset({
  primaryKey: 'id',
  tableName: 'contractors',
  WrappedComponent: ManageContractorsComponent,
});
