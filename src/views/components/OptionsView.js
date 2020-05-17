import { shape } from 'prop-types';
import React from 'react';

import { optionsViewContainer } from '../../constants/styles/manageOptions';
import { optionPropType } from '../../constants/propTypeObjects';

const OptionsView = ({ selectedItem }) => {
  console.log('selected item', selectedItem);
  return (
    <div className={optionsViewContainer}>
      <div className="section">
        <div className="group">
          <div className="title">Option Type:</div>
          <div className="value">{selectedItem.optionType}</div>
        </div>

        <div className="group">
          <div className="title">Name:</div>
          <div className="value">{selectedItem.name}</div>
        </div>
      </div>
      <div className="section">More</div>
    </div>
  );
};

OptionsView.propTypes = {
  selectedItem: shape(optionPropType).isRequired,
};

export default OptionsView;
