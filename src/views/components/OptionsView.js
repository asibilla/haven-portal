import { shape } from 'prop-types';
import React from 'react';

import { optionsViewContainer } from '../../constants/styles/manageOptions';
import { optionPropType } from '../../constants/propTypeObjects';

const OptionsView = ({ selectedItem }) => {
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

        <div className="group">
          <div className="title">Level:</div>
          <div className="value">{selectedItem.level}</div>
        </div>

        <div className="group">
          <div className="title">Sell Price:</div>
          <div className="value">{`$${Number(selectedItem.sellPrice).toFixed(2)}`}</div>
        </div>

        <div className="group">
          <div className="title">Contractor Price:</div>
          <div className="value">{`$${Number(selectedItem.contractorPrice).toFixed(2)}`}</div>
        </div>

        <div className="group">
          <div className="title">Product Description:</div>
          <div className="value">{selectedItem.productDescription}</div>
        </div>

        <div className="group">
          <div className="title">Extended Description:</div>
          <div className="value">{selectedItem.extendedDescription}</div>
        </div>
      </div>
      <div className="section">
        <div className="group">
          <div className="title">Features:</div>
          <div className="value">
            <ul>
              {selectedItem.features.map((feature) => (
                <li>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="group">
          <div className="title">Materials:</div>
          <div className="value">
            <ul>
              {selectedItem.materials.map((material) => (
                <li>{material}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

OptionsView.propTypes = {
  selectedItem: shape(optionPropType).isRequired,
};

export default OptionsView;
