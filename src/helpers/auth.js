import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { forEach, get } from 'lodash';


export const getJwt = (authData) => get(authData, 'accessData.jwtToken', null);
export const getUser = (authData) => get(authData, 'user', null);
export const getUserGroups = (authData) => get(authData, 'accessData.payload.cognito:groups', []);
export const getUserPool = (authData) => get(authData, 'userPool', null);
export const getUserPoolData = () => ({ ClientId: process.env.CLIENT_ID, UserPoolId: process.env.USER_POOL_ID, });

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
           })
       }
       else {
           user.getSession((err, session) => {
            if (err) {
                reject(err);
            }
            else {
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

export const completePasswordChallenge = (user) => {
    user.completeNewPasswordChallenge('password', {}, {
        onSuccess: (response) => {
            console.log('complete password success', response);
        },
        onFailure: (e) => {
            console.log('complete password error', e);
        }
    })
};

export const signIn = ({ authData, onLogin, password, userName }) => {
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
                console.log('called new password required', userAttributes, requiredAttributes);
                completePasswordChallenge(user)
            },
            onSuccess: (result) => {
                onLogin({
                    accessData: result.accessToken,
                    user,
                    userPool,
                });
            },
            onFailure: (e) => {
                // TODO: Display authentication error.
                console.log('in on failure', e);
            }
        });
    }

    catch(e) {
        // TODO: display js error. 
        console.log('an error', e);
    }
};

export const signOut = (user) => {
    if (user) {
        try {
            user.signOut();
            return true;
        }
        catch(e) {
            return false;
        }
    }
    return false;
}


