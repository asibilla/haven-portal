
export const scanDB = (authData) => {
  console.log('your auth data', authData);
  const { awsConfig } = authData;
  awsConfig.credentials.clearCachedId();
  awsConfig.credentials.get((err) => {
    if (!err) {
        console.log('an error didnt occur');
    }
  });
};
