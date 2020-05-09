import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config, CognitoIdentityCredentials } from 'aws-sdk';
import { forEach, get } from 'lodash';

import { cognitoClient, cognitoIdPool, cognitoPool, region } from '../constants';

export const getJwt = (authData) => get(authData, 'idData.jwtToken', null);
export const getUser = (authData) => get(authData, 'user', null);
export const getUserGroups = (authData) => get(authData, 'accessData.payload.cognito:groups', []);
export const getUserPool = (authData) => get(authData, 'userPool', null);
export const getUserPoolData = () => ({
  ClientId: cognitoClient,
  UserPoolId: cognitoPool,
});

export const isAdmin = (authData) => {
  let admin = false;
  forEach(getUserGroups(authData), (group) => {
    if (group.indexOf('admin') === 0) {
      admin = true;
    }
  });
  return admin;
};

export const createConfig = (authData) => {
  const paramCredentials = {
    IdentityPoolId: cognitoIdPool,
    Logins: {
      [`cognito-idp.${region}.amazonaws.com/${cognitoPool}`]: getJwt(authData),
    },
  };

  config.region = region;
  config.credentials = new CognitoIdentityCredentials(paramCredentials);
  return config;
};

export const isAuthenticated = () => {
  const userPool = new CognitoUserPool(getUserPoolData());
  const user = userPool.getCurrentUser();

  return new Promise((resolve, reject) => {
    if (!user) {
      resolve({
        userPool,
      });
    } else {
      user.getSession((err, session) => {
        if (err) {
          reject(err);
        } else {
          const authData = {
            accessData: session.accessToken,
            idData: session.idToken,
            user,
            userPool,
          };

          resolve({
            ...authData,
            awsConfig: createConfig(authData),
          });
        }
      });
    }
  });
};

export const completePasswordChallenge = ({ authData, onError, onLogin, password }) => {
  const user = getUser(authData);
  user.completeNewPasswordChallenge(
    password,
    {},
    {
      onSuccess: (result) => {
        const newAuthData = {
          ...authData,
          accessData: result.accessToken,
          idData: result.idToken,
          user,
        };
        onLogin({
          ...newAuthData,
          awsConfig: createConfig(newAuthData),
        });
      },
      onFailure: (e) => {
        onError(e.message || 'An error occured. Please try again.');
      },
    }
  );
};

export const signIn = ({
  authData,
  onError,
  onLogin,
  onNewPasswordRequired,
  password,
  userName,
}) => {
  const loginData = {
    Username: userName,
    Password: password,
  };

  const authDetails = new AuthenticationDetails(loginData);
  const userPool = getUserPool(authData) || new CognitoUserPool(getUserPoolData());

  const userData = {
    Username: userName,
    Pool: userPool,
  };

  const user = new CognitoUser(userData);

  try {
    user.authenticateUser(authDetails, {
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        onNewPasswordRequired({ requiredAttributes, user, userAttributes });
      },
      onSuccess: (result) => {
        const newAuthData = {
          ...authData,
          accessData: result.accessToken,
          idData: result.idToken,
          user,
          userPool,
        };
        onLogin({
          ...newAuthData,
          awsConfig: createConfig(newAuthData),
        });
      },
      onFailure: (e) => {
        onError(e.message || 'An error occured. Please try again.');
      },
    });
  } catch (e) {
    onError(e.message || 'An error occured. Please try again.');
  }
};

export const signOut = (user) => {
  if (user) {
    try {
      user.signOut();
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};
