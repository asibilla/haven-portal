import React from 'react';

import withTabset from '../hocs/withTabset';

import OptionsForm from '../components/OptionsForm';

const ManageOptionsComponent = () => {
  return (
    <div>
      <OptionsForm />
    </div>
  );
};

export default withTabset({ WrappedComponent: ManageOptionsComponent, tableName: 'options' });
