import { arrayOf, node, oneOfType } from 'prop-types';
import React from 'react';

import { contentWrapper } from '../../constants/styles/global';

const ContentWrapper = ({ children }) => {
  return <div className={contentWrapper}>{children}</div>;
};

ContentWrapper.propTypes = {
  children: oneOfType([node, arrayOf(node)]).isRequired,
};

export default ContentWrapper;
