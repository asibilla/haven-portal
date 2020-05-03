import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';



const isAuthenticated = () => {
  console.log(process.env.USER_POOL_ID);
  
  const data = {
      UserPoolId: process.env.USER_POOL_ID,
      ClientId: process.env.CLIENT_ID
  };

   const userPool = new CognitoUserPool(data);
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

const completePasswordChallenge = (user) => {
    user.completeNewPasswordChallenge('password', {}, {
        onSuccess: (response) => {
            console.log('complete password success', response);
        },
        onFailure: (e) => {
            console.log('complete password error', e);
        }
    })
};

const signIn = ({ password, userName }) => {
    const authData = {
        Username: userName,
        Password: password,
    };

    const authDetails = new AuthenticationDetails(authData);
console.log('auth data', authDetails);
    const data = {
        UserPoolId: process.env.USER_POOL_ID,
        ClientId: process.env.CLIENT_ID
    };

    const userPool = new CognitoUserPool(data);
console.log('pool', userPool);

    const userData = {
        Username: userName,
        Pool: userPool,
    };

    const user = new CognitoUser(userData);
console.log('user', user);

    try {
        user.authenticateUser(authDetails, {
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                console.log('called new password required', userAttributes, requiredAttributes);
                completePasswordChallenge(user)
            },
            onSuccess: (result) => {
                console.log('in on success', result);
            },
            onFailure: (e) => {
                console.log('in on failure', e);
            }
        });
    }

    catch(e) {
        console.log('an error', e);
    }

};

export { isAuthenticated, signIn };
