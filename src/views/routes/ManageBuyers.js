import { arrayOf, bool, func, shape } from 'prop-types';
import React from 'react';

import { deleteConsumer } from '../../helpers/ajax';

import AddBuyerForm from '../components/AddBuyerForm';
import BuyersView from '../components/BuyersView';
import { buyerPropType } from '../../constants/propTypeObjects';
import withTabset from '../hocs/withTabset';

const ManageBuyersComponent = ({
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
      {addNewIsActive && <AddBuyerForm refreshData={refreshData} />}
      {!addNewIsActive && !editIsActive && (
        <BuyersView
          deleteItem={deleteItem}
          buyers={dataItems}
          setEditIsActive={setEditIsActive}
          setSelectedItem={setSelectedItem}
        />
      )}
      {editIsActive && !addNewIsActive && selectedItem && (
        <AddBuyerForm
          selectedItem={selectedItem}
          refreshData={refreshData}
          showEditView={showEditView}
          updateSuccessMessage={updateSuccessMessage}
        />
      )}
    </div>
  );
};

ManageBuyersComponent.defaultProps = {
  addNewIsActive: false,
  dataItems: [],
  editIsActive: false,
  selectedItem: null,
};

ManageBuyersComponent.propTypes = {
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
  bridgewayDeleteFn: deleteConsumer,
  primaryKey: 'id',
  tableName: 'buyers',
  WrappedComponent: ManageBuyersComponent,
});
