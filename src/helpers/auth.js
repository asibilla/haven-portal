import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { forEach, get } from 'lodash';

export const getJwt = (authData) => get(authData, 'accessData.jwtToken', null);
export const getUser = (authData) => get(authData, 'user', null);
export const getUserGroups = (authData) => get(authData, 'accessData.payload.cognito:groups', []);
export const getUserPool = (authData) => get(authData, 'userPool', null);
export const getUserPoolData = () => ({
  ClientId: process.env.CLIENT_ID,
  UserPoolId: process.env.USER_POOL_ID,
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
          resolve({
            accessData: session.accessToken,
            user,
            userPool,
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
        onLogin({
          accessData: result.accessToken,
          user,
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
        onLogin({
          accessData: result.accessToken,
          user,
          userPool,
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
