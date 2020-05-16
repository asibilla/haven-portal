import { func } from 'prop-types';
import React, { Component } from 'react';
import { cx } from 'react-emotion';

import { content, tab, tabset } from '../../constants/styles/tabset';

const ADD_NEW = 'add-new';
const MANAGE = 'manage';

class Tabset extends Component {
  state = {
    addNewIsActive: false,
  };

  getTabState(tabName) {
    const { addNewIsActive } = this.state;
    if ((tabName === ADD_NEW && addNewIsActive) || (tabName === MANAGE && !addNewIsActive)) {
      return 'active';
    }
    return '';
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

  render() {
    const { WrappedComponent } = this.props;

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
          <WrappedComponent />
        </div>
      </>
    );
  }
}

Tabset.propTypes = {
  WrappedComponent: func.isRequired,
};

const withTabset = (props) => {
  return () => <Tabset {...props} />;
};

export default withTabset;
