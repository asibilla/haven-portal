import { arrayOf, number, string } from 'prop-types';

export const optionPropType = {
  contractorPrice: number,
  extendedDescription: string,
  id: string,
  features: arrayOf(string),
  productLevel: string,
  productLocation: arrayOf(string),
  materials: arrayOf(string),
  productName: string,
  optionType: string,
  productDescription: string,
  sellPrice: number,
};

export const orgPropType = {
  id: string.isRequired,
  orgName: string.isRequired,
};
