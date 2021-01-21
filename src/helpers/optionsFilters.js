import { sortBy } from 'lodash';

export const sortCategories = (cats) => {
  return sortBy(cats, (cat) => cat.categoryName);
};
