import { arrayOf, node, oneOfType } from 'prop-types';
import React from 'react';

import { pageWrapper } from '../../constants/styles/global';

const PageWrapper = ({ children }) => {
  return <div className={pageWrapper}>{children}</div>;
};

PageWrapper.propTypes = {
  children: oneOfType([node, arrayOf(node)]).isRequired,
};

export default PageWrapper;
