import { CognitoIdentityServiceProvider } from 'aws-sdk';

import { cognitoPool } from '../constants';

const getServiceProvider = (authData) => {
  const { awsConfig } = authData;
  awsConfig.credentials.clearCachedId();
  return new Promise((resolve, reject) => {
    awsConfig.credentials.get((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(new CognitoIdentityServiceProvider());
      }
    });
  });
};

class CognitoUser {
  constructor(user) {
    this.user = user;
  }

  get username() {
    return this.user.Username;
  }

  get status() {
    return this.user.UserStatus;
  }

  get created() {
    return this.user.UserCreateDate.toString();
  }

  get modified() {
    return this.user.UserLastModifiedDate.toString();
  }

  get groups() {
    return this.user.groups.map((group) => group.GroupName);
  }

  get email() {
    return (this.user.Attributes.find((attribute) => attribute.Name === 'email') || {}).Value;
  }

  get emailVerified() {
    return (this.user.Attributes.find((attribute) => attribute.Name === 'email_verified') || {})
      .Value;
  }
}

export const getUsers = async ({ authData }) => {
  try {
    const serviceProvider = await getServiceProvider(authData);
    const params = {
      UserPoolId: cognitoPool,
      AttributesToGet: ['email', 'email_verified'],
    };

    return new Promise((resolve, reject) => {
      serviceProvider.listUsers(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getGroupsForUsers = async ({ authData, users }) => {
  try {
    const serviceProvider = await getServiceProvider(authData);
    const promises = users.Users.map((user) => {
      const params = {
        UserPoolId: cognitoPool,
        Username: user.Username,
      };
      return new Promise((resolve) => {
        serviceProvider.adminListGroupsForUser(params, (err, data) => {
          if (err) {
            resolve({
              ...user,
              groups: [],
            });
          } else {
            resolve({
              ...user,
              groups: data.Groups,
            });
          }
        });
      });
    });

    return Promise.all(promises).then((responses) => {
      return responses.map((response) => new CognitoUser(response));
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
