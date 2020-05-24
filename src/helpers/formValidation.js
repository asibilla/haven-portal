import { set } from 'lodash';

export class ValidationItem {
  constructor({
    displayName,
    fieldName,
    isNumber = false,
    isRequiredSelect = false,
    isRequiredString = false,
    value,
  }) {
    this.displayName = displayName;
    this.fieldName = fieldName;
    this.isNumber = isNumber;
    this.isRequiredSelect = isRequiredSelect;
    this.isRequiredString = isRequiredString;
    this.value = value;
    this.errorMessage = null;
  }

  isValid() {
    if (this.isRequiredString && !this.value) {
      this.errorMessage = `Please enter a value for ${this.displayName}`;
      return false;
    }
    if (this.isRequiredSelect && (!this.value || !this.value.length)) {
      this.errorMessage = `Please make a selection for ${this.displayName}`;
      return false;
    }
    if (this.isNumber && !/^[0-9]+(\.[0-9]+)?$/.test(this.value)) {
      this.errorMessage = `Please enter a valid number. (Numbers and decimals only).`;
      return false;
    }
    return true;
  }
}

export const validateItems = ({ items }) => {
  const errors = {};
  items.forEach((item) => {
    if (!item.isValid()) {
      set(errors, item.fieldName, item.errorMessage);
    }
  });

  return errors;
};
