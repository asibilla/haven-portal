import { get } from 'lodash';
import { func, string } from 'prop-types';
import React, { Component, Fragment } from 'react';
import { cx } from 'react-emotion';

import { styles } from '../../constants';
import { content, tab, tabset } from '../../constants/styles/tabset';

import AppContext from '../../helpers/context';
import { scanDB } from '../../helpers/db';

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
  };

  constructor(props) {
    super(props);

    this.refreshData = this.refreshData.bind(this);
    this.updateSelectedItem = this.updateSelectedItem.bind(this);
    this.updateSelectedItemKey = this.updateSelectedItemKey.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  getTabState(tabName) {
    const { addNewIsActive } = this.state;
    if ((tabName === ADD_NEW && addNewIsActive) || (tabName === MANAGE && !addNewIsActive)) {
      return 'active';
    }
    return '';
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
    this.setState({ selectedItem });
  }

  updateSelectedItemKey(e) {
    this.setState({ selectedItemKey: e.target.value }, () => {
      this.updateSelectedItem();
    });
  }

  render() {
    const { displayKey, WrappedComponent } = this.props;
    const { addNewIsActive, dataItems, dbError, selectedItem, selectedItemKey } = this.state;

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
          {dbError && <p className={styles.errorText}>{dbError}</p>}
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
  tableName: string.isRequired,
  WrappedComponent: func.isRequired,
};

const withTabset = (props) => {
  return () => <Tabset {...props} />;
};

export default withTabset;
