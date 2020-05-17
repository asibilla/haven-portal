import { get } from 'lodash';
import { func, string } from 'prop-types';
import React, { Component, Fragment } from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';
import { content, tab, tabset } from '../../constants/styles/tabset';

import AppContext from '../../helpers/context';
import { deleteItem, scanDB } from '../../helpers/db';

import { DropdownMenu, DropdownOption } from '../components';

const ADD_NEW = 'add-new';
const MANAGE = 'manage';

class Tabset extends Component {
  static contextType = AppContext;

  state = {
    addNewIsActive: false,
    dataItems: [],
    dbError: null,
    selectedItem: null,
    selectedItemKey: '',
    successMessage: '',
  };

  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.updateSelectedItem = this.updateSelectedItem.bind(this);
    this.updateSelectedItemKey = this.updateSelectedItemKey.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  get editDeleteBlock() {
    return (
      <div>
        <a href="#edit">Edit</a>
        <span> | </span>
        <a href="#delete" onClick={this.deleteItem}>
          Delete
        </a>
      </div>
    );
  }

  getTabState(tabName) {
    const { addNewIsActive } = this.state;
    if ((tabName === ADD_NEW && addNewIsActive) || (tabName === MANAGE && !addNewIsActive)) {
      return 'active';
    }
    return '';
  }

  async deleteItem() {
    const { authData } = this.context;
    const { primaryKey, tableName } = this.props;
    const { selectedItem } = this.state;
    if (
      window.confirm('Are you sure you want to delete this item? This operation cannot be undone.')
    ) {
      const item = {
        optionType: get(selectedItem, 'optionType', null),
        [primaryKey]: get(selectedItem, primaryKey, null),
      };

      try {
        await deleteItem({ authData, item, tableName });
        this.setState({
          selectedItem: null,
          selectedItemKey: '',
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
      },
      async () => {
        try {
          const data = await scanDB({
            authData,
            tableName,
          });
          this.setState({ dataItems: data.Items });
        } catch (e) {
          this.setState({ dbError: `An error occured: ${e.message}` });
        }
      }
    );
  }

  updateTabState(tabName) {
    const { addNewIsActive } = this.state;
    return () => {
      if ((tabName === ADD_NEW && !addNewIsActive) || (tabName === MANAGE && addNewIsActive)) {
        const newState = !addNewIsActive;
        this.setState({ addNewIsActive: newState });
      }
    };
  }

  updateSelectedItem() {
    const { displayKey } = this.props;
    const { dataItems, selectedItemKey } = this.state;

    const selectedItem =
      dataItems.find((item) => get(item, displayKey, '') === selectedItemKey) || null;
    this.setState({ dbError: null, selectedItem, successMessage: '' });
  }

  updateSelectedItemKey(e) {
    this.setState({ selectedItemKey: e.target.value }, () => {
      this.updateSelectedItem();
    });
  }

  render() {
    const { displayKey, WrappedComponent } = this.props;
    const {
      addNewIsActive,
      dataItems,
      dbError,
      selectedItem,
      selectedItemKey,
      successMessage,
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
        </div>
        <div className={content}>
          <div className={styles.messageContainer}>
            {dbError && <p className={styles.errorText}>{dbError}</p>}
          </div>
          {!addNewIsActive && (
            <DropdownMenu
              id="item-select"
              onChange={this.updateSelectedItemKey}
              value={selectedItemKey}
            >
              <DropdownOption text="-- Select an Item to Manage --" value="" disabled />
              {dataItems.map((item) => {
                const val = get(item, displayKey);
                return (
                  <Fragment key={val}>
                    <DropdownOption text={val} value={val} />
                  </Fragment>
                );
              })}
            </DropdownMenu>
          )}
          <div className={styles.messageContainer}>
            {successMessage && <p className={styles.successText}>{successMessage}</p>}
          </div>
          {selectedItem && this.editDeleteBlock}
          <WrappedComponent
            addNewIsActive={addNewIsActive}
            refreshData={this.refreshData}
            selectedItem={selectedItem}
          />
        </div>
      </>
    );
  }
}

Tabset.propTypes = {
  displayKey: string.isRequired,
  primaryKey: string.isRequired,
  tableName: string.isRequired,
  WrappedComponent: func.isRequired,
};

const withTabset = (props) => {
  return () => <Tabset {...props} />;
};

export default withTabset;
