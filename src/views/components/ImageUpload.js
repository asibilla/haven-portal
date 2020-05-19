import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { func, string } from 'prop-types';
import React from 'react';

import { s3bucketUrl, styles } from '../../constants';

const ImageUpload = ({ error, id, image, onChange, removeImage }) => {
  if (image) {
    return (
      <div className={styles.imageUploadDelete}>
        <div className="thumbnail">
          <img src={`${s3bucketUrl}/${image}`} alt="Product" />
        </div>
        <div
          className="delete"
          onClick={removeImage}
          onKeyPress={removeImage}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faTimesCircle} size="2x" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.imageUpload}>
      <div className="label" htmlFor={id}>
        <FontAwesomeIcon color={styles.darkGrey} icon={faImage} size="10x" />
      </div>
      <div>
        <input id={id} onChange={onChange} type="file" />
        <div className={styles.inputError}>{error && `${error}`}</div>
      </div>
    </div>
  );
};

ImageUpload.defaultProps = {
  error: null,
  image: '',
};

ImageUpload.propTypes = {
  error: string,
  id: string.isRequired,
  image: string,
  onChange: func.isRequired,
  removeImage: func.isRequired,
};

export default ImageUpload;
