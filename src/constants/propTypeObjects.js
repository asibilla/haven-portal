import { arrayOf, number, shape, string } from 'prop-types';

export const tableSet = {
  values: arrayOf(string),
};

export const optionPropType = {
  contractorPrice: number,
  extendedDescription: string,
  id: string,
  features: shape(tableSet),
  level: string,
  location: shape(tableSet),
  materials: shape(tableSet),
  name: string,
  optionType: string,
  productDescription: string,
  sellPrice: number,
};
