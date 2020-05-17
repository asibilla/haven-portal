import { arrayOf, number, string } from 'prop-types';

export const optionPropType = {
  contractorPrice: number,
  extendedDescription: string,
  id: string,
  features: arrayOf(string),
  level: string,
  location: arrayOf(string),
  materials: arrayOf(string),
  name: string,
  optionType: string,
  productDescription: string,
  sellPrice: number,
};
