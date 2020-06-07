import { CognitoIdentityServiceProvider, config } from 'aws-sdk';
import moment from 'moment';

import { cognitoClient, cognitoPool, region } from '../constants';
import { createError } from '.';

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
    return moment(this.user.UserCreateDate).format('MM-DD-YYYY');
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

export const getUser = async ({ authData, username }) => {
  try {
    const serviceProvider = await getServiceProvider(authData);
    const params = {
      UserPoolId: cognitoPool,
      Username: username,
    };

    return new Promise((resolve, reject) => {
      serviceProvider.adminGetUser(params, (err, data) => {
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

export const getGroups = async ({ authData }) => {
  try {
    const serviceProvider = await getServiceProvider(authData);
    const params = {
      UserPoolId: cognitoPool,
    };

    return new Promise((resolve, reject) => {
      serviceProvider.listGroups(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Groups.map((group) => group.GroupName));
        }
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getGroupsForUser = async ({ authData, user }) => {
  const serviceProvider = await getServiceProvider(authData);
  const params = {
    UserPoolId: cognitoPool,
    Username: user.Username,
  };
  try {
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
  } catch (err) {
    return Promise.resolve({
      ...user,
      groups: [],
    });
  }
};

export const getUserWithGroups = async ({ authData, username }) => {
  const user = await getUser({ authData, username });
  const userWithGroups = await getGroupsForUser({ authData, user });
  return new CognitoUser(userWithGroups);
};

export const getGroupsForUsers = async ({ authData, users }) => {
  try {
    const promises = users.Users.map((user) => getGroupsForUser({ authData, user }));

    return Promise.all(promises).then((responses) => {
      return responses.map((response) => new CognitoUser(response));
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const addUserToGroup = async ({ authData, data }) => {
  try {
    const serviceProvider = await getServiceProvider(authData);
    const params = {
      UserPoolId: cognitoPool,
      Username: data.username,
      GroupName: data.groupName,
    };

    return new Promise((resolve, reject) => {
      serviceProvider.adminAddUserToGroup(params, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const createUser = async ({ authData, data }) => {
  try {
    const serviceProvider = await getServiceProvider(authData);
    const params = {
      UserPoolId: cognitoPool,
      Username: data.username,
      TemporaryPassword: data.tempPassword,
      UserAttributes: [
        {
          Name: 'email',
          Value: data.email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
    };

    return new Promise((resolve, reject) => {
      serviceProvider.adminCreateUser(params, async (err, response) => {
        if (err) {
          reject(err);
        } else {
          try {
            const addToGroupResponse = await addUserToGroup({
              authData,
              data: {
                username: data.username,
                groupName: data.groupName,
              },
            });
            resolve({
              ...response,
              ...addToGroupResponse,
            });
          } catch (addToGroupErr) {
            reject(
              createError(`User was created but could not be added to group -- ${addToGroupErr}`)
            );
          }
        }
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteUser = async ({ authData, username }) => {
  try {
    const serviceProvider = await getServiceProvider(authData);
    const params = {
      UserPoolId: cognitoPool,
      Username: username,
    };

    return new Promise((resolve, reject) => {
      serviceProvider.adminDeleteUser(params, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const forgotPassword = async ({ username }) => {
  const params = {
    ClientId: cognitoClient,
    Username: username,
  };

  try {
    config.region = region;
    const serviceProvider = new CognitoIdentityServiceProvider();
    return new Promise((resolve, reject) => {
      serviceProvider.forgotPassword(params, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const confirmForgotPassword = async ({ confirmationCode, password, username }) => {
  const params = {
    ClientId: cognitoClient,
    ConfirmationCode: confirmationCode,
    Password: password,
    Username: username,
  };

  try {
    config.region = region;
    const serviceProvider = new CognitoIdentityServiceProvider();
    return new Promise((resolve, reject) => {
      serviceProvider.confirmForgotPassword(params, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
};
