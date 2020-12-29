import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../../helpers/context';
import { scanDB } from '../../helpers/db';
import Spinner from '../components/Spinner';

const OptionBuilder = () => {
  const { authData } = useContext(AppContext);
  const [optionsData, setOptionsData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await scanDB({ authData, tableName: 'options' });
        setOptionsData(data.Items || []);
      } catch (err) {
        setErrorMsg(err.message);
      }
    })();
  }, []);

  const getMarkup = () => {
    if (!errorMsg && !optionsData) {
      return <Spinner />;
    }

    if (errorMsg) {
      return (
        <p>
          An error occured while getting options data:
          {` ${errorMsg}`}
        </p>
      );
    }

    // Below will display when optionsData has been set to state.
    return (
      // Insert code for options builder here.
      <p>{JSON.stringify(optionsData)}</p>
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
