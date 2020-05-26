import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { css } from 'react-emotion';

const wrapper = css`
  margin: 60px 0;
  text-align: center;
`;

const Spinner = () => {
  return (
    <div className={wrapper}>
      <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} size="3x" />
    </div>
  );
};

export default Spinner;
