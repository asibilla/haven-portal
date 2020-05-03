import { CognitoUserPool } from 'amazon-cognito-identity-js';



const isAuthenticated = async () => {
  console.log(process.env.USER_POOL_ID);
  
  const data = {
      UserPoolId: process.env.USER_POOL_ID,
      ClientId: process.env.CLIENT_ID
  };

   const userPool = new CognitoUserPool(data);
   const user = userPool.getCurrentUser();
   console.log('the user is', user);
};

const signIn = () => {};

export { isAuthenticated, signIn };
