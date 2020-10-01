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

export const propertyPropType = {
  closeOfEscrow: string,
  id: string.isRequired,
  lot: string,
  model: string,
  org: string,
  phase: string,
  propertyName: string.isRequired,
  tract: string,
};

export const buyerPropType = {
  email: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  orgId: string,
  propertyId: string,
  salutation: string,
  suffix: string,
};
