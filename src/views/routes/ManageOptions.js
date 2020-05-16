import { bool } from 'prop-types';
import React from 'react';

import OptionsForm from '../components/OptionsForm';
import withTabset from '../hocs/withTabset';

const ManageOptionsComponent = ({ addNewIsActive }) => {
  return <div>{addNewIsActive && <OptionsForm />}</div>;
};

ManageOptionsComponent.defaultProps = {
  addNewIsActive: false,
};

ManageOptionsComponent.propTypes = {
  addNewIsActive: bool,
};

export default withTabset({
  displayKey: 'name',
  tableName: 'options',
  WrappedComponent: ManageOptionsComponent,
});
