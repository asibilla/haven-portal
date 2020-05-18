import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { func, string } from 'prop-types';
import React from 'react';

import { styles } from '../../constants';

const ImageUpload = ({ id, onChange }) => {
  return (
    <div className={styles.imageUpload}>
      <div className="label" htmlFor={id}>
        <FontAwesomeIcon color={styles.darkGrey} icon={faImage} size="8x" />
      </div>
      <input id={id} onChange={onChange} type="file" />
    </div>
  );
};

ImageUpload.propTypes = {
  id: string.isRequired,
  onChange: func.isRequired,
};

export default ImageUpload;
