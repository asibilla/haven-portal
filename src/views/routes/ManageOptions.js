import React from 'react';

import withTabset from '../hocs/withTabset';

const ManageOptionsComponent = () => {
  // state will be active tab, db data
  // scan db once edit tab is activated (start on add)
  // after updating, from edit, redirect to add and refresh.
  return (
    <div>
      <h3>ManageOptions</h3>
    </div>
  );
};

export default withTabset({ WrappedComponent: ManageOptionsComponent, tableName: 'options' });
