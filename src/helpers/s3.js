import { S3 } from 'aws-sdk';

import { s3bucketName } from '../constants';

export const getS3Service = (authData) => {
  const { awsConfig } = authData;
  awsConfig.credentials.clearCachedId();
  return new Promise((resolve, reject) => {
    awsConfig.credentials.get((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          new S3({
            apiVersion: '2006-03-01',
            params: { Bucket: s3bucketName },
          })
        );
      }
    });
  });
};
