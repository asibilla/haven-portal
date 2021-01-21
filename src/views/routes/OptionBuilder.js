import React, { useContext, useEffect, useState } from 'react';

import { content, tab, tabset } from '../../constants/styles/tabset';
import AppContext from '../../helpers/context';
import { scanDB } from '../../helpers/db';
import { sortCategories } from '../../helpers/optionsFilters';

import Spinner from '../components/Spinner';

const OptionBuilder = () => {
  const { authData } = useContext(AppContext);
  const [optionCategories, setOptionCategories] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await scanDB({ authData, tableName: 'product-option-categories' });
        setOptionCategories(data.Items || []);
      } catch (err) {
        setErrorMsg(err.message);
      }
    })();
  }, []);

  const getMarkup = () => {
    if (!errorMsg && !optionCategories) {
      return <Spinner />;
    }

    if (errorMsg) {
      return (
        <p>
          An error occured while getting option categories:
          {` ${errorMsg}`}
        </p>
      );
    }

    return (
      <div>
        <div className={tabset}>
          {sortCategories(optionCategories).map((cat) => (
            <div
              className={tab}
              // className={cx(tab, this.getTabState(MANAGE))}
              key={cat.productOptionKey}
              // onClick={this.updateTabState(MANAGE)}
              // onKeyPress={this.updateTabState(MANAGE)}
              // role="button"
              // tabIndex={0}
            >
              {cat.categoryName}
            </div>
          ))}
        </div>
        <div className={content}>
          <h1>Options Builder Content Goes Here</h1>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3>Option Builder</h3>
      {getMarkup()}
    </div>
  );
};

export default OptionBuilder;
