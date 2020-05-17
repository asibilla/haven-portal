import { shape } from 'prop-types';
import React from 'react';

import { optionsViewContainer } from '../../constants/styles/manageOptions';
import { optionPropType } from '../../constants/propTypeObjects';

const OptionsView = ({ selectedItem }) => {
  return (
    <div className={optionsViewContainer}>
      <div className="section">
        {selectedItem.optionType && (
          <div className="group">
            <div className="title">Option Type:</div>
            <div className="value">{selectedItem.optionType}</div>
          </div>
        )}

        {selectedItem.productName && (
          <div className="group">
            <div className="title">Name:</div>
            <div className="value">{selectedItem.productName}</div>
          </div>
        )}

        {selectedItem.productLevel && (
          <div className="group">
            <div className="title">Level:</div>
            <div className="value">{selectedItem.productLevel}</div>
          </div>
        )}

        {selectedItem.productLocation && (
          <div className="group">
            <div className="title">Locations:</div>
            <div className="value">
              <ul>
                {selectedItem.productLocation.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {selectedItem.sellPrice && (
          <div className="group">
            <div className="title">Sell Price:</div>
            <div className="value">{`$${Number(selectedItem.sellPrice).toFixed(2)}`}</div>
          </div>
        )}

        {selectedItem.contractorPrice && (
          <div className="group">
            <div className="title">Contractor Price:</div>
            <div className="value">{`$${Number(selectedItem.contractorPrice).toFixed(2)}`}</div>
          </div>
        )}

        {selectedItem.productDescription && (
          <div className="group">
            <div className="title">Product Description:</div>
            <div className="value">{selectedItem.productDescription}</div>
          </div>
        )}

        {selectedItem.extendedDescription && (
          <div className="group">
            <div className="title">Extended Description:</div>
            <div className="value">{selectedItem.extendedDescription}</div>
          </div>
        )}
      </div>
      <div className="section">
        {selectedItem.features && Array.isArray(selectedItem.features) && (
          <div className="group">
            <div className="title">Features:</div>
            <div className="value">
              <ul>
                {selectedItem.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {selectedItem.materials && (
          <div className="group">
            <div className="title">Materials:</div>
            <div className="value">
              <ul>
                {selectedItem.materials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

OptionsView.propTypes = {
  selectedItem: shape(optionPropType).isRequired,
};

export default OptionsView;
