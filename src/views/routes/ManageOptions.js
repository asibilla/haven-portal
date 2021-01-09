import { find } from 'lodash';
import { arrayOf, bool, func, shape } from 'prop-types';
import React, { Fragment } from 'react';
import { css } from 'react-emotion';

import { DropdownMenu, DropdownOption } from '../components';
import OptionsForm from '../components/OptionsForm';
import OptionsUpload from '../components/OptionsUpload';
import OptionsView from '../components/OptionsView';
import { optionPropType } from '../../constants/propTypeObjects';
import withTabset from '../hocs/withTabset';

const ManageOptionsComponent = ({
  addNewIsActive,
  dataItems,
  deleteItem,
  editIsActive,
  refreshData,
  setEditIsActive,
  selectedItem,
  setSelectedItem,
  showEditView,
  updateSuccessMessage,
  uploadIsActive,
}) => {
  const onChange = (e) => {
    const selected = find(dataItems, (item) => item.id === e.target.value) || null;
    setSelectedItem(selected);
  };

  const initialView = !editIsActive && !addNewIsActive && !uploadIsActive;
  const manageView = selectedItem && !editIsActive && !addNewIsActive && !uploadIsActive;
  const editView = editIsActive && !addNewIsActive && !uploadIsActive && selectedItem;
  const uploadView = uploadIsActive && !addNewIsActive && !editIsActive;

  return (
    <div>
      {initialView && (
        <DropdownMenu
          id="option"
          label="Select an Option"
          onChange={onChange}
          value={selectedItem ? selectedItem.id : ''}
        >
          <DropdownOption text="--Select--" value="" />
          {dataItems &&
            dataItems.map((i) => (
              <Fragment key={i.id}>
                <DropdownOption text={i.productName} value={i.id} />
              </Fragment>
            ))}
        </DropdownMenu>
      )}
      {manageView && (
        <>
          <div
            className={css`
              margin-bottom: 5px;
            `}
          >
            <a href="#edit" onClick={() => setEditIsActive(true)}>
              Edit Option
            </a>
          </div>
          <div>
            <a href="#delete" onClick={deleteItem}>
              Delete Option
            </a>
          </div>
        </>
      )}

      {addNewIsActive && <OptionsForm refreshData={refreshData} />}
      {manageView && <OptionsView selectedItem={selectedItem} setEditIsActive={setEditIsActive} />}
      {editView && (
        <OptionsForm
          selectedItem={selectedItem}
          refreshData={refreshData}
          showEditView={showEditView}
          updateSuccessMessage={updateSuccessMessage}
        />
      )}
      {uploadView && <OptionsUpload />}
    </div>
  );
};

ManageOptionsComponent.defaultProps = {
  addNewIsActive: false,
  dataItems: [],
  editIsActive: false,
  selectedItem: null,
  uploadIsActive: false,
};

ManageOptionsComponent.propTypes = {
  addNewIsActive: bool,
  dataItems: arrayOf(shape(optionPropType)),
  deleteItem: func.isRequired,
  editIsActive: bool,
  refreshData: func.isRequired,
  selectedItem: shape(optionPropType),
  setEditIsActive: func.isRequired,
  setSelectedItem: func.isRequired,
  showEditView: func.isRequired,
  updateSuccessMessage: func.isRequired,
  uploadIsActive: bool,
};

export default withTabset({
  allowJsonUpload: true,
  displayKey: 'productName',
  primaryKey: 'id',
  secondaryKey: 'optionType',
  tableName: 'options',
  WrappedComponent: ManageOptionsComponent,
});
