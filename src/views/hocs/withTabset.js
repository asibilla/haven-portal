import { get, set } from 'lodash';
import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';
import { content, tab, tabset } from '../../constants/styles/tabset';

import AppContext from '../../helpers/context';
import { deleteItem, scanDB } from '../../helpers/db';
import { deleteImage } from '../../helpers/s3';

import { Spinner } from '../components';

const ADD_NEW = 'add-new';
const MANAGE = 'manage';
const UPLOAD = 'upload';

class Tabset extends Component {
  static contextType = AppContext;

  state = {
    addNewIsActive: false,
    dataItems: [],
    dbError: null,
    editIsActive: false,
    loading: true,
    selectedItem: null,
    successMessage: '',
    uploadIsActive: false,
  };

  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setEditIsActive = this.setEditIsActive.bind(this);
    this.setSelectedItem = this.setSelectedItem.bind(this);
    this.showEditView = this.showEditView.bind(this);
    this.updateSuccessMessage = this.updateSuccessMessage.bind(this);
    this.setUploadIsActive = this.setUploadIsActive.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  async setSelectedItem(item) {
    await this.setState({ selectedItem: item });
  }

  setEditIsActive(active) {
    this.setState({ editIsActive: active });
  }

  setUploadIsActive(active) {
    this.setState({ uploadIsActive: active });
  }

  getTabState(tabName) {
    const { addNewIsActive, uploadIsActive } = this.state;
    if (
      (tabName === ADD_NEW && addNewIsActive) ||
      (tabName === MANAGE && !addNewIsActive && !uploadIsActive) ||
      (tabName === UPLOAD && uploadIsActive)
    ) {
      return 'active';
    }
    return '';
  }

  async deleteImage(imageKey) {
    const { authData } = this.context;
    await deleteImage({ authData, key: imageKey });
  }

  async deleteItem() {
    const { authData } = this.context;
    const { bridgewayDeleteFn, primaryKey, secondaryKey, tableName } = this.props;
    const { selectedItem } = this.state;

    if (
      window.confirm('Are you sure you want to delete this item? This operation cannot be undone.')
    ) {
      const item = {
        [primaryKey]: get(selectedItem, primaryKey, null),
      };

      if (secondaryKey) {
        set(item, secondaryKey, get(selectedItem, secondaryKey));
      }

      try {
        if (bridgewayDeleteFn) {
          const { error } = await bridgewayDeleteFn({ authData, id: selectedItem.id });
          if (error) {
            throw new Error('Could not delete from Bridgeway system.');
          }
        }

        if (selectedItem.imageKey) {
          this.deleteImage(selectedItem.imageKey);
        }

        await deleteItem({ authData, item, tableName });
        this.setState({
          selectedItem: null,
          successMessage: 'Your item was successfully deleted',
        });
        this.refreshData();
      } catch (e) {
        this.setState({ dbError: `Something went wrong: ${e.message}` });
      }
    }
  }

  async refreshData() {
    const { authData } = this.context;
    const { tableName } = this.props;

    this.setState(
      {
        dataItems: [],
        dbError: null,
        selectedItem: null,
      },
      async () => {
        try {
          const data = await scanDB({
            authData,
            tableName,
          });
          this.setState({ dataItems: data.Items, loading: false });
        } catch (e) {
          this.setState({ dbError: `An error occured: ${e.message}`, loading: false });
        }
      }
    );
  }

  updateTabState(tabName) {
    const { addNewIsActive, uploadIsActive } = this.state;
    return () => {
      if (
        (tabName === ADD_NEW && !addNewIsActive) ||
        (tabName === MANAGE && (addNewIsActive || uploadIsActive)) ||
        (tabName === UPLOAD && !uploadIsActive)
      ) {
        const newState = {
          addNewIsActive: tabName === ADD_NEW,
          uploadIsActive: tabName === UPLOAD,
          dbError: null,
          successMessage: '',
        };
        this.setState(newState);
      }
    };
  }

  updateSuccessMessage(message) {
    this.setState({ successMessage: message });
  }

  showEditView(shouldShow = true) {
    return () => this.setState({ editIsActive: shouldShow });
  }

  render() {
    const { allowJsonUpload, WrappedComponent } = this.props;
    const {
      addNewIsActive,
      dataItems,
      dbError,
      editIsActive,
      loading,
      selectedItem,
      successMessage,
      uploadIsActive,
    } = this.state;

    return (
      <>
        <div className={tabset}>
          <div
            className={cx(tab, this.getTabState(MANAGE))}
            onClick={this.updateTabState(MANAGE)}
            onKeyPress={this.updateTabState(MANAGE)}
            role="button"
            tabIndex={0}
          >
            Manage
          </div>
          <div
            className={cx(tab, this.getTabState(ADD_NEW))}
            onClick={this.updateTabState(ADD_NEW)}
            onKeyPress={this.updateTabState(ADD_NEW)}
            role="button"
            tabIndex={0}
          >
            Add New
          </div>
          {allowJsonUpload && (
            <div
              className={cx(tab, this.getTabState(UPLOAD))}
              onClick={this.updateTabState(UPLOAD)}
              onKeyPress={this.updateTabState(UPLOAD)}
              role="button"
              tabIndex={0}
            >
              Upload
            </div>
          )}
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className={content}>
            <div className={styles.messageContainer}>
              {dbError && <p className={styles.errorText}>{dbError}</p>}
            </div>
            <div className={styles.messageContainer}>
              {successMessage && <p className={styles.successText}>{successMessage}</p>}
            </div>
            <WrappedComponent
              addNewIsActive={addNewIsActive}
              dataItems={dataItems}
              deleteItem={this.deleteItem}
              editIsActive={editIsActive}
              refreshData={this.refreshData}
              selectedItem={selectedItem}
              setEditIsActive={this.setEditIsActive}
              setSelectedItem={this.setSelectedItem}
              setUploadIsActive={this.setUploadIsActive}
              showEditView={this.showEditView}
              updateSuccessMessage={this.updateSuccessMessage}
              uploadIsActive={uploadIsActive}
            />
          </div>
        )}
      </>
    );
  }
}

Tabset.defaultProps = {
  allowJsonUpload: false,
  bridgewayDeleteFn: null,
  secondaryKey: '',
};

Tabset.propTypes = {
  allowJsonUpload: bool,
  bridgewayDeleteFn: func,
  primaryKey: string.isRequired,
  secondaryKey: string,
  tableName: string.isRequired,
  WrappedComponent: func.isRequired,
};

const withTabset = (props) => {
  return () => <Tabset {...props} />;
};

export default withTabset;
